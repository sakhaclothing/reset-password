// Ambil token dari URL
function getToken() {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
}

document.getElementById('resetForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const token = getToken();

    if (!token) {
        Swal.fire({ icon: 'error', title: 'Token tidak valid', text: 'Link reset password tidak valid atau sudah kadaluarsa.' });
        return;
    }
    if (password !== confirmPassword) {
        Swal.fire({ icon: 'error', title: 'Password tidak sama', text: 'Password dan konfirmasi password harus sama.' });
        return;
    }
    if (password.length < 6) {
        Swal.fire({ icon: 'warning', title: 'Password terlalu pendek', text: 'Password minimal 6 karakter.' });
        return;
    }
    try {
        const response = await fetch(`https://asia-southeast2-ornate-course-437014-u9.cloudfunctions.net/sakha/reset-password?token=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (response.ok) {
            Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Password berhasil direset. Silakan login dengan password baru.' }).then(() => {
                window.location.href = 'https://sakhaclothing.shop/login/';
            });
        } else {
            const data = await response.json().catch(() => ({}));
            Swal.fire({ icon: 'error', title: 'Gagal', text: data.message || 'Gagal mereset password.' });
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Terjadi kesalahan jaringan. Coba lagi.' });
    }
}); 