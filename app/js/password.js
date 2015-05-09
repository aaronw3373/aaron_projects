function passwordChecker(user) {
  var _usersAndPasswords = {
    "Matt" : "potato",
    "Antony": "tomato",
    "Aaron": "apple" };
  var _mystery = function(pw){
      //encrypts data
  };


  return function(password){
    return _mystery(password) === _mystery(_usersAndPasswords[user]);
  };
};


var testPw = passwordChecker("Matt");
testPw("potato");
