import { Component, OnInit } from '@angular/core';
import { EventsService } from "./../../../shared/services/events.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  items: any = [];
  constructor( private eventsService: EventsService,
    private modelService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    console.log("getAllComponent");
    
    this.eventsService.getAll().subscribe(res =>{
     console.log(res);
    this.items = res.body.data;

    });
  }

  public previousPage() {
  
    if (this.eventsService.prev !== undefined && this.eventsService.prev !== null) {
      this.items = [];
      this.eventsService.sendGetRequestToUrl(this.eventsService.prev).subscribe((res:any) => {
        console.log(res);
        this.items = res.body.data;
      })
    }
  
  }


  public nextPage() {
    if (this.eventsService.next !== undefined && this.eventsService.next !== null) {
      this.items = [];
      this.eventsService.sendGetRequestToUrl(this.eventsService.next).subscribe((res:any) => {
        console.log(res);
        this.items = res.body.data;
      })
    }
  }

  deleteItem(model,id){
    this.modelService.open(model).result.then(result => {
      this.eventsService.delete(id).subscribe(res => {
        this.toastr.success('this product was deleted successfully', 'success', {timeOut:3000, closeButton: true, progressBar: true});
        console.log(res);
        
        this.getAll();
    },
    err => {
      this.toastr.error(err.statusText, 'Error!', {timeOut:3000, closeButton: true, progressBar: true});
      console.log(err);
      
      
      }
     );
      },
    reason => {
      console.log(reason);
    });
    }
}
