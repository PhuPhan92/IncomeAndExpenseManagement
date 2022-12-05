// display and close modal JS
function openModalExpense() {
  document.getElementById('modal_expense').classList.add("show");
}
function openModalIncom() {
  document.getElementById('modal_income').classList.add("show");
}
function removeModal() {
  document.getElementById('modal_expense').classList.remove("show");
  document.getElementById('modal_income').classList.remove("show");
  document.querySelector('.income_ok_btn').classList.remove('hide');
  document.querySelector('.income_update_btn').classList.add('hide');
  document.querySelector('.expense_ok_btn').classList.remove('hide');
  document.querySelector('.expense_update_btn').classList.add('hide');
  resetExpanseForm();
  resetIncomeForm();
}
// End display and close modal JS

// slide Show JS
let slideIndex = 0;
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 5000); 
}
// End slide Show JS

// render and creat Container JS
  // Class income
var incomes = [];
var incomeSelec = [
  'Salary 1',
  'Salary 2',
  'Bonus',
  'Other'
]
var selecIncomeId = [];
const income_db = "income_db";
function renderIncomeSelec() {
    let htmls = incomeSelec.map(function (incomeSelec) {
        return `<option value="${incomeSelec}">${incomeSelec}</option>`
    })
    document.querySelector('#income_selection1').innerHTML = htmls.join('')
    document.querySelector('#income_selection2').innerHTML = htmls.join('')
    document.querySelector('#income_selection3').innerHTML = htmls.join('')
  }
class Income {
  constructor(id,date, income1, income2, income3, value1, value2, value3, note1, note2, note3){
    this.id = id
    this.date = date;
    this.income1 = income1;
    this.income2 = income2;
    this.income3 = income3;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.note1 = note1;
    this.note2 = note2;
    this.note3 = note3;

  }
}
function renderIncome() {
    let htmls = incomes.map(function (income) {
        return `
                <div class="edit_block">
                  <table class="table">
                    <tr>
                      <th>Date: ${income.date}</th>
                      <th>Sum: ${income.value1 + income.value2 + income.value3}</th>
                      <th><button class="btn edit_btn" onclick="editIncome(${income.id})">Edit</button></th>
                      <th><button class="btn delete_btn" onclick="deleteIncome(${income.id})">Delete</button></th>
                      <th><button class="ti-angle-down btn display_btn" onclick="displayIncomeValue(${income.id})"></button></th>
                      <th><button class="ti-angle-up btn unDisplay_btn" onclick="unDisplayIncomeValue(${income.id})"></button></th>
                    </tr>
                  </table>
                </div>
                <div class="display_block incomeBlock${income.id}">
                  <table class="table">
                    <tr>
                      <td>Income</td>
                      <td>Value</td>
                      <td>Note</td>
                    </tr>
                    <tr>
                      <td>${income.income1}</td>
                      <td>${income.value1}</td>
                      <td>${income.note1}</td>
                    </tr>
                    <tr>
                      <td>${income.income2}</td>
                      <td>${income.value2}</td>
                      <td>${income.note2}</td>
                    </tr>
                    <tr>
                      <td>${income.income3}</td>
                      <td>${income.value3}</td>
                      <td>${income.note3}</td>
                    </tr>
                  </table>
                </div>`
    })

    document.getElementById('income').innerHTML = htmls.join("");
}
function resetIncomeForm(){
    document.querySelector('#incomeDate').value = ""
    document.querySelector('#income_selection1').value = ""
    document.querySelector('#income_selection2').value = ""
    document.querySelector('#income_selection3').value = ""
    document.querySelector('#income_value1').value = ""
    document.querySelector('#income_value2').value = ""
    document.querySelector('#income_value3').value = ""
    document.querySelector('#income_note1').value = ""
    document.querySelector('#income_note2').value = ""
    document.querySelector('#income_note3').value = ""
    renderIncomeSelec();
}
function createIncome() {
    let date = document.querySelector('#incomeDate').value;
    let income1 = document.querySelector('#income_selection1').value;
    let income2 = document.querySelector('#income_selection2').value;
    let income3 = document.querySelector('#income_selection3').value;
    let value1 = +document.querySelector('#income_value1').value;
    let value2 = +document.querySelector('#income_value2').value;
    let value3 = +document.querySelector('#income_value3').value;
    let note1 = document.querySelector('#income_note1').value;
    let note2 = document.querySelector('#income_note2').value;
    let note3 = document.querySelector('#income_note3').value;
    let id = getMaxIncomeId() + 1;
    incomes.push(new Income(id,date, income1, income2, income3, value1, value2, value3, note1, note2, note3));
    renderIncome()
    resetIncomeForm()
    removeModal()
    localStorage.setItem(income_db, JSON.stringify(incomes));
}
function incomeInit(){
  if(localStorage.getItem(income_db) == null){
      incomes = [
        new Income(1,"10-15-2022","Salary 1","Salary 2","Bonus", 7500000,6000000,3500000,"October main salary", "October sub salary",""),
        new Income(2,"10-31-2022","Salary 1","Salari2","Other", 9000000,5000000,4000000,"October main salari", "October sub salari","")
      ]
      localStorage.setItem(income_db, JSON.stringify(incomes));
    }
    else{
        incomes = JSON.parse(localStorage.getItem(income_db));
    }
}
function getMaxIncomeId() {
    let max = 0;
    for (let i = 0; i < incomes.length; i++) {
        if (incomes[i].id > max) {
            max = incomes[i].id
        }
    }
    return max;
}
  // Class Expense
