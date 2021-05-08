import { Component, OnInit, OnDestroy, NgZone, ViewChild, DoCheck } from '@angular/core';
import { GetdataService } from './../../core/services/getdata.service';
import { TranslateService} from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import {isUndefined} from 'util';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import * as Fuse from 'fuse.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild(PerfectScrollbarComponent)
  public directiveScroll: PerfectScrollbarComponent;
  public totalCases;
  public totalDeaths;
  public totalRecoveries;
  public totalCritical;
  public todayCases;
  public todayDeaths;
  public activeCases;
  public casesPer1M;
  public finishedCases;
  public activePerOneMillion;
  public recoveredPerOneMillion;
public todayRecovered;
  public isLoading = true;
  public isLoadingMap = true;
  public isLoadingCountries = true;
  public countries;
  public translations: any = {};
  public fuse: any;
  public fuseResults: any[];
  public news;

  constructor(public getDataservice: GetdataService, public zone: NgZone, public translate: TranslateService) { }

  ngOnInit(): void{
    this.ngDoCheck();
    this.getDataservice.getAll().subscribe(getalldata => {
      // console.log('User', getalldata);
      this.isLoading = false;
      this.totalDeaths = getalldata['deaths'];
      this.todayDeaths = getalldata['todayDeaths'];
      this.finishedCases = getalldata['deathsPerOneMillion'];
      this.totalCritical  = getalldata['critical'];
      this.casesPer1M = getalldata['criticalPerOneMillion'];
      this.activeCases = getalldata['active'];
      this.totalRecoveries = getalldata['recovered'];
      this.totalCases = getalldata['active'];
      this.todayCases = getalldata['todayCases'];
      this.activePerOneMillion = getalldata['activePerOneMillion'];
      this.recoveredPerOneMillion = getalldata['recoveredPerOneMillion'];
      this.todayRecovered = getalldata['todayRecovered'];


   });

    this.getDataservice.getCountry().subscribe(getcountrydata => {
      this.isLoadingCountries = false;
      // console.log(getcountrydata);
      this.countries = getcountrydata;
      this.fuse = new Fuse(this.countries, {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
          'country'
        ]
      });

   });

    this.getDataservice.getnews('virus', 'in').subscribe(getNewsdata => {
    this.isLoadingCountries = false;
    this.news = getNewsdata['data'];
      console.log(getNewsdata['data']);
    this.fuse = new Fuse(this.news, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: [
        'news'
      ]
    });
   });
   }

   // tslint:disable-next-line: typedef
   searchCountries(key) {
    if (key) {
      this.countries = this.fuse.search(key);
      if (isUndefined(this.directiveScroll)) { return; }
      this.directiveScroll.directiveRef.scrollToTop();
      return;
    }
    this.countries = this.fuse.list;
  }
  // tslint:disable-next-line: typedef
  keywords(key1,key){
    if (key) {
      this.news = this.fuse.search(key);

    }
    this.news = this.fuse.list;

  }
  // tslint:disable-next-line: typedef
  language(key1,key){
    if (key) {
      this.news = this.fuse.search(key);

    }
    this.news = this.fuse.list;

  }


  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  async ngDoCheck() {
    // tslint:disable-next-line: max-line-length
    this.translate.get(['Shared.Other.14', 'Shared.Other.15', 'Shared.Other.16', 'Shared.Other.17', 'Shared.TopCards.1', 'Shared.TopCards.3', 'Shared.TopCards.4'])
    .subscribe(translations => {
        this.setTranslations(translations);
        return 0;
    });
  }

  async ngOnDestroy(){

  }

  async setTranslations(translations){
    this.translations.active = translations['Shared.Other.14'];
    this.translations.recovered = translations['Shared.Other.15'];
    this.translations.deaths = translations['Shared.Other.16'];
    this.translations.critical = translations['Shared.Other.17'];
  }
}
