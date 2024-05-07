import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { FakeValueService } from './value-fake-service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService : MasterService;
  let valueServicesSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService',['getValue']);
    TestBed.configureTestingModule({providers:[MasterService,{provide:ValueService, useValue:spy}]});
    masterService = TestBed.inject(MasterService);
    valueServicesSpy = TestBed.inject(ValueService ) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "my value" from the real service',() => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');

  // });

  // it('should return "other value" from the fake service',() => {
  //   const fakevalueService = new FakeValueService();
  //   const masterService = new MasterService(fakevalueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');

  // });

  // it('should return "other value" from the fake obj',() => {
  //   const fake = {getValue:()=>'fake from obj'};
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe('fake from obj');

  // });

  it('should call getValue from spy of ValueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServicesSpy.getValue.and.returnValue('fake value');
    // const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServicesSpy.getValue).toHaveBeenCalled();
    expect(valueServicesSpy.getValue).toHaveBeenCalledTimes(1);
  });

      // const spy: jasmine.SpyObj<ValueService> = jasmine.createSpyObj(
    //   'ValueService',
    //   ['getValue']
    // );

  

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
