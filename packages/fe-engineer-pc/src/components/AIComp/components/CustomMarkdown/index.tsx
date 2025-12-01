import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import styles from './index.module.less'

interface CustomMarkdownProps {
    children: string
}
// 设置 Markdown 渲染的 table 容器在超出时可滚动
const components = {
    table: ({ ...props }: any) => (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <table {...props} />
        </div>
    ),
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children }) => {
    // 预处理内容，将 <ref></ref> 标签转换为可显示的格式
    const processContent = (content: string) => {
        // 将 <ref>内容</ref> 转换为 [引用] 格式
        return content
        // .replace(/<ref>(.*?)<\/ref>/g, '【引用：$1】');
    }

    const processedContent = processContent(children)

    return (
        <div className={styles.md_wrapper}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {processedContent}
            </Markdown>
        </div>
    )
}
