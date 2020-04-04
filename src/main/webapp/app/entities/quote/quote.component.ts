import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuote } from 'app/shared/model/quote.model';
import { QuoteService } from './quote.service';
import { QuoteDeleteDialogComponent } from './quote-delete-dialog.component';

@Component({
  selector: 'jhi-quote',
  templateUrl: './quote.component.html'
})
export class QuoteComponent implements OnInit, OnDestroy {
  quotes?: IQuote[];
  eventSubscriber?: Subscription;

  constructor(protected quoteService: QuoteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.quoteService.query().subscribe((res: HttpResponse<IQuote[]>) => (this.quotes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQuotes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQuote): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQuotes(): void {
    this.eventSubscriber = this.eventManager.subscribe('quoteListModification', () => this.loadAll());
  }

  delete(quote: IQuote): void {
    const modalRef = this.modalService.open(QuoteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.quote = quote;
  }
}
