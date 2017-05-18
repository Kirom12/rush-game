/**
 * Class player
 * */
class Player
{
	constructor(_x = 50, _y = 50, _color = 'green', _Buttons, _scale = 1)
	{
		this.x = _x;
		this.y = _y;
		this.scale = _scale;

		this.speed = 500;

		let bmd = Game.Main.add.bitmapData(30, 30);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 30, 30);
		bmd.ctx.fillStyle = _color;
		bmd.ctx.fill();

		this.Sprite = Game.Main.add.sprite(this.x, this.y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		// zthis.Sprite.body.collideWorldBounds = true;
		this.Sprite.body.bounce.y = 0;
        this.Sprite.body.bounce.x = 0;
        this.Sprite.body.maxVelocity = 500;
		//this.Sprite.body.gravity.y = 2000;

		this.Jump = {
			speed : 800,
			holdSpeed : 500,
			heightDuration : 10,
			time : 0,
			cooldown : 0,
			holdTimer : 0,
			current : false
		}

		console.log(_Buttons);

		this.Buttons = _Buttons;
	}

	update()
	{
		this.Sprite.body.velocity.x = 0;

		//Movement
		if (this.Buttons.left.isDown)
		{
			this.Sprite.body.velocity.x -= this.speed;
		}
		if (this.Buttons.right.isDown)
		{
			this.Sprite.body.velocity.x += this.speed;
		}

		if (this.Buttons.up.isDown)
		{
			console.log(this.Sprite.body.onFloor());
		}

		//If player is on flood and press a key
		if (this.Buttons.up.isDown && this.Sprite.body.onFloor() && Game.Main.time.now > this.Jump.time) {
			this.Jump.holdTimer = 1;
			this.Jump.current = false;

			this.Sprite.body.velocity.y = -this.Jump.speed;
			//this.Sprite.body.gravity.y = 2000;
			this.Jump.time = Game.Main.time.now + this.Jump.cooldown;
		} else if (this.Buttons.up.isDown && this.Jump.holdTimer != 0) { //In jump and key still press
			if (this.Jump.holdTimer > this.Jump.heightDuration) {
				this.Jump.holdTimer = 0;
			} else {
				this.Jump.holdTimer++;
				this.Sprite.body.velocity.y = -this.Jump.holdSpeed;
				//this.Sprite.body.gravity.y = 2000;
			}
		} else {
			this.Jump.holdTimer = 0;
		}
	}
}