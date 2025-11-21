# Hyprland

Modern desktop configuration for Hyprland with Quickshell - a beautiful, performant, and feature-rich desktop environment.

## Overview

Hyprland Shell provides a complete desktop experience for Hyprland with:
- **Application launcher** with intelligent search and fuzzy matching
- **Status bar** with real-time system information and workspace management  
- **Session management** with lock screen and user controls
- **Dynamic wallpapers** with support for multiple sources and transitions
- **Clean notifications** with smart grouping and quick actions
- **Control center** for system settings and device management
- **Audio/Video controls** with media playback integration
- **Bluetooth management** with device pairing and settings
- **Network management** with WiFi connectivity and status monitoring

## Installation

### Quick Install
```bash
curl -fsSL https://github.com/Boldchingis/hyprland/main/install.sh | bash
```

### Manual Install
1. Clone this repository
2. Install dependencies (see Requirements below)
3. Run the installation script: `./install.sh`
4. Configure Quickshell to use the caelestia configuration

## Requirements

- **Hyprland** - Wayland compositor
- **Qt6** - Application framework
- **Quickshell** - QML-based shell system
- **Systemd** - Service management
- **NetworkManager** - Network connectivity (optional)
- **Pipewire** - Audio system (optional)
- **BlueZ** - Bluetooth support (optional)

## Architecture

The shell is organized into several key modules:

- **`modules/`** - Main UI components (bar, launcher, notifications, etc.)
- **`services/`** - Backend services (audio, network, bluetooth, etc.)
- **`components/`** - Reusable UI components and controls
- **`config/`** - Configuration and theming
- **`utils/`** - Utility functions and helpers

## Configuration

Configuration files are located in `config/` and can be customized to your preferences:

- `Appearance.qml` - Visual themes and styling
- `BarConfig.qml` - Status bar configuration
- `ServiceConfig.qml` - Backend service settings

## Development

### Building
```bash
mkdir build && cd build
cmake .. -DENABLE_MODULES="extras;plugin;shell"
make -j$(nproc)
```

### Code Style
- Use QML/JS with proper typing
- Follow the existing component patterns
- Add comprehensive documentation
- Include error handling and logging
- Optimize for performance and memory usage

### Core Features
- **Application Launcher**: Fast app search with fuzzy matching, recent apps, and categories
- **Status Bar**: Workspace management, system tray, clock, and system indicators
- **Notifications**: Smart grouping, quick actions, and privacy controls
- **Lock Screen**: Secure authentication with weather and media controls

### System Integration
- **Audio Control**: Volume management, device switching, and visual feedback
- **Network Management**: WiFi connectivity, status monitoring, and network switching
- **Bluetooth**: Device pairing, connection management, and settings
- **Display Management**: Brightness control and display configuration

### User Experience
- **Smooth Animations**: Hardware-accelerated transitions and effects
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Keyboard Navigation**: Full keyboard accessibility
- **Theme Support**: Customizable colors, fonts, and visual styles

## Troubleshooting

### Common Issues
- **Shell not loading**: Check Quickshell installation and configuration
- **Network issues**: Verify NetworkManager service is running
- **Audio problems**: Ensure Pipewire is properly configured
- **Bluetooth not working**: Check BlueZ service status

