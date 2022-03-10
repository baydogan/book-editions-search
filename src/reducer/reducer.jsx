export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, books: [], error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, books: action.payload, error: null };

    case "FETCH_FAILURE":
      return { ...state, loading: false, books: [], error: action.payload };
    default:
      return {
        state,
      };
  }
};
