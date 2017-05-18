/**
 * Class player
 * */
class Player
{
	constructor(_x = 50, _y = 50, _scale = 1)
	{
		this.x = _x;
		this.y = _y;
		this.scale = _scale;

		this.speed = 200;

		let bmd = Game.Main.add.bitmapData(30, 30);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 30, 30);
		bmd.ctx.fillStyle = 'white';
		bmd.ctx.fill();

		this.Sprite = Game.Main.add.sprite(this.x, this.y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		this.Sprite.body.collideWorldBounds = true;
		this.Sprite.body.bounce.y = 0;
        this.Sprite.body.bounce.x = 0;
        this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 200;

		this.Buttons =
		{
			top: Game.Main.input.keyboard.addKey(Phaser.Keyboard.Z),
			bottom: Game.Main.input.keyboard.addKey(Phaser.Keyboard.S),
			right: Game.Main.input.keyboard.addKey(Phaser.Keyboard.D),
			left: Game.Main.input.keyboard.addKey(Phaser.Keyboard.Q)
		}
	}

	update()
	{
		this.Sprite.body.velocity.y = 0;
		this.Sprite.body.velocity.x = 0;

		if (this.Buttons.top.isDown)
		{
			this.Sprite.body.velocity.y -= this.speed;
		}
		if (this.Buttons.bottom.isDown)
		{
			this.Sprite.body.velocity.y += this.speed;
		}  
		if (this.Buttons.left.isDown)
		{
			this.Sprite.body.velocity.x -= this.speed;
		}
		if (this.Buttons.right.isDown)
		{
			this.Sprite.body.velocity.x += this.speed;
		}
	}
}