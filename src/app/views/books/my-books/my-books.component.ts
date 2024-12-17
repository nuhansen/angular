import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from '../../../services/models/page-response-book-response';
import {BookService} from '../../../services/services/book.service';
import {BookResponse} from '../../../services/models/book-response';
import {Router, RouterLink} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalTitleDirective, ModalToggleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, RowComponent } from '@coreui/angular';
import { ManageBookComponent } from "../manage-book/manage-book.component";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  standalone:true,
  imports: [FormsModule, NgFor, BookCardComponent, ModalModule, ButtonCloseDirective, ModalBodyComponent,
    ModalComponent,
    // ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    ButtonDirective,
    ManageBookComponent,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    RowComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ],
})
export class MyBooksComponent implements OnInit {

  visible: boolean = false;
  selectedBookId: number | null = null;

  // Method to open the modal
  openModal() {
    this.visible = true;
  }

  // Method to close the modal
  closeModal() {
    this.visible = false;
  }

  handleSaveSuccess() {
    this.closeModal(); // Close modal
    this.findAllBooks(); // Refresh book list
  }

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    // this.router.navigate(['books', 'manage', book.id]);
    this.selectedBookId = book.id ?? null;
    this.visible = true;
  }
}
