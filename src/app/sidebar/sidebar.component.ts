import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'pe-7s-graph', class: '' },
    { path: '/members/list/all', title: 'Membres',  icon: 'pe-7s-graph', class: '' },
    { path: '/members/add/new', title: 'Membres',  icon: 'pe-7s-graph', class: 'hidden' },
    { path: '/members/profile/:id', title: 'Membres',  icon: 'pe-7s-graph', class: 'hidden' },
    { path: '#', title: 'Formules d\'adhésion',  icon: 'pe-7s-graph', class: '' },
    { path: '#', title: 'Formations',  icon: 'pe-7s-graph', class: '' },
    { path: '#', title: 'Accès aux soins',  icon: 'pe-7s-graph', class: '' },
    { path: '#', title: 'Support',  icon: 'pe-7s-graph', class: '' },
    //{ path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    //{ path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
