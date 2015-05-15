var Cboard = ["","","","","","","","",""];
var playSingle = [];
var playPairs = [];
var compSingle = [];
var compPairs = [];
var victor;
var person = "X";
var play = "X";
var computer = "O";
var comp = "O"
var Ccount = 0;

//magic square win function
function winer(test,who,turn){
  var single;
  var pair;
  if (who===play){
    single = playSingle;
    pair = playPairs;
  }else if (who===comp){
    single = compSingle;
    pair = compPairs;
  }else{
    console.log("bad who input");
  }

  function tester(){
    for (var i = 0; i < pair.length; i++) {
      if (Number(pair[i]) + Number(test) === 15){
        return true;
      }
    }
  }
  if (turn === person){
    if(tester()){
      return true;
    }else{
      for (var i = 0; i < single.length ;i++) {
        pair.push(Number(single[i])+Number(test));
      }
      single.push(Number(test));
    }
  }

  else if(turn === computer){
    console.log(single);
    console.log(pair);
    if (tester()){
      console.log("comp testing true");
      return true;
    }else {
      return false;
    }
  }else{
    console.log("bad turn input");
  }

}

//tie functin
function tier(){
  if (Ccount === 8){
    victor = "tie";
    return true;
  }
  Ccount++;
}

//computer play functions
function canWin(){
  console.log('canWin? ');
  for (var i = 1; i < 10; i++) {
    if (Cboard[i-1]===""){
      if (winer((i),comp,computer)){
        console.log("compWin " + (i));
        Cboard[i-1]="O"
        var local = '#' + i;
        $(local).html(computer);
        return true;
      }
    }
  }
}
function canBlock(){
  console.log('canBlock ');
  for (var i = 1; i < 10; i++) {
    if (Cboard[i-1]===""){
      if (winer((i),play,computer)){
        Cboard[i-1]="O"
        var local = '#' + i;
        $(local).html(computer);
        for (var j = 0; j < compSingle.length ;j++) {
          compPairs.push(Number(compSingle[j]) + i);
        }
        compSingle.push(i);
        return true;
      }
    }
  }
}

function canMiddle(){
  console.log('canMiddle ');
  if(Cboard[4]===""){
    Cboard[4]="O"
    var local = '#5';
    $(local).html(computer);
    for (var i = 0; i < compSingle.length ;i++) {
      compPairs.push(Number(compSingle[i])+5);
    }
    compSingle.push(5);
    console.log(compPairs);
    console.log(compSingle);
    return true;
  }
}

function canSmart(){
  console.log("canSmart")
  var length = playSingle.length;
  if (playSingle[length-1]+playSingle[length-2]===10){
    for (key in Cboard){
      if ((key%2 === 0) && (Cboard[key]==="")){
        Cboard[key] = "O";
        var local = '#' + (Number(key)+1);
        $(local).html(computer);
        for (var i = 0; i < compSingle.length ;i++) {
          compPairs.push(Number(compSingle[i])+(Number(key)+1));
        }
        compSingle.push(Number(key)+1);
        return true;
      }
    }
  }
}


function mustRandom(){
  console.log('mustRandom ');
  function randomIntFromInterval(min,max){
      return Math.floor(Math.random()*(max));
  }
  var emptySpace = [];
  for (key in Cboard){
    if (Cboard[key]===""){
      emptySpace.push(key);
    }
  }
  var rando = randomIntFromInterval(0,(emptySpace.length-1))
  Cboard[emptySpace[rando]]="O";
  var local = '#' + (Number(emptySpace[rando])+1);
  $(local).html(computer);

  for (var i = 0; i < compSingle.length ;i++) {
    compPairs.push( Number(compSingle[i]) + (Number(emptySpace[rando])+1) );
  }
  compSingle.push( (Number(emptySpace[rando])+1) );
}


//loop
//while (!victor){
  //click handler
$(document).ready(function(){

  $('.box').on('click', function(event){
    if (!victor){
      var local = '#' + (event.target.id);
      if(!$(local).html()){
        $(local).html(person);
        Cboard[event.target.id-1] = person;
        if (winer(event.target.id,play,person)){
          victor = person;
          $('h1').html(person + " WINS");
        }else if(tier()){
          $('h1').html("Tie");
        }else{
          //computer turns
          if(canWin()){
            victor = computer;
            $('h1').html(victor + " WINS");
          }
          else if(canBlock()){
          }
          else if(canMiddle()){
          }
          else if (canSmart()){
          }
          else {
            mustRandom();
          }
          Ccount++;
        }
      }
    }
  });

});

  //reset score handler

  //new game handler



  //end loop
//}


