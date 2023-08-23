import Axios from 'axios';

export const axiosRoot = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
