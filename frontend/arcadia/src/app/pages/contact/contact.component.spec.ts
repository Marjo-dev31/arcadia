import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MailService } from './services/mail.service';

describe('LoginComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let service: MailService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, RouterModule, HttpClientModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: {params: {id: "24fkzrw3487943uf358lovd"}, data: {title:'Contact'} }}
      }, MailService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service= TestBed.inject(MailService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count 2 input element ', ()=>{
    const formElement = fixture.debugElement.nativeElement.querySelector('#contactForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2)
  });

  it('should check initial form values are empty', ()=>{
    const contactForm = component.contactForm;
    const contactFormValues = {
        title: '',
        text: '',
        emailToResponse:''
    }
    expect(contactForm.value).toEqual(contactFormValues)
  })

  it('should check title value after entering some value and validation', ()=>{
    const contactFormTitleElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#contactForm').querySelectorAll('input')[0];
    contactFormTitleElement.value = 'Demande de renseignement';
    contactFormTitleElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
        const titleValue = component.contactForm.get('title');
        expect(contactFormTitleElement.value).toEqual(titleValue?.value);
        expect(titleValue?.errors).toBeNull()
    })
  })
});