# Full-Stack React-Mongoose Posts Mini-app

This repository provides a full-stack JavaScript application with a React TypeScropt front-end and a backend powered by Node.js, Express and Mongoose. It includes registration and login functionality, as well as opportunuty to publish posts, edit or delete your own posts, and see other people's posts.

## Tech Stack
React + TypeScript: Renders and manages UI components.
Redux: For state management.
Axios: For making API calls.
Express: Handles routing and middleware.
MongoDB: Stores application data.
Mongoose: Simplifies MongoDB operations using schemas and models.

---

## Getting Started

Follow these steps to get the application running on your local machine for development and testing purposes.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anautomnee/full-stack-react-mongoose-mp1.git
   cd full-stack-react-mongoose-mp1
2. **Install packages**
   npm install
3. **Set Up MongoDB**
4. **Configure Environment Variables**
5. **Start the Application**
   ```bash
   npm run dev
   node app.js

## Application Overview
This project is structured into two main components:

### Backend
The backend is built using Express.js and Mongoose to manage the MongoDB database. It includes the following features:

RESTful API endpoints for CRUD operations.
Middleware for data validation and error handling.

| Method   | Endpoint           | Description                                        |
|----------|--------------------|----------------------------------------------------|
| `POST`   | `/auth/register`   | Register a new user in DB.                         |
| `POST`   | `/auth/login`      | Login a user by checking DB and giving jwt token.  |
| `POST`   | `/posts/`          | Create a new post in DB.                           |
| `GET`    | `/posts/`          | Get all posts from DB.                             |
| `PUT`    | `/posts/:id`       | Update post title or content if user is an author. |
| `DELETE` | `/posts/:id`       | Delete a post if user is an author.                |



###Frontend
The frontend is a React TypeScript application designed to interact with the backend through API calls in AsyncThunxs in Redux reducers. It is structured with reusable components and can be easily extended.

| Page             | Route             | Description                               |
|------------------|-------------------|-------------------------------------------|
| **Register**     | `/register`       | Register us a new user.                   |
| **Log in**       | `login`           | Log in as an existing user                |
| **Home**         | `/`               | Show all posts if user is logged in.      |
| **Create post**  | `/createpost`     | Create a new post with a form.            |

