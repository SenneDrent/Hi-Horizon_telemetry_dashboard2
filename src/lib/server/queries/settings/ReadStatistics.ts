import type { ReadStatisticType } from "$lib/interfaces/ReadStatisticType";
import type { SettingsLocalChange } from "$lib/interfaces/SettingsLocalChange";
import { db } from "../dataBaseConnection";

export function parseOperationReadStatistic(change: SettingsLocalChange) {
    switch (change.operation) {
        case "Add":
            addReadStatisticsType(change.structure);
            break;
        case "Delete":
            deleteReadStatisticsType(change.structure);
            break;
    }
}

export async function fetchReadStatisticsTypes() {
    const stmt = db.prepare("SELECT * FROM ReadStatisticTypes");
    const result = stmt.all();

    return result;
}

export function addReadStatisticsType(newRow:ReadStatisticType)  {
        //adds info about statistic to ReadStatisticTypes table
        const insertRow = db.prepare('INSERT INTO ReadStatisticTypes VALUES (@name, @abbreviation, @quantity, @unit);');
        const insertInfo = insertRow.run({name: newRow.name, abbreviation: newRow.abbreviation, quantity: newRow.quantity, unit: newRow.unit});

        //adds column to the data table
        // const addColumn = db.prepare('ALTER TABLE Data ADD @colName INTEGER NOT NULL DEFAULT 0');
        // const AddColumnInfo = addColumn.run({colName: newRow.abbreviation});

        //bind parameters dont work so fuck you and sqlInjections
        const addColumn = db.prepare('ALTER TABLE Data ADD '+ newRow.abbreviation +' INTEGER NOT NULL DEFAULT 0;');
        const AddColumnInfo = addColumn.run();
}

export function deleteReadStatisticsType(toDelete:string) {
        //get abbreviation to delete the column in the Data table
        const getAbbreviationToDelete = db.prepare('SELECT abbreviation FROM ReadStatisticTypes WHERE name = ?;');
        const columnToDelete:any = getAbbreviationToDelete.get(toDelete);

        //delete row from the ReadStatisticTypes table
        const insertRow = db.prepare('DELETE FROM ReadStatisticTypes WHERE name = ?;');
        const insertInfo = insertRow.run(toDelete);
        //deletes column in the Data table
        const addColumn = db.prepare('ALTER TABLE Data DROP COLUMN '+ columnToDelete.abbreviation +';');
        const AddColumnInfo = addColumn.run();
}
