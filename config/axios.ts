import  Axios from "axios";
export const AxiosApi = Axios.create();

const interceptorRequest = (
    config,
  ) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    return {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers,
        'cache-control': 'no-cache',
      },
    };
  };
  


const interceptorResponse = (response) => {
    return response.data;
  };
  
AxiosApi.interceptors.request.use(
    (config) => {
      return interceptorRequest(config);
    },
    (error) => Promise.reject(error)
  );
  
AxiosApi.interceptors.response.use((response) => {
    return interceptorResponse(response);
  });