export const getContentTitle = (val: string) => {
    switch (val) {
        case '1':
            return <>默认展示最新创建的报名活动</>
        case '2':
            return <>添加报名活动，最多50个（鼠标拖拽可调整顺序）</>
        case '3':
            return <>默认展示所选分类下最新发布的报名</>
        default:
    }
}
