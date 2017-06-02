import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTicketManager } from './auth/auth_ticket_manager';
import { RESTfulApiClientV2 } from './restful_api_client/restful_api_client_v2';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthTicketManager,
        RESTfulApiClientV2,
    ],
})
export class HuajieNgCommonModule {
}
