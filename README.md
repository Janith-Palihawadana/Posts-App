# 📰 Angular Post List App

An Angular application that displays a list of posts from a mock API. Users can view detailed post content and comments in a responsive, user-friendly layout.

## 📌 Features

- ✅ Fetch and display a paginated list of posts
- ✅ Load more posts on demand
- ✅ View post details in a modal window
- ✅ Fetch and display comments for each post
- ✅ Error handling for failed API requests
- ✅ Fully responsive design (mobile & desktop)

## 📁 Folder Structure

src/
└── app/
├── components/
│   └── post-list/
│       ├── post-list.component.ts
│       ├── post-list.component.html
│       ├── post-list.component.css
│   └── post-details/
│       ├── post-details.component.ts
│       ├── post-details.component.html
│       ├── post-details.component.css
├── services/
│   └── post.service.ts
├── app-routing.module.ts
└── app.module.ts


## 🧩 Components

### `PostListComponent`

- Displays a list of posts
- Handles pagination using `page` and `pageSize`
- Shows detailed view of post and its comments in a modal

### 🛠️ `PostService`

- `getPosts(page, pageSize)` – Returns a list of paginated posts
- `getPost(id)` – Returns details of a specific post
- `getComments(postId)` – Returns all comments for the selected post

---

## 🔄 Data Flow

1. On component init, the first batch of posts is fetched.
2. Clicking "Load More" increases `pageSize` and fetches additional posts.
3. Clicking a post fetches full post details and associated comments.
4. Post and comments are shown in a modal dialog.

---

## 🧪 Unit Testing
We use Angular's default testing setup with Karma.

### Run all unit tests

ng test

#### This command will:

Launch a browser window

Run all unit tests

Watch for file changes and re-run tests automatically

### Test Files Location
Test files are located next to the component files and end with .spec.ts, for example:

post-list.component.spec.ts

post-detail.component.spec.ts

### These files test:

Component creation

Service interactions

Error handling

UI behavior

## ✅ TODO / Improvements
Add search and filter options

Implement infinite scroll

Add loading spinners and skeleton loaders

Add integration tests