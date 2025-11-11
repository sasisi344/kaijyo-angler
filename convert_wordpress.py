#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WordPress XMLエクスポートファイルをHugo形式のMarkdownファイルに変換するスクリプト
"""

import xml.etree.ElementTree as ET
import re
import html
from datetime import datetime
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote

# カテゴリマッピング（WordPressカテゴリ → Hugoカテゴリ）
CATEGORY_MAPPING = {
    "北海道": "東日本",
    "青森県": "東日本",
    "岩手県": "東日本",
    "宮城県": "東日本",
    "秋田県": "東日本",
    "山形県": "東日本",
    "福島県": "東日本",
    "東京都": "東日本",
    "神奈川県": "東日本",
    "埼玉県": "東日本",
    "千葉県": "東日本",
    "関東": "東日本",
    "東北地方": "東日本",
    "東北": "東日本",
    "静岡県": "中部",
    "愛知県": "中部",
    "三重県": "中部",
    "新潟県": "中部",
    "富山県": "中部",
    "石川県": "中部",
    "福井県": "中部",
    "中部（日本海側）": "中部",
    "中部（太平洋側）": "中部",
    "和歌山県": "西日本",
    "大阪府": "西日本",
    "兵庫県": "西日本",
    "奈良県": "西日本",
    "京都府": "西日本",
    "広島県": "西日本",
    "岡山県": "西日本",
    "山口県": "西日本",
    "島根県": "西日本",
    "鳥取県": "西日本",
    "愛媛県": "西日本",
    "香川県": "西日本",
    "徳島県": "西日本",
    "高知県": "西日本",
    "中国地方": "西日本",
    "四国地方": "西日本",
    "福岡県": "九州・沖縄",
    "佐賀県": "九州・沖縄",
    "長崎県": "九州・沖縄",
    "熊本県": "九州・沖縄",
    "大分県": "九州・沖縄",
    "宮崎県": "九州・沖縄",
    "鹿児島県": "九州・沖縄",
    "沖縄県": "九州・沖縄",
}

def clean_html_to_markdown(html_content):
    """HTMLコンテンツをMarkdownに変換（簡易版）"""
    # WordPressのブロックコメントを削除
    markdown = re.sub(r'<!--\s*wp:.*?-->', '', html_content)
    markdown = re.sub(r'<!--\s*/wp:.*?-->', '', markdown)
    markdown = re.sub(r'<!--\s*more\s*-->', '', markdown)
    
    # HTMLタグを削除（簡易的な処理）
    # <p>タグを改行に変換
    markdown = re.sub(r'<p[^>]*>', '\n', markdown)
    markdown = re.sub(r'</p>', '\n', markdown)
    
    # <h2>タグを##に変換
    markdown = re.sub(r'<h2[^>]*>', '\n## ', markdown)
    markdown = re.sub(r'</h2>', '\n', markdown)
    
    # <h3>タグを###に変換
    markdown = re.sub(r'<h3[^>]*>', '\n### ', markdown)
    markdown = re.sub(r'</h3>', '\n', markdown)
    
    # <h4>タグを####に変換
    markdown = re.sub(r'<h4[^>]*>', '\n#### ', markdown)
    markdown = re.sub(r'</h4>', '\n', markdown)
    
    # <strong>タグを**に変換
    markdown = re.sub(r'<strong[^>]*>', '**', markdown)
    markdown = re.sub(r'</strong>', '**', markdown)
    
    # <em>タグを*に変換
    markdown = re.sub(r'<em[^>]*>', '*', markdown)
    markdown = re.sub(r'</em>', '*', markdown)
    
    # <a>タグをMarkdownリンクに変換
    def replace_link(match):
        href = match.group(1)
        text = match.group(2)
        return f'[{text}]({href})'
    markdown = re.sub(r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>([^<]*)</a>', replace_link, markdown)
    
    # <ul>と<li>タグをMarkdownリストに変換
    markdown = re.sub(r'<ul[^>]*>', '\n', markdown)
    markdown = re.sub(r'</ul>', '\n', markdown)
    markdown = re.sub(r'<li[^>]*>', '- ', markdown)
    markdown = re.sub(r'</li>', '\n', markdown)
    
    # <ol>と<li>タグをMarkdown番号リストに変換
    markdown = re.sub(r'<ol[^>]*>', '\n', markdown)
    markdown = re.sub(r'</ol>', '\n', markdown)
    
    # 残りのHTMLタグを削除
    markdown = re.sub(r'<[^>]+>', '', markdown)
    
    # HTMLエンティティをデコード
    markdown = html.unescape(markdown)
    
    # 余分な空行を削除
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    
    return markdown.strip()

def extract_slug_from_url(url):
    """URLからスラッグを抽出"""
    # URLの最後の部分を取得
    slug = url.rstrip('/').split('/')[-1]
    # URLエンコードをデコード
    slug = unquote(slug)
    # 日本語をローマ字に変換するか、ファイル名として使える形式に変換
    # とりあえずURLエンコードをデコードしたものをそのまま使用
    return slug

def parse_date(date_str):
    """日付文字列をパース"""
    try:
        # WordPressの日付形式をパース
        dt = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")
        return dt.strftime("%Y-%m-%dT%H:%M:%S+09:00")
    except:
        return datetime.now().strftime("%Y-%m-%dT%H:%M:%S+09:00")

def extract_prefecture_from_categories(categories):
    """カテゴリから都道府県を抽出"""
    prefecture_keywords = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "東京都", "神奈川県", "埼玉県", "千葉県",
        "静岡県", "愛知県", "三重県", "新潟県", "富山県", "石川県", "福井県",
        "和歌山県", "大阪府", "兵庫県", "奈良県", "京都府",
        "広島県", "岡山県", "山口県", "島根県", "鳥取県",
        "愛媛県", "香川県", "徳島県", "高知県",
        "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ]
    
    for cat in categories:
        for pref in prefecture_keywords:
            if pref in cat:
                return pref.lower().replace("都", "").replace("府", "").replace("県", "")
    return None

def extract_region_from_url(url):
    """URLから地域を抽出"""
    if "/eastjapan/" in url or "/hokkaido/" in url or "/tohoku/" in url or "/kanto/" in url:
        return "tohoku" if "/tohoku/" in url else ("hokkaido" if "/hokkaido/" in url else "kanto")
    elif "/chubu/" in url or "/chubu-nihonkai/" in url or "/chubu-taiheiyou/" in url:
        return "chubu-nihonkai" if "nihonkai" in url else "chubu-taiheiyou"
    elif "/chugoku/" in url or "/kansai/" in url:
        return "chugoku" if "/chugoku/" in url else "kansai"
    elif "/shikoku/" in url:
        return "shikoku"
    elif "/okinawa/" in url or "/kyusyu/" in url:
        return "okinawa" if "/okinawa/" in url else "kyusyu"
    return None

def extract_facility_type_from_tags(tags):
    """タグから施設タイプを抽出"""
    if any("海上釣り堀" in tag for tag in tags):
        return "marine-fishing-pond"
    elif any("海釣り施設" in tag for tag in tags):
        return "sea-fishing-facility"
    return None

def convert_wordpress_to_hugo(xml_file, output_dir):
    """WordPress XMLをHugo形式に変換"""
    print(f"XMLファイルを読み込み中: {xml_file}")
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # 名前空間を定義
    namespaces = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/',
        'excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    posts_dir = output_path / "posts"
    posts_dir.mkdir(exist_ok=True)
    
    count = 0
    skipped = 0
    
    # 各item要素を処理
    for item in root.findall('.//item'):
        # 投稿タイプを確認
        post_type = item.find('wp:post_type', namespaces)
        if post_type is None or post_type.text != 'post':
            continue
        
        # ステータスを確認
        status = item.find('wp:status', namespaces)
        if status is None or status.text != 'publish':
            skipped += 1
            continue
        
        # タイトルを取得
        title_elem = item.find('title')
        if title_elem is None:
            continue
        title = title_elem.text or ""
        
        # リンクからスラッグを取得
        link_elem = item.find('link')
        if link_elem is None:
            continue
        url = link_elem.text or ""
        slug = extract_slug_from_url(url)
        
        # slugがURLエンコードされている場合はデコード
        if '%' in slug:
            slug = unquote(slug)
        
        # ファイル名として使えない文字を置換
        slug = slug.replace('/', '-').replace('\\', '-').replace(':', '-')
        slug = slug.replace('?', '').replace('*', '').replace('"', '').replace('<', '').replace('>', '').replace('|', '')
        
        # タイトルからslugを生成（より安全な方法）
        if not slug or len(slug) > 100:
            # タイトルからslugを生成
            slug = title[:50].strip()
            slug = re.sub(r'[^\w\s-]', '', slug)
            slug = re.sub(r'[-\s]+', '-', slug)
            slug = slug.lower()
        
        # 日付を取得
        pub_date_elem = item.find('pubDate')
        pub_date = parse_date(pub_date_elem.text) if pub_date_elem is not None else datetime.now().strftime("%Y-%m-%dT%H:%M:%S+09:00")
        
        # コンテンツを取得
        content_elem = item.find('content:encoded', namespaces)
        if content_elem is None:
            continue
        html_content = content_elem.text or ""
        
        # 抜粋を取得
        excerpt_elem = item.find('excerpt:encoded', namespaces)
        excerpt = excerpt_elem.text if excerpt_elem is not None else ""
        
        # カテゴリとタグを取得
        categories = []
        tags = []
        for cat in item.findall('category'):
            domain = cat.get('domain', '')
            cat_text = cat.text or ""
            if domain == 'category':
                categories.append(cat_text)
            elif domain == 'post_tag':
                tags.append(cat_text)
        
        # カテゴリマッピングを適用
        hugo_category = None
        for wp_cat in categories:
            if wp_cat in CATEGORY_MAPPING:
                hugo_category = CATEGORY_MAPPING[wp_cat]
                break
        
        if not hugo_category:
            # マッピングにない場合は最初のカテゴリを使用
            hugo_category = categories[0] if categories else "未分類"
        
        # 都道府県と地域を抽出
        prefecture = extract_prefecture_from_categories(categories)
        region = extract_region_from_url(url)
        facility_type = extract_facility_type_from_tags(tags)
        
        # Markdownに変換
        markdown_content = clean_html_to_markdown(html_content)
        
        # フロントマターを作成
        frontmatter = f"""---
