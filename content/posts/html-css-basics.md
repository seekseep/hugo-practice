---
title: HTML・CSSの基本 ― ウェブページの骨組みと装飾を作ろう
description: HTMLとCSSの基本的な使い方を学び、ウェブページの骨組みと装飾を作成する方法を紹介します。
draft: false
thumbnail: https://dummyimage.com/600x400/FF7F51/4B0082?text=1_HTML・CSSの基本
categories:
  - frontend
courses:
  - frontend-beginners-guide
weight: 1
date: 2025-05-30T00:00:00.000Z
---

# Webページ

ウェブページは、HTMLとCSSを使って作成されます。HTMLはページの構造を定義し、CSSはそのスタイルを指定します。

# HTML

HTML（HyperText Markup Language）は、ウェブページの基本的な構造を定義するための言語です。HTMLは要素と呼ばれるタグで構成され、これらのタグを使ってテキスト、画像、リンクなどを配置します。

## HTMLの基本構造

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>ウェブページのタイトル</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>ウェブページの見出し</h1>
    </header>
    <main>
      <p>ここに本文が入ります。</p>
      <a href="https://example.com">リンクのテキスト</a>
    </main>
    <footer>
      <p>フッターの内容</p>
    </footer>
  </body
</html>
```

## よくつかうタグ

- `<h1>`〜`<h6>`: 見出しを定義します。`<h1>`が最も重要な見出しで、`<h6>`が最も重要度の低い見出しです。
- `<p>`: 段落を定義します。
- `<a>`: ハイパーリンクを定義します。`href`属性でリンク先を指定します。
- `<img>`: 画像を表示します。`src`属性で画像のURLを指定します。
- `<ul>`, `<ol>`, `<li>`: リストを定義します。`<ul>`は順不同リスト、`<ol>`は順序付きリストです。
- `<div>`: ブロックレベルのコンテナを定義します。スタイルやスクリプトで使用されます。
- `<span>`: インライン要素のコンテナを定義します。主にスタイルを適用するために使用されます。


# CSS

CSS（Cascading Style Sheets）は、HTMLで作成されたウェブページのスタイルを指定するための言語です。CSSを使うことで、フォント、色、レイアウトなどを自由に変更できます。

## CSSの基本構造

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
```


## よくつかうプロパティ

- `color`: テキストの色を指定します。
- `background-color`: 背景色を指定します。
- `font-size`: フォントのサイズを指定します。
- `font-family`: フォントの種類を指定します。
- `margin`: 要素の外側の余白を指定します。

## セレクタ

セレクタは、CSSでスタイルを適用する要素を指定するための方法です。以下はよく使われるセレクタの例です。
- タグセレクタ: `p`、`h1`など、特定のHTMLタグにスタイルを適用します。
- クラスセレクタ: `.classname`の形式で、特定のクラス名を持つ要素にスタイルを適用します。
- IDセレクタ: `#idname`の形式で、特定のIDを持つ要素にスタイルを適用します。
- 属性セレクタ: `[attribute="value"]`の形式で、特定の属性を持つ要素にスタイルを適用します。
- 擬似クラスセレクタ: `:hover`や`:focus`など、特定の状態にある要素にスタイルを適用します。

# 作り方

## HTMLとCSSの連携

HTMLとCSSを連携させるためには、HTMLファイル内でCSSファイルをリンクする必要があります。これには、`<link>`タグを使用します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ウェブページのタイトル</title>
    <link rel="stylesheet" href="styles.css">
</head>
```

## 実際の例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ウェブページのタイトル</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>ウェブページの見出し</h1>
    </header>
    <main>
        <p>ここに本文が入ります。</p>
        <a href="https://example.com">リンクのテキスト</a>
    </main>
    <footer>
        <p>フッターの内容</p>
    </footer>
</body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
h1 {
  color: #333;
}
p {
  color: #666;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```
