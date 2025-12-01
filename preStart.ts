const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv')
const { stringify } = require('envfile')
const { resolve } = path

const getApi = () => {
  let kingUrl = ''
  switch (process.env.BUILD_ENV) {
    case 'dev':
      kingUrl = 'https://api-develop.cloud.wozp.cn' // 开发
      break

    case 'test':
      kingUrl = 'https://api.cloud.wozp.cn' // 测试
      break

    case 'pre':
      kingUrl = 'https://api-pre.cloud.wozp.cn' // 预发
      break

    case 'pro':
      kingUrl = `https://api.cloud.wozhipei.com` // 正式
      break

    default:
      // 开发
      kingUrl = 'https://api-develop.cloud.wozp.cn' // 开发
      break
  }
  return kingUrl
}

let nodeParams: string[] = process.argv || []

// 创建文件夹
const createFolder = async (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}

// 写入数据
function writeFiles(data: any) {
  const { filePath, info } = data || {}
  fs.writeFile(filePath, info, (err: Object) => {
    if (!err) {
      console.log(chalk.hex('#00FFFF')(`${filePath}写入成功`))
    } else {
      console.log(chalk.hex('#ff0000')(`${filePath}写入失败`))
      throw err
    }
  })
}

// 获取packages目录下所有的项目文件夹
function getPackageList(info: string) {
  const dirList: any[] = []
  const packagesPath = `${resolve(__dirname)}/packages`
  fs.readdirSync(packagesPath).forEach((file: string) => {
    if (!file.includes('.DS_Store')) {
      const folderPath = path.join(packagesPath, `${file}/src/domain`) as unknown as string
      const filePath = path.join(packagesPath, `${file}/src/domain/domain.json`) as unknown as string
      createFolder(folderPath)
      dirList.push({ filePath, info })
    }
  })
  return dirList
}

// 写入文件
function dealFiles(runtimeInfo: any) {
  // json序列化数据
  const str = JSON.stringify(runtimeInfo, null, 2)

  // 全局环境变量文件
  const envPath = `${resolve(__dirname)}/.env`

  // 运行时文件
  const runtimePath = `${resolve(__dirname)}/site`

  // 运行时文件
  const runtimeJsonPath = `${resolve(__dirname)}/site/runtime.json`

  // 兜底创建site目录
  createFolder(runtimePath)

  // 需要写入domain数据的项目
  const dirList = getPackageList(str)

  // 待写入的环境变量数据
  const envJson: string = stringify({
    BUILD_ENV: runtimeInfo.BUILD_ENV,
    ALIAS_ENV: runtimeInfo.ALIAS_ENV,
    SPECIAL_USER: runtimeInfo.SPECIAL_USER,
    RUN_ENV: 'local'
  })

  // 所有的文件列表
  const allFileList = [
    { filePath: envPath, info: envJson },
    { filePath: runtimeJsonPath, info: str }
  ].concat(dirList)

  // 集中写入
  allFileList.forEach((item: any) => {
    writeFiles(item)
  })
}

if (nodeParams.length < 3) {
  console.log(chalk.yellow('请指定站点'))
} else {
  // 站点指定
  const ALIAS_ENV: string = nodeParams[2]
  /**是否是特殊身份
   * 1 资源方
   */
  const SPECIAL_USER: 1 | 2 | 3 = nodeParams[3] as unknown as 1 | 2 | 3
  // 请求数据
  const instance = axios.create({
    baseURL: getApi(),
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
      'X-Site-Alias': ALIAS_ENV
    }
  })

  instance.get('/auth/backend/site/config').then((res: any) => {
    debugger
    if (res.data) {
      const { success, data: siteData } = res.data || {}
      if (success) {
        const { baseInfo } = siteData || {}
        let finalInfo: any = {}
        Object.keys(baseInfo).map(key => {
          if (Object.prototype.toString.call(baseInfo[key]) === '[object String]') {
            finalInfo[key] = baseInfo[key]
          }
        })

        finalInfo = {
          BUILD_ENV: process.env.BUILD_ENV,
          ALIAS_ENV,
          ...finalInfo
        }

        SPECIAL_USER ? (finalInfo.SPECIAL_USER = SPECIAL_USER) : null

        dealFiles(finalInfo)
      }
    }
  })
}
