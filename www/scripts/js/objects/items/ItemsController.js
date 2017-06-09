/**
 * Class ItemController
 * @TODO : use heritage for game modes ...
 * */
class ItemsController
{
	static init()
	{
		ItemsController.ItemsGroup = Game.Main.add.group();

		ItemsController.generateItems();

		ItemsController.ItemsTakable = true;
	};

	static update()
	{
		for (let Item of ItemsController.ItemsGroup.children)
		{
			Item.Item.update();
		}

		if (!Game.competitive)
		{
			ItemsController.classicUpdate();
		}
		else
		{
			ItemsController.competitiveUpdate();
		}
	};

	static classicUpdate()
	{
		Game.Main.physics.arcade.overlap(Game.PlayersGroup, ItemsController.ItemsGroup, ItemsController.collidePlayerItemClassic ,null, this);
			
		//Check if player are on a crate
		for (let Item of ItemsController.ItemsGroup.children)
		{
			if (!Item.Item.takable)
			{
				ItemsController.ItemsTakable = false;
			}
		}

		//Player are on crates
		if (ItemsController.ItemsTakable)
		{
			ItemsController.nextWaveClassic();
		}

		ItemsController.ItemsTakable = true;
	};

	static competitiveUpdate()
	{
		Game.Main.physics.arcade.overlap(Game.PlayersGroup, ItemsController.ItemsGroup, ItemsController.collidePlayerItemCompetitive ,null, this);
	};

	static collidePlayerItemClassic(_Player, _Item)
	{
		_Player.Player.newWeapon = _Item.Item.ContentWeaponId;
		_Item.Item.takable = true;
	};

	static collidePlayerItemCompetitive(_Player, _Item)
	{
		if (_Player.Player.id === _Item.Item.playerId)
		{
			_Item.Item.destroy();
			_Player.Player.competitiveScore++;
			_Player.Player.newWeapon = _Item.Item.ContentWeaponId;
			_Player.Player.switchWeapon(_Player.Player.newWeapon);
			ItemsController.generateCompetitiveItem(_Player.Player.id);

			let sumScore = 0;

			//Check next wave
			for (let Player of Game.PlayersGroup.children)
			{
				sumScore += Player.Player.competitiveScore;
			}

			if ((sumScore/Game.PlayersGroup.children.length) > Game.mainScore)
			{
				ItemsController.pastNextWave();
			}
		}

	};

	static generateItems()
	{
		let random = -1;
		let lastRand = -1;

		for (let i = 0; i < Game.nbPlayers; i++)
		{
			while (random === lastRand)
			{
				random = Math.round(Math.random()*(Map.ItemsSpawners.length-1));
			}

			if (!Game.competitive)
			{
				new Item(Map.ItemsSpawners[random].x, Map.ItemsSpawners[random].y);
			}
			else
			{
				new CompetitiveItem(Map.ItemsSpawners[random].x, Map.ItemsSpawners[random].y, i);
			}

			lastRand = random;
		}
	};

	static generateCompetitiveItem(_id)
	{
		let random = Math.round(Math.random()*(Map.ItemsSpawners.length-1));

		new CompetitiveItem(Map.ItemsSpawners[random].x, Map.ItemsSpawners[random].y, _id);
	};

	static nextWaveClassic()
	{
		//Delete all crates/sprites

		for (let i = ItemsController.ItemsGroup.children.length-1; i >= 0; i--)
		{
			ItemsController.ItemsGroup.children[i].Item.destroy();
		}

		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.switchWeapon(Player.Player.newWeapon);
		}

		ItemsController.ItemsGroup.children = [];

		ItemsController.pastNextWave();

		//Regenerate random item
		ItemsController.generateItems();
	};

	static pastNextWave()
	{
		//Update and display score
		Game.mainScore++;
		Game.Text.MainScore.setText(Game.mainScore);

		//Recalculate enemies spawn
		Spawner.setNewWave();

		Map.checkChangeStyle();

		Game.Sounds.NewWave.play();
	};
}