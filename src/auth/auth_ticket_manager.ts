import { Injectable, Inject, Optional } from '@angular/core';
import { AuthTicket } from './auth_ticket';
import { AUTH_TICKET_MANAGER_STORAGE_PROVIDER } from './auth_ticket_manager_storage_provider';
import { JsonStorage, JsonStorageWrapper } from '@huajie-ng/storage';
import { AUTH_TICKET_DEFAULT_NAME } from './auth_ticket_default_name';

const LOCAL_STORAGE_KEY = '.AuthTicketManager._ticketsV2';

interface LocalTickets {
    [name: string]: AuthTicket
}

@Injectable()
export class AuthTicketManager {

    _storage: JsonStorage;
    private _tickets: LocalTickets;
    
    constructor(
        @Inject(AUTH_TICKET_MANAGER_STORAGE_PROVIDER) @Optional() private _storageProvider: string,
        @Inject(AUTH_TICKET_DEFAULT_NAME) private _defaultName: string,
    ) { 
        if (!this._defaultName) {
            throw new Error('AuthTicketManager: !AUTH_TICKET_DEFAULT_NAME');
        }

        this._storage = new JsonStorageWrapper(_storageProvider == 'session' 
            ? sessionStorage : localStorage);

        // 从本地存储加载以前的凭证
        this._checkout();
    }

    private _checkout() {
        this._tickets = this._storage.getItem<LocalTickets>(LOCAL_STORAGE_KEY) || {};

        for (let n in this._tickets) {
            let t = this._tickets[n];
            if (t) {
                t.expireDate = new Date((t.expireDate as any) as string);
            }
        }
    }
    
    private _save() {
        this._storage.setItem(LOCAL_STORAGE_KEY, this._tickets);
    }

    set(ticket: AuthTicket, name?: string) {
        this._tickets[name || this._defaultName] = ticket;
        this._save();
    }

    get(name?: string) {
        return this._tickets[name || this._defaultName];
    }

    remove(name?: string) {
        this.set(undefined, name || this._defaultName);
        this._save();
    }
}