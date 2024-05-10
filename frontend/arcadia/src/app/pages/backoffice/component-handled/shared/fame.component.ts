import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { ClickService } from "../../../animals/services/click.service";
import { AnimalOnMongo, AnimalOnMongoCreate } from "../../../../shared/models";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { FormsModule, NgForm} from "@angular/forms";
import { tap } from "rxjs";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-fame',
    standalone: true,
    imports:[MatTableModule, MatSortModule, MatSort, FormsModule, MatIconModule],
    template: `
    <h3>Popularité des animaux</h3>
    @if(responsemessage === 'No animal found'){
        <p>Il n'y a pas d'animal</p>
    }
    <table mat-table [dataSource]="datasource" matSort matSortActive="click" matSortDirection="desc">
        <ng-container matColumnDef="firstname">
            <th mat-header-cell *matHeaderCellDef >Prénom</th>
            <td mat-cell *matCellDef="let animal">{{ animal.firstname }}</td>
        </ng-container>
        <ng-container matColumnDef="click">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre de click</th>
            <td mat-cell *matCellDef="let animal">{{ animal.clickCount }}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Supprimer</th>
            <td mat-cell *matCellDef="let animal">
            @if(role === 'Admin'){
                <mat-icon (click)="deleteAnimal(animal._id)">delete</mat-icon>
            } @else {
                <p>Non autorisé</p>
            }
            </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    @if( role === 'Admin'){
    <h3>Ajouter un animal pour connaître sa popularité :</h3>
    <form #form="ngForm" name="addForm" (ngSubmit)="addAnimalOnMongo()">
        <label for="firstname" >Prénom</label>
        <input type="text" name="firstname" [(ngModel)]="newAnimal.firstname" #firstname="ngModel" required>
        @if(firstname.invalid && firstname.touched){
            <p class="alert">Un Prénom est requis</p>
        }
        <button>Annuler</button>
        <button>Valider</button>
    </form>
}
    `,
    styleUrl:`../component-handled.component.css`
})

export class FameComponent implements OnInit {
    constructor(){}

    displayColums: string[] = ['firstname','click', 'delete'];

    private readonly clickService = inject(ClickService);

    animals: AnimalOnMongo [] = [];
    datasource = new MatTableDataSource(this.animals);

    newAnimal: AnimalOnMongoCreate = {
        firstname: ''
    };

    role: string = localStorage.getItem('role') || '';
    responsemessage: string = ''

    @ViewChild(MatSort) sort!:MatSort;

    ngOnInit(){
        this.getAnimals();
    }

    ngAfterOnInit(){
        this.datasource.sort = this.sort;
       }

    getAnimals(){
        this.clickService.getAnimals().subscribe((response)=> {
        try {
            this.animals = response.data.animals;
            this.datasource = new MatTableDataSource(this.animals);
            this.datasource.sort = this.sort;
            this.responsemessage = response.message;
        } catch {
            this.responsemessage = response.message;
        }
        })
    }

    addAnimalOnMongo(){
        this.clickService.addAnimalOnMongo(this.newAnimal).pipe(tap(()=>{this.getAnimals()})).subscribe(); 
        // this.newAnimal.firstname = '';
    }

    deleteAnimal(id: string){
        this.clickService.deleteAnimal(id).pipe(tap(()=>{this.getAnimals()})).subscribe();
    }
}