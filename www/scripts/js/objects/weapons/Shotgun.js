/**
 * Class Shotgun
 * */
class Shotgun extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(20, 6, 2,'#FCFF24', '#FFF')),
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(20, 6, 2,'#FCFF24', '#FFF')),
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(20, 6, 2,'#FCFF24', '#FFF')),
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(20, 6, 2,'#FCFF24', '#FFF')),
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(20, 6, 2,'#FCFF24', '#FFF'))
		], _Player, 'shotgun');

		this.WeaponAngles = [2, 0, -2, -4, -6]

		for (let i = 0; i < this.Weapons.length; i++)
		{
			this.Weapons[i].trackSprite(_Player.Sprite, 0, this.WeaponAngles[i], false);
			this.Weapons[i].fireAngle = this.WeaponAngles[i];

			this.Weapons[i].bulletSpeed = 800;
			this.Weapons[i].fireRate = 500;
		}

		this.damage = 50;
		this.recoil = 15;

		this.Camera = 
		{
			strength : 0.003,
			time : 200
		}
	};

	update()
	{
		super.update();
	};

	setOrientation(_orientation)
	{
		super.setOrientation(_orientation);

		for (let i = 0; i < this.Weapons.length; i++)
		{
			if (_orientation === 'E')
			{
				this.Weapons[i].fireAngle += this.WeaponAngles[i];
			}
			else
			{
				this.Weapons[i].fireAngle -= this.WeaponAngles[i];	
			}
		}
	};
}