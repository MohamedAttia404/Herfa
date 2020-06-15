import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UserService
} from 'src/app/shared/services/user.service';
import {
  AgmCoreModule
} from '@agm/core';
import {
  MapsAPILoader,
  MouseEvent
} from '@agm/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number=10;
  
  private geoCoder;
  // title;lat;lng;
  @ViewChild('search')
  public searchElementRef: ElementRef;
 

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        const id = paramMap.get('id');
        this.user = this.userService.getUsersById(id).subscribe((res: any) => {
          const data = res.data;
          data.place.latitude= +data.place.latitude; 
          data.place.longitude= +data.place.longitude; 
          this.user = data;




        });
      }
    });

   

  }




}
