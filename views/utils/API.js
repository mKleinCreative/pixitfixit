import axios from 'axios';

export const fetchData = async (url, params) => {
  const response = await axios.get(url, { params });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Error fetching data from ${url}. Status code: ${response.status}`);
  }
};

export const postData = async (url, data) => {
  const response = await axios.post(url, data);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Error posting data to ${url}. Status code: ${response.status}`);
  }
};