var expenses = [];
var expenseSelec =[
  'Food',
  'Living',
  'Shopping',
  'Entertaiment',
  'Medical',
  'Other'
]
var selecExpenseId = [];
const expense_db = "expense_db";
function renderExpenseSelec() {
    let htmls = expenseSelec.map(function (expenseSelec) {
        return `<option value="${expenseSelec}">${expenseSelec}</option>`
    })
    document.querySelector('#expense_selection1').innerHTML = htmls.join('')
    document.querySelector('#expense_selection2').innerHTML = htmls.join('')
    document.querySelector('#expense_selection3').innerHTML = htmls.join('')
    document.querySelector('#expense_selection4').innerHTML = htmls.join('')
    document.querySelector('#expense_selection5').innerHTML = htmls.join('')
    document.querySelector('#expense_selection6').innerHTML = htmls.join('')
}
class Expense{
  constructor(id,date, expense1,expense2,expense3,expense4,expense5,expense6, value1, value2, value3, value4,value5,value6, note1, note2, note3, note4, note5, note6 ){
    this.id = id;
    this.date = date;
    this.expense1 = expense1;
    this.expense2 = expense2;
    this.expense3 = expense3;
    this.expense4 = expense4;
    this.expense5 = expense5;
    this.expense6 = expense6;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.note1 = note1;
    this.note2 = note2;
    this.note3 = note3;
    this.note4 = note4;
    this.note5 = note5;
    this.note6 = note6;
  }
}
function renderExpense() {
    let htmls = expenses.map(function (expen) {
        return `
                <div class="edit_block">
                  <table class="table">
                    <tr>
                      <th>Date: ${expen.date}</th>
                      <th>Sum: ${expen.value1 + expen.value2 + expen.value3 + expen.value4 + expen.value5 + expen.value6}</th>
                      <th><button class="btn edit_btn" onclick="editExpense(${expen.id})">Edit</button></th>
                      <th><button class="btn delete_btn" onclick="deleteExpense(${expen.id})">Delete</button></th>
                      <th><button class="ti-angle-down btn display_btn" onclick="displayExpenseValue(${expen.id})"></button></th>
                      <th><button class="ti-angle-up btn unDisplay_btn" onclick="unDisplayExpenseValue(${expen.id})"></button></th>
                    </tr>
                  </table>
                </div>
                <div class="display_block ExpenseBlock${expen.id}">
                  <table class="table">
                    <tr>
                      <td>Expense</td>
                      <td>Value</td> 
                      <td>Note</td>
                    </tr>
                    <tr>
                      <td>${expen.expense1}</td>
                      <td>${expen.value1}</td>
                      <td>${expen.note1}</td>
                    </tr>
                    <tr>
                      <td>${expen.expense2}</td>
                      <td>${expen.value2}</td>
                      <td>${expen.note2}</td>
                    </tr>
                    <tr>
                      <td>${expen.expense3}</td>
                      <td>${expen.value3}</td>
                      <td>${expen.note3}</td>
                    </tr>
                    <tr>
                      <td>${expen.expense4}</td>
                      <td>${expen.value4}</td>
                      <td>${expen.note4}</td>
                    </tr>
                    <tr>
                      <td>${expen.expense5}</td>
                      <td>${expen.value5}</td>
                      <td>${expen.note5}</td>
                    </tr>
                    <tr>
                      <td>${expen.expense6}</td>
                      <td>${expen.value6}</td>
                      <td>${expen.note6}</td>
                    </tr>
                  </table>
                </div>`
    })

    document.getElementById('expense').innerHTML = htmls.join("");
}
function expenseInit(){
    if(localStorage.getItem(expense_db) == null){
      expenses = [
        new Expense(1,"11-21-2022","Food","Living","Shopping","Entertaiment","Medical","Other", 98000,0,0,0,0,20000,"","","","","",""),
        new Expense(2,"11-22-2022","Food","Living","Shopping","Entertaiment","Medical","Other", 50000,0,0,5000000,0,0,"","","","","",""),
        new Expense(3,"11-23-2022","Food","Living","Shopping","Entertaiment","Medical","Other", 100000,100000,0,0,0,0,"","","","","",""),
        new Expense(4,"11-24-2022","Food","Living","Shopping","Entertaiment","Medical","Other", 90000,0,0,0,0,0,"","","","","",""),
        new Expense(5,"11-25-2022","Food","Living","Shopping","Entertaiment","Medical","Other", 40000,0,0,80000,1000000,160000,"","","","","Tiêm chủng","Taxi")
      ]
      localStorage.setItem(expense_db, JSON.stringify(expenses))
    }
    else{
        expenses = JSON.parse(localStorage.getItem(expense_db));
    }
}
function resetExpanseForm(){
    document.querySelector('#expense_selection1').value = "";
    document.querySelector('#expense_selection2').value = "";
    document.querySelector('#expense_selection3').value = "";
    document.querySelector('#expense_selection4').value = "";
    document.querySelector('#expense_selection5').value = "";
    document.querySelector('#expense_selection6').value = "";
    document.querySelector('#expense_value1').value = "";
    document.querySelector('#expense_value2').value = "";
    document.querySelector('#expense_value3').value = ""; 
    document.querySelector('#expense_value4').value = "";
    document.querySelector('#expense_value5').value = "";
    document.querySelector('#expense_value6').value = "";
    document.querySelector('#expense_note1').value = "";
    document.querySelector('#expense_note2').value = "";
    document.querySelector('#expense_note3').value = "";
    document.querySelector('#expense_note4').value = "";
    document.querySelector('#expense_note5').value = "";
    document.querySelector('#expense_note6').value = "";
    document.querySelector('#expense_date').value = "";
    renderExpenseSelec();
}
function createExpanse() {

    let date = document.querySelector('#expense_date').value;
    let expense1 = document.querySelector('#expense_selection1').value;
    let expense2 = document.querySelector('#expense_selection2').value;
    let expense3 = document.querySelector('#expense_selection3').value;
    let expense4 = document.querySelector('#expense_selection4').value;
    let expense5 = document.querySelector('#expense_selection5').value;
    let expense6 = document.querySelector('#expense_selection6').value;
    let value1 = +document.querySelector('#expense_value1').value;
    let value2 = +document.querySelector('#expense_value2').value;
    let value3 = +document.querySelector('#expense_value3').value;
    let value4 = +document.querySelector('#expense_value4').value;
    let value5 = +document.querySelector('#expense_value5').value;
    let value6 = +document.querySelector('#expense_value6').value;
    let note1 = document.querySelector('#expense_note1').value;
    let note2 = document.querySelector('#expense_note2').value;
    let note3 = document.querySelector('#expense_note3').value;
    let note4 = document.querySelector('#expense_note4').value;
    let note5 = document.querySelector('#expense_note5').value;
    let note6 = document.querySelector('#expense_note6').value;
    let id = getMaxExpenseId() + 1;
    expenses.push(new Expense(  id, date, expense1,expense2,expense3,expense4,expense5,expense6, value1, value2, value3, value4,value5,value6, note1, note2, note3, note4, note5, note6));
    renderExpense()
    resetExpanseForm()
    removeModal()
    localStorage.setItem(expense_db, JSON.stringify(expenses));
}
function getMaxExpenseId() {
    let max = 0;
    for (let j = 0; j < expenses.length; j++) {
        if (expenses[j].id > max) {
            max = expenses[j].id
        }
    }
    return max;
}
renderIncomeSelec();
renderExpenseSelec();
expenseInit();
incomeInit();
renderExpense();
renderIncome();
// End render and creat Container JS

