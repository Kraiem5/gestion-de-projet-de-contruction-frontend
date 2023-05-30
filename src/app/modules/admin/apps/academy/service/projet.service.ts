import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../project.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private isInterfaceObservable = new BehaviorSubject<boolean>(false);


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

  getIdProjet(id: string): Observable<any> {
    return this._http.get(environment.backend_url + 'api/user/projet/' + id, {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }
  getIdAxe(id: string): Observable<any> {
    return this._http.get(environment.backend_url + 'api/user/projet/' + id, {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }
  saveContrat(formdata) {
    return this._http.post(environment.backend_url + 'api/user/projet/contrat', formdata, {
      headers: {
        "x-auth-token": `${localStorage.getItem("accessToken")}`

      }
    })
  }
  ajouterTache(id_axe: string, name: string, timeslot: string, pourcentage: string): Observable<any> {
    return this._http.post(environment.backend_url + 'api/user/:id/tacheprojet', { id_axe, name, timeslot, pourcentage });
  }
  getAxes(): Observable<any> {
    return this._http.get(environment.backend_url + 'api/user/axes');
  }
  updateTache(idProjet: string, data: any): Observable<Project> {
    return this._http.put<Project>(environment.backend_url + `api/user/tache/${idProjet}`, data)
  }
  deleteAxe(id_projet: string, id_axe: string): Observable<any> {
    return this._http.delete(environment.backend_url + 'api/user/projet/' + id_projet + '/axe/' + id_axe)
  }
  deleteTache(id_projet: string, id_axe: string, id_tache: string): Observable<any> {
    return this._http.delete(environment.backend_url + 'api/user/projet/' + id_projet + '/axe/' + id_axe + '/tache/' + id_tache)
  }
  updateAxe(id_projet: string, id_axe: string, data: any): Observable<Project> {
    return this._http.put<Project>(environment.backend_url + 'api/user/projet/' + id_projet + '/axe/' + id_axe, data)
  }
}
