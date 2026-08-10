# Student Management System

A full-stack Student Management System developed using **React.js** and **Laravel REST API** with JWT authentication and MySQL database.

The system provides secure student management functionality including authentication, CRUD operations, server-side pagination, searching, and bulk student dataset import.

---

## 1. Technologies Used

### Frontend

* React.js
* React Router
* Axios
* JavaScript
* Vite

### Backend

* Laravel 12
* PHP 8.2
* REST API
* JWT Authentication
* Eloquent ORM

### Database

* MySQL
* Database name: `student_crud_db`

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* XAMPP

---

## 2. Main Features

### Authentication

* User login
* JWT token-based authentication
* Protected student APIs
* Logout functionality

### Student Management

* Add student
* View students
* View individual student
* Edit student
* Delete student

### Search

Students can be searched by:

* Name
* Email
* Course

### Pagination

The backend uses Laravel server-side pagination.

Only 10 students are retrieved per page instead of loading the complete dataset into the browser.

### Dataset Import

The system includes a custom Laravel Artisan command for importing the Indian Students dataset.

The imported dataset contains:

* Total CSV rows: **19,955**
* Unique student records: **17,823**
* Duplicate rows skipped: **2,132**

Duplicate email addresses are skipped during import because the `students.email` column has a unique constraint.

---

## 3. Project Structure

```text
laravel-backend/
│
├── app/
│   ├── Console/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── AuthController.php
│   │       ├── Controller.php
│   │       └── StudentController.php
│   │
│   ├── Models/
│   │   ├── Student.php
│   │   └── User.php
│   │
│   └── Providers/
│
├── database/
│   ├── factories/
│   │   └── StudentFactory.php
│   │
│   ├── migrations/
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── routes/
│   ├── api.php
│   ├── console.php
│   └── web.php
│
├── public/
├── resources/
├── storage/
├── tests/
│
├── .env.example
├── artisan
├── composer.json
└── README.md
```

---

## 4. Backend Installation

Clone the project from GitHub and enter the Laravel backend directory.

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
copy .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure the database in `.env`.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=student_crud_db
DB_USERNAME=root
DB_PASSWORD=
```

Update the database username and password according to the local MySQL installation.

---

## 5. JWT Configuration

The application uses JWT authentication for API login.

If the JWT secret has not been generated, run:

```bash
php artisan jwt:secret
```

Do not share or commit the JWT secret.

---

## 6. Database Setup

Create the MySQL database:

```text
student_crud_db
```

Run migrations:

```bash
php artisan migrate
```

To seed test students using the factory:

```bash
php artisan db:seed
```

---

## 7. Running the Laravel Backend

Start the Laravel development server:

```bash
php artisan serve
```

The default backend URL is:

```text
http://127.0.0.1:8000
```

API base URL:

```text
http://127.0.0.1:8000/api
```

---

## 8. Student Dataset Import

The project contains a custom Artisan command:

```bash
php artisan students:import
```

This command imports the Indian Students dataset.

The command:

1. Reads the CSV dataset.
2. Processes each student record.
3. Checks for duplicate email addresses.
4. Inserts unique students.
5. Skips duplicate records.
6. Reports the import results.

Expected output for the current dataset:

```text
Total CSV rows: 19955
Unique students: 17823
Duplicate rows skipped: 2132
Import completed successfully.
```

### Important

The original CSV dataset is **not required to run the already-imported database**.

However, the dataset file is required if the import command needs to be executed again on another computer.

---

## 9. Frontend Setup

Open the React frontend project directory.

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The Vite development server will provide the frontend URL in the terminal.

---

## 10. API Endpoints

### Authentication

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/api/login`  | Login       |
| POST   | `/api/logout` | Logout      |

### Students

These endpoints require authentication.

| Method    | Endpoint             | Description     |
| --------- | -------------------- | --------------- |
| GET       | `/api/students`      | Get students    |
| POST      | `/api/students`      | Create student  |
| GET       | `/api/students/{id}` | Get one student |
| PUT/PATCH | `/api/students/{id}` | Update student  |
| DELETE    | `/api/students/{id}` | Delete student  |

---

## 11. Searching Students

The student API supports server-side searching.

Example:

```text
/api/students?search=python
```

Search is performed against:

* `name`
* `email`
* `course`

---

## 12. Pagination

The API returns 10 students per page.

Example:

```text
/api/students?page=1
```

Example response structure:

```json
{
    "current_page": 1,
    "data": [],
    "per_page": 10,
    "total": 17823,
    "last_page": 178
}
```

---

## 13. Important Database Information

The `students` table contains a unique constraint on email:

```text
students_email_unique
```

This prevents duplicate student email addresses.

The current database contains approximately:

```text
17,823 unique students
```

---

## 14. Development Workflow

Recommended workflow:

```text
1. Start MySQL
       ↓
2. Start Laravel API
       ↓
3. Start React frontend
       ↓
4. Login
       ↓
5. Manage students
```

For future code changes:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

---

## 15. Troubleshooting

### MySQL connection refused

If Laravel shows:

```text
SQLSTATE[HY000] [2002]
No connection could be made because the target machine actively refused it
```

make sure the MySQL service is running and that the `.env` database configuration is correct.

---

### Unauthenticated

If the API returns:

```json
{
    "message": "Unauthenticated."
}
```

make sure the user is logged in and that the JWT token is being sent with protected API requests.

---

### React cannot connect to Laravel

Make sure Laravel is running:

```bash
php artisan serve
```

and verify the API is available at:

```text
http://127.0.0.1:8000/api
```

---

## 16. Security Notes

Do not commit the following to GitHub:

* `.env`
* Database passwords
* JWT secrets
* API secrets
* Other private credentials

Use `.env.example` as the template for configuring a new environment.

---

## 17. Project Status

Current system status:

**Completed and tested**

Implemented functionality:

* Authentication
* JWT authorization
* Student CRUD
* Backend validation
* Search
* Server-side pagination
* Duplicate email protection
* Large dataset import
* Error handling
* Loading states
* Delete confirmation
* Git/GitHub version control

---

## 18. Author

**Muhammadu Nafais Shiyak**

Bachelor of Arts (Honours) in Information & Communication Technology

South Eastern University of Sri Lanka
