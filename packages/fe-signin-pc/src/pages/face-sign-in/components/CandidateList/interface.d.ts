import type { SIGN_TYPE } from "../../const";

export interface CandidateListProps {
    signType: SIGN_TYPE,
}

export interface TabCount {
    allCount: number;
    signedCount: number;
    unSignedCount: number;
    taskCode: string;
}
