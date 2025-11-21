pragma Singleton

/**
 * Network management service for WiFi connectivity
 * Provides WiFi network scanning, connection management, and status monitoring
 * Uses NetworkManager command-line interface (nmcli) for backend operations
 */

import Quickshell
import Quickshell.Io
import QtQuick

Singleton {
    id: root

    // List of discovered WiFi access points
    readonly property list<AccessPoint> networks: []
    
    // Currently connected access point (null if none)
    readonly property AccessPoint active: networks.find(n => n.active) ?? null
    
    // WiFi radio enabled state
    property bool wifiEnabled: true
    
    // True when network scan is in progress
    readonly property bool scanning: rescanProc.running

    /**
     * Enable or disable WiFi radio
     * @param enabled true to enable WiFi, false to disable
     */
    function enableWifi(enabled: bool): void {
        const cmd = enabled ? "on" : "off";
        enableWifiProc.exec(["nmcli", "radio", "wifi", cmd]);
    }

    /**
     * Toggle WiFi radio state
     */
    function toggleWifi(): void {
        const cmd = wifiEnabled ? "off" : "on";
        enableWifiProc.exec(["nmcli", "radio", "wifi", cmd]);
    }

    /**
     * Trigger a WiFi network scan
     */
    function rescanWifi(): void {
        rescanProc.running = true;
    }

    /**
     * Connect to a WiFi network
     * @param ssid Network name to connect to
     * @param password Network password (empty for open networks)
     */
    function connectToNetwork(ssid: string, password: string): void {
        if (password && password.length > 0) {
            // Create a new connection with password
            connectProc.exec(["nmcli", "dev", "wifi", "connect", ssid, "password", password]);
        } else {
            // Connect to existing network without password
            connectProc.exec(["nmcli", "conn", "up", ssid]);
        }
    }

    /**
     * Disconnect from current WiFi network
     */
    function disconnectFromNetwork(): void {
        if (active) {
            disconnectProc.exec(["nmcli", "connection", "down", active.ssid]);
        }
    }

    /**
     * Refresh WiFi radio status
     */
    function getWifiStatus(): void {
        wifiStatusProc.running = true;
    }

    Process {
        running: true
        command: ["nmcli", "m"]
        stdout: SplitParser {
            onRead: getNetworks.running = true
        }
    }

    Process {
        id: wifiStatusProc

        running: true
        command: ["nmcli", "radio", "wifi"]
        environment: ({
                LANG: "C.UTF-8",
                LC_ALL: "C.UTF-8"
            })
        stdout: StdioCollector {
            onStreamFinished: {
                root.wifiEnabled = text.trim() === "enabled";
            }
        }
        stderr: StdioCollector {
            onStreamFinished: {
                if (text.trim()) {
                    console.warn("WiFi status check error:", text);
                }
            }
        }
    }

    Process {
        id: enableWifiProc

        onExited: {
            root.getWifiStatus();
            getNetworks.running = true;
        }
    }

    Process {
        id: rescanProc

        command: ["nmcli", "dev", "wifi", "list", "--rescan", "yes"]
        onExited: {
            getNetworks.running = true;
        }
    }

    Process {
        id: connectProc

        stdout: SplitParser {
            onRead: getNetworks.running = true
        }
        stderr: StdioCollector {
            onStreamFinished: {
                if (text.trim()) {
                    console.error("Network connection error:", text);
                    // Emit error signal or update error state for UI feedback
                }
            }
        }
    }

    Process {
        id: disconnectProc

        stdout: SplitParser {
            onRead: getNetworks.running = true
        }
    }

    Process {
        id: getNetworks

        running: true
        command: ["nmcli", "-g", "ACTIVE,SIGNAL,FREQ,SSID,BSSID,SECURITY", "d", "w"]
        environment: ({
                LANG: "C.UTF-8",
                LC_ALL: "C.UTF-8"
            })
        stdout: StdioCollector {
            onStreamFinished: {
                if (!text || text.trim().length === 0) return;
                
                const PLACEHOLDER = "STRINGWHICHHOPEFULLYWONTBEUSED";
                const rep = new RegExp("\\\\:", "g");
                const rep2 = new RegExp(PLACEHOLDER, "g");

                // Parse network data with optimized memory usage
                const allNetworks = text.trim().split("\n").reduce((acc, n) => {
                    if (!n || n.length === 0) return acc;
                    
                    const net = n.replace(rep, PLACEHOLDER).split(":");
                    if (net.length < 6) return acc; // Skip malformed entries
                    
                    const ssid = net[3]?.replace(rep2, ":") ?? "";
                    if (!ssid || ssid.length === 0) return acc; // Skip networks without SSID
                    
                    acc.push({
                        active: net[0] === "yes",
                        strength: parseInt(net[1]) || 0,
                        frequency: parseInt(net[2]) || 0,
                        ssid: ssid,
                        bssid: net[4]?.replace(rep2, ":") ?? "",
                        security: net[5] ?? ""
                    });
                    return acc;
                }, []);

                // Group networks by SSID with optimized lookup
                const networkMap = new Map();
                for (const network of allNetworks) {
                    const existing = networkMap.get(network.ssid);
                    if (!existing || 
                        (network.active && !existing.active) || 
                        (!network.active && !existing.active && network.strength > existing.strength)) {
                        networkMap.set(network.ssid, network);
                    }
                }

                const networks = Array.from(networkMap.values());
                const rNetworks = root.networks;

                // Efficient network list updates with minimal DOM operations
                const toRemove = new Set();
                for (let i = rNetworks.length - 1; i >= 0; i--) {
                    const rn = rNetworks[i];
                    const match = networks.find(n => n.frequency === rn.frequency && n.ssid === rn.ssid && n.bssid === rn.bssid);
                    if (!match) {
                        toRemove.add(i);
                        rn.destroy();
                    } else {
                        rn.lastIpcObject = match;
                    }
                }

                // Batch removal for better performance
                if (toRemove.size > 0) {
                    const indicesToRemove = Array.from(toRemove).sort((a, b) => b - a);
                    for (const index of indicesToRemove) {
                        rNetworks.splice(index, 1);
                    }
                }

                // Add new networks
                for (const network of networks) {
                    const match = rNetworks.find(n => n.frequency === network.frequency && n.ssid === network.ssid && n.bssid === network.bssid);
                    if (!match) {
                        rNetworks.push(apComp.createObject(root, {
                            lastIpcObject: network
                        }));
                    }
                }
            }
        }
    }

    /**
     * WiFi Access Point component
     * Represents a discovered WiFi network with its properties
     */
    component AccessPoint: QtObject {
        required property var lastIpcObject
        
        // Network identification
        readonly property string ssid: lastIpcObject.ssid
        readonly property string bssid: lastIpcObject.bssid
        
        // Network characteristics
        readonly property int strength: lastIpcObject.strength
        readonly property int frequency: lastIpcObject.frequency
        readonly property bool active: lastIpcObject.active
        readonly property string security: lastIpcObject.security
        readonly property bool isSecure: security.length > 0
    }

    Component {
        id: apComp

        AccessPoint {}
    }
}
