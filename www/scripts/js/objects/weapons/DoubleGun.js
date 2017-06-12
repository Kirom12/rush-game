/**
 * Class DoubleGun
 * */
class DoubleGun extends Weapon
{
	constructor(_Player)
	{
		super(
		[
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(8, 8, 2, '#FCFF24','#FFF')),
			Game.Main.add.weapon(10, Graphics.drawStrokeRect(8, 8, 2, '#FCFF24','#FFF'))
		], _Player, 'gun');

		this.Weapons[0].trackSprite(_Player.Sprite, 0, 0, false);
		this.Weapons[1].trackSprite(_Player.Sprite, 0, 0, false);

		for (let Item of this.Weapons)
		{
			Item.bulletSpeed = 800;
			Item.fireRate = 350;
		}

		this.Weapons[0].fireAngle = 0;
		this.Weapons[1].fireAngle = 180;

		this.damage = 25;
		this.recoil = 0;
	};

	update()
	{
		super.update();
	};

	setOrientation(_orientation)
	{
		if (_orientation === 'W')
		{
			this.Weapons[0].fireAngle = this.defaultAngle.w;
			this.Weapons[1].fireAngle = this.defaultAngle.e;
		}
		else if (_orientation === 'E')
		{
			this.Weapons[0].fireAngle = this.defaultAngle.e;
			this.Weapons[1].fireAngle = this.defaultAngle.w;
		}
		else
		{
			return false;
		}
	};
}