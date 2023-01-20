class Game{
    constructor(){
        this.greeting = createElement('h2');
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {

            if(!waitM.isPlaying()){
                waitM.loop();
            }

            

            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(width/2-150,500);
        player1.addImage("player1",player1_img);
        player1.scale=0.01;
        
        player2 = createSprite(width/2+150,500);
        player2.addImage("player2", player2_img);
        player2.scale=0.01;
        players=[player1,player2];

        console.log("⭐INSTRUCTIONS⭐");
        console.log("➡ Use left and right arrow keys to move your basket.");
        console.log("➡ Collect 20 fruits to win!");
        }
    
    play(){
        
        form.hide();

        if(waitM.isPlaying()){
            waitM.stop();
        }

        if(!playM.isPlaying()){
            playM.loop();
            playM.setVolume(0.2);
        }

        Player.getPlayerInfo();
        player.getPlayerAtEnd();
        
            if (allPlayers !== undefined){        
        
            image(back_img, 0, 0, width, height);
        
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        for(var plr in allPlayers){
    
    
        index = index+1;
        x = 500-allPlayers[plr].distance;
        y=500;
        
        players[index -1].x = x;
        players[index - 1].y = y;
        
        if(index === player.index){
            
        textSize(25);
        stroke("black");
        fill("lightblue");
        textFont("Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
            // add code to display the player name on the respective basket
            text(allPlayers[plr].name, x-20, y+10)
        }
        textSize(30);
        stroke("black");
        fill("white");
        textFont("Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
        text("LEADERBOARD",70,50);
        text(allPlayers.player1.name + "   " +allPlayers.player1.score,60,120);
        text(allPlayers.player2.name + "   " + allPlayers.player2.score, 60, 190);
    
    }

        if(player.score>=20){
            gameState = 2; 
            player.rank += 1;
            Player.updatePlayerAtEnd(player.rank);
            player.update();
            if (!cheerS.isPlaying()) {
                cheerS.play();
            }
            
        }
            

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 20
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 20
            player.update();
        }

        if (frameCount % 50 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
            
        }
        
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    player.score =player.score+1;
                    player.update();  
                    dropS.play();
                }
            }
    }}
    }
    
    
   // showRank() {
  //      alert("Awesome !! You finished the game! You rank is :" +player.rank)
   //   }

gameOver() {
    if (player.rank==1) {
        this.greeting.class("Egreeting");
        var message = `YOU WON!</br> You got 1st place`;
                this.greeting.html(message);
                this.greeting.position(width/2-130,250);
    }
    if (player.rank==2) {
        this.greeting.class("Egreeting");
        var message = `Good job!</br> You got 2nd place`;
                this.greeting.html(message);
                this.greeting.position(width/2-130,250);
    }

    }
    
    end(){
       console.log("Game Ended");
       console.log(player.rank)
       this.gameOver();
    }
}