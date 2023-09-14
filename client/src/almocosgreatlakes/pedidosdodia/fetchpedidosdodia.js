

async function fetcherPost(url, cookies, dados) {
    console.log("entrou aqui")
    const data = fetch((url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(dados)
      }).then((res) => res.json());
      return data;  
}

export default fetcherPost;
      