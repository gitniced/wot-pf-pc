const VideoWorkConfig = () => {
    return [
        {
            type: 'TextArea',
            label: '作品介绍',
            name: 'introduce',
            span: 24,
            childrenParam: {
                maxLength: 100,
            },
        },
        {
            type: 'VideoUpload',
            label: '视频作品',
            name: 'url',
            span: 24,
            rules: [{ required: true, message: `请上传你的视频作品` }],
        },
    ]
}

export default VideoWorkConfig
