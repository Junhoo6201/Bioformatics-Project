// Navigation Functions
function selectCalculator(calculatorId) {
    // Hide main selection
    document.getElementById('main-selection').classList.remove('active');
    
    // Show calculator container
    document.getElementById('calculator-container').classList.add('active');
    
    // Hide all calculator sections
    document.querySelectorAll('.calculator-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected calculator
    const selectedCalc = document.getElementById(`${calculatorId}-calculator`);
    if (selectedCalc) {
        selectedCalc.classList.remove('hidden');
    }
    
    // Update breadcrumb
    const calcName = calculatorId === 'protein-synthesis' ? 'Protein Synthesis' : 'Osmosis & Diffusion';
    document.getElementById('current-calculator-name').textContent = calcName;
    
    // Show appropriate tabs
    if (calculatorId === 'protein-synthesis') {
        // Activate first tab
        const firstTab = document.querySelector('#protein-synthesis-calculator .tab-btn');
        if (firstTab) {
            firstTab.click();
        }
    } else if (calculatorId === 'osmosis-diffusion') {
        // Make sure the osmosis tab content is visible
        const osmosisTabContent = document.getElementById('osmosis');
        if (osmosisTabContent) {
            // Hide all tab contents in this calculator
            document.querySelectorAll('#osmosis-diffusion-calculator .tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            // Show osmosis tab
            osmosisTabContent.classList.add('active');
        }
        
        // Initialize canvas for osmosis
        setTimeout(() => {
            initializeCanvas();
        }, 200);
    }
}

function backToSelection() {
    // Hide calculator container
    document.getElementById('calculator-container').classList.remove('active');
    
    // Show main selection
    document.getElementById('main-selection').classList.add('active');
    
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show main selection screen by default
    document.getElementById('main-selection').classList.add('active');
    document.getElementById('calculator-container').classList.remove('active');
    
    // Initialize temperature slider
    const tempSlider = document.getElementById('temperature');
    const tempDisplay = document.getElementById('temp-display');
    
    if (tempSlider && tempDisplay) {
        tempSlider.addEventListener('input', (e) => {
            tempDisplay.textContent = e.target.value + '°C';
        });
    }
});

// Initialize canvas with membrane
function initializeCanvas() {
    const canvas = document.getElementById('osmosis-canvas');
    if (!canvas) {
        console.error('Canvas not found in initializeCanvas');
        return;
    }
    
    console.log('Initializing canvas...');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 800;
    canvas.height = 400;
    
    console.log('Canvas initialized with size:', canvas.width, 'x', canvas.height);
    
    // Draw initial state
    drawInitialCanvas(ctx, canvas);
}

function drawInitialCanvas(ctx, canvas) {
    console.log('Drawing initial canvas...');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background - solid light color
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle regions to show sides
    ctx.fillStyle = 'rgba(227, 242, 253, 0.3)'; // Light blue tint for left
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = 'rgba(255, 235, 238, 0.3)'; // Light red tint for right
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    
    // Draw membrane with thickness
    const membraneX = canvas.width / 2;
    const membraneThickness = 6;
    ctx.fillStyle = '#37474f';
    ctx.fillRect(membraneX - membraneThickness/2, 0, membraneThickness, canvas.height);
    
    // Draw membrane pores
    ctx.fillStyle = '#607d8b';
    for (let y = 20; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.arc(membraneX, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Left Side', canvas.width / 4, 30);
    ctx.fillText('Right Side', canvas.width * 3 / 4, 30);
    
    // Draw instruction
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Click "Start Simulation" to begin', canvas.width / 2, canvas.height / 2);
    
    console.log('Initial canvas drawn');
}

// 코돈 테이블
const codonTable = {
    "UUU": "Phenylalanine", "UUC": "Phenylalanine",
    "UUA": "Leucine", "UUG": "Leucine", "CUU": "Leucine", "CUC": "Leucine", "CUA": "Leucine", "CUG": "Leucine",
    "AUU": "Isoleucine", "AUC": "Isoleucine", "AUA": "Isoleucine",
    "AUG": "Methionine",
    "GUU": "Valine", "GUC": "Valine", "GUA": "Valine", "GUG": "Valine",
    "UCU": "Serine", "UCC": "Serine", "UCA": "Serine", "UCG": "Serine", "AGU": "Serine", "AGC": "Serine",
    "CCU": "Proline", "CCC": "Proline", "CCA": "Proline", "CCG": "Proline",
    "ACU": "Threonine", "ACC": "Threonine", "ACA": "Threonine", "ACG": "Threonine",
    "GCU": "Alanine", "GCC": "Alanine", "GCA": "Alanine", "GCG": "Alanine",
    "UAU": "Tyrosine", "UAC": "Tyrosine",
    "CAU": "Histidine", "CAC": "Histidine",
    "CAA": "Glutamine", "CAG": "Glutamine",
    "AAU": "Asparagine", "AAC": "Asparagine",
    "AAA": "Lysine", "AAG": "Lysine",
    "GAU": "Aspartic-Acid", "GAC": "Aspartic-Acid",
    "GAA": "Glutamic-Acid", "GAG": "Glutamic-Acid",
    "UGU": "Cysteine", "UGC": "Cysteine",
    "UGG": "Tryptophan",
    "CGU": "Arginine", "CGC": "Arginine", "CGA": "Arginine", "CGG": "Arginine", "AGA": "Arginine", "AGG": "Arginine",
    "GGU": "Glycine", "GGC": "Glycine", "GGA": "Glycine", "GGG": "Glycine",
    "UAA": "Stop", "UAG": "Stop", "UGA": "Stop"
};


// 탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // 현재 카테고리 내에서만 탭 전환
        const parentNav = btn.closest('.tab-navigation');
        if (parentNav) {
            parentNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        
        // 모든 탭 콘텐츠 숨기기
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // 선택된 탭 활성화
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    });
});

