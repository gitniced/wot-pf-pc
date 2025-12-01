const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const chalk = require('chalk')

/**
 * 主函数：入口函数，协调整个提取流程
 * @param {string} routeConfigPath 路由配置文件路径（如：src/layouts/index.tsx）
 * @param {string} projectRoot 项目根目录（用于解析绝对路径）
 * @returns {object} 路由与接口映射的 JSON 对象
 */
function extractRouteApis(routeConfigPath, projectRoot) {
    // 步骤1：解析路由配置文件，提取所有页面路由信息
    const rawRoutes = getFlatRoutes(routeConfigPath)

    // 步骤2：过滤无效路由并解析组件路径（处理 @/ 别名）
    const validRoutes = filterAndResolveRoutes(rawRoutes, projectRoot)

    const routeApiMap = validRoutes
        .map(item => {
            const { path, component_path } = item
            const resultItem = getRouteApis(component_path, path)
            let { apis } = resultItem
            apis = Array.from(new Set(apis))
            return { ...resultItem, apis }
        })
        .filter(i => i.apis.length > 0)

    // console.log(routeApiMap);

    return routeApiMap
}

// 需要忽略的目录
const IGNORE = new Set([
    'components',
    'component',
    'constants',
    'constants.ts',
    'constants.tsx',
    'columns.tsx',
    'columns.ts',
    'enums.ts',
    'enums.tsx',
    'config.ts',
    'config.tsx',
    'utils.ts',
    'utils.tsx',
    'hooks',
    'store',
    'const',
    'api',
    'transFormValues.ts',
    'interface',
    'hooks.ts',
    'store.ts',
    'const.ts',
    'api.ts',
    'interface.ts',
    'hooks.tsx',
    'store.tsx',
    'const.tsx',
    'api.tsx',
    'interface.tsx',
    'interface.d.ts',
    'utils',
    'util',
    'models',
    'services',
    'dataoverview',
    'dataoverview.tsx',
])

/**
 * 获取扁平化约定式路由
 * @param {string} root 项目根目录，默认 process.cwd()
 * @returns {Array<{path:string,exact?:boolean,component:string}>}
 */
function getFlatRoutes(pagesDir) {
    if (!fs.existsSync(pagesDir)) return []
    const routes = []
    scan(pagesDir, '', routes)
    return routes
}
function scan(dir, relPath, out) {
    const items = fs.readdirSync(dir)
    items.forEach(item => {
        const full = path.join(dir, item)
        const stat = fs.statSync(full)

        if (stat.isDirectory()) {
            if (IGNORE.has(item.toLowerCase())) return
            scan(full, path.posix.join(relPath, item), out)
        } else {
            if (IGNORE.has(item.toLowerCase())) return
            const ext = path.extname(item)
            if (!['.tsx', '.ts', '.jsx', '.js'].includes(ext)) return

            const name = path.basename(item, ext)
            let routePath = path.posix.join('/', relPath, name)

            // index 路由
            if (name === 'index') routePath = relPath ? `/${relPath}` : '/'
            // 404 路由
            if (name === '404') routePath = '*'
            // 动态路由 $id → :id
            routePath = routePath.replace(/\/\$([^/]+)/g, '/:$1')

            // 拼装 component：@/pages/xxx/yyy.tsx
            const compPath = path.posix.join('@/pages', relPath, item).replace(/\/+/g, '/')

            out.push({
                path: routePath,
                exact: true,
                component: compPath,
            })
        }
    })
}

/**
 * 过滤无效路由并解析组件路径（处理 @/ 别名）
 * @param {Array} rawRoutes 原始路由数组
 * @param {string} projectRoot 项目根目录
 * @returns {Array} 有效路由数组（包含解析后的组件路径）
 */
