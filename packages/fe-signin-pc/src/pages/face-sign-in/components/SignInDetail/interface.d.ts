import type { SIGN_TYPE } from "../../const";
import type { TaskSignTable } from "../../interface";

export interface SignInDetailProps {
    data: TaskSignTable,
    signType: SIGN_TYPE,
    /** 序号 */
    index?: number
}

export type Data = {
    img: string,
    status: number,
    time: number
}