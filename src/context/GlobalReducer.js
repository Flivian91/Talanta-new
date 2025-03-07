export const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: !state.isModalOpen };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_TALENTS":
      return { ...state, talents: action.payload };

    default:
      return state;
  }
};
