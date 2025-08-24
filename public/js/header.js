// public/js/header.js
(function () {
    // 利用 window.location 自動推算 base path
    // 預設 root = "/"，GitHub Pages 自動帶上 repo 名
    const repo = 'web-function-demo'; // 如果你 GitHub Pages project name 是這個
    let base = '/';

    if (location.hostname.endsWith('github.io')) {
        // GitHub Pages 下 → 路徑會是 /repo/
        base = '/' + repo + '/';
    }

    // 封裝一個 resolver
    function resolve(relPath) {
        // 確保 relPath 沒有前導斜線
        relPath = relPath.replace(/^\/+/, '');
        return base + relPath;
    }

    // 找到 #header，塞進去
    fetch(resolve('partials/header.html'))
        .then((res) => {
            if (!res.ok) throw new Error('載入 header.html 失敗');
            return res.text();
        })
        .then((html) => {
            const target = document.getElementById('header');
            if (!target) {
                console.warn('[header.js] 沒有找到 <div id="header">');
                return;
            }
            target.innerHTML = html;
        })
        .catch((err) => {
            console.error('[header.js]', err);
        });
})();
