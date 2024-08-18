import * as THREE from "three";
import { AxesHelper } from "three";
import gsap from "gsap"; //animations
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const axesHelper = new AxesHelper();
scene.add(axesHelper);

const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

const cursor = {
	x: 0,
	y: 0,
};

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 10);
camera.lookAt(mesh.position);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	controls.update();
	// mesh.rotation.x = elapsedTime;
	// mesh.rotation.y = elapsedTime;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
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

animate();
