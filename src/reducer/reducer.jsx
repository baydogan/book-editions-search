export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, books: [], error: null, success: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, books: action.payload, error: null, success: true };

    case "FETCH_FAILURE":
      return { ...state, loading: false, books: [], error: action.payload, success: false };
    default:
      return {
        state,
      };
  }
};
