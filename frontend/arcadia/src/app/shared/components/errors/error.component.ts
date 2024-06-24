import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-error',
    template: `
    <h1 class="title">ARCADIA</h1>
    <h3>Oups, une erreur est survenue, veuillez ré-essayer plus tard ou vérifiez que vous êtes bien connecté.</h3>
    `
})

export class ErrorComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}