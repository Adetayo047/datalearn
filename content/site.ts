// All editable website copy lives here. Change text in this file; the pages pick it up.
// Anything marked `toConfirm: true` is shown on the site with a "To confirm" label until you replace it.

export const site = {
  name: "DataLearn",
  tagline: "From learning to proven work.",
  descriptor: "Bridging education and employment",
  description:
    "DataLearn helps people move from learning to demonstrated competence, practical experience and meaningful work, and helps employers discover and develop capable talent.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@datalearn.org",
  emailToConfirm: true,
};

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/learners", label: "For learners" },
  { href: "/employers", label: "For employers" },
  { href: "/sponsors", label: "For sponsors" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/about", label: "About" },
];

export type Phase = { key: string; name: string; verb: string; stages: number[]; summary: string };

export const phases: Phase[] = [
  { key: "learn", name: "Learn", verb: "Learn it", stages: [1, 2], summary: "We assess where you are and agree a learning path that fits your goals." },
  { key: "practise", name: "Practise", verb: "Practise it", stages: [3, 4], summary: "Hands-on training, then supervised projects with a mentor reviewing your work." },
  { key: "prove", name: "Prove", verb: "Prove it", stages: [5, 6], summary: "Your work is assessed against clear criteria and becomes verified portfolio evidence." },
  { key: "work", name: "Work", verb: "Work it", stages: [7, 8], summary: "We introduce you to employers who have already seen what you can do." },
];

export type Stage = {
  n: number;
  short: string;
  title: string;
  you: string;
  youGet: string;
  employer: string;
  duration: string;
};

export const stages: Stage[] = [
  {
    n: 1,
    short: "Apply",
    title: "Outreach and application",
    you: "Apply online in about 15 minutes. Tell us about your interests, availability and goals.",
    youGet: "A clear answer on whether the current cohort is right for you.",
    employer: "Refer candidates or share the programme with your networks.",
    duration: "Rolling, before each cohort",
  },
  {
    n: 2,
    short: "Assess",
    title: "Assessment and pathway",
    you: "Complete a short skills check and a conversation with our team.",
    youGet: "A baseline score and a personal learning plan.",
    employer: "Help set the skills bar the cohort is assessed against.",
    duration: "1–2 weeks",
  },
  {
    n: 3,
    short: "Train",
    title: "Practical training",
    you: "Learn the tools by using them on case studies and assignments.",
    youGet: "Hands-on skills, plus professional skills such as communication and planning.",
    employer: "Run a workshop or share real tools and data sets.",
    duration: "3–4 weeks",
  },
  {
    n: 4,
    short: "Projects",
    title: "Projects and mentorship",
    you: "Work alone or in a team on a supervised project, with a mentor reviewing your work.",
    youGet: "Experience of real deadlines, feedback and teamwork.",
    employer: "Provide a project brief or mentor a participant.",
    duration: "3–4 weeks",
  },
  {
    n: 5,
    short: "Portfolio",
    title: "Assessment and portfolio",
    you: "Present your work. It is assessed against criteria agreed in advance.",
    youGet: "A verified portfolio entry showing what you did and how it was judged.",
    employer: "Review portfolios and join project demonstrations.",
    duration: "1–2 weeks",
  },
  {
    n: 6,
    short: "Experience",
    title: "Experience opportunities",
    you: "Take on an internship, apprenticeship or paid project with clear expectations.",
    youGet: "Workplace experience with defined pay, hours and supervision.",
    employer: "Offer a placement or a paid, scoped project.",
    duration: "Varies by role",
  },
  {
    n: 7,
    short: "Match",
    title: "Matching and placement",
    you: "Choose to share your profile. We prepare you for interviews.",
    youGet: "Introductions to employers looking for your skills.",
    employer: "Interview candidates you have already seen at work.",
    duration: "Ongoing",
  },
  {
    n: 8,
    short: "Alumni",
    title: "Alumni and growth",
    you: "Join the alumni network, mentor newer participants and keep learning.",
    youGet: "Continued support as your career develops.",
    employer: "Give feedback on hires and return with new briefs.",
    duration: "Ongoing",
  },
];

