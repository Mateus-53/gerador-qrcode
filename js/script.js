const inputValue = document.querySelector(".input"),
  createBtn = document.querySelector(".createCode"),
  qrImg = document.querySelector(".qrImg");

function qrGenerate() {
  let qrValue = inputValue.value;
  if (!qrValue) {
    alert("Insira um texto ou uma URL para gerar o QR Code");
    return;
  }

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  createBtn.textContent = "Gerando o QR Code...";

  qrImg.addEventListener("load", () => {
    createBtn.textContent = "Gerar QR Code";
  });
}

createBtn.addEventListener("click", qrGenerate);

inputValue.addEventListener("keyup", (e) => {
  let key = e.which || e.keyCode;
  if (key == 13) {
    qrGenerate();
  }

  if (!inputValue.value) {
    qrImg.src = "";
  }
});
