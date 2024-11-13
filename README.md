# Song Application

A MERN stack application for managing and displaying songs by genre and artist. This application allows users to add, update, and view songs. The frontend is powered by React with Redux for state management, while Redux Saga is used to handle asynchronous API calls. The backend is built with Node.js, Express, and MongoDB. The application is Dockerized and deployed on **Netlify** (frontend) and **Render** (backend). You can access the application here.

[Go to the App](https://song-management.netlify.app/) 

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)


## Features

- **Song Management**: Add, update, and view songs categorized by genre and artist.
- **State Management**: Uses Redux to manage app-wide state and Redux Saga for handling API calls.
- **User-friendly Interface**: Designed with React.js for dynamic rendering.
- **Deployment**: Dockerized for containerized deployment on Netlify and Render.

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB**

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/getye/MERN-Song-App.git

2. **Navigate into the project directory**:
   ```bash
   cd MERN-Song-App

3. **Install dependencies**:
   ```bash
   npm install

4. **Start the application**:
   ```bash
   npm start

5. **Access the application:**: Open your browser and go to http://localhost:3000.

## Usage
- **View Songs**: Browse songs by genre and artist.
- **Add and Update Songs**: Authorized users can add new songs or update existing ones.

## Technologies Used
### Frameworks
- **React.js**: Frontend framework for building dynamic user interfaces.
- **Node.js**: Server-side runtime environment.
- **Express.js**: Backend framework for creating RESTful APIs.

### Tools
- **MongoDB**: NoSQL database for storing song data.
- **Redux**: State management library.
- **Redux Saga**: Middleware for handling side effects in Redux.
- **Docker**: For containerizing the application for deployment.
- **TypeScript**: Used for static typing in parts of the project.

## Deployment
- **Frontend**: Deployed on Netlify.
- **Backend**: Deployed on Render.
- **Docker**: Used to Dockerize the application for simplified deployment and scaling.