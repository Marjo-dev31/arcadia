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
} from "../../../../../shared/models";
import { AnimalService } from "../../../../../shared/services/animal.service";
import { EmployeeService } from "../../../../../shared/services/employee.service";
import { UserService } from "../../../../../shared/services/user.service";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { Observable, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LoginService } from "../../../../../shared/services/login.service";

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
    templateUrl: `./employee-animal-report-handled.component.html`,
    styleUrl: `../../component-handled.component.css`,
})
export class EmployeeReportHandledComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly animalService = inject(AnimalService);
    private readonly employeeService = inject(EmployeeService);
    private readonly userService = inject(UserService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly loginService = inject(LoginService)

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

    users$: Observable<User[]> = this.userService.getUsersEmployee()

    datasource = new MatTableDataSource(this.employeeReports);

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);

    role = this.loginService.currentUser().role

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
