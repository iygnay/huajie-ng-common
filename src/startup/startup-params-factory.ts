import { STARTUP_PARAMS } from './startup-params';
import { STARTUP_PARAMS_KEY } from './startup-params-key';

/**
 * factory: STARTUP_PARAMS
 * 
 * @param keys 
 */
export function startupParamsFactory(keys: string | string[]) {
    if (typeof(keys) === 'string') {
        keys = [keys];
    }

    var values = keys
        .map(it => window[it])
        .filter(it => it != null && typeof (it) === 'object');

    return Object.assign({}, ... values);
}