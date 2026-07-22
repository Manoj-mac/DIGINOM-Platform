import {

    useEffect,

    useState

} from "react";

import {

    Box,

    CircularProgress,

    Typography

} from "@mui/material";

import {

    useParams

} from "react-router-dom";

import {

    verifyIdentity

} from "../services/verificationService";

function VerificationPage() {

    const {

        diginomId

    } = useParams();

    const [

        verification,

        setVerification

    ] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response =

                    await verifyIdentity(

                        diginomId

                    );

                setVerification(

                    response.data

                );

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchData();

    }, [diginomId]);

    if (!verification)

        return <CircularProgress />;

    return (

        <Box
            sx={{
                p: 5
            }}
        >

            <Typography variant="h3">

                DIGINOM VERIFIED

            </Typography>

            <Typography mt={3}>

                {verification.employee_name}

            </Typography>

            <Typography>

                {verification.diginom_id}

            </Typography>

            <Typography>

                {verification.verification_status}
                Employment Status:
                {verification.employment_status}

            </Typography>

            <Typography>

                Trust Score :

                {verification.trust_score}

            </Typography>

        </Box>

    );

}

export default VerificationPage;