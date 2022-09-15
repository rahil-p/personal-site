export const gcd = (a: number, b: number): number => {
	return b ? gcd(b, a % b) : a;
};

export const decimalToFraction = (_decimal: number) => {
	const top = _decimal.toString().replace(/\d+[.]/, '');

	const denominator = 10 ** top.length;
	const numerator = parseInt(top, 10) + (_decimal > 1 ? Math.floor(_decimal) * denominator : 0);

	const divisor = gcd(numerator, denominator);

	return [numerator / divisor, denominator / divisor];
};
