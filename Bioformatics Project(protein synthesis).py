#eukaryotic protein synthesis
polypeptide = ""
mRNA = ""
codonTable = {
    # Phenylalanine
    "UUU": "Phenylalanine", "UUC": "Phenylalanine",
    # Leucine
    "UUA": "Leucine", "UUG": "Leucine", "CUU": "Leucine", "CUC": "Leucine", "CUA": "Leucine", "CUG": "Leucine",
    # Isoleucine
    "AUU": "Isoleucine", "AUC": "Isoleucine", "AUA": "Isoleucine",
    # Methionine (Start)
    "AUG": "Methionine",
    # Valine
    "GUU": "Valine", "GUC": "Valine", "GUA": "Valine", "GUG": "Valine",
    # Serine
    "UCU": "Serine", "UCC": "Serine", "UCA": "Serine", "UCG": "Serine", "AGU": "Serine", "AGC": "Serine",
    # Proline
    "CCU": "Proline", "CCC": "Proline", "CCA": "Proline", "CCG": "Proline",
    # Threonine
    "ACU": "Threonine", "ACC": "Threonine", "ACA": "Threonine", "ACG": "Threonine",
    # Alanine
    "GCU": "Alanine", "GCC": "Alanine", "GCA": "Alanine", "GCG": "Alanine",
    # Tyrosine
    "UAU": "Tyrosine", "UAC": "Tyrosine",
    # Histidine
    "CAU": "Histidine", "CAC": "Histidine",
    # Glutamine
    "CAA": "Glutamine", "CAG": "Glutamine",
    # Asparagine
    "AAU": "Asparagine", "AAC": "Asparagine",
    # Lysine
    "AAA": "Lysine", "AAG": "Lysine",
    # Aspartic Acid
    "GAU": "Aspartic Acid", "GAC": "Aspartic Acid",
    # Glutamic Acid
    "GAA": "Glutamic Acid", "GAG": "Glutamic Acid",
    # Cysteine
    "UGU": "Cysteine", "UGC": "Cysteine",
    # Tryptophan
    "UGG": "Tryptophan",
    # Arginine
    "CGU": "Arginine", "CGC": "Arginine", "CGA": "Arginine", "CGG": "Arginine", "AGA": "Arginine", "AGG": "Arginine",
    # Glycine
    "GGU": "Glycine", "GGC": "Glycine", "GGA": "Glycine", "GGG": "Glycine",
    # Stop codons
    "UAA": "Stop", "UAG": "Stop", "UGA": "Stop"
}


def triplets(dna):
    dnaTriplets = ""
    for i in range(0,len(dna),3):
        dnaTriplets += (dna[i:i+3]+' ')
    return dnaTriplets

def templateToCoding(template):
    complement = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    coding = ""
    for base in template[::-1]:
        coding += complement.get(base.upper(), base)
    return coding

def transcription(dnaTriplets):
    mrna = dnaTriplets.replace("T","U")
    return mrna

def translation(mrna, organism="eukaryotic", start_codons=None):
    polypeptide = ""
    start = False
    
    if start_codons is None:
        if organism == "prokaryotic":
            start_codons = ["AUG", "GUG", "UUG"]
        else:
            start_codons = ["AUG"]
    
    for i in range(0,len(mrna.replace(" ","")),3):
        codon = mrna.replace(" ","")[i:i+3]
        if codon in start_codons:
            start = True
        if start:
            if codonTable.get(codon) == "Stop":
                break
            polypeptide += codonTable.get(codon,"?") + " "
    return polypeptide

def mutate(dna, mutation_type, position, value=None):
    dna_list = list(dna)
    
    if mutation_type == "point":
        if position < len(dna_list) and value:
            dna_list[position] = value
    
    elif mutation_type == "insertion":
        if position <= len(dna_list) and value:
            dna_list.insert(position, value)
    
    elif mutation_type == "deletion":
        if position < len(dna_list):
            del dna_list[position]
    
    return ''.join(dna_list)
        
    

while True:
    print("\n=== Protein Synthesis Calculator ===")
    print("1. Transcribe and translate coding strand")
    print("2. Transcribe and translate template strand")
    print("3. Apply mutations to DNA sequence")
    print("4. Compare eukaryotic vs prokaryotic translation")
    print("5. Exit")
    
    choice = int(input("\nSelect option (1-5): "))
    if choice == 1:
        dna = input("Input DNA coding strand sequence: ")
        print("--------------------------------------------------------------------------------")
        dnaTriplets = triplets(dna)
        mrna = transcription(dnaTriplets)
        polypeptide = translation(mrna)
        print(f"DNA: {dnaTriplets}")
        print(f"mRNA: {mrna}")
        print(f"Polypeptide: {polypeptide}")
    elif choice == 2:
        template = input("Input DNA template strand sequence: ")
        print("--------------------------------------------------------------------------------")
        dna = templateToCoding(template)
        dnaTriplets = triplets(dna)
        mrna = transcription(dnaTriplets)
        polypeptide = translation(mrna)
        print(f"Template DNA: {template}")
        print(f"Coding DNA: {dnaTriplets}")
        print(f"mRNA: {mrna}")
        print(f"Polypeptide: {polypeptide}")
    
    elif choice == 3:
        dna = input("Input DNA sequence: ")
        print("\nMutation types:")
        print("1. Point mutation (substitution)")
        print("2. Insertion")
        print("3. Deletion")
        mut_type = int(input("Select mutation type (1-3): "))
        position = int(input("Enter position (0-based index): "))
        
        if mut_type == 1:
            new_base = input("Enter new base (A/T/C/G): ")
            mutated = mutate(dna, "point", position, new_base)
        elif mut_type == 2:
            new_base = input("Enter base to insert (A/T/C/G): ")
            mutated = mutate(dna, "insertion", position, new_base)
        elif mut_type == 3:
            mutated = mutate(dna, "deletion", position)
        
        print("\n--- Mutation Results ---")
        print(f"Original DNA: {dna}")
        print(f"Mutated DNA: {mutated}")
        
        mrna_orig = transcription(triplets(dna))
        mrna_mut = transcription(triplets(mutated))
        poly_orig = translation(mrna_orig)
        poly_mut = translation(mrna_mut)
        
        print(f"\nOriginal protein: {poly_orig}")
        print(f"Mutated protein: {poly_mut}")
    
    elif choice == 4:
        dna = input("Input DNA coding strand sequence: ")
        print("\n--- Comparison: Eukaryotic vs Prokaryotic ---")
        dnaTriplets = triplets(dna)
        mrna = transcription(dnaTriplets)
        
        poly_euk = translation(mrna, "eukaryotic")
        poly_prok = translation(mrna, "prokaryotic")
        
        print(f"DNA: {dnaTriplets}")
        print(f"mRNA: {mrna}")
        print(f"\nEukaryotic translation (AUG only): {poly_euk}")
        print(f"Prokaryotic translation (AUG/GUG/UUG): {poly_prok}")
    
    elif choice == 5:
        print("Exiting...")
        break
    
    else:
        print("Please select a valid option (1-5)")
    
    
#additional functions I would like to make:
#1. coding strand and template strand
#2. mutations
#3. other cell protien synthesis
#4. more start codons


