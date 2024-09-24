const fs = require('fs');
const path = require('path');
const { marked } = require('marked'); // ここを修正

const inputPath = process.argv[2]; // コマンドライン引数からファイルパスを取得
const outputPath = path.join(path.dirname(inputPath), 'index.html');

// ファイル名から拡張子を除いた部分をタイトルに使用
const fileName = path.basename(inputPath, path.extname(inputPath));

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('ファイル読み込みエラー:', err);
    return;
  }

  let htmlContent;
  if (inputPath.endsWith('.md')) {
    const markdownContent = data;
    htmlContent = marked(markdownContent); // マークダウンをHTMLに変換
  } else if (inputPath.endsWith('.html')) {
    htmlContent = data;
  } else {
    console.error('サポートされていないファイル形式です。');
    return;
  }


  const finalHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://page.owasikohu.com/lib/css/header.css">
    <link rel="stylesheet" href="https://page.owasikohu.com/lib/css/footer.css">
    <link rel="stylesheet" href="https://page.owasikohu.com/lib/css/style.css">
    <link rel="stylesheet" href="https://page.owasikohu.com/lib/css/github.css">
    <link rel="shortcut icon" href="https://page.owasikohu.com/favicon.ico" type="image/x-icon">
    <title>${fileName}</title>
</head>
<body>
    <header id="header"><div class="header-inner"><a class="header-logo" href="https://page.owasikohu.com/"><img src="https://page.owasikohu.com/lib/img/logo.png" width="200" height="50"></a><div class="header-site-menu"><nav class="site-menu"><ul class="menu-group"><li class="menu-item"><a href="https://page.owasikohu.com/profile">/profile</a></li><li class="menu-item"><a href="https://page.owasikohu.com/blog">/blog</a></li><li class="menu-item"><a href="https://page.owasikohu.com/projects">/projects</a></li><li class="menu-item"><a href="https://page.owasikohu.com/webring">/webring</a></li><li class="menu-item"><a href="https://page.owasikohu.com/misc">/misc</a></li></ul></nav></div></div><hr></header>
    ${htmlContent}
    <footer id="footer"><hr><span id="copyright">Copyright (C) 2024 owasikohu. Some rights reserved.</span></footer>
</body>
</html>
`;

  fs.writeFile(outputPath, finalHtml, (err) => {
    if (err) {
      console.error('ファイル書き込みエラー:', err);
      return;
    }
    console.log('HTMLファイルが生成されました:', outputPath);
  });
});
