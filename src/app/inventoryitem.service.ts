import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InventoryItem } from './inventoryitem';

@Injectable({
    providedIn: 'root'
})

export class InventoryService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllItems(): Observable<InventoryItem[]>{
        return this.http.get<InventoryItem[]>(`${this.apiServerUrl}/inventoryapp/v1/items`);
    }

    public addItem(item: InventoryItem): Observable<InventoryItem>{
        return this.http.post<InventoryItem>(`${this.apiServerUrl}/inventoryapp/v1/additem`, item);
    }

    public updateItem(item: InventoryItem): Observable<InventoryItem>{
        return this.http.put<InventoryItem>(`${this.apiServerUrl}/inventoryapp/v1//update`, item);
    }

    public deleteItem(itemId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/inventoryapp/v1/delete/${itemId}`);
    }
}