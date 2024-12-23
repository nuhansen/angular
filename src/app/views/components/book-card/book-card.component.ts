import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../../services/models/book-response';
import { RatingComponent } from '../rating/rating.component';
import { NgFor, NgIf } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { BorderDirective, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ColComponent, RowComponent, TextColorDirective, TooltipDirective } from '@coreui/angular';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone:true,
  imports:[CardGroupComponent, TooltipDirective, RatingComponent, NgIf, CardFooterComponent,IconDirective, ButtonGroupComponent, ButtonDirective,RowComponent, NgFor, ColComponent, TextColorDirective, CardComponent, BorderDirective, CardHeaderComponent, CardBodyComponent, CardTitleDirective, CardTextDirective, CardSubtitleDirective]
})
export class BookCardComponent {
  icons = freeSet ;

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light', textColor: 'light' },
    { color: 'dark', textColor: 'dark' }
  ];


  private _book: BookResponse = {};
  private _manage = false;
  private _bookCover: string | undefined;

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }
  @Input() bookId: number | null = null; //

  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShowDetails() {
    this.details.emit(this._book);
  }
}
