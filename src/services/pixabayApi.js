
import axios from 'axios';

const pixabayApi = ( searchValue, page )=> {
    const apiKey = '19207459-7123426cd96bb4a7307e45de7';
    const baseUrl = 'https://pixabay.com/api/';

    return axios(`${baseUrl}?q=${searchValue}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`)
}



export default pixabayApi;
