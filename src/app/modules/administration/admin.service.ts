import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  ajouterRole(newRole): Observable<any> {
    return this.http.post<any>(environment.backend_url + 'api/admin/new', newRole)
  }
  getRole(): Observable<any> {
    return this.http.get(environment.backend_url + 'api/admin/role/all',)
  }
  modifierRole(id: string, newRole: any): Observable<any> {
    return this.http.put<any>(environment.backend_url + 'api/admin/role/modifier/' + id, newRole)
      .pipe(map((res: any) => {
        return res
      }))
  }
  suprrimeRole(id: string): Observable<any> {
    return this.http.delete<any>(environment.backend_url + 'api/admin/role/delete/' + id)
  }
  getUser(): Observable<any> {
    return this.http.get(environment.backend_url + 'api/user')
  }
  deleteUSer(id: string): Observable<any> {
    return this.http.delete(environment.backend_url + 'api/admin/deleteUser/' + id)
  }
  modifiereUser(id: string, userModif: any): Observable<any> {
    return this.http.put<any>(environment.backend_url + 'api/admin/modifierUser/' + id, userModif)
      .pipe(map((res: any) => {
        return res
      }))
  }
  statistique(): Observable<any> {
    return this.http.get(environment.backend_url + 'api/user/statistics')
  }
}
