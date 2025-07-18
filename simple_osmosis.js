// Simple osmosis simulation that definitely works
function simpleStartSimulation() {
    console.log('Simple simulation starting...');
    
    const canvas = document.getElementById('osmosis-canvas');
    if (!canvas) {
        console.error('No canvas found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Clear and set size
    canvas.width = 800;
    canvas.height = 400;
    
    let particles = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: 6,
            color: i < 30 ? '#e74c3c' : '#3498db'
        });
    }
    
    function animate() {
        // Clear
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw membrane
        ctx.fillStyle = '#37474f';
        ctx.fillRect(canvas.width/2 - 3, 0, 6, canvas.height);
        
        // Update and draw particles
        particles.forEach(p => {
            // Random walk
            p.vx += (Math.random() - 0.5) * 0.8;
            p.vy += (Math.random() - 0.5) * 0.8;
            p.vx *= 0.95;
            p.vy *= 0.95;
            
            // Move
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off walls
            if (p.x < p.radius || p.x > canvas.width - p.radius) {
                p.vx *= -1;
                p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
            }
            if (p.y < p.radius || p.y > canvas.height - p.radius) {
                p.vy *= -1;
                p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));
            }
            
            // Membrane bounce (simple)
            if (Math.abs(p.x - canvas.width/2) < p.radius + 3) {
                if (Math.random() < 0.7) { // 70% bounce
                    p.vx *= -1;
                    p.x = p.x < canvas.width/2 ? canvas.width/2 - p.radius - 4 : canvas.width/2 + p.radius + 4;
                }
            }
            
            // Draw particle
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = p.color === '#e74c3c' ? '#c0392b' : '#2980b9';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    console.log('Simple animation started!');
}

// Replace the complex startSimulation with this simple one
window.startSimulation = simpleStartSimulation;