import { SET_IMG_UPLOAD, SET_IMG_UPLOAD_ERRORS } from './types'
import axios from 'axios'

export function uploadImg (img) {
  return dispatch => {
    dispatch(handleImgRes(true))
    return axios.post(`/api/projects/upload`, img)
      .then(res => {
        dispatch(handleUploadErrors({ upload: undefined }))
        dispatch(handleImgRes(false, res.data))
      })
      .catch(err => {
        dispatch(handleUploadErrors(err.response.data))
      })
  }
};

const handleImgRes = (isLoading, value) => ({
  type: SET_IMG_UPLOAD,
  isLoading,
  value
})

export function handleUploadErrors (value) {
  return (dispatch) => {
    dispatch(setImgUploadErrors(value))
  }
};

const setImgUploadErrors = value => ({
  type: SET_IMG_UPLOAD_ERRORS,
  value
})
