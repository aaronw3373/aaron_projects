
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

function primeGenerator(x){
var results = [];
  for (var i = 2; i < x; i++) {
    if (isPrime(i)){
      console.log(i);
      results.push(i);
    }
  }
  var random = Math.random(1);
  random = random * results.length
  random = Math.floor(random);
  console.log("there are " + results.length + " prime nuumbers to " + x);
}

primeGenerator(100);
