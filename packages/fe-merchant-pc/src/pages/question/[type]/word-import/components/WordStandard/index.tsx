import React from 'react'
import { Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import imageModal from '../ImageModal'

import styles from '../../index.module.less'

const WordStandard = ({ templateType }: { templateType: string }) => {
    // 是否是国际格式
    const isDefault = templateType === 'default'

    const onClickImage = () => {
        imageModal({ templateType })
    }

    const renderSingleString = () => {
        if (isDefault) {
            return `A-B-C-001 B 3 5
{A}曝光宽容度等于胶片的宽容度减去{.XZ}景物的曝光范围。
(A) 减去
(B) 加上
(C) 除以
(D) 乘以
{B}A`
        }
        return `1. 下面哪些是中国四大名著
A、《西游记》
B、《石头记》
C、《三国演义》
D、《水浒传》`
    }

    const renderMultipleString = () => {
        if (isDefault) {
            return `A-B-C-001 D 3 5
{A}色彩最基本的构成要素包括{.XZ}。
(A)色温
(B)明度
(C)色相
(D)纯度
(E)密度
{B}ABC`
        }
        return `2.驾驶人有下列哪种违法行为一次记6分？
A、使用其他车辆行驶证
B、饮酒后驾驶机动车
C、车速超过规定时速50%以上
D、违法占用应急车道行驶`
    }

    const renderJudgeString = () => {
        if (isDefault) {
            return `A-B-C-001 C 3 5
{A}曝光宽容度等于胶片的宽容度减去景物的曝光范围。
{B}√`
        }
        return `3.《西游记》的作者是吴承恩吗？
A、正确
B、错误`
    }

    const renderShortString = () => {
        return `4.请论述全球化对国家政治产生了哪些深刻`
    }

    const renderAnalysisString = () => {
        return `5.某工厂车间为封闭车间，占地面积200平方米，高4米。打扫卫生时，有职工将60公斤汽油倒在锯末上，然后大家用拖把拖。打扫过程中，王某与胡某之间的地面上一声巨响，大火燃起。经调查，当时王、胡均穿塑料鞋；王、胡之间有一根铁管；当时无人穿带钉的鞋；无人吸烟和动明火。
（1）什么可燃物发生爆炸？
（2）火源是什么？
（3）人体静电火灾在调查中应注意查明什么情况?`
    }

    const renderAnalysisAnswer = () => {
        return `5.答案：
（1）是汽油蒸气爆炸。
（2）火源是静电火花。
（3）人体衣服的材质，人员鞋底的材质，现场地面物质，起火前人员与其他导体之间的放电情况，起火前人员的行动和动作，环境条件，以及可燃气体的种类、点火能量、爆炸极限，人体放电能量。`
    }

    const renderAnalysisAnalysis = () => {
        return `解析：
（1）60公斤汽油挥发为蒸气后800立方米的空间内与空气形成混合物能够达到爆炸极限。
（2）无
（3）无`
    }

    return (
        <div className={styles.word_import_preview}>
            <div className={styles.word_import_preview_title}>
                Word文档格式规范
                <Tooltip
                    title={
                        isDefault
                            ? '本功能严格按照国标Word文档方式录入试题的统一格式和各项试题特征参数规范，支持智能识别单选题、多选题、判断题三种题型。'
                            : '本功能严格按照国标Word文档方式录入试题的统一格式和各项试题特征参数规范，支持智能识别单选题、多选题、判断题、简答题、案例分析题五种题型。'
                    }
                >
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
            <div className={styles.word_import_preview_content}>
                <div onClick={onClickImage} className={styles.word_import_preview_image}>
                    <img
                        src={
                            isDefault
                                ? 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/pic_wendanggehsi.png'
                                : 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/pic_changguigeshi.png'
                        }
                    />
                    <img
                        className={styles.icon_fangda}
                        src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-merchant-pc/icon_fangda.png"
                        alt="icon_fangda"
                    />
                </div>
                <div className={styles.word_import_content_title}>内容示例</div>
                <div className={styles.word_import_preview_text}>
                    <div className={styles.word_import_preview_single_title}>单选题示例</div>
                    <pre>{renderSingleString()}</pre>
                    <div className={styles.word_import_preview_multiple_title}>多选题示例</div>
                    <pre>{renderMultipleString()}</pre>
                    <div className={styles.word_import_preview_judge_title}>判断题示例</div>
                    <pre>{renderJudgeString()}</pre>

                    {templateType === 'conventional' && (
                        <>
                            <div className={styles.word_import_preview_short_title}>简答题示例</div>
                            <pre>{renderShortString()}</pre>
                            <div className={styles.word_import_preview_analysis_title}>
                                案例分析题题示例
                            </div>
                            <pre>{renderAnalysisString()}</pre>
                            <div className={styles.answer_analysis}>【答案解析】</div>
                            <div className={styles.answer_analysis_item}>
                                <div>1.答案：B</div>
                                <div>解析：《红楼梦》别名《石头记》</div>
                            </div>
                            <div className={styles.answer_analysis_item}>
                                <div>2.答案：ABCD</div>
                                <div>解析：无</div>
                            </div>
                            <div className={styles.answer_analysis_item}>
                                <div>3.答案：正确</div>
                                <div>解析：西游记作者吴承恩</div>
                            </div>
                            <div className={styles.answer_analysis_item}>
                                <div>
                                    4.答案：全球化使国家主权受到一定的制约；
                                    全球化对政府的治理提出了更高的要求。
                                </div>
                                <div>解析：无</div>
                            </div>
                            <div className={styles.answer_analysis_item}>
                                <pre className={styles.answer}>{renderAnalysisAnswer()}</pre>
                                <pre>{renderAnalysisAnalysis()}</pre>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WordStandard
