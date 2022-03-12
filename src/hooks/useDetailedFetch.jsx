import axios from "axios";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "../reducer/reducer";

const initialState = {
  loading: false,
  books: [],
  error: null,
  success: null,
};

export const useDetailedFetch = () => {
  const [editionState, dispatch] = useReducer(reducer, initialState);

  const editionsFetch = (id) => {
    const editionsKeyArray = id.edition_key;
    const edit = [];
    dispatch({ type: "FETCH_START" });
    editionsKeyArray.forEach(async (editions) => {
      await axios.get(`https://openlibrary.org/books/${editions}.json`).then((response) => {
        edit.push(response.data);
      });
      if (editionsKeyArray.length === edit.length) {
        dispatch({ type: "FETCH_SUCCESS", payload: edit });
      }
    });
  };
  return { editionsFetch, editionState };
};

