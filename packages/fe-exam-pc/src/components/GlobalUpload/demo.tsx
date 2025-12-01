/***
 * 结合form实例
 * @param onChange 文件改变触发
 * @param className upload样式 生效情况：1、drag为true时 2、otherProps.listType为picture-card且amount为1时
 * @param otherProps Upload原组件所有属性
 * @param drag 是否开启拖拽
 * @param amount 允许上传数量
 * @param size 允许上传大小 MB
 * @param accept 允许上传格式
 *
 * @return [{response: {uid: '', name: '', url: ''},status: "done"}]
 * response中为文件上传成功后在服务器中的地址及信息
 * 脱离form使用时 onChange中需要判断是否存在response 存在时即为上传成功
 */

{
    /* 
<Form.Item
    name="upload"
    label="Upload"
    valuePropName="fileList"
    extra="文件上传注意事项"
>
    <GlobalUpload
        className={styles.upload}
        otherProps={{
            listType: 'picture',
            showUploadList: true,
        }}
        accept={'image'}
        amount={1}
        drag={false}
        size={1}
    >
        <Button>哈哈哈</Button>
    </GlobalUpload>
</Form.Item> */
}
