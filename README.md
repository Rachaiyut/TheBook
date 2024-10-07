# Project Title

A brief description of your project, including its purpose and main features.

## Table of Contents

- [Project Structure](#project-structure)
- [Server Setup](#server-setup)
  - [Mock Data Configuration](#mock-data-configuration)
- [Client Setup](#client-setup)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

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

To use the mock data in this application, follow these steps:

1. **Import the Mock Data**: 
   You can import the mock data in your server routes or services where needed. For example:

   ```bash
   ts-node server/config/data/import_dev-data.ts --import