// 전사/번역 strand 타입 변경 시 placeholder 업데이트
document.querySelectorAll('input[name="strand"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const input = document.getElementById('dna-input');
        
        switch(e.target.value) {
            case 'coding':
                input.placeholder = 'Enter coding DNA sequence (e.g., ATGGAATAG)';
                break;
            case 'template':
                input.placeholder = 'Enter template DNA sequence (e.g., CTATTCCAT)';
                break;
            case 'mrna':
                input.placeholder = 'Enter mRNA sequence (e.g., AUGGAAUAG)';
                break;
        }
    });
});

// 돌연변이 타입 선택 시 추가 입력 필드 표시
document.getElementById('mutation-type').addEventListener('change', (e) => {
    const params = document.getElementById('mutation-params');
    const valueInput = document.getElementById('mutation-value');
    
    if (e.target.value) {
        params.classList.remove('hidden');
        if (e.target.value === 'deletion') {
            valueInput.style.display = 'none';
        } else {
            valueInput.style.display = 'block';
        }
    } else {
        params.classList.add('hidden');
    }
});

// 돌연변이 strand 타입 변경 시 placeholder 업데이트
document.querySelectorAll('input[name="mutation-strand"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const input = document.getElementById('mutation-dna-input');
        const valueInput = document.getElementById('mutation-value');
        
        switch(e.target.value) {
            case 'coding':
                input.placeholder = 'Enter coding DNA sequence (e.g., ATGGAATAG)';
                valueInput.placeholder = 'New base (A/T/C/G)';
                break;
            case 'template':
                input.placeholder = 'Enter template DNA sequence (e.g., CTATTCCAT)';
                valueInput.placeholder = 'New base (A/T/C/G)';
                break;
            case 'mrna':
                input.placeholder = 'Enter mRNA sequence (e.g., AUGGAAUAG)';
                valueInput.placeholder = 'New base (A/U/C/G)';
                break;
        }
    });
});

