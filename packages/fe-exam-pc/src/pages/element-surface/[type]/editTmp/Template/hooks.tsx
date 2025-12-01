import { useState, useEffect } from 'react'
import Http from '@/servers/http'
import type { recordType } from './interface'
import { authenticateRanges } from '../AddModal/api'
export default (props: any) => {
    const { setTipsVisible, setType, setTipsData, dataSource } = props || {}
    const [tdHeightList, setTdHeightList] = useState<any[]>([])
    const border = (data: recordType[], index: number) => {
        if (index !== (data?.length || 0) - 1) {
            return '1px solid rgb(204, 204, 204,0.4)'
        } else {
            return ''
        }
    }
    const getTdHeightList = () => {
        const heightList: any[] = []
        setTimeout(() => {
            const tbody = document.getElementsByTagName('tbody')
            if (tbody && tbody[2].childNodes) {
                tbody[2].childNodes.forEach(item => {
                    // @ts-ignore
                    heightList.push(item.offsetHeight)
                })
            }
            setTdHeightList(heightList)
        })
    }
    const sum = (arr: recordType[]) => {
        return eval(arr.join('+'))
    }

    const edit = async (code: string, type: string, pointType: number) => {
        const res: any = await Http(`${authenticateRanges}/ladder/${code}`, 'GET', {
            type: pointType,
        })
        const list = res && Object.values(res)
        const tips =
            list.length > 0 &&
            list.map((ele: any) => {
                return ele
            })
        setType(type)
        setTipsData(tips)
        setTipsVisible(true)
    }
    useEffect(() => {
        if (dataSource && dataSource.length > 0) {
            getTdHeightList()
        }
    }, [dataSource])
    return {
        tdHeightList,
        edit,
        border,
        sum,
    }
}
