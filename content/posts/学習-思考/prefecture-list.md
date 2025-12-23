---
title: "prefecture-list"
category: "学習-思考"
---
愛知（aichi）・青森（aomori）・千葉（chiba）・愛媛（ehime）・福井（fukui）・福岡（fukuoka）・広島（hiroshima）・北海道（hokkaido）・兵庫（hyogo）・石川（ishikawa）・香川（kagawa）・鹿児島（kagoshima）・神奈川（kanagawa）・高知（kochi）・熊本（kumamoto）・京都（kyoto）・三重（mie）・宮城（miyagi）・宮崎（miyazaki）・長崎（nagasaki）・新潟（niigata）・大分（oita）・沖縄（okinawa）・大阪（osaka）・佐賀(saga）・静岡（shizuoka）・徳島（tokushima）・富山（toyama）・和歌山（wakayama）・山形（yamagata）・山口（yamaguchi）

### 目視確認用リスト

|**エリア（Region）**|**スラッグ**|**該当する都道府県（User List）**|
|---|---|---|
|**北海道・東北**|`hokkaido-tohoku`|北海道, 青森, 宮城, 山形|
|**関東**|`kanto`|千葉, 神奈川|
|**北陸**|`hokuriku`|新潟, 富山, 石川, 福井|
|**東海**|`tokai`|静岡, 愛知, 三重|
|**近畿**|`kinki`|京都, 大阪, 兵庫, 和歌山|
|**中国**|`chugoku`|広島, 山口|
|**四国**|`shikoku`|徳島, 香川, 愛媛, 高知|
|**九州・沖縄**|`kyushu-okinawa`|福岡, 佐賀, 長崎, 熊本, 大分, 宮崎, 鹿児島, 沖縄|
## Hugo用階層データ

海上アングラーのポイント紹介記事におけるフォルダ階層は、「（ドメイン名）/{prefectures}/postname.html」になるようにする。`categories`には施設の種類（`海上釣り堀`,`海釣り施設`,`筏釣り`）を入れて、施設名と施設の種別をわかりやすくする。
`prefectures`のパラメータ（県名）を検出したら、`region`に「# 北海道・東北エリア」のslugを入れる。
ドメインに日本語（2バイト文字）が入らないよう制御すること。

```
# 北海道・東北エリア
hokkaido-tohoku:
  name: "北海道・東北"
  prefectures:
    - hokkaido
    - aomori
    - miyagi
    - yamagata

# 関東エリア
kanto:
  name: "関東"
  prefectures:
    - chiba
    - kanagawa

# 北陸エリア（日本海側）
hokuriku:
  name: "北陸"
  prefectures:
    - niigata
    - toyama
    - ishikawa
    - fukui

# 東海エリア（太平洋側）
tokai:
  name: "東海"
  prefectures:
    - shizuoka
    - aichi
    - mie

# 近畿エリア
kinki:
  name: "近畿"
  prefectures:
    - kyoto
    - osaka
    - hyogo
    - wakayama

# 中国エリア
chugoku:
  name: "中国"
  prefectures:
    - hiroshima
    - yamaguchi

# 四国エリア
shikoku:
  name: "四国"
  prefectures:
    - tokushima
    - kagawa
    - ehime
    - kochi

# 九州・沖縄エリア
kyushu-okinawa:
  name: "九州・沖縄"
  prefectures:
    - fukuoka
    - saga
    - nagasaki
    - kumamoto
    - oita
    - miyazaki
    - kagoshima
    - okinawa
```

### Frontmatter例

```
---
title: "佐田丸の釣果攻略"
date: 2025-07-01
slug: "sada-maru"
# ディレクトリ名と同じにする
prefecture: "mie"
# 気象庁区分・釣りエリア区分
region: "tokai"
categories：
	- "海上釣り堀"
# タグに詳細属性を入れる
tags:
	- "真鯛"
	- "青物"
	- "トイレあり"
---
```