// find ID, delete, edit, dispay vlue block JS
  // Class income
function selecIncom(incomeId) {
    if (selecIncomeId.includes(incomeId))  {
        selecIncomeId = selecIncomeId.filter(function (id) {
            return id != incomeId;
        }) 
    }
    else {
        selecIncomeId.push(incomeId);
    }
}
function deleteIncome(incomeId) {
    selecIncom(incomeId)
    let confirmed = window.confirm("Are you sure to remove income?");
    if (confirmed) {
      for (let id of selecIncomeId) {
        incomes = incomes.filter(function (income) {
        return income.id != id;
        })
      }
    localStorage.setItem(income_db, JSON.stringify(incomes));
    renderIncome();
    selecIncomeId = [];
    }
}
function editIncome(incomeId) {
    let income = incomes.find(function (income) {
        return income.id == incomeId;
    })
    document.querySelector('#hideIncome').value = income.id;
    document.querySelector('#incomeDate').value = income.date;
    document.querySelector('#incomeDate').value = income.date;
    document.querySelector('#income_selection1').value = income.income1;
    document.querySelector('#income_selection2').value = income.income2;
    document.querySelector('#income_selection3').value = income.income3;
    document.querySelector('#income_value1').value = income.value1;
    document.querySelector('#income_value2').value = income.value2;
    document.querySelector('#income_value3').value = income.value3;
    document.querySelector('#income_note1').value = income.note1;
    document.querySelector('#income_note2').value = income.note2;
    document.querySelector('#income_note3').value = income.note3;
    openModalIncom()
    document.querySelector('.income_ok_btn').classList.add('hide');
    document.querySelector('.income_update_btn').classList.remove('hide');
}
function updateIncome(){
    let incomeId = document.querySelector('#hideIncome').value;
    let income = incomes.find(function (income) {
        return income.id == incomeId;
    })
    income.date = document.querySelector('#incomeDate').value;
    income.income1 = document.querySelector('#income_selection1').value;
    income.income2 = document.querySelector('#income_selection2').value;
    income.income3 = document.querySelector('#income_selection3').value;
    income.value1 = +document.querySelector('#income_value1').value;
    income.value2 = +document.querySelector('#income_value2').value;
    income.value3 = +document.querySelector('#income_value3').value;
    income.note1 = document.querySelector('#income_note1').value;
    income.note2 = document.querySelector('#income_note2').value;
    income.note3 = document.querySelector('#income_note3').value;
    localStorage.setItem(income_db, JSON.stringify(incomes));
    renderIncome();
    resetIncomeForm();
    removeModal();
    document.querySelector('.income_ok_btn').classList.remove('hide');
    document.querySelector('.income_update_btn').classList.add('hide');
}

  // Class Expense
