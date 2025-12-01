const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const regex = /(?<=\[)(.+?)(?=\])/g
const mainTurboJSON = require('./turbo.json')
const mainPackageJSON = require('./package.json')
const path = require('path')
const defaultPackageScript = 'dotenv -- turbo '

/**
 * 全部项目列表
 */
let projectList = []

/**
 * 流水线名称
 */
let turboName = ''

/**
 * 复写json文件
 */
const whiteJson = (tempPath, tempContent) => {
    fs.writeFile(tempPath, tempContent, err => {
        if (!err) {
            console.log(chalk.hex('#00a886')(`${tempPath}修改成功`))
        } else {
            console.log(chalk.hex('#00FFFF')(`${tempPath}修改失败`))
            throw err
        }
    })
}

/**
 * 设置流水线名称
 */
const getTurboName = () => {
    inquirer
        .prompt({
            name: 'turboName',
            type: 'input',
            message: '请输入流水线名称,不可与现有的命令重复',
        })
        .then(answers => {
            const existsName = Object.keys(mainPackageJSON.scripts).concat(
                Object.keys(mainTurboJSON.pipeline),
            )
            if (existsName.includes(answers.turboName)) {
                console.log(chalk.hex('#ff0000')('流水线名称重复,请重新输入'))
                getTurboName()
            } else {
                turboName = answers.turboName
                getProjects()
            }
        })
}

/**
 * 获取需要运行的项目
 */
const getProjects = () => {
    inquirer
        .prompt({
            name: 'projects',
            type: 'checkbox',
            message: '请选择要运行的项目',
            choices: projectList,
            filter: function (val) {
                return val
            },
        })
        .then(answers => {
            if (answers.projects.length > 0) {
                // 将命令植入 package.json文件
                mainPackageJSON.scripts[turboName] = `${defaultPackageScript}${turboName}`

                // 将命令植入 turbo.json文件
                mainTurboJSON.pipeline[turboName] = {
                    cache: false,
                }

                const mainPackageJSONPath = `${path.resolve(__dirname)}/package.json`

                let projectFilter = answers.projects
                    .map(project => {
                        return `--filter="./${project}"`
                    })
                    .join(' ')
                    .trim()
                let command = `dotenv -- turbo turboPipeline ${projectFilter}`

                mainPackageJSON.scripts[turboName] = command

                // 将命令植入根目录 package.json文件
                whiteJson(mainPackageJSONPath, JSON.stringify(mainPackageJSON, null, 2))
            } else {
                console.log(chalk.hex('#ff0000')('请选择要运行的项目'))
                getProjects()
            }
        })
        .catch(inquirerErr => {
            console.log(inquirerErr)
        })
}

fs.readFile('.gitmodules', 'utf8', function (err, dataStr) {
    if (err) {
        console.log(chalk.hex('#ff0000')(err))
    } else {
        let path = dataStr.match(regex)
        projectList = path.map(tempPath => {
            return tempPath.replace('submodule ', '').replaceAll('"', '')
        })
        getTurboName()
    }
})
