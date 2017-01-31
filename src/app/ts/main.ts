//import { AuthConfig, AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
