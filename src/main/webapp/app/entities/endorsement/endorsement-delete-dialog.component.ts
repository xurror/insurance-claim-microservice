import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEndorsement } from 'app/shared/model/endorsement.model';
import { EndorsementService } from './endorsement.service';

@Component({
  templateUrl: './endorsement-delete-dialog.component.html'
})
export class EndorsementDeleteDialogComponent {
  endorsement?: IEndorsement;

  constructor(
    protected endorsementService: EndorsementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.endorsementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('endorsementListModification');
      this.activeModal.close();
    });
  }
}
