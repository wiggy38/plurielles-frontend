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
import {MemberAddComponent} from "../../adherant/members/member-add/member-add.component";
import {MemberDetailsComponent} from "../../adherant/members/member-details/member-details.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: HomeComponent },
    { path: 'members/add/new',          component: MemberAddComponent },
    { path: 'members/list/all',         component: MemberListComponent },
    { path: 'members/profile/:id',          component: MemberDetailsComponent },
    { path: 'user',                     component: UserComponent },
    { path: 'table',                    component: TablesComponent },
    { path: 'typography',               component: TypographyComponent },
    { path: 'icons',                    component: IconsComponent },
    { path: 'maps',                     component: MapsComponent },
    { path: 'notifications',            component: NotificationsComponent },
    { path: 'upgrade',                  component: UpgradeComponent },
];
