import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ServiceHandledComponent } from "./service-handled.component";
import { ServiceService } from "../../../../../shared/services/service.service";
import { OpeningService } from "../../../../../shared/services/opening.service";
import { ImageService } from "../../../../../shared/services/image.service";

describe("ServiceHandledComponent", () => {
    let component: ServiceHandledComponent;
    let fixture: ComponentFixture<ServiceHandledComponent>;

    let serviceServiceMock: {
        getHandleServices: jest.Mock;
        addService: jest.Mock;
        deleteService: jest.Mock;
    }; // the mock value

    beforeEach(() => {
        // create an object that mock the method from ServicesService
        serviceServiceMock = {
            getHandleServices: jest.fn(),
            addService: jest.fn(),
            deleteService: jest.fn(),
        };

        TestBed.configureTestingModule({
            imports: [ServiceHandledComponent, RouterModule, HttpClientModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: "24fkzrw3487943uf358lovd" } },
                    },
                },
                ServiceService,
                OpeningService,
                ImageService,
            ],
        });

        fixture = TestBed.createComponent(ServiceHandledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return an empty array when there is NO data", () => {
        const services = component.datasource;
        serviceServiceMock.getHandleServices.mockReturnValue([]);
        fixture.whenStable().then(() => {
            expect(services).toEqual([]);
        });
    });

    it("should return a list when there is data", () => {
        const servicesMockValue = serviceServiceMock.getHandleServices.mockReturnValue([
            {
                id: "un",
                title: "restaurant",
                description: "plusieurs restaurants sur place",
                image_url: "restaurant.jpg",
            },
        ]);
        fixture.whenStable().then(() => {
            const services = component.datasource;
            expect(services).toEqual(servicesMockValue);
            expect(services.length).toEqual(1);
        });
    });

    it("should add service", () => {
        const newService = {
            id: "un",
            title: "restaurant",
            description: "plusieurs restaurants sur place",
            image_url: "restaurant.jpg",
        };
        serviceServiceMock.addService(newService);
        fixture.whenStable().then(() => {
            expect(component.datasource.length).toBeGreaterThanOrEqual(1);
        });
    });

    it("should delete service", () => {
        const newService = {
            id: "un",
            title: "restaurant",
            description: "plusieurs restaurants sur place",
            image_url: "restaurant.jpg",
        };
        serviceServiceMock.addService(newService);
        serviceServiceMock.deleteService(0);
        fixture.whenStable().then(() => {
            expect(component.datasource.length).toBeLessThan(1);
        });
    });
});
