a# The Book

A brief description of your project, including its purpose and main features.

## Table of Contents

- [Project Structure](#project-structure)
- [Server Setup](#server-setup)
  - [Mock Data Configuration](#mock-data-configuration)
  - [App Structure](#app-structure)
  - [List of Routes](#list-of-routes)


## Project Structure

This project is organized into two main folders: **server** and **client**.

- **server/**: Contains all backend-related code, including API routes, services, and configuration files.
- **client/**: Contains all frontend-related code, including components, styles, and routing.

## Server Setup

The server is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). Ensure you have the required dependencies installed and set up your environment.

### Mock Data Configuration

In this project, we have included mock data in the `server/config` folder to facilitate backend development.

#### Location

- **Path**: `server/config/data/import_dev-data.ts` 
  
This file contains predefined mock data that can be used to simulate responses from various endpoints in the server. 

#### Usage

To use the mock data in this application for insert data into database, follow these steps:

1. **Access the Docker Container**:
   First, you need to open a bash session in the Docker container running the backend. Use the following command:

   ```bash
   docker exec -it backend /bin/bash
2. **Navigate to the Mock Data Folder: Once you are inside the Docker container, change your directory to the folder containing the mock data. Run:**
    
    ```bash
    cd /app/src/config/data/import_dev-data.ts
3. **Import the Mock Data: Now, you can import the mock data into database. To do this, execute the following command:**

   ```bash
   npm run import_data
   ```


### App Structure

> _Note: files/folders

```bash
src
│   index.ts
│
├───application
│   ├───dtos
│   │   ├───auth
│   │   │       IAuthResponseDTO.ts
│   │   │       ILoginDTO.ts
│   │   │       IRegisterDTO.ts
│   │   │       IUserRegisterResponseDTO.ts
│   │   │       index.ts
│   │   │
│   │   ├───book
│   │   │       IBookDTO.ts
│   │   │
│   │   ├───genre
│   │   │       IGenreDTO.ts
│   │   │
│   │   ├───order
│   │   │       IOrderDetailDTO.ts
│   │   │       IOrderDTO.ts
│   │   │
│   │   ├───orderItems
│   │   │       IOrderItemsDTO.ts
│   │   │
│   │   └───user
│   │           IUserDTO.ts
│   │
│   ├───mappers
│   │       BookMapper.ts
│   │       GenreMapper.ts
│   │       OrderItemsMapper.ts
│   │       OrderMapper.ts
│   │       UserMapper.ts
│   │
│   ├───services
│   │   ├───api
│   │   │       BookService.ts
│   │   │       OrderService.ts
│   │   │       UserService.ts
│   │   │       index.ts
│   │   │
│   │   └───auth
│   │           AuthService.ts
│   │           JWTService.ts
│   │           PasswordService.ts
│   │           RoleService.ts
│   │           index.ts
│   │
│   └───use-cases
│       ├───auth
│       │       Login.ts
│       │       Register.ts
│       │       RefreshToken.ts
│       │       index.ts
│       │
│       ├───book
│       │       CreateBook.ts
│       │       GetAllBooks.ts
│       │       GetBook.ts
│       │       GetNewBooks.ts
│       │       GetTop5Books.ts
│       │       UpdateBooks.ts
│       │       index.ts
│       │
│       ├───order
│       │       CreateOrder.ts
│       │       GetAllOrders.ts
│       │       GetOrder.ts
│       │       index.ts
│       │
│       └───user
│               DeleteUser.ts
│               GetAllUsers.ts
│               UpdateUser.ts
│               index.ts
│
├───config
│   ├───data
│   │       import_dev-data.ts
│   │       index.ts
│   │
│   └───json
│           bookGenres.json
│           books.json
│           genres.json
│           users.json
│
├───domain
│   ├───entities
│   │       Book.ts
│   │       Genre.ts
│   │       Order.ts
│   │       OrderItems.ts
│   │       User.ts
│   │       UserRole.ts
│   │       index.ts
│   │
│   ├───exceptions
│   │   ├───errors
│   │   │       AuthenticationError.ts
│   │   │       AuthorizationError.ts
│   │   │       ConflictError.ts
│   │   │       DatabaseError.ts
│   │   │       LoginError.ts
│   │   │       NotFoundError.ts
│   │   │       RegisterError.ts
│   │   │       TokenError.ts
│   │   │
│   │       BaseError.ts
│   │       ErrorFactory.ts
│   │
│   └───interfaces
│       ├───entities
│       │       IBook.ts
│       │       IGenre.ts
│       │       IUser.ts
│       │       index.ts
│       │
│       ├───error
│       │       IErrorHandler.ts
│       │
│       ├───repositories
│       │       IBookRepository.ts
│       │       IUserRepository.ts
│       │       IRepository.ts
│       │       index.ts
│       │
│       ├───services
│       │       IBookService.ts
│       │       IRoleService.ts
│       │       index.ts
│       │
│       └───vendors
│               CustomJwtPayload.ts
│               IAuthenticatedUser.ts
│               IQueryParams.ts
│               IRequest.ts
│               IResponse.ts
│               index.ts
│
├───infrastructure
│   ├───models
│   │       BookGenreModel.ts
│   │       BookModel.ts
│   │       GenreModel.ts
│   │       OrderItemModel.ts
│   │       OrderModel.ts
│   │       UserModel.ts
│   │       index.ts
│   │
│   ├───repositories
│   │       BookRepository.ts
│   │       OrderItemsRepository.ts
│   │       OrderRepository.ts
│   │       UserRepository.ts
│   │       index.ts
│   │
│   └───services
│       └───auth
│           ├───passport
│           │       passport.ts
│           │
│           └───strategies
│                   googleStrategy.ts
│
├───inversify
│       inversify.config.ts
│       types.ts
│
├───presentation
│   ├───controllers
│   │   ├───api
│   │   │       BookController.ts
│   │   │       OrderController.ts
│   │   │       UserController.ts
│   │   │       index.ts
│   │   │
│   │   └───auth
│   │           LoginController.ts
│   │           LogoutController.ts
│   │           RegisterController.ts
│   │           index.ts
│   │
│   └───middlewares
│       ├───auth
│       │       JwtMiddleware.ts
│       │       ProtectMiddleware.ts
│       │       RolesMiddleware.ts
│       │
│       ├───cors
│       │       CORS.ts
│       │
│       ├───file
│       │       MulterMiddleware.ts
│       │
│       ├───http
│       │       HttpMiddleware.ts
│       │
│       ├───static
│       │       Statics.ts
│       │
│       │   index.ts
│       │   Kernel.ts
│
├───provider
│       App.ts
│       Database.ts
│       Express.ts
│
├───shared
│   │   Local.ts
│   │
│   └───utils
│           apiFeatures.ts
│           asyncHandler.ts
│
├───test
│       UserService.test.ts
│
└───types
        express.d.ts
```

# List of Routes

```sh
# Authentication Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  POST   | /api/v1/auth/signup
  POST   | /api/v1/auth/login
  POST   | /api/v1/auth/logout
  GET    | /auth/login/google
  GET    | /auth/google/callback
+--------+-------------------------+

# User Routes:

+--------+-------------------------+
  Method  | URI
+--------+-------------------------+
  POST    | /api/v1/users
  PATCH   | /api/v1/users/:userId
  DELETE  | /api/v1/users/:userId
+--------+-------------------------+

# Book Routes:

+--------+-------------------------+
  Method  | URI
+--------+-------------------------+
  GET     | /api/v1/books
  GET     | /api/v1/books/:bookId
  GET     | /api/v1/books/top5/month?minRating=4&limit=5
  POST    | /api/v1/books
  PATCH   | /api/v1/books/:bookId
  DELETE  | /api/v1/users/:userId
+--------+-------------------------+

# Order Routes:

+--------+-------------------------+
  Method  | URI
+--------+-------------------------+
  GET     | /api/v1/order
  GET     | /api/v1/order/:userId
  POST    | /api/v1/order
+--------+-------------------------+
```


