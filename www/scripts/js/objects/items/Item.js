/**
 * Class Items
 * */
class Item
{
	constructor(_x, _y, _playerId = 50)
	{
		//let bmd = Graphics.drawRect(25, 25, 'brown');

		this.Particles = Game.Main.add.emitter(_x, _y, 500);

		let particlesColor = (_playerId != 50)? Game.PlayersGroup.children[_playerId].Player.color : '#02ff4a';

		this.Particles.makeParticles(Graphics.drawRect(4, 4, particlesColor));
		this.Particles.width = 10;
		//this.Particles.setRotation(0, 0);
		//this.Particles.setAlpha(0.5, 0.8);
		this.Particles.setScale(1, 1.5, 1, 1.5);
		this.Particles.gravity.set(0, -200);
		this.Particles.angularDrag = 10;
		//this.Particles.bounce.setTo(0.5, 0.5);
		this.Particles.minParticleSpeed.set(-20, 0);
		this.Particles.maxParticleSpeed.set(20, -500);

		this.Particles.start(false, 400, -10);

		this.Sprite = Game.Main.add.sprite(_x, _y, 'crate');
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		this.Sprite.scale.setTo(1.8, 1);
		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 1000;

		if (_playerId != 50)
		{
			this.Sprite.tint = '0x'+Game.PlayersGroup.children[_playerId].Player.color.substring(1);
		}

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
		this.Particles.destroy()
		this.Sprite.destroy();
	};
}