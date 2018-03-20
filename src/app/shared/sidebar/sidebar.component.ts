import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/schedule', title: 'Schedule', icon: 'ti-panel'},
  {path: '/permanent-clients', title: 'Permanent Clients', icon: 'ti-panel'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor () {}

  ngOnInit () {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
