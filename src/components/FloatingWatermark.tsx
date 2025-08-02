import { motion } from "framer-motion";
// Placeholder image - replace with actual image when available
const parachuteDog = "/images/verbiParachute.png";

export function FloatingWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Parachuting Robot Dog */}
      <motion.div
        className="absolute"
        initial={{ x: "100vw", y: -100 }}
        animate={{
          x: "-20vw",
          y: "85vh",
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <motion.img
          src={parachuteDog}
          alt="Parachuting robot dog"
          className="w-24 h-auto opacity-30"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Second parachuting dog with different timing */}
      <motion.div
        className="absolute"
        initial={{ x: "100vw", y: -100 }}
        animate={{
          x: "-20vw",
          y: "75vh",
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: 12,
        }}
      >
        <motion.img
          src={parachuteDog}
          alt="Parachuting robot dog"
          className="w-20 h-auto opacity-25"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Third parachuting dog */}
      <motion.div
        className="absolute"
        initial={{ x: "100vw", y: -100 }}
        animate={{
          x: "-20vw",
          y: "65vh",
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: 20,
        }}
      >
        <motion.img
          src={parachuteDog}
          alt="Parachuting robot dog"
          className="w-16 h-auto opacity-20"
          animate={{
            y: [0, -6, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
