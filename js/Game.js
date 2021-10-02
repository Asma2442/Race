class Game {
  constructor() {}

  getState() {
    database.ref("gameState").on("value", function(data) {
      gameState = data.val();
    });
  }
  updateState(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage(car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage(car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  play() {
    form.hide();
    Player.getPlayersInfo();

    if (players !== undefined) {
      background("lightblue")
      image(track, 0, -height * 5, width, height * 6);

      var index = 0;
      for (var i in players) {
        index = index + 1;
        var x = players[i].positionX;
        var y = height - players[i].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          camera.position.y = cars[index - 1].position.y;
        }
      }

      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.updateDistance();
      }

      drawSprites();
    }
  }
}
