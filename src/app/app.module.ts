import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app.routes';
import {FormsModule} from '@angular/forms';
import {ActivateAccountComponent} from './views/pages/activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import {ApiModule} from './services/api.module';

@NgModule({
  declarations: [
    ActivateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodeInputModule,
    // HttpClientModule,
    ApiModule.forRoot({rootUrl: 'https://projecth.site/bsn-be/api/v1'})
    // ApiModule.forRoot({rootUrl: 'http://localhost:8088/api/v1'})
  ],
  // providers: [
  //   HttpClient,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpTokenInterceptor,
  //     multi: true
  //   }
  // ],
  // bootstrap: [AppComponent]
})
export class AppModule {
}
