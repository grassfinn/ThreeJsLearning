import { PlaneGeometry, MeshStandardMaterial, Mesh, BackSide, TextureLoader } from 'three';
import {SCENE_SIZE} from '../index';
export class Plane {
    mesh;

    constructor(width=SCENE_SIZE, height=SCENE_SIZE, orientation='horizontal', image=null) {
        const geometry = new PlaneGeometry(width, height);
        const material = new MeshStandardMaterial({
            color: 0xffffffff,
            opacity: 1,
            side: BackSide,
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
