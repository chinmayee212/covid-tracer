import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }
  deferredPrompt : any;
  showButton = false;

  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
    this.showButton = true;
  }

  ngOnInit(): void {
  }
  addToHomeScreen(){
    this.showButton = false;
    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted'){
        console.log('User Accepted the A2HS prompt');
      }else{
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }
}
