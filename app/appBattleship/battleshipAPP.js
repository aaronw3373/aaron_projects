/* Global Battleship */
'use strict';

$(document).ready(function(){
  console.log("Page loaded, ready for set up")
  //define b1 as the return object of Battleship.Setup
  var battle = Battleship.Setup;
  battle.setBoard();
  //promt user 1 to click square and use w-a-s-d for
  //direction of 3 length piece
  //create variables to be set to click locations
  //and keys
  var location;
  var key;
  var local;

  //when clicking on piece which is the id for piece board
  //the bottom board do this
  $('#piece').click(function(event) {
    console.log("You clicked: " + event.target.id);
    location = event.target.id;
  });
  $('body').keypress(function(e){
    if (e.which!==13){
      console.log("You pressed: " + String.fromCharCode(e.which));
      key = String.fromCharCode(e.which);
    }
    else if (e.which === 13){
      console.log(" You pressed: Enter");
      if (!battle.piecesSet){
        if(!location||!key){
          console.log("please click a square in the bottom board and w-a-s-d for direction to set piece");
        } else {
          console.log(" Setting Piece at: " + location + " in direction: " + key);
          battle.setPiece(location,key);
          if (battle.p1.set === true && battle.p2.set === true){
            battle.piecesSet = true;
            console.log("Both are set");

          }
        };
      }
      battle.colorChanger();
    }
  });

  $('#guess').click(function(event) {
    if(battle.piecesSet === true){
      local = event.target.id;
      console.log("You clicked: " + event.target.id);
      Battleship.Play.userGuess(local);
    }
  });



});
