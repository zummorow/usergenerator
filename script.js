// Ketika DOM telah sepenuhnya dimuat, jalankan kode berikutnya
document.addEventListener('DOMContentLoaded', function () {
    // Mendapatkan referensi ke tombol "Ambil Data Pengguna" berdasarkan ID
    const fetchButton = document.getElementById('fetchButton');
    // Mendapatkan referensi ke elemen div "userContainer" berdasarkan ID
    const userContainer = document.getElementById('userContainer');

    // Menambahkan event listener untuk menangani klik tombol "Ambil Data Pengguna"
    fetchButton.addEventListener('click', function () {
        // Menggunakan metode "fetch" untuk membuat permintaan ke API Random User
        fetch('https://randomuser.me/api/')
            .then(response => {
                // Memeriksa apakah permintaan berhasil (kode status 200)
                if (!response.ok) {
                    throw new Error('Terjadi kesalahan saat mengambil data.');
                }
                // Mengurai respons JSON dari API
                return response.json();
            })
            .then(data => {
                // Mengambil data pengguna pertama dari respons
                const userData = data.results[0];
                // Menyimpan atribut yang diperlukan dari data pengguna
                const picture = userData.picture.large;
                const name = `${userData.name.first} ${userData.name.last}`;
                const email = userData.email;
                const country = userData.location.country;
                const city = userData.location.city;

                // Membuat elemen div baru untuk menampilkan data pengguna
                const userDiv = document.createElement('div');
                // Menambahkan kelas CSS 'user-box' ke elemen div
                userDiv.classList.add('user-box');
                // Menyisipkan HTML ke dalam elemen div
                userDiv.innerHTML = `
                    <img src="${picture}" alt="${name}">
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Country: ${country}</p>
                    <p>City: ${city}</p>
                `;
                // Menambahkan elemen div dengan data pengguna ke dalam kontainer pengguna
                userContainer.appendChild(userDiv);
            })
            .catch(error => {
                // Menangani kesalahan jika ada, dan mencetak pesan kesalahan ke konsol
                console.error('Terjadi kesalahan:', error);
            });
    });
});
