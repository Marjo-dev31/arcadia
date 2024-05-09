import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpeningService } from '../../../services/service/opening.service';
import { Opening } from '../../../../shared/models/opening.interface';
import { tap } from 'rxjs';

@Component({
    selector: 'app-opening',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
    <h3>Horaires d'ouvertures</h3>
    @if(openToPublic){
    <div class="current">
        <p>Heures d'ouvertures actuelles :</p>
        <p>De {{ openToPublic.openingTime }} à {{ openToPublic.closingTime }}</p>
        <p>Du {{ openToPublic.openingDay }} au {{ openToPublic.closingDay }}</p>
    </div>
}
    <form [formGroup]="updateForm" (submit)="updateOpeningToPublic(openToPublic._id)">
        <label for="">Heure d'ouverture:</label>
        <input type="text" formControlName="openingTime">
        @if(updateForm.controls['openingTime'].touched){
              <div class="alert">Une description est requise</div>
            }
        <label for="">Heure de fermeture:</label>
        <input type="text" formControlName="closingTime">
        @if(updateForm.controls['closingTime'].touched){
              <div class="alert">Une description est requise</div>
            }
        <label for="">Jour d'ouverture:</label>
        <input type="text" formControlName="openingDay">
        @if(updateForm.controls['openingDay'].touched){
              <div class="alert">Une description est requise</div>
            }
        <label for="">Jour de fermeture:</label>
        <input type="text" formControlName="closingDay">
        @if(updateForm.controls['closingDay'].touched){
              <div class="alert">Une description est requise</div>
            }
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
            openingTime: new FormControl('', [Validators.required] ),
            closingTime: new FormControl('', [Validators.required]),
            openingDay: new FormControl('', [Validators.required]),
            closingDay: new FormControl('', [Validators.required])
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