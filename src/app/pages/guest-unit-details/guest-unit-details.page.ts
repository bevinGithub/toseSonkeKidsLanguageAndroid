import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-unit-details',
  templateUrl: './guest-unit-details.page.html',
  styleUrls: ['./guest-unit-details.page.scss'],
  standalone: false,
})
export class GuestUnitDetailsPage implements OnInit {
unit: any;
  unitId: any;
  url = environment.url;
  imagePath = environment.imagePath;

  tapLearn: any;
  flipLearn: any;
  watchLearn: any;
  singLearn: any;
  practiceLearn: any;
  rhymesLearn: any;

  color: any;
  iconColor: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.unitId = this.activatedRoute.snapshot.paramMap.get('unitID');
    console.log(this.unitId);
    this.getUnitDetails(this.unitId);
  }

  async getUnitDetails(unitId: any) {
    const lan_id = this.languageService.getCurrentLanguage();
    this.http.get(this.url + 'get-course-unit-details.php?unitId=' + unitId).subscribe((res: any) => {
      console.log(res);
      this.unit = res?.unitData;
      // this.color = this.unit?.icon_name.replace(".svg", "");
      // console.log(this.color);
      this.tapLearn = res?.tapLearn;
      this.flipLearn = res?.flipLearn;
      this.watchLearn = res?.watchLearn;
      this.singLearn = res?.singLearn;
      this.practiceLearn = res?.practiceLearn;
      this.rhymesLearn = res?.rhymesLearn;
    });
  }

}
