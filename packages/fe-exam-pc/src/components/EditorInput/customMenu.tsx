// import type { IButtonMenu, IDomEditor } from '@wangeditor/editor'
import MathFormulaModal from './mathFormulaModal'
import BaseButtomMenu from './baseButtonMenu'
// 自定义数学公式菜单
class MathFormulaMenu extends BaseButtomMenu {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super()
    }
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor: any) {
        return <MathFormulaModal onInit={this.modalInit} editor={editor} />
    }
}

const mathFormulaMenuConf = {
    key: 'custom-math-formula-menu',
    factory() {
        return new MathFormulaMenu()
    },
}
export default mathFormulaMenuConf
