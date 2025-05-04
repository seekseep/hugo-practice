const fs = require('fs');
const path = require('path');
const { add } = require('date-fns');

function createDummyContent (title) {
  const dummyImageUrl = createDummyImage(320, 180, title, 0);
  const dummyImageUrl2 = createDummyImage(640, 360, title, 1);
  return `
# ${title}

${title}の内容が入ります。

## セクション1
ここにセクション1の内容が入ります。

## セクション2
ここにセクション2の内容が入ります。

- リスト1
- リスト2
- リスト3

| ヘッダー1 | ヘッダー2 |
| --------- | --------- |
| データ1   | データ2   |
| データ3   | データ4   |

\`\`\`javascript
console.log('Hello, world!');
\`\`\`


![画像](${dummyImageUrl})

![画像](${dummyImageUrl2})

  `.trim()
}

function createPageCreator (contentDir) {
  return function createPage (fileName, frontMatter, content) {
    const filePath = path.resolve(contentDir, `${fileName}.md`);
    const frontMatterContents = Object.entries(frontMatter).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `'${v}'`).join(', ')}]`
      }

      return `${key}: ${value}`
    }).join('\n');
    const frontMatterString = `---\n${frontMatterContents}\n---\n\n`;
    const contentString = `${frontMatterString}${content}`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contentString);
    console.log(`Created page: ${filePath}`);
  }
}


const getNextBaseDate = (function (baseDate) {
  let nextBaseDate = baseDate;
  return function () {
    const date = nextBaseDate;
    nextBaseDate = add(nextBaseDate, { days: 1 });
    return date;
  }
})(new Date('2023-10-01T00:00:00Z'));

const getNextcoursePageCount = (function () {
  let count = 5;
  return function () {
    const currentCount = count;
    count = Math.floor(Math.random() * 5) + 1;
    return currentCount;
  }
})();

const getNextCategory = (function () {
  let count = 0;
  return function () {
    const name = `category-${count}`;
    const title = `カテゴリ${count}`;
    count++;
    return { name, title };
  }
})();

const getNextCourse = (function () {
  let count = 0;
  return function () {
    const name = `course-${count}`;
    const title = `コース${count}`;
    const description = `コース${count}の説明`;
    count++;
    return { name, title, description };
  }
})();

const getNextPost = (function () {
  let count = 0;
  return function () {
    const name = `post-${count}`;
    const title = `記事${count}`;
    count++;
    return { name, title };
  }
})();

const createDummyImage = (function () {
  const palettes = [
    ['#F5F7FA', '#2D3748'], // 明るいグレー × 濃紺グレー（モダンなUI配色）
    ['#EDF2F7', '#1A202C'], // オフホワイト × ダークグレー
    ['#E6FFFA', '#2C7A7B'], // ペールグリーン × 青緑（トレンド感あり）
    ['#FFF5F7', '#D53F8C'], // ピンク系 × 濃いピンク（女性向けなどに◎）
    ['#F0FFF4', '#38A169'], // 淡いミント × 濃いグリーン（ヘルスケア系にも）
    ['#EBF8FF', '#3182CE'], // 淡い青 × ミッドブルー（信頼感・テック）
    ['#FEFCBF', '#D69E2E'], // 淡い黄色 × マスタード（柔らかく目立つ）
    ['#FAF5FF', '#805AD5'], // 淡い紫 × 濃いバイオレット（知的・クリエイティブ）
  ];

  return function createDummyImage (width, height, text, palleteIndex) {
    const [bg, fg] = palettes[palleteIndex % palettes.length];
    const url = new URL(`https://dummyimage.com/${width}x${height}/${fg.slice(1)}/${bg.slice(1)}`);
    url.searchParams.set('text', text);
    return url.toString();
  }
})()

const getNextThumbnail = (function () {
  const width = 600;
  const height = 400;
  let index = 0;
  return function (title) {
    return createDummyImage(width, height, title, index++);
  };
})();

