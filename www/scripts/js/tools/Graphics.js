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

	static drawStrokeRect(_width, _height, _lineWidth,_color, _strokeColor ,_x = 0, _y = 0)
	{
		let bmd = Game.Main.add.bitmapData(_width, _height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(_x, _y, _width, _height);
		bmd.ctx.fillStyle = _color;
		bmd.ctx.fill();
		bmd.ctx.strokeStyle = _strokeColor;
		bmd.ctx.lineWidth = _lineWidth;
		bmd.ctx.stroke();

		return bmd;
	};

	static drawCircle(_radius, _color, _x = 0, _y = 0)
	{
		let bmd = Game.Main.make.bitmapData(_radius*2, _radius*2);
		bmd.circle(_x+_radius, _y+_radius, _radius, _color);

		return bmd;
	};

	static drawStrokeCircle(_radius, _lineWidth, _color, _strokeColor,_x = 0, _y = 0)
	{
		let bmd = Game.Main.make.bitmapData(_radius*2, _radius*2);
		bmd.circle(_x+_radius, _y+_radius, _radius, _color);
		bmd.ctx.strokeStyle = _strokeColor;
		bmd.ctx.lineWidth = _lineWidth;
		bmd.ctx.stroke();

		return bmd;
	};
}