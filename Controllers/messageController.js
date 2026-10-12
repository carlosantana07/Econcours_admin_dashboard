import MessageModel from "../models/messageModel.js";

export default class MessageController {

    static init() {
        const button = document.getElementById("btnEnvoyerMessages");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            this.envoyerMessage(button);
        });
    }

    static async envoyerMessage(button) {
        const token = localStorage.getItem("admin_token");

        if (!token) {
            await Swal.fire({
                icon: "warning",
                title: "Session expirée",
                text: "Veuillez vous reconnecter à votre compte administrateur."
            });

            window.location.href = "connexion.php";
            return;
        }

        // const confirmation = await Swal.fire({
        //     icon: "question",
        //     title: "Envoyer le message de d ?",
        //     text: "Un message sera envoyé au numéro prédéfini dans le backend.",
        //     showCancelButton: true,
        //     confirmButtonText: "Oui, envoyer",
        //     cancelButtonText: "Annuler",
        //     confirmButtonColor: "#14B53A"
        // });

        // if (!confirmation.isConfirmed) {
        //     return;
        // }

        const ancienTexte = button.innerHTML;

        button.disabled = true;
        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Envoi en cours...
        `;

        try {
            const res = await MessageModel.envoyerMessage(token);

            if (!res.ok) {
                throw new Error(
                    res.data?.message ||
                    res.data?.error ||
                    "L'envoi du message a échoué."
                );
            }

            await Swal.fire({
                icon: "success",
                title: "Message envoyé !",
                text: res.data?.message ||
                    "Le message a été envoyé avec succès."
            });

        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Échec de l'envoi",
                text: error.message ||
                    "Une erreur est survenue lors de l'envoi du message."
            });

        } finally {
            button.disabled = false;
            button.innerHTML = ancienTexte;
        }
    }
}