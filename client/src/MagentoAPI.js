import axios from 'axios';

const baseUrl = 'http://mag.pr.com/rest';

class MagentoAPI {
    async getAllProducts() {
        const response = await axios.get(`${baseUrl}/V1/products`);
        return response.data.items;
    }
}

export default MagentoAPI;