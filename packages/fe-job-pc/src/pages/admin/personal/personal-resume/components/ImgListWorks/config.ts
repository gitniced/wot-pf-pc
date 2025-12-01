const config = () => {
   return [{
      type: 'ImgUpload',
      name: 'urlList',
      label: '图片作品',
      childrenParam: {
        otherProps: { maxCount: 20 }
      },
      span: 24,
      rules: [{ required: true, message: '请上传图片' }],
   }]
}

export default config