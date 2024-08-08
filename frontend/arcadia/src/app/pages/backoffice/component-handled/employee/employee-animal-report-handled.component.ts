import { AsyncPipe, CommonModule } from "@angular/common";
import {
    Component,
    DestroyRef,
    OnInit,
    ViewChild,
    inject,
    signal,
} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {
    Animal,
    User,
    EmployeeReport,
    EmployeeReportCreate,
} from "../../../../shared/models";
import { AnimalService } from "../../../../shared/services/animal.service";
import { EmployeeService } from "../../../../shared/services/employee.service";
import { UserService } from "../../../../shared/services/user.service";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { Observable, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-veterinary-animal-report-handled",
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule, AsyncPipe
    ],
    template: `
        <h3>Rapport employé</h3>
        <section>
            <form
                #animalchoice="ngForm"
                name="animalchoice"
                (ngSubmit)="getEmployeeReports(selectedAnimalOption)"
            >
                <label for="animal-employee">Sélectionner un animal : </label>
                <select
                    name="animal"
                    id="animal-employee"
                    [(ngModel)]="selectedAnimalOption"
                >
                @for(animal of animals; track animal.id){
                    <option
                        [ngValue]="animal.id"
                    >
                        {{ animal.firstname | titlecase }} ({{ animal.breed }})
                    </option>
                }
                </select>
                <button>Filtrer</button>
            </form>

            @if(animalchoice.submitted && selectedAnimalOption &&
            !employeeReports.length){
            <p>Il n'y a pas de rapport associé à cet animal</p>
            } @for(animal of animals; track animal.id) 
                { @if (selectedAnimalOption === animal.id) {
            <table
                mat-table
                [dataSource]="datasource"
                matSort
                matSortActive="date"
            >
                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>
                        Date de visite
                    </th>
                    <td mat-cell *matCellDef="let report">{{ report.date }}</td>
                </ng-container>
                <ng-container matColumnDef="food">
                    <th mat-header-cell *matHeaderCellDef>Nourriture donnée</th>
                    <td mat-cell *matCellDef="let report">{{ report.food }}</td>
                </ng-container>
                <ng-container matColumnDef="grammage">
                    <th mat-header-cell *matHeaderCellDef>Grammage donnée</th>
                    <td mat-cell *matCellDef="let report">
                        {{ report.grammage }}
                    </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Action</th>
                    <td mat-cell *matCellDef="let report">
                        @if(role === 'Employé'){
                        <mat-icon (click)="editReport(report.id)"
                            >create
                        </mat-icon>
                        <mat-icon (click)="deleteReport(report.id)"
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
            }} @if(role === 'Employé'){ @if(!addFormIsDisplay()){
            <mat-icon class="add-icon" (click)="toggleAddForm()"
                >add_circle_outline</mat-icon
            >
            } @if(addFormIsDisplay()){
            <mat-icon class="add-icon" (click)="toggleAddForm()"
                >remove_circle_outline</mat-icon
            >
            }}
        </section>
        <section [ngStyle]="{ display: addFormIsDisplay() ? 'block' : 'none' }">
            <form
                class="add-form"
                #form="ngForm"
                name="addform"
                (ngSubmit)="onSubmit(form)"
            >
                <label for="animal-add-employee"
                    >Sélectionner un animal :
                </label>
                <select
                    name="animal"
                    id="animal-add-employee"
                    [(ngModel)]="newReport.id_animal"
                    #animal="ngModel"
                    required
                >
                    @for(animal of animals; track animal.id) {
                    <option [ngValue]="animal.id">
                        {{ animal.firstname | titlecase }} ({{ animal.breed }})
                    </option>
                    }
                </select>
                @if(animal.invalid && animal.touched){
                <p class="alert">Un animal est requis</p>
                }
                <label for="food-add-employee">Nourriture donnée :</label>
                <input
                    type="text"
                    placeholder="Aliments données"
                    name="food"
                    id="food-add-employee"
                    [(ngModel)]="newReport.food"
                    #food="ngModel"
                    required
                />
                @if(food.invalid && food.touched){
                <p class="alert">Un type de nourriture est requis</p>
                }
                <label for="grammage-add-employee">Poids (en g) :</label>
                <input
                    type="text"
                    placeholder="Grammage donné"
                    name="grammage"
                    id="grammage-add-employee"
                    [(ngModel)]="newReport.grammage"
                    #grammage="ngModel"
                    required
                />
                @if(grammage.invalid && grammage.touched){
                <p class="alert">Un grammage est requis</p>
                }

                <label for="user-add-employee"
                    >Sélectionner un rapporteur :
                </label>
                <select
                    name="user"
                    id="user-add-employee"
                    [(ngModel)]="newReport.id_user"
                    #user="ngModel"
                    required
                >
                    @for(user of users$ | async ; track user.id) {
                    <option [ngValue]="user.id">
                        {{ user.firstname | titlecase }}
                        {{ user.lastname | titlecase }}
                    </option>
                    }
                </select>
                @if(user.invalid && user.touched){
                <p class="alert">Un rapporteur est requis</p>
                }
                <button class="add-btn" [disabled]="form.invalid">
                    Enregistrer nouveau rapport
                </button>
            </form>
        </section>
        <section
            [ngStyle]="{ display: updateFormIsDisplay() ? 'block' : 'none' }"
        >
            <form
                class="add-form"
                [formGroup]="updateForm"
                (ngSubmit)="updateReport(selectedAnimalOption)"
            >
                 @for(animal of animals; track animal.id) {
                    @if(animal.id === this.selectedAnimalOption){
                        <p>Animal selectionné : {{ animal.firstname | titlecase}}</p>
                    }}
                <label for="food-update-employee"
                    >Nourriture recommandée :</label
                >
                <input
                    type="text"
                    formControlName="food"
                    id="food-update-employee"
                />
                @if(updateForm.controls['food'].invalid &&
                updateForm.controls['food'].touched){
                <div class="alert">Une type de nourriture est requis</div>
                }
                <label for="grammage-update-employee">Poids (en g) :</label>
                <input
                    type="text"
                    id="grammage-update-employee"
                    formControlName="grammage"
                />
                @if(updateForm.controls['grammage'].invalid &&
                updateForm.controls['grammage'].touched){
                <div class="alert">Un grammage est requis</div>
                }

                <label for="selected-user-update-employee"
                    >Sélectionner un rapporteur :
                </label>
                <select
                    name="user"
                    id="selected-user-update-employee"
                    formControlName="id_user"
                >
                    @for(user of users$ | async; track user.id) {
                    <option [value]="user.id">
                        {{ user.firstname | titlecase }}
                        {{ user.lastname | titlecase }}
                    </option>
                    }
                </select>
                @if(updateForm.controls['id_user'].invalid &&
                updateForm.controls['id_user'].touched){
                <div class="alert">Un rapporteur est requis</div>
                }
                <button class="add-btn" [disabled]="updateForm.invalid">
                    Modifier rapport
                </button>
            </form>
            <mat-icon class="add-icon" (click)="closeUpdateForm()"
                >remove_circle_outline</mat-icon
            >
        </section>
    `,
    styleUrl: `../component-handled.component.css`,
})
export class EmployeeReportHandledComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly animalService = inject(AnimalService);
    private readonly employeeService = inject(EmployeeService);
    private readonly userService = inject(UserService);
    private readonly destroyRef = inject(DestroyRef);

    displayColums: string[] = ["date", "food", "grammage", "actions"];

    updateForm: FormGroup = this.fb.group({
        food: new FormControl("", [Validators.required]),
        grammage: new FormControl("", [Validators.required]),
        id_user: new FormControl("", [Validators.required]),
        id_animal: new FormControl("", [Validators.required]),
        id: new FormControl(""),
    });

    animals!: Animal[];
    employeeReports: EmployeeReport[] = [];
    selectedAnimalOption!: string;

    users$: Observable<User[]> = this.userService.getUsers()

    datasource = new MatTableDataSource(this.employeeReports);

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);

    role: string = localStorage.getItem("role") || "";

    newReport: EmployeeReportCreate = {
        food: "",
        grammage: 0,
        id_user: "",
        id_animal: "",
    };

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.getAnimals();
    }

    ngAfterOnInit() {
        this.datasource.sort = this.sort;
    }

    getAnimals() {
        this.animalService.getAnimals().then((response) => {
            this.animals = response;
        });
    }

    getEmployeeReports(id: string) {
        this.employeeService
            .getEmployeeReports(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.employeeReports = response;
                this.datasource = new MatTableDataSource(this.employeeReports);
                this.datasource.sort = this.sort;
            });
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value) => !value);
    }

    onSubmit(form: NgForm) {
        this.employeeService
            .addEmployeeReport(this.newReport)
            .pipe(
                tap(() => {
                    this.getEmployeeReports(this.selectedAnimalOption);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.addFormIsDisplay.update((value) => !value);
        form.reset();
    }

    editReport(id: string) {
        this.updateFormIsDisplay.set(true);
        const reportToUpdate = this.employeeReports.find((el) => el.id === id);
        this.updateForm.patchValue({
            food: reportToUpdate?.food,
            grammage: reportToUpdate?.grammage,
            id_user: reportToUpdate?.id_user,
            id_animal: reportToUpdate?.id_animal,
            id: reportToUpdate?.id,
        });
    }

    updateReport(id: string) {
        this.employeeService
            .updateReport(this.updateForm.value)
            .pipe(
                tap(() => {
                    this.getEmployeeReports(id);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.updateFormIsDisplay.update((value)=> !value);
    }

    deleteReport(id: string) {
        this.employeeService
            .deleteEmployeeReport(id)
            .pipe(
                tap(() => {
                    this.getEmployeeReports(id);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    closeUpdateForm() {
        this.updateFormIsDisplay.update((value)=> !value);
    }
}
