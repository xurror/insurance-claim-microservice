import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEndorsement, Endorsement } from 'app/shared/model/endorsement.model';
import { EndorsementService } from './endorsement.service';
import { IPolicy } from 'app/shared/model/policy.model';
import { PolicyService } from 'app/entities/policy/policy.service';

@Component({
  selector: 'jhi-endorsement-update',
  templateUrl: './endorsement-update.component.html'
})
export class EndorsementUpdateComponent implements OnInit {
  isSaving = false;
  policies: IPolicy[] = [];

  editForm = this.fb.group({
    id: [],
    ref: [null, [Validators.required]],
    description: [null, [Validators.required]],
    policy: []
  });

  constructor(
    protected endorsementService: EndorsementService,
    protected policyService: PolicyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ endorsement }) => {
      this.updateForm(endorsement);

      this.policyService.query().subscribe((res: HttpResponse<IPolicy[]>) => (this.policies = res.body || []));
    });
  }

  updateForm(endorsement: IEndorsement): void {
    this.editForm.patchValue({
      id: endorsement.id,
      ref: endorsement.ref,
      description: endorsement.description,
      policy: endorsement.policy
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const endorsement = this.createFromForm();
    if (endorsement.id !== undefined) {
      this.subscribeToSaveResponse(this.endorsementService.update(endorsement));
    } else {
      this.subscribeToSaveResponse(this.endorsementService.create(endorsement));
    }
  }

  private createFromForm(): IEndorsement {
    return {
      ...new Endorsement(),
      id: this.editForm.get(['id'])!.value,
      ref: this.editForm.get(['ref'])!.value,
      description: this.editForm.get(['description'])!.value,
      policy: this.editForm.get(['policy'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndorsement>>): void {
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
