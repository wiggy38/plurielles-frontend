export interface Member {
    id: number,
    nom: string,
    prenoms: string,
    situationFamiliale: string,
    commentaires: string,
    profession: string,
    city: string,
    address: string,
    category: { id: number, libelle: string },
    email: string,
    phone: string,
    quartier: string,
    formula: number,
    secteur: number,
    existJuridiq: string,
    refIdentite: string,
    selectedDocs: string,
}