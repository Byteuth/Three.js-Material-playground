import * as THREE from "three";
import GUI from "lil-gui";
import gsap from "gsap";

export function setupGUI(mesh, material) {
	const debugObject = {
		color: "white",
		subdivision: 2,
		spin: () => spinMesh(mesh),
	};

	const gui = new GUI({
		width: 300,
		title: "GUI Controls",
		closeFolders: true,
	});

	// Create a folder for the cube controls
	const cubeGUI = gui.addFolder("main cube");
	const materialGUI = gui.addFolder("material ui");
	cubeGUI.close();

	// Material controls 
	materialGUI.add(material, "metalness").min(0).max(1).step(0.0001).name("metalness");
	materialGUI.add(material, "roughness").min(0).max(1).step(0.0001).name("roughness");
	materialGUI.add(material, 'clearcoat').min(0).max(1).step(0.0001).name("clearcoat");
	materialGUI.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001).name("clearcoatRoughness");
	materialGUI.add(material, "sheen").min(0).max(1).step(0.0001).name("sheen");
	materialGUI.add(material, 'sheenRoughness').min(0).max(1).step(0.0001).name("sheenRoughness");
	materialGUI
	.addColor(material, "sheenColor")
	.name("sheenColor")
	.onChange((hex) => {
		mesh.color = hex.getHexString();
		material.color.set("#" + mesh.color);
	});


	materialGUI.add(material, 'iridescence').min(0).max(1).step(0.0001).name("iridescence");
	materialGUI.add(material, 'iridescenceIOR').min(1).max(10).step(2.333).step(0.0001).name("iridescenceIOR");
	materialGUI.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1).name("iridescenceThickness");
	materialGUI.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1).name("iridescenceThickness");

	materialGUI.add(material, "transmission").min(0).max(1).step(0.0001).name("transmission");
	materialGUI.add(material, "ior").min(1).max(10).step(0.0001).name("ior");
	materialGUI.add(material, "thickness").min(0).max(1).step(0.0001).name("thickness");
	
	materialGUI.add(mesh.material, "wireframe").name("wireframe");
	materialGUI.add(mesh.material, "visible").name("visibility");
	// Position controls 
	cubeGUI.add(mesh.position, "x").min(-3).max(3).step(0.01).name("X axis");
	cubeGUI.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y axis");
	cubeGUI.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z axis");

	// Color control
	cubeGUI
		.addColor(material, "color")
		.name("color")
		.onChange((hex) => {
			debugObject.color = hex.getHexString();
			material.color.set("#" + debugObject.color);
		});

	// Spin control
	cubeGUI.add(debugObject, "spin").name("spin");

	// Subdivision control
	cubeGUI
		.add(debugObject, "subdivision")
		.min(2)
		.max(10)
		.step(1)
		.name("subdivision")
		.onFinishChange(() => {
			mesh.geometry.dispose();
			mesh.geometry = new THREE.BoxGeometry(
				1,
				1,
				1,
				debugObject.subdivision,
				debugObject.subdivision,
				debugObject.subdivision
			);
		});

	return gui;
}

// Helper function to spin the mesh
function spinMesh(mesh) {
	gsap.to(mesh.rotation, {
		y: mesh.rotation.y + Math.PI * 2,
		duration: 1,
	});
}
