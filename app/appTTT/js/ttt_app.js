var local;
$(document).ready(function(){

  $('.box').on('click', function(event){
    if(!winner){
      local = '#' + (event.target.id);
      if(!$(local).html()){

        board[(event.target.id)-1]=(users[user])
        boardRef.set({board:board});
        playerRef.set({local:local});
      }
    }
  });

  $('#togleChat').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
  });

  $('#new').on('click', function(event){
    console.log("New Game");
    for (var i = 1; i < 10; i++) {
      var reset = '#' + (i);
      $(reset).html('');
    };
    $('h1').html("Tic Tac Toe");
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    user = 0;
    winner = undefined;
    singleX = [];
    sumsX = [];
    singleO = [];
    sumsO = [];
    count = 0;
  });


  $('#reset').on('click', function(event){
    console.log("Reset");
    for (var i = 1; i < 10; i++) {
      var reset = '#' + (i);
      $(reset).html('');
    };
    $('h1').html("Tic Tac Toe");
    $('#xscore').html('X Score: 0');
    $('#oscore').html('O Score: 0');
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    user = 0;
    winner = undefined;
    singleX = [];
    sumsX = [];
    singleO = [];
    sumsO = [];
    count = 0;
    xscore = 0;
    yscore = 0
  });

});

