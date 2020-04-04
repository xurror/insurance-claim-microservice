import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { EndorsementDetailComponent } from 'app/entities/endorsement/endorsement-detail.component';
import { Endorsement } from 'app/shared/model/endorsement.model';

describe('Component Tests', () => {
  describe('Endorsement Management Detail Component', () => {
    let comp: EndorsementDetailComponent;
    let fixture: ComponentFixture<EndorsementDetailComponent>;
    const route = ({ data: of({ endorsement: new Endorsement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [EndorsementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EndorsementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EndorsementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load endorsement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.endorsement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
