/**
 * Class DoubleGun
 * */
class DoubleGun extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawRect(8, 8, '#B00B55')),
			Game.Main.add.weapon(10, Graphics.drawRect(8, 8, '#FFF'))
		]);

		this.Weapons[0].trackSprite(_Player.Sprite, 0, 0, false);
		this.Weapons[1].trackSprite(_Player.Sprite, 0, 0, false);

		for (let Item of this.Weapons)
		{
			Item.bulletSpeed = 800;
			Item.fireRate = 500;
		}

		this.Weapons[0].fireAngle = 0;
		this.Weapons[1].fireAngle = 180;
	};

	update()
	{
		super.update();
	};

	setOrientation(_orientation)
	{
		if (_orientation === 'W')
		{
			this.Weapons[0].fireAngle = 180;
			this.Weapons[1].fireAngle = 0;
		}
		else if (_orientation === 'E')
		{
			this.Weapons[0].fireAngle = 0;
			this.Weapons[1].fireAngle = 180;
		}
		else
		{
			return false;
		}
	};
}