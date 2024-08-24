import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { setupListeners } from "./components/listeners.js";
import { setupGUI } from "./components/gui.js";
import { createAxesHelper } from "./helpers/helper.js";
import { loadTextures } from "./scene/textureLoader.js";
import { createCamera } from "./scene/camera.js";

// CORE
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// HELPERS
const axesHelper = createAxesHelper(1);
const clock = new THREE.Clock();
scene.add(axesHelper);

const { colorTexture } = loadTextures();

// MESH
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
	map: colorTexture,
	color: "white",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI
const gui = setupGUI(mesh, material);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

// CAMERA + ORBIT CONTROLS
const camera = createCamera(aspectRatio, mesh.position);
const controls = new OrbitControls(camera, canvas);
scene.add(camera);
controls.enableDamping = true;

// RENDERER
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// TICK BASED ANIMATION
const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

setupListeners(window, canvas, sizes, camera, renderer, gui);

animate();
