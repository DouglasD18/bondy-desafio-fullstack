import axios from "axios";

export const apiRequest = async (data: string) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/local/desafio",
    data: {
      query: data
    },
  });

  return response.data;
};
