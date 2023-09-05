import Database from 'better-sqlite3';

export const db = new Database('HiHorizonTelemetry.db', { fileMustExist: true });