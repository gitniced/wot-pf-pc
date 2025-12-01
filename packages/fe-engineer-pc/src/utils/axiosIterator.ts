/**
 * 单个请求结果类型
 */
export interface RequestResult<T = any> {
    success: boolean
    result?: T
    error?: any
}

/**
 * 迭代器结果类型
 */
export interface IteratorResult<T = any> {
    success: boolean
    results: RequestResult<T>[]
    totalRequests: number
    successCount: number
    failureCount: number
}

/**
 * 顺序执行 HTTP 实例的迭代器（严格按顺序，一个完成后再执行下一个）
 * @param httpInstances HTTP 实例函数数组
 * @returns Promise<IteratorResult>
 */
export async function executeHttpSequentially<T = any>(
    httpInstances: (() => Promise<T>)[],
): Promise<IteratorResult<T>> {
    const results: RequestResult<T>[] = []
    const totalRequests = httpInstances.length
    let successCount = 0
    let failureCount = 0

    console.log(`🚀 开始顺序执行 ${totalRequests} 个HTTP请求`)

    try {
        // 使用 for 循环确保严格按顺序执行
        for (let i = 0; i < totalRequests; i++) {
            const httpInstanceFn = httpInstances[i]
            const currentStep = i + 1

            // 详细的开始日志
            console.log(`\n📋 [步骤 ${currentStep}/${totalRequests}] 准备执行...`)
            console.log(`⏰ 开始时间: ${new Date().toISOString()}`)

            try {
                // 记录请求开始时间
                const startTime = Date.now()

                // 等待当前请求完全完成后再继续
                console.log(`📤 [步骤 ${currentStep}] 发送请求中...`)
                const response: T = await httpInstanceFn()

                // 记录请求完成时间
                const endTime = Date.now()
                const duration = endTime - startTime

                // 收集成功结果
                results.push({
                    success: true,
                    result: response,
                })
                successCount++

                // 详细的成功日志
                console.log(`✅ [步骤 ${currentStep}/${totalRequests}] 请求成功完成`)
                console.log(`⏱️  执行耗时: ${duration}ms`)
                console.log(`⏰ 完成时间: ${new Date().toISOString()}`)
            } catch (requestError) {
                // 单个请求失败，但继续执行下一个
                console.error(`\n❌ [步骤 ${currentStep}/${totalRequests}] 请求失败`)
                console.error(`⏰ 失败时间: ${new Date().toISOString()}`)
                console.error(`💥 错误信息:`, requestError)

                // 记录失败结果
                results.push({
                    success: false,
                    error: requestError,
                })
                failureCount++
            }

            // 如果不是最后一个请求，显示即将开始下一个
            if (i < totalRequests - 1) {
                console.log(`⏭️  继续执行下一个请求...`)
            }
        }

        // 执行完成，统计结果
        const allSuccess = failureCount === 0
        console.log(`\n📊 执行完成统计:`)
        console.log(`   总请求数: ${totalRequests}`)
        console.log(`   成功: ${successCount}`)
        console.log(`   失败: ${failureCount}`)
        console.log(`   成功率: ${((successCount / totalRequests) * 100).toFixed(1)}%`)
        console.log(`⏰ 总完成时间: ${new Date().toISOString()}`)

        return {
            success: allSuccess,
            results,
            totalRequests,
            successCount,
            failureCount,
        }
    } catch (error) {
        // 意外错误
        console.error('\n💥 执行过程中发生意外错误:', error)
        return {
            success: false,
            results,
            totalRequests,
            successCount,
            failureCount,
        }
    }
}
