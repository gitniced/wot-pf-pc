import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { createPortal } from 'react-dom'
import './index.module.less'

interface FullModalProps {
    visible: boolean
    onCancel?: () => void
}

const Dialog: React.FC<FullModalProps> = props => {
    const { visible, children, onCancel } = props
    const [open, setOpen] = useState(visible)
    const [, forceUpdate] = useState<number>()
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (ref.current) {
            return
        }
        ref.current = document.createElement('div')
        ref.current.classList.add('full_dialog')
        document.body.appendChild(ref.current)
        forceUpdate(Math.random())

        return () => {
            // 页面销毁时，移除外层元素
            document.body.removeChild(ref.current as Node)
        }
    }, [])
    const exit = () => {
        setOpen(false)
        onCancel && onCancel()
    }
    return ref.current && open
        ? createPortal(
              <div className="full_dialog_content" aria-hidden={visible}>
                  <div className="full_dialog_header">
                      <Button onClick={exit}>退出</Button>
                  </div>
                  <div className="full_dialog_body">{children}</div>
              </div>,
              ref.current as HTMLElement,
          )
        : null
}

export default Dialog
