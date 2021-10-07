import path from 'path';
import BetterSqlite3, { Database } from 'better-sqlite3';

export const openDatabase = (temporary: boolean = false) => new BetterSqlite3(!temporary ? path.resolve('database/events.sqlite') : '');

export const closeDatabase = (db: Database) => db.close();

export const addEvent = (db: Database, event: postEvent) => {
    db.prepare('INSERT INTO event(firstName, lastName, email, date) VALUES(@firstName, @lastName, @email, @date)').run({
        ...event,
    });
};

export const getEvents = (db: Database) =>
    db
        .prepare('SELECT * FROM event')
        .all()
        .map(row => ({
            ...row,
            date: Number.parseInt(row.date, 10),
        }));

export const setupDatabaseIfEmpty = (db: Database) => {
    const tableExists = db.prepare("SELECT count(*) as `count` FROM sqlite_master WHERE type='table' AND name='event';").get().count > 0;
    if (!tableExists) {
        db.prepare('CREATE TABLE event(firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, date TEXT NOT NULL)').run();
    }

    return !tableExists;
};
