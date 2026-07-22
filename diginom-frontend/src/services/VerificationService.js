import api from "../api/api";

export const verifyIdentity = (diginomId) => {

    return api.get(

        `/verify/${diginomId}`

    );

};