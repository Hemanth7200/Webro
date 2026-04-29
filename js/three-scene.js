// Three.js Background Setup
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F8FAFC'); // Matches var(--bg-color)
    
    // Add soft fog for depth
    scene.fog = new THREE.FogExp2('#F8FAFC', 0.001);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x4F46E5, 2); // Primary blue
    directionalLight1.position.set(10, 20, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x8B5CF6, 1.5); // Accent purple
    directionalLight2.position.set(-10, -20, -10);
    scene.add(directionalLight2);
    
    const pointLight = new THREE.PointLight(0x10B981, 1, 50); // Secondary green
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Materials - Soft, glassy look
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9, // glass-like
        thickness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    // Shapes
    const shapes = [];

    // 1. Torus Knot
    const geometry1 = new THREE.TorusKnotGeometry(4, 1.2, 100, 16);
    const torusKnot = new THREE.Mesh(geometry1, material);
    torusKnot.position.set(-15, 5, -10);
    scene.add(torusKnot);
    shapes.push({ mesh: torusKnot, rotX: 0.005, rotY: 0.01 });

    // 2. Icosahedron
    const geometry2 = new THREE.IcosahedronGeometry(5, 0);
    const icosahedron = new THREE.Mesh(geometry2, material);
    icosahedron.position.set(18, -2, -15);
    scene.add(icosahedron);
    shapes.push({ mesh: icosahedron, rotX: 0.01, rotY: 0.005 });

    // 3. Sphere
    const geometry3 = new THREE.SphereGeometry(3, 32, 32);
    const sphere = new THREE.Mesh(geometry3, material);
    sphere.position.set(-5, -10, -5);
    scene.add(sphere);
    shapes.push({ mesh: sphere, rotX: 0.002, rotY: 0.002 });
    
    // 4. Floating Torus
    const geometry4 = new THREE.TorusGeometry(6, 1.5, 16, 100);
    const torus = new THREE.Mesh(geometry4, material);
    torus.position.set(10, 15, -20);
    scene.add(torus);
    shapes.push({ mesh: torus, rotX: 0.008, rotY: 0.004 });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Parallax effect based on mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Animate shapes
        shapes.forEach((shape, index) => {
            shape.mesh.rotation.x += shape.rotX;
            shape.mesh.rotation.y += shape.rotY;
            
            // Add slight floating motion
            shape.mesh.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.02;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
