import axios from 'axios';

// ************ PUBLIC APIs ************

// get all categories
const getCategoriesService = async () => {
  const { data } = await axios.get('/api/categories');
  return data;
};

export { getCategoriesService };
