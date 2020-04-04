import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicyHolder } from 'app/shared/model/policy-holder.model';
import { PolicyHolderService } from './policy-holder.service';

@Component({
  templateUrl: './policy-holder-delete-dialog.component.html'
})
export class PolicyHolderDeleteDialogComponent {
  policyHolder?: IPolicyHolder;

  constructor(
    protected policyHolderService: PolicyHolderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.policyHolderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('policyHolderListModification');
      this.activeModal.close();
    });
  }
}
