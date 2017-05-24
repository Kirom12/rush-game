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
		this.Sprite.body.gravity.y = 1000;

		this.ContentWeaponId = Random.rangeInt(0, 5, true);

		this.isTakable = false;
	};

	addToGroup()
	{
		this.Sprite.arrayIndex = ItemsController.Items.indexOf(this);

		ItemsController.ItemsGroup.add(this.Sprite);
	};

	update()
	{
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_floor);
	};

	drag()
	{
		this.isTakable = true;
	};
}