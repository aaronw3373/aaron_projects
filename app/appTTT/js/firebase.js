  var dataRef = new Firebase('https://tick-tack-toe.firebaseio.com');
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  var boardRef = new Firebase('https://tick-tack-toe.firebaseio.com/boards');
  var playerRef = new Firebase('https://tick-tack-toe.firebaseio.com/players');

  var gameRef, gameAuth, player;

$(document).ready(function(){
  gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');

  var otherPlayer = function(player) {
    return player === 'X' ? 'O' : 'X';
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

  //User takes turn
  $('.box').on('click', function(e){
    $('#move').prop('disabled', true);
    gameRef.set({player: otherPlayer(player), waitingPlayer: gameAuth.uid});
  });

  //User restarts game
  $('#restart').on('click', function(e){
    $('#move').prop('disabled', true);
    gameRef.set({player: 'X'});
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
    $('#player').text(player);
    $('#move').prop('disabled', disable);
  });



















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
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
  $('#clear').on('click',function(){
    messageRef.set(null);
    $('#messagesDiv').html('');
  });


  boardRef.on('value',function(snapshot){
    var setter = snapshot.val();
    displayBoard(setter);
  });

  playerRef.on('value',function(snapshot){
    var sett = snapshot.val();
    if (win(sett)){
           winner = users[user];
           console.log("the winner is: " + winner);
           $('h1').html(winner + " WINS");
         }else if (tie()){
           console.log("twas a tie");
           $('h1').html("Tie");
         }

    turn();
  });

  function displayBoard(setter){
    for (var i = 0; i < setter.board.length; i++) {
      board[i] = setter.board[i]
      var spot = '#' + (i+1)
      $(spot).html(board[i]);
    };
    //console.log(board);
  }



});
