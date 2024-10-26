// ==UserScript==
// @name         炯
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide all elements on the page except for specific canvas and div tags, and modify the div tag.
// @author       YourName
// @match        https://www.alipan.com/sign/*
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         Hide Unwanted Tags and Modify Selected Tags
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide all tags except specific ones and modify them
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 创建一个style标签
    var style = document.createElement('style');
    style.type = 'text/css';

    // 定义CSS规则，将所有元素的margin设置为0
    var cssRule = '* { margin: 0 !important; }';

    // 将CSS规则添加到style标签中
    if (style.styleSheet) {
        style.styleSheet.cssText = cssRule;
    } else {
        style.appendChild(document.createTextNode(cssRule));
    }

    // 将style标签添加到<head>部分
    document.head.appendChild(style);
    // 隐藏特定的 div
    const selectorsToHide = [
        'div.download',
        'img[src="https://gw.alicdn.com/imgextra/i2/O1CN012zI3pB1XLS21rJ9Je_!!6000000002907-55-tps-108-24.svg"]',
        'div.net-action',
        '.login-blocks.block0',
        '.go-sms.adrive-action-container'
    ];

    function hideElements() {
        selectorsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.style.display = 'none');
        });
    }

    // 当页面加载完成后执行
    window.addEventListener('load', hideElements);

    // 如果页面有动态加载的内容，可以考虑使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, { childList: true, subtree: true });
})();
