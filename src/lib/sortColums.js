export function compare( a, b ) {
	if ( a.id > b.id ){
		return -1;
	}
	if ( a.id < b.id ){
		return 1;
	}
	return 0;
}

export const inputItems = (object) => {
	let test = Object.keys(object[0])
		.map(key => (key !== '_id' && key !== '__v' && key !== undefined) ? key : '',
		).filter(item => item !== '')

return test.reduce(function(acc, cur) {
		acc[cur] = '';
		return acc;

	}, {});
}