import { getAllDataPointsFromAxes } from "$lib/server/queries/graphs/getDataPoints";
import { json } from "@sveltejs/kit";

export function GET({url}) {
    const x = String(url.searchParams.get('x') ?? 'UnixTime');
    const y = String(url.searchParams.get('y') ?? 'UnixTime');
    
    let xPoints: any[] = [];
    let yPoints: any[] = [];
    const xData = {name:x, points: xPoints}
    const yData = {name:y, points: yPoints}

	const rawData:any[][] = getAllDataPointsFromAxes(x, y);
    rawData.forEach((row:any[]) => {
        xData.points.push(row[0]);
        yData.points.push(row[1]);
    })
    
	return json({x: xData, y: yData, otherFormat: rawData});
}