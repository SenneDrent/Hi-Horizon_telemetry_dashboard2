import { getDataTableWithRange } from "$lib/server/queries/graphs/getDataPoints";
import { json } from "@sveltejs/kit";

export function GET({url}) {
    let table: any[][] = getDataTableWithRange();
    let rawString:string = '';
    for (const row of table) {
        rawString += (row.join(',') + '\n');
    }
    var b64str = btoa(rawString);
    var src = 'data:text/csv;base64,' + b64str;
    return json({table: src})
}