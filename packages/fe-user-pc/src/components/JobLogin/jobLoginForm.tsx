import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { CURRENT_LOGIN_URL_TYPE_ENUM, CURRENT_LOGIN_URL_TYPE_MAPPING} from '@/types'
import { history } from 'umi'
import type { LoginFormProps } from './interface'
import { USER_LOGIN_TYPE, MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'

const LoginForm = ({
  sourceType,
  loginHandler,
  btnLoading
}: LoginFormProps) => {
  

  const [apForm] = Form.useForm()
  /**
    *根据身份前往对应的注册页
    */
  const goToRegister = () => {
    // 院校身份为机构前往机构注册页，企业身份为资源方前往资源方注册页
    let registerUrl = ''
    switch (sourceType) {
      case CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL:
        registerUrl = `/user/register?type=${USER_LOGIN_TYPE.ORG_LOGIN}&sourceType=${sourceType}`
        break;
      case MERCHANT_LOGIN_TYPE.COMPANY:
        registerUrl = `/seller/register?sourceType=${sourceType}`
        break;

      default:

        return message.error('暂不支持该身份注册')
    }
    history.push(registerUrl)
  }

  /**
   *根据身份前往对应的忘记密码页
   */
  const goToForget = () => {
    // 院校身份为机构前往机构注册页，企业身份为资源方前往资源方注册页
    let forgetUrl = ''
    switch (sourceType) {
      case CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL:
        forgetUrl = `/user/forget`
        break;
      case MERCHANT_LOGIN_TYPE.COMPANY:
        forgetUrl = `/seller/forget?sourceType=${sourceType}`
        break;

      default:
        message.error('暂不支持重置密码')
        return
    }


    history.push(forgetUrl)
  }


  return (
    <div className={styles.job_login}>
      <div className={styles.job_login_main} >
        <div className={styles.tab}>
          {CURRENT_LOGIN_URL_TYPE_MAPPING?.[sourceType]}登录
        </div>
        {/* <Alert
          className={styles.alert}
          showIcon
          message="首次建议使用证件号登录，可尝试初始密码：证件号后6位或手机号后6位"
          type="warning"
        /> */}
        <Form
          form={apForm}
          validateTrigger={'onBlur'}
          size="large"
          name="normal_login"
          className={styles.login_form}
          initialValues={{
            remember: true,
          }}
          onFinish={e => {
            loginHandler(e, apForm)
          }}
        >

          <Form.Item name="account" rules={[{ required: true, message: '请输入证件号码/手机号码' }]} className={styles.form_account}>
            <Input className={styles.input} placeholder='请输入证件号码/手机号码' maxLength={30} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} className={styles.form_password}>
            <Input.Password className={styles.input} type="password" placeholder="请输入密码" />
          </Form.Item>
          <div className={styles.forget_option}>

            {/* 忘记密码 */}
            <a className={styles.forget_btn} onClick={goToForget}>
              忘记密码？
            </a>
          </div>

          <Form.Item className={styles.login_item}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_btn}
              loading={btnLoading}
            >
              登录
            </Button>
          </Form.Item>

          <span className={styles.register} onClick={goToRegister}>
            还没有账号？<a>立即注册</a>
          </span>
        </Form>

      </div>

    </div>
  )
}

export default observer(LoginForm)
