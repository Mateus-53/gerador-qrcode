const image = document.querySelector("#status img"),
	inputField = document.querySelector("#input-field"),
	inputElement = document.querySelector("#input-field #input-value"),
	pasteBtn = document.querySelector("#input-field #paste"),
	generateBtn = document.querySelector("#action-area #generate"),
	downloadBtn = document.querySelector("#action-area #download");
let qrCodeValue;

pasteBtn.addEventListener("click", pasteContent);
generateBtn.addEventListener("click", qrCodeGenerate);
downloadBtn.addEventListener("click", qrCodeDownload);

async function pasteContent() {
	try {
		const text = await navigator.clipboard.readText();
		inputElement.value += text;
	} catch (error) {
		errorMessage("Falha ao ler a área de transferência!");
	}
}

function qrCodeGenerate() {
	let inputValue = inputElement.value.trim();

	if (!inputValue) {
		errorMessage("Nenhum valor encontrado!");
		return;
	}

	inputElement.value = inputValue;

	inputField.classList.remove("invalid");
	qrCodeValue = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${inputValue}`;
	image.setAttribute("src", qrCodeValue);
	image.setAttribute("alt", "Imagem do QR Code");
	downloadBtn.removeAttribute("disabled");
}

async function qrCodeDownload() {
	const image = await fetch(qrCodeValue),
		imageBlob = await image.blob(),
		imageUrl = URL.createObjectURL(imageBlob),
		link = document.createElement("a");

	link.setAttribute("href", imageUrl);
	link.setAttribute("download", "qr-code-image");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function errorMessage(message) {
	image.setAttribute("src", "assets/images/void-image.svg");
	image.setAttribute("alt", "Imagem vazia");
	inputElement.setAttribute("placeholder", message);
	inputField.classList.add("invalid");
	downloadBtn.setAttribute("disabled", "true");
	inputElement.value = "";

	setTimeout(() => {
		inputField.classList.remove("invalid");
		inputElement.setAttribute("placeholder", "Insira sua URL ou texto aqui");
	}, 1500);
}
