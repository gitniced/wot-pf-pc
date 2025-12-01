export interface AttachmentResumeProps {
    selectedFile?: FileItem
    onChange?: (file: FileItem) => void
    options: FileItem[]
}

export interface FileItem {
    candidateCode?: string
    code: string
    createdAt?: number
    fileName?: string
    fileUrl?: string
    updatedAt?: number
}
