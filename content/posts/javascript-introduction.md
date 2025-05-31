---
title: JavaScriptの基礎 ― ページに動きをつけよう
description: JavaScriptの基本的な使い方と、ページに動きをつける方法について学びます。
draft: false
thumbnail: https://dummyimage.com/600x400/FF7F51/4B0082?text=2_JavaScriptの基礎
categories:
  - frontend
courses:
  - frontend-beginners-guide
weight: 2
date: 2025-05-30T00:00:00.000Z
---
# [JavaScript](/terminologies/javascript/)の基礎

[JavaScript](/terminologies/javascript/)は、ウェブページに動きをつけるためのプログラミング言語です。ユーザーの操作に応じて、ページの内容を動的に変更したり、アニメーションを追加したりすることができます。

# [JavaScript](/terminologies/javascript/)の基本構文

[JavaScript](/terminologies/javascript/)の基本的な構文は、変数の宣言、関数の定義、条件分岐、ループなどで構成されています。以下に基本的な例を示します。

```javascript
// 変数の宣言
let message = "Hello, World!";
// 関数の定義
function greet(name) {
    return `Hello, ${name}!`;
}
// 条件分岐
if (message === "Hello, World!") {
    console.log(greet("User"));
} else {
    console.log("Unknown message");
}
// ループ
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}
```

# DOM操作

DOM（Document Object Model）は、[HTML](/terminologies/html/)やXML文書の構造を表現するオブジェクトモデルです。[JavaScript](/terminologies/javascript/)を使ってDOMを操作することで、ページの内容を動的に変更できます。

# DOMの基本操作

```javascript
// 要素の取得
let element = document.getElementById("myElement");
// 要素の内容を変更
element.textContent = "新しいテキスト";
// 新しい要素の作成
let newElement = document.createElement("div");
// 新しい要素にクラスを追加
newElement.classList.add("myClass");
// 要素をページに追加
document.body.appendChild(newElement);
// イベントリスナーの追加
element.addEventListener("click", function() {
    alert("Element clicked!");
});
```

# イベント処理

イベントは、ユーザーの操作（クリック、キーボード入力など）に応じて発生するアクションです。[JavaScript](/terminologies/javascript/)では、イベントリスナーを使ってこれらのイベントを処理できます。

```javascript
// ボタンのクリックイベントを処理
let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    alert("Button was clicked!");
});
```
