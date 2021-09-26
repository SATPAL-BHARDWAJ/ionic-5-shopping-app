import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductFilterPage } from './product-filter.page';

describe('ProductFilterPage', () => {
  let component: ProductFilterPage;
  let fixture: ComponentFixture<ProductFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
