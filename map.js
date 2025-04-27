var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(35.95, 128.25),
        level: 12,
        disableDoubleClickZoom: true
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
// 지도의 이동을 막습니다.
map.setDraggable(false);
// 지도의 확대 축소를 막습니다.
map.setZoomable(false);

var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modal-title");
var modalText = document.getElementById("modal-text");
var confirmBtn = document.getElementById("confirm-btn");
var closeBtn = document.getElementsByClassName("close-btn")[0];

document.querySelectorAll('.location-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var location = link.getAttribute('data-location');

        switch (location) {
            case 'Yeosu':
                modalTitle.textContent = "Yeosu Information";
                modalText.textContent = "여수는 아름다운 해안 도시로, 많은 관광 명소와 맛집이 있습니다...";
                break;
            case 'Icheon':
                modalTitle.textContent = "Icheon Information";
                modalText.textContent = "이천은 별빛우주정원과 쌀로 유명한 도시입니다...";
                break;
            case 'Mungyeong':
                modalTitle.textContent = "Mungyeong Information";
                modalText.textContent = "문경은 자연경관이 아름다운 도시입니다...";
                break;
        }

        modal.style.display = "block";
        startCountdown(link.href);
    });
});

closeBtn.onclick = function () {
    modal.style.display = "none";
    confirmBtn.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        confirmBtn.style.display = 'none';
    }
}

function startCountdown(href) {
    var timeLeft = 3;
    confirmBtn.textContent = `${timeLeft}...`; // 수정
    confirmBtn.disabled = true;
    confirmBtn.style.display = 'inline';

    var countdownInterval = setInterval(function () {
        timeLeft--;
        confirmBtn.textContent = `${timeLeft}...`; // 수정

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            confirmBtn.textContent = '이동중...';

            setTimeout(function () {
                window.location.href = href;
            }, 1000);
        }
    }, 1000);
}