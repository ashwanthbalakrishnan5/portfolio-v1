import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to percentage width
  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Fade out when at the very top
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const smoothOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      style={{ opacity: smoothOpacity }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-violet to-cyan"
        style={{
          width,
          boxShadow: "0 0 8px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.3)",
        }}
      />
    </motion.div>
  );
}

export default ScrollProgress;
