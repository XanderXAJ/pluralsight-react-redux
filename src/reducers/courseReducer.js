export default function courseReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_SOURCE':
      return [
          ...state,
          Object.assign({}, action.course)
      ];
    default:
      return state;
  }
}
