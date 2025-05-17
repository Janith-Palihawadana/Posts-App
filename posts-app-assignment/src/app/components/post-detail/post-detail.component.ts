import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent{

  @Input() post!: { title: string; body: string; tags: string[]; created_at: string };
  @Input() comments: { author: string; comment: string }[] = [];
  @Output() close = new EventEmitter<void>();

}
