// One definition per form. The browser uses it to draw the form; the server uses it to validate.

export type FieldType = "text" | "email" | "tel" | "url" | "textarea" | "select" | "radio" | "checkbox" | "multi";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  hint?: string;
  autoComplete?: string;
  max?: number;
  placeholder?: string;
};

export type Step = { title: string; intro?: string; fields: Field[] };

export type FormKind = "apply" | "brief" | "sponsor" | "contact";

export type FormDef = { kind: FormKind; title: string; submitLabel: string; successTitle: string; successText: string; steps: Step[] };

const consent: Field = {
  name: "consent",
  label: "I agree that DataLearn may store these details to respond to me, as described in the privacy notice.",
  type: "checkbox",
  required: true,
};

export const forms: Record<FormKind, FormDef> = {
  apply: {
    kind: "apply",
    title: "Apply for the pilot cohort",
    submitLabel: "Send application",
    successTitle: "Application received",
    successText: "Thank you. We will email you within 10 working days with the next step, a short skills check.",
    steps: [
      {
        title: "About you",
        fields: [
          { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name", max: 120 },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", max: 200 },
          { name: "country", label: "Country you live in", type: "text", required: true, autoComplete: "country-name", max: 80 },
          { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", max: 40 },
        ],
      },
      {
        title: "Where you are now",
        fields: [
          {
            name: "status",
            label: "Which describes you best?",
            type: "radio",
            required: true,
            options: ["Recent graduate", "Final-year student", "Changing career", "Other"],
          },
          { name: "education", label: "Highest qualification and subject", type: "text", required: true, max: 200, placeholder: "e.g. BSc Economics" },
          {
            name: "experience",
            label: "Which of these have you used before?",
            type: "multi",
            options: ["Spreadsheets", "SQL", "Python", "Dashboards", "None yet"],
          },
          {
            name: "hours",
            label: "Hours you can commit each week",
            type: "select",
            required: true,
            options: ["Under 10", "10–15", "15–25", "25 or more"],
          },
        ],
      },
      {
        title: "Your goals",
        fields: [
          { name: "why", label: "Why do you want to join, and what job are you aiming for?", type: "textarea", required: true, max: 1500, hint: "A few honest sentences are enough. We read every one." },
          { name: "barrier", label: "Is anything making it hard to get your first role? (optional)", type: "textarea", max: 1000 },
          {
            name: "sponsored",
            label: "Would you need a sponsored place to take part?",
            type: "radio",
            required: true,
            options: ["Yes", "No", "Not sure"],
          },
          consent,
        ],
      },
    ],
  },
  brief: {
    kind: "brief",
    title: "Submit a project brief",
    submitLabel: "Send brief",
    successTitle: "Brief received",
    successText: "Thank you. A member of the partnerships team will contact you within 5 working days to scope the project together.",
    steps: [
      {
        title: "Your organisation",
        fields: [
          { name: "fullName", label: "Your name", type: "text", required: true, autoComplete: "name", max: 120 },
          { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", max: 200 },
          { name: "organisation", label: "Organisation", type: "text", required: true, autoComplete: "organization", max: 160 },
          { name: "role", label: "Your role", type: "text", required: true, autoComplete: "organization-title", max: 120 },
          { name: "country", label: "Country", type: "text", required: true, max: 80 },
        ],
      },
      {
        title: "The problem",
        intro: "Tell us about a real question your team wants answered. We will help shape it into a project of the right size.",
        fields: [
          { name: "problem", label: "What do you want to find out or build?", type: "textarea", required: true, max: 2000 },
          { name: "data", label: "What data or materials could participants work with?", type: "textarea", max: 1500, hint: "We can work with anonymised or sample data. Never send personal data in this form." },
          {
            name: "involvement",
            label: "How would you like to be involved?",
            type: "multi",
            required: true,
            options: ["Provide the brief", "Mentor participants", "Review final work", "Interview participants", "Offer a placement"],
          },
        ],
      },
      {
        title: "Timing",
        fields: [
          { name: "timing", label: "When could the project start?", type: "select", required: true, options: ["Within 1 month", "1–3 months", "3–6 months", "Just exploring"] },
          { name: "hiring", label: "Are you hiring entry-level staff in the next 12 months?", type: "radio", required: true, options: ["Yes", "Maybe", "No"] },
          consent,
        ],
      },
    ],
  },
  sponsor: {
    kind: "sponsor",
    title: "Talk to us about sponsorship",
    submitLabel: "Send enquiry",
    successTitle: "Enquiry received",
    successText: "Thank you. We will send you our sponsorship options and the latest cost per participant within 5 working days.",
    steps: [
      {
        title: "About you",
        fields: [
          { name: "fullName", label: "Your name", type: "text", required: true, autoComplete: "name", max: 120 },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", max: 200 },
          { name: "organisation", label: "Organisation (if any)", type: "text", autoComplete: "organization", max: 160 },
          {
            name: "type",
            label: "You are a…",
            type: "select",
            required: true,
            options: ["Company", "Foundation or trust", "Development organisation", "Individual donor", "Other"],
          },
        ],
      },
      {
        title: "Your interest",
        fields: [
          { name: "interest", label: "What would you like to support?", type: "multi", required: true, options: ["Participant places", "A whole cohort", "A career track", "Equipment and data access", "Not sure yet"] },
          { name: "message", label: "Anything else we should know?", type: "textarea", max: 1500 },
          consent,
        ],
      },
    ],
  },
  contact: {
    kind: "contact",
    title: "Contact us",
    submitLabel: "Send message",
    successTitle: "Message sent",
    successText: "Thank you. We reply to every message within 5 working days.",
    steps: [
      {
        title: "Your message",
        fields: [
          { name: "fullName", label: "Name", type: "text", required: true, autoComplete: "name", max: 120 },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", max: 200 },
          { name: "topic", label: "Topic", type: "select", required: true, options: ["Joining as a learner", "Employer partnership", "Mentoring", "Sponsorship", "Press", "Something else"] },
          { name: "message", label: "Message", type: "textarea", required: true, max: 3000 },
          consent,
        ],
      },
    ],
  },
};
