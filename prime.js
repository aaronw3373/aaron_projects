//working generator
function isPrime(n){
  square = Math.sqrt(n);
  square = Math.floor(square);
  for (var i = 2; i < square + 1; i++) {
    if (n % i === 0){
      return false;
    }
  }
  return true;
}

function primeGenerator(x, y){
var results = [];
  for (var i = x; i < y; i++) {
    if (isPrime(i)){
      console.log(i);
      results.push(i);
    }
  }
  var random = Math.random(1);
  random = random * results.length
  random = Math.floor(random);
  console.log("there are " + results.length + " prime numbers between " + x + " and "+ y);
  console.log("Here is a random prime number: " + results[random]);
}

//primeGenerator(,);



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
  return results;
}

function isBigPrime(n){
  if (n>0){
    square = Math.sqrt(n);
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

  else{
    console.log(n + " is not prime")
    return false;
  }
}

isBigPrime();
