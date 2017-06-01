/**
 * Static Map Class
 * */
class Map
{
	static construct()
	{
		Log.print("construct map");

		Map.marginTop = 64;

		Map.Maps = 
		{
			test_map : 
			{
				name : 'map1',
				MobsSpawners :
				[
					{x : Game.MainData.width*(1/3), y : 20+Map.marginTop, direction : 0},
					{x : Game.MainData.width*(2/3), y : 20+Map.marginTop, direction : 1}
				],
				ItemsSpawners :
				[
					{x : 80, y : 150+Map.marginTop},
					{x : Game.MainData.width-80, y : 150+Map.marginTop},
					{x : 400, y : 250+Map.marginTop},
					{x : Game.MainData.width-400, y : 250+Map.marginTop},
					{x : 200, y : 470+Map.marginTop},
					{x : Game.MainData.width-200, y : 470+Map.marginTop},
					{x : 115, y : 730+Map.marginTop},
					{x : Game.MainData.width-115, y : 730+Map.marginTop},
					{x : 400, y : 610+Map.marginTop},
					{x : Game.MainData.width-400, y : 610+Map.marginTop},
					{x : 620, y : 365+Map.marginTop}
				],
				ExitPosition :
				{
					x : Game.MainData.width/2-20, y : (Game.MainData.height-80)
				},
				lifes : 9
			}
		};


		Map.CurrentMap = Map.Maps.test_map;

		Map.Spawners = [];
		
		Map.Enemies = [];

		Map.mapLifes = Map.CurrentMap.lifes;

		//Text
		Map.Text = 
		{
			Style : 
			{
				MapLifes :
				{
					font: "25px Arial",
					fill: "#ff0044",
					align: "center"
				}
			}
		}
	}

	static create()
	{
		Log.print("create map");

		Game.Main.stage.backgroundColor = "#4488a6";

		Map.map = Game.Main.add.tilemap(Map.CurrentMap.name);

		Map.map.addTilesetImage('world-sp-0');
		Map.map.addTilesetImage('world-sp-1');
		Map.map.addTilesetImage('gui');

		Map.map.Layers =
		{
			main : Map.map.createLayer('main'),
			collide_ground : Map.map.createLayer('collide-ground'),
			collide_wall : Map.map.createLayer('collide-wall'),
			gui : Map.map.createLayer('gui')
		};

		Map.EnemiesGroup = Game.Main.add.group();

		Map.Cat = new Cat(Map.CurrentMap.ExitPosition.x, Map.CurrentMap.ExitPosition.y); 

		Map.map.Layers.top =  Map.map.createLayer('top');

		Map.map.Layers.collide_ground.alpha = 0;
		Map.map.Layers.collide_wall.alpha = 0;

		Map.map.setCollisionBetween(4300, 4400, true, Map.map.Layers.collide_ground);
		Map.map.setCollisionBetween(4300, 4400, true, Map.map.Layers.collide_wall);

		Spawner.staticConstructor();

		for (let Spawn of Map.CurrentMap.MobsSpawners)
		{
			Map.Spawners.push(new Spawner(Spawn.x, Spawn.y, Spawn.direction));
		}

		ItemsController.init();

		Map.Text.MapLifes = Game.Main.add.text(Map.CurrentMap.ExitPosition.x, Map.CurrentMap.ExitPosition.y-10, Map.mapLifes, Map.Text.Style.MapLifes);
		Map.Text.MapLifes.anchor.set(0.5);
	}
}