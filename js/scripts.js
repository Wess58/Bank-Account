$(document).ready(function(){
  $("form#accountOpeningForm").submit(function(event){
    event.preventDefault();

    var firstName = $("input#firstNameInput").val();
    var lastName = $("input#lastNameInput").val();
    var accountBalance = $("input#initialDepositInput").val();

    var newAccountHolder = new BankAccount(firstName,lastName,accountBalance);

    console.log(newAccountHolder.firstName+" "+newAccountHolder.lastName+" "+newAccountHolder.balance);

    $("#transactionButton").click(function(){
      newAccountHolder.deposit
    });

    $("p#accountHolder").text(firstName+" "+lastName);
    $("p#balance").text(accountBalance);
  });
});

function BankAccount(first,last,bal){
  this.firstName = first;
  this.lastName = last;
  this.balance = bal;
}

BankAccount.prototype.deposit = function(){
  var depositAmmount =  $("input#depositInput").val();
  return (this.balance - depositAmmount);
}
BankAccount.prototype.withdraw = function(){
  var withdrawAmmount =  $("input#withdrawInput").val();
  return (this.balance - withdrawAmmount);
}
