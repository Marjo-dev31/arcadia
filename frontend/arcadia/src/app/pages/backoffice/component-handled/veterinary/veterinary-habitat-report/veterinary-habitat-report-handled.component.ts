import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { HabitatsService } from "../../../../../shared/services/habitat.service";
import { Habitat } from "../../../../../shared/models";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { tap } from "rxjs";
import { NgStyle } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LoginService } from "../../../../../shared/services/login.service";

@Component({
    selector: "app-veterinary-habitat-report-handled",
    standalone: true,
    imports: [MatTableModule, MatIconModule, ReactiveFormsModule, NgStyle],
    template: `
        <section class="habitats-section">
            <h3>Section habitats</h3>
            <table mat-table [dataSource]="datasource">
                <ng-container matColumnDef="habitat">
                    <th mat-header-cell *matHeaderCellDef>Habitat</th>
                    <td mat-cell *matCellDef="let habitat">
                        {{ habitat.title }}
                    </td>
                </ng-container>
                <ng-container matColumnDef="comment">
                    <th mat-header-cell *matHeaderCellDef>
                        Dernier commentaire
                    </th>
                    <td mat-cell *matCellDef="let habitat">
                        {{ habitat.comment }}
                    </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Supprimer</th>
                    <td mat-cell *matCellDef="let habitat">
                        @if(role === 'Vétérinaire'){
                        <mat-icon (click)="deleteComment(habitat.id)"
                            >delete</mat-icon
                        >
                        } @else {
                        <p>Non autorisé</p>
                        }
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
                <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
            </table>
            @if(role === "Vétérinaire"){
            <mat-icon class="add-icon" (click)="toggleAddForm()"
                >{{addFormIsDisplay()? 'remove_circle_outline' : 'add_circle_outline'}} </mat-icon
            >
        }
        </section>
        <section
            [ngStyle]="{ display: addFormIsDisplay() ? 'block' : 'none' }"
            #formSection
        >
            <form
                [formGroup]="commentForm"
                (ngSubmit)="onSubmit(habitatSelected.value)"
            >
                <select name="habitats" id="habitat-selected" #habitatSelected required>
                    <option value="null">-- Choissisez un habitat --</option>
                    @for(habitat of datasource; track habitat.id){
                    <option [value]="habitat.id">{{ habitat.title }}</option>
                    } @if(!habitatSelected){
                    <p class="alert">Un habitat est requis</p>
                    }
                </select>
                <textarea
                    formControlName="comment"
                    cols="30"
                    rows="5"
                    placeholder="Ajouter ou mettre à jour votre commentaire ici"
                ></textarea>
                @if(commentForm.controls['comment'].invalid &&
                commentForm.controls['comment'].touched){
                <div class="alert">Un commentaire est requis</div>
                }
                <button type="submit" class="submit-btn" [disabled]="commentForm.invalid">
                    Ajouter mon commentaire
                </button>
            </form>
        </section>
    `,
    styleUrl: `../../component-handled.component.css`,
})
export class VeterinaryHabitatReportHandledComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly habitatService = inject(HabitatsService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly loginService = inject(LoginService)

    displayColums: string[] = ["habitat", "comment", "actions"];

    commentForm: FormGroup = this.fb.group({
        comment: new FormControl("", [Validators.required]),
    });

    datasource!: Habitat[];
    report!: string[];
    role = this.loginService.currentUser().role

    addFormIsDisplay = signal(false);

    ngOnInit() {
        this.getHabitats();
    }

    getHabitats() {
        this.habitatService.getHabitats().then((response) => {
            this.datasource = response;
        });
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value) => !value);
    }

    onSubmit(id: string) {
        this.habitatService
            .addComment(this.commentForm.value, id)
            .pipe(
                tap(() => {
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.commentForm.reset();
        this.addFormIsDisplay.update((value) => !value);
    }

    deleteComment(id: string) {
        this.habitatService
            .deleteComment(id)
            .pipe(
                tap(() => {
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
