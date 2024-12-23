import { NgFor, NgIf, NgStyle } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  standalone:true,
  imports: [NgFor, NgIf, IconDirective, NgStyle]
})
export class RatingComponent {
  icons = freeSet ;
  @Input() rating: number = 0;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }
}
