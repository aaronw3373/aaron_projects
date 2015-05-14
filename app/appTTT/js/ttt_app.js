$(document).ready(function(){
//show chat
  $('#togleChat').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
  });

  //choose play type
  $('#login').on('click', function(event){
    $('#login').toggle(500, 'swing');
    $('#playbox').toggle(500,'swing');

    //start play over network;
    if (event.target.id=== 'network'){

      function win(current){
        current = parseInt(current.charAt(1));
        if (player==="X"){
          for (var i = 0; i < sumsX.length; i++) {
            if (sumsX[i] + current === 15){
              return true;
            }
          }
          for (var j = 0; j < singleX.length; j++) {
            sumsX.push(singleX[j]+current);
          }
          singleX.push(current);
        } else if(player==="O"){
            for (var k = 0; k < sumsO.length; k++) {
              if (sumsO[k] + current === 15){
                return true;
              }
            }
            for (var l = 0; l < singleO.length; l++) {
              sumsO.push(singleO[l]+current);
            }
            singleO.push(current);
          }
      }

      function tie(){
        if (count === 8){
          winner = "tie";
          return true;
        }
        count += 1;
      }

      function newGame(){
        $('h1').html("Tic Tac Toe");
        board = ["","","","","","","","",""];
        disable = false;
        singleX = [];
        sumsX = [];
        singleO = [];
        sumsO = [];
        count = 0;
        gameRef.set({board:board, player:"X"});
      }

      function resett(){
        xscore = 0;
        yscore = 0;
        $('#xscore').html('X Score: 0');
        $('#oscore').html('O Score: 0');
        newGame();
      }

      function displayChatMessage(name, text) {
          $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
          $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      }

      function displayBoard(setter){
        for (var i = 0; i < setter.length; i++) {
          board[i] = setter[i];
          var spot = '#' + (i+1);
          $(spot).html(board[i]);
        }
      }



      var local;
      var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
      var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
      var gameAuth;
      var player;
      var board = ["","","","","","","","",""];
      var winner;
      var singleX = [];
      var sumsX = [];
      var singleO = [];
      var sumsO = [];
      var xscore = 0;
      var oscore = 0;
      var count = 0;
      var disable = false;

      $(document).ready(function(){
        gameRef.set({board:board, player:"X", resett:true});

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


        //click function
        $('.box').on('click', function(event){
          if( disable===false && !winner){
            local = '#' + (event.target.id);
            if(!$(local).html()){

              board[(event.target.id)-1]=(player);

              var firebaseData = {
                board: board,
                player: otherPlayer(player),
                waitingPlayer: gameAuth.uid,
                local: local
              };

              if (win(local)){
                winner = player;
                if (player === "X"){
                  xscore++;
                }else{
                  oscore++;
                }
                firebaseData.winner = winner;
                firebaseData.xscore = xscore;
                firebaseData.oscore = oscore;
              }else if (tie()){
                  firebaseData.winner = winner;
                }

              gameRef.set(firebaseData);

              disable = true;

            }

          }
        });

         //On load, set up event handling on the object at "gameRef"
        gameRef.on('value', function(snapshot) {
          var snap = snapshot.val();
          displayBoard(snap.board);

          if (snap.newGame){
            newGame();
          }
          if (snap.resett){
            resett();
          }

          disable = false;

          if (gameAuth.uid === snap.waitingPlayer) {
            player = otherPlayer(snap.player);
            disable = true;
          } else {
            player = snap.player;
          }

          if (snap.winner){
            disable = true;
            if (snap.winner === "tie"){
              console.log("twas a tie");
                $('h1').html("Tie");
              }else{
                xscore = snap.xscore;
                oscore = snap.oscore;

                $('#oscore').html('O Score: ' + oscore);
                $('#xscore').html('X Score: ' + xscore);
                console.log("the winner is: " + snap.winner);
                $('h1').html(snap.winner + " WINS");
                }
          }

        });


        //reset board keep scores
        $('#new').on('click', function(){
          gameRef.set({board:board, player:"X", newGame:true});
        });

        //reset scores and board
        $('#reset').on('click', function(){
          gameRef.set({board:board, player:"X", resett:true});
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


  //end play over Network
      });

  //start play locally
    }else if(event.target.id=== 'local'){
        var user = 0;
        var users = ["O","X"];
        var count = 0;
        var winner = undefined;
        var singleX = [];
        var sumsX = [];
        var singleO = [];
        var sumsO = [];
        var xscore = 0;
        var oscore = 0;

      function turn(){
        user = 1-user;
        return user;
      }

      function win(local){
        local = parseInt(local.charAt(1));
        if (user){
          for (var i = 0; i < sumsX.length; i++) {
            if (sumsX[i] + local === 15){
              xscore++;
              $('#xscore').html('X Score: ' + xscore);
              return true;
            }
          }
          for (var j = 0; j < singleX.length; j++) {
            sumsX.push(singleX[j]+local);
          }
          singleX.push(local);
          console.log("singleX: " + singleX);
          console.log("sumsX: " + sumsX);
        } else {
            for (var k = 0; k < sumsO.length; k++) {
              if (sumsO[k] + local === 15){
                oscore++;
                $('#oscore').html('O Score: ' + oscore);
                return true;
              }
            }
            for (var l = 0; l < singleO.length; l++) {
              sumsO.push(singleO[l]+local);
            }
            singleO.push(local);
            console.log("singleO: " + singleO);
            console.log("sumsO: " + sumsO);
          }
      }

      function tie(){
        if (count === 8){
          winner = "tie";
          return true;
        }
        console.log(count);
        count += 1;
      }


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
          $('#oscore').html('O Score: 0');
          $('#5').css('font-size','10em')
          user = 0;
          winner = undefined;
          singleX = [];
          sumsX = [];
          singleO = [];
          sumsO = [];
          count = 0;
          xscore = 0;
          oscore = 0
        });

      })



      //end play locally
    }



    //click jquery to choose online or local
  })

//doc ready over all
});

