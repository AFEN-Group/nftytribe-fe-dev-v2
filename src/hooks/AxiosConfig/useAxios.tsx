import { useState } from "react";

const UseAxios = () => {
  const [loading, setLoading] = useState(false);
  const [Response, setResponse] = useState<
    { [key: string]: any } | undefined
  >();
  const [error, setError] = useState<any>();

  const fetchData = async ({ ...data }) => {
    const { method, url, axiosInstance, requestConfig = {} } = data;
    setLoading(true);

    try {
      const data = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
      });
      console.log("user data>>", data.data);

      if (data?.data?.token?.length > 6) {
        // console.log(data.data.token);
        sessionStorage.setItem("token", data.data.token);
      }
      setResponse(data);
    } catch (error: any) {
      setError(error.response);
    } finally {
      setLoading(false);
    }
  };

  return { loading, Response, error, fetchData };
};

export default UseAxios;
