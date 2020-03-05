let pageNumber = 10;

const API_URL = `https://api.unsplash.com/photos/?client_id=GYxiirmsEJ_GtnTeuvE9MEatWwiK_ZwFok0gt3CxChM&per_page=10&page=${pageNumber}`;

function getPhotos(API_URL) {
	fetch(API_URL)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const getMap = data.map((x) => {
				const item = document.createElement("div");
				item.classList.add("box");
				const innerImg = document.createElement("img");
				innerImg.src = x.urls && x.urls.small;
				item.appendChild(innerImg);
				return item;
			});
			getMap.forEach((element) => {
				let mod = document.getElementById("boxes");
				mod.appendChild(element);
			});
		});
}

function loadingSpinner() {
	let loading = document.getElementById("loader");
	loading.classList.add("show");
	setTimeout(() => {
		loading.classList.remove("show");
		pageNumber++;
		getPhotos(API_URL);
	}, 1000);
}
getPhotos(API_URL);
window.addEventListener("scroll", () => {
	const scrollTop = document.documentElement.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight;
	const clientHeight = document.documentElement.clientHeight;
	if (scrollTop + clientHeight > scrollHeight - 5) {
		pageNumber += 1;
		loadingSpinner();
		getPhotos(API_URL);
	}
});
