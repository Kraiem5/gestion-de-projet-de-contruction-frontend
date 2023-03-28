import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProjetService {
    private isInterfaceObservable = new BehaviorSubject<boolean>(false);
    private apiUrl = 'http://localhost:3000/api/user/projets';

  setIsInterfaceObservable(value: boolean): void {
    this.isInterfaceObservable.next(value);
  }

  getIsInterfaceObservable(): Observable<boolean> {
    return this.isInterfaceObservable.asObservable();
  }
    constructor(private _http:HttpClient) { }

    enregistrement(
        projet: { 
        nom_projet : string,
        client : string,
        description : string,
        begin : string,
        end : string,
        user : string,
        code_postal : string,
        contrat : string
            }): Observable<any>
                        
    {
        return this._http.post(environment.backend_url+'api/user/projet', projet);
    }
    getPersonelInfo(){
        return this._http.get(environment.backend_url+'api/user/projet',{
        headers: {"x-auth-token": `${localStorage.getItem("accessToken")}`}
        })
      }
      getInfoProjet(){
        return this._http.get(environment.backend_url+'api/user/projet',{
        headers: {"x-auth-token": `${localStorage.getItem("accessToken")}`}
        })
      }
      getProjet(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this._http.get<any>(url);
      }
    saveContrat(formdata){
        return this._http.post(environment.backend_url+'api/user/projet/contrat',formdata,{
        headers: {"x-auth-token": `${localStorage.getItem("accessToken")}`
            
    }
        })
      }

  }