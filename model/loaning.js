export default class Loaning {
    constructor(livre, utilisateur, date_emprunt, date_de_retour_prévue, date_de_retour_effective) {
        this.livre = livre
        this.utilisateur = utilisateur
        this.date_emprunt = date_emprunt
        this.date_de_retour_prévue = date_de_retour_prévue
        this.date_de_retour_effective = date_de_retour_effective
    }
}