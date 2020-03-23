/*
    调整图片大小
*/
import $ from '../../util/dom-core.js'

function ResizeImg(editor) {
    this.textContainer = editor.$textContainerElem[0];
    this.maxImageWidth = 1000;
    this.minImageWidth = 40;

    this.mousedownHandle = this.mousedownHandle.bind(this);
    this.mouseupHandle = this.mouseupHandle.bind(this);
    this.mousemoveHandle = this.mousemoveHandle.bind(this);
}

ResizeImg.prototype = {
    constructor: ResizeImg,

    _init(target) {
        document.execCommand('underline', null, true);

        const imgParent = target.parentElement;

        imgParent.removeAttribute('style');

        const $operation = $(` <span
            id="_edit_resize_operator_"
            style="width: 20px;height: 20px; background: red; display: inline-block;
            position: absolute;right: 0px; bottom: 0"
        ></span>`);

        this.operatorEle = $($operation).get(0);

        this.resizeContainer = imgParent;

        this.resizeContainer.style.position = 'relative';
        this.resizeContainer.style.display = 'inline-block';

        $(imgParent).append($operation);
    },
    on(imgTarget) {
        this._init(imgTarget);

        this.operatorEle = document.getElementById('_edit_resize_operator_');
        this.imgEle = this.resizeContainer.querySelector('img');

        this.operatorEle.style.cursor = 'nw-resize';

        this.operatorEle.addEventListener('mousedown', this.mousedownHandle);
        this.textContainer.addEventListener('mouseup', this.mouseupHandle);
    },
    mousedownHandle(ev) {
        const e = ev || window.event;
        this.mouseX = e.clientX; // 获取鼠标按下时光标x的值
        this.imgW = this.imgEle.offsetWidth; // 获取图片拖拽前div的宽

        this.imgEle.style.cursor = 'nw-resize';

        this.textContainer.addEventListener('mousemove', this.mousemoveHandle);
    },
    mouseupHandle(ev) {
        this.operatorEle.removeEventListener('mousedown', this.mousedownHandle);
        this.textContainer.removeEventListener('mouseup', this.mouseupHandle);
        this.textContainer.removeEventListener('mousemove', this.mousemoveHandle);

        $(this.operatorEle).remove();
        this.imgEle.style.cursor = 'pointer';
    },
    mousemoveHandle(ev) {
        const e = ev || window.event;
        let resizeWidth =  e.clientX - this.mouseX + this.imgW;

        if (resizeWidth > this.maxImageWidth) {
            resizeWidth = this.maxImageWidth;
        } else if (resizeWidth < this.minImageWidth) {
            resizeWidth = this.minImageWidth;
        }

        this.imgEle.style.width = resizeWidth +'px';
    },
}

export default ResizeImg;
