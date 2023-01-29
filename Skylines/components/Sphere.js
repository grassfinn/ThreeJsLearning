import * as THREE from 'three';

export class Sphere {
    mesh;

    constructor(options) {
        const geometry = new THREE.SphereGeometry(4, 40, 40);
        const material = new THREE.MeshStandardMaterial({
            color: options.sphereColor,
            wireframe: options.wireframe,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.translateX(10);
        this.mesh.translateY(10);
        return this.mesh;
    }
}
