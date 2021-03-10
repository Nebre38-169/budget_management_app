import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../class/expense/expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  @Input() expense : Expense;

  constructor() { }

  ngOnInit() {}

}