function filterAndResolveRoutes(rawRoutes, projectRoot) {
    const tempRoutes = rawRoutes.filter(route => {
        // 过滤无 component 的路由（如兜底路由）
        if (!route.component) {
            console.warn(`⚠️ 路由无 component: ${route.path || '未命名路由'}`)
            return false
        }

        // 解析组件路径（处理 @/ 别名）
        const componentPath = resolveComponentPath(route.component, projectRoot)
        if (!componentPath || !fs.existsSync(componentPath)) {
            console.warn(`⚠️ 组件不存在: ${route.component}（路由路径: ${route.path}）`)
            return false
        }

        return true
    })

    return tempRoutes.map(route => {
        // 解析组件路径（处理 @/ 别名）
        const componentPath = resolveComponentPath(route.component, projectRoot)
        // 补充路由元信息（递归处理子路由）
        return {
            ...route,
            component_path: componentPath, // 真实文件路径
            title: route.title || '未命名路由',
            // 递归过滤子路由（若有）
            routes: route.routes ? filterAndResolveRoutes(route.routes, projectRoot) : [],
        }
    })
}

/**
 * 解析组件路径（处理 @/ 别名）
 * @param {string} source 组件路径字符串（如：'@/pages/403/index.tsx'）
 * @param {string} projectRoot 项目根目录
 * @returns {string} 真实文件路径（如：/Users/xxx/project/src/pages/403/index.tsx）
 */
function resolveComponentPath(source, projectRoot) {
    // 处理 @/ 别名（假设项目配置 @ -> src）
    if (source.startsWith('@/')) {
        return path.resolve(projectRoot, 'src', source.slice(2)) // 替换 @/ 为 src/
    }
    // 处理相对路径（如 ./components/Button）
    return path.resolve(projectRoot, source)
}
/* ---------- 工具 ---------- */
const winPath = p => p.replace(/\\/g, '/')

/**
 * 把 import 路径解析成绝对文件
 */
function resolveImport(importPath, fromFile) {
    const fileBasePath = fromFile.split('/src')[0]
    if (importPath.startsWith('@/components')) {
        importPath = importPath.replace('@/components', `${fileBasePath}/src/components`)
    } else if (importPath.startsWith('@/')) {
        importPath = importPath.replace('@/', `${fileBasePath}/`)
    } else {
        importPath = winPath(path.resolve(path.dirname(fromFile), importPath))
    }
    const exts = ['.ts', '.tsx', '.js', '.jsx', '/index.tsx', '/index.ts']
    for (const ext of exts) if (fs.existsSync(importPath + ext)) return importPath + ext
    return null
}

/**
 * 解析单个文件
 * 返回 { aliases: Set<string>, apiMap: Record<string,string>, deps: string[] }
 */
