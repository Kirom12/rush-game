/**
 * Class CompetitiveItem
 * */
class CompetitiveItem extends Item
{
	constructor(_x, _y, _playerId)
	{
		super(_x, _y, _playerId);

		this.playerId = _playerId;
	};
}