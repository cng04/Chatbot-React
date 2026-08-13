/*
  Central API layer for the CourtAssist frontend.

  Every backend call goes through this module so the app can run in one of two modes:

    live mode - talks to the Flask backend
    demo mode - returns canned responses from demoResponses.js, no backend required
*/

import axios from 'axios';
import { getDemoAnswer } from './demoResponses';

const DEMO_MODE = String(process.env.REACT_APP_DEMO_MODE).trim().toLowerCase() === 'true';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8081';

// Lets components show the demo banner and adjust copy without knowing how the flag is set
export const isDemoMode = () => DEMO_MODE;

// Stand-in for network latency, so the "Generating response ..." indicator still appears
const DEMO_LATENCY_MS = 900;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// POST helper for the endpoints that send and receive JSON
async function postJson(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json();
}

/*
  Sends a question and returns {similarQuestions, answer}.

  The "similar" keyword hits a separate backend endpoint that returns fixed data,
  which was used while building out the similar questions UI.
*/
export async function askQuestion(question) {
  if (DEMO_MODE) {
    await delay(DEMO_LATENCY_MS);
    return getDemoAnswer(question.message);
  }

  const endpoint = question.message === 'similar' ? '/similar' : '/question';

  return postJson(endpoint, { content: question });
}

// Records whether the user liked or disliked an answer. Returns {status}
export async function sendUserReaction(userReactionRequest) {
  if (DEMO_MODE) {
    await delay(200);

    // Logged rather than stored, since demo mode has nowhere to send it
    console.log('Demo mode - user reaction not sent:', userReactionRequest);
    return { status: 1 };
  }

  const response = await axios.post(`${API_BASE_URL}/userReaction`, {
    userReactionRequest,
  });

  return response.data;
}

/*
  The three calls below are live mode only.
*/

// Uploads a PDF for the model to answer from. Returns {status}
export async function uploadFile(file) {
  // FormData sets the multipart request headers automatically
  const fd = new FormData();
  fd.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, fd);

  return response.data;
}

// Clears the uploaded document text held by the backend. Returns {status}
export async function clearDocument() {
  const response = await axios.post(`${API_BASE_URL}/clear`, { message: 'clear' });

  return response.data;
}

/*
  Summarizes the uploaded document. An empty context asks for a general summary,
  otherwise the context is used as the instruction. Returns {response}
*/
export async function summarize(context) {
  const contextRequest = { context };

  const response = await axios.post(`${API_BASE_URL}/summarize`, {
    contextRequest,
  });

  return response.data;
}