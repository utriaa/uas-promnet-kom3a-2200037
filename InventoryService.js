import axios from 'axios';

const INVENTORY_API_BASE_URL = "http://localhost:9080/inventory";

class InventoryService {

    handleRequestError(error) {
        // ... (seperti sebelumnya)
    }

    getInventoryItems() {
        return axios.get(INVENTORY_API_BASE_URL)
            .catch(this.handleRequestError);
    }

    createInventoryItem(inventoryItem) {
        return axios.post(INVENTORY_API_BASE_URL, inventoryItem)
            .then(response => {
                alert('Data berhasil ditambahkan ke database!'); 
                return response;
            })
            .catch(this.handleRequestError);
    }

    getInventoryItemById(itemId) {
        return axios.get(INVENTORY_API_BASE_URL + '/' + itemId)
            .catch(this.handleRequestError);
    }

    updateInventoryItem(inventoryItem, itemId) {
        return axios.put(INVENTORY_API_BASE_URL + '/' + itemId, inventoryItem)
            .catch(this.handleRequestError);
    }

    deleteInventoryItem(itemId) {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (!confirmDelete) {
        
            return Promise.resolve({ canceled: true });
        }

        return axios.delete(INVENTORY_API_BASE_URL + '/' + itemId)
            .then(response => {
                alert('Data berhasil dihapus dari database!'); 
            })
            .catch(this.handleRequestError);
    }
}

export default new InventoryService();
