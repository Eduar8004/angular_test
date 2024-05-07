import { TestBed } from '@angular/core/testing';

import { waitForAsync } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueService);
  });

  // beforeEach(() => {
  //   service = new ValueService();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue',()=>{
    it('should return "my value"',()=>{
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue',()=>{
    it('should change the value',()=>{
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for getPromiseValue',()=>{
    it('should return "promise value" from promise whit then',(doneFn)=>{
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      });
      
    });
  });

  describe('Test for observable value',()=>{
    it('should return "observable value" from observable whit subscribe',(doneFn)=>{
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });
  });

  describe('Tests for getObservableValue', () => {
    //AAA
    it('should return "observable value" from a promise', waitForAsync(() => {
      service.getObservableValue().subscribe(
        {
          next: (v) => expect(v).toBe('observable value')
        }
      )
    }))
  });
});
