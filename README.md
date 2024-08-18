# Exam #2: "Car Configurator"
## Student: sXXXXXX PRIVACY REDACTED

## React Client Application Routes

- Route `/`: Home page, shows the list of all the accessories, with price and current availability
- Route `/login`: Login form, allows users to login. After a successful login, the user is redirected to the configurator route (`/configurator`).
- Route `/configurator`: List of car models and accessories, with the selected configuration on the right
- Route `*`: Page for nonexisting URLs (_Not Found_ page) that redirects to the home page.

## API Server

* **GET `/api/caraccessories`**: Get all the car models and accessories

* **GET `/api/configuration`**: Get saved configuration of the authenticated user (if Exists)

* **DELETE `/api/configuration`**: Delete the configuration of the authenticated user

* **POST `/api/configuration`** : Edit saved configuration of the authenticated user

* **GET `/api/auth-token`**: Returns an auth token the logged in user.

  

### Authentication APIs

* **POST `/api/login`**: Authenticate and login the user.
  - **Request**: JSON object with _username_ equal to email:   
    ```
    { "username": "a@p.it", "password": "password" }
    ```
  - **Response body**: JSON object with the student's info and, if the user has a study plan, studyPlan; or a description of the errors:   
    ```
    { "email": "a@p.it", "name": "Luigi Verdi",
      "fullTime": false,
      "studyPlan": [ "01OTWOV", "01URSPD", "01NYHOV", "01TYMOV", "01SQJOV" ] }
    ```
  - Codes: `200 OK`, `401 Unauthorized` (incorrect email and/or password), `400 Bad Request` (invalid request body), `500 Internal Server Error`.


* **DELETE `/api/session`**: Logout the user.
  - Codes: `200 OK`, `401 Unauthorized`.

* **GET `/api/current-user`**: Get info on the logged in user.
  - Codes: `200 OK`, `401 Unauthorized`, `500 Internal Server Error`.
  - **Response body**: JSON object with the same info as in login:   
    ```
    { "email": "a@p.it", "name": "Luigi Verdi",
      "fullTime": false,
      "studyPlan": [ "01OTWOV", "01URSPD", "01NYHOV", "01TYMOV", "01SQJOV" ] }
    ```

## API Server2

* **POST `/api/stats`** : Returns the average percentage for the requested courses.
  - **Request Headers**: JWT token with fullTime flag  
  - **Request**: JSON object with a list of course codes   
    ```
    { "courses": [ "01NYHOV", "01OTWOV" ] }
    ```
  - **Response body**: EJSON object with the percentage
    ```
    { "successRate": 10.0216 }
    ```
  - Codes: `200 OK`, `401 Unauthorized`, `400 Bad Request` (invalid request body).


## Database Tables

- Table `users`: _user_id_, _email_, _hash_, _salt_, _good_client_  
 _good_client_ : good customers have a reduced production time (0: not good customer, 1: good customer)
- Table `cars`: _car_id_, _kw_, _price_, _max_accessories_  
 _max_accessories_: maximum number of accessories that can be selected for the car
- Table `accessories`: _accessory_id_, _name_, _price_, _availability_, _requires_  
_requires_: id of the accessory required to select it
- Table `configuration`: _user_id_, _car_id_, _accessory_id_    
Table to save the configuration of the authenticated user. A row of this table means that the accessory of the selected car model is in the configuration


## Main React Components

- `Main` (in `App.js`): technically a component, takes the role of App and is rendered inside a Router to be able to use the useNavigate hook. This maintains most of the state of the app.
- `HomePage` (in `App.js`): proper home page, contains the list of courses and, when a student is logged in, their study plan as well. This component injects all the Contexts used throughout the app with their respective values.
- `CourseList` (in `CourseList.js`): the list of all courses. It is a wrapper around a Bootstrap Accordion component.
- `CourseItem` (in `CourseList.js`): a single course in the CourseList. When collapsed it shows the course's code, name, credits and current and maximum number of students. It can be expanded to reveal the course's constraints. When in a study plan editing session, this puts a small round button next to the accordion item to add/remove the course to/from the study plan, and is responsible for checking if doing so is valid.
- `CourseItemDetails` (in `CourseList.js`): the body of a CourseItem's accordion item. Shows the course's constraints as _CourseCodeHoverables_ and, during a study plan editing session, if the corresponding course can not be added or removed, it shows the reason.
- `StudyPlan` (in `StudyPlan.js`): when a student is logged in, this renders their study plan as a toolbar plus list of courses (or just the toolbar if no study plan has been created yet), and allows them to edit it.
- `Toolbar` (in `StudyPlan.js`): shows important information on the current study plan (like the number of credits) and the buttons that the student can use to save the changes, discard them, or delete the study plan altogether.
- `StudyPlanList` (in `StudyPlan.js`): the proper list of courses in the study plan (as a Bootstrap ListGroup component).
- `LoginForm` (in `LoginForm.js`): the login form that students can use to login into the app. This is responsible for the client-side validation of the login credentials (valid email and non-empty password).

## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials

| email | password | name | career type |
|-------|----------|------|-------------|
| s123456@studenti.polito.it | password | Mario Rossi | full-time |
| a@p.it | password | Luigi Verdi | part-time |
| b@p.it | password | Maria Bianchi | part-time |
| c@p.it | password | Francesca Neri | full-time |
| d@p.it | password | John Doe | none |