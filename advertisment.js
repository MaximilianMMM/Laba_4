document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("myModal");
    let closeAdvBtn = document.getElementById("closeAdvBtn");
    let advertismentTimer = document.getElementById("advertismentTimer");
  
    setTimeout(function() {
        modal.style.display = "block";
        startTimer();
    }, 10000);

    closeAdvBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    function startTimer() {
        let remainTime = 5; 
    
        let intervalId = setInterval(function() {
            advertismentTimer.innerHTML = "Advertisement closes in " + remainTime + " seconds.";
    
            if (remainTime <= 0) {
                clearInterval(intervalId); 
                advertismentTimer.innerHTML = "Advertisement closed.";
                closeAdvBtn.style.display = "block";
            }
    
            remainTime--;
        }, 1000); 
    } 
  });

  console.log(fetchNews());

  function fetchNews() {
    return fetch('https://newsapi.org/v2/top-headlines/sources?sources=bbc-news&apiKey=297313c5114c45b292c312135f1e11f8')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.articles)
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }