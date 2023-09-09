import { getAllDataPointsFromAxes } from "$lib/server/queries/graphs/getDataPoints";
import { json } from "@sveltejs/kit";

export function GET({url}) {
    const x = String(url.searchParams.get('x') ?? 'UnixTime');
    const y = String(url.searchParams.get('y') ?? 'UnixTime');
    const xData = {name:x, points:[]}
    const yData = {name:y, points:[]}

	const rawData:any[] = getAllDataPointsFromAxes(x, y);
    rawData.forEach((row:any) =>{
        xData.points.push(row[x]);
        yData.points.push(row[y]);
    })
    
	return json({x: xData, y: yData, otherFormat: rawData});
}