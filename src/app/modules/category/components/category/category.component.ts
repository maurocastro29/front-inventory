import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void{

    this.categoryService.getCategories()
        .subscribe( (data:any) => {
          this.proccessCategoryResponse(data);
        }, (error:any) => {
          console.log("Error: " + error);
        } );
  }

  proccessCategoryResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
    if(resp.metaData[0].code == "00"){
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog(): void{
    const dialogRef = this.dialog.open(NewCategoryComponent, { //
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Categoria agregada", "Exitosa");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar la categoria", "Error");
        this.getCategories();
      }
    });
  }

  openSnackBar(message: string, action:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  edit(id:number, name:string, description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, { //
      width: '450px',
      data: {id: id, name: name, description:description}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Categoria actualizada con exito", "Exitosa");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Se produjo un error al actualizar la categoria", "Error");
        this.getCategories();
      }
    });
  }

  deleteCategory(id: number){
    const dialogRef = this.dialog.open(ConfirmComponent, { //
      width: '350px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Categoria eliminada con exito", "Exitosa");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar la categoria", "Error");
        this.getCategories();
      }
    });
  }

  buscar(value: string){
    if(value.length === 0){
      return this.getCategories();
    }
    if(value.length > 0){
      this.categoryService.getCategoryById(value)
            .subscribe((resp: any)=>{
              this.proccessCategoryResponse(resp);
            })
    }
  }

}

export interface CategoryElement{
  description: string;
  id:number;
  name:string;
}
