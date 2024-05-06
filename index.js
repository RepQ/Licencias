import LocomotiveScroll from 'locomotive-scroll';
import * as THREE from 'three';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
});

const objectsDistance = 200;
const objectGroup = new THREE.Group();
const canvas = document.querySelector('canvas.imagen3D')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas });

renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 2);
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.autoClear = false;

renderer.setClearColor(0x000000);
// Agregar una luz ambiental para iluminar toda la escena
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // Color blanco, intensidad 0.5
scene.add(ambientLight);

var geometry = new THREE.TetrahedronGeometry(2, 0);

var particle = new THREE.Object3D();
var skelet = new THREE.Object3D();
var comet = new THREE.Object3D();

scene.add(particle);
scene.add(skelet);
scene.add(comet);
objectGroup.add(skelet)
var material = new THREE.MeshToonMaterial({
	color: 0xffeded
});

var cometMaterial = new THREE.MeshToonMaterial({
	color: 0xffeded,
	wireframe: true,
	side: THREE.DoubleSide

});

for (var i = 0; i < 500; i++) {
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
	mesh.position.multiplyScalar(90 + (Math.random() * 1500));
	mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
	particle.add(mesh);
}


for (var i = 0; i < 800; i++) {
	var mesh = new THREE.Mesh(geometry, cometMaterial);
	mesh.scale.set(0.1, 0.1, 0.1);
	mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
	mesh.position.multiplyScalar(200 + (Math.random() ));
	mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
	comet.add(mesh);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth , window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

camera.position.z = 2;
const clock = new THREE.Clock()
let previousTime = 0

function animate() {
	// Añade un event listener para el clic del mouse
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
	camera.position.y = - scrollY / window.innerHeight * objectsDistance;

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

// Agregar el grupo a la escena
scene.add(objectGroup);

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
	scrollY = window.scrollY
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
	{
		cursor.x = event.clientX / window.innerWidth * 50
		cursor.y = event.clientY / window.innerHeight * 50
	})

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
cameraGroup.add(camera)

window.addEventListener('resize', onWindowResize, false);
animate();