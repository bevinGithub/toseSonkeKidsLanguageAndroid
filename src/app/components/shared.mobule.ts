import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { GuestFooterComponent } from "./guest-footer/guest-footer.component";
import { FlashcardComponent } from "./flashcard/flashcard.component";

@NgModule({
  imports: [FooterComponent, GuestFooterComponent],
  exports: [FooterComponent, GuestFooterComponent],
})

export class SharedModule{}
