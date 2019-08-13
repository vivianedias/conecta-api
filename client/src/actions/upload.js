import { SET_IMG_UPLOAD } from './types';
import axios from 'axios';

export function uploadImg(img) {
  return dispatch => {
    axios.post(`/api/projects/upload`, img)
    .then(res => dispatch(handleImgRes(res.data)))
    .catch(err => {
      console.log(err.response.data);
    });
  };
};

const handleImgRes = value => ({
  type: SET_IMG_UPLOAD,
  value
});