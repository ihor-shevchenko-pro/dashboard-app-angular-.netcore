import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onPrev(): void {
    this.goPrev.emit(true);
  }

  public onNext(): void {
    this.goNext.emit(true);
  }

  public onPage(number: number): void {
    this.goPage.emit(number);
  }

  public onLast(): void {
    let totalPages: number = Math.ceil(this.count / this.perPage);
    this.goPage.emit(totalPages);
  }

  public onFirst(): void {
    this.goPage.emit(1);
  }

  public totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  public isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  public getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  public getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.count / this.perPage);
    const thisPage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(thisPage);
    // console.log('Starting loop with: total pages:', totalPages, 'thisPage:', thisPage, 'pagesToShow:', pagesToShow );
    for (let i = 0; i < pagesToShow - 1; i++) {
      // console.log('pages[]:', pages);
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
          // console.log('pushing', Math.min.apply(null, pages) - 1, 'onto array');
        }
      }

      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
          // console.log('pushing', Math.max.apply(null, pages) + 1, 'onto array');
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

}
