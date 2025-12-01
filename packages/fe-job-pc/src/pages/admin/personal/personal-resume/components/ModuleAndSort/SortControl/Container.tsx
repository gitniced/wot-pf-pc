import type { FC } from 'react'
import { useCallback, useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button } from 'antd'

import { Card } from './Card'

const _style = {
    width: 400,
}

export interface Item {
    id: number
    text: string
}

export interface ContainerState {
    cards: Item[]
}

const Container: FC = ({ userMenuConfig }: any) => {
    const [cards, setCards] = useState([] as any[])

    const userMenuConfigStr = JSON.stringify(userMenuConfig)

    useEffect(() => {
        if (!userMenuConfigStr) return
        // 固定不变的位置
        const prev = userMenuConfig.filter((item: any) => item.sort === 99)
        // 可拖拽的位置
        const next = JSON.parse(JSON.stringify(userMenuConfig))
            .filter((item: any) => item.sort !== 99)
            .sort((a: any, b: any) => a.sort - b.sort)

        const merge = [...prev, ...next].map((item, i) => ({ id: i, text: item.title, ...item }))
        setCards(merge)
    }, [userMenuConfigStr])

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            let data = JSON.parse(JSON.stringify(cards))
            let temp = data[dragIndex]
            // 交换位置
            data[dragIndex] = data[hoverIndex]
            data[hoverIndex] = temp
            setCards(data)
        },
        [cards],
    )

    const renderCard = useCallback(
        (card: { id: number; text: string }, index: number) => {
            return (
                <Card
                    data={card}
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.text}
                    moveCard={moveCard}
                />
            )
        },
        [cards],
    )

    return (
        <>
            <div className={styles.sort_card_container}>
                <div className={styles.tips}>拖拽调整模块的位置</div>
                {/* {cards?.slice(0, 5).map((card, i) => (
                    <div key={card.key} className={styles.sort_card_item_container}>
                        {card.title}
                    </div>
                ))} */}
                {cards?.map((card, i) => renderCard(card, i))}
            </div>
            <div className={styles.apply_right_btn}>
                <Button type="primary" size="small">
                    应用
                </Button>
            </div>
        </>
    )
}

export default Container
