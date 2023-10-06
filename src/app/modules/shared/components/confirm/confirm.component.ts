import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  private dialogRef = inject(MatDialogRef);
  private categoryService = inject(CategoryService);
  private data = inject(MAT_DIALOG_DATA);


  onNoClick(){
    this.dialogRef.close(3);
  }

  onYesClick(){
    if(this.data != null){
      this.categoryService.deleteCategoria(this.data.id)
              .subscribe((data: any) => {
                return this.dialogRef.close(1);
              }, (error: any) => {
                return this.dialogRef.close(2);
              });
    }
    return this.dialogRef.close(2);
  }
}
