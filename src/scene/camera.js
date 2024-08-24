import * as THREE from "three";

export function createCamera(aspectRatio, target) {
    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 10);
    camera.position.z = 7;
    camera.lookAt(target);
    return camera;
}
