// ========================================
// SCRIPT UNTUK MOCKUP SIMAS
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // --- Sidebar Toggle (Mobile) ---
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // --- Active Menu Highlight ---
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Form Validation (Simulasi) ---
    const forms = document.querySelectorAll('form.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    input.style.borderColor = '#28a745';
                }
            });

            if (isValid) {
                showAlert('success', 'Data berhasil disimpan! (Simulasi)');
            } else {
                showAlert('danger', 'Harap lengkapi semua field yang wajib diisi!');
            }
        });
    });

    // --- Alert System ---
    function showAlert(type, message) {
        const alertContainer = document.querySelector('.alert-container');
        if (!alertContainer) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;

        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 3000);

        alert.querySelector('.alert-close').addEventListener('click', function() {
            alert.remove();
        });
    }

    // --- Chart Mockup (Dashboard) ---
    const chartContainer = document.querySelector('.chart-bars-container');
    if (chartContainer) {
        const data = [65, 80, 45, 70, 90, 55, 75];
        const max = Math.max(...data);
        const bars = chartContainer.querySelectorAll('.chart-bar');

        bars.forEach((bar, index) => {
            const height = (data[index] / max) * 200;
            bar.style.height = height + 'px';
            bar.setAttribute('data-value', data[index]);
        });
    }

    // --- Tabs (Contoh di halaman Keuangan & Zakat) ---
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');

            // Hapus active dari semua
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Active ke yang diklik
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // --- Modal (Pop-up) ---
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const target = this.getAttribute('data-modal');
            document.getElementById(target).classList.add('show');
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // --- QR Code Simulasi (Absensi) ---
    const qrButtons = document.querySelectorAll('.generate-qr');
    qrButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const qrContainer = this.closest('.qr-container');
            if (qrContainer) {
                const qrCode = qrContainer.querySelector('.qr-code');
                if (qrCode) {
                    qrCode.style.display = 'block';
                    // Simulasi generate QR dengan kode acak
                    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
                    qrCode.innerHTML = `
                        <div class="qr-box">
                            <i class="fas fa-qrcode" style="font-size:80px;color:var(--primary);"></i>
                            <p style="margin-top:8px;font-size:12px;color:var(--gray-600);">Kode: ${randomCode}</p>
                            <small style="font-size:11px;color:var(--gray-600);">Scan untuk absensi</small>
                        </div>
                    `;
                }
            }
        });
    });

    // --- WhatsApp Simulasi (WA Blast) ---
    const waForm = document.querySelector('.wa-blast-form');
    if (waForm) {
        const sendBtn = waForm.querySelector('.btn-send-wa');
        const progressBar = waForm.querySelector('.progress-bar');
        const progressText = waForm.querySelector('.progress-text');

        sendBtn.addEventListener('click', function() {
            const recipientCount = document.getElementById('recipient-count');
            const count = recipientCount ? parseInt(recipientCount.value) || 100 : 100;

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 5) + 1;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    showAlert('success', `WA Blast berhasil dikirim ke ${count} jamaah! (Simulasi)`);
                }
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                    progressBar.textContent = progress + '%';
                }
                if (progressText) {
                    progressText.textContent = `Mengirim... ${progress}%`;
                }
            }, 200);
        });
    }

    // --- Kalkulator Zakat ---
    const zakatForm = document.querySelector('.zakat-calculator');
    if (zakatForm) {
        const hasil = document.querySelector('.hasil-zakat');
        const calculateBtn = zakatForm.querySelector('.btn-hitung');

        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const jenis = document.getElementById('jenis-zakat').value;
            let total = 0;
            let jenisText = '';

            if (jenis === 'fitrah') {
                const jiwa = parseInt(document.getElementById('jumlah-jiwa').value) || 0;
                const hargaBeras = parseInt(document.getElementById('harga-beras').value) || 15000;
                total = jiwa * 2.5 * hargaBeras;
                jenisText = `Zakat Fitrah (${jiwa} jiwa × 2.5 kg × Rp ${hargaBeras.toLocaleString()})`;
            } else if (jenis === 'mal') {
                const harta = parseInt(document.getElementById('total-harta').value) || 0;
                const nisab = 85000000; // 85 gram emas
                if (harta >= nisab) {
                    total = harta * 2.5 / 100;
                    jenisText = `Zakat Mal (2.5% dari Rp ${harta.toLocaleString()})`;
                } else {
                    total = 0;
                    jenisText = 'Harta belum mencapai nisab, tidak wajib zakat mal.';
                }
            }

            if (hasil) {
                if (total > 0) {
                    hasil.innerHTML = `
                        <div class="hasil-box" style="background:#e8f5e9;padding:16px;border-radius:8px;text-align:center;">
                            <h4 style="color:var(--primary);">${jenisText}</h4>
                            <p style="font-size:28px;font-weight:700;color:var(--primary);">Rp ${total.toLocaleString()}</p>
                            <button class="btn btn-primary btn-sm" style="margin-top:8px;">
                                <i class="fas fa-arrow-right"></i> Bayar Sekarang
                            </button>
                        </div>
                    `;
                } else if (jenis === 'mal') {
                    hasil.innerHTML = `
                        <div class="hasil-box" style="background:#fff3e0;padding:16px;border-radius:8px;text-align:center;">
                            <p style="color:#e65100;">${jenisText}</p>
                        </div>
                    `;
                }
            }
        });
    }

    // --- Search/Filter ---
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = this.closest('.table-responsive')?.querySelectorAll('tbody tr');

            if (tableRows) {
                tableRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });

    // --- Print Function ---
    window.printPage = function() {
        window.print();
    };

    // --- Export Excel Simulasi ---
    window.exportExcel = function() {
        showAlert('success', 'Data berhasil diekspor ke Excel! (Simulasi)');
    };

    // --- Export PDF Simulasi ---
    window.exportPdf = function() {
        showAlert('success', 'Data berhasil diekspor ke PDF! (Simulasi)');
    };

    // --- Toggle Password Visibility ---
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            }
        });
    });

    console.log('🚀 SIMAS Mockup siap!');
    console.log('📋 Total 22 fitur siap ditampilkan.');
    console.log('✨ Novelty: Portal Jamaah, Pembayaran Online, WA Gateway, QR Absensi.');
});