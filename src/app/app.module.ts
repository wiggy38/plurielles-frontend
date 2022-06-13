import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MemberFormComponent } from './adherant/members/member-form/member-form.component';
import { MemberListComponent } from './adherant/members/member-list/member-list.component';
import { MemberProfileComponent } from './adherant/members/member-profile/member-profile.component';
import {InputTextModule} from "primeng/inputtext";
import { MemberAddComponent } from './adherant/members/member-add/member-add.component';
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        InputTextModule,
        ReactiveFormsModule,
        CheckboxModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MemberFormComponent,
    MemberListComponent,
    MemberProfileComponent,
    MemberAddComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
