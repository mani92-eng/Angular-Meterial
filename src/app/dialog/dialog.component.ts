import { DialogRef, } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';






@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  
  fressnessList = ["Brand New","Second Hand","Refurbished"];
  productform !:FormGroup; 
  
  actionBtn  :any="save"


  constructor(private formbuilder:FormBuilder,
    private api:ApiService,
  @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }


  ngOnInit(): void {
    this.productform=this.formbuilder.group({
      productname:['',Validators.required],
      catagory :['',Validators.required],
      fressness:['',Validators.required],
     
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
      
      

    })
    if(this.editData){
      this.actionBtn='update';
      this.productform.controls['productname'].setValue(this.editData.productname);
      this.productform.controls['catagory'].setValue(this.editData.catagory);
      this.productform.controls['fressness'].setValue(this.editData.fressness);
      this.productform.controls['price'].setValue(this.editData.price);
      this.productform.controls['comment'].setValue(this.editData.comment);
      this.productform.controls['date'].setValue(this.editData.date);

    }
  }

  addproduct(){
  if(! this.editData ){
    if(this.productform.valid){
      this.api.postProduct(this.productform.value).subscribe({
        next:(res)=>{
          alert("Product Added Success")
          
          this.productform.reset();
          this.dialogRef.close('save');
  
        },error:()=>{
          alert("Product Not Add Failed Ading")
        }
      })
     }

  }else{
    this.UpdateProduct();
  }

    
  }


  UpdateProduct(){
    this.api.putProduct(this.productform.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product update Success")
        
        this.productform.reset();
        this.dialogRef.close('update');

      },error:()=>{
        alert("Product Not update Failed update")
      }
    })
  }

}
