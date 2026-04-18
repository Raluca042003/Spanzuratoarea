import { useState } from "react";
import { FaGamepad, FaLightbulb, FaSmile, FaMeh, FaSkull, FaRocket, FaTrophy } from "react-icons/fa";

export default function StartScreen({ onStart, onLeaderboard }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("mediu");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Te rog introdu numele!");
      return;
    }
    onStart(name, difficulty);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          <FaGamepad style={styles.titleIcon} />
          Jocul Spânzurătoarea
        </h1>

        <p style={styles.subtitle}>
          Ghicește literele cuvântului înainte de a se completa spânzurătoarea!
          <br />
          Succes! <FaLightbulb style={styles.inlineIcon} />
        </p>

        <input
          type="text"
          placeholder="Introdu numele tău..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <p style={styles.diffLabel}>Alege dificultatea:</p>

        <div style={styles.diffContainer}>
          {["usor", "mediu", "hard"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              style={{
                ...styles.diffBtn,
                background: difficulty === d ? diffColors[d] : "#f0e6da",
                color: difficulty === d ? "white" : "#6b4f35",
                transform: difficulty === d ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span style={styles.diffBtnContent}>
                {diffIcons[d]}
                {diffLabels[d]}
              </span>
            </button>
          ))}
        </div>

        <button onClick={handleStart} style={styles.button}>
          <span style={styles.buttonContent}>
            <FaRocket />
            START
          </span>
        </button>

        <button
          onClick={onLeaderboard}
          style={{ ...styles.button, background: "#8B6E56", marginTop: "12px" }}
        >
          <span style={styles.buttonContent}>
            <FaTrophy />
            Vezi Clasament
          </span>
        </button>
      </div>
    </div>
  );
}

const diffLabels = {
  usor: "Ușor (8 greșeli)",
  mediu: "Mediu (6 greșeli)",
  hard: "Hard (4 greșeli)",
};

const diffIcons = {
  usor: <FaSmile />,
  mediu: <FaMeh />,
  hard: <FaSkull />,
};

const diffColors = {
  usor: "#7dbb6e",
  mediu: "#C69C72",
  hard: "#c0392b",
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #F8EFE6, #E9DFD4)",
  },
  card: {
    width: "60%",
    maxWidth: "700px",
    background: "white",
    padding: "50px",
    textAlign: "center",
    borderRadius: "22px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#6B4F35",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
  },
  titleIcon: {
    fontSize: "42px",
  },
  subtitle: {
    fontSize: "19px",
    color: "#8B6E56",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  inlineIcon: {
    verticalAlign: "middle",
    marginLeft: "6px",
  },
  input: {
    width: "70%",
    padding: "16px",
    fontSize: "20px",
    borderRadius: "14px",
    border: "2px solid #C9B8A8",
    outline: "none",
    textAlign: "center",
  },
  diffLabel: {
    fontSize: "18px",
    color: "#8B6E56",
    marginTop: "25px",
    marginBottom: "12px",
    fontWeight: "600",
  },
  diffContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginBottom: "25px",
  },
  diffBtn: {
    padding: "12px 22px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "2px solid #C9B8A8",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },
  diffBtnContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  },
  button: {
    marginTop: "5px",
    width: "74%",
    padding: "16px",
    fontSize: "22px",
    borderRadius: "14px",
    background: "#C69C72",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "block",
    margin: "5px auto 0",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
};