import {GEN_SEED_SUCCESS} from './actions';

const initialState = {
  seed_phrase: 'inital value',
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case GEN_SEED_SUCCESS: {
      return {
        ...state,
        seed_phrase: action.data,
      };
    }
    default: {
      return state;
    }
  }
}
