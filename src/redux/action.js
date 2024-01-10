import * as types from './actionType';
import axios from 'axios';

const fetchPostStart = () => ({
  type: types.FETCH_POST_START,
});

const fetchPostSuccess = (posts) => ({  // Pass 'posts' as an argument
  type: types.FETCH_POST_SUCCESS,
  payload: posts,
});

const fetchPostFail = (error) => ({
  type: types.FETCH_POST_FAIL,
  payload: error,
});

export function fetchPosts() {
  return async function (dispatch) {
    dispatch(fetchPostStart());

    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const posts = response.data;
      dispatch(fetchPostSuccess(posts));
      console.log(posts);
    } catch (error) {
      dispatch(fetchPostFail(error.message));
    }
  };
}
