import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookResponse} from '../../../services/models/book-response';
import {BookService} from '../../../services/services/book.service';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../../services/services/feedback.service';
import {PageResponseFeedbackResponse} from '../../../services/models/page-response-feedback-response';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { PaginationComponent } from '@coreui/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone:true,
  imports: [FormsModule, NgFor, PaginationComponent]
})
export class BookDetailsComponent implements OnInit {
  // @Input() book: number | null = null;
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() book: BookResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private bookId = 0;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    console.log("ini bookId", this.book);

    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    if (this.book.id) {
      this.bookService.findBookById({
        'book-id': this.book.id
      }).subscribe({
        next: (book) => {
          this.book = book;
          this.findAllFeedbacks();
        }
      });
    }
  }

  onCloseModalBtn(){
    this.onCloseModal.emit();
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByBook({
      'book-id': this.bookId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

}
