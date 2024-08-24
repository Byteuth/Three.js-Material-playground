import * as THREE from "three";

export function loadTextures() {
	const loadingManager = new THREE.LoadingManager();

	loadingManager.onStart = () => {
		console.log("Loading started");
	};
	loadingManager.onLoad = () => {
		console.log("Loading finished");
	};
	loadingManager.onProgress = () => {
		console.log("Loading progress");
	};
	loadingManager.onError = (error) => {
		console.log("Loading error", error);
	};

	const textureLoader = new THREE.TextureLoader(loadingManager);

	const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");

	// Configure the texture properties
	colorTexture.colorSpace = THREE.SRGBColorSpace;
	colorTexture.magFilter = THREE.NearestFilter;
	colorTexture.rotation = Math.PI * 0.5;
	colorTexture.center = new THREE.Vector2(0.5, 0.5);

	return { colorTexture };
}
