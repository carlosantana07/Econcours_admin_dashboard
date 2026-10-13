<div class="modal fade" id="ajouter_examen" tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">
                    Ajouter un examen
                </h5>

                <button type="button"
                    class="close"
                    data-dismiss="modal">

                    <span>&times;</span>

                </button>
            </div>


            <form id="formExamen">

                <div class="modal-body">

                    <div class="row">

                        <!-- INTITULE -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Intitulé de l'examen</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="intitule"
                                    required
                                >

                            </div>

                        </div>


                        <!-- TYPE EXAMEN -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Type d'examen</label>

                                <select
                                    class="form-control"
                                    id="type_examen"
                                    required
                                >

                                    <option value="">
                                        Sélectionner
                                    </option>

                                    <option value="ECRIT">
                                        Écrit
                                    </option>

                                    <option value="ORAL">
                                        Oral
                                    </option>

                                    <option value="PRATIQUE">
                                        Pratique
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- COEFFICIENT -->
                        <!-- <div class="col-md-6">

                            <div class="form-group">

                                <label>Coefficient</label>

                                <input
                                    type="number"
                                    class="form-control"
                                    id="coefficient"
                                    required
                                >

                            </div>

                        </div> -->


                        <!-- DATE -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Date de l'examen</label>

                                <input
                                    type="date"
                                    class="form-control"
                                    id="date_examen"
                                    required
                                >

                            </div>

                        </div>


                        <!-- HEURE -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Heure</label>

                                <input
                                    type="time"
                                    class="form-control"
                                    id="heure"
                                    required
                                >

                            </div>

                        </div>


                        <!-- LIEU -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Lieu</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="lieu"
                                    required
                                >

                            </div>

                        </div>


                        <!-- CONCOURS -->
                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Concours</label>

                                <select
                                    class="form-control"
                                    id="id_concours"
                                    required
                                >

                                    <option value="">
                                        Sélectionner un concours
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal">

                        Annuler

                    </button>


                    <button
                        type="submit"
                        class="btn btn-primary">

                        <i class="fa fa-save"></i>

                        Enregistrer

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

<div class="modal fade" id="modifier_examen" tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Modifier l'examen
                </h5>

                <button type="button"
                    class="close"
                    data-dismiss="modal">

                    <span>&times;</span>

                </button>

            </div>

            <form id="formUpdateExamen">

                <div class="modal-body">

                    <input type="hidden" id="id_examen_modif">

                    <div class="row">

                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Intitulé de l'examen</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="intitule_modif"
                                    required>

                            </div>

                        </div>

                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Type d'examen</label>

                                <select
                                    class="form-control"
                                    id="type_examen_modif"
                                    required>

                                    <option value="ECRIT">Écrit</option>
                                    <option value="ORAL">Oral</option>
                                    <option value="PRATIQUE">Pratique</option>

                                </select>

                            </div>

                        </div>

                        <!-- <div class="col-md-6">

                            <div class="form-group">

                                <label>Coefficient</label>

                                <input
                                    type="number"
                                    class="form-control"
                                    id="coefficient_modif"
                                    required>

                            </div>

                        </div> -->

                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Date de l'examen</label>

                                <input
                                    type="date"
                                    class="form-control"
                                    id="date_examen_modif"
                                    required>

                            </div>

                        </div>

                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Heure</label>

                                <input
                                    type="time"
                                    class="form-control"
                                    id="heure_modif"
                                    required>

                            </div>

                        </div>

                        <div class="col-md-6">

                            <div class="form-group">

                                <label>Lieu</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    id="lieu_modif"
                                    required>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal">

                        Annuler

                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary">

                        <i class="fa fa-save"></i>
                        Enregistrer

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

<div class="modal fade" id="modalQuestionsReponses" tabindex="-1" aria-labelledby="modalQuestionsReponsesLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white" style="color: white;">
                <div>
                    <h5 class="modal-title" id="modalQuestionsReponsesLabel", style="color: white;">
                        <i class="fa-solid fa-list-check me-2"></i>
                        Questions et réponses
                    </h5>
                    <small id="titreExamenQuestionsReponses"></small>
                </div>
                 <button type="button"
                    class="close"
                    data-dismiss="modal">

                    <span>&times;</span>

                </button>
            </div>

            <div class="modal-body">
                <div id="resumeQuestionsReponses" class="row g-3 mb-4"></div>

                <div id="chargementQuestionsReponses" class="text-center py-5 d-none">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Chargement...</span>
                    </div>
                    <p class="mt-2 mb-0">Chargement des questions et réponses...</p>
                </div>

                <div id="erreurQuestionsReponses" class="alert alert-danger d-none"></div>

                <div class="table-responsive">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 70px;">N°</th>
                                <th>Question</th>
                                <th>Réponse</th>
                            </tr>
                        </thead>
                        <tbody id="tableQuestionsReponses">
                            <tr>
                                <td colspan="3" class="text-center text-muted">
                                    Aucune donnée chargée.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    <i class="fa-solid fa-xmark me-1"></i>
                    Fermer
                </button>
            </div> -->
        </div>
    </div>
</div>

