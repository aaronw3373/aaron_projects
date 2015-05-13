  var dataRef = new Firebase('https://tick-tack-toe.firebaseio.com');
  var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  var boardRef = new Firebase('https://tick-tack-toe.firebaseio.com/boards');
  var playerRef = new Firebase('https://tick-tack-toe.firebaseio.com/players');

  var gameRef, gameAuth, player;

$(document).ready(function(){
  gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');

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
