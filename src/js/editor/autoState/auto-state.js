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
}

ResizeImg.prototype = {
    constructor: ResizeImg,

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


        const { fontSize, color } = elementStyle || {};

        document.querySelector('.menu-font-size').innerHTML = fontSize;
    },
    on(imgTarget) {
        const { focusNode } = window.getSelection();

        let elementStyle;
        (function findElement(elem) {
            console.log(elem, 11111)
            if (elem.nodeType === 1) {
                console.log(elem.style)

                return elementStyle = getComputedStyle(elem);
            }
            findElement(elem.parentElement);
        })(focusNode);



        const { fontSize, color } = elementStyle || {};


        this.menuFontSize.innerHTML = fontSize;
        this.menuFontColor.style.color = color;

    },
}

export default ResizeImg;
