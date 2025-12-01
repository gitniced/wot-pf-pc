/** 打开摄像头 */
export const getUserMedia = (constraints, success, error) => {
    if (navigator.mediaDevices?.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(success)
            .catch(error)
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error)
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error)
    }
}