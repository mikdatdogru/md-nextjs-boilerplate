import { SET_LOCALE, GET_LOCALE } from './index';
import createDispatcher from '../utils/createDispatcher';
import { localStorageData } from '../utils/helper';

export const setLang = lang => dispatch => {
	localStorageData.set('language', lang, { amount: '2', unit: 'month' }).then(res => {
		dispatch(createDispatcher(SET_LOCALE, lang));
	});
};

export const getLang = () => dispatch => {
	const lang = localStorageData.get('language');
	if (lang) {
		dispatch(createDispatcher(GET_LOCALE, lang.data));
	}
};
