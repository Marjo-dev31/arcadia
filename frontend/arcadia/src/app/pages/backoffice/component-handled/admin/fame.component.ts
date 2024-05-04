import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { ClickService } from "../../../animals/services/click.service";
import { AnimalOnMongo } from "../../../../shared/models";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSortModule, MatSort } from "@angular/material/sort";

@Component({
    selector: 'app-fame',
    standalone: true,
    imports:[MatTableModule, MatSortModule, MatSort],
    template: `
    <h3>Popularité des animaux</h3>
    <table mat-table [dataSource]="datasource" matSort matSortActive="click" matSortDirection="desc">
        <ng-container matColumnDef="firstname">
            <th mat-header-cell *matHeaderCellDef >Prénom</th>
            <td mat-cell *matCellDef="let animal">{{ animal.firstname }}</td>
        </ng-container>
        <ng-container matColumnDef="click">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre de click</th>
            <td mat-cell *matCellDef="let animal">{{ animal.clickCount }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayColums"></tr>
        <tr mat-row *matRowDef="let row; columns: displayColums"></tr>
    </table>
    `,
    styles:``
})

export class FameComponent implements OnInit {
    constructor(){}

    displayColums: string[] = ['firstname','click']

    private readonly clickService = inject(ClickService)

    animals: AnimalOnMongo [] = []
    datasource = new MatTableDataSource(this.animals)

    @ViewChild(MatSort) sort!:MatSort;

    ngOnInit(){
        this.getAnimals()
    }

    ngAfterOnInit(){
        this.datasource.sort = this.sort;
       }

    getAnimals(){
        this.clickService.getAnimals().subscribe((response)=> {
            this.animals = response;
            this.datasource = new MatTableDataSource(this.animals);
            console.log(this.datasource)
            this.datasource.sort = this.sort
        })
    }
}