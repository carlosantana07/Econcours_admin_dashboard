export default class MessageModel {

    static async envoyerMessage(token) {
        try {
            const response = await fetch(
                "http://localhost:4000/api/admin/messages/envoyer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            return {
                ok: response.ok,
                data
            };

        } 
       catch (error) {
            console.error("Erreur envoi du message :", error);

            return {
                ok: false,
                data: {
                    message: "Impossible de contacter le serveur."
                }
            };
        }
    }
}