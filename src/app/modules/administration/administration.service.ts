import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }
  ajouterRole(newRole): Observable<any> {
    return this.http.post<any>(environment.backend_url + 'api/role/new', newRole)
  }
  getRole(): Observable<any> {
    return this.http.get(environment.backend_url + 'api/role/all',)
  }
  modifierRole(id: string, newRole: string): Observable<any> {
    return this.http.put<any>(environment.backend_url + 'api/role/modifier/' + id, newRole)
      .pipe(map((res: any) => {
        return res
      }))
  }
  suprrimeRole(id: string): Observable<any> {
    return this.http.delete<any>(environment.backend_url + 'api/role/delete/' + id)
  }
}
