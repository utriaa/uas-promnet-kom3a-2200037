import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class CreateInventoryItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: 0,
      harga_satuan: 0,
      lokasi: "",
      deskripsi: "",
    };

    this.changeNamaBarang = this.changeNamaBarang.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeHargaSatuan = this.changeHargaSatuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateInventoryItem = this.saveOrUpdateInventoryItem.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      InventoryService.getInventoryItemById(this.state.id).then((res) => {
        let inventoryItem = res.data;
        this.setState({
          nama_barang: inventoryItem.nama_barang,
          jumlah: inventoryItem.jumlah,
          harga_satuan: inventoryItem.harga_satuan,
          lokasi: inventoryItem.lokasi,
          deskripsi: inventoryItem.deskripsi,
        });
      });
    }
  }

  saveOrUpdateInventoryItem = (e) => {
    e.preventDefault();
    let inventoryItem = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      InventoryService.createInventoryItem(inventoryItem).then((res) => {
        this.props.history.push("/inventory");
      });
    } else {
      InventoryService.updateInventoryItem(
        inventoryItem,
        this.state.id
      ).then((res) => {
        this.props.history.push("/inventory");
      });
    }
  };

  changeNamaBarang = (event) => {
    this.setState({ nama_barang: event.target.value });
  };

  changeJumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };

  changeHargaSatuan = (event) => {
    this.setState({ harga_satuan: event.target.value });
  };

  changeLokasi = (event) => {
    this.setState({ lokasi: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.deleteInventoryItem();
    }
  };

  deleteInventoryItem = () => {
    InventoryService.deleteInventoryItem(this.state.id).then((res) => {
      this.props.history.push("/inventory");
    });
  };

  cancel() {
    this.props.history.push("/inventory");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Add Inventory Item</h3>
    ) : (
      <h3 className="text-center">Update Inventory Item</h3>
    );
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang: </label>
                    <input
                      placeholder="Nama Barang"
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNamaBarang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah: </label>
                    <input
                      type="number"
                      placeholder="Jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changeJumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label> Harga Satuan: </label>
                    <input
                      type="number"
                      placeholder="Harga Satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHargaSatuan}
                    />
                  </div>

                  <div className="form-group">
                    <label> Lokasi: </label>
                    <select
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    >
                      <option value="">Select Location</option>
                      <option value="bandung">Bandung</option>
                      <option value="jakarta">Jakarta</option>
                      <option value="denpasar">Denpasar</option>
                      <option value="maokwari">Manokwari</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <input
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateInventoryItem}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "20px" }}
                  >
                    Cancel
                  </button>
                  {this.state.id !== "_add" && (
                    <button
                      className="btn btn-danger"
                      onClick={this.confirmDelete}
                      style={{ marginLeft: "20px" }}
                    >
                      Delete
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventoryItemComponent;
