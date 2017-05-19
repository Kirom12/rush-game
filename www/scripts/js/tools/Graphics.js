/**
 * Static Graphics class
 * */
class Graphics
{
	constructor(){};

	static drawRect(_width, _height, _color ,_x = 0, _y = 0)
	{
		let bmd = Game.Main.add.bitmapData(_width, _height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(_x, _y, _width, _height);
		bmd.ctx.fillStyle = _color;
		bmd.ctx.fill();

		return bmd;
	};
}