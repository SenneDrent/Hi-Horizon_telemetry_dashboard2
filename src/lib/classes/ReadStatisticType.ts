export class ReadStatisticType {
    name:string;
    abbreviation:string;
    quantity:string;
    unit:string;

    public constructor(name:string, abbreviation:string, quantity:string, unit:string) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.quantity = quantity;
        this.unit = unit;
    }
}