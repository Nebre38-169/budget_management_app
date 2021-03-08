import { Base } from "../base/base";

export class User extends Base {
    public email : string;
    public firstName : string;
    public lastName : string;
    public budget : number;

    constructor(
        id : number,
        creationDate : Date,
        updateDate : Date,
        email : string,
        firstName : string,
        lastName : string,
        budget : number
    ){
        super(id,creationDate,updateDate);
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.budget = budget;
    }
}
