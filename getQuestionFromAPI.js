const usedQuestions = new Set();

export const getQuestionFromAPI = async () => {
  let question, answer;
  let attempts = 0;

  do {
    const response = await fetch(
      "https://api.api-ninjas.com/v1/trivia",
      {
        headers: {
          "X-Api-Key": "fpJC0pvlanffd9b8tMGwB4O82JLEavE4dbsBKpa4",
        },
      }
    );

    const data = await response.json();
    console.log("Raspuns:", JSON.stringify(data));

    if (!data || !data[0]) {
      throw new Error("Raspuns invalid: " + JSON.stringify(data));
    }

    question = data[0].question;
    answer = data[0].answer.toLowerCase();
    attempts++;
  } while (usedQuestions.has(question) && attempts < 10);

  usedQuestions.add(question);

  return { question, answer };
};