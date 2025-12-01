#!/bin/bash

# 获取 json 内容
# @param {string} $1 键名
getJsonValue(){
    packageJson=`cat package.json`
    val=$(echo "$packageJson" | sed 's/,/\n/g' | grep "$1" | sed 's/:/\n/g' | sed '1d' | sed 's/"//g')
    
    echo $val
}

# 上传 sourcemap
# @param {string} $1 URL_PREFIX 解析路径
# @param {string} $2 ENV 环境变量
uploadSourcemap(){
    # package.json => name
    _NAME=$(getJsonValue '"name"')
    # package.json => version
    _VERSION=$(getJsonValue '"version"')
    # 版本号(需要和sentry.js中release变量保持一致)
    VERSION="$_NAME-v$_VERSION"
    # 上传文件的遍历路径
    INCLUDE="./dist"
    # .map 文件路径
    MAP_FILE_PATH="./dist/**/*.js.map"
    ############################################
    # 修改 sentry-cli cdn 源地址
    pnpm config set sentrycli_cdnurl=https://cdn.npm.taobao.org/dist/sentry-cli &&

    pnpm add @sentry/cli rimraf && 
    # 上传 sourcemap
    npx sentry-cli releases files $VERSION upload-sourcemaps --url-prefix $1 $INCLUDE &&
    # 更新环境
    npx sentry-cli releases deploys $VERSION new -e $2 &&
    # 删除 .map 文件
    npx rimraf $MAP_FILE_PATH
}