<p align="center">
  <img src=".github/diagram.png" alt="Database diagram">
</p>

## Functional Requirements

### User
  - [x] It must be able create a new user
  - [x] It must be able to show user info

### Session
  - [x] It must be able to authenticate an user

### Books
  - [ ] It must be able to create a new book
  - [ ] It must be able to update book info
  - [ ] It must be able to delete a book
  - [ ] It must be able to list all books
  - [ ] It must be able to update book status

---

## Business Logic

### User
  - [x] It must not be able to create a user with an existing email
  - [x] It must hash user password before save on database
  - [x] It must be authenticated to show user info

### Book
  - [ ] It must be able to filter the books by status
  - [ ] It must be able to rate only read books
