/**
 * Class PlayState
 * */
class PlayState
{
    constructor()
    {

    }

    preload()
    {

    }

    create()
    {
        Game.Main.physics.startSystem(Phaser.Physics.ARCADE);

        this.Player = new Player();

        console.log("playState - create");
    }

    update()
    {
        this.Player.update();
    }
}