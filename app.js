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
    "GAU": "Aspartic Acid", "GAC": "Aspartic Acid",
    "GAA": "Glutamic Acid", "GAG": "Glutamic Acid",
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
        
        // 모든 탭 비활성화
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // 선택된 탭 활성화
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
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
    
    const cleanMrna = mrna.replace(/\s/g, '');
    
    for (let i = 0; i < cleanMrna.length; i += 3) {
        const codon = cleanMrna.substring(i, i + 3);
        if (startCodons.includes(codon)) {
            start = true;
        }
        if (start && codon.length === 3) {
            const amino = codonTable[codon];
            if (amino === 'Stop') {
                break;
            }
            if (amino) {
                polypeptide += amino + ' ';
            }
        }
    }
    
    return polypeptide.trim() || 'No protein translated';
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
    const protein = translation(mrna);
    
    // Display results
    document.getElementById('result-dna').textContent = dnaTriplets;
    document.getElementById('result-mrna').textContent = mrna;
    document.getElementById('result-protein').textContent = protein;
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
    const originalProtein = translation(originalMrna);
    const mutatedMrna = transcription(triplets(mutatedDna));
    const mutatedProtein = translation(mutatedMrna);
    
    // Display results
    document.getElementById('original-dna').textContent = triplets(codingDna);
    document.getElementById('original-protein').textContent = originalProtein;
    document.getElementById('mutated-dna').textContent = triplets(mutatedDna);
    document.getElementById('mutated-protein').textContent = mutatedProtein;
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
    const eukaryoticProtein = translation(mrna, 'eukaryotic');
    const prokaryoticProtein = translation(mrna, 'prokaryotic');
    
    // Display results
    document.getElementById('eukaryotic-protein').textContent = eukaryoticProtein;
    document.getElementById('prokaryotic-protein').textContent = prokaryoticProtein;
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