function parseSingle(filePath) {
    if (!fs.existsSync(filePath)) return { aliases: new Set(), apiMap: {}, deps: [] }
    const code = fs.readFileSync(filePath, 'utf-8')
    let ast
    try {
        ast = parser.parse(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        })
    } catch {
        return { aliases: new Set(), apiMap: {}, deps: [] }
    }

    const aliases = new Set()
    const apiMap = {}
    const apis = []
    const deps = []
    const exportApis = {}

    // 1. 收集别名
    traverse(ast, {
        ImportDeclaration(importPath) {
            const { node } = importPath
            if (node.source.value === '@/servers/http') {
                node.specifiers.forEach(s => {
                    if (t.isImportDefaultSpecifier(s)) aliases.add(s.local.name)
                    if (t.isImportSpecifier(s)) aliases.add(s.local.name)
                })
            }
            if (node.importKind && node.importKind !== 'type') {
                const abs = resolveImport(node.source.value, filePath)
                if (abs) deps.push(abs)
            }
        },
        CallExpression({ node }) {
            // require(...)
            if (
                t.isIdentifier(node.callee, { name: 'require' }) &&
                t.isStringLiteral(node.arguments[0])
            ) {
                const abs = resolveImport(node.arguments[0].value, filePath)
                if (abs) deps.push(abs)
            }
        },
    })

    // 2. 收集 const api = { ... }
    traverse(ast, {
        VariableDeclarator({ node }) {
            if (
                (t.isIdentifier(node.id, { name: 'api' }) && t.isObjectExpression(node.init)) ||
                (t.isIdentifier(node.id, { name: 'API' }) && t.isObjectExpression(node.init))
            ) {
                node.init.properties.forEach(prop => {
                    if (
                        t.isObjectProperty(prop) &&
                        t.isIdentifier(prop.key) &&
                        t.isStringLiteral(prop.value)
                    ) {
                        apiMap[prop.key.name] = prop.value.value
                    }
                })
            }
        },
        ExportDefaultDeclaration(exportPath) {
            const declaration = exportPath.node.declaration
            if (t.isObjectExpression(declaration)) {
                declaration.properties.forEach(prop => {
                    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                        const key = prop.key.name
                        const valueNode = prop.value
                        // 提取字符串字面量（如 '/business/front/imagetext/page'）
                        if (t.isStringLiteral(valueNode)) {
                            exportApis[key] = valueNode.value
                        }
                    }
                })
                // console.log(filePath);
                // console.log(exportApis);
            }
        },
        ExportNamedDeclaration(exportPath) {
            const declaration = exportPath.node.declaration
            if (filePath.includes('api')) {
                // 仅处理变量声明（如 `export const a = 'xxx'`）
                if (t.isVariableDeclaration(declaration)) {
                    // 遍历声明中的每个变量（如 `const a = 'xxx', b = 'yyy'`）
                    declaration.declarations.forEach(declarator => {
                        const variableName = declarator.id.name // 变量名（如 'batchImportApi'）
                        const initNode = declarator.init // 初始化表达式（如字符串字面量）
                        // 仅处理字符串字面量类型的值（排除对象、函数等）
                        if (t.isStringLiteral(initNode)) {
                            apiMap[variableName] = initNode.value // 记录键值对
                        }
                    })
                }
            }
        },
    })
    return { aliases, apis, apiMap: { ...apiMap, ...exportApis }, deps }
}

/**
 * 仅通过 import/require 图递归
 */
function buildGraph(entry) {
    const visited = new Set()
    const queue = [entry]
    const allAliases = new Set()
    let globalApis = []
    const globalApiMap = {}
    while (queue.length) {
        const cur = queue.shift()
        if (visited.has(cur)) continue
        visited.add(cur)
        const { aliases, apiMap, apis, deps } = parseSingle(cur)
        globalApis = Array.from(new Set(globalApis.concat(apis)))
        Object.assign(globalApiMap, apiMap)
        aliases.forEach(a => allAliases.add(a))
        queue.push(...deps.filter(d => !visited.has(d)))
    }

    return {
        aliases: allAliases,
        apiMap: globalApiMap,
        apis: globalApis,
        files: [...visited],
    }
}

/**
 * 主函数：提取所有 Http/http 调用并映射完整 URL
 * @param {object} config 配置项
 * @param {string[]} config.apis 使用的api集合
 * @param {Set} config.aliases Http/http 别名集合
 * @param {object} config.apiMap API 键值映射（键：API 名称，值：完整 URL）
 * @param {string[]} config.files 需要分析的文件列表
 * @param {string} config.path 当前项目路径（可选）
 * @returns {Array} 结果数组（包含文件、行号、URL 等信息）
 */
