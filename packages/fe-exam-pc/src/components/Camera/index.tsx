import React, { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { VideoCameraOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface CameraProps {
  /** 是否自动启动 */
  autoStart?: boolean
  /** 是否允许关闭摄像头 */
  allowClose?: boolean
  /** 摄像头状态变化回调 */
  onStatusChange?: (isActive: boolean) => void
  /** 自定义类名 */
  className?: string
  height: number
  width: number
}

const Camera: React.FC<CameraProps> = ({
  autoStart = true,
  allowClose = false,
  height,
  width,
  onStatusChange,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // 启动摄像头
  const startCamera = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      // 检查浏览器是否支持getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('NOT_SUPPORTED')
      }

      // 请求摄像头权限
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user' // 前置摄像头
        },
        audio: false
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsActive(true)
        onStatusChange?.(true)
        // message.success('摄像头已启动')
      }
    } catch (err: any) {
      console.error('启动摄像头失败:', err)
      
      let errorMessage = '摄像头启动失败'
      let userMessage = '摄像头启动失败'
      
      if (err.name === 'NotAllowedError' || err.message === 'Permission denied') {
        errorMessage = '用户拒绝了摄像头权限请求'
        userMessage = '摄像头权限被拒绝，请在浏览器设置中允许摄像头访问'
      } else if (err.name === 'NotFoundError' || err.message === 'No camera found') {
        errorMessage = '未找到摄像头设备'
        userMessage = '未检测到摄像头设备，请检查设备连接'
      } else if (err.name === 'NotReadableError') {
        errorMessage = '摄像头被其他应用占用'
        userMessage = '摄像头正被其他应用使用，请关闭其他应用后重试'
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = '摄像头不支持指定的分辨率'
        userMessage = '摄像头不支持当前分辨率设置'
      } else if (err.message === 'NOT_SUPPORTED') {
        errorMessage = '浏览器不支持摄像头功能'
        userMessage = '当前浏览器不支持摄像头功能，请使用现代浏览器'
      } else if (err.name === 'SecurityError') {
        errorMessage = '安全限制阻止摄像头访问'
        userMessage = '安全限制阻止摄像头访问，请确保在HTTPS环境下使用'
      } else {
        errorMessage = `摄像头启动失败: ${err.message || '未知错误'}`
        userMessage = '摄像头启动失败，请检查设备状态'
      }
      
      setError(errorMessage)
      message.error(userMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // 停止摄像头
  const stopCamera = () => {
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsActive(false)
    onStatusChange?.(false)
    message.info('摄像头已关闭')
  }

  // 组件挂载时自动启动
  useEffect(() => {
    if (autoStart) {
      startCamera()
    }

    // 组件卸载时清理资源
    return () => {
      stopCamera()
    }
  }, [autoStart])

  return (
    <div className={`${styles.camera_container} ${className || ''}`}>
      <div 
        className={styles.video_wrapper}
        style={{ width, height }}
      >
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          muted
        />
        
        {!isActive && !isLoading && (
          <div className={styles.placeholder}>
            <VideoCameraOutlined className={styles.placeholder_icon} />
            <div className={styles.placeholder_text}>摄像头未启动</div>
          </div>
        )}
        
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loading_text}>正在启动摄像头...</div>
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            <div className={styles.error_text}>{error}</div>
          </div>
        )}
      </div>
      
      {/* <div className={styles.controls}>
        {!isActive ? (
          <Button
            type="primary"
            icon={<VideoCameraOutlined />}
            onClick={startCamera}
            loading={isLoading}
            size="small"
          >
            启动摄像头
          </Button>
        ) : (
          allowClose ? (
            <Button
              icon={<StopOutlined />}
              onClick={stopCamera}
              size="small"
            >
              关闭摄像头
            </Button>
          ) : (
            <div className={styles.camera_status}>
              <VideoCameraOutlined className={styles.status_icon} />
              <span className={styles.status_text}>摄像头已开启</span>
            </div>
          )
        )}
      </div> */}
    </div>
  )
}

export default Camera
