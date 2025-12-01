/**
 * Created by cgl on 2020/9/15.
 * Theme：权限配置item
 * title：title
 */
import React from 'react'
import styles from './index.module.less'

export default function () {
    // {
    //     "success": true,
    //     "messageCode": "200",
    //     "message": "操作成功！",
    //     "data": [
    //       {
    //         "title": "平台",
    //         "type": null,
    //         "typeName": "平台",
    //         "key": 1,
    //         "route": null,
    //         "has": null,
    //         "pid": null,
    //         "moduleId": null,
    //         "children": [
    //           {
    //             "title": "test",
    //             "type": 1,
    //             "typeName": "平台",
    //             "key": 0,
    //             "route": null,
    //             "has": true,
    //             "pid": null,
    //             "moduleId": 1,
    //             "children": [
    //               {
    //                 "title": "二级1",
    //                 "type": null,
    //                 "typeName": null,
    //                 "key": 1,
    //                 "route": "/index",
    //                 "has": null,
    //                 "pid": 0,
    //                 "moduleId": 1,
    //                 "children": [
    //                   {
    //                     "title": "三级1",
    //                     "type": null,
    //                     "typeName": null,
    //                     "key": 5,
    //                     "route": "/name",
    //                     "has": true,
    //                     "pid": 1,
    //                     "moduleId": 0,
    //                     "children": null
    //                   }
    //                 ]
    //               },
    //               {
    //                 "title": "二级11",
    //                 "type": null,
    //                 "typeName": null,
    //                 "key": 8,
    //                 "route": "/1111",
    //                 "has": null,
    //                 "pid": 0,
    //                 "moduleId": 1,
    //                 "children": null
    //               }
    //             ]
    //           },
    //
    //     ]
    //   }
    //  let { data } = props
    //  let {
    //     title,
    //     typeName,
    //     key,
    //     route,
    //     has,
    //     moduleId

    //  }=data

    return (
        <div className={styles.item}>
            <div className={styles.item_first}>
                <input type="checkbox" value="" />
                权限管理
            </div>
        </div>
    )
}
