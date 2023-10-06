import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:9091/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }

  /**
   * Get All categories
   * @returns
   */
  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * Save the Categories
   * @param body
   */
  saveCategories(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * Update a category
   * @param body
   * @param id
   */
  updateCategories(body: any, id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * Se elimina una caegoria por su id
   * @param id
   * @returns
   */
  deleteCategoria(id:any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  getCategoryById(id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }

}
