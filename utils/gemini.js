import "dotenv/config";

const getGeminiAPIResponse = async (message) =>{
     try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: "gemini-3.6-flash",
          input: message,
        }),
      }
    );

    const data = await response.json();
    console.log(data.steps[1].content[0].text);
    return data.steps[1].content[0].text;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getGeminiAPIResponse;