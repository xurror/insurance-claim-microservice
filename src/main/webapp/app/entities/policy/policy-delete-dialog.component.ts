import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicy } from 'app/shared/model/policy.model';
import { PolicyService } from './policy.service';

@Component({
  templateUrl: './policy-delete-dialog.component.html'
})
export class PolicyDeleteDialogComponent {
  policy?: IPolicy;

  constructor(protected policyService: PolicyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.policyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('policyListModification');
      this.activeModal.close();
    });
  }
}
