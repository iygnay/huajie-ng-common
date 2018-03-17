import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// auth
import { AuthTicketManager } from './auth/auth_ticket_manager';
import { AUTH_TICKET_DEFAULT_NAME } from './auth/auth_ticket_default_name';

// api client
import { RESTfulApiClientV2 } from './restful_api_client/restful_api_client_v2';

// startup params
import { STARTUP_PARAMS } from './startup/startup-params';
import { STARTUP_PARAMS_KEY } from './startup/startup-params-key';
import { startupParamsFactory } from './startup/startup-params-factory';

// local settings
import { LocalSettingsManager } from './local-settings/local-settings-manager';
import { BrowserLocalSettingsManager } from './local-settings/browser-local-settings-manager';

// caching
import { CacheManager } from './caching/cache-manager';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [],
})
export class HuajieNgCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HuajieNgCommonModule,
            providers: [
                AuthTicketManager,
                RESTfulApiClientV2,
                { provide: AUTH_TICKET_DEFAULT_NAME, useValue: '___$default' },
                { provide: STARTUP_PARAMS_KEY, useValue: ['__startup'] },
                { provide: STARTUP_PARAMS, useFactory: startupParamsFactory, deps: [STARTUP_PARAMS_KEY] },

                // local settings
                BrowserLocalSettingsManager,
                { provide: LocalSettingsManager, useExisting: BrowserLocalSettingsManager },

                // caching
                CacheManager,
            ],
        };
    }
}
