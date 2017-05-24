/**
 * Class ItemController
 * */
class ItemsController
{
	static init()
	{
		ItemsController.Items = [];
		ItemsController.ItemsGroup = Game.Main.add.group();

		ItemsController.generateItems();
	};

	static generateItems()
	{
		let random;

		for (let i = 0; i < Game.nbPlayers; i++)
		{
			random = Math.round(Math.random()*(Map.CurrentMap.ItemsSpawners.length-1));

			ItemsController.Items.push(new Item(Map.CurrentMap.ItemsSpawners[random].x, Map.CurrentMap.ItemsSpawners[random].y));

			ItemsController.Items[ItemsController.Items.length-1].addToGroup();
		}
	};
}