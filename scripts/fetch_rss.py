"""
GitHub Actions RSS Fetcher
Fetches RSS feeds and saves to Firestore using service account credentials
"""

import os
import json
import feedparser
from datetime import datetime, timedelta
from google.cloud import firestore
from google.oauth2 import service_account

# RSS feeds to aggregate
RSS_FEEDS = [
    {
        'name': 'Power BI Blog',
        'url': 'https://powerbi.microsoft.com/en-gb/blog/feed/',
        'category': 'Official'
    },
    {
        'name': 'SQLBI',
        'url': 'https://feeds.feedburner.com/sqlbi_blog',
        'category': 'Blog'
    },
    {
        'name': 'Crossjoin',
        'url': 'https://blog.crossjoin.co.uk/feed/',
        'category': 'Blog'
    },
    {
        'name': 'FourMoo',
        'url': 'https://www.fourmoo.com/blog/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Data Goblins',
        'url': 'https://data-goblins.com/power-bi?format=rss',
        'category': 'Blog'
    },
    {
        'name': 'Fabric Guru',
        'url': 'https://fabric.guru/rss.xml',
        'category': 'Blog'
    },
    {
        'name': 'Power BI Tips',
        'url': 'https://powerbi.tips/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Guy in a Cube',
        'url': 'https://www.youtube.com/feeds/videos.xml?channel_id=UCFp1vaKzpfvoGai0vE5VJ0w',
        'category': 'Video'
    },
    {
        'name': 'EvaluationContext',
        'url': 'https://evaluationcontext.github.io/feed_rss_created.xml',
        'category': 'Blog'
    },
    {
        'name': 'DAX Noob',
        'url': 'https://daxnoob.blog/feed/',
        'category': 'Blog'
    },
    {
        'name': 'How To Power BI',
        'url': 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcfngi7_ASuo5jdWX0bNauQ',
        'category': 'Video'
    },
    {
        'name': 'Kerry Kolosko',
        'url': 'https://kerrykolosko.com/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Kasper on BI',
        'url': 'https://www.kasperonbi.com/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Goodly',
        'url': 'https://goodly.co.in/blog/feed/',
        'category': 'Blog'
    },
    {
        'name': 'ThinkBI',
        'url': 'https://www.thinkbi.de/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Power BI Park',
        'url': 'https://www.youtube.com/feeds/videos.xml?channel_id=UC6g1VsTNgW1ntdW97wwL6nw',
        'category': 'Video'
    },
    {
        'name': 'SSBIpolar',
        'url': 'https://ssbipolar.com/feed/',
        'category': 'Blog'
    },
    {
        'name': 'SQL Server BI Blog',
        'url': 'https://sqlserverbi.blog/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Data-Marc',
        'url': 'https://data-marc.com/feed/',
        'category': 'Blog'
    },
    {
        'name': 'Havens Consulting',
        'url': 'https://www.youtube.com/feeds/videos.xml?channel_id=UCjlfQwqb-0S40XQ8seYPLSw',
        'category': 'Video'
    },
    {
        'name': 'Analytic Endeavors',
        'url': 'https://www.youtube.com/feeds/videos.xml?channel_id=UCQSSIe3typhsBuFEoTeeqLg',
        'category': 'Video'
    }
]


def initialize_firestore():
    """Initialize Firestore with service account credentials from environment"""
    # Get credentials from environment variables
    project_id = os.environ.get('FIREBASE_PROJECT_ID')
    private_key = os.environ.get('FIREBASE_PRIVATE_KEY')
    client_email = os.environ.get('FIREBASE_CLIENT_EMAIL')
    
    if not all([project_id, private_key, client_email]):
        raise ValueError("Missing required environment variables")
    
    # Create credentials object
    credentials_dict = {
        "type": "service_account",
        "project_id": project_id,
        "private_key": private_key.replace('\\n', '\n'),
        "client_email": client_email,
        "token_uri": "https://oauth2.googleapis.com/token",
    }
    
    credentials = service_account.Credentials.from_service_account_info(
        credentials_dict
    )
    
    # Initialize Firestore client
    return firestore.Client(credentials=credentials, project=project_id)


