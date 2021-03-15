import { Base } from "../base/base";

export class Month extends Base {
    public name : string;
    public user : number;
    public startDate : Date;
    public endDate : Date;
    public total : number;
    public budget : number;

    private monthListFr = [
        'Janvier',
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
      ]
    
    constructor(
        id : number,
        creationDate:Date,
        updateDate:Date,
        user : number,
        startDate : Date,
        endDate : Date,
        total : number,
        budget : number
    )
    {
        super(id,creationDate,updateDate);
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.total = total;
        this.budget = budget;
        let middleDate = endDate.getTime()-startDate.getTime();
        let middleDateDte = new Date(startDate.getTime()+middleDate/2);
        this.name=`${this.monthListFr[middleDateDte.getMonth()]} ${middleDateDte.getFullYear()} `
    }

    static getDateStr(d : Date) :string {
        let result : string = `${d.getFullYear()}-`;
        if(d.getMonth()<9){
            result +=`0${d.getMonth()+1}`;
        } else {
            result +=`${d.getMonth()+1}`;
        }
        result+='-';
        if(d.getDate()<10){
            result +=`0${d.getDate()}`;
        } else {
            result +=`${d.getDate()}`;
        }
        return result;
    }
}
