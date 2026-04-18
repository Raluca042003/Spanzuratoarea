import React from "react";

export default function Leaderboard({ onBack }) {
  const scores = JSON.parse(localStorage.getItem("hangmanScores") || "[]");
  const sorted = [...scores].sort((a, b) => b.wins - a.wins);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏆 Clasament</h1>

        {sorted.length === 0 ? (
          <p style={styles.empty}>Nu există scoruri încă. Joacă primul!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Nume</th>
                <th style={styles.th}>✅ Câștigate</th>
                <th style={styles.th}>❌ Pierdute</th>
                <th style={styles.th}>🎮 Total</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((player, index) => (
                <tr key={player.name} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.td}>{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}</td>
                  <td style={styles.td}><b>{player.name}</b></td>
                  <td style={styles.td}>{player.wins}</td>
                  <td style={styles.td}>{player.losses}</td>
                  <td style={styles.td}>{player.wins + player.losses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={onBack} style={styles.button}>⬅️ Înapoi</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #F8EFE6, #E9DFD4)",
  },
  card: {
    width: "65%",
    maxWidth: "750px",
    background: "white",
    padding: "50px",
    textAlign: "center",
    borderRadius: "22px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#6B4F35",
    marginBottom: "30px",
  },
  empty: {
    fontSize: "18px",
    color: "#8B6E56",
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  th: {
    padding: "14px",
    background: "#f1e2d2",
    color: "#6B4F35",
    fontSize: "16px",
    fontWeight: "700",
    borderBottom: "2px solid #C9B8A8",
  },
  td: {
    padding: "12px",
    fontSize: "16px",
    color: "#6B4F35",
    borderBottom: "1px solid #f0e6da",
  },
  rowEven: { background: "white" },
  rowOdd: { background: "#fdf8f4" },
  button: {
    padding: "14px 30px",
    fontSize: "18px",
    borderRadius: "14px",
    background: "#C69C72",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};