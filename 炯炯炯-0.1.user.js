// ==UserScript==
// @name         炯炯炯
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Click on a div with a specific class name when it is visible
// @author       xl
// @match        https://www.alipan.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 指定要点击的元素的类名
    var targetClassName = "web-download-btn--NPiNV";
    // 检查间隔时间（毫秒）
    var interval = 400; // 1 second
    var notificationHeight = "70px"; // Height of the notification bar

    function isElementVisible(element) {
        // 检查元素是否可见
        return element && window.getComputedStyle(element).display !== 'none' && element.offsetWidth > 0 && element.offsetHeight > 0;
    }

    function clickElement() {
        // 查找具有指定类名的元素
        var targetElement = document.querySelector('.' + targetClassName);

        // 如果找到了元素且元素可见，则模拟点击
        if (targetElement && isElementVisible(targetElement)) {
            var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            targetElement.dispatchEvent(event);
            console.log("Clicked on element with class: " + targetClassName);
            showNotification();
        }
    }
    function showNotification() {
        var notificationBar = document.createElement('div');
        notificationBar.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: ${notificationHeight};
            background-color: #ff4500; /* Orange background for contrast */
            color: #ffffff; /* White text for visibility */
            font-size: 22px; /* Increased font size */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            z-index: 9999;
        `;
        notificationBar.textContent = ":))已为您自动点击下载哦~~";

        var closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            cursor: pointer;
            margin-left: 10px;
            font-size: 24px; /* Larger close button for better visibility */
        `;
        closeButton.onclick = function() {
            notificationBar.remove();
        };

        notificationBar.appendChild(closeButton);
        document.body.appendChild(notificationBar);

        // Remove the notification after 3 seconds
        setTimeout(function() {
            notificationBar.remove();
        }, 15000);
    }


    // 使用定时器不断检查元素是否可见并点击
    setInterval(clickElement, interval);
})();