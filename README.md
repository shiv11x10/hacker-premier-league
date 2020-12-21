# HackerPremierLeague

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

# Deployed with AWS
Frontend is deployed in S3 bucket and backendis deployed with AWS Beanstalk
Web link: [http://hacker-premier-league.s3-website.ap-south-1.amazonaws.com/](http://hacker-premier-league.s3-website.ap-south-1.amazonaws.com/)

# Database Deployment
Database is depolyed in MongoDB

# Recreate Application in local server

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Chnage the apiUrl in environment.js to `http://localhost:4200/`
- backend server with npm run start:server after changing the MongoDb URI to your own in server.js


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
