const API_KEY = '18JE6CE-Y6ZMF43-N02VDG6-WCDNJ3Z';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/') => {
  const SEARCH_API_URL = `${API_URL}beers?search=`;
  const beers_URL = `${API_URL}beers`;
  
  return {
    createComment: async (id, text) => {
      try{
        const response = await fetch(`${beers_URL}/${id}/comment`, {
          method: 'POST',
          body: JSON.stringify({
            comment: text,
          }),
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          },

        });
        const { beer: {comment} } = await response.json();
        return comment;
      }catch(e){
        console.error(e);
      }
    },


    getbeers: async (query) => {
      try {
        const requestUrl = query ?
          `${SEARCH_API_URL}${query}` : beers_URL;
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          },

        });
        const { beers } = await response.json();
        const mapDatos = beers.map((dato) => {
          if (dato.beer) {
            return dato.beer;
          }
          return dato;
        });
        return mapDatos;


      } catch (e) {
        console.error(e);
        throw e;
      }


    },

    getbeerDetail: async (id) => {

      try {
        const response = await fetch(`${beers_URL}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          },

        });

        const { beer } = await response.json();
                
        return beer;
      }catch(e){
        console.error(e);
      }


    },

  };
};

export default api;