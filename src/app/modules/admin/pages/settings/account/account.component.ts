import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../service/profile.service';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
    accountForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private  serv:ProfileService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.accountForm = this._formBuilder.group({
            nom    : [''],
            prenom: [''],
            cin   : [''],
            specialité   : [''],
            email   : ['', Validators.email],

        });

        this.getPersonalInformation()
    }
    updatePersonalInformation(){
      this.serv.updatePersonelInfo(this.accountForm.value)
        .subscribe(arg => alert("updated"));
    }


    getPersonalInformation(){
        this.serv.getPersonelInfo().subscribe(
           ( res : any) =>{
              if(res.status){
                this.accountForm.patchValue({nom : res.result.nom})
                this.accountForm.patchValue({prenom : res.result.prenom})
                this.accountForm.patchValue({email : res.result.email})
                this.accountForm.patchValue({cin : res.result.cin})
                this.accountForm.patchValue({specialite : res.result.specialite})
              }
            }
        )
    }
}