function extractHttpUrls(config) {
    let { aliases, apiMap, apis, files } = config

    const handleHttpCall = (callPath, alias, apiObj, apiArr, fPath) => {
        const callee = callPath.node.callee
        if (!isHttpAlias(callee.name, alias)) return
        // 提取调用参数（第一个参数通常是 URL 或 API 键）
        const args = callPath.node.arguments
        if (args.length === 0) return
        const urlArg = args[0]
        const url = resolveUrlArg(urlArg, callPath.scope, apiObj, fPath) || ''
        if (!url) return
        apiArr.push(url)
    }

    // 遍历所有文件
    for (const filePath of files) {
        const code = fs.readFileSync(filePath, 'utf-8')
        // 解析文件 AST
        const ast = parser.parse(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        })

        if (!ast) continue

        // 遍历 AST 查找 Http/http 调用
        traverse(ast, {
            // 处理条件语句（if/else）
            IfStatement(ifPath) {
                // 处理 then 块（consequent）
                if (t.isBlockStatement(ifPath.node.consequent)) {
                    traverse(
                        ifPath.node.consequent,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        ifPath.scope, // 传递当前路径的作用域
                        ifPath, // 传递当前路径作为父路径
                    )
                }
                // 处理 else 块（alternate）
                if (ifPath.node.alternate && t.isBlockStatement(ifPath.node.alternate)) {
                    traverse(
                        ifPath.node.consequent,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        ifPath.scope, // 传递当前路径的作用域
                        ifPath, // 传递当前路径作为父路径
                    )
                }
            },

            // // 处理逻辑与（&&）和逻辑或（||）
            LogicalExpression(logicalPath) {
                // 左操作数
                if (t.isCallExpression(logicalPath.node.left)) {
                    traverse(
                        logicalPath.node.left,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        logicalPath.scope, // 传递当前路径的作用域
                        logicalPath, // 传递当前路径作为父路径
                    )
                }
                // 右操作数
                if (t.isCallExpression(logicalPath.node.right)) {
                    traverse(
                        logicalPath.node.right,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        logicalPath.scope, // 传递当前路径的作用域
                        logicalPath, // 传递当前路径作为父路径
                    )
                }
            },

            // 处理三元运算符（condition ? a : b）
            ConditionalExpression(conditionalPath) {
                // 条件为真时的表达式（consequent）
                if (t.isCallExpression(conditionalPath.node.consequent)) {
                    traverse(
                        conditionalPath.node.consequent,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        conditionalPath.scope, // 传递当前路径的作用域
                        conditionalPath, // 传递当前路径作为父路径
                    )
                }
                // 条件为假时的表达式（alternate）
                if (t.isCallExpression(conditionalPath.node.alternate)) {
                    traverse(
                        conditionalPath.node.alternate,
                        {
                            CallExpression(callPath) {
                                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
                            },
                        },
                        conditionalPath.scope, // 传递当前路径的作用域
                        conditionalPath, // 传递当前路径作为父路径
                    )
                }
            },
            CallExpression(callPath) {
                handleHttpCall(callPath, aliases, apiMap, apis, filePath)
            },
        })
    }
    return { ...config, apis }
}

/**
 * 判断是否为 Http/http 别名
 * @param {string} name 标识符名称
 * @param {Set} aliases 别名集合
 * @returns {boolean} 是否匹配
 */
function isHttpAlias(name, aliases) {
    return aliases.has(name)
}

/**
 * 解析 URL 参数（处理字符串、成员表达式、模板字符串等）
 * @param {object} arg 参数 AST 节点
 * @param {object} scope 当前作用域
 * @param {object} apiMap API 键值映射
 * @returns {string} 完整 URL 或 null
 */
function resolveUrlArg(arg, scope, apiMap, filePath) {
    switch (arg.type) {
        case 'StringLiteral':
            return arg.value // 直接字符串（如 '/api/xxx'）
        case 'MemberExpression':
            return resolveMemberExpression(arg, scope, apiMap, filePath) // 成员表达式（如 API.getItemList）
        case 'TemplateLiteral':
            return resolveTemplateLiteral(arg, scope, apiMap, filePath) // 模板字符串（如 `${API.xxx}/${id}`）
        case 'Identifier':
            return resolveIdentifier(arg, scope, apiMap, filePath) // 标识符（如 api.xxx）
        case 'BinaryExpression':
            const left = resolveUrlArg(arg.left, scope, apiMap, filePath)
            const right = resolveUrlArg(arg.right, scope, apiMap, filePath)
            return `${left}${right}`
        case 'CallExpression':
            return '*'
        default:
            console.warn(`⚠️ 不支持的参数类型: ${arg.type}`, filePath)
            return null
    }
}
/**
 * 解析成员表达式（如 API.getItemList）
 * @param {object} node 成员表达式节点
 * @param {object} scope 作用域
 * @param {object} apiMap API 映射
 * @param {string} projectPath 项目路径
 * @returns {string|null} 完整 URL 或 null
 */
