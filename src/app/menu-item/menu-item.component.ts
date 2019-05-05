import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavItem} from '../navbar-component/nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() displayName: String;
  @Input() items: NavItem[];
  constructor() { }

  ngOnInit() {
  }

}