import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
bootstrapApplication(AppComponent, {
  ...appConfig,

  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
