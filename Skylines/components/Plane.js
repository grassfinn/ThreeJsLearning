import { PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide } from 'three';

export class Plane {
    mesh;

    constructor() {
        const geometry = new PlaneGeometry(35, 35);
        const material = new MeshStandardMaterial({
            color: 0xffffffff,
            side: DoubleSide,
        });
        this.mesh = new Mesh(geometry, material);
        this.mesh.rotateX(-0.5 * Math.PI);
        this.mesh.receiveShadow = true;
        return this.mesh;
    }
}
