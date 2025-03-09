# CAD Viewer Project

This is a web-based CAD viewer built using React (frontend), Three.js (for 3D rendering), and Flask (backend). It allows users to upload, view, and manipulate 3D models like STL and OBJ files directly in the browser.

## Features
- Upload 3D model files (STL/OBJ).
- View and manipulate 3D models in the browser.
- Basic controls for rotating, zooming, and panning the model.

## Prerequisites

Before you start, you’ll need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (for the frontend)
- [Python](https://www.python.org/downloads/) (for the backend)
- [pip](https://pip.pypa.io/en/stable/) (for Python package management)
- [Flask](https://flask.palletsprojects.com/en/2.2.x/) (for backend API)

## Setting Up the Project

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/arshadshaik0000/cad-viewer.git
cd cad-viewer
2. Set up the Backend
The backend is built using Flask. To set it up:

Navigate to the backend directory:

bash
Copy
Edit
cd backend
Create a virtual environment (optional but recommended):

bash
Copy
Edit
python -m venv venv
Activate the virtual environment:

On Windows:
bash
Copy
Edit
.\venv\Scripts\activate
On macOS/Linux:
bash
Copy
Edit
source venv/bin/activate
Install the required Python dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the backend server:

bash
Copy
Edit
python app.py
The backend server will now be running at http://127.0.0.1:5000.

3. Set up the Frontend
The frontend is built using React and Three.js. To set it up:

Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Install the required Node.js dependencies:

bash
Copy
Edit
npm install
Run the frontend development server:

bash
Copy
Edit
npm start
This will start the frontend server at http://localhost:3000.

4. Accessing the Application
Once both the frontend and backend are running:

Open your browser and navigate to http://localhost:3000.
Upload a 3D model file (STL/OBJ).
You should now be able to view and manipulate the model in the browser.
Troubleshooting
If you encounter any issues related to missing dependencies or errors while running the project, make sure to check that all dependencies are installed correctly (pip install -r requirements.txt for the backend and npm install for the frontend).
If the server is not running correctly, make sure that both the Flask backend and the React frontend are running concurrently.
License
This project is licensed under the MIT License - see the LICENSE file for details.

vbnet
Copy
Edit

### Changes:
- **Export functionality section removed**: The export feature (STL to OBJ conversion) is no longer mentioned in the README, as it hasn't been implemented.
- The rest of the instructions are the same for setting up the project and running it.

Once you've updated the `README.md`, commit and push the changes:

```bash
git add README.md
git commit -m "Updated README without export functionality section"
git push origin main
