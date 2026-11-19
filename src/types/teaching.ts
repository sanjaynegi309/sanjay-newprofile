export interface TeachingDiagramContent {
  label: string;
  title: string;
  question: string;
  steps: readonly { title: string; description: string }[];
  note: string;
  caption: string;
}

export interface TeachingExperimentContent {
  label: string;
  title: string;
  introduction: string;
  sourceLabel: string;
  source: string;
  responseLabel: string;
  response: string;
  prompt: string;
  choices: readonly {
    id: string;
    label: string;
    correct: boolean;
    feedbackTitle: string;
    feedback: string;
  }[];
  lesson: string;
  resetLabel: string;
  nextStep: { prompt: string; label: string; href: string };
}
