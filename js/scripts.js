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
    else if ($("input#initialDepositInput").val() < 50){
      alert("Minimum balance to open an account is Ksh 50");
      return false;
    }

    var firstName = $("input#firstNameInput").val();
    var lastName = $("input#lastNameInput").val();
    var accountBalance = parseInt($("input#initialDepositInput").val());

    var newAccountHolder = new BankAccount(firstName,lastName,accountBalance);

    $("p#accountHolder").text("ACCOUNT HOLDER: "+newAccountHolder.fullName());
    $("p#balance").text("BALANCE: Ksh "+newAccountHolder.balance);//displays initial balance
    resetRegisterFields();

    $("#transactionButton").click(function(){
      newAccountHolder.withdraw();
      newAccountHolder.deposit();
      $("p#balance").text("BALANCE: Ksh "+newAccountHolder.balance); //displays updated balance
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
  if(depositAmmount<0){
    alert("Transaction failed: You cannot deposit a negative value. ");
    return false;
  } else {
    return this.balance += depositAmmount;
  }
}

BankAccount.prototype.withdraw = function(){
  var withdrawAmmount =  parseInt($("input#withdrawInput").val());
  if(withdrawAmmount<0){
    alert("Transaction failed: You cannot withdraw a negative value");
    return false;
  }
  else if(withdrawAmmount > this.balance){
    alert("Transaction failed: Overdraft are not allowed.");
    return false;
  }
  else if (this.balance - withdrawAmmount < 50){
    alert("Transaction failed: Minimum balance required in the account is Ksh 50");
    return false;
  }else{
    return this.balance -= withdrawAmmount;
  }
}

BankAccount.prototype.fullName = function(){
  return this.firstName+" "+this.lastName;
}
