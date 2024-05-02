document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.submit').addEventListener('click', function(event) {
        event.preventDefault(); // Зупиняємо дію форми за замовчуванням
        
        // Отримуємо значення логіна та паролю з полів вводу
        var loginInput = document.querySelector('input[placeholder="Логін"]');
        var passwordInput = document.querySelector('input[placeholder="Пароль"]');
        var repeatPasswordInput = document.querySelector('input[placeholder="Повторіть пароль"]');

        if (loginInput && passwordInput && repeatPasswordInput) {
            var login = loginInput.value;
            var password = passwordInput.value;
            var repeatPassword = repeatPasswordInput.value;

            // Перевіряємо, чи всі поля заповнені
            if (login && password && repeatPassword) {
                // Перевіряємо, чи паролі співпадають
                if (password === repeatPassword) {
                    // Перенаправляємо користувача на сторінку користувача
                    window.location.href = 'user.html';
                } else {
                    alert('Паролі не співпадають. Будь ласка, перевірте введені дані.');
                }
            } else {
                alert('Будь ласка, заповніть усі поля форми.');
            }
        } else {
            alert('Елементи форми не знайдено.');
        }
    });
});
