import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaginator } from './user-paginator';

describe('UserPaginator', () => {
  let component: UserPaginator;
  let fixture: ComponentFixture<UserPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPaginator],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPaginator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