function resolveMemberExpression(node, scope, apiMap, filePath) {
    const object = node.object // 对象部分（如 API）
    const property = node.property // 属性部分（如 getItemList）

    // 校验对象和属性是否为标识符（如 API.getItemList）
    if (!t.isIdentifier(object) || !t.isIdentifier(property)) {
        // console.warn(`⚠️ 成员表达式格式错误，仅支持标识符形式 ${filePath}`);
        return `成员表达式格式错误，仅支持标识符形式 ${filePath}`
    }
    const apiKeyName = property.name // API 键名（如 'getItemList'）

    if (apiMap[apiKeyName]) {
        // console.log(`🔍 解析成员表达式结果: ${apiMap[apiKeyName]}`);
        return apiMap[apiKeyName]
    }

    // console.warn(`⚠️ 不支持的 API 对象导入类型: ${apiKeyName} ${filePath}`);
    return `不支持的 API 对象导入类型: ${apiKeyName} ${filePath}`
}

/**
 * 解析模板字符串（如 `${API.getItemList}/${id}`）
 * @param {object} node 模板字符串节点
 * @param {object} scope 作用域
 * @param {object} apiMap API 映射
 * @param {string} projectPath 项目路径
 * @returns {string|null} 完整 URL 或 null
 */
function resolveTemplateLiteral(node, scope, apiMap, filePath) {
    const quasis = node.quasis.map(q => q.value.cooked) // 模板静态部分（如 '/api/'）
    const expressions = node.expressions // 动态表达式数组（如 [API.getItemList, id]）

    let resolvedUrl = ''
    for (let i = 0; i < quasis.length; i++) {
        resolvedUrl += quasis[i] // 拼接静态部分
        if (i < expressions.length) {
            const expr = expressions[i]
            let dynamicPart = resolveUrlArg(expr, scope, apiMap, filePath) // 解析动态部分
            resolvedUrl += dynamicPart || `*` // 拼接动态部分
        }
    }
    resolvedUrl = resolvedUrl.split('?')[0]
    return resolvedUrl
}

/**
 * 解析标识符（如 api.xxx）
 * @param {object} node 标识符节点（如 api.getItemList 中的 api）
 * @param {object} scope 作用域
 * @param {object} apiMap API 映射
 * @param {string} projectPath 项目路径
 * @returns {string|null} 完整 URL 或 null
 */
function resolveIdentifier(node, scope, apiMap, filePath) {
    const varName = node.name // 变量名（如 'api'）
    const variable = findVariableDefinition(scope, varName)
    if (!variable) {
        if (varName.toLowerCase().includes('api')) {
            // console.warn(`未找到变量 ${varName} 的定义`, filePath);
            return `未找到变量 ${varName} 的定义 ${filePath}`
        } else {
            if (apiMap[varName]) {
                return apiMap[varName]
            } else {
                return null
            }
        }
    }
    // 处理默认导出的 API 对象（如 import api from './api'）
    if (variable.type === 'ImportDefaultSpecifier') {
        const importPath = variable.source.value // 导入路径（如 './api'）
        const apiFilePath = path.resolve(path.dirname(variable.id.loc.file), `${importPath}.ts`)

        console.log(`🔍 解析 API 文件: ${apiFilePath}`)
        if (!fs.existsSync(apiFilePath)) {
            console.warn(`⚠️ API 文件不存在: ${apiFilePath}`)
            return null
        }

        const apiExports = parseApiExports(apiFilePath)
        if (!apiExports) {
            console.warn(`⚠️ API 文件 ${apiFilePath} 无有效导出`)
            return null
        }

        // 假设变量名与 API 键名一致（如 api = { getItemList: '...' }）
        return apiExports[varName] || null
    }

    console.warn(`⚠️ 不支持的变量类型: ${variable.type}`)
    return null
}

