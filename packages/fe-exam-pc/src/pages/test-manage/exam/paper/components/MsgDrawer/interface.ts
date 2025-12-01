import type {MessageDataType} from '../../interface'
export interface MsgDrawerProps {
    visible: boolean,
    setVisible: (e: boolean) => void,
    msgList: MsgItem[]
}

export interface MsgItem {
    messageContent: string,
    messageTime: number,
    messageType: MessageDataType
}