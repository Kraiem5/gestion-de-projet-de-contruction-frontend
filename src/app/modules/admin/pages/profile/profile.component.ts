import { ChangeDetectionStrategy, Component, ViewEncapsulation , OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../settings/service/profile.service';

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit
{
    accountForm: FormGroup;
    prenom=''
    email: any;
    avatar: any;
    /**
     * Constructor
     */
    constructor(
        private serv :ProfileService ,
        private _formBuilder:FormBuilder,
        private cd : ChangeDetectorRef
        )

    {
    }
    ngOnInit():void{

    this.getPersonalInformation()
    }
    getPersonalInformation(){
      this.serv.getPersonelInfo().subscribe(
        ( res : any) =>{
           if(res.status){
               this.prenom = res.result.nom
               this.email = res.result.email
               this.avatar = res.result.avatar
               this.cd.detectChanges()
              }
            }
     )
    }
    // getPersonalInformation() {
    //     this.serv.getPersonelInfo().subscribe(
    //       (res: any) => {
    //         if (res.status) {
    //           this.accountForm.get('nom').setValue(res.result.nom);
    //           this.accountForm.get('prenom').setValue(res.result.prenom);
    //           this.accountForm.get('email').setValue(res.result.email);
    //           this.accountForm.get('cin').setValue(res.result.cin);
    //           this.accountForm.get('specialite').setValue(res.result.specialite);
    //         }
    //       }
    //     );
    //   }


}
