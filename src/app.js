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
// scene.add(axesHelper);

const {
	doorColorTexture,
	doorRoughnessTexture,
	doorAlphaTexture,
	matcapTexture,
	gradientTexture,
	doorMetalnessTexture,
	doorNormalTexture,
	doorHeightTexture,
	doorAmbientOcclusionTexture,
} = loadTextures(scene);

// MESH
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshMatcapMaterial()
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()

// const material = new THREE.MeshToonMaterial() // niceee
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial(); //insane good
const material = new THREE.MeshPhysicalMaterial(); //worst performance
material.metalness = 1;
material.roughness = 1
// material.shininess  = 100
// material.specular = new THREE.Color('green')

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 1;
// pointLight.position.y = 2;
// pointLight.position.z = 3;
// scene.add(pointLight);

// material.color = new THREE.Color('red');
// material.wireframe = true
// material.opacity = 0.8
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1.2;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale = new THREE.Vector2(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;

// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

material.sheen = 1;
material.sheenRoughness = 0.4;
material.sheenColor.set(1,1,1)

material.iridescence = 1;
material.iridescenceIOR = 1.5;
material.iridescenceThicknessRange = [100, 800]

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5



// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide;

const mesh = new THREE.Mesh(geometry, material);

const sphereMesh = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 16, 16),
	material
);
sphereMesh.position.x = -1.5;

const planeMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(1, 1, 100, 100),
	material
);

const torusMesh = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 64, 128),
	material
);
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

// GUI
// const meshes = [mesh, sphereMesh, planeMesh, torusMesh];
const gui = setupGUI(torusMesh, material);

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
	sphereMesh.rotation.y = 0.1 * elapsedTime;
	// planeMesh.rotation.y = 0.1 * elapsedTime;
	torusMesh.rotation.y = 0.1 * elapsedTime;

	sphereMesh.rotation.x = -0.15 * elapsedTime;
	// planeMesh.rotation.x = -0.15 * elapsedTime;
	torusMesh.rotation.x = -0.15 * elapsedTime;

	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

setupListeners(window, canvas, sizes, camera, renderer, gui);

animate();
