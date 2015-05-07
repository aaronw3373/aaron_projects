/* Global Battleship */
'use strict';

$(document).ready(function(){
  console.log("Page loaded, ready for set up")
  Battleship.Setup.setBoard();
  //promt user 1 to click square and use w-a-s-d for
  //direction of 3 length piece
  var location;
  var direction;
  $('#piece').click(function(event) {
    console.log("You clicked: " + event.target.id);
    location = event.target.id;
  });
  $('body').keypress(function(e){
    if (e.which!==13){
      console.log("You pressed: " + String.fromCharCode(e.which));
      direction = String.fromCharCode(e.which);
    }
    else if (e.which === 13){
      console.log(" You pressed: Enter");
      if(!Battleship.Setup.piecesSet){
        if(!location||!direction){
          console.log("please click a square in the bottom board and w-a-s-d for direction to set piece");
        }
        else{
          console.log(" Setting Piece at: " + location + "in direction: " + direction);
          Battleship.Setup.setPiece(location,direction);
        };
      }
    }
  });



});
