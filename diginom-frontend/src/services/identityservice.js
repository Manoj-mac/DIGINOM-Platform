import api from "../api/api";

export const getIdentity = async (employeeId) => {

    const token = localStorage.getItem("token");

    return api.get(

        `/identity/${employeeId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

};