const fs = require('fs')
const path = require('path')
const jsonPath = path.join(__dirname, './src/domain/domain.json')
const domainPath = path.join(__dirname, './src/domain')

const initJson = () => {
    fs.writeFile(jsonPath, '{}', err => {
        if (err) {
            console.log('domain目录初始化失败')
        } else {
            console.log('domain目录初始化成功')
        }
    })
}

fs.access(domainPath, err => {
    if (err) {
        /**目录不存在时 创建目录并写入对象 */
        fs.mkdirSync(domainPath)
        initJson()
    } else {
        /**目录存在时 判断文件是否存在 */
        fs.access(jsonPath, err => {
            if (err) {
                /**文件不存在时 创建文件并写入 */
                initJson()
            }
        })
    }
})
