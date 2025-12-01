### 简介

用户中心框架

### 安装

yarn

### 目录说明
```

wt-react-mobile		
├── README.md		
├── dist------------------------ 打包目录			
├── package.json------------- 依赖列表		
├── src		
│   ├── components------------ 本地组件		
│   │   └── Global			
│   │       └── Empty---------- 公共空状态	
│   │       └── Loading---------- 公共loading	
│   │       └── PageLoading---------- 页面加载loading	
│   │       └── Offline---------- 断网提示		
│   ├── layouts----------------- 全局layout 进行站点信息获取和主题色配置		
│   ├── pages------------------- 路由组件		
│   │   ├── 404--------—------- 404页面	
│   │   ├── demo--------—------- 模版demo		
│   │   ├── demo2--------—------模版demo2		
│   │   └── document.ejs--------- html模版		
│   ├── servers------------------- axios相关		 
│   │   ├── http------—------------ axios封装组件			
│   │   └── kingUrl.ts----—-------- api请求根URL 需更换url地址		
│   ├── storage---—------------- 本地存储封装组件				
│   ├── stores-------------------- 公共store组件		
│   │   ├── globalStore.ts----------公共store集合 全局store需到此引用		
│   │   ├── siteModel.ts----------- 公共站点store 用来存储站点相关的信息和操作		
│   │   └── userModel.ts----------- 公共用户store 用来存储用户相关的信息和操作		
│   ├── styles  -------------------- 公共store组件	
│   │   └── theme			
│   │       └── variables.less------ 颜色变量less       
│   ├── types-------------------- 公共类型声明		
│   └── utils---------------------- 通用插件工具		
│       └── changeTheme.ts--------- 主题色改色方法			
│       └── colorFormat.ts--------- 颜色转换方法		
├── .env---------------------— umi环境变量配置		
├── .umirc--------------------- umi打包配置项		
├── tsconfig.json		
├── typings.d.ts		
└── yarn.lock		
```


### 运行

1、更换/src/servers/kingUrl.ts文件中的url地址

2、更换/umirc.ts文件中的publicPath地址

npm run start

### 打包

1、更换/umirc.ts文件中的publicPath地址

2、根据环境执行script，更改.env中的CUSTOM_PATH变量即可生成新版本文件夹

#### 测试：
npm run dev
#### 预发：
npm run pre
#### 正式：
npm run pro

## 本地化部署项目配置
1、删除umirc.ts文件中的externals字段和script字段        
2、umirc.ts文件中的publicPath地址写死为’/‘，去除根据环境变量switch      
3、src目录下创建resources文件夹     
4、所有静态资源存放到resources文件夹中  