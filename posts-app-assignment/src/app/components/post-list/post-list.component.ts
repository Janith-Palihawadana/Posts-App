import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  hasMore = true;
  page = 0;
  pageSize = 10;
  errorMessage: string = '';
  modalVisible = false;
  selectedPost: any;
  postComments :any[] = [];
  post: any;

  constructor(private postService: PostService,
  private router: Router) {
    this.getPosts();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(this.page,this.pageSize).subscribe({
      next: (response: any) => {
        console.log(response);
        this.posts = response.result;
        this.hasMore = response.next;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error fetching posts:', error);
        this.errorMessage = 'Failed to load posts. Please try again later.';
      }
    });
  }

  loadPosts() {
    if (this.hasMore){
      this.pageSize += 10;
      this.getPosts();
    }
  }

  viewPost(id: number): void {
    this.postService.getPost(id).subscribe({
      next: (response: any) => {
        this.selectedPost = response;
        this.postService.getComments(id).subscribe({
          next: (commentsResponse: any) => {
            this.postComments = commentsResponse;

            this.modalVisible = true;
            this.errorMessage = '';
          },
          error: (error: any) => {
            console.error('Error fetching comments:', error);
            this.errorMessage = 'Failed to load posts. Please try again later.';

          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching post:', error);
        this.errorMessage = 'Failed to load posts. Please try again later.';
      }
    });
  }

}
