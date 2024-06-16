import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  hoverClass = "type1";

  registerForm = "loginwDis";


  changeHover() {
    this.hoverClass =
      this.hoverClass === "type1" ? "type2" : "type1";
    this.registerForm = 
      this.registerForm === "loginwDis" ? "loginwEn" : "loginwDis";
  }

  menuType = "disabled";

  turnMenu() {
    this.menuType = 
      this.menuType === "disabled" ? "enabled" : "disabled";
  }

}
