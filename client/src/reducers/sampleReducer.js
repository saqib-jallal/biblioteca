const initialState = 0;

const sampleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "Hello":
      return {
        state: payload,
      };

    default:
      return state;
  }
};

export default sampleReducer;
