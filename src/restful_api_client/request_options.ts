import { InjectionToken } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthorizationArgs } from './authorization_args';

/**
 * 全局的参数配置.
 */
export const GLOBAL_REQUEST_OPTIONS = new InjectionToken('GLOBAL_REQUEST_OPTIONS');

/**
 * RESTfulApiClientRequestOptions.
 * 
 * @export
 */
export interface RequestOptions {

    /**
     * 身份验证
     */
    authorization?: AuthorizationArgs;

    /**
     * 超时时间.
     * 
     * 设置为null或者0表示没有超时限制.
     * 
     * @type {number}
     */
    timeout?: number;

    /**
     * 查询参数.
     * 
     * @type {*}
     */
    params?: string | URLSearchParams | {
        [key: string]: any | any[];
    };
}