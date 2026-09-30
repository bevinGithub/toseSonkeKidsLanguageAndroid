import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyBankPageRoutingModule } from './vocabulary-bank-routing.module';

import { VocabularyBankPage } from './vocabulary-bank.page';
import { SharedModule } from 'src/app/components/shared.mobule';
import { FlashcardComponent } from 'src/app/components/flashcard/flashcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VocabularyBankPageRoutingModule
  ],
  declarations: [VocabularyBankPage, FlashcardComponent]
})
export class VocabularyBankPageModule {}
