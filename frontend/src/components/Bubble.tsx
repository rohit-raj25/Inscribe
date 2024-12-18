import React from "react";
import { motion } from "framer-motion";

export const Bubble = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#121212", // Dark background for contrast
      }}
    >
      <motion.div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(0, 255, 128, 0.5), transparent 70%),
            linear-gradient(135deg, rgba(0, 255, 255, 0.4), rgba(0, 128, 255, 0.2))
          `,
          boxShadow: "0px 12px 40px rgba(0, 255, 200, 0.8)",
          backdropFilter: "blur(8px)", 
          border: "2px solid rgba(255, 255, 255, 0.2)", // Subtle outer border for a glass effect
        }}
        animate={{
          x: [0, 30, 60, 30, 0, -30, -60, -30, 0], // Circular x motion
          y: [0, -20, 0, 20, 40, 20, 0, -20, 0],   // Circular y motion
          rotate: [0, 360], // Smooth rotation
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          color: "#e0e0e0", // Light text
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        
      </div>
    </div>
  );
};


