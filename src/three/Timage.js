import { TextureLoader } from "three";

const textureloader = new TextureLoader();

export const texturImage = textureloader.load("/1.png");

export const frame1 = textureloader.load("/WoodFloor024_1K_Color.jpg");
export const frame3 = textureloader.load("/WoodFloor024_1K_Displacement.jpg");
export const frame2 = textureloader.load("/WoodFloor024_1K_Roughness.jpg");
