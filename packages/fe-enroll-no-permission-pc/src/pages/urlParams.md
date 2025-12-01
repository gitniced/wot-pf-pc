# 需要路由携带的参数

- sid： 站点id 
- url ${origin}/XXX
    - /enroll-management 报名管理
    - /my-enrollment 我的报名
    - /enroll-center 在线报名

- 报名的类型 
    <!-- - 1机构
    - 2评价计划
    - 3培训计划 -->
    报名类型 type: plan | org
- plan: 计划报名
-  org: 机构报名

- entityCode： 机构唯一标识
- entityName: 机构的名称 （字段会超过url限制吗？）

- itemCode：报名项目code（报名类型为机构不传递）
- itemName: 评价计划的名称（报名类型为机构不传递）（字段会超过url限制吗？）

- userCode：报名方code
- userName：报名方名字 
- applyChannel: 报名渠道  1站点门户 2机构门户 3报名链接 4推广二维码 5推广海报