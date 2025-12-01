# 需要路由携带的参数

- sid： 站点id 
- url ${origin}/XXX
    - /enroll/enrollManagement 报名管理
    - /enroll/myEnrollment 我的报名
    - /enroll/enrollCenter 在线报名

- 报名的类型 
    - 1机构
    - 2评价计划
    - 3培训计划

- entityCode： 机构唯一标识
- entityName: 机构的名称 （字段会超过url限制吗？）

- itemCode：报名项目code（报名类型为机构不传递）
- itemName: 评价计划的名称（报名类型为机构不传递）（字段会超过url限制吗？）

- userCode：报名方code
- userName：报名方名字 