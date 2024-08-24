export function setupListeners(window, canvas, sizes, camera, renderer, gui) {
	const cursor = {
		x: 0,
		y: 0,
	};

	window.document.addEventListener("mousemove", (event) => {
		cursor.x = -(event.clientX / sizes.width - 0.5);
		cursor.y = event.clientY / sizes.height - 0.5;
	});

	window.addEventListener("resize", () => {
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	window.addEventListener("dblclick", () => {
		const fullscreenElement =
			document.fullscreenElement || document.webkitFullscreenElement;
		if (!fullscreenElement) {
			canvas.requestFullscreen();
		} else if (canvas.webkitFullscreenElement) {
			canvas.webkitFullscreenElement();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	});

	window.addEventListener("keydown", (event) => {
		if (event.key == "h") gui.show(gui._hidden);
	});
}
