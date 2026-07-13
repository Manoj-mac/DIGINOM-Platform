import { motion } from "framer-motion";

function FadeIn({

    children,

    delay = 0

}) {

    return (

        <motion.div

            initial={{

                opacity: 0,

                y: 30

            }}

            animate={{

                opacity: 1,

                y: 0

            }}

            transition={{

                duration: .55,

                delay,

                ease: "easeOut"

            }}

        >

            {children}

        </motion.div>

    );

}

export default FadeIn;