import { Component } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  public isCollapsed: boolean;
  public localStorageUtils = new LocalStorageUtils();

  constructor() {
    this.isCollapsed = true;
  }
}
