## Technical Test Backend Developer Assist.id

### Membuat CRUD sederhana

1. Bikin API menggunakan node.js dengan framework express.js dan menggunakan database
   mongodb
2. API nya berupa CRUD absensi pegawai (bisa untuk absen hadir, izin cuti, dll)
3. Untuk izin dan cuti perlu ada approval, jadi izin dan cutinya bisa di acc atau tidak
4. Kemudian ada API untuk laporan pegawai telat berapa kali, gak masuk berapa kali, ambil cuti
   berapa kali, dalam 1 bulan ada berapa cuti / izin yang di acc maupun tidak
5. Bikin dokumentasi dari API nya, contoh untuk create data absennya ke API /Absen/blablabla
6. Hasil API yang sudah dibuat, dibikin repo nya di GITHUB
7. Link dari repo nya nanti kirim kesini ya

## Dokumentasi API

### Catatan

Ini dibuat di lokal, database bernama 'perusahaan' dan collectionnya 'absens'

### 1. POST /post

#### Request Body

`{
  "nama": "string",
  "jenis_absen": "string",
  "tgl_absen": "string"
}`

#### Response

`{
    "message": {
        "nama": "gema",
        "jenis_absen": "izin",
        "tgl_absen": "2023-06-10T00:00:00.000Z",
        "status": "menunggu",
        "_id": "64b83ef0d2668a685f0b0e0f",
        "createdAt": "2023-07-19T19:52:16.320Z",
        "updatedAt": "2023-07-19T19:52:16.320Z",
        "__v": 0
    },
    "status": 202,
    "result": "Insert data berhasil"
}`

### 2. GET /get

#### Response

`{
    "message": [
        {
            "_id": "64b7d56e5f438f6032ce100b",
            "nama": "fadhil",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-07-19T00:00:00.000Z",
            "status": "disetujui",
            "createdAt": "2023-07-19T12:22:06.161Z",
            "updatedAt": "2023-07-19T15:15:19.509Z",
            "__v": 0
        },
        {
            "_id": "64b81e441bd07ef2e034295b",
            "nama": "raka",
            "jenis_absen": "telat",
            "tgl_absen": "2023-07-20T00:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T17:32:52.202Z",
            "updatedAt": "2023-07-19T17:32:52.202Z",
            "__v": 0
        },
        {
            "_id": "64b822670e25dd9e478a51a7",
            "nama": "riky",
            "jenis_absen": "izin",
            "tgl_absen": "2023-06-01T17:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T17:50:31.917Z",
            "updatedAt": "2023-07-19T17:50:31.917Z",
            "__v": 0
        },
        {
            "_id": "64b833b00e25dd9e478a51ab",
            "nama": "ari",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-06-01T17:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T19:04:16.834Z",
            "updatedAt": "2023-07-19T19:04:16.834Z",
            "__v": 0
        },
        {
            "_id": "64b8348cd945abce0a4f6292",
            "nama": "ari",
            "jenis_absen": "tidak masuk",
            "tgl_absen": "2023-06-20T00:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T19:07:56.816Z",
            "updatedAt": "2023-07-19T19:07:56.816Z",
            "__v": 0
        }
    ],
    "status": 202,
    "result": "data berhasil ditampilkan"
}`

### 3. PUT /update/:absenId

#### Request Body

`{
  "nama": "string",
  "jenis_absen": "string",
  "tgl_absen": "string",
  "status": "string"
}
`
#### Response

`{
    "message": {
        "_id": "64b7d56e5f438f6032ce100b",
        "nama": "fadhil",
        "jenis_absen": "cuti",
        "tgl_absen": "2023-07-19T00:00:00.000Z",
        "status": "disetujui",
        "createdAt": "2023-07-19T12:22:06.161Z",
        "updatedAt": "2023-07-19T15:15:19.509Z",
        "__v": 0
    },
    "status": 202,
    "result": "absen berhasil di update"
}`

### 4. DELETE /deleted/:absenId

#### Response

`{
    "message": "Absen berhasil dihapus"
}
`

### 5. GET /findLate/:bulan

#### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang telat 1",
    "message": [
        {
            "_id": "64b8200cfd97255e75543e32",
            "nama": "riky",
            "jenis_absen": "telat",
            "tgl_absen": "2023-06-01T17:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T17:40:28.822Z",
            "updatedAt": "2023-07-19T17:40:28.822Z",
            "__v": 0
        }
    ]
}`

### 6. GET /findOne/:absenId

#### Response

`{
    "status": 202,
    "result": "data berhasil ditampilkan",
    "message": {
        "_id": "64b7d56e5f438f6032ce100b",
        "nama": "fadhil",
        "jenis_absen": "cuti",
        "tgl_absen": "2023-07-19T00:00:00.000Z",
        "status": "disetujui",
        "createdAt": "2023-07-19T12:22:06.161Z",
        "updatedAt": "2023-07-19T15:15:19.509Z",
        "__v": 0
    }
}`

### 7. GET /findAbsen/:bulan

### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang tidak masuk 2",
    "message": {
        "dataAbsen": [
            {
                "_id": "64b8348cd945abce0a4f6292",
                "nama": "ari",
                "jenis_absen": "tidak masuk",
                "tgl_absen": "2023-06-20T00:00:00.000Z",
                "status": "menunggu",
                "createdAt": "2023-07-19T19:07:56.816Z",
                "updatedAt": "2023-07-19T19:07:56.816Z",
                "__v": 0
            },
            {
                "_id": "64b83497d945abce0a4f6294",
                "nama": "ikhsan",
                "jenis_absen": "tidak masuk",
                "tgl_absen": "2023-06-22T00:00:00.000Z",
                "status": "menunggu",
                "createdAt": "2023-07-19T19:08:07.235Z",
                "updatedAt": "2023-07-19T19:08:07.235Z",
                "__v": 0
            }
        ]
    }
}`


### 8. GET /findCuti/:bulan

### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang cuti 1",
    "message": [
        {
            "_id": "64b7d56e5f438f6032ce100b",
            "nama": "fadhil",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-07-19T00:00:00.000Z",
            "status": "disetujui",
            "createdAt": "2023-07-19T12:22:06.161Z",
            "updatedAt": "2023-07-19T15:15:19.509Z",
            "__v": 0
        }
    ]
}`
### 9. GET /findApprove/:bulan

### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang cuti/izin di approve 1",
    "message": [
        {
            "_id": "64b7d56e5f438f6032ce100b",
            "nama": "fadhil",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-07-19T00:00:00.000Z",
            "status": "disetujui",
            "createdAt": "2023-07-19T12:22:06.161Z",
            "updatedAt": "2023-07-19T15:15:19.509Z",
            "__v": 0
        }
    ]
}`


### 10. GET /findNotApprove/:bulan

### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang cuti/izin tidak di approve 1",
    "message": [
        {
            "_id": "64b833b00e25dd9e478a51ab",
            "nama": "ari",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-06-01T00:00:00.000Z",
            "status": "ditolak",
            "createdAt": "2023-07-19T19:04:16.834Z",
            "updatedAt": "2023-07-20T00:37:48.425Z",
            "__v": 0
        }
    ]
}`


### 11. GET /findWaitApprove/:bulan

### Response

`{
    "status": 202,
    "result": "jumlah karyawan yang cuti/izin waiting approve 1",
    "message": [
        {
            "_id": "64b83ef0d2668a685f0b0e0f",
            "nama": "gema",
            "jenis_absen": "izin",
            "tgl_absen": "2023-06-10T00:00:00.000Z",
            "status": "menunggu",
            "createdAt": "2023-07-19T19:52:16.320Z",
            "updatedAt": "2023-07-19T19:52:16.320Z",
            "__v": 0
        }
    ]
}`


### 12. GET /findByDateAndType/:tgl_absen/:jenis_absen

### Response

`{
    "status": 202,
    "result": "data berhasil ditampilkan",
    "message": [
        {
            "_id": "64b7d56e5f438f6032ce100b",
            "nama": "fadhil",
            "jenis_absen": "cuti",
            "tgl_absen": "2023-07-19T00:00:00.000Z",
            "status": "disetujui",
            "createdAt": "2023-07-19T12:22:06.161Z",
            "updatedAt": "2023-07-19T15:15:19.509Z",
            "__v": 0
        }
    ]
}`





