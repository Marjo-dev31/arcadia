import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { HabitatsService } from "../../shared/services/habitat.service";
import { Animal, AnimalOnMongo, Habitat } from "../../shared/models";
import { AnimalsComponent } from "../animals/animals.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AnimalService } from "../../shared/services/animal.service";
import { ClickService } from "../../shared/services/click.service";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TitleCasePipe } from "@angular/common";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-habitats",
    standalone: true,
    imports: [MatDialogModule, TitleCasePipe],
    template: `
        <main>
            <h1 class="title">{{ title }}</h1>
            <h2>
                Au sein des vastes étendues d'Arcadia, découvrez des habitats
                conçus pour le bien-être de nos animaux.
            </h2>
            <section class="habitats">
                @if(habitats && habitats.length) { @for (habitat of habitats;
                track habitat) {
                <div
                    class="habitat-item"
                    (click)="toggleDetails(habitat.id)"
                    tabindex="0"
                    role="button"
                    (keyup.enter)="toggleDetails(habitat.id)"
                >
                    <img
                        [src]="this.url + habitat.image_url"
                        alt="photo représentative de l'habitat"
                        class="habitat-img"
                    />
                    <div class="habitat-content">
                        <h3 class="habitat-title">
                            {{ habitat.title | titlecase }}
                        </h3>
                        @if (showDetails === habitat.id) {
                        <p>{{ habitat.description }}</p>
                        @if(animals) {
                        <ul>
                            @for (animal of animals; track animal) {
                            <li
                                class="animal-list"
                                (click)="openDialog(animal)"
                                role="button"
                                tabindex="0"
                                (keyup.enter)="openDialog(animal)"
                            >
                                {{ animal.firstname }}
                            </li>
                            }
                        </ul>
                        } @else {
                        <p>Il n'y a pas encore d'animaux dans cet habitat</p>
                        } }
                    </div>
                </div>
                }} @else {
                <h3>Il n'y a pas d'habitat visible</h3>
                }
            </section>
        </main>
    `,
    styleUrls: [`./habitats.component.css`],
})
export class HabitatsComponent implements OnInit {
    private readonly habitatService = inject(HabitatsService);
    private readonly animalService = inject(AnimalService);
    private readonly clickService = inject(ClickService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly route = inject(ActivatedRoute);
    private readonly matdialog = inject(MatDialog)
    
    title: string = this.route.snapshot.data["title"];
    
    habitats!: Habitat[];

    animals!: Animal[] | undefined;
    animalsOnMongoByFirstname!: AnimalOnMongo;
    showDetails: string | undefined = undefined;
    url = `${environment.serverUrl}/upload/`;

    ngOnInit() {
        this.getHabitats();
    }

    // then required for exam
    getHabitats() {
        this.habitatService.getHabitats().then((response) => {
            this.habitats = response;
        });
    }

    getAnimalsByHabitat(id: string) {
        this.animalService
            .getAnimalsByHabitat(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.animals = response;
            });
    }

    toggleDetails(id: string) {
        this.showDetails = id;
        this.getAnimalsByHabitat(id);
    }

    openDialog(animal: Animal) {
        this.matdialog.open(AnimalsComponent, {
            width: "25rem",
            data: { animal: animal },
        });
        this.addClick(animal.firstname);
    }

    addClick(firstname: string) {
        this.clickService
            .addClick(firstname)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
