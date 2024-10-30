# The Book

A brief description of your project, including its purpose and main features.

## Table of Contents

- [Project Structure](#project-structure)
- [Server Setup](#server-setup)
  - [Mock Data Configuration](#mock-data-configuration)


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
   ts-node -r tsconfig-paths/register src/config/data/import_dev-data.ts --import