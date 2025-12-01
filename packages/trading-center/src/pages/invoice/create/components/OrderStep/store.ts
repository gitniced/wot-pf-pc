import { makeAutoObservable } from 'mobx'
class OrderStepStore {
    public selectedRows: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    addSelectRow = (rows: any) => {
        this.selectedRows = this.selectedRows.concat(rows)
    }
    /** 要删除的keys */
    delSelectRow = (rowkey: string) => {
        const delKey = this.selectedRows.findIndex(item => item.code === rowkey)
        this.selectedRows.splice(delKey, 1)
    }
}

export default OrderStepStore
