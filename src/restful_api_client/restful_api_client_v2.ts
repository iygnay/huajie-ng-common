import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs, ResponseContentType, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { RequestOptions, GLOBAL_REQUEST_OPTIONS } from './request_options';
import { HttpError, HttpBadJsonFormatError, HttpNotSuccessStatusCodeError, HttpNetworkError } from './http-error';
import { parseURLSearchParams } from './parse-url-search-params';

/**
 * RESTfulApiClientV2:
 * 
 * 对ng2的http服务进行简单的封装.
 * 可以方便的发起Json数据的get和post请求, 并且返回Promise.
 */
@Injectable()
export class RESTfulApiClientV2 {
    constructor(
        private _http: Http,
        @Inject(GLOBAL_REQUEST_OPTIONS) @Optional() private _globalOptions?: RequestOptions,
    ) {
    }
    
    /**
     * 使用get请求一项资源.
     * 
     * @template T 
     * @param {string} url 
     * @param {RequestOptions} [options] 
     * @returns 
     * 
     * @memberOf RESTfulApiClientV2
     */
    get<T>(url: string, options?: RequestOptions) {
        return this._exec<T>(url, null, 'GEt', options);
    }

    /**
     * 使用post提交一项资源
     * 
     * @template T 
     * @param {string} url 
     * @param {*} body 
     * @param {RequestOptions} [options] 
     * @returns 
     * 
     * @memberOf RESTfulApiClientV2
     */
    post<T>(url: string, body: any, options?: RequestOptions) {
        return this._exec<T>(url, body, 'POST', options);
    }

    /**
     * 执行请求.
     * 
     * @param url 
     * @param body 
     * @param method 
     * @param options 
     */
    private async _exec<T>(url: string, body: any, method: string, options?: RequestOptions) {
        options = Object.assign({}, this._globalOptions, options);

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        if (options.authorization && options.authorization.scheme && options.authorization.parameter) {
            headers.set('Authorization', options.authorization.scheme + ' ' + options.authorization.parameter);
        }

        let request = new Request({
            url: url,
            withCredentials: true,
            headers: headers,
            params: parseURLSearchParams(options.params),
            body: JSON.stringify(body),
            responseType: ResponseContentType.Json,
            method: method,
        });

        try {
            // 执行.
            let response = await (this._http.request(request).toPromise());
            let { ok, result } = this._safeParseJsonResult<T>(response);
            if (!ok) {
                throw new HttpBadJsonFormatError(request, response);
            }
        } 
        catch (error) {
            // 状态码错误.
            if (error instanceof Response) {
                let response = error;
                let { ok, result } = this._safeParseJsonResult<T>(response);
                throw new HttpNotSuccessStatusCodeError(request, response, result);
            }

            // 网络错误.
            if (error instanceof ProgressEvent || 
                (error.target && error.target instanceof XMLHttpRequest)) {
                let xhq: XMLHttpRequest = error.target;
                throw new HttpNetworkError(request, xhq);
            }

            throw error;
        }
    }

    

    

    /**
     * 将响应内容解析为JSON对象.
     * 
     * @param resp 
     */
    private _safeParseJsonResult<T>(resp: Response): { ok: boolean, result?: T } {
        if (resp.status == 204) {
            return { ok: true };
        }

        if (typeof (resp.json) !== 'function') {
            return { ok: false };
        }

        try {
            let result = resp.json() as T;
            return { ok: true, result: result };
        } catch (error) {
            return { ok: false };
        }
    }
}