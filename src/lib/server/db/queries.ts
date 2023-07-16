import Database from 'better-sqlite3';
import { error } from '@sveltejs/kit';
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