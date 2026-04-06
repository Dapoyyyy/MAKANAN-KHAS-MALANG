# 🍜 Warung Malang

Website penjualan makanan khas Malang yang terhubung ke Google Spreadsheet.

## Struktur Folder

```
├── index.html    # Halaman utama
├── style.css     # Styling & layout
├── script.js     # Logika & koneksi spreadsheet
└── README.md
```

## Fitur

- Tampilan modern dengan font Poppins & tema warna khas Malang
- Galeri foto kota Malang (Kampung Warna Warni, Alun-alun, Jalan Ijen)
- 7 menu makanan khas Malang dengan kartu interaktif
- Form pemesanan terhubung ke Google Spreadsheet
- Animasi fade-in saat scroll
- Responsive untuk mobile

## Menu yang Tersedia

| Menu | Harga |
|------|-------|
| Bakso Malang | Rp 15.000 |
| Cwie Mie Malang | Rp 10.000 |
| Rawon | Rp 20.000 |
| Tahu Campur | Rp 15.000 |
| Soto Malang | Rp 15.000 |
| Nasi Pecel | Rp 12.000 |
| Rujak Cingur | Rp 15.000 |

## Setup Google Spreadsheet

1. Buat Google Spreadsheet baru
2. Klik **Extensions → Apps Script**
3. Hapus kode default, paste kode berikut:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Waktu", "Nama", "Telepon", "Alamat", "Menu", "Jumlah", "Catatan"]);
  }

  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.waktu,
    data.nama,
    data.telepon,
    data.alamat,
    data.menu,
    data.jumlah,
    data.catatan
  ]);

  return ContentService.createTextOutput("OK");
}
```

4. Klik **Deploy → New deployment**
5. Pilih type: **Web app**
6. Set *Who has access*: **Anyone**
7. Klik **Deploy**, copy URL yang muncul
8. Buka `script.js`, ganti baris ini:

```js
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

dengan URL hasil deploy kamu.

## Cara Menjalankan

Cukup buka `index.html` di browser. Tidak perlu server khusus.

> Untuk koneksi ke spreadsheet berfungsi, pastikan sudah mengisi `APPS_SCRIPT_URL` di `script.js`.
