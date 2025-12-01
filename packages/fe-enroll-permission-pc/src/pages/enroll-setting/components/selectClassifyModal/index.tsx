import { Modal } from 'antd'
import styles from './index.modules.less'
import type SettingStore from '../../store'
import Category from '../Category'
import { getLocalStorage } from '@/storage'
import { observer } from 'mobx-react'

interface IProps {
    visible: boolean
    setSelectClassify: (val: boolean) => void
    onCancel: () => void
    store: SettingStore
    form: any
}
//选择分类modal selectClassifyModal
const SelectClassifyModal: React.FC<IProps> = ({
    visible,
    onCancel,
    store,
    form,
    setSelectClassify,
}) => {
    /**  modal ok事件  */
    const onfinish = () => {
        // @ts-ignore
        const ids = store.modalSelectValue?.value || []
        // @ts-ignore
        const nameList = store.modalSelectValue?.name || []

        if (ids?.length && nameList?.length) {
            form.setFieldsValue({
                categoryCode: ids,
            })
            store.changeCateName(nameList)
            store.changeSelectedCategoryList(store.modalSelectValue!)
            setSelectClassify(false)
        }
    }

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            centered
            title="选择分类"
            width={1350}
            onOk={onfinish}
            destroyOnClose
            className={styles.selectClassifyModal}
            okButtonProps={{ disabled: !store.isLastCate }}
        >
            <Category
                title="请先选择分类"
                classificationType="standard"
                // @ts-ignore
                value={store.modalSelectValue}
                onChange={(val: any, isJobId: boolean, ispid: boolean) => {
                    /**  必须要选到最后一级产能确定
                     *  isJobId  必须选到职业
                     *  职业下面可能有工种或者等级
                     */
                    if (isJobId) {
                        store.changeIsLastCate(ispid)
                    } else {
                        store.changeIsLastCate(false)
                    }
                    store.changeSelectClassify(val)
                }}
                sid={getLocalStorage('SID')}
            />
        </Modal>
    )
}

export default observer(SelectClassifyModal)
