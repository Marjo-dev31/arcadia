import { CommonModule } from "@angular/common";
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
    VeterinaryReport,
    VeterinaryReportCreate,
    User,
} from "../../../../../shared/models";
import { AnimalService } from "../../../../../shared/services/animal.service";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { VeterinaryService } from "../../../../../shared/services/veterinary.service";
import { Observable, tap } from "rxjs";
import { UserService } from "../../../../../shared/services/user.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-veterinary-animal-report-handled",
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        MatSortModule,
        MatSort,
        ReactiveFormsModule,
    ],
    templateUrl: `./veterinary-animal-report-handled.component.html`,
    styleUrl: `../../component-handled.component.css`,
})
export class VeterinaryAnimalReportHandledComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly animalService = inject(AnimalService);
    private readonly veterinaryService = inject(VeterinaryService);
    private readonly userService = inject(UserService);
    private readonly destroyRef = inject(DestroyRef);

    displayColums: string[] = [
        "date",
        "healthcondition",
        "food",
        "grammage",
        "healthconditiondetails",
        "actions",
    ];

    updateForm: FormGroup = this.fb.group({
        food: new FormControl("", [Validators.required]),
        grammage: new FormControl("", [Validators.required]),
        health: new FormControl("", [Validators.required]),
        details_condition: new FormControl(""),
        id_user: new FormControl("", [Validators.required]),
        id_animal: new FormControl("", [Validators.required]),
        id: new FormControl(""),
    });

    animals!: Animal[];
    veterinaryReports: VeterinaryReport[] = [];
    selectedAnimalOption!: string;
    dataSource = new MatTableDataSource(this.veterinaryReports);
    role: string = localStorage.getItem("role") || "";

    users$: Observable<User[]> =  this.userService.getUsers();

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);
    
    newReport: VeterinaryReportCreate = {
        food: "",
        grammage: 0,
        health: "",
        details_condition: "",
        id_user: "",
        id_animal: "",
    };

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.getAnimals();
    }

    ngAfterOnInit() {
        this.dataSource.sort = this.sort;
    }

    getAnimals() {
        this.animalService.getAnimals().then((response) => {
            this.animals = response;
        });
    }

    getVeterinaryReports(id: string) {
        this.veterinaryService
            .getVeterinaryReports(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.veterinaryReports = response;
                this.dataSource = new MatTableDataSource(
                    this.veterinaryReports
                );
                this.dataSource.sort = this.sort;
            });
    }

    deleteReport(id: string) {
        this.veterinaryService
            .deleteReport(id)
            .pipe(
                tap(() => {
                    this.getVeterinaryReports(id);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value)=> !value)
    }

    onSubmit(form: NgForm) {
        this.veterinaryService
            .addVeterinaryReport(this.newReport)
            .pipe(
                tap(() => {
                    this.getVeterinaryReports(this.selectedAnimalOption);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        form.reset();
    }

    editReport(id: string) {
        this.updateFormIsDisplay.set(true)
        const reportToUpdate = this.veterinaryReports.find(
            (el) => el.id === id
        );
        this.updateForm.patchValue({
            food: reportToUpdate?.food,
            grammage: reportToUpdate?.grammage,
            health: reportToUpdate?.health,
            details_condition: reportToUpdate?.details_condition,
            id_user: reportToUpdate?.id_user,
            id_animal: reportToUpdate?.id_animal,
            id: reportToUpdate?.id,
        });
    }

    updateReport(id: string) {
        this.veterinaryService
            .updateReport(this.updateForm.value)
            .pipe(
                tap(() => {
                    this.getVeterinaryReports(id);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
            this.updateFormIsDisplay.update((value)=> !value)
    }

    closeUpdateForm() {
        this.updateFormIsDisplay.update((value)=> !value)
    }
}
