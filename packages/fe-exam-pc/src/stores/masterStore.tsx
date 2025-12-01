import { history, useModel } from 'umi'

export default () => {
    const masterProps = useModel('@@qiankunStateFromMaster')

    if (!masterProps) {
        return {
            tag: 'exam',
            masterHistory: history,
            masterStore: {},
            gatewaySiteStore: {},
        }
    }

    return masterProps
}
