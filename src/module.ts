import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTicketManager } from './auth/auth_ticket_manager';
import { RESTfulApiClientV2 } from './restful_api_client/restful_api_client_v2';
import { AUTH_TICKET_DEFAULT_NAME } from './auth/auth_ticket_default_name';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthTicketManager,
        RESTfulApiClientV2,
        { provide: AUTH_TICKET_DEFAULT_NAME, useValue: '___$default' },
    ],
})
export class HuajieNgCommonModule {
}
