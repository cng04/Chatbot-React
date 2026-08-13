/*
  Canned responses used when the app runs in demo mode (REACT_APP_DEMO_MODE=true).
*/

// Wraps a plain question string in the {question: {sender, message}} shape the SimilarQuestions component expects
const toSimilarQuestion = (message) => ({
  question: {
    sender: 'OpenAI',
    message,
  },
});

/*
  Each entry pairs a matcher against the user's question with the answer and
  follow-up questions to return. The first match wins; DEFAULT_RESPONSE is used
  when nothing matches.
*/
const SAMPLE_RESPONSES = [
  {
    match: /cache|cookies|browser|slow|freez/i,
    answer:
      'To clear your browser cache in Chrome or Edge:<br/><br/>' +
      '1. Press <b>Ctrl + Shift + Delete</b> (<b>Cmd + Shift + Delete</b> on Mac) to open the clear browsing data dialog.<br/>' +
      '2. Set the time range to <b>All time</b>.<br/>' +
      '3. Check <b>Cached images and files</b>. Leave passwords unchecked so you are not signed out of other systems.<br/>' +
      '4. Select <b>Clear data</b>, then close and reopen the browser.<br/><br/>' +
      'If the application is still not loading correctly after this, try an InPrivate or Incognito window to confirm the issue is cache related before contacting the service desk.',
    similarQuestions: [
      'How do I clear my browser cache in Firefox?',
      'Why is the application running slowly after an update?',
      'How do I reset my saved sign-in credentials?',
      'Who do I contact when the service desk portal is unavailable?',
    ],
  },
  {
    match: /firearm|DIR|upload|repositor/i,
    answer:
      'Yes. Firearm applications can be uploaded to the DIR, provided they are scanned as a searchable PDF and are under the per-file size limit.<br/><br/>' +
      'The usual sequence is:<br/>' +
      '1. Scan the completed application, including any sworn attachments, as a single PDF.<br/>' +
      '2. In the DIR, open the matter and select <b>Add Document</b>.<br/>' +
      '3. Choose the document type that corresponds to the application, rather than filing it as general correspondence, so it is indexed correctly.<br/>' +
      '4. Confirm the upload and verify the document appears in the matter history.<br/><br/>' +
      'If the file exceeds the size limit, split it by attachment rather than lowering the scan resolution, since the text has to remain searchable.',
    similarQuestions: [
      'What file formats are accepted by the DIR?',
      'What is the maximum file size for a DIR upload?',
      'How do I correct a document filed under the wrong type?',
      'Can I upload documents to the DIR on behalf of another clerk?',
    ],
  },
  {
    match: /adjourn|reschedul|postpon|next appearance/i,
    answer:
      'To enter an adjournment for a matter:<br/><br/>' +
      '1. Open the matter and select the appearance that is being adjourned.<br/>' +
      '2. Select <b>Adjourn</b> and record the reason, since the reason code drives reporting.<br/>' +
      '3. Enter the new appearance date, time, and courtroom. If the next date has not been set, record it as <b>to be spoken to</b> rather than leaving it blank.<br/>' +
      '4. Note any conditions that carry forward, such as bail terms or orders regarding disclosure.<br/>' +
      '5. Save the entry and confirm the endorsement matches what was ordered in court.<br/><br/>' +
      'The adjournment is not reflected on the daily docket until the entry is saved, so complete it before the end of the sitting.',
    similarQuestions: [
      'How do I record the reason for an adjournment?',
      'How do I correct an adjournment entered on the wrong matter?',
      'How do I set a matter down as to be spoken to?',
      'How do I print an updated daily court docket?',
    ],
  },
];

// Returned when the question does not match any of the samples above
const DEFAULT_RESPONSE = {
  answer:
    'This deployment is running in demo mode, so this answer is sample text rather than a generated response.<br/><br/>' +
    'In the full version, this question would be sent to the Flask backend, which passes it to the OpenAI model along with the text of any PDF you have uploaded, and returns both an answer and a set of related questions.<br/><br/>' +
    'Try one of the suggested questions below to see a worked example, or run the project locally with an OpenAI API key for live responses.',
  similarQuestions: [
    'How do I clear my browser cache?',
    'Can Firearm Applications be uploaded to the DIR?',
    'How do I enter an Adjournment for a matter?',
    'What can this assistant help me with?',
  ],
};

// Builds the same {similarQuestions, answer} payload the /question endpoint returns
export function getDemoAnswer(question) {
  const matched =
    SAMPLE_RESPONSES.find((response) => response.match.test(question)) || DEFAULT_RESPONSE;

  return {
    similarQuestions: matched.similarQuestions.map(toSimilarQuestion),
    answer: {
      sender: 'OpenAI',
      message: matched.answer,
    },
  };
}
