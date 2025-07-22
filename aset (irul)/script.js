const notif = document.getElementById("notif");
const form = document.getElementById("pendaftaranForm");
const submitBtn = document.getElementById("submit");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  submitBtn.textContent = "Mengirim...";

  const formData = new FormData(form);
  console.log(formData);
  const data = new URLSearchParams(formData);

  document.getElementById("submit").innerHTML = "mengirim";

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzdaBY2BEKZEI1_aJ3exmBu-qXHn-BP4XHxQTEfCLf2aFX_el1UEtPlJYWzPlF2WhGfCA/exec",
      {
        method: "POST",
        body: data,
      }
    );

    if (response.ok) {
      notif.style.display = "block";
      notif.innerHTML = `terima kasih telah mendaftarkan diri Anda untuk ekstrakulikuler Robotik.<br><a
            href="https://chat.whatsapp.com/GyHelip1olK5yTAJicA9sJ" target="_blank">klik di sini untuk
            bergabung ke group WhatsApp</a> <br> dan mendapatakn info lebih lanjut.`;
      form.reset();
    } else {
      notif.style.display = "block";
      notif.style.backgroundColor = "#e02121df";
      notif.innerHTML = `Gagal mengirim data,kirim ulang beberapa saat kembali`;
    }
  } catch (error) {
    notif.style.display = "block";
    notif.style.backgroundColor = "#e02121df";
    notif.innerHTML = `⚠️ Error: ${error.message}`;
  } finally {
    submitBtn.textContent = "Submit";
  }
});
