import OpenAI from "openai";

// Initialize the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getRiskAndInterventions(patientData) {
  try {
    const prompt = `
      You are a medical expert reviewing patient data. Based on the patient's current information, provide realistic risk factors and possible interventions.
      Only update the risk factors and interventions, leaving all other data unchanged.

      Patient Information:
      Name: ${patientData.firstName} ${patientData.lastName}
      Age: ${patientData.age}
      Sex: ${patientData.sex}
      Vitals: Temperature ${patientData.vitals.t}°F, Pulse ${
      patientData.vitals.p
    } bpm, BP ${patientData.vitals.bp}, Respiratory Rate ${
      patientData.vitals.rr
    }, Oxygen Saturation ${patientData.vitals.pox}%
      
      Current Flags (with dummy data):
      Flags: ${patientData.flags.map((flag) => flag.type).join(", ")}
      Interventions: ${patientData.flags
        .map((flag) => flag.interventions.map((i) => i.name))
        .flat()
        .join(", ")}
      
      Please replace the dummy interventions and risk factors with realistic and medically relevant suggestions.Below is the patient's current data and you will update this with the new risk factors and interventions and reply me in exactly same format:
        ${JSON.stringify(patientData)}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful medical assistant." },
        { role: "user", content: prompt },
      ],
    });

    const updatedContent = completion.choices[0].message.content;

    return updatedContent;
  } catch (error) {
    console.error("Error generating risk factors and interventions:", error);
    throw error;
  }
}

export const handlePatientDataUpdate = async (patientData) => {
  try {
    let responseContent = await getRiskAndInterventions(patientData);
    responseContent = responseContent.replace(/```json|```/g, "").trim();

    const updatedData = JSON.parse(responseContent);
    console.log(updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error updating patient data:", error);
  }
};
