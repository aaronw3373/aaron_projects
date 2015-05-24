//working tester
function isPrimeTest(n){
  var square = Math.sqrt(n);
  square = Math.floor(square);
  for (var i = 2; i <= square; i++) {
    if (n % i === 0){
      return false;
    }
  }
  return true;
}

function primeGen(x, y){
var results = [];
  for (var i = x; i < y; i++) {
    if (isPrimeTest(i)){
      results.push(i);
    }
  }
  //console.log(results);
  return results;
}



function isBigPrime(n){
    square = Math.sqrt(n);
    console.log("square root is: " + square);
    var results2 = primeGen(2, square);
    for (var i = 0; i < results2.length; i++) {
      if (n % results2[i] === 0){
        console.log(results2[i])
        console.log(n + " is not prime")
        return false;
      }
      else {console.log(results2[i]);}

    };
    console.log(n + " is prime");
    return true;
}


isBigPrime(100000000283);

