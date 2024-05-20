import axios from 'axios';

const API = {
  GetChatbotResponse: async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (message === "hi") resolve("Welcome to chatbot!");
      }, 2000);
    });
  },

  fetchChatAPI: async (text,uid) => {
    const data = JSON.stringify({ q: text });
    let baseUrl='https://76n9i9hrp9.execute-api.us-east-1.amazonaws.com/genai-app-poc-ApiStage/api/v1/llm/rag'
    try {
      const response = await axios.post(`${baseUrl}?UUID=${uid}`, data, {
        headers: {
          authorization: 'eyJraWQiOiJOc1lNd2VES3pHVTVNTVpITFAwajBkdHNVN1dUZXpOY1pwZVBxTEwrQVhJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNDQwMzU1Ny1iNWVkLTRlYWUtOGY2NS1hYjhhYzQzYzZkODEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9rYzdxcm4wQ2oiLCJjb2duaXRvOnVzZXJuYW1lIjoiYzQ0MDM1NTctYjVlZC00ZWFlLThmNjUtYWI4YWM0M2M2ZDgxIiwib3JpZ2luX2p0aSI6IjU4MjA4ZDI1LWExYmItNGE4Yy05MzAyLTYyY2E1MTBhZjIwYyIsImF1ZCI6IjQxOWFsbzhhNDE1ZGVpN3Myb3JtYWdoYjlwIiwiZXZlbnRfaWQiOiI1OTlkNGQyNi04MTRmLTQyOTgtYTA0OC0xYzg0MjJkNTlkY2EiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5ODg0MzczMiwiZXhwIjoxNjk4OTMwMTMyLCJpYXQiOjE2OTg4NDM3MzIsImp0aSI6ImRkY2I3MDAzLWM5MmUtNDk0Zi1hYzk5LTBhZjFjNTA3NmM2NCIsImVtYWlsIjoiaGFzc2FuLm5hZGVlbUBuZXRzb2x0ZWNoLmNvbSJ9.h4gAHNGXqoW4HT9-9NDVEF4lrdgO3T4XPLjgGqpqpTdhJ80CgJmcWDA5l-EnG08NUJhwIQfhQILqSgKicvlVZD3VSX-nWfhctxDYAc3ARjJDj4sJa_jnJTKWrUVsnX37LF-ewptUNOq4TVCGeBM7MwZ_vnCOSCPSCdJHRb5_g667cJcnq8XB-Q56hxQu_f6VEgBYm_QpdpjwmjPHUhEQr0ApoF04ZCQPOydX6yncv01YDnH9nra3aCtb2ImcCSnRFxA2PKKTE6ck_IVEDPqC8EaLEFfaA_JycbzfES-XywtE_Mtox9GNE9C67qXYMhI0busGLwTBOG0DQkkZ8SdUKQ', // Replace with your actual token
          'Content-Type': 'application/json',
        },
      });
      return response.data.answer; // Assuming the response structure has an 'answer' field
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default API;
