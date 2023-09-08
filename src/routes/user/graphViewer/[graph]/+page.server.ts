import { getAllDataPointsFromAxes } from "$lib/server/queries/graphs/getDataPoints";
import { fetchReadStatisticsTypes } from "$lib/server/queries/settings/ReadStatistics"
import type { Actions } from "./$types";

export const load = async ({ params }) => {
    return {
        graphName: params.graph,
        readStatisticTypes: await fetchReadStatisticsTypes(),
    }
}

export const actions = {
	getGraphDataPoints: async ({ request }) => {
        const axisNames = await request.formData();
        const x = axisNames.get("X-axis");
        const y = axisNames.get("Y-axis");

        const rawData:any = getAllDataPointsFromAxes(x, y);
        const xData = {name:x, points: []}
        const yData = {name:y, points:[]}
        rawData.forEach((row:any) =>{
            xData.points.push(row[x]);
            yData.points.push(row[y]);
        })
        return {x: xData, y: yData};
    }
} satisfies Actions;