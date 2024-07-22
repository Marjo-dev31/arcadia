import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceService } from "./service/service.service";
import { ServicesComponent } from "./services.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OpeningService } from "./service/opening.service";

describe('ServiceService', () => {
  
    let component: ServicesComponent;
    let fixture: ComponentFixture<ServicesComponent>
    
    let service: ServiceService;
    let serviceServiceMock!: { getServices: jest.Mock}; // the mock value

    beforeEach(() => {
      // create an object that mock the method from ServicesService
      serviceServiceMock = {
        getServices: jest.fn()
      };
  
      TestBed.configureTestingModule({
        imports: [ServicesComponent, RouterModule, HttpClientModule],
        providers: [{
            provide: ActivatedRoute,
            useValue: { snapshot: {params: {id: '24fkzrw3487943uf358lovd'}, data : {title: 'Services'}}},
           }, ServiceService, OpeningService],
      });
  
        fixture = TestBed.createComponent(ServicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject(ServiceService);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
      });
  
    it('should return an empty array when there is NO data', () => {
        
        const services = component.services
        // set the return value of the mocking function
        serviceServiceMock.getServices.mockReturnValue([]);
        expect(services).toEqual([]);
      });

    it('should return a list when there is data', ()=>{
      const servicesMock = [
        {id: 'un', title: 'restaurant', description: 'plusieurs restaurants sur place', image_url: 'restaurant.jpg'},
        {id: 'deux', title: 'visite', description: 'visite guidée', image_url: 'visite.jpg'}
      ]

      serviceServiceMock.getServices.mockReturnValue(servicesMock);
      fixture.whenStable().then(()=>{
        const services = component.services
        expect(services).toEqual(servicesMock);
        expect(services.length).toEqual(servicesMock.length)
      })
    });

})