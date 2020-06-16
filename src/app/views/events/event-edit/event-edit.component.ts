import { Component, OnInit } from '@angular/core';
import { EventsService } from "./../../../shared/services/events.service";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl,FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean;
  eventId;
  eventDetails= {};
  event:Event=new Event() ;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
     private eventService: EventsService,
     private toastr: ToastrService) { 

      let editFormControls = {
        title : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Za-z .'-]+"),
          Validators.minLength(3)
        ]),
  
        description : new FormControl('',[
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(5),
        ]),
  
        address: new FormControl('',[
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(5),
        ]),
        event_time: new FormControl('',[
          Validators.required,
        ]),
        duration: new FormControl('',[
          Validators.required,
        ]), 
        num_attendees: new FormControl('',[
          Validators.required,
          Validators.pattern("[0-9]+"),
        ]),

      }
      this.editForm = this.fb.group(editFormControls);

     
}

ngOnInit(): void {
  // GEt course data id
  this.route.params.subscribe(params => {
    // this.courseId = params.id;
    this.event.id =  params.id;
    this.eventService.getProduct(params.id).subscribe((res:any) => {
      // console.log("res"+res.data.name);
      // this.courseDetails = res;
      this.event = res.data;
      // console.log("details"+this.courseDetails);
    });
    
  });
 }

get f() {return this.editForm.controls; }


// buildEditForm(){
//   this.editForm = this.fb.group({
//     title: [null, Validators.required],
//     description: [null, Validators.required],
//     address: [null, Validators.required],
//     event_time: [null, Validators.required],
//     duration: [null, Validators.required],
//     num_attendees: [null, Validators.required],
//     // user_id: [null, Validators.required],
//     // category_id: [null, Validators.required],
//   });
// }

onSubmit(){
  // console.log(form);
  // if(form.valid){
    this.submitted = true;
    //stop here if form not valid
    if(this.editForm.invalid){
      return;
    }
    const event = {...this.event};
  
    this.eventService.update(event,this.event.id).subscribe((res: any)=>{
      console.log(res);
      
      this.router.navigate(['../admin/events']);

    });
  // }
}
}