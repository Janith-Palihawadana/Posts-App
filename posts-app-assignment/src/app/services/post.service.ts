import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient ,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: any[] = [];

  constructor(private http: HttpClient) {}

  getPosts($page: number , $pageSize: number): Observable<{ next: boolean; result: any[] }> {
    return this.http.get<any[]>('/assets/data/posts.json', {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      })
    }).pipe(
      map((data: any[]) => {
        this.posts = data;
        const start = $page * $pageSize;
        const result = this.posts.slice(start, start + $pageSize);
        const next = start + $pageSize < this.posts.length;
        return { next, result };
      })
    );
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any[]>('/assets/data/posts.json', {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      })
    }).pipe(
      map((posts: any[]) => posts.find(post => post.id === id))
    );
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>('/assets/data/comments.json',
      {
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        })
      }).pipe(
      map((comments: any[]) => comments.filter(comment => comment.postId === postId))
    );
  }
}
