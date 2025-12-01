import { Button } from 'antd'
import { observer } from 'mobx-react'
import PositionModal from '../PositionModal'

interface IChooseAPositionProps {
    value?: any[]
    onChange?: (value: any[]) => void
}

/**   选择岗位  */
const ChooseAPosition: React.FC<IChooseAPositionProps> = props => {
    const { value, onChange } = props

    const submit = (s: any[]) => {
        onChange?.(s)
    }

    return (
        <>
            {value ? (
                <>
                    {`已选${value?.length || 0}个岗位`}
                    <Button
                        onClick={() => {
                            PositionModal({
                                value,
                                submit,
                            })
                        }}
                        type="link"
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        重新选择岗位
                    </Button>
                </>
            ) : (
                <Button
                    onClick={() => {
                        PositionModal({
                            submit,
                        })
                    }}
                >
                    选择岗位
                </Button>
            )}
        </>
    )
}

export default observer(ChooseAPosition)
