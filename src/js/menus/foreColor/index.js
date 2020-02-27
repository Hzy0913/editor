/*
    menu - Forecolor
*/
import $ from '../../util/dom-core.js'
import DropList from '../droplist.js'

// 构造函数
function ForeColor(editor) {
    this.editor = editor
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-pencil2"></i></div>')
    this.type = 'droplist'

    // 获取配置的颜色
    const config = editor.config
    const colors = config.colors || []

    // 当前是否 active 状态
    this._active = false

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 120,
        $title: $('<p>文字颜色</p>'),
        type: 'inline-block', // droplist 内容以 block 形式展示
        list: colors.map(color => {
            return { $elem: $(`<i style="color:${color};" class="w-e-icon-pencil2"></i>`), value: color }
        }),
        $bottom: `<div class="custom-set-color">
            <input type="text" class="custom-set-color-input">
            <button>确定</button>
        </div>`,
        onClick: (value) => {
            // 注意 this 是指向当前的 ForeColor 对象
            console.log(value)
            this._command(value)
        },
        $bottomOnClick: (e) => {
            const { target } = e;

            if (target.nodeName === 'BUTTON') {
                const { value } = document.querySelector('.custom-set-color-input');
                const divElement = document.createElement('div');
                divElement.style.color = value;

                if (!divElement.style.color) {
                    alert('颜色不正确')
                }

                console.log(divElement.style.color,value, 11111)
                this._command(value);
            }


            console.log(target)
        }
    })
}

// 原型
ForeColor.prototype = {
    constructor: ForeColor,

    // 执行命令
    _command: function (value) {
        const editor = this.editor
        editor.cmd.do('foreColor', value)
    }
}

export default ForeColor
