var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(36.3, 127.8),
        level: 13,
        disableDoubleClickZoom: true
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
map.setDraggable(false);
map.setZoomable(false);

// 모달 세팅
var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modal-title");
var modalText = document.getElementById("modal-text");
var confirmBtn = document.getElementById("confirm-btn");
var closeBtn = document.getElementsByClassName("close-btn")[0];

var selectedHref = null;

// 카운트다운
function startCountdown() {
    var timeLeft = 3;
    confirmBtn.textContent = `${timeLeft}...`;
    confirmBtn.disabled = true;
    confirmBtn.style.display = 'inline';

    var countdownInterval = setInterval(function () {
        timeLeft--;
        confirmBtn.textContent = `${timeLeft}...`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            confirmBtn.textContent = '이동중...';
            setTimeout(function () {
                window.location.href = selectedHref;
            }, 1000);
        }
    }, 1000);
}

// 커스텀 오버레이
function createLocation(lat, lng, href, locationName, className) {
    var content = `
        <div class="custom-overlay">
            <div class="location ${className}" data-href="${href}" data-location="${locationName}"></div>
        </div>
    `;

    var position = new kakao.maps.LatLng(lat, lng);

    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 0.5,
        xAnchor: 0.5
    });
}

// 실제 좌표로 고정
createLocation(37.2795, 127.4425, './icheon1.html', 'Icheon', 'Icheon');    // 이천
createLocation(36.5866, 128.1872, './mungyeong1.html', 'Mungyeong', 'Mungyeong'); // 문경
createLocation(34.7603, 127.6622, './yeosu1.html', 'Yeosu', 'Yeosu');       // 여수

// 클릭 이벤트
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('location')) {
        var location = event.target.getAttribute('data-location');
        selectedHref = event.target.getAttribute('data-href');

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
        startCountdown();
    }
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