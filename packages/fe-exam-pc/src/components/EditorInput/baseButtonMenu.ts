import ReactDOM from 'react-dom'
import type { IDomEditor } from '@wangeditor/editor'

// 用buttonmenu来打开一个modal
export default class BaseButtomMenu {
    title: string
    tag: string
    iconSvg: string
    id: string = `modal-${Math.random().toString(36).slice(2)}`
    $ele: HTMLDivElement
    $root: any
    ifInit: boolean
    controlShow: (i: boolean) => void = Function.prototype as any
    constructor() {
        this.title = '插入数学公式'
        this.iconSvg = `
            <svg t="1685610209874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12896" width="200" height="200"><path d="M73.874286 663.259429l-72.411429 1.024-1.243428-93.110858 135.094857-1.828571 34.816 83.748571 144.749714-579.364571h705.389714V166.765714H387.072L192.073143 947.931429 73.874286 663.186286z m355.474285 215.405714l159.451429-271.140572L434.102857 310.125714h421.302857l58.514286 139.629715-85.430857 36.059428-34.669714-82.797714H587.044571l107.739429 206.994286-103.131429 175.542857h203.264l34.157715-74.971429 84.260571 38.765714-58.953143 129.316572h-424.96z" p-id="12897"></path></svg>
            `
        this.tag = 'button'
        this.$ele = document.createElement('div')
        this.ifInit = false
        this.$ele.id = this.id
        // this.$root = ReactDOM.createRoot(this.$ele!);

        // this.$root = ReactDOM.createPortal(this.$ele!);
    }
    modalInit = (method: (i: boolean) => void) => {
        // 这里把控制react的方法透出
        this.controlShow = method
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive() {
        return false
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled() {
        return false
    }

    // 点击菜单时触发的函数
    exec(editor: IDomEditor, value: string | boolean) {
        if (this.ifInit) {
            this.controlShow(true)
            return
        }
        // @ts-ignore
        ReactDOM.render(value, this.$ele)
        document.body.appendChild(this.$ele)

        this.ifInit = true
    }
}
