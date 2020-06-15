import { Component, OnInit } from '@angular/core';
import { EventviewService } from "./../../../shared/services/eventview.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  searchForm: FormGroup;
  items: any = [];
  flag: boolean = false;

  constructor( private eventviewService: EventviewService,
    private modelService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
  }

  search(event){
    console.log(event.target.form[1].value);
    let search=event.target.form[1].value;
    console.log(search);
    
    this.eventviewService.search(search).subscribe((res:any) =>{
      console.log(res);
      this.flag=true;
    //  this.items = res.body.data;
    
  });
  }

 getAll(){
      console.log("getAllComponent");
      
      this.eventviewService.getAll().subscribe(res =>{
       console.log(res);
      this.items = res.body.data;
    });
  }

  public previousPage() {
  
    if (this.eventviewService.prev !== undefined && this.eventviewService.prev !== null) {
      this.items = [];
      this.eventviewService.sendGetRequestToUrl(this.eventviewService.prev).subscribe((res:any) => {
        console.log(res);
        this.items = res.body.data;
      })
    }
  
  }

  public nextPage() {
    if (this.eventviewService.next !== undefined && this.eventviewService.next !== null) {
      this.items = [];
      this.eventviewService.sendGetRequestToUrl(this.eventviewService.next).subscribe((res:any) => {
        console.log(res);
        this.items = res.body.data;
      })
    }
  }
  get f() {return this.searchForm.controls; }
}
