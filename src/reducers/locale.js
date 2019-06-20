import { SET_LOCALE, GET_LOCALE } from '../actions';

export default function(state = {}, action) {
	const { type } = action;
	switch (type) {
		case SET_LOCALE: {
			return { ...state, ...action };
		}
		case GET_LOCALE: {
			return { ...state, ...action };
		}
		default:
			return state;
	}
}
