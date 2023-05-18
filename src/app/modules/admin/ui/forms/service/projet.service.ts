import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'app/modules/admin/apps/academy/project.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private isInterfaceObservable = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/api/user';

  setIsInterfaceObservable(value: boolean): void {
    this.isInterfaceObservable.next(value);
  }

  getIsInterfaceObservable(): Observable<boolean> {
    return this.isInterfaceObservable.asObservable();
  }
  constructor(private _http: HttpClient) { }

  enregistrement(
    projet: {
      nom_projet: string,
      client: string,
      description: string,
      begin: string,
      end: string,
      user: string,
      code_postal: string,
      contrat: string
    }): Observable<any> {
    return this._http.post(environment.backend_url + 'api/user/projet', projet);
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

  ajouterAxe(id_projet: string, name: string): Observable<any> {
    return this._http.post(environment.backend_url + 'api/user/axeprojet', { id_projet, name });
  }
  searchProjet(searchTerm: string): Observable<Project[]> {
    return this._http.post<Project[]>(`${this.apiUrl}/search`, { searchTerm });
  }
  search(nomProjet: string): Observable<Project[]> {
    return this._http.get<Project[]>(environment.backend_url + 'api/user/search')
      .pipe(
        map(projets => projets.filter(projet => projet.nom_projet.toLowerCase().includes(nomProjet.toLowerCase())))
      );
  }
  saveContrat(formdata) {
    return this._http.post(environment.backend_url + 'api/user/projet/contrat', formdata, {
      headers: {
        "x-auth-token": `${localStorage.getItem("accessToken")}`

      }
    })
  }
  getUser() {
    return this._http.get(environment.backend_url + 'api/user/')
  }
  updateTaskPercentage(): Observable<any> {
    // Make a PUT request to update the project
    return this._http.get<any>(environment.backend_url + 'api/user/projects/calculate-task-percentages');
  }


}