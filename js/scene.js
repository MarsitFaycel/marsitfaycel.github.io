/* ---------- Scène Three.js : route synthwave infinie ---------- */
import * as THREE from "./vendor/three.module.js";

const TILE = 24;   // longueur d'une tuile de terrain
const SEG = 48;    // finesse du maillage

// Hauteur du terrain : plate sur la route, montagnes sur les côtés.
// Périodique en z, pour que deux tuiles se raccordent sans couture.
function heightAt(x, z) {
  const ax = Math.abs(x);
  if (ax < 1.6) return 0;
  const k = (2 * Math.PI) / TILE;
  const h = Math.sin(x * 0.9) * Math.cos(z * k * 3) + Math.sin(x * 0.35 + 1) * Math.sin(z * k * 2) * 1.5;
  return Math.max(0, (ax - 1.6) * 0.35) * (1.2 + h * 0.6);
}

const sunShader = {
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
  fragmentShader: `
    varying vec2 vUv; uniform float uTime;
    void main(){
      float d = length(vUv - .5);
      if (d > .5) discard;
      float y = vUv.y;
      vec3 col = mix(vec3(1.,.24,.65), vec3(1.,.8,.3), y);
      float stripes = step(.5, fract((y + uTime * .04) * 14.));
      float band = smoothstep(.55, .2, y);              // rayures seulement en bas
      if (y < .55 && stripes < .5 && fract(y * 14.) < band) discard;
      gl_FragColor = vec4(col * (0.85 + smoothstep(.5, .35, d) * .3), 1.);
    }`,
};

/**
 * Crée la scène sur le canvas donné.
 * Renvoie une fonction dispose() qui arrête l'animation, retire les écouteurs
 * et libère la mémoire GPU (géométries, matériaux, contexte WebGL).
 */
export function initScene(canvas, settings = {}) {
  const { roadSpeed = 2, scrollBoost = 1, reducedSpeed = 0.5 } = settings;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const baseSpeed = reduced ? reducedSpeed : roadSpeed;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07040f);
  scene.fog = new THREE.Fog(0x07040f, 8, 38);
  const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
  camera.position.set(0, 1.1, 6);

  // Terrain : une seule géométrie partagée par les 2 tuiles (moitié moins de mémoire)
  const terrainGeo = new THREE.PlaneGeometry(20, TILE, SEG, SEG);
  terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  const groundMat = new THREE.MeshBasicMaterial({ color: 0x0b0618 });
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xff3ea5, wireframe: true, transparent: true, opacity: .55 });
  const tiles = [0, 1].map(i => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(terrainGeo, groundMat), new THREE.Mesh(terrainGeo, wireMat));
    g.position.z = -i * TILE;
    scene.add(g);
    return g;
  });

  // Soleil rétro
  const sun = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    new THREE.ShaderMaterial({ ...sunShader, transparent: true, fog: false, uniforms: { uTime: { value: 0 } } })
  );
  sun.position.set(0, 4.5, -40);
  scene.add(sun);

  // Étoiles
  const N = 1200, sp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    sp[i * 3] = (Math.random() - .5) * 120;
    sp[i * 3 + 1] = Math.random() * 40 + 2;
    sp[i * 3 + 2] = -Math.random() * 60 - 20;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: .12, fog: false, transparent: true, opacity: .8 }));
  scene.add(stars);

  // Objet flottant
  const gem = new THREE.Group();
  gem.add(
    new THREE.Mesh(new THREE.IcosahedronGeometry(.7, 1), new THREE.MeshBasicMaterial({ color: 0x2de2e6, wireframe: true })),
    new THREE.Mesh(new THREE.IcosahedronGeometry(.45, 0), new THREE.MeshBasicMaterial({ color: 0xff3ea5, wireframe: true }))
  );
  scene.add(gem);

  // --- Écouteurs : tous liés à un AbortController, retirés d'un coup par dispose() ---
  const ac = new AbortController();
  const opts = { passive: true, signal: ac.signal };
  const mouse = { x: 0, y: 0 };
  let scroll = 0, maxScroll = 1;

  const onResize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    gem.visible = innerWidth >= 800;   // masqué sur mobile : il cachait le titre
    onLayout();
  };
  const onLayout = () => {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    onScroll();
  };
  // Le scroll est lu dans un écouteur, pas à chaque image : évite de recalculer la mise en page 60 fois par seconde.
  const onScroll = () => { scroll = Math.min(1, scrollY / maxScroll); };
  addEventListener("resize", onResize, opts);
  addEventListener("scroll", onScroll, opts);
  addEventListener("pointermove", e => {
    mouse.x = e.clientX / innerWidth - .5;
    mouse.y = e.clientY / innerHeight - .5;
  }, opts);
  // La hauteur de la page change quand les expériences s'ouvrent : on la remesure
  // (sans redimensionner le rendu WebGL, qui ne dépend que de la fenêtre).
  const ro = new ResizeObserver(onLayout);
  ro.observe(document.body);
  onResize();

  // --- Boucle d'animation (s'arrête d'elle-même quand l'onglet est caché) ---
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    const speed = baseSpeed * (1 + scroll * scrollBoost);

    for (const tile of tiles) {
      tile.position.z += speed * dt;
      if (tile.position.z > TILE) tile.position.z -= TILE * 2;
    }
    sun.material.uniforms.uTime.value = t;
    stars.rotation.z = t * .003;

    gem.rotation.set(t * .4, t * .6, 0);
    gem.position.set(2.4, 2.2 + Math.sin(t * 1.5) * .15 - scroll * 6, 0);

    // Caméra : parallax souris + montée au scroll
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * .05;
    camera.position.y += (1.1 - mouse.y * .5 + scroll * 1.5 - camera.position.y) * .05;
    camera.lookAt(0, 1 + scroll * .8, -10);

    renderer.render(scene, camera);
  });

  return function dispose() {
    renderer.setAnimationLoop(null);
    ac.abort();
    ro.disconnect();
    scene.traverse(obj => {
      obj.geometry?.dispose();
      obj.material?.dispose();
    });
    renderer.dispose();
  };
}
