import { Injectable, Inject, Optional } from '@angular/core';
import { AuthTicket } from './auth_ticket';
import { AUTH_TICKET_MANAGER_STORAGE_PROVIDER } from './auth_ticket_manager_storage_provider';

const LOCAL_STORAGE_KEY = '.AuthTicketManager._ticketsV2';
const DEFAULT_NAME = '___$default';

@Injectable()
export class AuthTicketManager {
    private _tickets: {
        [name: string]: AuthTicket
    };

    _storage: any;

    constructor(
        @Inject(AUTH_TICKET_MANAGER_STORAGE_PROVIDER) @Optional() private _storageProvider: string,
    ) { 
        this._storage = _storageProvider == 'session' 
            ? sessionStorage : localStorage;

        console.info('AuthTicketManager', _storageProvider || 'local');
        // 从本地存储加载以前的凭证
        let json = this._storage[LOCAL_STORAGE_KEY] || '{}';
        this._tickets = JSON.parse(json);

        for (let n in this._tickets) {
            let t = this._tickets[n];
            if (t) {
                t.expireDate = new Date((t.expireDate as any) as string);
            }
        }
    }

    set(ticket: AuthTicket, name?: string) {
        this._tickets[name || DEFAULT_NAME] = ticket;
        this._storage[LOCAL_STORAGE_KEY] = JSON.stringify(this._tickets);
    }

    get(name?: string) {
        return this._tickets[name || DEFAULT_NAME];
    }

    remove(name?: string) {
        this.set(undefined, name || DEFAULT_NAME);
        this._storage[LOCAL_STORAGE_KEY] = JSON.stringify(this._tickets);
    }
}