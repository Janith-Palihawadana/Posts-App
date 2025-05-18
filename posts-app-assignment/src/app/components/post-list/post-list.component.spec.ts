import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../services/post.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  template: ''
})
class MockPostDetailComponent {
  @Input() post: any;
  @Input() comments: any;
  @Output() close = new EventEmitter<void>();
}

class MockPostService {
  getPosts(page: number, pageSize: number) {
    return of({ result: [{ id: 1, title: 'Test Post', body: 'Test Body' }], next: false });
  }

  getPost(id: number) {
    return of({ id, title: 'Single Post', body: 'Post Body' });
  }

  getComments(id: number) {
    return of([{ id: 1, body: 'Comment Body' }]);
  }
}
describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent, MockPostDetailComponent],
      providers: [
        { provide: PostService, useClass: MockPostService },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    spyOn(postService, 'getPosts').and.callThrough();
    component.ngOnInit();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBeGreaterThan(0);
  });

  it('It should show an error message when loading posts fails.', () => {
    spyOn(postService, 'getPosts').and.returnValue(throwError(() => new Error('Error')));
    component.getPosts();
    expect(component.errorMessage).toBe('Failed to load posts. Please try again later.');
  });

  it('should load more posts when loadPosts function runs', () => {
    component.hasMore = true;
    spyOn(component, 'getPosts');
    component.loadPosts();
    expect(component.pageSize).toBe(20);
    expect(component.getPosts).toHaveBeenCalled();
  });

  it('should get the post and its comments when viewPost() is called.', () => {
    spyOn(postService, 'getPost').and.callThrough();
    spyOn(postService, 'getComments').and.callThrough();
    component.viewPost(1);
    expect(postService.getPost).toHaveBeenCalledWith(1);
    expect(postService.getComments).toHaveBeenCalledWith(1);
    expect(component.modalVisible).toBeTrue();
  });

  it('should handle error in getPost()', () => {
    spyOn(postService, 'getPost').and.returnValue(throwError(() => new Error('Error')));
    component.viewPost(1);
    expect(component.errorMessage).toBe('Failed to load posts. Please try again later.');
  });

  it('should handle error in getComments()', () => {
    spyOn(postService, 'getPost').and.returnValue(of({ id: 1 }));
    spyOn(postService, 'getComments').and.returnValue(throwError(() => new Error('Error')));
    component.viewPost(1);
    expect(component.errorMessage).toBe('Failed to load posts. Please try again later.');
  });
});
