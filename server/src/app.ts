import cors from 'cors';
import express from 'express';
import path from 'path';
import { closeDatabase, openDatabase, setupDatabaseIfEmpty } from './utility/databaseInterface';
import handlePostEventPostRequest from './postEvent/postEvent';

const createApp = (temporaryDatabase: boolean = false) => {
    // Setup
    const app = express();
    const db = openDatabase(temporaryDatabase);
    setupDatabaseIfEmpty(db);
    closeDatabase(db);

    // CORS
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Serving React
    app.use(cors());
    app.use(express.static(path.join(__dirname, '..', '..', 'build')));
    app.use(express.static('public'));

    // API Endpoint
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.post('/api/v1/event', (request, response) => {
        const output = handlePostEventPostRequest(request, temporaryDatabase);
        if (output === true) {
            response.statusCode = 200;
            response.send('');
        } else {
            response.statusCode = 400;
            response.send(output);
        }
    });

    return app;
};

export default createApp;
