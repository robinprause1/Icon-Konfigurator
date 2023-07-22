import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterViewComponent} from './views/register-view/register-view.component';
import {FormsModule} from "@angular/forms";
import {ProfileViewComponent} from './views/profile-view/profile-view.component';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {ConfigureViewComponent} from './views/configure-view/configure-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirstStepComponent} from './views/subViews/first-step/first-step.component';
import {SecondStepComponent} from './views/subViews/second-step/second-step.component';
import {ThirdStepComponent} from './views/subViews/third-step/third-step.component';
import {SummrayStepComponent} from './views/subViews/summray-step/summray-step.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {iconReducer} from "../state/icon/icon.reducer";
import {messageReducer} from "../state/message/message.reducer";
import {environment} from "../environments/environment";
import {authReducer} from "../state/auth/auth.reducer";
import { IconStoreComponent } from './views/components/icon-store/icon-store.component';
import { EditProfileViewComponent } from './views/components/edit-profile-view/edit-profile-view.component';
import { IconListViewComponent } from './views/components/icon-list-view/icon-list-view.component';
import { IconPropsComponent } from './views/components/icon-props/icon-props.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterViewComponent,
    ProfileViewComponent,
    LoginViewComponent,
    ConfigureViewComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    SummrayStepComponent,
    IconStoreComponent,
    EditProfileViewComponent,
    IconListViewComponent,
    IconPropsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      iconState: iconReducer, messageState: messageReducer, authState: authReducer
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
