<div class="modal fade" id="ajouter_candidat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ajout d'un nouveau candidat</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formCandidat">
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Nom <span class="required">*</span></label>
                                <input type="text" name="nom" class="form-control" placeholder="Votre nom de famille"
                                    required>
                            </div>

                            <div class="col-md-4">
                                <label>Prénom(s) <span class="required">*</span></label>
                                <input type="text" name="prenom" class="form-control" placeholder="Vos prénoms"
                                    required>
                            </div>

                            <div class="col-md-4">
                                <label>Nom de jeune fille</label>
                                <input type="text" name="nom_jeune_fille" class="form-control"
                                    placeholder="Votre nom de jeune fille">
                            </div>

                        </div>

                    </div>


                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Lieu de naissance <span class="required">*</span></label>
                                <input type="text" name="lieu_naissance" class="form-control"
                                    placeholder="Votre lieu de naissance" required>
                            </div>

                            <div class="col-md-4">
                                <label>Date de naissance <span class="required">*</span></label>
                                <input type="date" name="date_naissance" class="form-control" placeholder="mm/dd/yyyy"
                                    required>
                            </div>

                            <div class="col-md-4">
                                <label>Pays de naissance <span class="required">*</span></label>
                                <input type="text" name="pays_naissance" class="form-control"
                                    placeholder="Votre pays de naissance" required>
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Téléphone <span class="required">*</span></label>
                                <input type="text" name="telephone" class="form-control" placeholder="+226 XX XX XX XX"
                                    required>
                            </div>

                            <div class="col-md-4">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" name="email" class="form-control" placeholder="Votre adresse email"
                                    required>
                            </div>

                            <div class="col-md-4">
                                <label>Sexe <span class="required">*</span></label>
                                <select name="sexe" class="form-control" required>
                                    <option value="">Sélectionnez votre sexe</option>
                                    <option value="HOMME">Masculin</option>
                                    <option value="FEMME">Féminin</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Numéro CNIB <span class="required">*</span></label>
                                <input type="text" name="numero_cnib" class="form-control" required>
                            </div>

                            <div class="col-md-4">
                                <label>Date de délivrance <span class="required">*</span></label>
                                <input type="date" name="date_delivrance" class="form-control"
                                    placeholder="Date de délivrance" required>
                            </div>

                            <div class="col-md-4">
                                <label>Type de candidat <span class="required">*</span></label>
                                <select required name="type_candidat" class="form-control">
                                    <option value="">Sélectionnez le type de candidat</option>
                                    <option value="DIRECT">Direct</option>
                                    <option value="PROFESSIONNEL">Professionnel</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Emploi</label>
                                <input type="text" name="emploi" class="form-control" placeholder="Votre emploi">
                            </div>

                            <div class="col-md-4">
                                <label>Matricule</label>
                                <input type="text" name="matricule" class="form-control" placeholder="Votre matricule">
                            </div>

                            <div class="col-md-4">
                                <label>Ministère</label>
                                <input type="text" name="ministere" class="form-control"
                                    placeholder="Votre ministère d'affectation">
                            </div>

                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Mot de passe <span class="required">*</span></label>
                                <input type="password" name="mot_de_passe" class="form-control" required>
                            </div>


                            <div class="col-md-4">
                                <label>Confirmer mot de passe <span class="required">*</span></label>
                                <input type="password" name="mot_de_passe_confirm" class="form-control" required>
                            </div>



                            <div class="col-md-4">
                                <label>Statut du compte <span class="required">*</span></label>
                                <select name="statusCompte" class="form-control" required>
                                    <option value="">Choisir une option</option>
                                    <option value="ACTIF">ACTIF</option>
                                    <option value="INACTIF">INACTIF</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="row">
                            <!-- <div class="col-md-4">
                                <label>Recevoir le code OTP par <span class="required">*</span></label>
                                <select name="choix" class="form-control" required>
                                    <option value="">Choisir une option</option>
                                    <option value="mail">Email</option>
                                    <option value="sms">SMS</option>
                                </select>
                            </div> -->
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

<div class="modal fade" id="modifier_candidat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modification d'un candidat</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="editCandidatForm">
                <div class="modal-body">
                    <div class="form-group">
                        <input id="id_candidat" type="hidden" class="form-control" name="id_candidat">

                        <div class="row">

                            <div class="col-md-4">
                                <label for="email_modif">Email (*)</label>
                                <input id="email_modif" class="form-control" type="email" name="email"
                                    placeholder="Entrer l'email" required>
                            </div>

                            <div class="col-md-4">
                                <label for="nom_jeune_fille_modif">Nom de jeune fille</label>
                                <input id="nom_jeune_fille_modif" class="form-control" type="text"
                                    name="nom_jeune_fille" placeholder="Entrer le nom de jeune fille">
                            </div>

                            <div class="col-md-4">
                                <label for="mot_de_passe_modif">Mot de passe</label>
                                <input id="mot_de_passe_modif" class="form-control" type="password" name="mot_de_passe"
                                    placeholder="Entrer le mot de passe">
                            </div>


                        </div>

                    </div>


                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label for="emploi_modif">Emploi</label>
                                <input id="emploi_modif" class="form-control" type="text" name="emploi"
                                    placeholder="Entrer l'emploi">
                            </div>

                            <div class="col-md-4">
                                <label for="ministere_modif">Ministère</label>
                                <input id="ministere_modif" class="form-control" type="text" name="ministere"
                                    placeholder="Entrer le ministère">
                            </div>

                            <div class="col-md-4">
                                <label for="matricule_modif">Matricule</label>
                                <input id="matricule_modif" class="form-control" type="text" name="matricule"
                                    placeholder="Entrer le matricule">
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