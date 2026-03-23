# Person Management System (Full-Stack Docker)

This is a complete full-stack web application for managing people records, containerized with Docker for easy setup.

## Technologies Used
* **Frontend:** React (JavaScript), React Router, Axios
* **Backend:** Node.js, Express API
* **Database:** PostgreSQL
* **Containerization:** Docker & Docker Compose

## Prerequisites
* Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your machine.
* (Optional) Make sure you have `git` installed to push to GitHub.

## How to Run the Project

1.  **Open your terminal** and navigate into the main `person-management-system` folder.
2.  **Verify the environment file:** Ensure `.env.example` exists. Docker Compose is set up to use default values if you don't create a `.env` file, so no further configuration is necessary for a default setup.
3.  **Start the containers:** Run the following single command to build the images and start the services:

    ```bash
    docker compose up --build
    ```
4.  **Access the application:** Once the containers are running, open your web browser and go to:
    * **Frontend (Application):** [http://localhost:3000](http://localhost:3000)
    * **Backend (API):** [http://localhost:5000/api/people](http://localhost:5000/api/people)

5.  **To stop the application:** Press `Ctrl+C` in the terminal running Docker, or run `docker compose down` in another terminal window within the project folder.

---

## Project Structure Explained

* **/** (Root Folder)
    * `docker-compose.yml`: Defines the `db`, `backend`, and `frontend` services and how they interact.
    * `.env.example`: Template for environment variables.
* **/db**
    * `init.sql`: Script used to automatically create the database table on the first run.
* **/backend**
    * `Dockerfile`: Build instructions for the Node.js API.
    * `/src/index.js`: Express server, database connection logic, and CRUD endpoints.
* **/frontend**
    * `Dockerfile`: Build instructions for the React application.
    * `/src`: React source code (components, App router, API calls).
