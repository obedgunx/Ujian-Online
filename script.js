// JavaScript untuk tombol "Mulai Ujian"
document.getElementById('start-exam').addEventListener('click', function() {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdH3TEtcjgasbY_Wyzd-8L0cQBduCbYb6eN5PyAn5Goc3PPRw/viewform?usp=header'; // Ganti dengan URL Google Form Anda
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>Mulai Ujian - SMA Prestasi Unggul</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Roboto', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; margin: 0; padding: 20px; }
                h2 { font-family: 'Playfair Display', serif; text-align: center; }
                iframe { width: 100%; height: 80vh; border: none; border-radius: 10px; }
            </style>
        </head>
        <body class="new-page">
            <h2>Mulai Ujian Online</h2>
            <iframe src="${formUrl}"></iframe>
        </body>
        </html>
    `);
});

// JavaScript untuk tombol "Lihat Nilai" - Fetch data dari Google Sheets CSV
document.getElementById('view-scores').addEventListener('click', function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1zPcXzvAmtlQOFmADMackWegwW7gnSlVg_LtcjdV0F3E/edit?gid=85157898#gid=85157898'; // Ganti dengan URL CSV Google Sheets Anda
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header
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
