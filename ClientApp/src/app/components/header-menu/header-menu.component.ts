import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  @Input() isUserRoleManager: boolean = false;
  @Output() navLinkSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hideMenu() {
    this.navLinkSelected.emit(false);
  }
}
