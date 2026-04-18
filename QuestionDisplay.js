import React from "react";

const QuestionDisplay = ({ question }) => {
  return (
    <div className="question-display">
      <h2 style={styles.title}>📘 Întrebare:</h2>

      <div className="question-box" style={styles.box}>
        {question}
      </div>
    </div>
  );
};

const styles = {
  title: {
    color: "#7A5E46",
    fontSize: "26px",
    marginBottom: "10px",
    fontWeight: "600",
  },
  box: {
    fontSize: "22px",
    padding: "14px 22px",
    fontWeight: "500",
  },
};

export default QuestionDisplay;
