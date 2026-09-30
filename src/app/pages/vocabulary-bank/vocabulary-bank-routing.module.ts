import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyBankPage } from './vocabulary-bank.page';

const routes: Routes = [
  {
    path: '',
    component: VocabularyBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyBankPageRoutingModule {}
