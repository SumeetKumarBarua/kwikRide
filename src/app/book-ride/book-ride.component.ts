import { ElementRef,Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit {
  public start:string;
  public destination: string;
  public allDrivers:[];
  public searchForm: FormGroup;
  public results=[];
  public selectedItem:any;



  private urls = [
    'http://localhost:3000/drivers'
  ];
  isSelected: boolean;
  successMsge: string;
  successMsg: boolean;

  getAllDrivers(){
    let requests = this.urls.map(url => fetch(url).then((res) => res.json()));
    console.log(requests);
    Promise.all(requests)
      .then(responses => {
          this.allDrivers=responses[0];
          this.results=responses[0];
          //console.log(JSON.stringify(responses));
      });
  
  }
  constructor(private formBuilder: FormBuilder,private elRef:ElementRef) {
    this.getAllDrivers();
   }

   findRider(){
    this.successMsg=false;
    this.isSelected=false;
    this.selectedItem=null;
     let data=this.searchForm.value;
     //console.log(data);
     this.results=[];
     if(data.start=="" && data.destination==""){
        this.results=this.allDrivers;
     }else{
     this.allDrivers.forEach(driver => {
       if(driver['startLoc'] === data.start && driver['endLoc'] === data.destination){
          
          this.results.push(driver);
          
       }
     });
    }
    
   }
  
   selectDriver(i){
     //console.log(i);
  
     this.selectedItem=i;
     this.isSelected=true;
     this.successMsg=false;
     this.successMsge=`Booking confirmed ! ${i.driverName} is arriving in ${i.eta} mins`;
   }
   confirmRide(){
    this.successMsg=true;
    console.log( this.successMsg)
   }
  ngOnInit() {
    this.searchForm =  this.formBuilder.group({
      start: ["",Validators.required],
      destination: ["",Validators.required]
    });
  }

}
