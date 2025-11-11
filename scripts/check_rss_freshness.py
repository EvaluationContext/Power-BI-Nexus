#!/usr/bin/env python3
"""
Check RSS feed freshness and flag stale feeds.
Creates a report of feeds that haven't been updated in the last 12 months.
"""

import feedparser
import re
from datetime import datetime, timedelta
from pathlib import Path
import sys

# Read resources.md to extract RSS feed URLs
resources_file = Path(__file__).parent.parent / "docs" / "resources.md"

with open(resources_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract RSS feed URLs from markdown
# Pattern: [:material-rss:](feed-url){target="_blank"}
rss_pattern = r'\[:material-rss:\]\((https?://[^\)]+)\)'
feed_urls = re.findall(rss_pattern, content)

print(f"Found {len(feed_urls)} RSS feeds to check\n")

stale_feeds = []
fresh_feeds = []
error_feeds = []

twelve_months_ago = datetime.now() - timedelta(days=365)

for feed_url in feed_urls:
    print(f"Checking: {feed_url}")
    try:
        feed = feedparser.parse(feed_url)
        
        if feed.bozo:
            error_feeds.append((feed_url, "Parse error"))
            print(f"  ⚠️  Parse error\n")
            continue
        
        if not feed.entries:
            error_feeds.append((feed_url, "No entries found"))
            print(f"  ⚠️  No entries found\n")
            continue
        
        # Get the most recent entry
        latest_entry = feed.entries[0]
        
        # Try different date fields
        pub_date = None
        if hasattr(latest_entry, 'published_parsed') and latest_entry.published_parsed:
            pub_date = datetime(*latest_entry.published_parsed[:6])
        elif hasattr(latest_entry, 'updated_parsed') and latest_entry.updated_parsed:
            pub_date = datetime(*latest_entry.updated_parsed[:6])
        
        if pub_date:
            if pub_date < twelve_months_ago:
                stale_feeds.append((feed_url, pub_date))
                print(f"  ⚠️  STALE - Last updated: {pub_date.strftime('%Y-%m-%d')}\n")
            else:
                fresh_feeds.append((feed_url, pub_date))
                print(f"  ✅ Fresh - Last updated: {pub_date.strftime('%Y-%m-%d')}\n")
        else:
            error_feeds.append((feed_url, "No date information"))
            print(f"  ⚠️  No date information available\n")
    
    except Exception as e:
        error_feeds.append((feed_url, str(e)))
        print(f"  ❌ Error: {e}\n")

# Generate report
report = "# RSS Feed Freshness Report\n\n"
report += f"**Report Date:** {datetime.now().strftime('%Y-%m-%d')}\n\n"
report += f"**Summary:**\n"
report += f"- ✅ Fresh feeds (updated within 12 months): {len(fresh_feeds)}\n"
report += f"- ⚠️  Stale feeds (not updated in 12+ months): {len(stale_feeds)}\n"
report += f"- ❌ Error checking feeds: {len(error_feeds)}\n\n"

if stale_feeds:
    report += "## 🚨 Stale Feeds (Action Required)\n\n"
    report += "These feeds haven't been updated in over 12 months. Consider removing or archiving:\n\n"
    for feed_url, pub_date in sorted(stale_feeds, key=lambda x: x[1]):
        report += f"- [{feed_url}]({feed_url})\n"
        report += f"  - Last updated: {pub_date.strftime('%Y-%m-%d')} ({(datetime.now() - pub_date).days} days ago)\n"
    report += "\n"

if error_feeds:
    report += "## ❌ Feeds With Errors\n\n"
    report += "These feeds couldn't be checked. Investigate:\n\n"
    for feed_url, error in error_feeds:
        report += f"- [{feed_url}]({feed_url})\n"
        report += f"  - Error: {error}\n"
    report += "\n"

if fresh_feeds:
    report += "## ✅ Fresh Feeds\n\n"
    report += "These feeds are actively maintained:\n\n"
    for feed_url, pub_date in sorted(fresh_feeds, key=lambda x: x[1], reverse=True)[:10]:
        report += f"- [{feed_url}]({feed_url}) - Updated {pub_date.strftime('%Y-%m-%d')}\n"
    
    if len(fresh_feeds) > 10:
        report += f"\n*...and {len(fresh_feeds) - 10} more fresh feeds*\n"
    report += "\n"

# Write report
report_file = Path(__file__).parent.parent / "rss_freshness_report.md"
with open(report_file, 'w', encoding='utf-8') as f:
    f.write(report)

print("\n" + "="*80)
print(report)
print("="*80)

# Exit with error if there are stale feeds (for CI)
if stale_feeds:
    print(f"\n⚠️  Found {len(stale_feeds)} stale feed(s)")
    sys.exit(0)  # Don't fail the workflow, just report

print("\n✅ All feeds are fresh!")
