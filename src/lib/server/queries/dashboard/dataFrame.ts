import { db } from "../dataBaseConnection";

export function fetchLatestData() {
    const stmt = db.prepare("SELECT * FROM Data where UnixTime = (SELECT max(UnixTime) FROM Data)");
    const result = stmt.get();

    return result;
}