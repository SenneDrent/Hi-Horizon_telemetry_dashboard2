import { fetchLatestData } from '$lib/server/queries/dashboard/dataFrame.js';
import { fetchReadStatisticsTypes } from '$lib/server/queries/settings/ReadStatistics.js';

export async function load({ params:any }) {
    return {
        dataFrame: fetchLatestData(),
        dataFrameStructure: fetchReadStatisticsTypes()
    }
}
