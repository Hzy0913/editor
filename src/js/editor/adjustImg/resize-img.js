/*
    调整图片大小
*/
import $ from '../../util/dom-core.js'

function ResizeImg(target, editor) {
    this.editor = editor
    this._time = 0
    this._isShow = false
    this._isRender = false
    this._timeoutId = 0

    this.textContainer = editor.$textContainerElem[0];

    const { src } = target;

    this.$resizeContainer = $(`<p style="position: relative;display:inline-block">
                    <span
                     id="_edit_resize_operator"
                      style="width: 20px;height: 20px; background: red; display: inline-block;
                      position: absolute;right: 0px; bottom: 0"
                      ></span>
                    <img src=${src} id="_edit_resize_img_">
                </p>`)
}

ResizeImg.prototype = {
    constructor: ResizeImg,

    _init() {
        this.operatorEle = document.getElementById('_edit_resize_operator_');
        this.imgEle = document.getElementById('_edit_resize_img_');

        this.operatorEle.addEventListener('mousedown', this.mousedownHandle);
        this.operatorEle.addEventListener('mouseup', this.mouseupHandle);
    },
    on(imgTarget) {
        const { src } = imgTarget;

        this.$resizeContainer = $(`<p style="position: relative;display:inline-block">
            <span
             id="_edit_resize_operator"
              style="width: 20px;height: 20px; background: red; display: inline-block;
              position: absolute;right: 0px; bottom: 0"
              ></span>
            <img src=${src} id="_edit_resize_img_">
        </p>`);




    },

    mousedownHandle(ev) {
        const e = ev || window.event;
        this.mouseX = e.clientX; // 获取鼠标按下时光标x的值
        this.imgW = this.imgEle.offsetWidth; // 获取图片拖拽前div的宽

        this.textContainer.addEventListener('mousemove', this.mousemoveHandle);
    },
    mouseupHandle(ev) {
        this.operatorEle.removeEventListener('mouseup', this.mouseupHandle);
        this.textContainer.removeEventListener('mousemove', this.mousemoveHandle);

    },
    mousemoveHandle(ev) {
        const e = ev || window.event;
        console.log(e, 22221111);

        //拖拽时为了对宽和高 限制一下范围，定义两个变量
        const resizeWidth =  e.clientX - this.mouseX + this.imgW;

        this.imgEle.style.width = resizeWidth +'px';
    },
    show: function (progress) {
        // 状态处理
        if (this._isShow) {
            return
        }
        this._isShow = true

        // 渲染
        const $bar = this.$bar
        if (!this._isRender) {
            const $textContainer = this.$textContainer
            $textContainer.append($bar)
        } else {
            this._isRender = true
        }

        // 改变进度（节流，100ms 渲染一次）
        if (Date.now() - this._time > 100) {
            if (progress <= 1) {
                $bar.css('width', progress * 100 + '%')
                this._time = Date.now()
            }
        }

        // 隐藏
        let timeoutId = this._timeoutId
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            this._hide()
        }, 500)
    },

    _hide: function () {
        const $bar = this.$bar
        $bar.remove()

        // 修改状态
        this._time = 0
        this._isShow = false
        this._isRender = false
    }
}

export default ResizeImg
