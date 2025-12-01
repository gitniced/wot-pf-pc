import type { RepeatedItem } from "./interface";

export enum POLLING_STATUS {
    LOADING,
    SUCCESS,
    FAIL,
    WAITING
}

export enum REFERENCE_STATUS {
    NOT_REFERENCE = 10, // 未引用
    REFERENCED = 20 // 已引用
}

export enum RECOMMEND_STATUS {
    NOT_RECOMMEND = 10, // 未推荐
    RECOMMENDED = 20 // 已推荐
}

export const questionGroupList: RepeatedItem[] = [
    {
        code: '17088761BCHOCOOW2',
        totalCount: 2,
        data: [
            {
                "code": '17088761BCHOCOOW1',
                "level": 30,
                "type": 20,
                "title": "<p>e212</p><p>21312</p><p>12312</p>",
                "analysis": "<p>131312312312</p>",
                "optionList": [
                    {
                        "code": "17088761BCHOCOOW2",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>13123</p>",
                        "sort": "0"
                    },
                    {
                        "code": "17088761BCHOCOOW3",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>13213</p>",
                        "sort": "1"
                    },
                    {
                        "code": "17088761BCHOCOOW4",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": true,
                        "answer": "<p>312312</p>",
                        "sort": "2"
                    },
                    {
                        "code": "17088761BCHOCOOW5",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>123123</p>",
                        "sort": "3"
                    },
                ],
                "childList": [],
            },
            {
                "code": '17088761BCHOCOOW2',
                "level": 30,
                "type": 20,
                "title": "<p>e212</p><p>21312</p><p>12312</p>",
                "analysis": "<p>131312312312</p>",
                "optionList": [
                    {
                        "code": "17088761BCHOCOOW2",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>13123</p>",
                        "sort": "0"
                    },
                    {
                        "code": "17088761BCHOCOOW3",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>13213</p>",
                        "sort": "1"
                    },
                    {
                        "code": "17088761BCHOCOOW4",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": true,
                        "answer": "<p>312312</p>",
                        "sort": "2"
                    },
                    {
                        "code": "17088761BCHOCOOW5",
                        "questionCode": "17088761BCHOCOOW1",
                        "isAnswer": false,
                        "answer": "<p>123123</p>",
                        "sort": "3"
                    },
                ],
                "childList": [],
            }
        ]
    },
    {
        "code": "17088761BPJT9W5C1",
        totalCount: 2,
        data: [
            {
                "code": "17088761BPJT9W5C1",
                "level": 30,
                "type": 30,
                "title": "<p>12edwad</p><p>qe12e12</p><p>12312312</p>",
                "analysis": "<p>12312312e12312</p>",
                "optionList": [
                    {
                        "code": "17088761BPJT9W5C2",
                        "questionCode": "17088761BPJT9W5C1",
                        "isAnswer": false,
                        "answer": "<p>12312312</p>",
                        "sort": "0"
                    },
                    {
                        "code": "17088761BPJT9W5C3",
                        "questionCode": "17088761BPJT9W5C1",
                        "isAnswer": true,
                        "answer": "<p>123123</p>",
                        "sort": "1"
                    },
                    {
                        "code": "17088761BPJT9W5C4",
                        "questionCode": "17088761BPJT9W5C1",
                        "isAnswer": true,
                        "answer": "<p>12312</p>",
                        "sort": "2"
                    },
                    {
                        "code": "17088761BPJT9W5C5",
                        "questionCode": "17088761BPJT9W5C1",
                        "isAnswer": false,
                        "answer": "<p>12312</p>",
                        "sort": "3"
                    }
                ],
                "childList": [],
            }
        ]
    }
]

export const questionList = [
    {
        "code": '17088761BCHOCOOW1',
        "level": 30,
        "type": 20,
        "title": "<p>e212</p><p>21312</p><p>12312</p>",
        "analysis": "<p>131312312312</p>",
        "optionList": [
            {
                "code": "17088761BCHOCOOW2",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>13123</p>",
                "sort": "0"
            },
            {
                "code": "17088761BCHOCOOW3",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>13213</p>",
                "sort": "1"
            },
            {
                "code": "17088761BCHOCOOW4",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": true,
                "answer": "<p>312312</p>",
                "sort": "2"
            },
            {
                "code": "17088761BCHOCOOW5",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>123123</p>",
                "sort": "3"
            },
        ],
        "childList": [],
    },
    {
        "code": '17088761BCHOCOOW2',
        "level": 30,
        "type": 20,
        "title": "<p>e212</p><p>21312</p><p>12312</p>",
        "analysis": "<p>131312312312</p>",
        "optionList": [
            {
                "code": "17088761BCHOCOOW2",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>13123</p>",
                "sort": "0"
            },
            {
                "code": "17088761BCHOCOOW3",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>13213</p>",
                "sort": "1"
            },
            {
                "code": "17088761BCHOCOOW4",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": true,
                "answer": "<p>312312</p>",
                "sort": "2"
            },
            {
                "code": "17088761BCHOCOOW5",
                "questionCode": "17088761BCHOCOOW1",
                "isAnswer": false,
                "answer": "<p>123123</p>",
                "sort": "3"
            },
        ],
        "childList": [],
    }
]