def fetch_feed(feed_info):
    """Fetch a single RSS feed"""
    try:
        print(f"Fetching: {feed_info['name']}")
        feed = feedparser.parse(feed_info['url'])
        
        items = []
        for entry in feed.entries[:10]:  # Limit to 10 most recent items
            # Parse published date
            pub_date = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                pub_date = datetime(*entry.published_parsed[:6])
            elif hasattr(entry, 'updated_parsed') and entry.updated_parsed:
                pub_date = datetime(*entry.updated_parsed[:6])
            else:
                pub_date = datetime.now()
            
            # Get content snippet
            content_snippet = ''
            if hasattr(entry, 'summary'):
                content_snippet = entry.summary[:500]  # Get more content for image extraction
            elif hasattr(entry, 'description'):
                content_snippet = entry.description[:500]
            
            # Get author
            author = feed_info['name']
            if hasattr(entry, 'author'):
                author = entry.author
            elif hasattr(entry, 'creator'):
                author = entry.creator
            
            # Get image/thumbnail - check content first, then media fields
            image_url = ''
            
            # Try to extract image from HTML content (summary or description)
            import re
            if not image_url and hasattr(entry, 'summary') and '<img' in entry.summary:
                img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', entry.summary)
                if img_match:
                    image_url = img_match.group(1)
            
            if not image_url and hasattr(entry, 'description') and '<img' in entry.description:
                img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', entry.description)
                if img_match:
                    image_url = img_match.group(1)
            
            # Try content field as well
            if not image_url and hasattr(entry, 'content') and entry.content:
                content_html = entry.content[0].get('value', '')
                if '<img' in content_html:
                    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content_html)
                    if img_match:
                        image_url = img_match.group(1)
            
            # Fallback to media fields if no image found in content
            if not image_url:
                if hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
                    image_url = entry.media_thumbnail[0].get('url', '')
                elif hasattr(entry, 'media_content') and entry.media_content:
                    image_url = entry.media_content[0].get('url', '')
                elif hasattr(entry, 'enclosures') and entry.enclosures:
                    for enclosure in entry.enclosures:
                        if enclosure.get('type', '').startswith('image/'):
                            image_url = enclosure.get('href', '')
                            break
            
            # Strip HTML tags from content snippet for clean text display
            content_snippet_clean = re.sub(r'<[^>]+>', '', content_snippet)
            content_snippet_clean = content_snippet_clean.strip()
            
            items.append({
                'title': entry.get('title', 'Untitled'),
                'link': entry.get('link', ''),
                'pubDate': pub_date.isoformat(),
                'contentSnippet': content_snippet_clean,
                'author': author,
                'source': feed_info['name'],
                'category': feed_info['category'],
                'guid': entry.get('id', entry.get('link', f"{feed_info['name']}-{entry.get('title')}")),
                'imageUrl': image_url,
                'fetchedAt': firestore.SERVER_TIMESTAMP
            })
        
        print(f"✓ {feed_info['name']}: {len(items)} items")
        return items
    
    except Exception as e:
        print(f"✗ {feed_info['name']}: {str(e)}")
        return []


def filter_recent_items(items, days=14):
    """Filter items from last N days"""
    cutoff_date = datetime.now() - timedelta(days=days)
    
    filtered = []
    for item in items:
        pub_date = datetime.fromisoformat(item['pubDate'].replace('Z', '+00:00'))
        if pub_date >= cutoff_date:
            filtered.append(item)
    
    return filtered


def clear_old_items(db, cutoff_date):
    """Clear items older than cutoff date from Firestore"""
    items_ref = db.collection('rssItems')
    
    # Query for old items (older than 14 days)
    old_docs = items_ref.where('pubDate', '<', cutoff_date.isoformat()).stream()
    
    count = 0
    batch = db.batch()
    
    for doc in old_docs:
        batch.delete(doc.reference)
        count += 1
        
        # Commit in batches of 500
        if count % 500 == 0:
            batch.commit()
            batch = db.batch()
    
    if count % 500 != 0 and count > 0:
        batch.commit()
    
    print(f"Cleared {count} old items")


def save_to_firestore(db, items):
    """Save items to Firestore (upsert based on guid to prevent duplicates)"""
    if not items:
        print("No items to save")
        return
    
    batch = db.batch()
    items_ref = db.collection('rssItems')
    
    for i, item in enumerate(items):
        # Use a hash of the guid as document ID to prevent duplicates
        import hashlib
        doc_id = hashlib.md5(item['guid'].encode()).hexdigest()
        doc_ref = items_ref.document(doc_id)
        batch.set(doc_ref, item, merge=True)  # merge=True for upsert behavior
        
        # Commit in batches of 500
        if (i + 1) % 500 == 0:
            batch.commit()
            batch = db.batch()
    
    # Commit remaining
    if len(items) % 500 != 0:
        batch.commit()
    
    print(f"Saved {len(items)} items to Firestore")
    
    # Update metadata
    meta_ref = db.collection('rssMeta').document('lastUpdate')
    meta_ref.set({
        'lastUpdated': firestore.SERVER_TIMESTAMP,
        'itemCount': len(items)
    })


def main():
    print('=== RSS Feed Aggregation Started ===')
    
    try:
        # Initialize Firestore
        db = initialize_firestore()
        print("Firestore initialized")
        
        # Fetch all feeds
        print(f"Fetching {len(RSS_FEEDS)} RSS feeds...")
        all_items = []
        for feed in RSS_FEEDS:
            items = fetch_feed(feed)
            all_items.extend(items)
        
        print(f"Total items fetched: {len(all_items)}")
        
        # Filter to last 14 days
        recent_items = filter_recent_items(all_items)
        print(f"Items from last 14 days: {len(recent_items)}")
        
        # Sort by date (newest first)
        recent_items.sort(key=lambda x: x['pubDate'], reverse=True)
        
        # Clear items older than 14 days
        cutoff_date = datetime.now() - timedelta(days=14)
        clear_old_items(db, cutoff_date)
        
        # Save new items (will upsert, preventing duplicates)
        save_to_firestore(db, recent_items)
        
        print('=== RSS Feed Aggregation Completed Successfully ===')
        
    except Exception as e:
        print(f"Error in RSS aggregation: {str(e)}")
        raise


if __name__ == '__main__':
    main()
