
// @ts-ignore
import { useModel } from "umi"

export default () => {
    const masterProps = useModel('@@qiankunStateFromMaster') || {  }

    return masterProps
}