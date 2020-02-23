/*
    menu - fontSize
*/

import $ from '../../util/dom-core.js'
import DropList from '../droplist.js'

// 构造函数
function FontSize(editor) {
    this.editor = editor
    this.$elem = $(`<div class="w-e-menu">
        <div class="menu-font-size">12px</div>
        <i class="w-e-icon-text-heigh"></i>
    </div>`)
    this.type = 'droplist'

    // 当前是否 active 状态
    this._active = false

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 160,
        $title: $('<p>字号</p>'),
        type: 'list', // droplist 以列表形式展示
        list: [
            { $elem: $('<span style="font-size: x-small;">12px</span>'), value: '12px' },
            { $elem: $('<span style="font-size: small;">14px</span>'), value: '14px' },
            { $elem: $('<span>16px</span>'), value: '16px' },
            { $elem: $('<span style="font-size: large;">18px</span>'), value: '18px' },
            { $elem: $('<span style="font-size: x-large;">20px</span>'), value: '20px' },
            { $elem: $('<span style="font-size: xx-large;">24px</span>'), value: '24px' }
        ],
        onClick: (value) => {
            // 注意 this 是指向当前的 FontSize 对象
            this._command(value)
        }
    })
}

// 原型
FontSize.prototype = {
    constructor: FontSize,

    // 执行命令
    _command: function (value) {
        const editor = this.editor
        editor.cmd.do('fontSize', '1', () => {
            const { startContainer, endContainer } = editor.selection.getRange();
            const endNode = endContainer;
            (function setElementFontSize(container) {
                if (!container) return;

                // 找到外层包裹元素元素
                const wrapperElementNames = ['P', 'DIV', 'TH', 'PRE'];
                let wrapperElem;

                (function findWrapperElem(elem) {
                    if (wrapperElementNames.includes(elem.nodeName)) {
                        return wrapperElem = elem;
                    }

                    findWrapperElem(elem.parentElement);
                })(container);

                // 查询所有被改动过的span元素 设置fontSize
                const childSpans = wrapperElem.querySelectorAll('span');
                [...childSpans].forEach(child => {
                    if (child.style.fontSize === 'x-small') {
                        child.style.fontSize = value;
                    }
                });

                // 当前元素等于最后元素不再递归
                if (container === endContainer) {
                    return document.querySelector('.menu-font-size').innerHTML = value;
                }

                setElementFontSize(wrapperElem.nextElementSibling);
            })(startContainer);
        });
    }
}

export default FontSize
