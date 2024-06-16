import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  squareClass = "square-red";

  changeSquare() {
    this.squareClass =
      this.squareClass === "square-red" ? "square-blue" : "square-red";
  }
}
