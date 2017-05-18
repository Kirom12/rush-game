/**
 * Static Map Class
 * */
class Map
{
	constructor(){};

	static create()
	{
		Log.print("create map");

		Map.map = Game.Main.add.tilemap('map');

	}
}