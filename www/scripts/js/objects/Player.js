/**
 * Class player
 * */
class Player
{
	constructor(_x = 50, _y = 50, _id = 0, _name = 'Player 1', _color = 'green', _Buttons, _scale = 1)
	{
		this.x = _x;
		this.y = _y;
		this.scale = _scale;

		this.id = _id,
		this.name = _name;

		this.speed = 500;

		let bmd = Graphics.drawRect(30, 30, _color);

		this.Sprite = Game.Main.add.sprite(this.x, this.y, 'player');
		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.scale.setTo(0.6);

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

		this.Skills =
		{
			Slow : new Slow(),
			WeaponChange : new WeaponChange()
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

		this.maxScore = 600;
		this.score = 0;
		this.mana = 0;

		this.orientation = 'E';

		this.Sprite.tint = '0x'+_color.substring(1);

		//Anmations
		this.Sprite.animations.add('idle-W', [31], 5, true);
		this.Sprite.animations.add('idle-E', [8], 5, true);
		this.Sprite.animations.add('left', [16, 17, 18 , 19, 20 , 21, 22, 24, 25, 26, 27, 28, 29, 30], 20, true);
		this.Sprite.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15], 20, true);

		//Add player to the group
		Game.PlayersGroup.add(this.Sprite);
		Game.PlayersGroup.children[Game.PlayersGroup.children.indexOf(this.Sprite)].Player = this;

		Game.Text.Style.PlayerScore.fill = _color;

		//Text
		this.Texts =
		{
			Score : Game.Main.add.text((Game.MainData.width/3)*(this.id+1), 18, this.name + ' - ' +this.score, Game.Text.Style.PlayerScore),
			ManaText : Game.Main.add.text((Game.MainData.width/3)*(this.id+1)-80, 35, 'Magic', Game.Text.Style.PlayerManaText),
			ManaValue : Game.Main.add.text((Game.MainData.width/3)*(this.id+1)+60, 25, this.mana + '/' + this.maxScore, Game.Text.Style.PlayerManaValue),
			Skills : Game.Main.add.text((Game.MainData.width/3)*(this.id+1), 55, 'Slow (' + String.fromCharCode(this.Buttons.slow.keyCode) + ')(300) Weapon(' + String.fromCharCode(this.Buttons.weapon.keyCode) + ')(400) Other(' + String.fromCharCode(this.Buttons.other.keyCode) + ')(?)', Game.Text.Style.Skills),
			PlayerStatus : Game.Main.add.text(0,0, '', Game.Text.Style.PlayerStatus)
		};

		this.Texts.Score.anchor.set(0.5);
		this.Texts.ManaText.anchor.set(0.5);
		this.Texts.Skills.anchor.set(0.5);
		this.Texts.PlayerStatus.anchor.set(0.5);
		//this.Texts.ManaValue.anchor.set(0.5);

		this.Texts.PlayerStatus.alpha = 0;

		//Bar
		this.ManaBar = new HealthBar(Game.Main, Game.BarConfig.Mana);
		this.ManaBar.setPosition((Game.MainData.width/3)*(this.id+1), 33);

		this.ManaBar.setPercent((this.mana/this.maxScore)*100);
	};

	update()
	{
		this.Weapon.update();

		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_ground);
		Game.Main.physics.arcade.collide(this.Sprite, Map.map.Layers.collide_wall);

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

	displayMessage(_text, _color = '#ff0044')
	{
		this.Texts.PlayerStatus.fill = _color;

		this.Texts.PlayerStatus.alpha = 1;

		this.Texts.PlayerStatus.setText(_text);

		Game.Main.time.events.add(Phaser.Timer.SECOND * 0.5, function()
		{
			this.Texts.PlayerStatus.alpha = 0;
		}, this);
	}

	move()
	{
		this.Texts.PlayerStatus.position.x = this.Sprite.position.x;
		this.Texts.PlayerStatus.position.y = this.Sprite.position.y-25;

		this.Sprite.body.velocity.x = 0;
		
		//MOVEMENTS
		if (this.Buttons.left.isDown)
		{
			this.Sprite.animations.play('left');
			this.Sprite.body.velocity.x -= this.speed;
			this.orientation = 'W';
			this.Weapon.setOrientation(this.orientation);
		}
		else if (this.Buttons.right.isDown)
		{
			this.Sprite.animations.play('right');
			this.Sprite.body.velocity.x += this.speed;
			this.orientation = 'E';
			this.Weapon.setOrientation(this.orientation);
		}
		else
		{
			this.Sprite.animations.play('idle-'+this.orientation);
		}

		//SKILLS
		if (this.Buttons.slow.isDown)
		{
			this.Skills.Slow.activate(this);
		}

		if (this.Buttons.weapon.isDown)
		{
			this.Skills.WeaponChange.activate(this);
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
		this.Texts.Score.setText(this.name + ' - ' +this.score);
		this.ManaBar.setPercent((this.mana/this.maxScore)*100);
		this.Texts.ManaValue.setText(this.mana + '/' + this.maxScore);
	};

	increaseScore(_points)
	{
		this.score += _points;

		this.mana += _points;
		if (this.mana > this.maxScore) this.mana = this.maxScore;
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