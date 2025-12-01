/* 
 login_merchant_method1 机构登录-手机密码登录
 login_merchant_method2 机构登录-证件号码密码登录
 login_merchant_method3 机构登录-手机验证登录
 login_merchant_method4 机构登录-账户密码登录

 login_merchant_method5 机构登录-微信授权登录
 login_merchant_method6 机构登录-钉钉授权登录

  */

export const stackKey = [
    'login_merchant_method1',
    'login_merchant_method2',
    'login_merchant_method3',
    'login_merchant_method4',
    'login_merchant_method5',
    'login_merchant_method6',
]

export const placeHolderMap: Record<string, string> = {
    login_merchant_method1: '手机号',
    login_merchant_method2: '证件号码',
    login_merchant_method4: '账号',
}

export const methods1Key = [
    'login_merchant_method1',
    'login_merchant_method2',
    'login_merchant_method4',
]
export const methods2Key = ['login_merchant_method3']
