import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { MTAUpdateComponent } from 'app/entities/mta/mta-update.component';
import { MTAService } from 'app/entities/mta/mta.service';
import { MTA } from 'app/shared/model/mta.model';

describe('Component Tests', () => {
  describe('MTA Management Update Component', () => {
    let comp: MTAUpdateComponent;
    let fixture: ComponentFixture<MTAUpdateComponent>;
    let service: MTAService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [MTAUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MTAUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MTAUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MTAService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MTA(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MTA();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
