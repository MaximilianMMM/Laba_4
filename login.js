document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.submit').addEventListener('click', function(event) {
        event.preventDefault(); // Зупиняємо дію форми за замовчуванням
        
        // Отримуємо значення логіна та паролю з полів вводу
        var login = document.getElementById('login').value;
        var password = document.getElementById('password').value;
        
        // Перевіряємо, чи логін та пароль відповідають адміністратору
        if (login === 'admin@gmail.com' && password === 'admin') {
            window.location.href = 'admin.html';
        }
        // Перевіряємо, чи логін та пароль відповідають звичайному користувачеві
        else if (login === 'user@gmail.com' && password === 'user') {
            window.location.href = 'user.html';
        }
        // Якщо логін та пароль не відповідають жодному з умов, виводимо повідомлення
        else {
            alert('Ви не зареєстровані');
        }
    });
});
