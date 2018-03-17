export type CacheRawKey = string | { [key: string]: string | number | Date };
export type CacheStorageKey = string;

export function parseStorageKey(rawKey: CacheRawKey): CacheStorageKey {
    if (rawKey == null) {
        throw new Error('rawKey is null');
    }
    if (typeof(rawKey) === 'string') {
        return rawKey;
    }

    let props = Object.keys(rawKey).sort();
    return props.map<string>((prop) => `${prop}=${valToString(rawKey[prop])}`).join('&');
}

function valToString(v: string | number | Date) {
    if (v == null) {
        return '';
    } else if (typeof (v) === 'string') {
        return v;
    } else if (typeof (v) === 'number') {
        return v.toString();
    } else if (typeof (v.toISOString) === 'function') {
        return v.toISOString();
    } else {
        return v.toString();
    }
}