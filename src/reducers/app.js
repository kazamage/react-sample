import { handleActions } from 'redux-actions';
import actions from '@/actions/app';

const initialState = {
  menuCollapsed: true,
  selectedItems: [],
};

export default handleActions({
  [actions.init]: (state, action) => {
    return Object.assign({}, state, {
      multiWindow: action.payload,
    });
  },
  [actions.toggleMenu]: (state, action) => {
    return Object.assign({}, state, {
      menuCollapsed: action.payload,
    });
  },
  [actions.selectMenuItem]: (state, action) => {
    const selected = action.payload;
    const { selectedItems } = state;
    let newItems;
    if (selectedItems.includes(selected)) {
      newItems = [].concat(selectedItems);
    } else {
      newItems = selectedItems.concat(selected);
    }
    return Object.assign({}, state, {
      selectedItems: newItems,
    });
  },
  [actions.selectMenuItems]: (state, action) => {
    return Object.assign({}, state, {
      selectedItems: action.payload,
    });
  },
  [actions.deselectMenuItem]: (state, action) => {
    const selectedItems = state.selectedItems
      .filter(item => item !== action.payload);
    return Object.assign({}, state, {
      selectedItems,
    });
  },
}, initialState);
