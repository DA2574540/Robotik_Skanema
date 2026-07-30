document.addEventListener("DOMContentLoaded", () => {
    const notif = document.getElementById("notif");
    const form = document.getElementById("pendaftaranForm");
    const submitBtn = document.getElementById("submit");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = document.getElementById("spinner");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // 1. Tampilkan Efek Loading
        submitBtn.disabled = true;
        btnText.textContent = "Mengirim...";
        spinner.style.display = "inline-block";
        notif.style.display = "none"; // Sembunyikan notifikasi sebelumnya jika ada

        // 2. Ambil Data Form
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxtHOiE7RS4yPGt03h3Q_fk3xH1txV9rOpZqMFYyYW1YBmozI72h4Hm9MhUl37IJpI/exec",
                {
                    method: "POST",
                    body: data,
                }
            );

            if (response.ok) {
                // Respons Berhasil
                notif.style.display = "block";
                notif.style.backgroundColor = "#10cf76c5";
                notif.innerHTML = `
                    Terima kasih telah mendaftarkan diri Anda untuk Ekstrakurikuler Robotik.<br>
                    <a href="https://chat.whatsapp.com/FIUkgNJuKM6659qC4DLHxZ" target="_blank" rel="noopener noreferrer">
                        Klik di sini untuk bergabung ke grup WhatsApp
                    </a> untuk info lebih lanjut.
                `;
                form.reset();
            } else {
                // Respons Gagal dari Server
                showError("Gagal mengirim data, silakan coba beberapa saat lagi.");
            }
        } catch (error) {
            // Error Jaringan / System
            showError(`⚠️ Error: ${error.message}`);
        } finally {
            // 3. Kembalikan State Button ke Semula
            submitBtn.disabled = false;
            btnText.textContent = "Submit";
            spinner.style.display = "none";
        }
    });

    function showError(message) {
        notif.style.display = "block";
        notif.style.backgroundColor = "#e02121df";
        notif.innerHTML = message;
    }
});