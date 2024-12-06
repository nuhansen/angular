import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone:true,
  imports: [FormsModule, RouterOutlet],
})
export class MainComponent {

}
