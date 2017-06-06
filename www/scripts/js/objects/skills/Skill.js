/**
 * Class Skill
 * */
class Skill
{
	constructor(_name, _duration, _price)
	{
		this.name = _name;

		this.duration = _duration;
		this.price = Game.Debug.skillGod ? 10 : _price;

		this.isActivated = false;
	}

	activate(_Player)
	{
		if (this.isActivated || _Player.mana < this.price)
		{
			if (!this.isActivated)
			{
				_Player.displayMessage('No mana!');	
			}

			return false;
		}

		Game.Text.Skill = Game.Main.add.text(Game.MainData.width/2, Game.MainData.height/2, this.name, Game.Text.Style.SkillCenterText);
		Game.Text.Skill.anchor.setTo(0.5);
		Game.Text.Skill.alpha = 1;
		Game.Main.add.tween(Game.Text.Skill).to( { alpha: 0 }, 1500, "Linear", true);

		Game.Text.SkillCorner = Game.Main.add.text(Game.MainData.width-75, 85, this.name, Game.Text.Style.SkillCornerText);
		Game.Text.SkillCorner.anchor.setTo(0.5);

		return true;
	};

	deactivate()
	{
		Game.Text.SkillCorner.destroy();
		Game.Text.Skill.destroy();
	};
}