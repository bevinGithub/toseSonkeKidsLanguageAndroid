import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flip-learn-card',
  templateUrl: './flip-learn-card.component.html',
  styleUrls: ['./flip-learn-card.component.scss'],
  standalone: false,
})
export class FlipLearnCardComponent  implements OnInit {
  flipped: boolean = false;
  showBackCard: boolean = false;

  backCardClose: boolean = false;
  constructor(

  ) { }

  ngOnInit() {}


  flip2() {
    this.flipped = !this.flipped;
    if (this.flipped) {
      this.showBackCard = true;
    } else {
      this.showBackCard = false;
    }    
  }

  flip() {
    this.flipped = true;
    if (this.flipped) {
      this.showBackCard = true;
      console.log('Flipped: ' + this.flipped + '------- Back: ' + this.showBackCard);
      return;
    } 
  }
}
