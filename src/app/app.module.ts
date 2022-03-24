import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevProfileComponent } from './components/dev-profile/dev-profile.component';
import { DevRepoComponent } from './components/dev-repo/dev-repo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// env
import { environment } from 'src/environments/environment';

// form
import { FormsModule } from '@angular/forms';

// http
import { HttpClientModule } from '@angular/common/http';
import { LoadingbarComponent } from './components/loadingbar/loadingbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DevProfileComponent,
    DevRepoComponent,
    SearchBarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoadingbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
