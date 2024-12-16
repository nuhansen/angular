import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { customInterceptor } from './services/interceptor/custom.interceptor'
import { loadingInterceptor } from './services/interceptor/loading.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(withInterceptors([customInterceptor])),
    provideHttpClient(withInterceptors([customInterceptor, loadingInterceptor])),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule, BrowserAnimationsModule),
    IconSetService,
    provideAnimations(),
    provideHttpClient()
  ]
};
