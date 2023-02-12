import * as THREE from 'three';

export class RandomBuiding {
    mesh;
    geometry;

    constructor(options) {
        this.geometry = new THREE.BoxGeometry(options.width, options.height, options.depth);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
            wireframe: false,
        });
        this.mesh = new THREE.Mesh(this.geometry, material);
        const baseHeight = this.geometry.parameters.height / 2;
        this.mesh.position.set(options.x, baseHeight, options.y);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        return this.mesh;
    }
}