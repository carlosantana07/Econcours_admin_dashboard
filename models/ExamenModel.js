const API_URL = "http://localhost:4000/api/admin";

export default class ExamenModel {

    static async createExamen(token, data) {
        const res = await fetch(`${API_URL}/examens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        return {
            ok: res.ok,
            data: result
        };
    }

    static async getAllExamens(token, params = {}) {
        const query = new URLSearchParams({
            draw: params.draw ?? 0,
            start: params.start ?? 0,
            length: params.length ?? 10,
            search: params.search ?? "",
            orderColumn: params.orderColumn ?? 0,
            orderDir: params.orderDir ?? "asc"
        });

        const url = `${API_URL}/examen/list-exam?${query.toString()}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });

            const text = await res.text();

            let result;

            try {
                result = JSON.parse(text);
            } catch {
                console.error("Réponse non JSON du serveur :", text);

                return {
                    ok: false,
                    status: res.status,
                    data: {
                        error: "Le serveur n'a pas renvoyé une réponse JSON valide."
                    }
                };
            }
            return {
                ok: res.ok,
                status: res.status,
                data: result
            };
        } catch (error) {
            console.error("Erreur réseau lors du chargement des examens :", error);

            return {
                ok: false,
                status: 0,
                data: {
                    error: "Impossible de contacter le serveur."
                }
            };
        }
    }

    static async getDetailExamen(token, id_examen) {
        const res = await fetch(`${API_URL}/examens/${id_examen}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await res.json();

        return {
            ok: res.ok,
            data: result
        };
    }

    static async updateExamen(id_examen, token, data) {

        const res = await fetch(
            `${API_URL}/examens/${id_examen}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(data)
            }
        );

        const result = await res.json();

        return {
            ok: res.ok,
            data: result
        };
    }

    static async deleteExamen(id_examen, token) {

        const res = await fetch(
            `${API_URL}/examens/${id_examen}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const result = await res.json();

        return {
            ok: res.ok,
            data: result
        };
    }

    static async getExamensByConcours(id_concours, token) {

        const res = await fetch(
            `${API_URL}/examens/concours/${id_concours}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const result = await res.json();

        return {
            ok: res.ok,
            data: result
        };
    }

    static async exportExcel(token) {
        const res = await fetch(
            `${API_URL}/examens/export/excel`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!res.ok) {
            const errorText = await res.text();

            console.error(
                "Erreur export Excel examens :",
                errorText
            );

            return {
                ok: false
            };
        }

        return {
            ok: true,
            blob: await res.blob()
        };
    }

    static async exportWord(token) {
        const res = await fetch(
            `${API_URL}/examens/export/word`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!res.ok) {
            const errorText = await res.text();

            console.error(
                "Erreur export Word examens :",
                errorText
            );

            return {
                ok: false
            };
        }

        return {
            ok: true,
            blob: await res.blob()
        };
    }

    static async exportPDF(token) {
        const res = await fetch(
            `${API_URL}/examens/export/pdf`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!res.ok) {
            const errorText = await res.text();

            console.error(
                "Erreur export PDF examens :",
                errorText
            );

            return {
                ok: false
            };
        }

        return {
            ok: true,
            blob: await res.blob()
        };
    }

    static async uploadQuestions(token, idExamen, idConcours, file) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("id_examen", idExamen);
        formData.append("id_concours", idConcours);

        try {
            const response = await fetch(`${API_URL}/upload-exam-question`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                data = {
                    message: text || "Réponse invalide du serveur."
                };
            }

            return {
                ok: response.ok,
                status: response.status,
                data
            };
        } catch (error) {
            console.error("Erreur lors de l'importation des questions :", error);

            return {
                ok: false,
                status: 0,
                data: {
                    message: "Impossible de contacter le serveur."
                }
            };
        }
    }

    static async uploadReponses(token, idExamen, idConcours, file) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("id_examen", idExamen);
        formData.append("id_concours", idConcours);

        try {
            const response = await fetch(`${API_URL}/upload-exam-response`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                data = {
                    message: text || "Réponse invalide du serveur."
                };
            }

            return {
                ok: response.ok,
                status: response.status,
                data
            };
        } catch (error) {
            console.error("Erreur lors de l'importation des réponses :", error);

            return {
                ok: false,
                status: 0,
                data: {
                    message: "Impossible de contacter le serveur."
                }
            };
        }
    }

    static async getQuestionsAndReponses(token, idExamen) {
        try {
            const response = await fetch(
                `${API_URL}/exam/${idExamen}/questions-reponses`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            );

            const data = await response.json();

            return {
                ok: response.ok,
                status: response.status,
                data
            };
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des questions et réponses :",
                error
            );

            return {
                ok: false,
                status: 0,
                data: {
                    error: "Impossible de contacter le serveur."
                }
            };
        }
    }
}