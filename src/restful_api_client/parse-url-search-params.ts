import { URLSearchParams } from '@angular/http';

/**
 * 将参数转换为`URLSearchParams`.
 * 
 * @param params 
 */
export function parseURLSearchParams(params: string | URLSearchParams | { [key: string]: any }): URLSearchParams {
    if (params == null) {
        return new URLSearchParams();
    }

    if (typeof(params) === 'string')
        return new URLSearchParams(params);

    if (params instanceof URLSearchParams)
        return params;

    return _objectToURLSearchParams(params);
}

/**
 * 将对象转换为`URLSearchParams`.
 * 
 * @param params 
 */
function _objectToURLSearchParams(params: { [key: string]: any }) {
    let result = new URLSearchParams();
    for (const key of Object.keys(params)) {
        let value = params[key];

        if (value == null) {
            // 跳过`null`值.
            continue;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                if (item == null) {
                    // 跳过`null`值.
                    continue;
                }
                let s = _toString(item);
                result.append(key, s);
            }
        } 
        else {
            let s = this._getValStr(value);
            result.append(key, s);
        }
    }

    return result;
}

function _toString(value: any) {
    if (value == null) {
        return '';
    }
    
    if (value instanceof Date && !Number.isNaN(value.valueOf())) {
        return value.toISOString();
    }

    return value.toString();
}