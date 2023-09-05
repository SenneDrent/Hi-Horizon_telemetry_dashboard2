import type { SettingsLocalChange } from "$lib/interfaces/SettingsLocalChange";
import { db } from "../dataBaseConnection";
import { parseOperationReadStatistic } from "./ReadStatistics";

export const parseChanges = db.transaction((body)=>{
    body.forEach((setting: SettingsLocalChange[]) =>{
        setting.forEach((change)=>{
            parseSettingType(change);
        });
    });
});

function parseSettingType(change:SettingsLocalChange) {
    switch (change.settingType) {
        case "ReadStatisticType":
            parseOperationReadStatistic(change);
            break;
    }
}