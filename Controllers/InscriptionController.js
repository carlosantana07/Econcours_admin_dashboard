import InscriptionModel from "../models/InscriptionModel.js";
import CandidatModel from "../models/CandidatModel.js";
import CentreModel from "../models/CentreModel.js";
import ConcoursModel from "../models/ConcoursModel.js";
import AdminController from "./AdminController.js";

export default class InscriptionController {

    // ===== RECHARGEMENT DU DATATABLE =====
    static reloadTable() {
        if ($.fn.DataTable.isDataTable("#inscriptionTable")) {
            // false = on reste sur la page courante
            $("#inscriptionTable").DataTable().ajax.reload(null, false);
        }
    }

    // ===== AJOUT D'UNE INSCRIPTION =====
    static initInscriptionConcours() {

        const form = document.getElementById("formInscriptionConcours");

        if (!form) return;

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const token = AdminController.getToken();

            const id_candidat = document.getElementById("id_candidat").value;
            const id_concours = document.getElementById("id_concours").value;
            const id_centre = document.getElementById("id_centre").value;

            if (!id_candidat || !id_concours || !id_centre) {

                Swal.fire(
                    "Erreur",
                    "Tous les champs sont obligatoires",
                    "error"
                );

                return;
            }

            const data = {
                id_candidat: id_candidat,
                id_concours: Number(id_concours),
                id_centre: Number(id_centre)
            };

            const res = await InscriptionModel.inscrireConcours(token, data);

            if (!res.ok) {

                Swal.fire(
                    "Erreur",
                    res.data.error || "Erreur lors de l'inscription",
                    "error"
                );

                return;
            }

            Swal.fire(
                "Succès",
                res.data.message,
                "success"
            );

            form.reset();

            $("#ajouter_inscription").modal("hide");

            // Recharge la table après l'ajout
            InscriptionController.reloadTable();
        });
    }

    // ===== CHARGEMENT DES SELECTS =====
    static async loadConcours() {

        const token = AdminController.getToken();

        const res = await ConcoursModel.getConcoursForSelect(token);

        const select = $("#id_concours");

        select.empty();

        select.append(
            `<option value="">Sélectionnez un concours</option>`
        );

        res.data.data.forEach(concours => {

            select.append(`
            <option value="${concours.id_concours}">
                ${concours.nom}
            </option>
        `);
        });

        select.select2({
            dropdownParent: $("#ajouter_inscription"),
            width: "100%",
            placeholder: "Sélectionnez un concours"
        });
    }

    static async loadCandidats() {

        const token = AdminController.getToken();

        const res = await CandidatModel.getCandidatsForSelect(token);

        const select = $("#id_candidat");

        select.empty();

        select.append(`<option value="">Sélectionnez un candidat</option>`);

        res.data.data.forEach(c => {

            select.append(`
            <option value="${c.id_candidat}">
                ${c.nom} ${c.prenom}
            </option>
        `);
        });

        select.select2({
            dropdownParent: $("#ajouter_inscription"),
            width: "100%",
            placeholder: "Sélectionnez un candidat"
        });
    }

    static async loadCentres() {

        const token = AdminController.getToken();

        const res = await CentreModel.getCentresForSelect(token);

        const select = $("#id_centre");

        select.empty();

        select.append(
            `<option value="">Sélectionnez un centre</option>`
        );

        res.data.data.forEach(centre => {

            select.append(`
            <option value="${centre.id_centre}">
                ${centre.nom}
            </option>
        `);
        });

        select.select2({
            dropdownParent: $("#ajouter_inscription"),
            width: "100%",
            placeholder: "Sélectionnez un centre"
        });
    }

    // ===== APPEL API POUR LE DATATABLE =====
    static async getAll(params) {

        const token = AdminController.getToken();

        if (!token) {

            window.location.href = "../login.php";

            return {
                draw: params?.draw ?? 0,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            };
        }

        const res =
            await InscriptionModel.getAllInscriptions(
                token,
                params
            );

        if (!res.ok) {

            Swal.fire(
                "Erreur",
                "Impossible de charger les inscriptions",
                "error"
            );

            return {
                draw: params?.draw ?? 0,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            };
        }

        return res.data;
    }

    // ===== DATATABLE =====
    static initDataTable() {

        if ($.fn.DataTable.isDataTable("#inscriptionTable")) {
            return;
        }

        $("#inscriptionTable").DataTable({
            processing: true,
            serverSide: true,
            responsive: true,

            pageLength: 10,

            lengthMenu: [
                [10, 25, 50, 100],
                [10, 25, 50, 100]
            ],

            searching: true,
            ordering: true,
            info: true,
            searchDelay: 500,

            ajax: async function (data, callback) {

                try {

                    const params = {
                        draw: data.draw,
                        start: data.start,
                        length: data.length,
                        search: data.search?.value || "",
                        orderColumn: data.order?.[0]?.column ?? 0,
                        orderDir: data.order?.[0]?.dir ?? "asc"
                    };

                    const result =
                        await InscriptionController.getAll(params);

                    const inscriptions =
                        Array.isArray(result?.data)
                            ? result.data
                            : Object.values(result?.data || {});

                    const rows = inscriptions.map(
                        (item, index) => {

                            const candidat =
                                item.candidat || {};

                            const listeInscriptions =
                                item.inscriptions || [];

                            const preview =
                                listeInscriptions
                                    .slice(0, 2)
                                    .map(i => `
                    <div>
                        <b>${i.concours?.nom || "-"}</b>
                    </div>
                `)
                                    .join("");

                            const autres =
                                listeInscriptions.length > 2
                                    ? `
                    <span class="badge badge-info">
                        +${listeInscriptions.length - 2} autres
                    </span>
                `
                                    : "";

                            const idsInscriptions =
                                listeInscriptions
                                    .map(i => i.id_inscription)
                                    .filter(Boolean)
                                    .join(",");

                            return [
                                params.start + index + 1,

                                `${candidat.nom || ""} ${candidat.prenom || ""}`,

                                `${preview}${autres}`,

                                `<button
                type="button"
                class="btn btn-info btn-sm btn-detail-candidat"
                data-ids="${idsInscriptions}"
                title="Voir détail">
                <i class="fa fa-eye"></i>
            </button>`
                            ];
                        }
                    );

                    callback({
                        draw: data.draw,
                        recordsTotal: result?.recordsTotal ?? 0,
                        recordsFiltered: result?.recordsFiltered ?? 0,
                        data: rows
                    });

                } catch (error) {

                    console.error("Erreur chargement inscriptions :", error);

                    callback({
                        draw: data.draw,
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: []
                    });
                }
            },

            columns: [
                {
                    title: "#",
                    className: "text-center",
                    orderable: false,
                    searchable: false
                },
                {
                    title: "Candidat",
                    className: "text-center"
                },
                {
                    title: "Concours",
                    className: "text-center"
                },
                {
                    title: "Détails",
                    className: "text-center",
                    orderable: false,
                    searchable: false
                }
            ],

            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.7/i18n/fr-FR.json"
            },

            layout: {
                topStart: [
                    "pageLength",
                    {
                        buttons: [
                            {
                                text: '<i class="fa fa-file-excel"></i> Excel',
                                className: "btn-export-excel",
                                action: async function () {
                                    await InscriptionController.exportExcel();
                                }
                            },
                            {
                                text: '<i class="fa fa-file-word"></i> Word',
                                className: "btn-export-word",
                                action: async function () {
                                    await InscriptionController.exportWord();
                                }
                            },
                            {
                                text: '<i class="fa fa-file-pdf"></i> PDF',
                                className: "btn-export-pdf",
                                action: async function () {
                                    await InscriptionController.exportPDF();
                                }
                            }
                        ]
                    }
                ],
                topEnd: "search",
                bottomStart: "info",
                bottomEnd: "paging"
            }
        });
    }

    // ===== ÉVÉNEMENTS =====
    static initEvents() {

        // Détail candidat : handler délégué enregistré UNE seule fois
        $(document).on("click", ".btn-detail-candidat", function () {

            const idsInscriptions =
                $(this)
                    .attr("data-ids")
                    .split(",")
                    .filter(Boolean);

            InscriptionController.showDetailCandidat(idsInscriptions);
        });

        // Modifier une inscription
        $(document).on("click", ".btn-edit-inscription", async function () {
            await InscriptionController.openEditModal(this);
        });

        // Enregistrer la modification
        const btnSave = document.getElementById("btnSaveInscription");

        if (btnSave) {
            btnSave.addEventListener("click", async () => {
                await InscriptionController.saveInscription();
            });
        }
    }

    // ===== DÉTAIL D'UN CANDIDAT =====
    static async showDetailCandidat(idsInscriptions) {

        const token = AdminController.getToken();

        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Session expirée",
                text: "Veuillez vous reconnecter."
            });
            window.location.href = "../login.php";
            return;
        }

        if (!idsInscriptions || idsInscriptions.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Aucune inscription",
                text: "Aucune inscription trouvée pour ce candidat."
            });
            return;
        }

        try {

            Swal.fire({
                title: "Chargement...",
                text: "Récupération des détails du candidat",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const responses = await Promise.all(
                idsInscriptions.map(
                    idInscription =>
                        InscriptionModel.detailInscription(
                            token,
                            idInscription
                        )
                )
            );

            Swal.close();

            const details = responses
                .filter(response => response.ok)
                .map(response => response.data?.data)
                .filter(Boolean);

            if (details.length === 0) {

                Swal.fire({
                    icon: "error",
                    title: "Erreur",
                    text: "Impossible de récupérer les détails des inscriptions."
                });

                return;
            }

            // Le candidat est présent dans chaque DetailInscription
            const candidat = details[0].candidat;

            const concoursHTML = details
                .map(d => {

                    const diplomesHTML =
                        d.diplomes?.length
                            ? d.diplomes
                                .map(
                                    (diplome, index) => `
                                    <a
                                        href="${diplome.url}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="d-block mb-1"
                                    >
                                        <i class="fa-solid fa-file-pdf text-danger me-1"></i>
                                        ${InscriptionController.escapeHTML(`Diplôme ${index + 1}`)}
                                    </a>
                                `
                                )
                                .join("")
                            : "-";


                    const documents = Array.isArray(d.candidat?.document)
                        ? d.candidat.document
                        : d.candidat?.document
                            ? [d.candidat.document]
                            : [];

                    const documentsHTML = documents.length
                        ? documents.map((document, index) => {
                            const url = document.url || document.fichier;
                            const type = document.type_document || `Document ${index + 1}`;

                            if (!url) {
                                return `
                <span class="d-block text-muted mb-1">
                    <i class="fa-solid fa-file-circle-question me-1"></i>
                    ${InscriptionController.escapeHTML(type)} : lien indisponible
                </span>
            `;
                            }

                            return `
            <a
                href="${InscriptionController.escapeHTML(url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="d-block mb-1"
                title="Consulter ${InscriptionController.escapeHTML(type)}"
            >
                <i class="fa-solid fa-file-lines text-primary me-1"></i>
                ${InscriptionController.escapeHTML(type)}
            </a>
        `;
                        }).join("")
                        : '<span class="text-muted">Aucun document</span>';

                    return `


                    <tr>

                        <td>
                            ${d.concours?.nom || "-"}
                        </td>

                        <td>
                            ${d.concours?.categorie?.libelle || "-"}
                        </td>

                        <td>
                            ${d.centre?.nom || "-"}
                        </td>

                        <td>
                            ${diplomesHTML}
                        </td>

                        <td>
                            ${documentsHTML}
                        </td>

                        <td>
                            <span class="badge bg-info">
                                ${d.statut_inscription || "-"}
                            </span>
                        </td>

                        <td>
                            ${d.date_inscription
                            ? new Date(
                                d.date_inscription
                            ).toLocaleDateString("fr-FR")
                            : "-"
                        }
                        </td>

                       <td class="checkbox-column text-center">
                        <input
                            type="checkbox"
                            class="form-check-input checkbox-valider-candidature"
                            data-id="${d.id_inscription}"
                            data-statut="${d.statut_inscription || "EN_ATTENTE"}"
                            ${d.statut_inscription === "VALIDEE" ? "checked" : ""}
                            aria-label="Valider la candidature"
                            title="Valider la candidature"
                        >
                    </td>

                    <td class="checkbox-column text-center">
                        <input
                            type="checkbox"
                            class="form-check-input checkbox-rejeter-candidature"
                            data-id="${d.id_inscription}"
                            data-statut="${d.statut_inscription || "EN_ATTENTE"}"
                            ${d.statut_inscription === "REJETEE" ? "checked" : ""}
                            aria-label="Rejeter la candidature"
                            title="Rejeter la candidature"
                        >
                    </td>

                        <td class="text-center">
                            <button
                                class="btn btn-warning btn-sm btn-edit-inscription"
                                data-id="${d.id_inscription}"
                                data-statut="${d.statut_inscription || ""}"
                                data-centre="${d.centre?.id_centre || ""}"
                                data-concours="${d.concours?.id_concours || ""}"
                                title="Modifier"
                            >
                                <i class="fa fa-edit"></i>
                            </button>
                        </td>

                        <td class="text-center">
                            <button
                                class="btn btn-danger btn-sm btn-delete-inscription"
                                data-id="${d.id_inscription}"
                                title="Supprimer"
                            >
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>

                    </tr>
                `;
                })
                .join("");

            document.getElementById(
                "detailContent"
            ).innerHTML = `

            <div class="row">

                <div class="col-md-6">

                    <p>
                        <strong>Nom :</strong>
                        ${candidat.nom || "-"}
                    </p>

                    <p>
                        <strong>Prénom :</strong>
                        ${candidat.prenom || "-"}
                    </p>

                    <p>
                        <strong>Email :</strong>
                        ${candidat.email || "-"}
                    </p>

                </div>

                <div class="col-md-6">

                    <p>
                        <strong>Type :</strong>
                        ${candidat.type_candidat || "-"}
                    </p>

                    <p>
                        <strong>Lieu de naissance :</strong>
                        ${candidat.lieu_naissance || "-"}
                    </p>

                    <p>
                        <strong>ID candidat :</strong>
                        ${candidat.id_candidat || "-"}
                    </p>

                </div>

            </div>

            <hr>

            <h5 class="mb-3">
                <i class="fa fa-file-signature"></i>
                Inscriptions du candidat
            </h5>

            <div class="table-responsive">

                <table class="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>Concours</th>
                            <th>Catégorie</th>
                            <th>Centre</th>
                            <th>Diplôme</th>
                            <th>Documents</th>
                            <th>Statut</th>
                            <th>Date</th>
                            <th class="checkbox-column">Valider</th>
                            <th class="checkbox-column">Rejeter</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${concoursHTML}
                    </tbody>

                </table>

            </div>
        `;

            $("#detailInscriptionModal").modal("show");

            InscriptionController.initTraitementCandidatures();

        } catch (error) {

            console.error(
                "Erreur détail candidat :",
                error
            );

            Swal.close();

            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue lors du chargement du candidat."
            });
        }
    }

    static escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    static initTraitementCandidatures() {
        const container = $("#detailContent");

        container.off("change.traitementCandidature");

        container.on(
            "change.traitementCandidature",
            ".checkbox-valider-candidature",
            async function () {
                const checkbox = this;
                const idInscription = Number(checkbox.dataset.id);
                const statutPrecedent = checkbox.dataset.statut;

                if (!checkbox.checked) {
                    checkbox.checked = statutPrecedent === "VALIDEE";
                    return;
                }

                const confirmation = await Swal.fire({
                    icon: "question",
                    title: "Valider cette inscription ?",
                    text: "Cette action confirmera l'inscription du candidat.",
                    showCancelButton: true,
                    confirmButtonText: "Oui, valider",
                    cancelButtonText: "Annuler",
                    confirmButtonColor: "#198754",
                    reverseButtons: true
                });

                if (!confirmation.isConfirmed) {
                    checkbox.checked = statutPrecedent === "VALIDEE";
                    return;
                }

                const token = AdminController.getToken();

                if (!token) {
                    checkbox.checked = statutPrecedent === "VALIDEE";

                    Swal.fire({
                        icon: "warning",
                        title: "Session expirée",
                        text: "Veuillez vous reconnecter."
                    });

                    return;
                }

                checkbox.disabled = true;

                try {
                    const response = await InscriptionModel.traiterCandidature(
                        token,
                        {
                            id_inscription: idInscription,
                            statut_inscription: "VALIDEE"
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            response.data?.message ||
                            "La validation de l'inscription a échoué."
                        );
                    }

                    const row = checkbox.closest("tr");
                    const statutBadge = row.querySelector(".statut-inscription");
                    const checkboxRejet = row.querySelector(
                        ".checkbox-rejeter-candidature"
                    );

                    statutBadge.textContent = "VALIDEE";
                    statutBadge.className = "badge bg-success statut-inscription";

                    checkbox.dataset.statut = "VALIDEE";

                    if (checkboxRejet) {
                        checkboxRejet.checked = false;
                        checkboxRejet.dataset.statut = "VALIDEE";
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Inscription validée",
                        text: "La décision a été enregistrée.",
                        timer: 1800,
                        showConfirmButton: false
                    });
                } catch (error) {
                    checkbox.checked = statutPrecedent === "VALIDEE";

                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: error.message ||
                            "Impossible de valider cette inscription."
                    });
                } finally {
                    checkbox.disabled = false;
                }
            }
        );

        container.on(
            "change.traitementCandidature",
            ".checkbox-rejeter-candidature",
            async function () {
                const checkbox = this;
                const idInscription = Number(checkbox.dataset.id);
                const statutPrecedent = checkbox.dataset.statut;

                if (!checkbox.checked) {
                    checkbox.checked = statutPrecedent === "REJETEE";
                    return;
                }

                const token = AdminController.getToken();

                if (!token) {
                    checkbox.checked = statutPrecedent === "REJETEE";

                    Swal.fire({
                        icon: "warning",
                        title: "Session expirée",
                        text: "Veuillez vous reconnecter."
                    });

                    return;
                }

                const motifsHTML = `
    <div class="rejet-form">

        <div class="rejet-intro">
            <div class="rejet-intro-icon">
                <i class="fa-solid fa-file-circle-xmark"></i>
            </div>

            <div class="rejet-intro-text">
                <h6>Pourquoi rejeter cette inscription ?</h6>
                <p>
                    Sélectionnez un ou plusieurs motifs justifiant
                    le rejet du dossier.
                </p>
            </div>
        </div>

        <div class="rejet-selection-header">
            <span>
                <i class="fa-solid fa-list-check me-1"></i>
                Motifs de rejet
            </span>

            <span class="rejet-counter">
                <span id="nombre-motifs-rejet">0</span> sélectionné(s)
            </span>
        </div>

        <div id="motifs-rejet-form" class="rejet-motifs-grid">

            <label class="rejet-motif-card" for="motif-dossier">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Dossier incomplet"
                    id="motif-dossier"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-folder-open"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Dossier incomplet</strong>
                    <small>Des pièces justificatives sont manquantes.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-diplome">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Diplôme non conforme"
                    id="motif-diplome"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-graduation-cap"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Diplôme non conforme</strong>
                    <small>Le diplôme ne correspond pas aux exigences.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-diplome-illisible">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Diplôme illisible"
                    id="motif-diplome-illisible"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-file-pdf"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Diplôme illisible</strong>
                    <small>Le document est flou ou inexploitable.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-identite">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Pièce d'identité non conforme"
                    id="motif-identite"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-id-card"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Pièce d'identité non conforme</strong>
                    <small>La pièce fournie est invalide ou incorrecte.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-informations">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Informations personnelles incorrectes"
                    id="motif-informations"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-user-pen"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Informations incorrectes</strong>
                    <small>Les renseignements du candidat sont inexacts.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-conditions">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Conditions d'accès non remplies"
                    id="motif-conditions"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-user-lock"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Conditions d'accès non remplies</strong>
                    <small>Le candidat ne remplit pas les critères requis.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card" for="motif-expire">
                <input
                    class="motif-rejet"
                    type="checkbox"
                    value="Document expiré"
                    id="motif-expire"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-calendar-xmark"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Document expiré</strong>
                    <small>La validité du document est dépassée.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

            <label class="rejet-motif-card rejet-motif-autre"
                   for="motif-autre">
                <input
                    type="checkbox"
                    id="motif-autre"
                >
                <span class="rejet-motif-icon">
                    <i class="fa-solid fa-pen-to-square"></i>
                </span>
                <span class="rejet-motif-content">
                    <strong>Autre motif</strong>
                    <small>Précisez un autre motif de rejet.</small>
                </span>
                <span class="rejet-motif-check">
                    <i class="fa-solid fa-check"></i>
                </span>
            </label>

        </div>

        <div id="autre-motif-container" class="autre-motif-container">
            <label for="motif-autre-texte" class="form-label">
                <i class="fa-solid fa-pen me-1"></i>
                Précision du motif
                <span class="text-danger">*</span>
            </label>

            <textarea
                id="motif-autre-texte"
                class="form-control"
                rows="3"
                maxlength="1000"
                placeholder="Expliquez clairement la raison du rejet..."
            ></textarea>

            <div class="autre-motif-footer">
                <span>Ce motif sera enregistré dans le dossier.</span>
                <span id="compteur-caracteres">0/1000</span>
            </div>
        </div>

        <div class="rejet-warning">
            <i class="fa-solid fa-circle-info"></i>
            <span>
                Vérifiez les motifs sélectionnés avant de confirmer.
                Cette décision sera enregistrée pour cette inscription.
            </span>
        </div>

    </div>
`;



                const resultat = await Swal.fire({
                    title: "Rejeter l'inscription",
                    html: motifsHTML,
                    width: 600,
                    showCancelButton: true,
                    confirmButtonText: "Confirmer le rejet",
                    cancelButtonText: "Annuler",
                    confirmButtonColor: "#dc3545",
                    reverseButtons: true,
                    focusConfirm: false,


                    didOpen: () => {
                        const popup = Swal.getPopup();

                        const autreCheckbox = popup.querySelector("#motif-autre");
                        const autreContainer = popup.querySelector("#autre-motif-container");
                        const autreTexte = popup.querySelector("#motif-autre-texte");
                        const compteur = popup.querySelector("#nombre-motifs-rejet");
                        const compteurCaracteres = popup.querySelector("#compteur-caracteres");

                        const mettreAJour = () => {
                            const nombreMotifs = popup.querySelectorAll(
                                ".motif-rejet:checked"
                            ).length;

                            compteur.textContent =
                                nombreMotifs + (autreCheckbox.checked ? 1 : 0);
                        };

                        popup.querySelectorAll(".motif-rejet").forEach(input => {
                            input.addEventListener("change", mettreAJour);
                        });

                        autreCheckbox.addEventListener("change", () => {
                            autreContainer.classList.toggle(
                                "visible",
                                autreCheckbox.checked
                            );

                            if (!autreCheckbox.checked) {
                                autreTexte.value = "";
                            }

                            mettreAJour();
                        });

                        autreTexte.addEventListener("input", () => {
                            compteurCaracteres.textContent =
                                `${autreTexte.value.length}/1000`;
                        });
                    },

                    preConfirm: () => {
                        const popup = Swal.getPopup();

                        const motifs = Array.from(
                            popup.querySelectorAll(".motif-rejet:checked")
                        ).map(input => input.value);

                        const autreCheckbox = popup.querySelector("#motif-autre");
                        const autreTexte = popup.querySelector("#motif-autre-texte");

                        if (autreCheckbox.checked) {
                            const precision = autreTexte.value.trim();

                            if (!precision) {
                                Swal.showValidationMessage(
                                    "Veuillez préciser le motif de rejet."
                                );
                                autreTexte.focus();
                                return false;
                            }

                            motifs.push(`Autre motif : ${precision}`);
                        }

                        if (motifs.length === 0) {
                            Swal.showValidationMessage(
                                "Sélectionnez au moins un motif de rejet."
                            );
                            return false;
                        }

                        return motifs;
                    }


                });

                if (!resultat.isConfirmed) {
                    checkbox.checked = statutPrecedent === "REJETEE";
                    return;
                }

                checkbox.disabled = true;

                try {
                    const response =
                        await InscriptionModel.traiterCandidature(
                            token,
                            {
                                id_inscription: idInscription,
                                statut_inscription: "REJETEE",
                                motifs: resultat.value
                            }
                        );

                    if (!response.ok) {
                        throw new Error(
                            response.data?.message ||
                            "Le rejet de l'inscription a échoué."
                        );
                    }

                    const row = checkbox.closest("tr");
                    const statutBadge = row.querySelector(".statut-inscription");
                    const checkboxValidation = row.querySelector(
                        ".checkbox-valider-candidature"
                    );

                    statutBadge.textContent = "REJETEE";
                    statutBadge.className = "badge bg-danger statut-inscription";

                    checkbox.dataset.statut = "REJETEE";

                    if (checkboxValidation) {
                        checkboxValidation.checked = false;
                        checkboxValidation.dataset.statut = "REJETEE";
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Inscription rejetée",
                        text: "Le statut et les motifs ont été transmis au serveur.",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    checkbox.checked = statutPrecedent === "REJETEE";

                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: error.message ||
                            "Impossible de rejeter cette inscription."
                    });
                } finally {
                    checkbox.disabled = false;
                }
            }
        );
    }
    // ===== ENREGISTRER LA MODIFICATION =====
    static async saveInscription() {

        const token = AdminController.getToken();

        const id_inscription = $("#edit_id_inscription").val();
        const status_inscriptions = $("#edit_statut").val();
        const id_centre = $("#edit_centre").val();

        await InscriptionModel.updateStatut(token, {
            id_inscription,
            status_inscriptions
        });

        await InscriptionModel.updateCentre(token, {
            id_inscription,
            id_centre
        });

        Swal.fire("Succès", "Modification enregistrée", "success");

        $("#editInscriptionModal").modal("hide");
        $("#detailInscriptionModal").modal("hide");

        // Recharge la table
        InscriptionController.reloadTable();
    }

    // ===== SUPPRESSION =====
    static initDeleteInscription() {

        document.addEventListener("click", async (e) => {

            const btn = e.target.closest(".btn-delete-inscription");
            if (!btn) return;

            const id_inscription = btn.dataset.id;

            const result = await Swal.fire({
                title: "Supprimer l'inscription ?",
                text: "Cette action est irréversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Oui",
                cancelButtonText: "Annuler"
            });

            if (!result.isConfirmed) return;

            try {

                const token = AdminController.getToken();

                const res = await InscriptionModel.deleteInscription(
                    token,
                    id_inscription
                );

                if (!res.ok) {

                    Swal.fire(
                        "Erreur",
                        res.data.error || "Suppression impossible",
                        "error"
                    );

                    return;
                }

                Swal.fire(
                    "Succès",
                    "Inscription supprimée avec succès",
                    "success"
                );

                $("#detailInscriptionModal").modal("hide");

                // Recharge la table après suppression
                InscriptionController.reloadTable();

            } catch (error) {

                console.error(error);

                Swal.fire(
                    "Erreur",
                    "Une erreur est survenue",
                    "error"
                );
            }
        });
    }

    // ===== CENTRES PAR CONCOURS =====
    static async loadCentresByConcours(
        id_concours,
        selectId = "#id_centre"
    ) {
        const token = AdminController.getToken();

        const res =
            await InscriptionModel.getCentresByConcours(
                token,
                id_concours
            );

        const select = $(selectId);

        select.empty();

        select.append(
            `<option value="">Sélectionnez un centre</option>`
        );

        if (!Array.isArray(res.data)) {
            console.error(
                "Les centres reçus ne sont pas un tableau :",
                res.data
            );
            return false;
        }

        res.data.forEach(data => {

            select.append(`
            <option value="${data.id_centre}">
                ${data.nom}
            </option>
        `);
        });

        select.trigger("change.select2");

        return true;
    }

    // ===== EXPORTS =====
    static async downloadExport(type) {
        const token = AdminController.getToken();

        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Session expirée",
                text: "Veuillez vous reconnecter."
            });

            window.location.href = "../login.php";

            return;
        }

        try {
            Swal.fire({
                title: "Export en cours...",
                text: `Préparation du fichier ${type.toUpperCase()}.`,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            let res;
            let extension;

            switch (type) {
                case "excel":
                    res = await InscriptionModel.exportExcel(token);
                    extension = "xlsx";
                    break;

                case "word":
                    res = await InscriptionModel.exportWord(token);
                    extension = "docx";
                    break;

                case "pdf":
                    res = await InscriptionModel.exportPDF(token);
                    extension = "pdf";
                    break;
            }

            if (!res.ok) {
                Swal.close();

                Swal.fire({
                    icon: "error",
                    title: "Erreur",
                    text: `Impossible d'exporter les inscriptions en ${type.toUpperCase()}.`
                });

                return;
            }

            const url = window.URL.createObjectURL(res.blob);

            const link = document.createElement("a");

            link.href = url;
            link.download =
                `inscriptions_${new Date().toISOString().slice(0, 10)}.${extension}`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            Swal.close();

            Swal.fire({
                icon: "success",
                title: "Export terminé",
                text: `Toutes les inscriptions ont été exportées en ${type.toUpperCase()}.`,
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {
            console.error(
                `Erreur export ${type} inscriptions :`,
                error
            );

            Swal.close();

            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue pendant l'export."
            });
        }
    }

    static async exportExcel() {
        await this.downloadExport("excel");
    }

    static async exportWord() {
        await this.downloadExport("word");
    }

    static async exportPDF() {
        await this.downloadExport("pdf");
    }

}