// 비교 strand 타입 변경 시 placeholder 업데이트
document.querySelectorAll('input[name="comparison-strand"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const input = document.getElementById('comparison-dna-input');
        
        switch(e.target.value) {
            case 'coding':
                input.placeholder = 'Enter coding DNA sequence (e.g., ATGGAATAG)';
                break;
            case 'template':
                input.placeholder = 'Enter template DNA sequence (e.g., CTATTCCAT)';
                break;
            case 'mrna':
                input.placeholder = 'Enter mRNA sequence (e.g., AUGGAAUAG)';
                break;
        }
    });
});

// DNA를 트리플렛으로 나누기
function triplets(dna) {
    let result = '';
    for (let i = 0; i < dna.length; i += 3) {
        result += dna.substring(i, i + 3) + ' ';
    }
    return result.trim();
}

// Template strand를 Coding strand로 변환
function templateToCoding(template) {
    const complement = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'};
    let coding = '';
    for (let i = template.length - 1; i >= 0; i--) {
        coding += complement[template[i].toUpperCase()] || template[i];
    }
    return coding;
}

// 전사 (DNA → RNA)
function transcription(dna) {
    return dna.replace(/T/g, 'U');
}

// 번역 (RNA → 단백질)
function translation(mrna, organism = 'eukaryotic') {
    let startCodons = organism === 'prokaryotic' ? ['AUG', 'GUG', 'UUG'] : ['AUG'];
    let polypeptide = '';
    let start = false;
    let startCodonUsed = null;
    let endCodonUsed = null;
    
    const cleanMrna = mrna.replace(/\s/g, '');
    
    for (let i = 0; i < cleanMrna.length; i += 3) {
        const codon = cleanMrna.substring(i, i + 3);
        if (startCodons.includes(codon) && !start) {
            start = true;
            startCodonUsed = codon;
        }
        if (start && codon.length === 3) {
            const amino = codonTable[codon];
            if (amino === 'Stop') {
                endCodonUsed = codon;
                break;
            }
            if (amino) {
                polypeptide += amino + ' ';
            }
        }
    }
    
    const protein = polypeptide.trim() || 'No protein translated';
    const startInfo = startCodonUsed ? `Start: ${startCodonUsed}` : 'No start codon found';
    const endInfo = endCodonUsed ? `End: ${endCodonUsed}` : 'No end codon found';
    
    return {
        protein: protein,
        startCodon: startInfo,
        endCodon: endInfo
    };
}

// 돌연변이 적용
function mutate(dna, type, position, value) {
    const dnaArray = dna.split('');
    
    switch(type) {
        case 'point':
            if (position < dnaArray.length && value) {
                dnaArray[position] = value.toUpperCase();
            }
            break;
        case 'insertion':
            if (position <= dnaArray.length && value) {
                dnaArray.splice(position, 0, value.toUpperCase());
            }
            break;
        case 'deletion':
            if (position < dnaArray.length) {
                dnaArray.splice(position, 1);
            }
            break;
    }
    
    return dnaArray.join('');
}

// 전사/번역 처리
function processTranscription() {
    const inputSeq = document.getElementById('dna-input').value.trim().toUpperCase();
    const strandType = document.querySelector('input[name="strand"]:checked').value;
    
    let codingDna, mrna;
    
    if (strandType === 'mrna') {
        if (!inputSeq || !/^[AUCG]+$/.test(inputSeq)) {
            alert('Please enter a valid mRNA sequence (use only A, U, C, G)');
            return;
        }
        mrna = triplets(inputSeq);
        codingDna = inputSeq.replace(/U/g, 'T');
    } else {
        if (!inputSeq || !/^[ATCG]+$/.test(inputSeq)) {
            alert('Please enter a valid DNA sequence (use only A, T, C, G)');
            return;
        }
        if (strandType === 'template') {
            codingDna = templateToCoding(inputSeq);
        } else {
            codingDna = inputSeq;
        }
        mrna = transcription(triplets(codingDna));
    }
    
    const dnaTriplets = triplets(codingDna);
    const cellType = document.querySelector('input[name="cell-type"]:checked').value;
    const translationResult = translation(mrna, cellType);
    
    // Display results
    document.getElementById('result-dna').textContent = dnaTriplets;
    document.getElementById('result-mrna').textContent = mrna;
    document.getElementById('result-protein').textContent = translationResult.protein;
    document.getElementById('result-start-codon').textContent = translationResult.startCodon;
    document.getElementById('result-end-codon').textContent = translationResult.endCodon;
    document.getElementById('transcription-results').classList.remove('hidden');
    
    // Scroll
    document.getElementById('transcription-results').scrollIntoView({ behavior: 'smooth' });
}

