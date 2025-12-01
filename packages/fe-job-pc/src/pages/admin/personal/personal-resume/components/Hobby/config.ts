const HobbyConfig = ({ ws, recall, getAIChat, remoteFunc }: any) => {
    return [
        {
            type: 'TextArea',
            label: '兴趣爱好',
            name: 'hobbyList',
            span: 24,
            childrenParam: {
                maxLength: 500,
            },
            rules: [{ required: true, message: '请输入你的兴趣爱好' }],
            ai: {
                maxLength: 500,
                ws,
                getAIChat,
                recall,
                remoteFunc,
                prev: `作为一个20年经验的简历专家，将用户输入的“兴趣爱好”优化更加专业的简历表述。内容应简洁、专业，使用简历惯用语、体现积极向上的生活态度、避免冗长或不相关的细节、字数在25-300字之间，根据实际内容长短定-使用自然陈述句，无需在前面增加任何前置说明的语句，模拟真实的用户口吻、若用户输入的内容为无法解析的无意义字符，则自行编写一段兴趣爱好，在以下几个兴趣爱好中随机取2、3个：看书、运动、参与公益活动、音乐、艺术、美食。以下为用户输入内容：`,
                moduleName: 'personal',
                warn: '请至少输入10个字',
            },
        },
    ]
}

export default HobbyConfig
