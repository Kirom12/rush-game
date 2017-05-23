/**
 * Class ItemController
 * */
class ItemsController
{
	static init()
	{
		ItemsController.Items = [];

		ItemsController.generateItems();
	};

	static generateItems()
	{
		let random;

		for (let i = 0; i < Game.nbPlayers; i++)
		{
			random = Math.round(Math.random()*(Map.CurrentMap.ItemsSpawners.length-1));

			ItemsController.Items.push(new Item(Map.CurrentMap.ItemsSpawners));
		}
	};
}