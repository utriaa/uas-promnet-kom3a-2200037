import React, { Component } from 'react';
import InventoryService from '../services/InventoryService';

class ViewInventoryItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      inventoryItem: {},
    };
  }

  componentDidMount() {
    InventoryService.getInventoryItemById(this.state.id).then((res) => {
      this.setState({ inventoryItem: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Inventory Item Details</h3>
          <div className="card-body">
            <div className="row">
              <label> ID: </label>
              <div> {this.state.inventoryItem.id}</div>
            </div>
            <div className="row">
              <label> Nama Barang: </label>
              <div> {this.state.inventoryItem.nama_barang}</div>
            </div>
            <div className="row">
              <label> Jumlah: </label>
              <div> {this.state.inventoryItem.jumlah}</div>
            </div>
            <div className="row">
              <label> Harga Satuan: </label>
              <div> {this.state.inventoryItem.harga_satuan}</div>
            </div>
            <div className="row">
              <label> Lokasi: </label>
              <div> {this.state.inventoryItem.lokasi}</div>
            </div>
            <div className="row">
              <label> Deskripsi: </label>
              <div> {this.state.inventoryItem.deskripsi}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewInventoryItemComponent;
