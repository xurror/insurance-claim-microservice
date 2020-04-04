import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IQuote } from 'app/shared/model/quote.model';
import { QuoteService } from 'app/entities/quote/quote.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  quotes: IQuote[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    code: [null, [Validators.required]],
    description: [null, [Validators.required]],
    category: [null, [Validators.required]],
    timestamp: [null, [Validators.required]],
    isActive: [null, [Validators.required]],
    quote: []
  });

  constructor(
    protected productService: ProductService,
    protected quoteService: QuoteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.quoteService.query().subscribe((res: HttpResponse<IQuote[]>) => (this.quotes = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      code: product.code,
      description: product.description,
      category: product.category,
      timestamp: product.timestamp,
      isActive: product.isActive,
      quote: product.quote
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value,
      description: this.editForm.get(['description'])!.value,
      category: this.editForm.get(['category'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      quote: this.editForm.get(['quote'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IQuote): any {
    return item.id;
  }
}