/**
 * 查找作用域中的变量定义（修复版，添加详细日志）
 * @param {object} scope 作用域
 * @param {string} varName 变量名
 * @returns {object|null} 变量定义信息（或 null）
 */
function findVariableDefinition(scope, varName) {
    // console.log(`🔍 查找变量定义: ${varName}`);
    const variable = scope.getBinding(varName)
    if (!variable) {
        console.warn(`⚠️ 变量 ${varName} 未在作用域中找到`)
        return null
    }

    // 安全校验：确保 defs 存在且是数组，且至少有一个定义
    if (variable.defs && Array.isArray(variable.defs) && variable.defs.length > 0) {
        // console.log(
        //   `🔍 找到变量定义: ${varName}（类型: ${variable.defs[0].type}）`
        // );
        return variable.defs[0] // 返回第一个定义
    }

    // console.warn(`⚠️ 变量 ${varName} 无有效定义`);
    return null
}

/**
 * 解析 API 文件导出的对象（默认导出）
 * @param {string} apiFilePath API 文件绝对路径
 * @returns {object|null} 导出的键值对（如 { getItemList: '/api/xxx' }）
 */
function parseApiExports(apiFilePath) {
    try {
        const code = fs.readFileSync(apiFilePath, 'utf-8')
        const ast = parser.parse(code, {
            sourceType: 'module',
            plugins: ['typescript'],
        })

        const exports = {}
        traverse(ast, {
            ExportDefaultDeclaration(exportPath) {
                const declaration = exportPath.node.declaration
                if (t.isObjectExpression(declaration)) {
                    console.log(`🔍 解析 API 文件默认导出对象`)
                    declaration.properties.forEach(prop => {
                        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                            const key = prop.key.name
                            const valueNode = prop.value
                            if (t.isStringLiteral(valueNode)) {
                                exports[key] = valueNode.value // 提取字符串值
                                console.log(`🔍 提取 API 键值对: ${key} → ${valueNode.value}`)
                            }
                        }
                    })
                }
            },
        })

        return Object.keys(exports).length > 0 ? exports : null
    } catch (error) {
        console.error(`❌ 解析 API 文件失败: ${apiFilePath}`, error.message)
        return null
    }
}

/* ---------- 主流程 ---------- */
function getRouteApis(filePath, path) {
    const graphItem = buildGraph(filePath)
    const result = extractHttpUrls(graphItem)
    const { apis } = result || {}
    return { path, apis }
}

// ------------------------- 执行入口 -------------------------

// 写入数据
function writeFiles(info) {
    const filePath = path.resolve(__dirname, './routeMap.json')
    fs.writeFile(filePath, info, err => {
        if (!err) {
            console.log(chalk.hex('#00FFFF')(`${filePath}写入成功`))
        } else {
            console.log(chalk.hex('#ff0000')(`${filePath}写入失败`))
            throw err
        }
    })
}

