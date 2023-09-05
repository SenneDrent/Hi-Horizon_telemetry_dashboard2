import type { SettingsLocalChange, SettingsType } from '$lib/interfaces/SettingsLocalChange';
import { db } from '$lib/server/queries/dataBaseConnection';
import { addReadStatisticsType, deleteReadStatisticsType } from '$lib/server/queries/settings/ReadStatistics.js';
import { parseChanges } from '$lib/server/queries/settings/processChanges.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    let response:string = "ummm.. Thats akward";
    let result: number = 500;
    const body = await request.json();
    try {
        parseChanges(body);
        response = "All Saves changed sucesfully"
        result = 201;
    }
    catch (error) {
        response = "An error occured";
        result = 400;
    }
    
	return json({response:response, status:result});
}
