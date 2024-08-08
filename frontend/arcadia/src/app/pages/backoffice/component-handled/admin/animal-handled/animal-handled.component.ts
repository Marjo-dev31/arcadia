import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import {
    Animal,
    AnimalCreate,
    Habitat,
    Breed,
} from "../../../../../shared/models";
import { AnimalService } from "../../../../../shared/services/animal.service";
import { ImageService } from "../../../../../shared/services/image.service";
import { tap } from "rxjs";
import { LowerCasePipe, NgStyle, TitleCasePipe } from "@angular/common";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { HabitatsService } from "../../../../../shared/services/habitat.service";
import { BreedService } from "../../../../../shared/services/breed.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-animal-handled",
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        NgStyle,
        FormsModule,
        ReactiveFormsModule,
        TitleCasePipe,
        LowerCasePipe,
    ],
    templateUrl: `./animal-handled.component.html`,
    styleUrl: `../../component-handled.component.css`,
})
export class AnimalHandledComponent implements OnInit {
    private readonly animalService = inject(AnimalService);
    private readonly imageService = inject(ImageService);
    private readonly habitatService = inject(HabitatsService);
    private readonly breedService = inject(BreedService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly fb = inject(FormBuilder);
    
    displayColums: string[] = [
        "firstname",
        "race",
        "habitat",
        "condition",
        "actions",
        "image",
    ];

    updateForm: FormGroup = this.fb.group({
        firstname: new FormControl("", [Validators.required]),
        habitat: new FormControl("", [Validators.required]),
        breed: new FormControl("", [Validators.required]),
        id: new FormControl(""),
    });

    breedForm: FormGroup = this.fb.group({
        name: new FormControl("", [Validators.required]),
    });

    datasource!: Animal[] | undefined;
    breeds!: Breed[];
    
    habitats!: Habitat[];

    newAnimal: AnimalCreate = {
        firstname: "",
        habitat: "",
        breed: "",
    };

    addFormIsDisplay = signal(false);
    updateFormIsDisplay = signal(false);
    submitted = signal(false);

    ngOnInit() {
        this.getAnimals();
        this.getHabitat();
        this.getBreed();
    }

    getAnimals() {
        this.animalService
            .getHandleAnimals()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.datasource = response;
            });
    }

    onFileChange(event: Event, id: string) {
        const input = event.target as HTMLInputElement;
        const file = input?.files?.[0];
        const formData = new FormData();
        if (file) {
            formData.append("myImg", file);
            this.imageService
                .addAnimalImage(formData, id)
                .pipe(
                    tap(() => {
                        this.getAnimals();
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
                    this.getAnimals();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    onSubmit(form: NgForm) {
        this.animalService
            .addAnimal(this.newAnimal)
            .pipe(
                tap(() => {
                    this.getAnimals();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.addFormIsDisplay.update((value) => !value);
        form.reset();
    }

    editAnimal(id: string) {
        this.updateFormIsDisplay.set(true);
        if (this.datasource) {
            const animalToUpdate = this.datasource.find((el) => el.id === id);
            this.updateForm.patchValue({
                firstname: animalToUpdate?.firstname,
                habitat: animalToUpdate?.id_habitat,
                breed: animalToUpdate?.id_breed,
                id: animalToUpdate?.id,
            });
        }
    }

    updateAnimal() {
        this.animalService
            .updateAnimal(this.updateForm.value)
            .pipe(
                tap(() => {
                    this.getAnimals();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.updateForm.reset();
        this.updateFormIsDisplay.update((value) => !value);
    }

    deleteAnimal(id: string) {
        this.animalService
            .deleteAnimal(id)
            .pipe(
                tap(() => {
                    this.getAnimals();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    // then required for exam
    getHabitat() {
        this.habitatService.getHabitats().then((response) => {
            this.habitats = response;
        });
    }

    getBreed() {
        this.breedService
            .getBreeds()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.breeds = response;
            });
    }

    addBreed() {
        this.breedService
            .addBreed(this.breedForm.value)
            .pipe(
                tap(() => {
                    this.getBreed();
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        this.submitted.set(true);
    }

    toggleAddForm() {
        this.addFormIsDisplay.update((value) => !value);
    }
    
    closeUpdateForm() {
        this.updateFormIsDisplay.update((value) => !value);
    }
}
