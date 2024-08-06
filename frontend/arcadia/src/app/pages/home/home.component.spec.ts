import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './home.component'
import { ReviewsService } from './services/reviews.service'

describe('LoginComponent', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent, RouterModule, HttpClientModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: '24fkzrw3487943uf358lovd' } },
                    },
                },
                ReviewsService,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()

    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('return a number between 1 and 15', () => {
        const result = component.moreReview(1, 15)
        expect(result).toBeLessThanOrEqual(15)
        expect(result).toBeGreaterThanOrEqual(1)
    })
})
