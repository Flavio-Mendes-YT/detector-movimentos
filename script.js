
const videoScreen = document.getElementById('video');

DiffCamEngine.init({
    video: videoScreen,
    captureIntervalTime: 50,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    captureCallback: captura
})

function initError() {
    alert('Opa, deu errado!');
}

function initSuccess() {
    DiffCamEngine.start();
}

function captura(payload) {
    if(payload['hasMotion']) {
        tiraFoto().then(download);
    }
}

function tiraFoto() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoScreen.videoWidth;
    canvas.height = videoScreen.videoHeight;
    ctx.drawImage(videoScreen, 0,0);
    return new Promise((res,rej) => {
        canvas.toBlob(res, 'image/jpeg');
    })
}

function download(blob) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'foto.jpg';
    document.body.appendChild(a);
    a.click();
}