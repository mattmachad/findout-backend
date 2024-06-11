import apiFecth from "../database/db";


export const oneUser = async () => {
    try {
        const response = await apiFecth.get(`/api/v1.0/usuario/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
