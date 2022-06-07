import axios from "axios";


export const productsApi = {

    async getProducts() {
        const productUrl = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json';
        try {
            const response = await axios.get(productUrl);
            if (response.status === 200) {
                if (response.data) {
                    const data = Object.keys(response.data).map((product) => {
                        return { id: product, data: response.data[product] };
                    });
                    return data
                } else {
                    return null
                }
            }
        } catch (error) {
            throw Error(error)
        }
    },

    async deleteProducts(id) {
        const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`;
        try {
            const response = await axios.delete(url);
            if (response.status == '200') {
                return '200'
            }
        } catch (error) {
            throw Error(error);
        }
    },

    async getOneProduct(productId) {
        const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`;
        try {
            const response = await axios.get(url);
            if (response.status == '200') {
                return response.data
            }
        } catch (error) {
            throw Error(error);
        }
    },

    async createProduct(photos) {
        try {
            return axios.all(Array(4).fill('https://api.cloudinary.com/v1_1/mebelproject/image/upload').map((endpoint,i) => {
                const formData = new FormData();
                formData.append('file', photos[i]);
                formData.append('upload_preset', 'f1vguzfd');
                return axios.post(endpoint, formData)
            })).then(
                (data) => {
                    return data.map(val => {
                        const photoUrl = val.data.secure_url;
                        const publicId = val.data.public_id;
                        return { photoUrl: photoUrl, publicId: publicId }
                    })
                }
            )
        } catch (e) {
            throw Error(e);
        }
    },

    async searchProduct(search) {
        const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json';
        try {
            const response = await axios.post(url)
            if (response.status == '200') {
                return Object.keys(response.data)
                    .map((product) => ({
                        id: product,
                        data: response.data[product],
                    }))
                    .filter((item) => {
                        return (
                            item.data.name.includes(search[0].toUpperCase() + search.slice(1)) ||
                            item.data.description.includes(search[0].toUpperCase() + search.slice(1))
                        );
                    });
            }
        } catch (error) {
            throw Error(error);
        }
    },

    async addProductToDelivery(data){
        const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/delivery.json';
        try{
            data.products.forEach(async(val)=>{
                const newData = {
                    product:val,
                    user_id:data.user_id,
                    user:data.user,
                    isPayed:data.isPayed,
                    phone:data.phone,
                    status:"На складе",
                    address:data.address,
                  }
                await axios.post(url,newData)
            })
            
         }catch(error){
            throw Error(error);
         }
    },
    async getProductsFromDelivery(){
        const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/delivery.json';
        try{
            const response = await axios.get(url)
            if(response.status == '200'){
                return response.data
            }
         }catch(error){
            throw Error(error);
         }
    },

    async deleteProductsFromDelivery(id){
        const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/delivery/${id}.json`;
        try{
            const response = await axios.delete(url)
            if(response.status == '200'){
                return response.data
            }
         }catch(error){
            throw Error(error);
         }
    },

    async updateProductsFromDelivery(data,id){
        const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/delivery/${id}.json`;
        try{
            const response = await axios.put(url,data)
            if(response.status == '200'){
                return response.data
            }
         }catch(error){
            throw Error(error);
         }
    }
}
