/**
 * Class Particles
 * */
class Particles
{
	static create(_x, _y, _quantity)
	{
		return Game.Main.add.emitter(_x, _y, _quantity);
	}

	static configure(_Emitter ,_Sprite, _minParticleScale, _maxParticleScale, _gravity = null, _width = null)
	{
		_Emitter.makeParticles(_Sprite);
		_Emitter.minParticleScale = 1;
		_Emitter.maxParticleScale = 1.5;
		if (_gravity)
		{
			_Emitter.gravity = _gravity;	
		}
		if (_width)
		{
			_Emitter.width = _width;	
		}
	}

	static start(_Emitter, _x, _y, _explode, _lifeTime, _frequency, _quantity)
	{
		_Emitter.x = _x
		_Emitter.y = _y;
		_Emitter.start(_explode, _lifeTime, _frequency, _quantity);
	}
}