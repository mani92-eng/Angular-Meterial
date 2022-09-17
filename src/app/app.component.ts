import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MU';

  displayedColumns: string[] = ['productname', 'catagory', 'date','fressness','price','comment','Action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private api:ApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
     
    }).afterClosed().subscribe(val => {
     if(val==='save'){
        this.getAllProducts();
     }
     
     
    })
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    }) 

  }

  deleteProduct(id:any){ 
    this.api.deleteProduct(id).subscribe(val=>{
      alert("Product Deleted Successfully!!");
      this.getAllProducts();
    }
    )
  }


  getAllProducts(){
  this.api.getProduct().subscribe({
    next:(res)=>{
     this.dataSource=new MatTableDataSource(res);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.sort;

    },error:(err)=>{
      alert("error While fecthing the records!!")
    }
  })
    

  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

