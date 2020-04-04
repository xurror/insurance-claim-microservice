import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMTA, MTA } from 'app/shared/model/mta.model';
import { MTAService } from './mta.service';
import { IPolicy } from 'app/shared/model/policy.model';
import { PolicyService } from 'app/entities/policy/policy.service';

@Component({
  selector: 'jhi-mta-update',
  templateUrl: './mta-update.component.html'
})
export class MTAUpdateComponent implements OnInit {
  isSaving = false;
  policies: IPolicy[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    policy: []
  });

  constructor(
    protected mTAService: MTAService,
    protected policyService: PolicyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mTA }) => {
      this.updateForm(mTA);

      this.policyService.query().subscribe((res: HttpResponse<IPolicy[]>) => (this.policies = res.body || []));
    });
  }

  updateForm(mTA: IMTA): void {
    this.editForm.patchValue({
      id: mTA.id,
      startDate: mTA.startDate,
      endDate: mTA.endDate,
      policy: mTA.policy
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mTA = this.createFromForm();
    if (mTA.id !== undefined) {
      this.subscribeToSaveResponse(this.mTAService.update(mTA));
    } else {
      this.subscribeToSaveResponse(this.mTAService.create(mTA));
    }
  }

  private createFromForm(): IMTA {
    return {
      ...new MTA(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      policy: this.editForm.get(['policy'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMTA>>): void {
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

  trackById(index: number, item: IPolicy): any {
    return item.id;
  }
}
