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

def transcription(dnaTriplets):
    mrna = dnaTriplets.replace("T","U")
    return mrna

def translation(mrna):
    polypeptide = ""
    start = False
    for i in range(0,len(mrna.replace(" ","")),3):
        codon = mrna.replace(" ","")[i:i+3]
        if codon == "AUG":
            start = True
        if start:
            if codonTable.get(codon) == "Stop":
                break
            polypeptide += codonTable.get(codon,"?") + " "
    return polypeptide
        
    

while True:
    print("Select which DNA strand to input...")
    choice = int(input("coding strand(0) or template strand(1): "))
    if choice == 0:
        dna = input("Input DNA coding strand sequence: ")
        print("--------------------------------------------------------------------------------")
        dnaTriplets = triplets(dna)
        mrna = transcription(dnaTriplets)
        polypeptide = translation(mrna)
        print(f"DNA: {dnaTriplets}")
        print(f"mRNA: {mrna}")
        print(f"Polypeptide: {polypeptide}")
    elif choice == 1:
        dna = input("Input DNA template strand sequence: ")
        
    else:
        print("only choose among the given choices...")
    
    
#additional functions I would like to make:
#1. coding strand and template strand
#2. mutations
#3. other cell protien synthesis
#4. more start codons
    

