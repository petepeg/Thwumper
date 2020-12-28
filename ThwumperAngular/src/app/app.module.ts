import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsService } from './user-details.service';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'timeline/:userId', component: TimelineComponent },
    { path: 'user/:userId', component: UserDetailsComponent }
], { relativeLinkResolution: 'legacy' }),
    FontAwesomeModule
    ],
  declarations: [ 
    AppComponent,
    TopBarComponent,
    TimelineComponent,
    UserDetailsComponent,
    LoginComponent
    ],
  bootstrap:    [ AppComponent ],
  providers: [UserDetailsService]
})
export class AppModule { }
