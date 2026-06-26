import { TestBed } from '@angular/core/testing';

import { Ocupacao } from './ocupacao';

describe('Ocupacao', () => {
  let service: Ocupacao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ocupacao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
