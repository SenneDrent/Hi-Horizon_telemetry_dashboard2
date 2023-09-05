export type Operation = "Add" | "Delete"
export type SettingsType = "ReadStatisticType"
export interface SettingsLocalChange {

    operation:Operation;
    settingType:SettingsType;
    structure:any;
}