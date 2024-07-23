import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterModule, HttpClientModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: {params: {id: "24fkzrw3487943uf358lovd"}, data: {title:'Connexion'} }}
      }, LoginService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service= TestBed.inject(LoginService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count 2 element ', ()=>{
    const formElement = fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2)
  });

  it('should check initial form values are empty', ()=>{
    const loginForm = component.user;
    const loginFormValues = {
        email: '',
        password: ''
    }
    expect(loginForm).toEqual(loginFormValues)
  })
});
