import { PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, TextureLoader } from 'three';
export class Plane {
    mesh;

    constructor({width=35, height=35, orientation='horizontal', image=null, receiveShadow=false}) {
        const geometry = new PlaneGeometry(width, height);
        const material = new MeshStandardMaterial({
            color: 0x717171,
            side: DoubleSide,
            opacity: 1,
            map: image == null ? undefined : new TextureLoader().load(image)
        });
        this.mesh = new Mesh(geometry, material);
        if (orientation === 'horizontal') {
            this.mesh.rotateX(-0.5 * Math.PI);
        } else {
            this.mesh.rotateY(-0.5 * Math.PI);
        }
        this.mesh.receiveShadow = receiveShadow;
        return this.mesh;
    }
}