function selecExpense(expenseId) {
    if (selecExpenseId.includes(expenseId))  {
        selecExpenseId = selecExpenseId.filter(function (id) {
            return id != expenseId;
        }) //
    }
    else {
        selecExpenseId.push(expenseId);
    }
    // alert(selecIncomeId);
}
function deleteExpense(expenseId) {
  debugger
    selecExpense(expenseId)
    let confirmed = window.confirm("Are you sure to remove expense?");
    if (confirmed) {
      for (let id of selecExpenseId) {
        expenses = expenses.filter(function (expense) {
        return expense.id != id;
        });
      }
    localStorage.setItem(expense_db, JSON.stringify(expenses));
    renderExpense();
    selecExpenseId = [];
    }
}
function editExpense(expenseId) {
    let expense = expenses.find(function (expense) {
        return expense.id == expenseId;
    })
    document.querySelector('#hideExpense').value = expense.id;
    document.querySelector('#expense_date').value = expense.date;
    document.querySelector('#expense_selection1').value = expense.expense1;
    document.querySelector('#expense_selection2').value = expense.expense2;
    document.querySelector('#expense_selection3').value = expense.expense3;
    document.querySelector('#expense_selection4').value = expense.expense4;
    document.querySelector('#expense_selection5').value = expense.expense5;
    document.querySelector('#expense_selection6').value = expense.expense6;
    document.querySelector('#expense_value1').value = expense.value1;
    document.querySelector('#expense_value2').value = expense.value2;
    document.querySelector('#expense_value3').value = expense.value3;
    document.querySelector('#expense_value4').value = expense.value4;
    document.querySelector('#expense_value5').value = expense.value5;
    document.querySelector('#expense_value6').value = expense.value6;
    document.querySelector('#expense_note1').value = expense.note1;
    document.querySelector('#expense_note2').value = expense.note2;
    document.querySelector('#expense_note3').value = expense.note3;
    document.querySelector('#expense_note4').value = expense.note4;
    document.querySelector('#expense_note5').value = expense.note5;
    document.querySelector('#expense_note6').value = expense.note6;
    openModalExpense()
    document.querySelector('.expense_ok_btn').classList.add('hide');
    document.querySelector('.expense_update_btn').classList.remove('hide');
}
function updateExpanse(){
    let expenseId = document.querySelector('#hideExpense').value;
    let expense = expenses.find(function (expense) {
        return expense.id == expenseId;
    })
    expense.date = document.querySelector('#expense_date').value;
    expense.expense1 = document.querySelector('#expense_selection1').value;
    expense.expense2 = document.querySelector('#expense_selection2').value;
    expense.expense3 = document.querySelector('#expense_selection3').value;
    expense.expense4 = document.querySelector('#expense_selection4').value;
    expense.expense5 = document.querySelector('#expense_selection5').value;
    expense.expense6 = document.querySelector('#expense_selection6').value;
    expense.value1 = +document.querySelector('#expense_value1').value;
    expense.value2 = +document.querySelector('#expense_value2').value;
    expense.value3 = +document.querySelector('#expense_value3').value;
    expense.value4 = +document.querySelector('#expense_value4').value;
    expense.value5 = +document.querySelector('#expense_value5').value;
    expense.value6 = +document.querySelector('#expense_value6').value;
    expense.note1 = document.querySelector('#expense_note1').value;
    expense.note2 = document.querySelector('#expense_note2').value;
    expense.note4 = document.querySelector('#expense_note4').value;
    expense.note3 = document.querySelector('#expense_note3').value;
    expense.note6 = document.querySelector('#expense_note6').value;
    expense.note5 = document.querySelector('#expense_note5').value;
    localStorage.setItem(expense_db, JSON.stringify(expenses));
    renderExpense();
    resetExpanseForm();
    removeModal();
    document.querySelector('.expense_ok_btn').classList.remove('hide');
    document.querySelector('.expense_update_btn').classList.add('hide');
}
// display or undispay display block
function displayIncomeValue(incomeID){
  document.querySelector(`.incomeBlock${incomeID}`).style.display = 'block';
}
function unDisplayIncomeValue(incomeID){
  document.querySelector(`.incomeBlock${incomeID}`).style.display = 'none';
}
function displayExpenseValue(expenseID){
  document.querySelector(`.ExpenseBlock${expenseID}`).style.display = 'block';
}
function unDisplayExpenseValue(expenseID){
  document.querySelector(`.ExpenseBlock${expenseID}`).style.display = 'none';
}
// sort value by date
function incomesort(){
  incomes.sort(function(incomes1, incomes2){
    return incomes2.date - incomes1.date;
  })
  renderIncome();
}
incomesort()