export const values = [
  { name: "Opportunity", text: "Talent deserves a fair chance to show its potential." },
  { name: "Practical learning", text: "Competence is developed and demonstrated by doing." },
  { name: "Integrity", text: "Skills, experience and achievements are represented honestly." },
  { name: "Collaboration", text: "Learners, employers, educators, mentors and communities work together." },
  { name: "Inclusion", text: "Money or background should not shut capable people out." },
  { name: "Impact", text: "Success is measured by real gains in skills, experience and employment." },
];

export const safeguards = [
  "Transparent selection and assessment criteria, published before each cohort.",
  "Written expectations for learners, mentors, project owners and employers.",
  "Every project has a defined scope, supervision, deliverables, feedback and agreed ownership.",
  "Simulated projects are always labelled as simulations, never as client work or employment.",
  "Volunteer roles are genuinely voluntary and lawful. Volunteering is never used to disguise unpaid work.",
  "Pay, expenses, insurance, hours, confidentiality and intellectual property are agreed before any placement starts.",
  "We share your information only with your informed consent, and we follow data protection law where you live.",
  "A clear process for complaints, conflicts of interest and reporting unsafe or inappropriate behaviour.",
];

export type Track = { slug: string; name: string; status: "pilot" | "later"; roles: string[]; tools: string[]; summary: string };

export const tracks: Track[] = [
  {
    slug: "data-analysis",
    name: "Data analysis",
    status: "pilot",
    roles: ["Junior data analyst", "Reporting analyst", "Business intelligence assistant"],
    tools: ["Spreadsheets", "SQL", "Python basics", "Dashboards", "Presenting findings"],
    summary: "Turn raw data into clear answers a business can act on. The first track, chosen for strong employer demand and low equipment costs.",
  },
  {
    slug: "software",
    name: "Software and IT",
    status: "later",
    roles: ["Junior developer", "QA tester", "IT support"],
    tools: ["Web development", "Testing", "Support desks"],
    summary: "Build, test and support the software businesses run on.",
  },
  {
    slug: "ai-automation",
    name: "AI and automation",
    status: "later",
    roles: ["Automation assistant", "AI operations"],
    tools: ["Workflow tools", "AI assistants", "Process mapping"],
    summary: "Use AI and automation tools to make everyday work faster and more reliable.",
  },
  {
    slug: "business-ops",
    name: "Business and operations",
    status: "later",
    roles: ["Project coordinator", "Operations assistant", "Business analyst"],
    tools: ["Planning", "Process improvement", "Customer support"],
    summary: "Keep projects, teams and customers moving.",
  },
  {
    slug: "creative",
    name: "Creative and commercial",
    status: "later",
    roles: ["Digital marketing assistant", "Content producer", "Sales support"],
    tools: ["Campaigns", "Design", "Content", "Analytics"],
    summary: "Help businesses reach and keep customers.",
  },
];

export const pilot = [
  { days: "Days 1–30", title: "Prepare", text: "Interview employers and applicants, recruit mentors, and set learning outcomes, projects and assessment criteria." },
  { days: "Days 31–45", title: "Recruit and assess", text: "Select a first cohort of about 10–15 participants and measure their starting skills." },
  { days: "Days 46–75", title: "Train and deliver projects", text: "Practical sessions, supervised assignments, mentor reviews and project demonstrations." },
  { days: "Days 76–90", title: "Demonstrate and evaluate", text: "Portfolios presented to employers, interviews and placements arranged, lessons recorded for the next cohort." },
];

export type Metric = { area: string; name: string; definition: string };

