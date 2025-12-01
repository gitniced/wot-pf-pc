# NumberCodeModal

数字验证码弹窗

## Demo
```tsx
import NumberCodeModal from '@/NumberCodeModal/index'

<NumberCodeModal
    visible={hook.numberCodeModalVisible}
    uniKey={hook.uniKey}
    onConfirm={hook.handleConfirmNumberCodeModal}
    onCancel={hook.handleCancelNumberCodeModal}
/>
```

## Props

| 参数      | 说明           | 类型                 | 默认值 |
| --------- | -------------- | -------------------- | ------ |
| visible   | 弹窗显示隐藏   | boolean              | false  |
| unikey    | 随机值         | string               | -      |
| styles    | 弹窗样式styles | Object               | -      |
| onConfirm | 确认事件       | (code: number)=>void | -      |
| onCancel  | 取消事件       | ()=>void             | -      |