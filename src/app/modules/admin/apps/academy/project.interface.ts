export interface Project {
    _id: string,
    nom_projet: string,
    client: string,
    description: string,
    short_description: string,
    begin: string,
    end: string,
    user: string,
    code_postal: string,
    contrat: string,
    mean_pourcentage_axes: number,
    axes: [
        {
            _id: string,
            name: string,
            mean_pourcentage_taches: string,
            tache: [
                {
                    name: string,
                    time: string,
                    pourcentage: string,
                }
            ],
        }
    ]

}



