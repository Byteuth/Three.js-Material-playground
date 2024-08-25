import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export function loadTextures(scene) {
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

	const rgbeLoader = new RGBELoader(loadingManager);
	rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
		console.log(environmentMap)
		environmentMap.mapping = THREE.EquirectangularReflectionMapping;
		scene.background = environmentMap;
		scene.environment = environmentMap
	})
	
	const textureLoader = new THREE.TextureLoader(loadingManager);
	const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
	const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
	const doorAmbientOcclusionTexture = textureLoader.load(
		"./textures/door/ambientOcclusion.jpg"
	);
	const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
	const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
	const doorMetalnessTexture = textureLoader.load(
		"./textures/door/metalness.jpg"
	);
	const doorRoughnessTexture = textureLoader.load(
		"./textures/door/roughness.jpg"
	);
	const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
	const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

	// Configure the texture properties
	doorColorTexture.colorSpace = THREE.SRGBColorSpace;
	matcapTexture.colorSpace = THREE.SRGBColorSpace;

	return {
		doorColorTexture,
		doorRoughnessTexture,
		doorAlphaTexture,
		matcapTexture,
		gradientTexture,
		doorMetalnessTexture,
		doorNormalTexture,
		doorHeightTexture,
		doorAmbientOcclusionTexture,
		doorColorTexture,
		doorRoughnessTexture,
		doorAlphaTexture,
		matcapTexture,
		gradientTexture,
		doorMetalnessTexture,
		doorNormalTexture,
		doorHeightTexture,
		doorAmbientOcclusionTexture,
	};
}
