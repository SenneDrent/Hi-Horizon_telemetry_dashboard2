import { db } from "../dataBaseConnection";

export function getAllDataPointsFromAxes(x:string, y:string): any[] {
    try {
        const stmt = db.prepare("SELECT "+ x +","+ y +" FROM Data");
        const result = stmt.all();

        return result;
    } 
    catch (error) {
        console.log(error)
        return [];
    }
}