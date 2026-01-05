# サムネイル生成スクリプト - 調査結果と使用方法

## 🔍 調査結果サマリー

### 問題点の特定

元のスクリプト（`generate_thumbnails.py` と `generate_thumbnails_v2.py`）がうまくいかなかった理由：

1. **Gemini APIの画像生成機能は課金プランのみ利用可能**
   - 無料プランでは `gemini-2.5-flash-image` モデルのクォータが `0` に設定されている
   - エラー: `Quota exceeded for metric: ..., limit: 0`

2. **Imagen APIも課金ユーザーのみ**
   - `imagen-4.0-fast-generate-001` などは存在するが、課金が必要
   - エラー: `Imagen API is only accessible to billed users at this time.`

3. **通常のGeminiモデルは画像を生成しない**
   - `gemini-2.0-flash-exp` などはテキスト生成モデル
   - 画像生成プロンプトを提案するだけで、実際の画像は生成されない

### ✅ 解決方法

公式の「Banana in costume image」スクリプトの方法は**正しい**です。
ただし、**Google AI Studioで課金を有効にする必要があります**。

---

## 📁 スクリプト一覧

### 本番用スクリプト

#### `generate_thumbnails_official.py` ⭐ 推奨
- 公式メソッドを使用した完全版
- `response_modalities=["IMAGE", "TEXT"]` を指定
- **課金プランが必要**
- YAMLプロンプトテンプレート対応
- リトライ機能付き
- 画像の自動リサイズ

### テスト用スクリプト

#### `test_official_method.py`
- 公式メソッドの動作確認用
- 1枚だけ生成してテスト

#### `test_image_gen_fixed.py`
- 複数のモデルを試すテストスクリプト

#### `debug_models_v2.py`
- 利用可能なモデル一覧を表示

---

## 🚀 使用方法

### 1. 課金を有効にする

1. [Google AI Studio](https://aistudio.google.com/) にアクセス
2. 右上のメニューから「Billing」または「課金」を選択
3. 支払い方法を設定
4. Gemini APIの課金プランを有効化

### 2. 環境変数を設定

`.env` ファイルに以下を追加：

```env
GOOGLE_API_KEY=your_api_key_here
```

### 3. 依存パッケージをインストール

```bash
pip install google-genai python-frontmatter pyyaml pillow python-dotenv
```

### 4. スクリプトを実行

#### テスト実行（1枚だけ生成）

```bash
python scripts/test_official_method.py
```

#### 本番実行（静岡エリアの全記事）

```bash
python scripts/generate_thumbnails_official.py
```

---

## 💰 料金について

### Gemini 2.5 Flash Image の料金（2025年12月時点）

- **入力**: $0.00001875 / 1,000文字
- **画像出力**: 料金は公式ドキュメントを確認してください

参考: [Gemini API Pricing](https://ai.google.dev/pricing)

### 概算コスト

- プロンプト長: 約500文字
- 記事数: 637件（全体）

**推定コスト**: 詳細は公式ドキュメントを確認してください

---

## 📝 プロンプトのカスタマイズ

`scripts/thumbnail_prompt.yaml` を編集してプロンプトをカスタマイズできます：

```yaml
thumbnail_prompt: |
  You are an expert YouTube Thumbnail designer and SEO specialist for a fishing blog.
  Your goal is to generate a high-CTR (Click Through Rate) thumbnail image for the following article title.
  
  Article Title: "{title}"
  
  Visual Design Rules:
  1. **Subject**: Visualize the core subject of the title
  2. **Style**: Photorealistic, vibrant colors, high contrast
  3. **Composition**: Rule of thirds, strong focal point
  4. **Text Rule**: Maximum 8 Japanese characters if text is included
  5. **Vibe**: Professional yet accessible
  
  Generate the image based on these rules.
```

---

## 🔧 トラブルシューティング

### エラー: `Quota exceeded for metric: ..., limit: 0`

**原因**: 無料プランでは画像生成機能が利用できません

**解決方法**: Google AI Studioで課金を有効にしてください

### エラー: `429 RESOURCE_EXHAUSTED`

**原因**: レート制限に達しました

**解決方法**: 
- スクリプト内の `time.sleep(3)` を増やす（例: 5秒）
- 処理を分割して実行する

### エラー: `404 NOT_FOUND`

**原因**: モデル名が間違っているか、リージョンで利用できません

**解決方法**: `debug_models_v2.py` で利用可能なモデルを確認してください

---

## 🔄 代替案（課金したくない場合）

### オプション1: OpenAI DALL-E 3

```python
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    size="1792x1024",
    quality="standard",
    n=1,
)
```

**料金**: 約$0.04/枚（standard）

### オプション2: Stability AI

```python
import requests

response = requests.post(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
    headers={"Authorization": f"Bearer {STABILITY_API_KEY}"},
    json={
        "text_prompts": [{"text": prompt}],
        "cfg_scale": 7,
        "height": 1024,
        "width": 1024,
    },
)
```

### オプション3: ローカルのStable Diffusion

- 無料だが、GPUが必要
- ComfyUIやAutomatic1111を使用

---

## 📚 参考リンク

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini API Pricing](https://ai.google.dev/pricing)
- [Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)

---

## 📞 サポート

問題が発生した場合は、以下を確認してください：

1. `.env` ファイルに正しいAPIキーが設定されているか
2. 課金が有効になっているか
3. レート制限に達していないか
4. 利用可能なモデルを `debug_models_v2.py` で確認

---

**最終更新**: 2025年12月24日


