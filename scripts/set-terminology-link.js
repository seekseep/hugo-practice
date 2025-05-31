// scripts/set-terminology-link.js
import fs from 'fs';
import path from 'path';
import * as glob from 'glob';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import yaml from 'js-yaml';
import { visit } from 'unist-util-visit';

console.log("Setting terminology link...");

// 1. terminologiesの一覧を取得
function getTerminologies() {
  console.log("Step 1: terminologiesを取得する");

  const pattern = 'content/terminologies/**/*.md'; // terminologiesだけを対象にする
  const files = glob.sync(pattern);

  const terminologies = files.map(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content); // gray-matter でFrontMatter読み取る
    const title = data.title || path.basename(file, '.md'); // ファイル名から拡張子除去
    const slug = path.basename(file, '.md'); // ファイル名からslugを作る
    return {
      term: title,
      link: `/terminologies/${slug}/`
    };
  });

  console.log(`用語数: ${terminologies.length}`);
  return terminologies;
}

// 2. 対象ファイルの一覧を取得
function getMarkdownFiles() {
  console.log("Step 2: 対象ファイルを取得する");
  const pattern = 'content/posts/**/*.md'; // 記事ファイルたち
  return glob.sync(pattern);
}

// 3. ファイルを読み込んでリンクをセット
async function setTerminologyLinksInFile(filePath, terminologies) {
  console.log(`Step 3: ファイルに用語リンクを設定する: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const parsed = matter(fileContent); // FrontMatter + Contentを分ける

  const processor = unified()
    .use(remarkParse)
    .use(() => tree => {
      visit(tree, 'text', node => {
        terminologies.forEach(({ term, link }) => {
          const regex = new RegExp(`(?<!\\]\\()(${escapeRegExp(term)})(?!\\))`, 'g');
          node.value = node.value.replace(regex, `[${term}](${link})`);
        });
      });
    })
    .use(remarkStringify);

  const newContent = await processor.process(parsed.content);

  return matter.stringify(String(newContent), parsed.data, {
    language: 'yaml',
    engines: {
      yaml: {
        stringify: (data) => yaml.dump(data, { lineWidth: 0 }) // ← stringifyに！
      }
    }
  });
}

// ユーティリティ関数：正規表現用に特殊文字をエスケープする
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& はマッチした部分
}

// 4. ファイルに書き出し
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`ファイルを書き出しました: ${filePath}`);
  console.log("用語リンクの設定が完了しました。");
}

// Main
async function main() {
  const terminologies = getTerminologies();
  const files = getMarkdownFiles();
  for (const filePath of files) {
    const newContent = await setTerminologyLinksInFile(filePath, terminologies);
    writeFile(filePath, newContent);
  }
}


main();
