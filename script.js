// JavaScript untuk tombol "Mulai Ujian" - Fetch soal dari Apps Script API
document.getElementById('start-exam').addEventListener('click', function() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwLvkOBwYPjI8PdzIJZ2GHoPb-eDrlvWC255Gy8ZjG67Ut8E8asb7EoFLzZaZ3iZfSN/exec?type=form'; // Ganti dengan URL deployment Apps Script Anda + ?type=form
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.questions && data.questions.length > 0) {
                let formHtml = '<form id="exam-form">';
                data.questions.forEach((q, index) => {
                    formHtml += `<div class="question"><label>${q.title}</label>`;
                    q.choices.forEach(choice => {
                        formHtml += `<input type="radio" name="q${index}" value="${choice}" required> ${choice}<br>`;
                    });
                    formHtml += '</div>';
                });
                formHtml += '<input type="text" id="nama" placeholder="Masukkan nama Anda" required><br><br>';
                formHtml += '<button type="submit" class="submit-btn">Kirim Jawaban</button></form>';

                const newWindow = window.open('', '_blank');
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="id">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Mulai Ujian - SMK N2 DOLOKSANGGUL</title>
                        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body class="new-page">
                        <h2>Mulai Ujian Online</h2>
                        ${formHtml}
                        <script>
                            document.getElementById('exam-form').addEventListener('submit', function(e) {
                                e.preventDefault();
                                alert('Jawaban dikirim! (Integrasi penyimpanan belum ditambahkan)');
                                // Tambah logika kirim ke Sheets jika perlu
                            });
                        </script>
                    </body>
                    </html>
                `);
            } else {
                alert('Tidak ada soal tersedia. Periksa Form Anda.');
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
            console.error(error);
        });
});

// JavaScript untuk tombol "Lihat Nilai" - Fetch data dari Apps Script API
document.getElementById('view-scores').addEventListener('click', function() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwLvkOBwYPjI8PdzIJZ2GHoPb-eDrlvWC255Gy8ZjG67Ut8E8asb7EoFLzZaZ3iZfSN/exec?type=sheets'; // Ganti dengan URL deployment Apps Script Anda + ?type=sheets
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                let tableHtml = `
                    <table>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Jawaban Benar</th>
                                <th>Skor</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.results.forEach(result => {
                    tableHtml += `<tr><td>${result.nama || ''}</td><td>${result.jawabanBenar || ''}</td><td>${result.skor || ''}</td></tr>`;
                });
                tableHtml += '</tbody></table>';

                const newWindow = window.open('', '_blank');
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="id">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Lihat Nilai - SMK N2 DOLOKSANGGUL</title>
                        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body class="new-page">
                        <h2>Hasil Nilai Ujian</h2>
                        ${tableHtml}
                    </body>
                    </html>
                `);
            } else {
                alert('Tidak ada data nilai tersedia. Periksa Sheets Anda.');
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
            console.error(error);
        });
});                            <th>Nama</th>
                            <th>Jawaban Benar</th>
                            <th>Skor</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            rows.forEach(row => {
                const cols = row.split(',');
                if (cols.length >= 3) {
                    tableHtml += `<tr><td>${cols[0]}</td><td>${cols[1]}</td><td>${cols[2]}</td></tr>`;
                }
            });
            tableHtml += '</tbody></table>';

            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="id">
                <head>
                    <meta charset="UTF-8">
                    <title>Lihat Nilai - SMA Prestasi Unggul</title>
                    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Roboto', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; margin: 0; padding: 20px; }
                        h2 { font-family: 'Playfair Display', serif; text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; background: rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden; }
                        th, td { padding: 15px; text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
                        th { background: rgba(255, 255, 255, 0.2); }
                    </style>
                </head>
                <body class="new-page">
                    <h2>Hasil Nilai Ujian</h2>
                    ${tableHtml}
                </body>
                </html>
            `);
        })
        .catch(error => {
            alert('Gagal memuat data dari Google Sheets. Periksa URL dan koneksi internet.');
            console.error(error);
        });
});
