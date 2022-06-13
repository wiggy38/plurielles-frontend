import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MemberListComponent} from "../../adherant/members/member-list/member-list.component";
import {MemberProfileComponent} from "../../adherant/members/member-profile/member-profile.component";
import {MemberFormComponent} from "../../adherant/members/member-form/member-form.component";
import {MemberAddComponent} from "../../adherant/members/member-add/member-add.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: HomeComponent },
    { path: 'members/add/new',          component: MemberAddComponent },
    { path: 'members/form',             component: MemberFormComponent },
    { path: 'members/list/all',         component: MemberListComponent },
    { path: 'members/profile',          component: MemberProfileComponent },
    { path: 'user',                     component: UserComponent },
    { path: 'table',                    component: TablesComponent },
    { path: 'typography',               component: TypographyComponent },
    { path: 'icons',                    component: IconsComponent },
    { path: 'maps',                     component: MapsComponent },
    { path: 'notifications',            component: NotificationsComponent },
    { path: 'upgrade',                  component: UpgradeComponent },
];
