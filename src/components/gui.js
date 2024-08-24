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
	cubeGUI.close();

	// Position controls
	cubeGUI.add(mesh.position, "x").min(-3).max(3).step(0.01).name("X axis");
	cubeGUI.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y axis");
	cubeGUI.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z axis");

	// Material controls
	cubeGUI.add(mesh.material, "wireframe").name("wireframe");
	cubeGUI.add(mesh.material, "visible").name("visibility");

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
