import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void{

    this.categoryService.getCategories()
        .subscribe( (data:any) => {
          console.log("Respuesta categories: " + data);
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

}

export interface CategoryElement{
  description: string;
  id:number;
  name:string;
}
