# 3.0.1 (2017-06-04)

## bug fixes

1. 修复`tsconfig.es5.json`中`flatModuleId`设置错误导致`AoT`模式下不能正确编译的问题 

# 3.0.0 (2017-06-02)

## breaking changes

1. 使用`generator-angular2-library`重新发布了包, 现在提供`ESM`和`UMD`两种版本的输出, 不再为各个导出方法/服务提供独立的js文件.

# 2.1.0 (2017-04-17)

## 新增功能

1. 添加`AUTH_TICKET_MANAGER_STORAGE_PROVIDER`用于决定身份凭证管理是使用local还是session来缓存身份凭证.

# 2.0.3 (2017-04-11)

## bug fixes

1. 修复`RESTfulApiClientV2`不能正确解析单纯的`string`数据(例如: `"abc"`应当是一个合法的JSON).

# 2.0.2 (2017-04-11)

## bug fixes

1. 将`AuthorizationArgs`的`schema`更正为`scheme`.

# 2.0.1 (2017-04-11)

## bug fixes

1. 将`RequestOptions`的`timeout`属性设置为可选.

# 2.0.0 (2017-04-08)

## 新增功能

1. 新增RESTfulApiClientV2
2. 新增AuthTicketManager

## breaking changes

1. 移除RESTfulApiClient

## 1.1.0
添加RESTFUL_API_CLIENT_GLOBAL_OPTIONS

## 1.0.3
修复index未正确导出HuajieNgCommonModule的错误

## 1.0.1
修复未发布d.ts文件的错误

## 1.0.0
发布项目

1. 新增RESTfulApiClient