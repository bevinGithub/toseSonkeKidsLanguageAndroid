import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unit-progress',
  templateUrl: './unit-progress.page.html',
  styleUrls: ['./unit-progress.page.scss'],
  standalone: false,
})
export class UnitProgressPage implements OnInit {
  data: any[] = [];
  @Input() view: any;
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#59A5A5','#D2F4F9']
  };

  height: any;
  width: any;

  completed: any;
  incomplete: any;
  percentage: any;

  userID: any;
  unitID: any;
  unit: any;
  piePercentage: any;

  url = environment.url;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
  ) {
    this.storgeInit();
   }

  ngOnInit() {
    this.data = [
      {
        "name": "Completed",
        "value": 1
      },
      {
        "name": "Incomplete",
        "value": 20
      }
    ];
  }

  ionViewWillEnter(){
   this.handleScreenSizeChange();
   this.getCurrentuser();
  }

  async storgeInit() {
    await this.storage.create();
  }

  getCurrentuser() {
    this.storage.get('currentUser').then((user) => {
      this.userID = user.id;
      console.log(this.userID);
      this.unitID = this.activatedRoute.snapshot.paramMap.get('unitID');
      this.getUnitProgress(this.userID, this.unitID);
    });
  }

  getUnitProgress(userId: any, unitId: any) {
    this.http.get(this.url + `get-user-unit-progress.php?userID=${userId}&unitID=${unitId}`).subscribe((res: any) => {
      console.log(res);
      this.completed = res.completed;
      this.incomplete = res.incomplete;
      this.percentage = eval(this.completed) / eval(this.incomplete );
      const incompleteSum = 1 - this.percentage;
      this.piePercentage = this.percentage  * 100;
      this.data = [
        {
          "name": "Completed",
          "value": this.percentage
        },
        {
          "name": "Incomplete",
          "value": incompleteSum
        }
      ];
    });
  }


  handleScreenSizeChange() {
    this.height = this.platform.height();
    this.width = this.platform.width();
    if (this.width > this.height) {
      this.view = [0.9 * this.width, 0.9 * this.height]
    } else {
      this.view = [0.99 * this.width, 0.5 * this.height]
    }
    console.log(this.view)
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
