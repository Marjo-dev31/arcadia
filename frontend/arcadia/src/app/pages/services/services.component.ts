import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { ServiceService } from "../../shared/services/service.service";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { Service, Opening } from "../../shared/models";
import { OpeningService } from "../../shared/services/opening.service";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Component({
    selector: "app-services",
    imports: [TitleCasePipe, AsyncPipe],
    standalone: true,
    template: `
        <main>
            <section>
                <h1 class="title">{{ title }}</h1>
                <h2>
                    Nous vous proposons une multitude de services afin de rendre
                    votre séjour plus agréable !
                </h2>
                <div class="schedule">
                    <p>Nous vous accueillons</p>
                    @for (opening of openToPublic$ | async ; track openToPublic$) {
                    <p>
                        du {{ opening.openingDay }} au
                        {{ opening.closingDay }}
                    </p>
                    <p>
                        De {{ opening.openingTime }} à
                        {{ opening.closingTime }}
                    </p>
                    }
                    <p>
                        Tous les jours de l'année
                        <span id="exception">(sauf cas exceptionnel)</span>
                    </p>
                </div>
            </section>
            <section class="services">
                @if(services && services.length) { @for (service of services;
                track service) {
                <div class="service-item">
                    <img
                        class="service-img"
                        [src]="this.url + service.image_url"
                        alt="photo representative du service {{
                            service.title
                        }}"
                    />
                    <div class="service-content">
                        <h3>{{ service.title | titlecase }}</h3>
                        <p>{{ service.description }}</p>
                    </div>
                </div>
                } } @else {
                <h3 class="no-services">
                    Il n'y a pas de service disponible !
                </h3>
                }
            </section>
        </main>
    `,
    styleUrls: [`./services.component.css`],
})
export class ServicesComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly serviceService = inject(ServiceService);
    private readonly openingService = inject(OpeningService);
    private readonly destroyRef = inject(DestroyRef);

    title: string = this.route.snapshot.data["title"];
    services!: Service[];
    url = `${environment.serverUrl}/upload/`;

    openToPublic$: Observable<Opening[]> = this.openingService.getOpeningToPublic()

    ngOnInit() {
        this.getServices();
    }

    // then required for exam
    getServices() {
        this.serviceService.getServices().then((response) => {
            this.services = response;
        });
    }
}
