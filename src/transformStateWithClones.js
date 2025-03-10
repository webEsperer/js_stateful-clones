'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];

  actions.forEach((action, index) => {
    if (action.type === 'addProperties') {
      if (index === 0) {
        newArray.push({ ...state, ...action.extraData });
      } else {
        newArray.push({
          ...newArray[newArray.length - 1],
          ...action.extraData,
        });
      }
    }

    if (action.type === 'removeProperties') {
      let firstRow;

      if (newArray.length === 0) {
        firstRow = { ...state };
      } else {
        firstRow = { ...newArray[newArray.length - 1] };
      }

      for (const item of action.keysToRemove) {
        delete firstRow[item];
      }
      newArray.push(firstRow);
    }

    if (action.type === 'clear') {
      newArray.push({});
    }
  });

  return newArray;
}

module.exports = transformStateWithClones;
