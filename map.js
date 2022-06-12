window.onload = function () {
    var mapContainer = document.getElementById('map');
    var mapOptions = {
        center: new kakao.maps.LatLng(37.5838166, 127.0000084),
        level: 5
    };

    var map = new kakao.maps.Map(mapContainer, mapOptions);
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();
    
    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    map.relayout();
    // 마커를 표시할 위치와 title 객체 배열입니다
    var positions = [
        {
            title: '임현기',
            latlng: new kakao.maps.LatLng(37.556277, 126.922679)
        },
        {
            title: '이대익',
            latlng: new kakao.maps.LatLng(37.583562, 127.001310)
        },
        {
            title: '안현욱',
            latlng: new kakao.maps.LatLng(37.536988, 127.085028)
        },
        {
            title: '김보라',
            latlng: new kakao.maps.LatLng(37.653252, 127.244383)
        }
    ];
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });
        var iwContent = '<div style="padding:5px;">' + positions[i].title + '</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });
        kakao.maps.event.addListener(marker, 'click', makeClickListener(map, marker, infowindow));

        //let btnmove = document.createElement('button');
        //btnmove.setAttribute("id", "btn" + i)
        //$('#btn').click(function () {
        //    var moveLatlon = positions[i].latlng;
        //    map.panTo(moveLatlon);
        //});
        //document.getElementById("buttons").appendChild(btnmove);
    }
    //mapContainer.appendChild(map);
    function makeClickListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }
    // 버튼 누르면 팀원별 가까운 지하철 역으로 지도 중심 좌표 이동
    $('#btn1').click(function () {
        var moveLatlon = positions[0].latlng;
        map.panTo(moveLatlon);
    });
    $('#btn2').click(function () {
        var moveLatlon = positions[1].latlng;
        map.panTo(moveLatlon);
    });
    $('#btn3').click(function () {
        var moveLatlon = positions[2].latlng;
        map.panTo(moveLatlon);
    });
    $('#btn4').click(function () {
        var moveLatlon = positions[3].latlng;
        map.panTo(moveLatlon);
    });
}
