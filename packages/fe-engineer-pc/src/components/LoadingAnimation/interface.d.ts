/**
 * LoadingAnimation 组件的 TypeScript 类型定义
 */
import { CSSProperties } from 'react'

/**
 * 动画类型
 */
export type AnimationType =
    | 'spinner' // 旋转圆环
    | 'dots' // 跳动的点
    | 'pulse' // 脉冲效果
    | 'wave' // 波浪效果
    | 'squares' // 旋转方块
    | 'ring' // 多环旋转

/**
 * 尺寸类型
 */
export type SizeType = 'small' | 'medium' | 'large'

/**
 * 颜色主题类型
 */
export type ColorType = 'primary' | 'success' | 'warning' | 'error'

/**
 * LoadingAnimation 组件属性接口
 */
export interface LoadingAnimationProps {
    /**
     * 动画类型
     * @default 'spinner'
     */
    type?: AnimationType

    /**
     * 组件尺寸
     * @default 'medium'
     */
    size?: SizeType

    /**
     * 颜色主题
     * @default 'primary'
     */
    color?: ColorType

    /**
     * 加载提示文字
     */
    text?: string

    /**
     * 自定义 CSS 类名
     */
    className?: string

    /**
     * 自定义内联样式
     */
    style?: CSSProperties
}
