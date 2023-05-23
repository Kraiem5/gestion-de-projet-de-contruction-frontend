import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Item, Items } from 'app/modules/admin/apps/file-manager/file-manager.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileManagerService
{
    // Private
     _item: BehaviorSubject<any | null> = new BehaviorSubject(null);
      _items: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for items
     */
    get items$(): Observable<any>
    {
        return this._items.asObservable();
    }
    set items$(value)
    {
         this._items.next(value);
    }

    /**
     * Getter for item
     */
    get item$(): Observable<any>
    {
        return this._item.asObservable();
    }
    set item$(value)
    {
         this._item.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get items
     */
    getItems(folderId: string | null = null): Observable<Item[]>
    {
        return this._httpClient.get<Items>('api/apps/file-manager', {params: {folderId}}).pipe(
            tap((response: any) => {
                this._items.next(response);
            })
        );
    }

    /**
     * Get item by id
     */
    getItemById(_id: string): Observable<any>
    {
        return this._items.pipe(
            take(1),
            map((items) => {

                // Find within the folders and files
                const item = [...items].find(value => value._id === _id) || null;

                // Update the item
                this._item.next(item);

                // Return the item
                return item;
            }),
            switchMap((item) => {

                if ( !item )
                {
                    return throwError('Could not found the item with id of ' + _id + '!');
                }

                return of(item);
            })
        );
    }
    getDocument(parent): Observable<any> {
        return this._httpClient.get(environment.backend_url + 'api/user/document/'+parent,{
          headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
        })
      }
    saveDocument(parent,data): Observable<any> {
        return this._httpClient.post(environment.backend_url + 'api/user/document/new/'+parent, data,{
          headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
        })
      }
      saveFile(formdata) {
        return this._httpClient.post(environment.backend_url + 'api/user/document/newFile', formdata, {
          headers: {
            "x-auth-token": `${localStorage.getItem("accessToken")}`

          }
        })
      }
}
