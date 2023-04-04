import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../project.interface';

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
  constructor(private _http: HttpClient) { }

  enregistrement(projet: Project): Observable<any> {
    return this._http.post(environment.backend_url + 'api/user/projet', projet);
  }
  updateProject(projet: Project): Observable<any> {
    return this._http.put(environment.backend_url + 'api/user/projet/modifier/' + projet._id, projet);
  }
  getPersonelInfo() {
    return this._http.get(environment.backend_url + 'api/user/projet', {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }

  getInfoProjet() {
    return this._http.get(environment.backend_url + 'api/user/projet', {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }
  // getIdProjet(id: string): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this._http.get<any>(url);
  // }
  // getProjets(): Observable<any> {
  //   return this._http.get<any>(this.apiUrl);
  // }
  // getProjet(id: string): Observable<any> {
  //   return this._http.get<any>(`${this.apiUrl}/${id}`);
  // }
  saveContrat(formdata) {
    return this._http.post(environment.backend_url + 'api/user/projet/contrat', formdata, {
      headers: {
        "x-auth-token": `${localStorage.getItem("accessToken")}`

      }
    })
  }

}