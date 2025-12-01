import { Button } from 'antd'
import MapContainerModal from '../MapContainerModal'
import { observer } from 'mobx-react'

interface ISelectActivityAdressProps {
    value?: {
        label: string
        value: string
    }
    onChange?: (value: object) => void
}

/**   选择活动地点  */
const SelectActivityAdress: React.FC<ISelectActivityAdressProps> = props => {
    const { value, onChange } = props

    const submit = (s: any) => {
        onChange?.({
            // label: `${s.current.addressInfo}${s.current.label}`,
            label: s.current.label,
            value: s.current.value,
            arg: s.current,
        })
    }

    return (
        <>
            {value ? (
                <>
                    {value?.label}
                    <Button
                        onClick={() => {
                            MapContainerModal({
                                value,
                                submit,
                            })
                        }}
                        type="link"
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        重新选择
                    </Button>
                </>
            ) : (
                <Button
                    onClick={() => {
                        MapContainerModal({
                            submit,
                        })
                    }}
                >
                    选择地点
                </Button>
            )}
        </>
    )
}

export default observer(SelectActivityAdress)
