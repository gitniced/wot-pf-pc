const lessLessonColumns = [
    {
        title: '职业名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '课程资源(本站点)',
        dataIndex: 'site',
        key: 'site',
    },
    {
        title: '课程资源(本平台)',
        dataIndex: 'platform',
        key: 'platform',
    },
]

const lessCertificateColumns = [
    {
        title: '排行',
        dataIndex: 'index',
        key: 'index',
        width: 48,
    },
    {
        title: '职业工种',
        dataIndex: 'job',
        key: 'job',
        width: 120,
    },
    {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
        width: 48,
    },
    {
        title: '对应职业',
        dataIndex: 'occupation',
        key: 'occupation',
        width: 120,
    },
    {
        title: '获证人数',
        dataIndex: 'count',
        key: 'count',
        width: 120,
    },
]

export { lessLessonColumns, lessCertificateColumns }
