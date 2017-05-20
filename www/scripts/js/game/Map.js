/**
 * Static Map Class
 * */
class Map
{
	static construct()
	{
		Log.print("construct map");

		Map.Maps = 
		{
			test_map : 
			{
				name : 'test-map',
				Spawners :
				[
					{x : Game.MainData.width*(1/3), y : 20, direction : 0},
					{x : Game.MainData.width*(2/3), y : 20, direction : 1}
				]
			}
		}

		Map.CurrentMap = Map.Maps.test_map;

		Map.Spawners = [];
	}

	static create()
	{
		Log.print("create map");

		Map.map = Game.Main.add.tilemap(Map.CurrentMap.name);
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

		Spawner.staticConstructor();

		for (let Spawn of Map.CurrentMap.Spawners)
		{
			Map.Spawners.push(new Spawner(Spawn.x, Spawn.y, Spawn.direction));
		}
	}
}