# PLAN UP

PlanUp is a collaborative single-page application designed to streamline group travel planning. Users can create and share itineraries with friends, adding locations, activities, and notes for specific days. The app allows users to suggest activities, vote on options, and leave comments, fostering real-time collaboration.

The app dynamically loads trip details and activities as users navigate through the interface, ensuring smooth performance. Notifications keep everyone updated on changes or new suggestions.

## Prerequisites

Before running PlanUp, ensure you have the following installed on your system:

- Node.js
- MongoDB
- npm (Node Package Manager)

## How to run PlanUp server

1. Navigate to the server folder.
2. Before starting the server, you need to run MongoDB with a specified database path and port. Open a terminal and run the following command: `mongod --dbpath ./db --port 6000 --bind_ip 127.0.0.1`
3. After MongoDB is running, start the server by running: `npm run dev`

## How to run PlanUp client

1. Navigate to the client folder.
2. Start the client by running: `npm start`

-- by André Louro <small>2021232388</small> & Maria Rosa <small>2021220277</small>--
