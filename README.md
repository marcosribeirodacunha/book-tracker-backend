<h1 align="center">Book Tracker API</h1>
<h4 align="center">The Book Tracker helps people track the books they want to read.</h4>

<p align="center">
  <img alt="Most used language" src="https://img.shields.io/github/languages/top/marcosribeirodacunha/book-tracker-backend?style=flat">

  <img alt="GitHub" src="https://img.shields.io/github/license/marcosribeirodacunha/abc-gestao-de-exames">

  <img alt="ESlint" src="https://img.shields.io/badge/dynamic/json?color=4b32c3&label=eslint&query=%24.devDependencies.eslint&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fbook-tracker-backend%2Fmaster%2Fpackage.json&logo=eslint" />

  <img alt="Prettier" src="https://img.shields.io/badge/dynamic/json?color=f7b93e&label=prettier&query=%24.devDependencies.prettier&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fbook-tracker-backend%2Fmaster%2Fpackage.json&logo=prettier">

  <img alt="Code style: Airbnb" src="https://img.shields.io/badge/code%20style-airbnb-ff5a5f" />
</p>

<p align="center">
  <a href="#entity–relationship-diagram">ERD</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#routes">Routes</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#installation">Installation</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#configuring-environment-variables">Configuration</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#running-the-tests">Running the tests</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#running-the-api">Running the API</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#insomnia">Insomnia</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## Entity relationship diagram

<p><img src=".github/diagram.png" alt="Database diagram" width=100%></p>

You can also see the application requirements [here](app-requirements.md).

## Routes

| Endpoint          | Method   | Auth | Descrição                                                                   |
| ----------------- | -------- | ---- | --------------------------------------------------------------------------- |
| /                 | `GET`    | No   | API welcome message.                                                        |
| /users            | `POST`   | No   | Register a new user.                                                        |
| /users            | `POST`   | No   | Register a new user.                                                        |
| /me               | `GET`    | Yes  | Get authenticated user data.                                                |
| /session          | `POST`   | No   | Authenticate a user.                                                        |
| /books            | `POST`   | Yes  | Register a new book to the authenticated user.                              |
| /books            | `GET`    | Yes  | List all books to the authenticated user. User can filter by status[*](#*). |
| /books/:id        | `PATCH`  | Yes  | Update book data (title, author and rate[**](#**)).                         |
| /books/:id/status | `PATCH`  | Yes  | Update book status[\***](#***).                                             |
| /books/:id        | `DELETE` | Yes  | Delete a book.                                                              |

**Obs.:**

<p id="*"><b>*</b> The status optionally can be send via query string. The accepted status is: "<i>want_to_read</i>", "<i>reading</i>" or "<i>read</i>".</p>
<p id="**"><b>**</b> The rate can be send only when the actual status of the book is "<i>read</i>".</p>
<p id="***"><b>***</b> The path when updating the status is: "<i>want_to_read</i>" -> "<i>reading</i>" -> "<i>read</i>". When moving to "<i>read</i>" you can send a rate as well.</p>


## Installation

To clone and run this application you need to have installed the [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en/download/) (which also installs the [npm](https://www.npmjs.com/)). Then, in the command line:

```bash
# Clone the the repository
$ git clone https://github.com/marcosribeirodacunha/book-tracker-backend.git

# Open the repository folder
$ cd book-tracker-backend

# Install dependencies
$ npm install
// or yarn
```

## Configuring environment variables

Rename the file `.env.example` to `.env`.

- Insert into the variable `JWT_SECRET` a string to be used to generate the JWT token. It's recommended to be a random _md5 hash_. If you want, you can generate your _md5 hash_ [here](https://www.md5hashgenerator.com/).

Follow the steps below to finish setup of the environment variables.

### Database

This application uses as database the [Postgres](https://www.postgresql.org/). So, to configure the connection before running the _migrations_, follow the steps:

- Create a database with the same name as that in the `TYPEORM_DATABASE` inside the `.env` file;
- Add the database connection options in the variables below:
  - `TYPEORM_HOST`
  - `TYPEORM_PORT`
  - `TYPEORM_USERNAME`
  - `TYPEORM_PASSWORD`
  - `TYPEORM_DATABASE`

## Running the tests

```bash
$ npm run test
// or yarn test
```

## Running the API

After finish the step above, run the following commands in the CLI:

```bash
# Run the migrations
# Once all migrations are done, you don't need to run it again to start the server
$ npm run typeorm migration:run
// or yarn typeorm migration:run

# To run the application in the development environment
$ npm run dev
// or yarn dev
```

## Insomnia

To test the application using the [Insomnia](https://insomnia.rest/) app, click in the button below to create a workspace with the routes of the application.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Book%20Tracker%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fbook-tracker-backend%2Fmaster%2F.github%2FInsomnia_2022-01-06.json)

## Technologies

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## License

This project is under the MIT license. See the [LICENSE](LICENSE) to more details.
