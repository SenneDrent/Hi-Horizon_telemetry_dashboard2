import Database from 'better-sqlite3';
import { error } from '@sveltejs/kit';
import { io } from 'socket.io-client';

export const db = new Database('HiHorizonTelemetry.db', { fileMustExist: true });

export function fetchUser() {
    const stmt = db.prepare("SELECT * FROM User WHERE username = 'admin'");
    const result = stmt.get();

    let varConfig = {
        host: result.mqttBroker,
        port: 8883,
        protocol: 'mqtts',
        username: result.mqttUsername,
        password: result.mqttPassword
    }
    return varConfig;
}

export function fetchLatestData() {
    const stmt = db.prepare("SELECT * FROM Data where UnixTime = (SELECT max(UnixTime) FROM Data)");
    const result = stmt.get();

    return result;
}

export async function fetchReadStatisticsTypes() {
    const stmt = db.prepare("SELECT * FROM ReadStatisticTypes");
    const result = stmt.all();

    return result;
}