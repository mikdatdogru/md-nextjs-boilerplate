import moment from 'moment';
import * as _ from 'lodash';

export const x = () => x;

// localstorage belli bir formatta data yazar ve okur
export const localStorageData = {
  prefix: 'user',
  get: item => JSON.parse(localStorage.getItem(`${localStorageData.prefix}-${item}`)),
  set: (name, data, expiration) => {
    const allData = {
      data,
      creation: moment(),
      expiration: expiration || moment().add(1, 'month'),
    };

    return new Promise((resolve, reject) => {
      if (!_.isEmpty(localStorageData.prefix) && !_.isEmpty(name)) {
        localStorage.setItem(`${localStorageData.prefix}-${name}`, JSON.stringify(allData));

        const { data, expiration, creation } = JSON.parse(
          localStorage.getItem(`${localStorageData.prefix}-${name}`),
        );

        resolve({ status: 'success', name, data: { data, expiration, creation } });
      } else {
        reject(new Error(`${name} has not created!`));
      }
    });
  },
  delete: item =>
    new Promise((resolve, reject) => {
      if (localStorage.getItem(`${localStorageData.prefix}-${item}`)) {
        localStorage.removeItem(`${localStorageData.prefix}-${item}`);
        resolve(`${item} has been deleted!`);
      } else {
        reject(new Error(`${item} has not found!`));
      }
    }),
};

export const linearInterpolation = (a1, a2, a3, a4, a5) =>
  (a5 - (a4 - a3) * (a5 - a2) / (a4 - a1)).toFixed(2);
