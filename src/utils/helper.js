import moment from 'moment';
import { isEmpty } from 'lodash';

// localstorage belli bir formatta data yazar ve okur
export const localStorageData = {
	prefix: 'next',
	get: item => {
		const localData = JSON.parse(localStorage.getItem(`${localStorageData.prefix}-${item}`));

		if (localData) return localData;
		return null;
	},
	set: (name, data, exp = {}) => {
		const allData = {
			data,
			creation: moment(),
			expiration: moment().add(exp.amount || 3, exp.unit || 'month'),
		};

		return new Promise((resolve, reject) => {
			if (!isEmpty(localStorageData.prefix) && !isEmpty(name)) {
				localStorage.setItem(`${localStorageData.prefix}-${name}`, JSON.stringify(allData));

				const parsed = JSON.parse(localStorage.getItem(`${localStorageData.prefix}-${name}`));

				resolve({
					status: 'success',
					name,
					data: { data: parsed.data, expiration: parsed.expiration, creation: parsed.creation },
				});
			} else {
				reject(new Error(`${name} has not created!`));
			}
		});
	},
	delete: item =>
		new Promise(resolve => {
			if (localStorage.getItem(`${localStorageData.prefix}-${item}`)) {
				localStorage.removeItem(`${localStorageData.prefix}-${item}`);
				resolve(`${item} has been deleted!`);
			} else {
				console.error(`${item} has not found!`);
			}
		}),
	clearExpired: () => {
		// clear expired data
		Object.keys(localStorage).reduce((total, item) => {
			let data;

			try {
				data = JSON.parse(localStorage[item]);

				if (moment(data.expiration).format() < moment().format()) {
					localStorage.removeItem(item);
				}
			} catch (err) {
				console.log('localstorage uzerinde gecersiz kayit tespit edildi');
			}
			return total;
		}, []);
		// clear expired data
	},
};
