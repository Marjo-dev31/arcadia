import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-error',
    template: `
    <h3>Oups, une erreur est survenue, veuillez ré-essayer plus tard.</h3>
    `
})

export class ErrorComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}