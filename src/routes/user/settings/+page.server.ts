// import { getMQTTClient } from '$lib/classes/MQTTBroker.js';
import {fetchReadStatisticsTypes } from '$lib/server/db/queries';

export async function load({ params }) {
    return {
        readStatisticTypes: await fetchReadStatisticsTypes(),
    };
}
