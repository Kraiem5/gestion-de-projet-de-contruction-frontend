import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(private _router:Router) {
    if (localStorage.getItem('isAdmin') == 'false') {
        // Redirect to the sign-in page
        this._router.navigate(['/dash/home']);

        // Prevent the access
        // Allow the access

    }
   }

  ngOnInit(): void {
  }

}
