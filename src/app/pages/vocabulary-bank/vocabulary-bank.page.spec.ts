import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocabularyBankPage } from './vocabulary-bank.page';

describe('VocabularyBankPage', () => {
  let component: VocabularyBankPage;
  let fixture: ComponentFixture<VocabularyBankPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
