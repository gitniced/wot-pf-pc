import React from 'react'
import type PcPageStore from './../../../store'
import type { ContentItem, PreviewItem } from '../../../../../components/utils/interface'
import { LAYOUT_STYLE } from '../../../../../components/utils/interface.d'
import styles from '../../../../../web/create/components/ActionBar/ArticleContent/index.module.less'
import { Form, InputNumber } from 'antd'
import AddCard from '@/pages/gateway/components/AddCard'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import { renderData } from '@/utils/parseValue'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'
import ChoiceCategory from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/components/ChoiceCategory'

export function AddContentConfig(
    data: PreviewItem,
    stores: PcPageStore,
    value: string,
    addImageText: (val: string) => false | undefined,
    sortChange: (codes: any[]) => void,
    CardRender: (contentItemData: ContentItem) => JSX.Element,
) {
    return (e: string) => {
        switch (e) {
            /**  默认规则  */
            case RADIO_VALUE_ENUM.DEFAULT:
                return data.layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? null : (
                    <div className={styles.category}>
                        <Form layout="vertical">
                            <Form.Item
                                name="numberOfRows"
                                label="当前页展示："
                                rules={[{ required: true }]}
                            >
                                最多{' '}
                                <InputNumber
                                    min={1}
                                    max={4}
                                    value={data?.showLine || 2}
                                    onChange={event => {
                                        stores.fixPreviewList({
                                            ...data,
                                            showLine: event || 2,
                                        })
                                    }}
                                />
                                &nbsp;行
                            </Form.Item>
                        </Form>
                    </div>
                )
            /**  手动选择  */
            case RADIO_VALUE_ENUM.MANUAL:
                return (
                    <AddCard
                        label="添加图文"
                        disabled={value === '1' && true}
                        isUpload={false}
                        onChange={() => {
                            addImageText(value)
                        }}
                    >
                        <MoveContainer
                            isDragDisabled={value === RADIO_VALUE_ENUM.DEFAULT ? true : false}
                            datasource={renderData(data, () => {
                                stores.fixPreviewList({
                                    ...data,
                                    codes: [],
                                })
                            })}
                            rowKey="code"
                            onChange={result => {
                                sortChange(result)
                            }}
                        >
                            {item => {
                                return CardRender(item)
                            }}
                        </MoveContainer>
                    </AddCard>
                )
            /**  按分类  */
            case RADIO_VALUE_ENUM.CATEGORY:
                return (
                    <div className={styles.category}>
                        <Form layout="vertical">
                            <Form.Item
                                name="category"
                                label="选择分类："
                                rules={[{ required: true }]}
                            >
                                <ChoiceCategory
                                    datas={data}
                                    fixPreviewList={stores.fixPreviewList}
                                />
                            </Form.Item>
                            {data.layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? null : (
                                <Form.Item
                                    name="numberOfRows"
                                    label="当前页展示："
                                    rules={[{ required: true }]}
                                >
                                    最多{' '}
                                    <InputNumber
                                        min={1}
                                        max={4}
                                        value={data?.showLine || 2}
                                        onChange={event => {
                                            stores.fixPreviewList({
                                                ...data,
                                                showLine: event || 2,
                                            })
                                        }}
                                    />{' '}
                                    &nbsp;行
                                </Form.Item>
                            )}
                        </Form>
                    </div>
                )
        }
    }
}
