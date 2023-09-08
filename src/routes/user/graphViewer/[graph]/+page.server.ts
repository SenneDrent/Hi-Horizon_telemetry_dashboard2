import { getAllDataPointsFromAxes } from "$lib/server/queries/graphs/getDataPoints";
import { fetchReadStatisticsTypes } from "$lib/server/queries/settings/ReadStatistics"
import type { Actions } from "./$types";

export const load = async ({ params }) => {
    return {
        graphName: params.graph,
        readStatisticTypes: await fetchReadStatisticsTypes(),
    }
}