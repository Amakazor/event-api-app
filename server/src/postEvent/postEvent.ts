import { Request } from 'express';
import { addEvent, closeDatabase, openDatabase, setupDatabaseIfEmpty } from '../utility/databaseInterface';
import validateEmail from '../utility/emailValidator';
import validateTimestamp from '../utility/timestampValidator';

export const errors = {
    firstNameMissing: 'Field "firstName" missing in request',
    lastNameMissing: 'Field "firstName" missing in request',
    emailMissing: 'Field "firstName" missing in request',
    dateMissing: 'Field "firstName" missing in request',
    malformedEmail: 'Malformed email field',
    malformedDate: 'Malformed date field',
};

const validatePostEvent = (postEvent: any): boolean | string => {
    if (!postEvent.firstName) return errors.firstNameMissing;
    if (!postEvent.lastName) return errors.lastNameMissing;
    if (!postEvent.email) return errors.emailMissing;
    if (!postEvent.date) return errors.dateMissing;
    if (!validateEmail(postEvent.email as string)) return errors.malformedEmail;
    if (!validateTimestamp(postEvent.date as string)) return errors.malformedDate;
    return true;
};

const handlePostEventPostRequest = (request: Request, temporary: boolean = false): boolean | string => {
    const postEvent = request.body;

    const validadationResult = validatePostEvent(postEvent);

    if (validadationResult === true) {
        const db = openDatabase(temporary);
        if (temporary) {
            setupDatabaseIfEmpty(db);
        }
        addEvent(db, postEvent as postEvent);
        closeDatabase(db);

        return true;
    }
    return validadationResult;
};

export default handlePostEventPostRequest;
