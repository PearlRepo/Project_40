class Form{
    constructor(){
       this.input = createInput("").attribute("placeholder", "Enter your name");
       this.button = createButton('PLAY');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.reset = createButton('RESET');
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.html("FRUIT COLLECTOR");
        this.title.position(width/3-70, 10);


        this.input.position(width/2-130,400);

        this.button.position(width/2-60,500);

        this.title.class("bFont");
        this.button.class("btn");
        this.input.class("input");
    

        this.reset.position(width-100, height-50);
        this.reset.class("rbtn");

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            var message = `Hey ${this.input.value()}! </br> Waiting for another player to join...`;
            this.greeting.html(message);
            this.greeting.position(width/2-350,250);
            this.greeting.class("greeting")
        });

        this.reset.mousePressed(() => {
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                playerAtEnd:0,
                players: {}
              });
              window.location.reload();

            
        });

    }
}