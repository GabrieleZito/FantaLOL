FantaLol React Client
=====================
This is the front end client for the FantaLol project. It is a React application that connects to the FantaLol API to provide a user interface for the FantaLol platform.

## Getting Started
To get started with the client, you will need to have the API running. You can find the instructions to run the API in the API repository. Once the API is running, you can start the client by running the following commands:

```
npm install
npm start
```

This will start the client on `http://localhost:5173`.

## Development
The client is built using React. 
 - `react-router` for routing.
 - `tanstack query` with `axios` for http requests
 - `socket.io` for connecting with the server

 Styling:
 - `tailwind`
 - `shadcn` for pre-built components

## Deployment
The client is deployed on Vercel. The deployment is done automatically through Vercel's GitHub integration.
