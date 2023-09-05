import { db } from "../dataBaseConnection";

export function fetchUser() {
    const stmt = db.prepare("SELECT * FROM User WHERE username = 'admin'");
    const result:any = stmt.get();

    let varConfig = {
        host: result.mqttBroker,
        port: 8883,
        protocol: 'mqtts',
        username: result.mqttUsername,
        password: result.mqttPassword
    }
    return varConfig;
}