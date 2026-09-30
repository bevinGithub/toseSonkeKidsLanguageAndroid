import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
  standalone: false,
})
export class FlipcardComponent  implements OnInit {
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
    // this.flipped = !this.flipped;
    this.flipped = true;
    if (this.flipped) {
      this.showBackCard = true;
      console.log('Flipped: ' + this.flipped + '------- Back: ' + this.showBackCard);
      return;
    } 
    // else {
    //   this.showBackCard = false;
    //   console.log('Flipped: ' + this.flipped + '------- Back: ' + this.showBackCard);
    // }
  }

}
