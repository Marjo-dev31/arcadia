import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule, RouterOutlet, RouterModule,  MatDialogModule, 
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule],
        providers: [{
          provide: ActivatedRoute,
          useValue: { snapshot: {params: {id: "24fkzrw3487943uf358lovd"}}}
        }]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'arcadia' title`, () => { 
    expect(component.title).toEqual('arcadia');
  });

});