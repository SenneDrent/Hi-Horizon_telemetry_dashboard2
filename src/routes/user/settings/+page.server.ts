import { fetchReadStatisticsTypes } from "$lib/server/queries/settings/ReadStatistics";

export async function load({ params: any }) {
    return {
        readStatisticTypes: await fetchReadStatisticsTypes(),
    };
}
