window.onload = function () {

    var canvas = document.getElementById('theCanvas');
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    let nowdrawing = false;
    let brushwidth = 5;
    let webimageused = false;

    //선굵기 변화
    document.getElementById("sliderA").addEventListener("change", function () {
        brushwidth = document.getElementById("sliderA").value;
    });

    //색깔 교체
    let red = document.getElementById("redslider");
    let blue = document.getElementById("blueslider");
    let green = document.getElementById("greenslider");

    red.addEventListener("change", colorChange);
    blue.addEventListener("change", colorChange);
    green.addEventListener("change", colorChange);


    //색 변환기에 쓸 16진법 변환기
    function decimalToHexString(number)
    {
        /*
         if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
         */
        if (number <= 16)
            return "0"+number.toString(16).toUpperCase();
        else
            return number.toString(16).toUpperCase();
    }

    //처음바탕색깔
    let nowcolor;

    //색변화 감지
    function colorChange()
    {
        //색 조합
        let newr = decimalToHexString(Number(red.value));
        let newb = decimalToHexString(Number(blue.value));
        let newg = decimalToHexString(Number(green.value));
        nowcolor = '#' + newr + newg + newb;
        console.log(nowcolor);

        //브러쉬 현재색깔
        let cbox = document.getElementById("colorbox");
        let cboxtx = cbox.getContext('2d');
        cboxtx.fillStyle = nowcolor;
        cboxtx.fillRect(0, 0, canvas.width, canvas.height)
    }

    nowcolor = colorChange();




    ////////////////////////선 그리기 시작///////////////
    canvas.addEventListener("mousedown", stardraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", endraw);
    canvas.addEventListener("mouseout", endraw);

    function stardraw() {

        var bb = canvas.getBoundingClientRect();
        const x = event.clientX - bb.left
        const y = event.clientY - bb.top;

        nowdrawing = true;
        ctx.beginPath(); // 없으면 선 굵기 변화시 그전에 그린것도 같이 따라감
        ctx.moveTo(x, y);
        ctx.strokeStyle = nowcolor; // 선 색깔 적용
        ctx.lineWidth = brushwidth; // 선 굵기 적용

    }

    function drawing() {
        if (nowdrawing) {

            var bb = canvas.getBoundingClientRect();
            const x = event.clientX - bb.left
            const y = event.clientY - bb.top;

            ctx.lineTo(x, y);
            ctx.stroke();
        }

    }

    function endraw() {
        nowdrawing = false;
    }
    /////////////////////선그리기 끝///////////////////////////////

    //캔버스 교체
    //사진으로 //외부링크는 다운로드가 안되므로 임시봉인
    
    document.getElementById("imagesubmit").addEventListener('click', function () {
        var img = new Image(); //이미지 객체 생성
        img.src = document.getElementById("canvasbackgroundimage").value;                
        //img.crossOrigin = 'Anonymous';
        console.log(img.src);
        ctx.drawImage(img, 0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
        webimageused = true;
    })
    

    //팔레트로
    document.getElementById("noimage").addEventListener('click', function () {
        ctx.fillStyle = nowcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    })
    
    //이미지 다운로드
    document.getElementById('download').addEventListener('click', event => {
        if (webimageused) {
            alert("주의 : 외부링크로 가져온 이미지는 다운로드할 수 없습니다.");
        }
        else
        {
            document.getElementById('download').setAttribute('download', "my_painting.png");
            document.getElementById('download').setAttribute('href', canvas.toDataURL());
        }
            
    });
    //웹 이미지 다수는 img.crossOrigin = 'Anonymous';가 안먹혀서 다운로드가 안됨
    
}