export const metrics: Metric[] = [
  { area: "Reach", name: "Applications", definition: "Complete applications received for the cohort." },
  { area: "Reach", name: "Completion rate", definition: "Participants who finished the programme, out of those who started." },
  { area: "Learning", name: "Skills gain", definition: "Average change between baseline and final assessment scores." },
  { area: "Experience", name: "Projects completed", definition: "Supervised projects delivered and assessed. Simulated and real briefs are counted separately." },
  { area: "Employment", name: "Interviews", definition: "Participants who had at least one employer interview." },
  { area: "Employment", name: "Offers", definition: "Participants who received a job, internship or paid project offer." },
  { area: "Employment", name: "Placed at 3 months", definition: "Participants in paid work 3 months after the programme ends." },
  { area: "Employment", name: "Still employed at 12 months", definition: "Participants in paid work 12 months after the programme ends." },
  { area: "Cost", name: "Cost per completion", definition: "Total delivery cost divided by participants who completed." },
];

export const faqs: { q: string; a: string; group: "Learners" | "Employers" | "General" }[] = [
  { group: "Learners", q: "Who can apply?", a: "Recent graduates, current undergraduates in their final year, and career changers who can commit the hours each week. You do not need previous work experience. That is what the programme gives you." },
  { group: "Learners", q: "How much does it cost?", a: "Our aim is that no capable person is turned away because of money. Pilot places will be sponsored wherever funding allows. We will confirm the cost of your place in writing before you commit to anything." },
  { group: "Learners", q: "Can I take part from anywhere?", a: "Training and most projects run online, so you can join from most countries. Some placements may need you to be in a particular city. We will tell you before you accept." },
  { group: "Learners", q: "Is a job guaranteed?", a: "No. Nobody can honestly guarantee a job. We promise structured training, supervised projects, verified evidence of your skills, and introductions to employers. We publish our results so you can judge for yourself." },
  { group: "Learners", q: "Who sees my information?", a: "Only our programme team, until you choose to share your profile with employers. You can withdraw that consent at any time." },
  { group: "Employers", q: "What does it cost to work with you?", a: "Providing a project brief or mentoring is free. Recruitment services, tailored training and sponsored places are paid. We agree terms in writing before anything starts." },
  { group: "Employers", q: "How much time does a project brief take?", a: "Usually two to four hours to scope the brief with us, then about one hour a week for check-ins while the project runs." },
  { group: "Employers", q: "Who owns the work from a project?", a: "Ownership, confidentiality and intellectual property are agreed in writing before the project starts. Participants keep the right to describe the work in their portfolio unless you agree otherwise together." },
  { group: "General", q: "Are you a charity or a company?", a: "We are designing DataLearn as a social enterprise: it should generate enough income to last while measuring its impact openly. The legal structure is being finalised with qualified advisers." },
  { group: "General", q: "Where are you based?", a: "We work online with participants and employers in many countries. The location of the first cohort will be announced with the pilot." },
];

export type Founder = { name: string; role: string; photo: string; photoPosition?: string; bio: string; bioToConfirm: boolean };

// Replace each bio with the founder's own words. Bios stay marked "To confirm" until bioToConfirm is false.
export const founders: Founder[] = [
  {
    name: "Lara Onuwa-Abiamuwe",
    role: "Co-founder",
    photo: "/founders/lara-onuwa-abiamuwe.jpg",
    photoPosition: "50% 18%",
    bio: "Lara co-founded DataLearn to give capable people a fair, structured route from learning into meaningful work, and to give employers a better way to find them.",
    bioToConfirm: true,
  },
  {
    name: "Adetunji Philip",
    role: "Co-founder",
    photo: "/founders/adetunji-philip.jpg",
    photoPosition: "50% 30%",
    bio: "Adetunji co-founded DataLearn to turn practical projects and verified evidence into a bridge employers trust, so that talent is judged on what it can do.",
    bioToConfirm: true,
  },
];

export const marquee = [
  "Data analysis",
  "SQL",
  "Dashboards",
  "Mentored projects",
  "Verified portfolios",
  "Employer interviews",
  "Paid project work",
  "Sponsored places",
  "Python basics",
  "Presenting findings",
  "Alumni network",
];
