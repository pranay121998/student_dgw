import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { ChaptersComponent } from 'app/pages/chapters/chapters.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'users', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'add', component: IconsComponent },
    { path: 'view', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'chapters/:id/:name', component: ChaptersComponent },
];
