import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { MTADetailComponent } from 'app/entities/mta/mta-detail.component';
import { MTA } from 'app/shared/model/mta.model';

describe('Component Tests', () => {
  describe('MTA Management Detail Component', () => {
    let comp: MTADetailComponent;
    let fixture: ComponentFixture<MTADetailComponent>;
    const route = ({ data: of({ mTA: new MTA(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [MTADetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MTADetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MTADetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mTA on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mTA).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
