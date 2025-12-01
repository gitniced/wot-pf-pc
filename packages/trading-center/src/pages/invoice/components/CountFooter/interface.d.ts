export type CountFooterProps = {
    count: number
    money: string
    onBack: () => void
    onNext: () => void
} & Record<string, any>
