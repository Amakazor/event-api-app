import { addEvent, closeDatabase, getEvents, openDatabase, setupDatabaseIfEmpty } from '../utility/databaseInterface';

describe('Database interface', () => {
    it('Opens and closes database', () => {
        const db = openDatabase(true);
        closeDatabase(db);
    });

    it('Creates event table if none exists', () => {
        const tableExists = [];

        const db = openDatabase(true);
        tableExists.push(setupDatabaseIfEmpty(db));
        closeDatabase(db);

        expect(tableExists).toEqual([true]);
    });

    it("Doesn't create event table if it exists", () => {
        const tableExists = [];

        const db = openDatabase(true);
        tableExists.push(setupDatabaseIfEmpty(db));
        tableExists.push(setupDatabaseIfEmpty(db));
        closeDatabase(db);

        expect(tableExists).toEqual([true, false]);
    });

    it('Stores event', () => {
        const postEvent: postEvent = {
            firstName: 'TestName',
            lastName: 'TestNameSecond',
            date: 123456789,
            email: 'test@test.test',
        };

        const db = openDatabase(true);
        setupDatabaseIfEmpty(db);
        addEvent(db, postEvent);
        const events = getEvents(db);
        closeDatabase(db);

        expect(events).toEqual([postEvent]);
    });
});
