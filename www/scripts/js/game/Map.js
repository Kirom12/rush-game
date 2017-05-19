/**
 * Static Map Class
 * */
class Map
{
	constructor(){};

	static create()
	{
		Log.print("create map");

		Map.map = Game.Main.add.tilemap('test-map');
		Map.map.addTilesetImage('test-tileset');

		Map.map.Layers =
		{
			main : Map.map.createLayer('main'),
			collision_floor : Map.map.createLayer('collision-floor'),
			collision_wall : Map.map.createLayer('collision-wall'),
			collision_gate : Map.map.createLayer('collision-gate')
		};

		Map.map.Layers.collision_floor.alpha = 0;
		Map.map.Layers.collision_wall.alpha = 0;
		Map.map.Layers.collision_gate.alpha = 0;

		Map.map.setCollisionBetween(1, 200, true, Map.map.Layers.collision_floor);
		Map.map.setCollisionBetween(1, 200, true, Map.map.Layers.collision_wall);
		Map.map.setCollisionBetween(1, 200, true, Map.map.Layers.collision_gate);
	}
}