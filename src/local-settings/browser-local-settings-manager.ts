import { Injectable } from '@angular/core';
import { LocalSettingsManager } from './local-settings-manager';
import { JsonStorageWrapper } from '@huajie-ng/storage';

@Injectable()
export class BrowserLocalSettingsManager<T = any> extends LocalSettingsManager<T> {

    constructor() { 
        super();
    }

    private _storage = new JsonStorageWrapper(localStorage);
    private _makeKey(name: string) {
        return `LocalSettings.${name}`;
    }

    /**
     * 获取
     * 
     * @param name 
     */
    async get(name: string): Promise<T> {
        return (this._storage.getItem(this._makeKey(name)) || {}) as T;
    }

    /**
     * 设置
     * 
     * @param name 
     * @param data 
     */
    async set(name: string, data: Partial<T>): Promise<void> {
        this._storage.setItem(this._makeKey(name), data);
    }
}