// 돌연변이 처리
function processMutation() {
    const inputSeq = document.getElementById('mutation-dna-input').value.trim().toUpperCase();
    const strandType = document.querySelector('input[name="mutation-strand"]:checked').value;
    const type = document.getElementById('mutation-type').value;
    const position = parseInt(document.getElementById('mutation-position').value);
    const value = document.getElementById('mutation-value').value;
    
    // Validate input based on strand type
    let codingDna;
    if (strandType === 'mrna') {
        if (!inputSeq || !/^[AUCG]+$/.test(inputSeq)) {
            alert('Please enter a valid mRNA sequence (use only A, U, C, G)');
            return;
        }
        // Convert mRNA back to coding DNA for mutation
        codingDna = inputSeq.replace(/U/g, 'T');
    } else {
        if (!inputSeq || !/^[ATCG]+$/.test(inputSeq)) {
            alert('Please enter a valid DNA sequence (use only A, T, C, G)');
            return;
        }
        if (strandType === 'template') {
            codingDna = templateToCoding(inputSeq);
        } else {
            codingDna = inputSeq;
        }
    }
    
    if (!type) {
        alert('Please select a mutation type');
        return;
    }
    
    if (isNaN(position) || position < 0) {
        alert('Please enter a valid position');
        return;
    }
    
    const mutatedDna = mutate(codingDna, type, position, value);
    
    // Calculate original and mutated results
    const originalMrna = transcription(triplets(codingDna));
    const originalTranslation = translation(originalMrna);
    const mutatedMrna = transcription(triplets(mutatedDna));
    const mutatedTranslation = translation(mutatedMrna);
    
    // Display results
    document.getElementById('original-dna').textContent = triplets(codingDna);
    document.getElementById('original-protein').textContent = originalTranslation.protein;
    document.getElementById('mutated-dna').textContent = triplets(mutatedDna);
    document.getElementById('mutated-protein').textContent = mutatedTranslation.protein;
    document.getElementById('mutation-results').classList.remove('hidden');
    
    // Scroll
    document.getElementById('mutation-results').scrollIntoView({ behavior: 'smooth' });
}

// 세포 비교 처리
function processComparison() {
    const inputSeq = document.getElementById('comparison-dna-input').value.trim().toUpperCase();
    const strandType = document.querySelector('input[name="comparison-strand"]:checked').value;
    
    // Validate input based on strand type
    let codingDna;
    if (strandType === 'mrna') {
        if (!inputSeq || !/^[AUCG]+$/.test(inputSeq)) {
            alert('Please enter a valid mRNA sequence (use only A, U, C, G)');
            return;
        }
        // Convert mRNA back to coding DNA
        codingDna = inputSeq.replace(/U/g, 'T');
    } else {
        if (!inputSeq || !/^[ATCG]+$/.test(inputSeq)) {
            alert('Please enter a valid DNA sequence (use only A, T, C, G)');
            return;
        }
        if (strandType === 'template') {
            codingDna = templateToCoding(inputSeq);
        } else {
            codingDna = inputSeq;
        }
    }
    
    const mrna = transcription(triplets(codingDna));
    const eukaryoticTranslation = translation(mrna, 'eukaryotic');
    const prokaryoticTranslation = translation(mrna, 'prokaryotic');
    
    // Display results
    document.getElementById('eukaryotic-protein').textContent = eukaryoticTranslation.protein;
    document.getElementById('prokaryotic-protein').textContent = prokaryoticTranslation.protein;
    document.getElementById('comparison-results').classList.remove('hidden');
    
    // Scroll
    document.getElementById('comparison-results').scrollIntoView({ behavior: 'smooth' });
}

