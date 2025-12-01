import type { PageProps } from '@/types'

export interface FaceModalProps extends PageProps {
    // showFaceModal: boolean
    userCode?: string
    isLogin?: boolean
    onCancel: () => void
}
