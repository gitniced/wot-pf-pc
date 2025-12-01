import { makeAutoObservable } from 'mobx'
import type { IAIExchangeData } from './types'
import { BIT_TYPE } from './const'

class AIStore {
    // 课程相关的数据
    exchangeData: IAIExchangeData | null = null

    get isStylistic() {
        return (
            this.exchangeData?.bizType &&
            [
                BIT_TYPE.wayOne,
                BIT_TYPE.wayTwo,
                BIT_TYPE.wayThree,
                BIT_TYPE.wayFour,
                BIT_TYPE.wayFive,
                BIT_TYPE.waySix,
                BIT_TYPE.waySeven,
                BIT_TYPE.wayEight,
                BIT_TYPE.wayNine,
                BIT_TYPE.wayTen,
                BIT_TYPE.wayEleven,
                BIT_TYPE.wayTwelve,
            ].includes(this.exchangeData?.bizType as BIT_TYPE)
        )
    }

    constructor() {
        makeAutoObservable(this)
    }

    getStylisticType(bitType: BIT_TYPE): number {
        switch (bitType) {
            case BIT_TYPE.wayOne:
                return 1
            case BIT_TYPE.wayTwo:
                return 2
            case BIT_TYPE.wayThree:
                return 3
            case BIT_TYPE.wayFour:
                return 4
            case BIT_TYPE.wayFive:
                return 5
            case BIT_TYPE.waySix:
                return 6
            case BIT_TYPE.waySeven:
                return 7
            case BIT_TYPE.wayEight:
                return 8
            case BIT_TYPE.wayNine:
                return 9
            case BIT_TYPE.wayTen:
                return 10
            case BIT_TYPE.wayEleven:
                return 11
            case BIT_TYPE.wayTwelve:
                return 12
            default:
                return 0
        }
    }

    setExchangeData(data: IAIExchangeData) {
        this.exchangeData = data
    }

    clearExchangeData() {
        this.exchangeData = null
    }
}

const aiStore = new AIStore()

export default aiStore
