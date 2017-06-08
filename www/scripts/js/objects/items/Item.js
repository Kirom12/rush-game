/**
 * Class Items
 * */
class Item
{
	constructor(_x, _y)
	{
		//let bmd = Graphics.drawRect(25, 25, 'brown');

		this.Particles = Game.Main.add.emitter(_x, _y, 100);

		this.Particles.makeParticles(Graphics.drawRect(4, 4, '#02ff4a'));
		this.Particles.width = 0;
		this.Particles.minParticleScale = 1;
		this.Particles.maxParticleScale = 1.5;
		this.Particles.gravity.set(0, -500);

		this.Particles.start(false, 200, 5);

		this.Sprite = Game.Main.add.sprite(_x, _y, 'crate');
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		this.Sprite.scale.setTo(1.2);
		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 1000;

		this.ContentWeaponId = Random.rangeInt(0, 7, true);

		this.takable = false;

		ItemsController.ItemsGroup.add(this.Sprite);
		ItemsController.ItemsGroup.children[ItemsController.ItemsGroup.children.indexOf(this.Sprite)].Item = this;
	};

	update()
	{
		this.takable = false;

		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_ground);

		this.Particles.x = this.Sprite.position.x;
		this.Particles.y = this.Sprite.position.y-15;
	};

	destroy()
	{
		this.Sprite.destroy();
		this.Particles.destroy()
	};
}