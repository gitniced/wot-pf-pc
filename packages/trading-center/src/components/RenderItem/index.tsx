import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.less'

const RenderItem = (props: any) => {
    const { dataJson = [] } = props
    return (
        <div className={styles.template_content}>
            <Row gutter={24} className={styles.rows}>
                {dataJson.map(item => {
                    return (
                        <Col span={8} key={item.toString()} className={styles.col}>
                            <div className={styles.label}>{item.label}</div>
                            <div className={styles.value} title={item.value}>
                                {item.value}
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default RenderItem

// import React from 'react'
// import { Image, Popover } from 'antd'
// import styles from './index.module.less'
// function TemplateLayout(props: any) {
//     const {
//         dataJson = [],
//         col = 4,
//         lineMarginTop,
//         labelStyle,
//         valueStyle,
//         lineStyle,
//         itemStyle,
//         height,
//         warpStyle,
//     } = props;
//     //一维数组转多维
//     const transformArray = <T,>(arr: T[], dimension: number) => {
//         let index: number = 0,
//             templateArr: T[] = [],
//             newArr: T[][] = []
//         for (let i = 0; i < arr.length; ++i) {
//             if (!(index < dimension)) {
//                 newArr.push(templateArr)
//                 templateArr = []
//                 index = 0
//             }
//             templateArr.push(arr[i])
//             index++
//         }
//         if (templateArr.length) newArr.push(templateArr)

//         return newArr
//     }
//     //获取每个元素的宽占比
//     const getPercentage = (f: number): number => +(100 / f).toFixed(2)
//     //元素会组成多少行并进行高度的自适应
//     const getLineNum = (colnum: number): number => 100 / Math.ceil(dataJson.length / colnum)
//     console.log('getLineNum: ', getLineNum);
//     //转换为多维数组
//     const viewValue = transformArray(dataJson, col)
//     console.log('viewValue: ', viewValue);
//     const getItemPopver = (children: any) => {
//         if (children.popver) {
//             return (
//                 <Popover
//                     content={<span style={{ color: '#fff' }}>{children.value}</span>}
//                     color="rgba(0, 0, 0, 0.75)"
//                     getPopupContainer={() => document.getElementById('popver') as HTMLLIElement}
//                 >
//                     <div className={styles.value} style={{ ...valueStyle, ...children.valueStyle }}>
//                         {children.value}
//                     </div>
//                 </Popover>
//             )
//         } else {
//             return (
//                 <div className={styles.value} style={{ ...valueStyle, ...children.valueStyle }}>
//                     {children.value}
//                 </div>
//             )
//         }
//     }
//     const getItemMarginTop = (index: number) => {
//         if (index > 0) {
//             return `${lineMarginTop}px`
//         } else {
//             return '0px'
//         }
//     }

//     return (
//         <div className={styles.layout_warp} style={{ height: height, ...warpStyle }}>
//             {viewValue.map((item, index) => {
//                 return (
//                     <div
//                         className={styles.layout_line}
//                         key={item.toString()}
//                         style={{
//                             height: `${getLineNum(col)}%`,
//                             ...lineStyle,
//                             marginTop: getItemMarginTop(index),
//                         }}
//                     >
//                         {item.map((children: any) => {
//                             console.log('children: ', children);
//                             let type = children?.type ?? 'text'
//                             console.log('type: ', type);
//                             return (
//                                 <div
//                                     className={styles.layout_item}
//                                     key={children.toString()}
//                                     id="popver"
//                                     style={{
//                                         width: `${getPercentage(col)}%`,
//                                         ...itemStyle,
//                                         ...children.itemStyle,
//                                     }}
//                                 >
//                                     <div
//                                         className={styles.label}
//                                         style={{ ...labelStyle, ...children.labelStyle }}
//                                     >
//                                         {children.label}
//                                     </div>
//                                     {type === 'text' ? (
//                                         getItemPopver(children)
//                                     ) : (
//                                         /*  <div
//                                              className={styles.value}
//                                              style={{ ...valueStyle, ...children.valueStyle }}
//                                          >
//                                              {children.value}
//                                          </div> */
//                                         <Image
//                                             className={styles.img_value}
//                                             style={{ ...valueStyle, ...children.valueStyle }}
//                                             src={children.value}
//                                         />
//                                     )}
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default TemplateLayout
