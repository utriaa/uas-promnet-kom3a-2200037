import React, { Component } from 'react';
import InventoryService from '../services/InventoryService';

class ListInventoryItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventoryItems: [],
    };

    this.addInventoryItem = this.addInventoryItem.bind(this);
    this.editInventoryItem = this.editInventoryItem.bind(this);
    this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
    this.viewInventoryItem = this.viewInventoryItem.bind(this);
  }

  componentDidMount() {
    InventoryService.getInventoryItems().then((res) => {
      if (!res.data || res.data.length === 0) {
        this.props.history.push('/add-inventory/_add');
      }
      this.setState({ inventoryItems: res.data });
    });
  }

  addInventoryItem() {
    this.props.history.push('/add-inventory/_add');
  }

  editInventoryItem(id) {
    this.props.history.push(`/add-inventory/${id}`);
  }

  deleteInventoryItem(id) {
    InventoryService.deleteInventoryItem(id).then((res) => {
      this.setState({
        inventoryItems: this.state.inventoryItems.filter(
          (item) => item.id !== id
        ),
      });
    });
  }

  viewInventoryItem(id) {
    this.props.history.push(`/view-inventory/${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Inventory List</h2>
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={this.addInventoryItem}
          >
            Add Inventory Item
          </button>
        </div>
        <br />
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Harga Satuan</th>
                <th>Lokasi</th>
                <th>Deskripsi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nama_barang}</td>
                  <td>{item.jumlah}</td>
                  <td>{item.harga_satuan}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.deskripsi}</td>
                  <td>
                    <button
                      onClick={() => this.editInventoryItem(item.id)}
                      className="btn btn-info mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.deleteInventoryItem(item.id)}
                      className="btn btn-danger mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.viewInventoryItem(item.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListInventoryItemComponent;
