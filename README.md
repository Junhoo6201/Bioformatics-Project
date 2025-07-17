# 🧬 Protein Synthesis Calculator

A modern, mobile-friendly web application that simulates the biological process of protein synthesis from DNA to proteins. This educational tool helps students and researchers understand transcription, translation, and the effects of mutations on protein sequences.

## 🌟 Features

### 1. **Transcription & Translation**
- Convert DNA sequences to mRNA through transcription
- Translate mRNA to protein sequences using the genetic code
- Support for both coding strand (5' → 3') and template strand (3' → 5') input
- Real-time visualization of the entire process

### 2. **Mutation Simulation**
- Apply three types of mutations:
  - **Point mutations** (substitution)
  - **Insertions**
  - **Deletions**
- Support for multiple input types:
  - Coding DNA strand
  - Template DNA strand
  - mRNA sequences
- Compare original and mutated protein sequences side-by-side

### 3. **Cell Type Comparison**
- Compare protein synthesis between eukaryotic and prokaryotic cells
- Different start codon recognition:
  - **Eukaryotic cells**: AUG only
  - **Prokaryotic cells**: AUG, GUG, and UUG

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Flask web framework

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/protein-synthesis-calculator.git
cd "Bioformatics Project"
```

2. Install Flask:
```bash
python3 -m pip install flask
```

3. Run the server:
```bash
python3 server.py
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 💻 Usage

### Basic Transcription/Translation
1. Select the **Transcription/Translation** tab
2. Choose your input type (coding or template strand)
3. Enter a DNA sequence (e.g., `ATGGAATAG`)
4. Click **Analyze** to see the results

### Applying Mutations
1. Select the **Mutations** tab
2. Choose your input type (coding DNA, template DNA, or mRNA)
3. Enter your sequence
4. Select mutation type and position
5. Click **Apply Mutation** to see the comparison

### Cell Type Comparison
1. Select the **Cell Comparison** tab
2. Enter a DNA sequence
3. Click **Compare** to see how different cell types would translate the same sequence

## 📱 Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Design**: Responsive, mobile-first approach
- **UI**: Modern, clean interface with smooth animations

### File Structure
```
Bioformatics Project/
├── index.html              # Main HTML file
├── style.css              # Responsive styles
├── app.js                 # Core JavaScript logic
├── server.py              # Flask server
├── Bioformatics Project(protein synthesis).py  # Original Python implementation
└── README.md              # This file
```

### Key Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatically adapts to system preferences
- **Real-time Validation**: Input validation for DNA/RNA sequences
- **Smooth Animations**: Enhanced user experience with transitions

## 🧪 Biological Accuracy

The calculator implements:
- Standard genetic code table with all 64 codons
- Proper stop codon recognition (UAA, UAG, UGA)
- Accurate complement base pairing for template strand conversion
- Realistic start codon variations for different cell types

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

Potential features for future versions:
- Support for reading frames
- Visualization of protein structure
- Export functionality for results
- Multiple sequence alignment
- Support for non-standard genetic codes
- Integration with biological databases

## 👤 Author

Created as a Bioinformatics educational project to help understand the fundamental processes of molecular biology.

---

**Note**: This is an educational tool designed to help understand protein synthesis. For research purposes, please use specialized bioinformatics software.