function main (args) {
  let projectRoot = __dirname;
  if (args.length > 2) {
    projectRoot = path.resolve(__dirname, args[2]);
  }

  const contentDir = path.resolve(projectRoot, 'content');
  if (fs.existsSync(contentDir)) {
    fs.rmSync(contentDir, { recursive: true, force: true });
  }
  console.log(`Creating dummy data in ${contentDir}`);

  const createPage = createPageCreator(contentDir);

  createPage('_index', {
    title: 'Home',
    description: 'Welcome to the home page',
    date: new Date().toISOString(),
    draft: false,
  }, createDummyContent("ホーム"))

  createPage('static-pages/about', {
    title: '概要',
    description: 'Welcome to the home page',
    date: new Date().toISOString(),
    draft: false,
    weight: 1,
    url: '/about'
  }, createDummyContent("概要"))

  createPage('static-pages/contact', {
    title: '問い合わせ',
    description: 'Welcome to the home page',
    date: new Date().toISOString(),
    draft: false,
    weight: 2,
    url: '/contact'
  }, createDummyContent("問い合わせ"))

  createPage('static-pages/policy', {
    title: 'プライバシーポリシー',
    description: 'Welcome to the home page',
    date: new Date().toISOString(),
    draft: false,
    weight: 3,
    url: '/policy',
  }, createDummyContent("プライバシーポリシー"))

  const courses = []
  const categories = []

  for (let c0 = 1; c0 <= 3; c0++) {

    const category0 = getNextCategory();
    category0.title = `メインカテゴリ ${c0}`
    category0.thumbnail = getNextThumbnail(category0.title);
    category0.categories = [];

    for (let c1 = 1; c1 <= 2; c1++) {
      const category1 = getNextCategory();
      category1.title = `サブカテゴリ ${c1}`
      category1.categories = [category0.name];
      category1.thumbnail = getNextThumbnail(category1.title);
      for (let c1s = 1; c1s <= 2; c1s++) {
        const course = getNextCourse();
        course.categories = [category0.name, category1.name];
        course.count = getNextcoursePageCount();
        course.baseDate = getNextBaseDate();
        course.thumbnail = getNextThumbnail(course.title);
        courses.push(course);
      }

      for (let c2 = 1; c2 <= 2; c2++) {
        const category2 = getNextCategory();
        category2.title = `サブカテゴリ ${c1}-${c2}`
        category2.categories = [category0.name, category1.name];
        category2.thumbnail = getNextThumbnail(category2.title);

        for (let c2s = 1; c2s <= 2; c2s++) {
          const course = getNextCourse();
          course.categories = [category0.name, category1.name, category2.name];
          course.count = getNextcoursePageCount();
          course.baseDate = getNextBaseDate();
          course.thumbnail = getNextThumbnail(course.title);
          courses.push(course);
        }

        categories.push(category2);
      }
      categories.push(category1);
    }
    categories.push(category0);
  }

  categories.forEach(category => {
    createPage(`categories/${category.name}/_index`, {
      title: category.title,
      description: `Welcome to ${category.title}`,
      categories: category.categories ?? [],
      thumbnail: category.thumbnail,
      date: new Date().toISOString(),
      draft: false,
    }, createDummyContent(category.title));
  });

  courses.forEach((course, i) => {
    createPage(`courses/${course.name}/_index`, {
      title: `${course.title}`,
      description: `${course.title}の説明`,
      date: course.baseDate.toISOString(),
      draft: false,
      thumbnail: course.thumbnail,
      categories: course.categories,
      courses: []
    }, createDummyContent(`${course.title} ${i}`));
    for (let i = 1; i <= course.count; i++) {
      const post = getNextPost();
      createPage(`posts/${post.name}`, {
        title: post.title,
        description: `${course.title} ${i} の説明`,
        draft: false,
        thumbnail: getNextThumbnail(post.title),
        categories: course.categories,
        courses: [course.name],
        date: add(course.baseDate, { days: i }).toISOString(),
      }, createDummyContent(`${post.title} ${i}`));
    }
  })
}

main(process.argv);
