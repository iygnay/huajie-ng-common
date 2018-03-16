import { Response, Request } from '@angular/http';

/**
 * 指示通用的Http错误.
 */
export class HttpError {
    message: string;
    request: Request;
}

/**
 * 指示接口返回数据的格式不正确
 * - 例如: 不是正确的`JSON`格式等.
 */
export class HttpBadJsonFormatError extends HttpError {
    constructor(
        public request: Request,
        public response: Response) {
        super();
        this.message = `响应内容不是有效的JSON格式 (code: ${response.status})`;
    }
}

/**
 * 指示网络相关的错误.
 */
export class HttpNetworkError extends HttpError {
    constructor(
        public request: Request,
        public xhq: XMLHttpRequest) {
        super();
        this.message = `网络请求失败 (NetworkError)`;
    }
}

/**
 * 指示返回状态码不表示`成功`(200~299)的错误.
 */
export class HttpNotSuccessStatusCodeError extends HttpError {
    constructor(
        public request: Request,
        public response: Response,
        public result: any) {
        super();
        this.message = `网络请求失败 (status: ${response.status})`;
    }
}