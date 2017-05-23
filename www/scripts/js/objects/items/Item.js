/**
 * Class Items
 * */
class Item
{
	constructor(_x, _y)
	{
		let bmd = Graphics.drawRect(25, 25, 'brown');

		this.Sprite = Game.Main.add.sprite(_x, _y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 2000;
	}
}