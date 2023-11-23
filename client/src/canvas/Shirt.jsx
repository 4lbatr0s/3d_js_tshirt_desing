import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb"); //INFO: HOW TO USE 3D MODELS

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  //INFO: How to render three.js components, three.js cannot render regular <div>.
  
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap); //sometimes, tshirt does not update, to make sure it does, we create a state string.
  return (
    <group>
      key={stateString}
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}
          {snap.isLogoTexture && (
          <Decal 
            position={[0,0.04,0.15]}
            rotation={[0,0,0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWriteh={true}
          />
        )}
      </mesh> 
    </group>
  );
};

export default Shirt;
