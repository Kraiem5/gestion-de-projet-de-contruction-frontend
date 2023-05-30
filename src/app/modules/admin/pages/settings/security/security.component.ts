import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../service/profile.service';

@Component({
    selector: 'settings-security',
    templateUrl: './security.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit {
    securityForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private service: ProfileService,
        private cd: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword: [''],
            newPassword: [''],

        });
    }
    modifierPassword(): void {
        const currentPassword = this.securityForm.get('currentPassword').value;
        const newPassword = this.securityForm.get('newPassword').value;

        this.service.updatePassword(currentPassword, newPassword).subscribe(
            (response) => {
                // Traitez la réponse de l'API en conséquence
                console.log(response);
            },
            (error) => {
                // Traitez les erreurs de l'API en conséquence
                console.error(error);
            }
        );
        this.cd.detectChanges()
    }
}
