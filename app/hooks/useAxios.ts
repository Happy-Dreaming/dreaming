import { useState, useEffect } from "react";
import { AxiosError, AxiosInstance } from "axios";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { axiosInstance } from "../lib/api";

const useAxios = <T>(
    url: string,
    method: "get" | "post" | "delete" | "patch",
    requestBody?: any,
    params?: AxiosRequestConfig
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: AxiosResponse<T>;
                setLoading(true);
                switch (method) {
                    case "get":
                        response = await axiosInstance.get(url, params);
                        break;
                    case "post":
                        response = await axiosInstance.post(
                            url,
                            requestBody,
                            params
                        );
                        break;
                    case "delete":
                        response = await axiosInstance.delete(url, {
                            data: requestBody,
                            params,
                        });
                        break;
                    case "patch":
                        response = await axiosInstance.patch(
                            url,
                            requestBody,
                            params
                        );
                        break;
                }
                setData(response.data);
                setLoading(false);
            } catch (e) {
                setError("네트워크 요청에 실패했어요");
                if (e instanceof AxiosError) {
                    setError(e.message);
                }

                setLoading(false);
            }
        };
        fetchData();
    }, []);


    return {
        data,
        loading,
        error,
    };
};

export { useAxios };
