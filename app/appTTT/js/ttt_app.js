
$(document).ready(function(){
  $('.box').on('click', function(event){
    if(!winner){
      var local = '#' + (event.target.id);
      if(!$(local).html()){
        turn();
        $(local).html(user?"X":"O");
        if (win(local)){
          winner = users[user];
          console.log("the winner is: " + winner);
          $('h1').html(winner + " WINS");
        }else if (tie()){
          console.log("twas a tie");
          $('h1').html("Tie");
        }
      }
    }
  });


  $('#new').on('click', function(event){
    console.log("New Game");
    for (var i = 1; i < 10; i++) {
      var reset = '#' + (i);
      $(reset).html('');
    };
    $('h1').html("Tic Tac Toe");
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
    $('#yscore').html('Y Score: 0');
    $('#5').css('font-size','10em')
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

