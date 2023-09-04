export class SettingsLocalChange {
    operation:string;
    settingType:string;
    structure:any;

    public constructor(operation: string,settingType:string,structure:any) {
        this.operation=operation;
        this.settingType=settingType;
        this.structure=structure;
    }
}