#!/usr/bin/env python3
"""
Repository Health Report Generator

This script generates a health report for the repository by fetching real-time
statistics from the GitHub API. It produces actual file changes over time as
metrics evolve, making it suitable for automated maintenance workflows.

The script:
- Uses GitHub REST API to fetch repository statistics
- Generates a markdown report with current metrics
- Calculates a simple health score based on issues and PRs
- Overwrites reports/health.md with fresh data

Safety notes:
- Always exits with code 0 (workflow handles git operations)
- Uses environment variables for authentication
- Generates real diffs as metrics change over time
"""

import os
import json
import requests
from datetime import datetime, timezone


def get_repo_stats():
    """Fetch repository statistics from GitHub API."""
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    
    if not token or not repo:
        print("Error: GITHUB_TOKEN or GITHUB_REPOSITORY not set")
        return None
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    url = f"https://api.github.com/repos/{repo}"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching repo stats: {e}")
        return None


def calculate_health_score(open_issues, open_prs):
    """Calculate a simple health score (0-100)."""
    # Higher score is better. Deduct points for open issues and PRs.
    # Issues weighted more heavily than PRs.
    deduction = (open_issues * 2) + (open_prs * 3)
    score = max(0, 100 - deduction)
    return score


def generate_health_report(stats):
    """Generate markdown health report."""
    now = datetime.now(timezone.utc)
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S UTC")
    
    # Extract metrics
    open_issues = stats.get("open_issues", 0)
    open_prs = stats.get("open_issues", 0)  # GitHub API combines issues+PRs
    stars = stats.get("stargazers_count", 0)
    forks = stats.get("forks_count", 0)
    watchers = stats.get("watchers_count", 0)
    
    # Get last commit date
    last_commit = stats.get("pushed_at", "Unknown")
    if last_commit != "Unknown":
        # Parse ISO 8601 date and format
        try:
            from datetime import datetime
            last_commit_dt = datetime.fromisoformat(last_commit.replace('Z', '+00:00'))
            last_commit = last_commit_dt.strftime("%Y-%m-%d %H:%M:%S UTC")
        except:
            pass  # Keep original format if parsing fails
    
    # Calculate health score
    # Note: GitHub API doesn't separate PRs from issues in open_issues count
    # For simplicity, we'll estimate PRs as 20% of open issues (adjust as needed)
    estimated_prs = max(0, open_issues // 5) if open_issues > 5 else 0
    estimated_issues = open_issues - estimated_prs
    health_score = calculate_health_score(estimated_issues, estimated_prs)
    
    # Generate markdown
    report = f"""# Repository Health Report

*Generated on {timestamp}*

## Key Metrics

| Metric | Value |
|--------|-------|
| ⭐ Stars | {stars:,} |
| 🍴 Forks | {forks:,} |
| 👀 Watchers | {watchers:,} |
| 🐛 Open Issues | {open_issues:,} |
| 🔄 Pull Requests | {estimated_prs:,} (estimated) |
| 📅 Last Commit | {last_commit} |

## Health Score

**{health_score}/100**

*Health score calculation: 100 - (issues × 2 + PRs × 3)*

---
*This report is automatically generated every 10 minutes.*
"""
    
    return report


def main():
    """Main script execution."""
    print("Generating repository health report...")
    
    # Fetch repository statistics
    stats = get_repo_stats()
    if not stats:
        print("Failed to fetch repository statistics")
        return 0  # Exit successfully, let workflow handle errors
    
    # Generate report
    report = generate_health_report(stats)
    
    # Ensure reports directory exists
    reports_dir = "reports"
    os.makedirs(reports_dir, exist_ok=True)
    
    # Write report
    report_path = os.path.join(reports_dir, "health.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report)
    
    print(f"Health report generated: {report_path}")
    print(f"Repository: {stats.get('full_name', 'Unknown')}")
    print(f"Stars: {stats.get('stargazers_count', 0):,}")
    print(f"Open issues: {stats.get('open_issues', 0):,}")
    
    return 0


if __name__ == "__main__":
    exit(main())
