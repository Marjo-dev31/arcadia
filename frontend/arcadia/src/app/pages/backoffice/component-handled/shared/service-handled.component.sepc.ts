import { ComponentFixture, TestBed} from "@angular/core/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ServiceHandledComponent } from "./service-handled.component";
import { ServiceService } from "../../../services/service/service.service";
import { OpeningService } from "../../../services/service/opening.service";

describe('ServiceService', () => {
  
    let component: ServiceHandledComponent;
    let fixture: ComponentFixture<ServiceHandledComponent>
    
    let service: ServiceService;
    let serviceServiceMock!: { getHandleServices: jest.Mock, addService: jest.Mock }; // the mock value

    beforeEach(() => {
      // create an object that mock the method from ServicesService
      serviceServiceMock = {
        getHandleServices: jest.fn(),
        addService: jest.fn()
      };
  
      TestBed.configureTestingModule({
        imports: [ServiceHandledComponent, RouterModule, HttpClientModule],
        providers: [{
            provide: ActivatedRoute,
            useValue: { snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}},
           }, ServiceService, OpeningService],
      });
  
        fixture = TestBed.createComponent(ServiceHandledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject(ServiceService);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
      });
  
    it('should return an empty array when there is NO data', () => {
        
        const services = component.datasource

        // set the return value of the mocking function
        serviceServiceMock.getHandleServices.mockReturnValue([]);
        expect(services).toEqual([]);
      });

    it('should return a list when there is data', ()=>{
      
      serviceServiceMock.getHandleServices.mockReturnValue([{id: 'un', title: 'restaurant', description: 'plusieurs restaurants sur place', image_url: 'restaurant.jpg'}]);
      fixture.whenStable().then(()=>{
        const services = component.datasource
        expect(services).toEqual([{id: 'un', title: 'restaurant', description: 'plusieurs restaurants sur place', image_url: 'restaurant.jpg'}]);
        expect(services.length).toEqual(1)
      })
    });

})