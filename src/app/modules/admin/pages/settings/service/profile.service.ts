import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: any
  private apiUrl = 'http://localhost:3000/api/user/users/stats'
  constructor(private http: HttpClient) { }

  updatePersonelInfo(body) {
    return this.http.put(environment.backend_url + 'api/user/profile', body,
      {
        headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
      })
  }

  getPersonelInfo() {
    return this.http.get(environment.backend_url + 'api/user/profile', {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }

  saveImageProfile(formdata) {
    return this.http.post(environment.backend_url + 'api/user/profile/avatar', formdata, {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }
  saveCv(formdata) {
    return this.http.post(environment.backend_url + 'api/user/profile/cv', formdata, {
      headers: { "x-auth-token": `${localStorage.getItem("accessToken")}` }
    })
  }
  getUsersCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  updatePassword(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
    const payload = {
      ancienMotDePasse,
      nouveauMotDePasse
    };
    return this.http.put<any>(environment.backend_url + 'api/user/modifierMotDePasse', payload);
  }


}
