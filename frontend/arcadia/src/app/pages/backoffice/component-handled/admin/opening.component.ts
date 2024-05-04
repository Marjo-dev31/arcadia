import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OpeningService } from '../../../services/service/opening.service';
import { Opening } from '../../../../shared/models/opening.interface';
import { tap } from 'rxjs';

@Component({
    selector: 'app-opening',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
    <h3>Horaires d'ouvertures</h3>
    <div class="current">
        <p>Heures d'ouvertures actuelles :</p>
        <p>De {{ openToPublic.openingTime }} à {{ openToPublic.closingTime }}</p>
        <p>Du {{ openToPublic.openingDay }} au {{ openToPublic.closingDay }}</p>
    </div>
    <form [formGroup]="updateForm" (submit)="updateOpeningToPublic(openToPublic._id)">
        <label for="">Heure d'ouverture:</label>
        <input type="text" formControlName="openingTime">
        <label for="">Heure de fermeture:</label>
        <input type="text" formControlName="closingTime">
        <label for="">Jour d'ouverture:</label>
        <input type="text" formControlName="openingDay">
        <label for="">Jour de fermeture:</label>
        <input type="text" formControlName="closingDay">
        <button>Annuler</button>
        <button>Valider</button>
    </form>
    `,
    styleUrl:`../component-handled.component.css`
})

export class OpeningComponent implements OnInit {
   public updateForm: FormGroup

    constructor(private fb: FormBuilder) {
        this.updateForm = this.fb.group({
            openingTime: new FormControl(''),
            closingTime: new FormControl(''),
            openingDay: new FormControl(''),
            closingDay: new FormControl('')
        })    
    }

    private readonly openingService = inject(OpeningService)

   openToPublic!: Opening

    ngOnInit() { 
        this.getOpeningToPublic()
    }

    getOpeningToPublic(){
        this.openingService.getOpeningToPublic().subscribe((response)=>{
            this.openToPublic = response[0]
        })
    };

    updateOpeningToPublic(id: string){
        this.openingService.UpdateOpeningToPublic(this.updateForm.value, id).pipe(tap(()=>{this.getOpeningToPublic()})).subscribe()
    }
}