const axios = require("axios");

const execute = async (data) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/local/desafio",
    data,
  });
  return response.data;
};

(async () => {
  const data = {
    query: `
    mutation {
      login(login: { email: "desafio@bondy.com.br", password: "123456" }) {
        name,
        company
      }
    }
  `};
  const result = await execute(data);
  console.log(result);
})();
