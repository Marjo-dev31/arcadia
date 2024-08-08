import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import {
    Service,
    ServiceCreate,
} from "../../../../../shared/models/service.interface";
import { ServiceService } from "../../../../../shared/services/service.service";
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
import { ImageService } from "../../../../../shared/services/image.service";
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
    templateUrl: `./service-handled.component.html`,
    styleUrls: [`../../component-handled.component.css`],
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
        this.addFormIsDisplay.update((value) => !value);
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
        this.addFormIsDisplay.update((value) => !value);
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
        this.updateFormIsDisplay.update((value) => !value);
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
        const input = event.target as HTMLInputElement;
        const file = input?.files?.[0];
        if (file) {
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
        this.updateFormIsDisplay.update((value) => !value);
    }
}
