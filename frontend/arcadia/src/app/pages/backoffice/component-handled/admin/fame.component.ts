import { Component, OnInit, inject } from "@angular/core";
import { ClickService } from "../../../animals/services/click.service";
import { AnimalOnMongo } from "../../../../shared/models";

@Component({
    selector: 'app-fame',
    standalone: true,
    imports:[],
    template: `
    <h3>Popularité des animaux</h3>
    @for(animal of animals; track animal){
        <div>
            <p>Prénom de l'animal: {{ animal.firstname }}/ Nombre de click: {{ animal.clickCount}}</p>
        </div>
    }
    `,
    styles:``
})

export class FameComponent implements OnInit {
    constructor(){}

    private readonly clickService = inject(ClickService)

    animals!: AnimalOnMongo []

    ngOnInit(){
        this.getAnimals()
    }

    getAnimals(){
        this.clickService.getAnimals().subscribe((response)=> {
            this.animals = response
        })
    }
}