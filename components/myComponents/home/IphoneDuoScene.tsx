"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Box3, Group, LoopOnce, Mesh, Vector3, type AnimationAction } from "three";
import { useScrollStore } from "@/lib/store/scroll";

const MODEL_URL = "/iphone-duo-rigged.glb";
const UNFOLD_CLIP = "Duo_Open_Close";

/**
 * `Duo_Open_Close` bends the hinge out of the flat bind pose during its first
 * half and back again during its second half. We scrub only that first half,
 * reversed, so the device travels folded -> unfolded and holds unfolded once the
 * scroll sequence is finished.
 */
const UNFOLD_CLIP_FRACTION = 0.5;

/** Portion of the scroll range spent unfolding. The remainder is the turntable spin. */
const UNFOLD_SCROLL_SPAN = 0.6;

/**
 * The `.glb` is authored in real-world metres (~0.165 units wide), which is why it
 * previously collapsed into a microscopic dot in front of the camera. Everything is
 * normalised against its own bounding box and then fitted to the live viewport.
 */
const VIEWPORT_WIDTH_FRACTION = 0.8;
const VIEWPORT_HEIGHT_FRACTION = 0.56;

function IphoneDuoModel() {
  const groupRef = useRef<Group>(null);

  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, mixer } = useAnimations(animations, scene);

  const bounds = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene);
    return { size: box.getSize(new Vector3()), center: box.getCenter(new Vector3()) };
  }, [scene]);

  // <primitive> never opts meshes into the shadow pass, so do it explicitly.
  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  const viewport = useThree((state) => state.viewport);
  const modelScale = Math.min(
    (viewport.width * VIEWPORT_WIDTH_FRACTION) / bounds.size.x,
    (viewport.height * VIEWPORT_HEIGHT_FRACTION) / bounds.size.y
  );

  const unfoldAction = actions[UNFOLD_CLIP] as AnimationAction | undefined;

  useEffect(() => {
    if (!unfoldAction) return;
    // Scrub by hand: keep the action paused so the mixer never advances it, then
    // write `time` directly from the scroll position inside useFrame.
    unfoldAction.reset();
    unfoldAction.setLoop(LoopOnce, 1);
    unfoldAction.clampWhenFinished = true;
    unfoldAction.play();
    unfoldAction.paused = true;
    return () => {
      unfoldAction.stop();
    };
  }, [unfoldAction]);

  useFrame(() => {
    // Transient read: the 3D scene must never subscribe to progress, otherwise the
    // whole R3F tree would re-render on every scroll frame.
    const { progress } = useScrollStore.getState();

    if (groupRef.current) {
      groupRef.current.rotation.y = -Math.PI * 2 * progress;
    }

    if (unfoldAction) {
      const unfold = Math.min(1, progress / UNFOLD_SCROLL_SPAN);
      unfoldAction.time =
        unfoldAction.getClip().duration * UNFOLD_CLIP_FRACTION * (1 - unfold);
      mixer.update(0);
    }
  });

  const modelHeight = bounds.size.y * modelScale;

  return (
    <>
      <group ref={groupRef}>
        <group
          scale={modelScale}
          position={[
            -bounds.center.x * modelScale,
            -bounds.center.y * modelScale,
            -bounds.center.z * modelScale,
          ]}
        >
          <primitive object={scene} />
        </group>
      </group>
      <ContactShadows
        position={[0, -modelHeight / 2, 0]}
        opacity={0.5}
        scale={modelHeight * 4}
        blur={2.6}
        far={modelHeight}
        color="#000000"
      />
    </>
  );
}

export function IphoneDuoScene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.9} />
      <directionalLight position={[0, -6, 2]} intensity={0.35} />

      {/* Own boundary: a slow/offline HDR fetch must not take the device down with it. */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <Suspense fallback={null}>
        <IphoneDuoModel />
        <Preload all />
      </Suspense>
    </>
  );
}
