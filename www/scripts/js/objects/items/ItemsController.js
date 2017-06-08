/**
 * Class ItemController
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

		Game.Main.physics.arcade.overlap(Game.PlayersGroup, ItemsController.ItemsGroup, ItemsController.collidePlayerItem ,null, this);

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
			ItemsController.nextWave();
		}

		ItemsController.ItemsTakable = true;
	};

	static collidePlayerItem(_Player, _Item)
	{
		_Player.Player.newWeapon = _Item.Item.ContentWeaponId;
		_Item.Item.takable = true;
	}

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

			new Item(Map.ItemsSpawners[random].x, Map.ItemsSpawners[random].y);

			lastRand = random;
		}
	};

	static nextWave()
	{
		//Delete all crates/sprites
		for (let Item of ItemsController.ItemsGroup.children)
		{
			Item.Item.destroy();
		}

		for (let Player of Game.PlayersGroup.children)
		{
			Player.Player.switchWeapon(Player.Player.newWeapon);
		}

		ItemsController.ItemsGroup.children = [];

		//Update and display score
		Game.mainScore++;
		Game.Text.MainScore.setText(Game.mainScore);

		//Recalculate enemies spawn
		Spawner.setNewWave();

		Map.checkChangeStyle();

		Game.Sounds.NewWave.play();

		//Regenerate random item
		ItemsController.generateItems();
	}
}