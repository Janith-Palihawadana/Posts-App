import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { By } from '@angular/platform-browser';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;


    component.post = {
      title: 'Test Post',
      body: 'This is a test body.',
      tags: ['angular', 'unit-test'],
      created_at: '2023-01-01T00:00:00Z'
    };

    component.comments = [
      { author: 'Alice', comment: 'Great post!' },
      { author: 'Bob', comment: 'Thanks for sharing!' }
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display post title and body', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Post');
    expect(compiled.querySelector('p')?.textContent).toContain('This is a test body.');
  });

  it('should display tags and date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Tags: angular,unit-test');
    expect(compiled.textContent).toContain('Date:');
  });

  it('should list all comments', () => {
    const commentElements = fixture.debugElement.queryAll(By.css('.comment'));
    expect(commentElements.length).toBe(2);
    expect(commentElements[0].nativeElement.textContent).toContain('Alice');
    expect(commentElements[1].nativeElement.textContent).toContain('Bob');
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should show "No comments available" when comments list is empty', () => {
    component.comments = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No comments available.');
  });
});
