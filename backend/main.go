package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/inventory",
		GetInventory).Methods("GET")
	router.HandleFunc("/inventory",
		CreateInventory).Methods("POST")
	router.HandleFunc("/inventory/{id}",
		GetInventoryItem).Methods("GET")
	router.HandleFunc("/inventory/{id}",
		UpdateInventory).Methods("PUT")
	router.HandleFunc("/inventory/{id}",
		DeleteInventory).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all inventory items
func GetInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var inventoryItems []InventoryItem

	result, err := db.Query("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_utria")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var item InventoryItem
		err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		inventoryItems = append(inventoryItems, item)
	}
	json.NewEncoder(w).Encode(inventoryItems)
}

// Create inventory item
func CreateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO inventory_utria(nama_barang, jumlah, harga_satuan, lokasi, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var item InventoryItem
	err = json.Unmarshal(body, &item)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(item.NamaBarang, item.Jumlah, item.HargaSatuan, item.Lokasi, item.Deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New inventory item was created")
}

// Get inventory item by ID
func GetInventoryItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_utria WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var item InventoryItem
	for result.Next() {
		err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(item)
}

// Update inventory item
func UpdateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE inventory_utria SET nama_barang=?, jumlah=?, harga_satuan=?, lokasi=?, deskripsi=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var item InventoryItem
	err = json.Unmarshal(body, &item)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(item.NamaBarang, item.Jumlah, item.HargaSatuan, item.Lokasi, item.Deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Inventory item with ID = %s was updated", params["id"])
}

// Delete inventory item
func DeleteInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM inventory_utria WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Inventory item with ID = %s was deleted", params["id"])
}

type InventoryItem struct {
	ID          int    `json:"id"`
	NamaBarang  string `json:"nama_barang"`
	Jumlah      int    `json:"jumlah"`
	HargaSatuan int    `json:"harga_satuan"`
	Lokasi      string `json:"lokasi"`
	Deskripsi   string `json:"deskripsi"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2200037_utriaefaludini_uas")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
