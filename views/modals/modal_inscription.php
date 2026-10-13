<div class="modal fade" id="ajouter_inscription" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ajout d'une nouvelle inscription</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formInscriptionConcours">
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <label for="id_candidat">Candidat(*)</label>
                                <select id="id_candidat" class="form-control" name="id_candidat" required>
                                    <option value="">Sélectionner un candidat</option>
                                    <!-- Options will be populated by JavaScript -->
                                </select>
                            </div>

                        </div>
                        
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <label for="id_concours">Concours(*)</label>
                                <select id="id_concours" class="form-control" name="id_concours" required>
                                    <option value="">Sélectionner un concours</option>
                                    <!-- Options will be populated by JavaScript -->
                                </select>
                            </div>

                        </div>
                        
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <label for="id_centre">Centre(*)</label>
                                <select id="id_centre" class="form-control" name="id_centre" required>
                                    <option value="">Sélectionner un centre</option>
                                    <!-- Options will be populated by JavaScript -->
                                </select>
                            </div>

                        </div>
                        
                    </div> 
                                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="detailInscriptionModal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">
                    Détails de l'inscription
                </h5>

                <button
                    type="button"
                    class="close"
                    data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <div id="detailContent"></div>

            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="editInscriptionModal">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">
                <h5>Modifier inscription</h5>
            </div>

            <div class="modal-body">

                <input type="hidden" id="edit_id_inscription">

                <div class="form-group">
                    <label>Statut</label>

                    <select id="edit_statut" class="form-control">

                        <option value="EN_ATTENTE">
                            EN_ATTENTE
                        </option>

                        <option value="VALIDEE">
                            VALIDEE
                        </option>

                        <option value="REJETEE">
                            REJETEE
                        </option>

                    </select>
                </div>

                <div class="form-group">

                    <label>Centre</label>

                    <select id="edit_centre" class="form-control">

                    </select>

                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-primary"
                    id="btnSaveInscription">

                    Enregistrer

                </button>

            </div>

        </div>

    </div>

</div>

<div class="modal fade" id="modifier_categorie" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modification d'une catégorie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formModificationCategorie">
                <div class="modal-body">
                    <div class="form-group">
                        <input id="id_categorie" type="hidden" class="form-control"  name="id_categorie">

                        <div class="row">
                            
                            <div class="col-md-12">
                                <label for="libelle_modif">Libellé (*)</label>
                                <input id="libelle_modif" class="form-control" type="text" name="libelle" placeholder="Entrer le libellé " required>
                        
                            </div>
                
                        </div>
                        
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <label for="description_modif">Description</label>
                                <textarea id="description_modif" class="form-control" name="description" placeholder="Entrer la description " ></textarea>                       
                            </div>

                        </div>
                        
                    </div>    
                                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="submit" class="btn btn-warning">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalRejetCandidature" tabindex="-1" aria-labelledby="modalRejetCandidatureLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="modalRejetCandidatureLabel">
                    <i class="fa-solid fa-ban me-2"></i>
                    Rejeter la candidature
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>

            <div class="modal-body">
                <p class="text-muted">
                    Sélectionnez un ou plusieurs motifs justifiant le rejet.
                </p>

                <input type="hidden" id="idInscriptionRejet">

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Dossier incomplet" id="motifIncomplet">
                    <label class="form-check-label" for="motifIncomplet">Dossier incomplet</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Diplôme non conforme" id="motifDiplome">
                    <label class="form-check-label" for="motifDiplome">Diplôme non conforme</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Diplôme illisible" id="motifIllisible">
                    <label class="form-check-label" for="motifIllisible">Diplôme illisible</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Pièce d'identité non conforme" id="motifIdentite">
                    <label class="form-check-label" for="motifIdentite">Pièce d'identité non conforme</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Informations personnelles incorrectes" id="motifInformations">
                    <label class="form-check-label" for="motifInformations">Informations personnelles incorrectes</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Conditions d'accès non remplies" id="motifConditions">
                    <label class="form-check-label" for="motifConditions">Conditions d'accès au concours non remplies</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input motif-rejet" type="checkbox" value="Document expiré" id="motifExpire">
                    <label class="form-check-label" for="motifExpire">Document expiré</label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="motifAutre">
                    <label class="form-check-label" for="motifAutre">Autre motif</label>
                </div>

                <div id="conteneurAutreMotif" class="mt-3 d-none">
                    <label for="texteAutreMotif" class="form-label">Précisez le motif</label>
                    <textarea class="form-control" id="texteAutreMotif" rows="3" maxlength="1000" placeholder="Expliquez le motif du rejet..."></textarea>
                </div>

                <div id="erreurMotifRejet" class="alert alert-danger mt-3 d-none"></div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Annuler
                </button>
                <button type="button" class="btn btn-danger" id="btnConfirmerRejet">
                    <i class="fa-solid fa-ban me-1"></i>
                    Confirmer le rejet
                </button>
            </div>
        </div>
    </div>
</div>