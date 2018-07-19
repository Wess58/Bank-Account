$(document).ready(function(){
  $("form#accountOpeningForm").submit(function(event){
    event.preventDefault();
    //Sadly this can't be placed within a function, it HAS TO BE here otherwise it won't work as expected...try it yourself
    if (!$("input#firstNameInput").val()){
      alert("You cannot create an account without a first name");
      return false; //stops program from running beyond this point. If its in a function, it'll stop the function from running, but won't stop the code underneath the function from running
    }
    else if (!$("input#lastNameInput").val()) {
      alert("You cannot create an account without a last name");
      return false;
    }
    else if ($("input#initialDepositInput").val() <=0){
      alert("You cannot open an account without an intital deposit");
      return false;
    }

    var firstName = $("input#firstNameInput").val();
    var lastName = $("input#lastNameInput").val();
    var accountBalance = parseInt($("input#initialDepositInput").val());

    var newAccountHolder = new BankAccount(firstName,lastName,accountBalance);

    $("p#accountHolder").text("ACCOUNT HOLDER: "+newAccountHolder.fullName());
    $("p#balance").text("BALANCE: "+newAccountHolder.balance);//displays initial balance
    resetRegisterFields();

    $("#transactionButton").click(function(){
      newAccountHolder.withdraw();
      newAccountHolder.deposit();
      $("p#balance").text("BALANCE: "+newAccountHolder.balance); //displays updated balance
      resetTransactionFields();
    });
  });
  function resetRegisterFields(){
    $("input#firstNameInput").val("");
    $("input#lastNameInput").val("");
    $("input#initialDepositInput").val("")
  }
  function resetTransactionFields(){
    $("input#depositInput").val("0")
    $("input#withdrawInput").val("0")
  }
});

function BankAccount(first,last,bal){
  this.firstName = first;
  this.lastName = last;
  this.balance = bal;
}

BankAccount.prototype.deposit = function(){
  var depositAmmount = parseInt($("input#depositInput").val());
  return this.balance += depositAmmount;
}
BankAccount.prototype.withdraw = function(){
  var withdrawAmmount =  parseInt($("input#withdrawInput").val());
  return this.balance -= withdrawAmmount;
}

BankAccount.prototype.fullName = function(){
  return this.firstName+" "+this.lastName;
}
