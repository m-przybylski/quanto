import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MenuComponent } from './menu.component'
import { By } from '@angular/platform-browser'

describe('MenuComponent', () => {
  let component: MenuComponent
  let fixture: ComponentFixture<MenuComponent>
  let container

  describe('MenuComponent with real renderer', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [MenuComponent],
        }).compileComponents()
      }),
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(MenuComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      container = fixture.debugElement.query(
        By.css('.menu-dropdown-content-wrapper'),
      )
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })
    it('should dropdown be closed', () => {
      expect(container.nativeElement.offsetParent).toBeNull()
    })
    it('should dropdown be opened after toggle menu', () => {
      component.toggleMenu()
      expect(container.nativeElement.offsetParent).not.toBeNull()
      component.toggleMenu()
      expect(container.nativeElement.offsetParent).toBeNull()
    })
  })
})
