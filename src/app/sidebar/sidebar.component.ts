import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/add', title: 'Add Course', icon: 'nc-book-bookmark', class: '' },
    { path: '/view', title: 'View Course', icon: 'nc-map-big', class: '' },
    //{ path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
    // { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
    { path: '/users', title: 'Users', icon: 'nc-circle-10', class: '' },
    // { path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
