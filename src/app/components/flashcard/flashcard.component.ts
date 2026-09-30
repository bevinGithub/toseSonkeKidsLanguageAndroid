import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
  standalone: false,
})
export class FlashcardComponent  implements OnInit {
  flipped: boolean = false;
  showShona: boolean = false;
  constructor() { }

  ngOnInit() {}

  flip() {
    this.flipped = !this.flipped;
    if (this.flipped) {
      this.showShona = true;
    } else {
      this.showShona = false;
    }
  }

}
