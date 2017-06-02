import { Injectable, OpaqueToken, Inject, Optional } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { RequestOptions, GLOBAL_REQUEST_OPTIONS } from './request_options';

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
        options = Object.assign({}, this._globalOptions, options);
        let headers = this.createHeaders(options);

        let p1 = this._http.get(url, { 
            withCredentials: true,
            headers: headers,
            params: options.params, 
            // responseType: ResponseContentType.Json,
        })
            .toPromise()
            .then(rsp => this.parseResp<T>(rsp))
            .catch(rsp => Promise.reject(this.parseResp<any>(rsp)));

        return !options.timeout ? p1 
            : Promise.race([p1, this.throwAfterTime<T>(options.timeout)]);
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
        options = Object.assign({}, this._globalOptions, options);
        let headers = this.createHeaders(options, {
            'Content-Type': 'application/json'
        });

        let p1 = this._http.post(url, JSON.stringify(body), {
            withCredentials: true,
            headers: headers,
            params: options.params, 
            // responseType: ResponseContentType.Json,
        })
            .toPromise()
            .then(rsp => this.parseResp<T>(rsp))
            .catch(rsp => Promise.reject(this.parseResp<any>(rsp)));

        return !options.timeout ? p1 
            : Promise.race([p1, this.throwAfterTime<T>(options.timeout)]);
    }

    private throwAfterTime<T>(ms: number) {
        return new Promise<T>((resolveFn, rejectFn) => {
            setTimeout(() => {
                rejectFn(`网络超时(${ms})`);
            }, ms);
        });
    }

    private createHeaders(options: RequestOptions, headers?: {[name: string]: any;}) {
        let result = new Headers(headers);

        // 添加身份认证标识.
        if (options.authorization 
            && options.authorization.scheme
            && options.authorization.parameter) {
            result.set('Authorization', options.authorization.scheme + ' ' + options.authorization.parameter);
        }

        return result;
    }

    private parseResp<T>(rsp: Response) {
        if (rsp.status == 204)
            return undefined;
        return rsp.json() as T;
    }
}