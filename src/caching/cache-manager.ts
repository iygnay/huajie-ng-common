import { Injectable } from '@angular/core';
import { CacheGroup } from './cache-group';
import { CacheItem } from './cache-item';
import { parseStorageKey, CacheRawKey, CacheStorageKey } from './key';

const GK_CACHE_MANAGER_DATA: string = '__CacheManager.data';

@Injectable()
export class CacheManager {

    constructor() {
        if (window[GK_CACHE_MANAGER_DATA] == null) {
            window[GK_CACHE_MANAGER_DATA] = new Map<string, CacheGroup>();
        }
    }

    private get _data(): Map<string, CacheGroup> {
        return window[GK_CACHE_MANAGER_DATA];
    }

    /**
     * 查找指定键对应的对象.
     * 
     * @param groupName 
     * @param key 
     */
    async find<T>(groupName: string, key: CacheRawKey): Promise<T> {
        let group = this._data.get(groupName);
        if (group == null) {
            return null;
        }

        let sk = parseStorageKey(key);
        let item = group.items.get(sk);
        let now = Date.now();
        return (item && item.expireDate >= now) ? item.data : null;
    }

    /**
     * 
     * 
     * @param groupName 
     * @param key 
     * @param getterFn 
     */
    async get<T>(groupName: string, key: CacheRawKey, getterFn: (key: CacheRawKey) => Promise<{ data: T, lifeInMs: number }>) {
        let r = await this.find<T>(groupName, key);
        if (r == null) {
            let { data, lifeInMs } = await getterFn(key);
            if (data != null) {
                await this.add(groupName, key, data, lifeInMs);
                r = data;
            }
        }
        return r;
    }

    /**
     * 添加缓存对象
     * 
     * @param groupName 
     * @param key 
     * @param data 
     * @param lifeInMs 
     */
    async add(groupName: string, key: CacheRawKey, data: any, lifeInMs: number): Promise<void> {
        let group = this._data.get(groupName);
        if (group == null) {
            group = {
                items: new Map<string, CacheItem>(),
                name: groupName,
            }
            this._data.set(groupName, group);
        }

        let sk = parseStorageKey(key);
        let item: CacheItem = {
            expireDate: Date.now() + lifeInMs,
            data: data,
            key: sk,
        }
        group.items.set(sk, item);
    }

    /**
     * 移除指定的缓存.
     * 
     * @param groupName 
     * @param key 
     */
    async remove(groupName: string, key: CacheRawKey): Promise<void> {
        let group = this._data.get(groupName);
        if (group == null) {
            return;
        }
        let sk = parseStorageKey(key);
        if (group.items.has(sk)) {
            group.items.delete(sk);
        }
    }

    /**
     * 移除所有缓存项.
     */
    async clear(): Promise<void> {
        this._data.clear();
    }

    /**
     * 清理所有过期的缓存项
     */
    async gc() {
        let now = Date.now();
        let count = 0;

        this._data.forEach(group => {
            let sks = Array.from(group.items.keys());
            for (const sk of sks) {
                let item = group.items.get(sk);
                if (item == null || now > item.expireDate) {
                    group.items.delete(sk);
                    ++count;
                }
            }
        });
        return count;
    }
}