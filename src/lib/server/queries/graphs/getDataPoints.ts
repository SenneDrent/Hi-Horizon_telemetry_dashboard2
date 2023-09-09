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

//returns a table in a two-dimensional array with columnnames
export function getDataTableWithRange(min:number = 0, max:number = Number.MAX_SAFE_INTEGER): any[] {
    try {
        const stmt = db.prepare("SELECT * FROM Data where UnixTime >= ? AND UnixTime <= ?");
        const result = stmt.columns().map((column:any) => column.name);
        const test = stmt.raw(true).all(min, max);
        return [result, ...test];
    } 
    catch (error) {
        console.log(error)
        return [];
    }
}