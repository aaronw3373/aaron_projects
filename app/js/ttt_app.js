$(document).ready(function(){
  $('div').on('click', function(event){
    if(!winner){
      var local = '#' + (event.target.id);
      if(!$(local).html()){
        turn();
        $(local).html(user?"X":"O");
        if (win(local)){
          winner = users[user];
          console.log("the winner is: " + winner);
          $('#5').html('R');
        }else if (tie()){
          console.log("twas a tie");
          $('#5').html('R');
        }
      }
    }
  });
  $('#5').on('click', function(event){
    if(winner){
      console.log("Restart")
      for (var i = 1; i < 10; i++) {
        var reset = '#' + (i);
        $(reset).html('');
      };
      user = 0;
      winner = undefined;
      singleX = [];
      sumsX = [];
      singleO = [];
      sumsO = [];
      count = 0;
    }
  });
});