// // 获取packages目录下所有的项目文件夹
// function getPackageList() {
//   const packagesPath = `${path.resolve(__dirname)}/packages`;
//   let routeList = [];
//   // fs.readdirSync(packagesPath).forEach((file) => {
//   //   if (
//   //     !file.includes(".DS_Store") &&
//   //     !file.includes("fe-enroll-no-permission-pc") &&
//   //     !file.includes("fe-enroll-permission-pc")
//   //   ) {
//   //     const pagesPath = path.join(packagesPath, `${file}/src/pages`);
//   //     const projectPath = path.join(packagesPath, `${file}`);
//   //     const tempInfo = extractRouteApis(pagesPath, projectPath);
//   //     routeList.push(tempInfo);
//   //   }
//   // });
//   const pagesPath = path.join(packagesPath, `${file}/src/pages`);
//   const projectPath = path.join(packagesPath, `${file}`);
//   const tempInfo = extractRouteApis(pagesPath, projectPath);
//   routeList.push(tempInfo);
//   const finallyRouteList = routeList.flat("Infinity");

//   // const packageMap = {
//   //   "/enroll-center": "fe-enroll-pc",
//   //   "/exam-center": "fe-exam-pc",
//   //   "/employment": "fe-job-pc",
//   //   "/merchant-center": "fe-merchant-pc",
//   // };
//   // const packagesPath = `${path.resolve(__dirname)}/routeMap.json`;
//   // let temp = fs.readFileSync(packagesPath, { encoding: "utf-8" });
//   // temp = JSON.parse(temp);
//   // let newTemp = temp.map((i) => {
//   //   const { path } = i;
//   //   let mapKey = "";
//   //   let mapOk = Object.keys(packageMap).find((k) => {
//   //     if (path.startsWith(k)) {
//   //       mapKey = k;
//   //       return true;
//   //     } else {
//   //       return false;
//   //     }
//   //   });
//   //   if (mapOk) {
//   //     return { ...i, package: packageMap[mapKey] };
//   //   } else {
//   //     return { ...i, package: "" };
//   //   }
//   // });
//   writeFiles(JSON.stringify(newTemp, null, 2));
// }

// getPackageList();

// 获取packages目录下所有的项目文件夹
function getPackageList() {
    const packagesPath = `${path.resolve(__dirname)}/packages`
    let routeList = []
    fs.readdirSync(packagesPath).forEach(file => {
        if (!file.includes('.DS_Store') && file.includes('fe-engineer-pc')) {
            const pagesPath = path.join(packagesPath, `${file}/src/pages`)
            const projectPath = path.join(packagesPath, `${file}`)
            const tempInfo = extractRouteApis(pagesPath, projectPath)
            tempInfo.map(i => {
                i.package = file
            })
            routeList.push(tempInfo)
        }
    })
    const finallyRouteList = routeList.flat('Infinity')
    // writeFiles(JSON.stringify(finallyRouteList, null, 2));

    const packageMap = {
        'fe-business-pc': '',
        'fe-organization-pc': '',
        'fe-middle-pc': '',
        'fe-enroll-no-permission-pc': '/enroll-gateway',
        'fe-enroll-permission-pc': '/enroll-center',
        'fe-exam-pc': '/exam-center',
        'fe-job-pc': '/employment',
        'fe-merchant-pc': '/merchant-center',
        'fe-signin-pc': '/sign-center',
        'fe-user-pc': '/user-center',
        organization: '/organization',
        'trading-center': '/trading-center',
        'fe-engineer-pc': '/engineer-center',
    }

    let newTemp = finallyRouteList.map(i => {
        const { path, package } = i
        let prefix = packageMap[package]
        return { ...i, path: `${prefix}${path}` }
    })

    writeFiles(JSON.stringify(newTemp, null, 2))

    // const fs = require("fs");
    // const path = require("path");

    // const filePath = path.join(__dirname, "routeMap.json");
    // const routeMap = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // const deduped = routeMap.map((item) => ({
    //   ...item,
    //   apis: Array.from(new Set(item.apis)),
    // }));

    // fs.writeFileSync(
    //   path.join(__dirname, "routeMap.dedup.json"),
    //   JSON.stringify(deduped, null, 2),
    //   "utf-8"
    // );

    // console.log("去重完成，结果已保存为 routeMap.dedup.json");
}

getPackageList()
