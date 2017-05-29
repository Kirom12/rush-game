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
		this.Sprite.body.gravity.y = 1000;

		//Weapon
		this.Weapon = new Gun(this);
		this.newWeapon = 0;

		this.WeaponData =
		{
			currentWeapon : 0,
			switchHold : false
		}

		this.Buttons = _Buttons;
		
		this.Jump = {
			speed : 520,
			fallSpeed : 300,
			holdSpeed : 400,
			heightDuration : 13,
			time : 0,
			cooldown : 0,
			holdTimer : 0,
			current : false
		}

		this.getNewItem = true;

		this.score = 0;

		//Add player to the group
		Game.PlayersGroup.add(this.Sprite);
		Game.PlayersGroup.children[Game.PlayersGroup.children.indexOf(this.Sprite)].Player = this;

		Game.Text.Style.PlayerScore.fill = _color;

		//Text
		this.scoreText = Game.Main.add.text((Game.MainData.width/5)*(Game.PlayersGroup.children.indexOf(this.Sprite)+1), 20, this.score, Game.Text.Style.PlayerScore);
		this.scoreText.anchor.set(0.5);
	};

	update()
	{
		this.Weapon.update();

		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_floor);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_wall);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collision_gate);

		this.move();

		Game.Main.world.wrap(this.Sprite, 0);

		this.GUI();
	};

	collideItem(_Player, _Item)
	{
		ItemsController.Items[_Item.arrayIndex].drag();

		for (let Item of ItemsController.Items)
		{
			//console.log(Item.isTakable);

			if (!Item.isTakable)
			{
				this.getNewItem = false;
			}
		}

		if (this.getNewItem)
		{
			this.switchWeapon(ItemsController.Items[_Item.arrayIndex].ContentWeaponId);
			Items[_Item.arrayIndex].destroy();
		}

		this.getNewItem = true;

		//console.log(this.collideItemCheck);
	};

	destroy()
	{
		this.Weapon.destroy();
		this.Sprite.kill();
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
		// if (this.Buttons.up.isDown && this.Sprite.body.onFloor() && Game.Main.time.now > this.Jump.time) {
		// 	this.Jump.holdTimer = 1;
		// 	this.Jump.current = false;

		// 	this.Sprite.body.velocity.y = -this.Jump.speed;
		// 	this.Jump.time = Game.Main.time.now + this.Jump.cooldown;
		// } else if (this.Buttons.up.isDown && this.Jump.holdTimer != 0) { //In jump and key still press
		// 	if (this.Jump.holdTimer > this.Jump.heightDuration) {
		// 		this.Jump.holdTimer = 0;
		// 	} else {
		// 		this.Jump.holdTimer++;
		// 		this.Sprite.body.velocity.y = -this.Jump.holdSpeed;
		// 	}
		// } else {
		// 	this.Jump.holdTimer = 0;
		// }

		if (this.Buttons.up.isDown && this.Sprite.body.onFloor())
		{
			this.Sprite.body.velocity.y = -this.Jump.speed;
		}

		if (Game.Debug.god)
		{
			this.debug();
		}
	};

	GUI()
	{
		this.scoreText.setText(this.score);
	};

	switchWeapon(_weaponId)
	{
		switch(_weaponId)
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
			case 5:
				this.Weapon = new Shotgun(this);
				break;
			case 6:
				this.Weapon = new RocketLauncher(this);
				break;
			case 7:
				this.Weapon = new Laser(this);
				break;
			default:
				this.WeaponData.currentWeapon = -1;
		}
	};

	debug()
	{
		if (this.Buttons.down.isDown && !this.WeaponData.switchHold)
		{
			this.WeaponData.currentWeapon++;
			this.WeaponData.switchHold = true;

			this.switchWeapon(this.WeaponData.currentWeapon);
		}

		if (this.Buttons.down.isUp)
		{
			this.WeaponData.switchHold = false;
		}
	};
}