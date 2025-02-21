import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalculateTotalPricePipe } from './pipes/calculate-total-price.pipe';

export function createTranslateLoader(httpClient: HttpClient){
    return new TranslateHttpLoader(httpClient, './i18n/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'es'
      })
    ), 
    provideAnimationsAsync(),
    CalculateTotalPricePipe
  
  ]
};