// Enter 키로 분석 실행
document.getElementById('dna-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        processTranscription();
    }
});

document.getElementById('mutation-dna-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        processMutation();
    }
});

document.getElementById('comparison-dna-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        processComparison();
    }
});

// ============= OSMOSIS AND DIFFUSION SIMULATOR =============

// Global variables for simulation
window.osmosisSimulation = {
    running: false,
    time: 0,
    particles: [],
    animationId: null
};


// Simple Particle class
class Particle {
    constructor(x, y, type = 'solute') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.vx = (Math.random() - 0.5) * 4; // Increased initial velocity
        this.vy = (Math.random() - 0.5) * 4;
        this.radius = type === 'water' ? 4 : 8;
        this.color = type === 'water' ? '#3498db' : '#e74c3c';
    }
    
    update(canvas) {
        // Simple random motion - increased for visibility
        this.vx += (Math.random() - 0.5) * 1.0;
        this.vy += (Math.random() - 0.5) * 1.0;
        
        // Apply damping
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        // Limit max velocity
        const maxVel = 5;
        this.vx = Math.max(-maxVel, Math.min(maxVel, this.vx));
        this.vy = Math.max(-maxVel, Math.min(maxVel, this.vy));
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx *= -1;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy *= -1;
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }
        
        // Membrane interaction with permeability
        const membraneX = canvas.width / 2;
        const membraneThickness = 6;
        const permeability = parseFloat(document.getElementById('permeability').value) / 100;
        
        if (Math.abs(this.x - membraneX) < this.radius + membraneThickness/2) {
            // Water passes more easily than solute
            const crossChance = this.type === 'water' ? permeability * 0.8 : permeability * 0.3;
            
            if (Math.random() < crossChance) {
                // Cross membrane
                if (this.x < membraneX) {
                    this.x = membraneX + this.radius + membraneThickness/2 + 1;
                } else {
                    this.x = membraneX - this.radius - membraneThickness/2 - 1;
                }
            } else {
                // Bounce off
                this.vx *= -1;
                if (this.x < membraneX) {
                    this.x = membraneX - this.radius - membraneThickness/2 - 1;
                } else {
                    this.x = membraneX + this.radius + membraneThickness/2 + 1;
                }
            }
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.type === 'water') {
            // Water particles - smaller blue circles
            ctx.fillStyle = '#3498db';
            ctx.fill();
            ctx.strokeStyle = '#2980b9';
            ctx.lineWidth = 1;
            ctx.stroke();
        } else {
            // Solute particles - larger red circles with clear fill
            ctx.fillStyle = '#e74c3c';
            ctx.fill();
            ctx.strokeStyle = '#c0392b';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Add a small highlight to make it more visible
            ctx.beginPath();
            ctx.arc(this.x - this.radius/3, this.y - this.radius/3, this.radius/4, 0, Math.PI * 2);
            ctx.fillStyle = '#ff6b6b';
            ctx.fill();
        }
    }
}





function startSimulation() {
    console.log('Starting simulation...');
    
    const canvas = document.getElementById('osmosis-canvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }
    
    // Get the actual rendered dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 400; // Fixed height
    
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
    
    // Stop any existing simulation
    if (window.osmosisSimulation.animationId) {
        cancelAnimationFrame(window.osmosisSimulation.animationId);
        window.osmosisSimulation.animationId = null;
    }
    
    // Reset and start
    window.osmosisSimulation.running = true;
    window.osmosisSimulation.time = 0;
    window.osmosisSimulation.particles = [];
    
    // Create simple particles
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * (canvas.width / 2 - 20) + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        window.osmosisSimulation.particles.push(new Particle(x, y, 'solute'));
    }
    
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * (canvas.width / 2 - 20) + canvas.width / 2 + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        window.osmosisSimulation.particles.push(new Particle(x, y, 'solute'));
    }
    
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        window.osmosisSimulation.particles.push(new Particle(x, y, 'water'));
    }
    
    console.log('Created', window.osmosisSimulation.particles.length, 'particles');
    console.log('Starting animation loop...');
    
    // Start animation immediately
    animateSimulation();
}

