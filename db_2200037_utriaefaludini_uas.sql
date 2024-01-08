-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Jan 2024 pada 17.11
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2200037_utriaefaludini_uas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_utria`
--

CREATE TABLE `inventory_utria` (
  `id` int(11) NOT NULL,
  `nama_barang` text DEFAULT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `lokasi` text DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `inventory_utria`
--

INSERT INTO `inventory_utria` (`id`, `nama_barang`, `jumlah`, `harga_satuan`, `lokasi`, `deskripsi`) VALUES
(1, 'Laptop ASUS XYZ', 15, 15000000, 'Bandung', 'Laptop dengan spesifikasi tinggi untuk kebutuhan profesional'),
(2, 'Printer HP ABC', 10, 4000000, 'Jakarta', 'Printer laser warna untuk kebutuhan cetak yang berkualitas.'),
(3, 'Mouse Logitach M123', 25, 30000, 'Denpasar', 'Mouse dengan desain yang ergonomis untuk kenyamanan penggunaan sepanjang hari.'),
(4, 'Keyboard Mechanical RGB', 12, 1000000, 'Manokwari', 'Keyboard mekanikal yang pencahayaan RGB untuk pengalaman mengetik yang nyaman dan bergaya.'),
(5, 'Kamera Canon EOS', 8, 8000000, 'Bandung', 'Kamera DSLR dengan resolusi tinggi untuk fotografi profesional.'),
(6, 'PoweBank Robot', 3, 150000, 'Jakarta', 'PowerBank 20000 mAh');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `inventory_utria`
--
ALTER TABLE `inventory_utria`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `inventory_utria`
--
ALTER TABLE `inventory_utria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
