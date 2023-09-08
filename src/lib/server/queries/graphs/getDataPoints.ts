import { db } from "../dataBaseConnection";

export function getAllDataPointsFromAxes(x:FormDataEntryValue | null, y:FormDataEntryValue | null) {
    try {
        console.log(x)
        console.log(y)
        const stmt = db.prepare("SELECT "+ x +","+ y +" FROM Data");
        const result = stmt.all();

        return result;
    } 
    catch (error) {
        console.log(error)
        return undefined;
    }
}