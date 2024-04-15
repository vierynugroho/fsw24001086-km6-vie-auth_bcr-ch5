<h1 align="center">
  Chapter 5 - Challenge
</h1>

# Database Diagram

<p align='center'>
<img style='width: 80%' src='/public/assets/images/ERD/Challenge5.png' alt='ERD' title='ERD'>
</p>

# Postman Docs

<p align='center'>
<a href="https://documenter.getpostman.com/view/22814931/2sA3Bj9ZxZ" target="_blank" title="Postman Documentation"/>
<img style='width: 20%' src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' alt='Postman Docs' title='Postman Docs'>
</p>

[READ HERE](https://documenter.getpostman.com/view/22814931/2sA3Bj9ZxZ)

# ACCOUNT

| role       | email               | password |
| ---------- | ------------------- | -------- |
| superadmin | superadmin@mail.com | password |
| admin      | admin@mail.com      | password |
| member     | member@mail.com     | password |

# ENDPOINT

### DOCUMENTATION

| METHOD | End Point    | Deskripsi       | params |
| ------ | ------------ | --------------- | ------ |
| GET    | /api/v1/docs | Dokumentasi API |        |
|        |              |                 |        |

### AUTH

| METHOD | End Point                   | Deskripsi                                                                 | isLogin | params |
| ------ | --------------------------- | ------------------------------------------------------------------------- | ------- | ------ |
| POST   | /api/v1/superadmin/register | [superadmin] register user dengan role yang diizinkan admin / member      | true    |        |
| POST   | /api/v1/register            | [superadmin/admin/member] register user dengan role yang diizinkan member | true    |        |
| POST   | /api/v1/login               | login                                                                     | false   |        |
| PUT    | /api/v1/profile             | [superadmin/admin/member] update hanya dengan role member                 | true    |        |
| PUT    | /api/v1/admin/profile       | [superadmin/admin] update hanya dengan role admin dan member              | true    |        |
| PUT    | /api/v1/superadmin/profile  | [superadmin] update dengan role superadmin, admin, member                 | true    |        |
| DEL    | /api/v1/profile             | menghapus data user yang sedang login                                     | true    |        |
| GET    | /api/v1/me                  | mendapatkan data user yang sedang login                                   | true    |        |
|        |                             |                                                                           |         |        |

### CARS

| METHOD | End Point        | Deskripsi                                              | query params                    | isLogin |
| ------ | ---------------- | ------------------------------------------------------ | ------------------------------- | ------- |
| GET    | /api/v1/cars     | mendapatkan semua data mobil dengan filtering data     | [page, limit, capacity, search] | false   |
| GET    | /api/v1/cars/:id | mendapatkan data mobil berdasar ID                     |                                 | false   |
| POST   | /api/v1/cars     | [superadmin/admin] menambahkan data mobil              |                                 | true    |
| PUT    | /api/v1/cars/:id | [superadmin/admin] memperbarui data mobil berdasar ID  |                                 | true    |
| DEL    | /api/v1/cars/:id | [superadmin/admin] menghapus data mobil berdasarkan ID |                                 | true    |
|        |                  |                                                        |                                 |

# Data Diri

|                  |                          |
| ---------------- | ------------------------ |
| ID Peserta       | **FSW2402KM6024**        |
| Nama Peserta     | **Viery Nugroho**        |
|                  |                          |
| Kelas            | **FSW 1**                |
|                  |                          |
| ID Fasil         | **F-FSW24001086**        |
| Nama Fasilitator | **Imam Taufiq Hermawan** |
|                  |                          |

# Fullstack Web Development

### KM x Binar Academy Batch 6

|                                                              |
| ------------------------------------------------------------ |
| **Catatan**                                                  |
| Submission Chapter 5 - API Car Management - Binar Car Rental |
