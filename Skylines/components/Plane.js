import { PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, TextureLoader } from 'three';
export class Plane {
    mesh;

    constructor(width=35, height=35, orientation='horizontal', image=null) {
        const geometry = new PlaneGeometry(width, height);
        const material = new MeshStandardMaterial({
            color: 0xffffffff,
            side: DoubleSide,
            opacity: 1,
            side: DoubleSide,
            map: image == null ? undefined : new TextureLoader().load(image)
        });
        this.mesh = new Mesh(geometry, material);
        if (orientation === 'horizontal') {
            this.mesh.rotateX(-0.5 * Math.PI);
        } else {
            this.mesh.rotateY(-0.5 * Math.PI);
        }
        this.mesh.receiveShadow = true;
        return this.mesh;
    }
}
