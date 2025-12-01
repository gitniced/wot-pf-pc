const api = {
    bindIdCard: '/auth/user/v1/bind_id_card',
    bindCertificate: '/auth/user/v1/bind_certificate',
    getIdCardImage: '/auth/user/v1/id_card_info',
    getCertificate: '/auth/user/v1/certificate_info',
    // 用户提交审核
    onAuditApply: '/auth/user_audit/apply',
    // 身份证OCR识别
    ocrIdCard: '/auth/user/v1/ocr_id_card',
}

export default api
