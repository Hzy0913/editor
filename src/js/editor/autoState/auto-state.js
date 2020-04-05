/*
    自动设置menu状态
*/
import $ from '../../util/dom-core.js'

function AutoState(editor) {
    this.fontSize = 12;
    this.fontColor = '#000';
    this.fontBgColor = '#000';

    this.menuFontSize = document.querySelector('.menu-font-size');
    this.menuFontColor = document.querySelector('.w-e-icon-pencil2');
    this.menuFontBgColor = document.querySelector('.w-e-icon-paint-brush');
}

AutoState.prototype = {
    constructor: AutoState,

    getElementStyle(focusNode) {
        let elementStyle;

        (function findElement(elem) {
            console.log(elem, 11111)
            if (elem.nodeType === 1) {
                console.log(elem.style)

                return elementStyle = getComputedStyle(elem);
            }
            findElement(elem.parentElement);
        })(focusNode);


        console.log(elementStyle, 44412121)
        return elementStyle || {};

    },

    on() {
        const { focusNode } = window.getSelection();
        const { fontSize, color, backgroundColor} = this.getElementStyle(focusNode);

        console.log(backgroundColor, 44412121333)

        this.menuFontSize.innerHTML = fontSize;
        this.menuFontColor.style.color = color;
        if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
            this.menuFontBgColor.style.color = backgroundColor;
        }
    },
}

export default AutoState;
