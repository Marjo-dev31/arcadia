import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import {
    Service,
    ServiceCreate,
} from "../../../../shared/models/service.interface";
import { ServiceService } from "../../../services/service/service.service";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    FormsModule,
    FormBuilder,
    Validators,
    NgForm,
} from "@angular/forms";
import { NgStyle } from "@angular/common";
import { tap } from "rxjs";
import { ImageService } from "../../../home/services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-service-handled",
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        NgStyle,
        FormsModule,
    ],
    template: `
        <h3>Services</h3>
        <section>
            @if(datasource && datasource.length === 0){
            <p>Il n'y a pas de service</p>
            }
            <table mat-table [dataSource]="datasource">
                <ng-container matColumnDef="title">
                    <th mat-header-cell *matHeaderCellDef>Titre</th>
                    <td mat-cell *matCellDef="let service">
                        {{ service.title }}
                    </td>
                </ng-container>
                <ng-container matColumnDef="description">
                    <th mat-header-cell *matHeaderCellDef>Description</th>
                    <td mat-cell *matCellDef="let service">
                        {{ service.description }}
                    </td>
                </ng-container>
                <ng-container matColumnDef="image">
                    <th mat-header-cell *matHeaderCellDef>Photo</th>
                    <td mat-cell *matCellDef="let service">
                        @if( service.image_url){
                        <div class="delete-img">
                            <div>{{ service.image_url }}</div>
                            <mat-icon
                                class="mat-icon-clear"
                                (click)="deleteImage(service.image_id)"
                                >clear</mat-icon
                            >
                        </div>
                        } @else {
                        <p>Il n'y a pas encore de photo associé à ce service</p>
                        }
                        <input
                            type="file"
                            class="file-input"
                            (change)="onFileChange($event, service.id)"
                        />
                    </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let service">
                        <mat-icon (click)="editService(service.id)"
                            >create</mat-icon
                        >
                        <mat-icon (click)="deleteService(service.id)"
                            >delete</mat-icon
                        >
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
                <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
            </table>
            @if(!addFormIsDisplay){
            <mat-icon class="add-icon" (click)="toggleAddForm()"
                >add_circle_outline</mat-icon
            >
            } @if(addFormIsDisplay()){
            <mat-icon class="add-icon" (click)="toggleAddForm()"
                >remove_circle_outline</mat-icon
            >
            }
        </section>
        <section [ngStyle]="{ display: addFormIsDisplay() ? 'block' : 'none' }">
            <form
                class="add-form"
                #form="ngForm"
                name="addform"
                (ngSubmit)="onSubmit(form)"
            >
                <input
                    type="text"
                    placeholder="Titre"
                    name="title"
                    [(ngModel)]="newService.title"
                    #title="ngModel"
                    required
                />
                @if(title.invalid && title.touched){
                <p class="alert">Un titre est requis</p>
                }
                <textarea
                    name="description"
                    placeholder="Description"
                    cols="30"
                    rows="10"
                    [(ngModel)]="newService.description"
                    #description="ngModel"
                    required
                ></textarea>
                @if(description.invalid && description.touched){
                <p class="alert">Une description est requise</p>
                }
                <button class="add-btn" [disabled]="form.invalid">
                    Enregistrer nouveau service
                </button>
            </form>
        </section>
        <section
            [ngStyle]="{ display: updateFormIsDisplay() ? 'block' : 'none' }"
        >
            <form
                class="update-form"
                [formGroup]="serviceForm"
                (ngSubmit)="updateService()"
            >
                <input type="text" formControlName="title" />
                @if(serviceForm.controls['title'].invalid &&
                serviceForm.controls['title'].touched){
                <div class="alert">Un titre est requis</div>
                }
                <textarea
                    formControlName="description"
                    cols="30"
                    rows="10"
                ></textarea>
                @if(serviceForm.controls['description'].invalid &&
                serviceForm.controls['description'].touched){
                <div class="alert">Une description est requise</div>
                }
                <button class="add-btn" [disabled]="serviceForm.invalid">
                    Modifier service
                </button>
            </form>
            <mat-icon class="add-icon" (click)="closeUpdateForm()"
                >remove_circle_outline</mat-icon
            >
        </section>
    `,
    styleUrls: [`../component-handled.component.css`],
})
export class ServiceHandledComponent implements OnInit {
    displayColums: string[] = ["title", "description", "actions", "image"];

    private readonly fb = inject(FormBuilder);

    serviceForm: FormGroup = this.fb.group({
        title: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        id: new FormControl(""),
    });

    private readonly serviceService = inject(ServiceService);
    private readonly imageService = inject(ImageService);
    private readonly destroyRef = inject(DestroyRef);

    datasource!: Service[];

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);

    newService: ServiceCreate = {
        title: "",
        description: "",
    };

    ngOnInit() {
        this.getServices();
    }

    getServices() {
        this.serviceService
            .getHandleServices()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.datasource = response;
            });
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value)=> !value);
    }

    onSubmit(form: NgForm): void {
        this.serviceService
            .addService(this.newService)
            .pipe(
                tap(() => {
                    this.getServices();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        form.reset();
        this.addFormIsDisplay.update((value)=> !value);
    }

    editService(id: string) {
        this.updateFormIsDisplay.set(true);
        const serviceToUpdate = this.datasource.find((el) => el.id === id);
        this.serviceForm.patchValue({
            id: serviceToUpdate?.id,
            title: serviceToUpdate?.title,
            description: serviceToUpdate?.description,
        });
    }

    updateService() {
        this.serviceService
            .updateService(this.serviceForm.value)
            .pipe(
                tap(() => {
                    this.getServices();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.serviceForm.reset();
        this.updateFormIsDisplay.update((value)=> !value)
    }

    deleteService(id: string) {
        this.serviceService
            .deleteService(id)
            .pipe(
                tap(() => {
                    this.getServices();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    onFileChange(event: Event, id: string) {
        const input = event.target as HTMLInputElement
        const file = input?.files?.[0];
        if(file){
                const formData = new FormData();
        formData.append("myImg", file);
        this.imageService
            .addServiceImage(formData, id)
            .pipe(
                tap(() => {
                    this.getServices();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        }
    }

    deleteImage(id: string) {
        this.imageService
            .deleteImage(id)
            .pipe(
                tap(() => {
                    this.getServices();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    closeUpdateForm() {
        this.updateFormIsDisplay.update((value)=> !value)
    }
}