function animateSimulation() {
    if (!window.osmosisSimulation.running) {
        console.log('Animation stopped - not running');
        return;
    }
    
    const canvas = document.getElementById('osmosis-canvas');
    if (!canvas) {
        console.error('Canvas lost during animation!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background regions
    ctx.fillStyle = 'rgba(227, 242, 253, 0.3)'; // Light blue for left
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = 'rgba(255, 235, 238, 0.3)'; // Light red for right
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    
    // Draw membrane
    const membraneX = canvas.width / 2;
    ctx.fillStyle = '#37474f';
    ctx.fillRect(membraneX - 3, 0, 6, canvas.height);
    
    // Draw membrane pores
    ctx.fillStyle = '#607d8b';
    for (let y = 20; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.arc(membraneX, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Update and draw particles with temperature effect
    const temp = parseFloat(document.getElementById('temperature').value);
    const speedMultiplier = 0.5 + (temp / 50); // Speed increases with temperature
    
    window.osmosisSimulation.particles.forEach(particle => {
        // Apply temperature to velocity before update
        const originalVx = particle.vx;
        const originalVy = particle.vy;
        particle.vx *= speedMultiplier;
        particle.vy *= speedMultiplier;
        
        particle.update(canvas);
        particle.draw(ctx);
        
        // Restore original velocity for next frame
        particle.vx = originalVx;
        particle.vy = originalVy;
    });
    
    // Count particles on each side
    let leftCount = 0;
    let rightCount = 0;
    window.osmosisSimulation.particles.forEach(particle => {
        if (particle.type === 'solute') {
            if (particle.x < canvas.width / 2) {
                leftCount++;
            } else {
                rightCount++;
            }
        }
    });
    
    // Update stats
    window.osmosisSimulation.time += 0.016;
    document.getElementById('sim-time').textContent = window.osmosisSimulation.time.toFixed(1) + 's';
    
    // Update net movement indicator
    const netMovement = document.getElementById('net-movement');
    if (leftCount > rightCount + 5) {
        netMovement.textContent = '←';
    } else if (rightCount > leftCount + 5) {
        netMovement.textContent = '→';
    } else {
        netMovement.textContent = '↔';
    }
    
    // Check equilibrium
    const equilibriumStatus = document.getElementById('equilibrium-status');
    if (Math.abs(leftCount - rightCount) <= 3) {
        equilibriumStatus.textContent = 'Near equilibrium';
    } else {
        equilibriumStatus.textContent = 'Not reached';
    }
    
    // Calculate diffusion rate (simplified)
    const rate = Math.abs(leftCount - rightCount) * 0.5;
    document.getElementById('diffusion-rate').textContent = rate.toFixed(1) + ' molecules/s';
    
    // Continue animation
    window.osmosisSimulation.animationId = requestAnimationFrame(animateSimulation);
}

function resetSimulation() {
    console.log('Resetting simulation...');
    
    window.osmosisSimulation.running = false;
    window.osmosisSimulation.time = 0;
    window.osmosisSimulation.particles = [];
    
    if (window.osmosisSimulation.animationId) {
        cancelAnimationFrame(window.osmosisSimulation.animationId);
        window.osmosisSimulation.animationId = null;
    }
    
    // Reset displays
    document.getElementById('sim-time').textContent = '0s';
    document.getElementById('net-movement').textContent = '→';
    document.getElementById('equilibrium-status').textContent = 'Not reached';
    document.getElementById('diffusion-rate').textContent = '0 molecules/s';
    
    // Redraw initial canvas
    const canvas = document.getElementById('osmosis-canvas');
    const ctx = canvas.getContext('2d');
    drawInitialCanvas(ctx, canvas);
}