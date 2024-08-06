import { Component, Inject } from "@angular/core";
import { Animal } from "../../shared/models";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { TitleCasePipe } from "@angular/common";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-animals",
    standalone: true,
    imports: [MatDialogClose, TitleCasePipe],
    template: `
        <main class="id-card-animal">
            <div mat-dialog-content>
                @if(animal.id === this.data.animal.id) {
                <div class="id-card-animal-item">
                    <img
                        [src]="this.url + animal.image_url"
                        alt="Photo d'un {{ animal.breed }}"
                    />

                    <div class="id-card-animal-content">
                        <p>Son prénom: {{ animal.firstname | titlecase }}</p>
                        <p>Sa race: {{ animal.breed }}</p>
                        @if(animal.health){
                        <div>
                            <p>Son état de santé actuel: {{ animal.health }}</p>
                        </div>
                        } @else {
                        <div>
                            <p>
                                Il n'y a pas encore de rapport sur l'état de
                                santé actuel
                            </p>
                        </div>
                        }
                    </div>
                    <div mat-dialog-actions class="mat-dialog-actions">
                        <button mat-dialog-close cdkFocusInitial>Fermer</button>
                    </div>
                </div>

                }
            </div>
        </main>
    `,
    styleUrl: `./animals.component.css`,
})
export class AnimalsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { animal: Animal }) {}

    url = `${environment.serverUrl}/upload/`;
    animal: Animal = this.data.animal;
}
