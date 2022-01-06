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
  - [x] It must be able to create a new book
  - [ ] It must be able to update book info
  - [ ] It must be able to delete a book
  - [x] It must be able to list all books
  - [x] It must be able to update book status

---

## Business Logic

### User
  - [x] It must not be able to create a user with an existing email
  - [x] It must hash user password before save on database
  - [x] It must be authenticated to show user info

### Book
  - [x] It must be able create a book with status "want_to_read" by default
  - [x] It must be able to filter the books by status
  - [x] It must be able to rate only read books