title: "{title}"
date: {pub_date}
draft: false
slug: {slug}
"""
        
        if hugo_category:
            frontmatter += f'category: {hugo_category}\n'
        
        if tags:
            frontmatter += "tags:\n"
            for tag in tags[:5]:  # 最大5つまで
                frontmatter += f'  - {tag}\n'
        
        if excerpt:
            frontmatter += f'summary: {excerpt[:200]}\n'
        
        if prefecture:
            frontmatter += f'prefecture: {prefecture}\n'
        
        if region:
            frontmatter += f'region: {region}\n'
        
        if facility_type:
            frontmatter += f'facilityType: {facility_type}\n'
        
        frontmatter += "---\n\n"
        
        # ファイルを保存
        # カテゴリに応じたディレクトリ構造を作成
        if region and prefecture and facility_type:
            post_path = posts_dir / region / facility_type
        elif region:
            post_path = posts_dir / region
        else:
            post_path = posts_dir
        
        post_path.mkdir(parents=True, exist_ok=True)
        
        output_file = post_path / f"{slug}.md"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(frontmatter + markdown_content)
        
        count += 1
        if count % 10 == 0:
            print(f"処理済み: {count}件")
    
    print(f"\n変換完了!")
    print(f"変換された記事: {count}件")
    print(f"スキップされた記事: {skipped}件")
    print(f"出力先: {output_dir}")

if __name__ == "__main__":
    import sys
    
    xml_file = ".cursorrules/wpoldpost/WordPress.2025-11-07.xml"
    output_dir = "content"
    
    try:
        print("WordPress XML変換スクリプトを開始します...")
        print(f"XMLファイル: {xml_file}")
        print(f"出力先: {output_dir}")
        
        if not Path(xml_file).exists():
            print(f"エラー: XMLファイルが見つかりません: {xml_file}")
            sys.exit(1)
        
        convert_wordpress_to_hugo(xml_file, output_dir)
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

