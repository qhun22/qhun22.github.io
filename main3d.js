document.addEventListener("DOMContentLoaded", () => {
    const networkGrid = document.querySelector('.network-grid');
    const isMobile = window.matchMedia("(max-width: 768px)").matches; // Kiểm tra thiết bị mobile
    const numberOfDots = isMobile ? 50 : 100; // Giảm số chấm trên mobile
    const dots = [];
    const speed = isMobile ? 0.03 : 0.05; // Giảm tốc độ trên mobile
    const connectDistance = isMobile ? window.innerWidth * 0.2 : 150; // Tính khoảng cách theo % màn hình

    // Tạo các điểm
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = `${Math.random() * 100}vh`;
        dot.style.left = `${Math.random() * 100}vw`;
        networkGrid.appendChild(dot);
        dots.push(dot);
    }

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    networkGrid.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const updateLines = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach((dot1, index1) => {
            const rect1 = dot1.getBoundingClientRect();
            const x1 = rect1.left + rect1.width / 2;
            const y1 = rect1.top + rect1.height / 2;
            
            dots.forEach((dot2, index2) => {
                if (index1 < index2) { // Tránh lặp lại cặp điểm
                    const rect2 = dot2.getBoundingClientRect();
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;
                    const distance = Math.hypot(x2 - x1, y2 - y1);
                    
                    if (distance < connectDistance) {
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
        });
    };

    const animate = () => {
        dots.forEach(dot => {
            const top = parseFloat(dot.style.top);
            const left = parseFloat(dot.style.left);
            
            // Di chuyển lên trên và reset khi ra khỏi màn hình
            let newTop = top - speed;
            if (newTop < -5) {
                newTop = 100;
                dot.style.left = `${Math.random() * 100}vw`; // Thay đổi vị trí ngẫu nhiên khi reset
            }
            dot.style.top = `${newTop}vh`;
        });

        updateLines();
        requestAnimationFrame(animate);
    };

    // Xử lý resize màn hình
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();

    // ========== Đăng ký/Đăng nhập ==========
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

window.register = function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    if (accounts.some(acc => acc.username === username)) {
        alert('Tên tài khoản đã tồn tại!');
        return;
    }
    
    accounts.push({ username, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Đăng ký thành công!');
    window.location.href = "index.html";
};

window.login = function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const user = accounts.find(acc => acc.username === username && acc.password === password);
    user ? window.location.href = "main.html" : alert('Sai thông tin đăng nhập!');
};

// Hiển thị mật khẩu
document.getElementById('toggle-password')?.addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});
});