import { Component, Inject, OnInit } from '@angular/core';
import { ProjetService } from '../service/projet.service';
import { Project } from '../project.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditFormsComponent } from '../edit/fields.component';

interface Axe {
    _id: string;
    name: string;
}

@Component({
    selector: 'app-tache',
    templateUrl: './tache.component.html',
})
export class AjouterTacheComponent implements OnInit {
    axe: any
    axes: Project[];
    id_axe: string;

    ajouterTacheForm: FormGroup

    constructor(
        private service: ProjetService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AjouterTacheComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.ajouterTacheForm = this.formBuilder.group({
            id_axe: ['', Validators.required], // Champ de sélection de l'axe
            name: ['', Validators.required],
            timeslot: ['', Validators.required],
            pourcentage: ['', Validators.required]
        });
        // Récupérer les axes depuis l'API lors de l'initialisation du composant
        this.axe = this.data._id
        console.log("axes", this.axe);
    }

    ajouterTache(): void {
        const name = this.ajouterTacheForm.value.name;
        const timeslot = this.ajouterTacheForm.value.timeslot;
        const pourcentage = this.ajouterTacheForm.value.pourcentage;
        this.service.ajouterTache(this.axe, name, timeslot, pourcentage).subscribe(
            response => {
                console.log('Tâche ajoutée avec succès à l\'axe', response);
                // Réinitialiser le formulaire après la soumission réussie
                this.ajouterTacheForm.reset();
            },
            error => console.error('Erreur lors de l\'ajout de la tâche à l\'axe', error)
        );
    }

}
