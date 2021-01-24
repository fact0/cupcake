document.addEventListener("DOMContentLoaded", function () {
	const BASE_URL = "http://localhost:5000/api";

	// capitalize eatch word method
	String.prototype.CapEachWord = function () {
		return this.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
	};

	// // Populate file name in uploaded file field:
	// const fileInput = document.querySelector("#file-js input[type=file]");
	// fileInput.onchange = () => {
	// 	if (fileInput.files.length > 0) {
	// 		const fileName = document.querySelector("#file-js .file-name");
	// 		fileName.textContent = fileInput.files[0].name;
	// 	}
	// };

	// Modal selectors
	let $modal = $(".modal");
	let $modalButton = $(".modal-button");
	let $modalClose = $(".delete");
	let $modalCancel = $("#btn-modal-close");

	// Open and close modal form:
	function closeModal() {
		$modal.removeClass("is-clipped");
		$modal.removeClass("is-active");
	}

	$modalButton.on("click", function () {
		$modal.addClass("is-clipped");
		$modal.addClass("is-active");
	});

	$modalClose.on("click", function () {
		closeModal();
	});

	$modalCancel.on("click", function () {
		closeModal();
	});

	// Close modal form on esc key:
	document.addEventListener("keydown", function (event) {
		var e = event || window.event;
		if (e.keyCode === 27) {
			closeModal();
		}
	});

	// rendering cupcakes html from api
	function generateCupcakeHTML(cupcake) {
		return `
        <div class="column is-one-quarter mt-0 has-text-centered">
        <div class="card">
            <div class="card-image">
                <figure class="image is-256x256 is-1by1">
                    <a href="/{{pet.id}}"
                        ><img
                            src="
                            ${cupcake.image}
                            "
                            alt="Cupcake Image"
                    /></a>
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content is-clipped">
                        <p class="title is-4">${cupcake.flavor.CapEachWord()}</p>
                    </div>
                </div>
                <div class="content is-medium">
                    <p>Size: ${cupcake.size.CapEachWord()}</p>
                    <p>Rating: ${cupcake.rating}/10<p>
                </div>
            </div>
        </div>
    </div>
    `;
	}

	// Show initial cupcakes from db
	async function showInitialCupcakes() {
		const response = await axios.get(`${BASE_URL}/cupcakes`);

		for (let cupcakeData of response.data.cupcakes) {
			let newCupcake = $(generateCupcakeHTML(cupcakeData));
			$("#cupcakes-list").append(newCupcake);
		}
	}

	// Submit new cupcake
	$("#cupcake-form").on("submit", async function (evt) {
		evt.preventDefault();

		let flavor = $("#flavor").val();
		let rating = $("#rating").val();
		let size = $("#size").val();
		let image = $("#image").val();

		const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
			flavor,
			rating,
			size,
			image,
		});

		let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
		$("#cupcakes-list").append(newCupcake);
		$("#cupcake-form").trigger("reset");
		closeModal();
	});

	$(showInitialCupcakes);
});
