import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";

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

  constructor(private postService: PostService) {
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
      },
      error: (error: any) => {
        console.error('Error fetching posts:', error);
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
    alert(`Clicked post`);
  }
}
