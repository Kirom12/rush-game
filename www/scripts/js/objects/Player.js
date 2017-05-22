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

		let bmd = Graphics.drawRect(30, 30, _color);

		this.Sprite = Game.Main.add.sprite(this.x, this.y, bmd);
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.anchor.setTo(0.5);
		// this.Sprite.body.collideWorldBounds = true;
		this.Sprite.body.bounce.y = 0;
		this.Sprite.body.bounce.x = 0;
		this.Sprite.body.maxVelocity = 500;
		this.Sprite.body.gravity.y = 2000;

		//Weapon
		this.Weapon = new Gun(this);

		this.WeaponData =
		{
			currentWeapon : 0,
			switchHold : false
		}

		this.Buttons = _Buttons;
		
		this.Jump = {
			speed : 800,
			holdSpeed : 500,
			heightDuration : 10,
			time : 0,
			cooldown : 0,
			holdTimer : 0,
			current : false
		}
	};

	update()
	{
		this.Weapon.update();

		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_floor);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_wall);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_gate);

		this.move();

		Game.Main.world.wrap(this.Sprite, 0);
	};

	move()
	{
		this.Sprite.body.velocity.x = 0;
		
		//MOVEMENTS
		if (this.Buttons.left.isDown)
		{
			this.Sprite.body.velocity.x -= this.speed;
			this.Weapon.setOrientation('W');
		}
		if (this.Buttons.right.isDown)
		{
			this.Sprite.body.velocity.x += this.speed;
			this.Weapon.setOrientation('E');
		}

		//FIRE
		if (this.Buttons.fire.isDown)
		{
			this.Weapon.fire();
		}

		//JUMP
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

		if (Game.Debug.god)
		{
			this.debug();
		}
	};

	debug()
	{
		if (this.Buttons.down.isDown && !this.WeaponData.switchHold)
		{
			this.WeaponData.currentWeapon++;
			this.WeaponData.switchHold = true;

			switch(this.WeaponData.currentWeapon)
			{
				case 0:
					this.Weapon = new Gun(this);
					break;
				case 1:
					this.Weapon = new DoubleGun(this);
					break;
				case 2:
					this.Weapon = new AutomaticRifle(this);
					break;
				case 3:
					this.Weapon = new Gatling(this);
					break;
				case 4:
					this.Weapon = new GrenadeLauncher(this);
					break;
				default:
					this.WeaponData.currentWeapon = -1;
			}
		}

		if (this.Buttons.down.isUp)
		{
			this.WeaponData.switchHold = false;
		}
	};
}