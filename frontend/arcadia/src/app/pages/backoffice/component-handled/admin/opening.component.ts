import { Component, DestroyRef, OnInit, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpeningService } from '../../../services/service/opening.service';
import { Opening } from '../../../../shared/models/opening.interface';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        <label for="openingTime">Heure d'ouverture:</label>
        <input type="text" formControlName="openingTime" id="openingTime">
        @if(updateForm.controls['openingTime'].invalid && updateForm.controls['openingTime'].touched){
              <div class="alert">Une heure d'ouverture est requise</div>
            }
        <label for="closingTime">Heure de fermeture:</label>
        <input type="text" formControlName="closingTime" id="closingTime">
        @if(updateForm.controls['closingTime'].invalid && updateForm.controls['closingTime'].touched){
              <div class="alert">Une heure de fermeture est requise</div>
            }
        <label for="openingDay">Jour d'ouverture:</label>
        <input type="text" formControlName="openingDay" id="openingDay">
        @if(updateForm.controls['openingDay'].invalid && updateForm.controls['openingDay'].touched){
              <div class="alert">Un jour d'ouverture est requis</div>
            }
        <label for="closingDay">Jour de fermeture:</label>
        <input type="text" formControlName="closingDay" id="closingDay">
        @if(updateForm.controls['closingDay'].invalid && updateForm.controls['closingDay'].touched){
              <div class="alert">Un jour de fermeture est requis</div>
            }
        <button type="reset">Annuler</button>
        <button [disabled]="updateForm.invalid" >Valider</button>
    </form>
    `,
    styleUrl:`../component-handled.component.css`
})

export class OpeningComponent implements OnInit {
   public updateForm: FormGroup

    constructor(private fb: FormBuilder) {
        this.updateForm = this.fb.group({
            openingTime: new FormControl('', [Validators.required]),
            closingTime: new FormControl('', [Validators.required]),
            openingDay: new FormControl('', [Validators.required]),
            closingDay: new FormControl('', [Validators.required])
        })    
    }

    private readonly openingService = inject(OpeningService);
    private readonly destroyRef = inject(DestroyRef)

   openToPublic!: Opening


    ngOnInit() { 
        this.getOpeningToPublic()
    }

    getOpeningToPublic(){
        this.openingService.getHandleOpeningToPublic().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response)=>{
            this.openToPublic = response[0];
            this.updateForm.patchValue({openingTime: this.openToPublic.openingTime, closingTime: this.openToPublic.closingTime, openingDay: this.openToPublic.openingDay, closingDay: this.openToPublic.closingDay})
        })
    };

    updateOpeningToPublic(id: string){
        this.openingService.updateOpeningToPublic(this.updateForm.value, id).pipe(tap(()=>{this.getOpeningToPublic()}), takeUntilDestroyed(this.destroyRef)).subscribe()
    }
}