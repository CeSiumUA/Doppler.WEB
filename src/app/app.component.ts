import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HubService } from './services/communication/hub.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ComponentsService } from './services/utils/components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Doppler';
  mobileQuery: MediaQueryList;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private hubService: HubService, private componentsService: ComponentsService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  goHome(): Promise<boolean> {
    return this.router.navigateByUrl('/');
  }
  public toggleSidenav(sidenav: MatSidenav): void{
    sidenav.toggle();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  async ngOnInit(): Promise<void>{
    await this.hubService.startConnection();
  }
  private _mobileQueryListener: () => void;
}
