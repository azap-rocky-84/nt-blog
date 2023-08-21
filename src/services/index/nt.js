import axios from "axios";

export const getAllNt = async (searchKeyword = "", page=1, limit=10) =>{
    try {
        const {data, headers} = await axios.get(`/api/nt?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
        return {data, headers};
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const getSingleNt = async ({fifaCode}) =>{
    try {
        const {data} = await axios.get(`/api/nt/${fifaCode}`);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const deleteNt = async ({fifaCode, token}) =>{
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const {data} = await axios.delete(`/api/nt/${fifaCode}`, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const updateNt = async ({updatedData, fifaCode, token}) =>{
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const {data} = await axios.put(`/api/nt/${fifaCode}`, updatedData, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};