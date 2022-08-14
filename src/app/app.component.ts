import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Student } from './student';
import { InventoryItem } from './inventoryitem';
import { StudentService } from './student.service';
import { InventoryService } from './inventoryitem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // public students: Student[];
  // public editStudent: Student;
  // public deleteStudent: Student;

  public items: InventoryItem[];
  public editItem: InventoryItem;
  public deleteItem: InventoryItem;
  title: any;


  constructor(private studentService: StudentService, 
    private inventoryService: InventoryService){}

  ngOnInit() {
    //this.getStudents();
    this.getItems();
  }
  
  
  // public getStudents(): void {
  //   this.studentService.getAllStudents().subscribe(
  //     (response: Student[]) => {
  //       this.students = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message)
  //     }
  //   );
  // }

  public getItems(): void {
    this.inventoryService.getAllItems().subscribe(
      (response: InventoryItem[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  // public onAddStudent(addForm: NgForm): void{
  //   document?.getElementById('add-student-form')?.click();
  //   this.studentService.addStudent(addForm.value).subscribe(
  //     (response: Student) => {
  //       console.log(response);
  //       this.getStudents();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) =>{
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  public onAddItem(addForm: NgForm): void{
    document.getElementById('add-item-form')!.click();
    this.inventoryService.addItem(addForm.value).subscribe(
      (response: InventoryItem) => {
        console.log(response);
        this.getItems();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // public onUpdateStudent(student: Student): void{
  //   this.studentService.updateStudent(student).subscribe(
  //     (response: Student) => {
  //       console.log(response);
  //       this.getStudents();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public onUpdateItem(item: InventoryItem): void{
    this.inventoryService.updateItem(item).subscribe(
      (response: InventoryItem) => {
        console.log(response);
        this.getItems();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public onDeleteStudent(studentId: number): void{
  //   this.studentService.deleteStudent(studentId).subscribe(
  //     (response: void)=>{
  //       this.getStudents();
  //     },
  //     (error: HttpErrorResponse) =>{
  //       alert(error.message);
  //     }
  //   );
  // }

  public onDeleteItem(itemId: number): void{
    this.inventoryService.deleteItem(itemId).subscribe(
      (response: void)=>{
        this.getItems();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  // public searchStudents(key: string): void {
  //   const results: Student[] = [];
  //   for(const student of this.students){
  //     if(student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
  //     student.email.toLowerCase().indexOf(key.toLowerCase()) !== -1){
  //       results.push(student);
  //     }
  //   }
  //   this.students = results;
  //   if(results.length === 0 || !key){
  //     this.getStudents();
  //   }
  // }

  public searchItems(key: string): void {
    const results: InventoryItem[] = [];
    for(const item of this.items){
      if(item.itemName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      item.kind.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(item);
      }
    }
    this.items = results;
    if(results.length === 0 || !key){
      this.getItems();
    }
  }

  public onOpenModal(item: InventoryItem, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addItemModal');
    }
    if(mode === 'edit'){
      this.editItem = item;
      button.setAttribute('data-target', '#updateItemModal');
    }
    if(mode === 'delete'){
      this.deleteItem = item;
      button.setAttribute('data-target', '#deleteItemModal');
    }
    container?.appendChild(button);
    button.click();
  }

  

}
