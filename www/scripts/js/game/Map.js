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
			map1 : 
			{
				name : 'map1',
				MobsSpawners :
				[
					{x : Game.MainData.width*(1/3), y : 20+Map.marginTop, direction : 0},
					{x : Game.MainData.width*(2/3), y : 20+Map.marginTop, direction : 1}
				],
				ExitPosition :
				{
					x : Game.MainData.width/2-20, y : (Game.MainData.height-80)
				},
				lifes : 9,
				CollideId :
				{
					min : 4300,
					max : 4400
				}
			},
			map2 : 
			{
				name : 'map2',
				MobsSpawners :
				[
					{x : Game.MainData.width*(1/3)-300, y : 20+Map.marginTop, direction : 1},
					{x : Game.MainData.width*(2/3)+300, y : 20+Map.marginTop, direction : 0}
				],
				ExitPosition :
				{
					x : Game.MainData.width/2-20, y : (Game.MainData.height-80)
				},
				lifes : 9,
				CollideId :
				{
					min : 300,
					max : 400
				}
			},
			map3 : 
			{
				name : 'map3',
				MobsSpawners :
				[
					{x : Game.MainData.width*(1/3)-300, y : 20+Map.marginTop, direction : 1},
					{x : Game.MainData.width*(2/3)+300, y : 20+Map.marginTop, direction : 0}
				],
				ExitPosition :
				{
					x : Game.MainData.width/2-20, y : (Game.MainData.height-80)
				},
				lifes : 9,
				CollideId :
				{
					min : 300,
					max : 400
				}
			}
		};

		Map.ItemsSpawners =
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
		];

		//Styles
		Map.StyleChangeData =
		{
			currentWave: 0,
			changeEvery: 5,
			currentStyle : 0
		};

		Map.Styles =
		[
			{
				name : 'Dirt',
				bgColor : '#3c7993',
				tileset : 'world-sp-0',
				Music : Game.Musics.Main,
				effect : null,
				duration : 4
			},
			{
				name : 'Purple',
				bgColor : '#141E42', //#141E42
				tileset : 'world-sp-1',
				Music : Game.Musics.M3,
				effect : 'fat-monster',
				duration : 4
			},
			{
				name : 'Sand',
				bgColor : '#c68b15',
				tileset : 'world-sp-3',
				Music : Game.Musics.M2, //Change music
				effect : 'full-runner',
				duration : 2
			},
			{
				name : 'Stone',
				bgColor : '#1e1a1a',
				tileset : 'world-sp-2',
				Music : Game.Musics.M3, //Change music
				effect : 'full-fatty',
				duration : 3
			}
		];


		switch(Game.currentMap)
		{
			case 'map1':
				Map.CurrentMap = Map.Maps.map1;
				break;
			case 'map2':
				Map.CurrentMap = Map.Maps.map2;
				break;
			case 'map3':
				Map.CurrentMap = Map.Maps.map3;
				break;
		}

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
		};
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

		Map.map.setCollisionBetween(Map.CurrentMap.CollideId.min, Map.CurrentMap.CollideId.max, true, Map.map.Layers.collide_ground);
		Map.map.setCollisionBetween(Map.CurrentMap.CollideId.min, Map.CurrentMap.CollideId.max, true, Map.map.Layers.collide_wall);

		Spawner.staticConstructor();

		for (let Spawn of Map.CurrentMap.MobsSpawners)
		{
			Map.Spawners.push(new Spawner(Spawn.x, Spawn.y, Spawn.direction));
		}

		ItemsController.init();

		Map.Text.MapLifes = Game.Main.add.text(Map.CurrentMap.ExitPosition.x, Map.CurrentMap.ExitPosition.y-10, Map.mapLifes, Map.Text.Style.MapLifes);
		Map.Text.MapLifes.anchor.set(0.5);
	}

	static changeStyle(_styleId, _lastStyleId)
	{
		Map.map.Layers.main.destroy();
		Map.map.Layers.top.destroy();


		//Change music
		Map.Styles[_lastStyleId].Music.Fx.pause();
		Map.Styles[_styleId].Music.Fx.play('', 0, Game.Volume.music*Map.Styles[_styleId].Music.volume);

		Spawner.styleEffect = Map.Styles[_styleId].effect;
		Map.StyleChangeData.changeEvery = Map.Styles[_styleId].duration;

		//Change background
		Game.Main.stage.backgroundColor = Map.Styles[_styleId].bgColor;

		//Change tileset
		Map.map.addTilesetImage('world-sp-0', Map.Styles[_styleId].tileset);
		Map.map.addTilesetImage('world-sp-1');

		//Reorganise layers
		Map.map.Layers.main = Map.map.createLayer('main');
		Game.Main.world.bringToTop(Map.EnemiesGroup);
		Map.map.Layers.top =  Map.map.createLayer('top');

		Game.Main.world.bringToTop(ItemsController.ItemsGroup);
		Game.Main.world.bringToTop(Game.PlayersGroup);

		Game.createIconsElements();
	}

	static checkChangeStyle()
	{
		let random = 0;

		Map.StyleChangeData.currentWave++;

		if (Map.StyleChangeData.currentWave >= Map.StyleChangeData.changeEvery)
		{
			Map.StyleChangeData.currentWave = 0;

			while (random === Map.StyleChangeData.currentStyle)
			{
				random = Random.rangeInt(0, Map.Styles.length-1, true);
			}

			Map.changeStyle(random, Map.StyleChangeData.currentStyle);

			Map.StyleChangeData.currentStyle = random;
		}
	}
}