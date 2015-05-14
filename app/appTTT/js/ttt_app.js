  var local;
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  var boardRef = new Firebase('https://tick-tack-toe.firebaseio.com/boards');
  var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
  var playerRef = new Firebase('https://tick-tack-toe.firebaseio.com/game/player');
  var winRef = new Firebase('https://tick-tack-toe.firebaseio.com/game/win');
  var gameAuth, player;
  var board = ["","","","","","","","",""];
  var winner;
  var singleX = [];
  var sumsX = [];
  var singleO = [];
  var sumsO = [];
  var xscore = 0;
  var oscore = 0;
  var count = 0;

$(document).ready(function(){



  var otherPlayer = function(player) {
    if (player==="X"){
      player = "O";
    }else if(player==="O"){
      player = "X";
    }else{
      player = "X";
    }

    return player;
  };

  //Get a "unique" id for the user
  if (!(gameAuth = gameRef.getAuth())) {
    gameRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        gameAuth = authData;
      }
    });
  }
  //click function
  $('.box').on('click', function(event){
    if(!winner){
      local = '#' + (event.target.id);
      if(!$(local).html()){

        $('.box').prop('disabled', true);
        board[(event.target.id)-1]=(player)
        boardRef.set({board:board});
        debugger;
        gameRef.set({player: otherPlayer(player), waitingPlayer: gameAuth.uid, local:local});
      }
    }
  });

  //reset board keep scores
  $('#new').on('click', function(event){
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    newGame();
  });

  //reset scores and board
  $('#reset').on('click', function(){
    board = ["","","","","","","","",""];
    boardRef.set({board:board});
    resett();
  });

  //show chat
  $('#togleChat').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
  });

  //chat calls
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      messageRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });
  messageRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  $('#clear').on('click',function(){
    messageRef.set(null);
    $('#messagesDiv').html('');
  });

  //board server and winner call
  boardRef.on('value',function(snapshot){
    var setter = snapshot.val();
    displayBoard(setter);
  });

  //On load, set up event handling on the object at "gameRef"
  gameRef.on('value', function(snapshot) {
    var message = snapshot.val();
    var disable = false;
    if (message) {
      if (gameAuth.uid === message.waitingPlayer) {
        player = otherPlayer(message.player);
        disable = true;
      } else {
        player = message.player;
      }
    }
    if(message.local){
      if (win(message.local)){
         var winner = player;
         messege.set({winner:winner});
         console.log("the winner is: " + winner);
         $('h1').html(winner + " WINS");
      }else if (tie()){
          message.set({winner:winner});
          console.log("twas a tie");
          $('h1').html("Tie");
        }
    }


    $('.box').prop('disabled', disable);
  });

  winRef.on('value', function(snapshot) {
    newGame();
  });

});

