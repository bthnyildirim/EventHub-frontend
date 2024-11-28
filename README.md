# EventHub Frontend

This repository contains the **frontend code** for the EventHub project, built using **React.js**. The frontend is responsible for the user interface of the application, including event browsing, account management, and interactions with the backend API.

The backend code for this project can be found [here](https://github.com/bthnyildirim/EventHub-backend).

## Description

EventHub is a web application designed to connect event organizers and fans. Users can browse, create, edit, and manage events and venues through an intuitive interface.

### Key Features:

- Browse upcoming events with details like time, location, and pricing.
- Create and manage events and venues for organizers.
- User registration and login (organizers and fans).
- Dynamic interaction with a backend API.

## Instructions to Run This App Locally

### 1. Clone the repository:

```bash
git clone https://github.com/bthnyildirim/EventHub-frontend.git
```

### 2.Navigate to the project directory:

```bash
cd EventHub-frontend
```

### 3.Install dependencies:

```bash
npm install
```

### 4.Create a .env file in the root directory

Add the following environment variables:

```bash
VITE_API_URL=<http://localhost:5005>
```

### 5.Run the application

```bash
npm run dev
```

The application should now be running at http://localhost:5173.

## DEMO

- Live Frontend Demo can be found [here](https://eventhub-project.netlify.app).

For the backend repository and API details, visit the EventHub Backend repository.

---
