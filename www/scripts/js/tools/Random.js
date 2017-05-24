/**
 * Class Random
 * */
class Random
{
	static rangeInt(_min, _max, _isInclusive = true)
	{
		_isInclusive ? _max++ : _min++;
		return Math.floor(Math.random() * (_max - _min) + _min);
	}
}