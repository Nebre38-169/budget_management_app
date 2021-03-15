import { Base } from "../base/base";

export class Expense extends Base{
    public user : number;
    public month : number;
    public name : string;
    public amount : number;
    public date : Date;
    
    constructor(
        id : number,
        creationDate : Date,
        updateDate : Date,
        user : number,
        month : number,
        name : string,
        amount : number,
        date : Date
    ){
        super(id,creationDate,updateDate);
        this.user = user;
        this.month = month;
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}
