import { Base } from "../base/base";

export class Expense extends Base{
    public user : number;
    public name : string;
    public amount : number;
    public date : Date;
    
    constructor(id : number, idUser : number, name : string, amount : number,date : Date, creationDate : Date, updateDate : Date){
        super(id,creationDate,updateDate);
        this.user = idUser;
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}
