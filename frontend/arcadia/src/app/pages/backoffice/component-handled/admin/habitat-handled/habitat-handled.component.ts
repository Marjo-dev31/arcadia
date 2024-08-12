import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Habitat, HabitatCreate } from "../../../../../shared/models";
import { HabitatsService } from "../../../../../shared/services/habitat.service";
import { tap } from "rxjs";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgStyle } from "@angular/common";
import { ImageService } from "../../../../../shared/services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-habitat-handled",
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        NgStyle,
        FormsModule,
    ],
    templateUrl: `./habitat-handled.component.html`,
    styleUrl: `../../component-handled.component.css`,
})
export class HabitatHandledComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly habitatService = inject(HabitatsService);
    private readonly imageService = inject(ImageService);
    private readonly destroyRef = inject(DestroyRef);

    displayColums: string[] = ["title", "description", "actions", "image"];

    habitatForm: FormGroup = this.fb.group({
        title: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        id: new FormControl(""),
    });

    datasource!: Habitat[];

    newHabitat: HabitatCreate = {
        title: "",
        description: "",
    };

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);

    ngOnInit() {
        this.getHabitats();
    }

    getHabitats() {
        this.habitatService
            .getHandleHabitats()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.datasource = response;
            });
    }

    editHabitat(id: string) {
        this.updateFormIsDisplay.set(true);
        const habitatToUpdate = this.datasource.find((el) => el.id === id);
        this.habitatForm.patchValue({
            id: habitatToUpdate?.id,
            title: habitatToUpdate?.title,
            description: habitatToUpdate?.description,
        });
    }

    updateHabitat() {
        this.habitatService
            .updateHabitat(this.habitatForm.value)
            .pipe(
                tap(() => {
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.habitatForm.reset();
        this.updateFormIsDisplay.update((value)=> !value);
    }

    onSubmit() {
        this.habitatService
            .addHabitat(this.newHabitat)
            .pipe(
                tap(() => {
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.newHabitat.description = "";
        this.newHabitat.title = "";
        this.addFormIsDisplay.update((value)=> !value);
    }

    deleteHabitat(id: string) {
        this.habitatService
            .deleteHabitat(id)
            .pipe(
                tap(() => {
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    onFileChange(event: Event, id: string) {
        const input = event.currentTarget as HTMLInputElement;
        const file = input?.files?.[0];
        const formData = new FormData();
        if (file) {
            formData.append("myImg", file);
            this.imageService
                .addHabitatImage(formData, id)
                .pipe(
                    tap(() => {
                        this.getHabitats();
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
                    this.getHabitats();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value)=> !value);
    }

    closeUpdateForm() {
        this.updateFormIsDisplay.update((value)=> !value);
    }
}
