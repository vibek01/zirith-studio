export interface KeyPoint {
  number: string
  heading: string
  body: string
}

export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  description: string
  src: string
  featured: boolean
  // Extended fields for case study pages
  heroHeading: string
  heroSummary: string
  category: string
  year: string
  deliverable: string
  keyPoints: KeyPoint[]
  challenge: string
  outcome: string
  accentColor: string
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'tensor-mesh',
    title: 'Tensor Mesh',
    subtitle: 'Optimizing AI Performance',
    description:
      'Visualizing complex KV cache management and resource allocation for large transformer models. Cinematic 3D motion translating heavy backend engineering into clear, engaging value.',
    src: '/videos/tensor-mesh.mp4',
    featured: true,
    // Case study
    heroHeading: 'Making AI Infrastructure\nHuman-Readable.',
    heroSummary:
      'Tensor Mesh needed to explain a deeply technical concept — KV cache management — to investors, enterprise buyers, and developer teams. We turned heavy backend engineering into cinematic 3D motion that made the value impossible to ignore.',
    category: 'SaaS Explainer',
    year: '2025',
    deliverable: 'Technical Product Video',
    challenge:
      'KV cache management is notoriously abstract. Prospects either glazed over or required a 45-minute engineering call just to understand why it mattered. Tensor Mesh needed a video that could replace those calls entirely.',
    outcome:
      'After deploying the video on their pricing page and outbound sequences, Tensor Mesh reported a 38% reduction in sales cycle length and a measurable uptick in enterprise demo requests within 60 days.',
    accentColor: '#0A4AEB',
    keyPoints: [
      {
        number: '01',
        heading: 'KV Cache Fundamentals',
        body: 'During text processing, models store data as K and V tensors from previous steps to skip redundant computations — dramatically speeding up inference. We animated this invisible process into a clear visual story.',
      },
      {
        number: '02',
        heading: 'Smart Resource Management',
        body: 'Because GPU VRAM is limited, Tensor Mesh uses LM cache to temporarily move older KV caches to CPU RAM, local SSDs, or shared storage instead of evicting them — preserving performance without hardware upgrades.',
      },
      {
        number: '03',
        heading: 'Cache Hit Rate Visualization',
        body: 'A "cache hit" is recorded every time a KV cache is successfully retrieved from secondary storage and moved back into GPU VRAM. We made this metric tangible — turning invisible efficiency into a dashboard metric buyers could feel.',
      },
      {
        number: '04',
        heading: 'System-Wide Benefits',
        body: 'Monitoring the cache hit rate allows Tensor Mesh to ensure smarter resource management and maintain optimal processing speed for AI models at scale. The video closed the loop: from concept to business outcome.',
      },
    ],
  },
  {
    id: 'interval',
    title: 'Interval Valuation',
    subtitle: 'Modernizing Property Workflows',
    description:
      'A cloud-based digital transformation explainer. We replaced boring Word and Excel workflow explanations with sleek, high-retention motion design.',
    src: '/videos/interval.mp4',
    featured: false,
    heroHeading: 'Turning Complex Workflows\nInto Effortless Motion.',
    heroSummary:
      'Interval is a cloud-based valuation platform replacing antiquated Word and Excel-driven processes. The challenge was to make a highly process-heavy product feel modern, frictionless, and desirable — in under two minutes.',
    category: 'B2B Explainer',
    year: '2025',
    deliverable: 'Platform Walkthrough Video',
    challenge:
      'Property valuation software is inherently process-dense. Interval\'s competitors were using screen-recordings and bullet-point slides. We needed to position Interval as the premium, enterprise-grade alternative without overwhelming viewers.',
    outcome:
      'Interval embedded the video across their outbound email campaigns and product landing page. Open-rate-to-demo conversion lifted significantly as prospects arrived already pre-sold on the platform\'s capabilities.',
    accentColor: '#0A4AEB',
    keyPoints: [
      {
        number: '01',
        heading: 'Comprehensive Reporting',
        body: 'The platform enables creation of standard-perfect reports for any property type — residential, commercial, industrial, and land — all from a single unified interface. We animated each report type to feel effortless.',
      },
      {
        number: '02',
        heading: 'Multiple Methodologies',
        body: 'Valuers can utilize market, income, cost, and residual valuation approaches within a single workflow. The video demonstrated how switching between methodologies takes seconds, not setup days.',
      },
      {
        number: '03',
        heading: 'End-to-End Management',
        body: 'From terms of engagement and conflict of interest consents to investigation reports and full audit trails — every step of the valuation process lives in one place. We structured the video to follow this natural flow.',
      },
      {
        number: '04',
        heading: 'Global Standard Compliance',
        body: 'All reports are designed to cover global Redbook VPS3 requirements. For international enterprise buyers, this was the decisive signal. We placed it at the strategic close of the video\'s persuasion arc.',
      },
      {
        number: '05',
        heading: 'Online Repository & Integrations',
        body: 'Each valuation includes a password-protected web page storing headline information, high-resolution media, and third-party integrations like Matterport virtual tours. A feature that was invisible became a visual centerpiece.',
      },
      {
        number: '06',
        heading: 'Operational Efficiency',
        body: 'By automating cumbersome tasks, the platform allows valuers to focus on client care and analysis while reducing errors and liability. We ended the video on this emotional benefit — more time for the work that matters.',
      },
    ],
  },
  {
    id: 'isobuilder',
    title: 'ISOBuilder',
    subtitle: 'Hazardous Energy Management',
    description:
      'Comparing traditional P&ID methods with digital precision. Motion crafted to highlight error reduction, safety compliance, and software interactivity.',
    src: '/videos/isobuilder.mp4',
    featured: false,
    heroHeading: 'Safety-Critical Software\nMade Undeniably Clear.',
    heroSummary:
      'ISOBuilder digitizes the creation of equipment isolation lists — a safety-critical process traditionally done with printed P&IDs and handwritten notes. The video needed to make the old way look dangerous, and the new way look inevitable.',
    category: 'Industrial SaaS',
    year: '2026',
    deliverable: 'Comparison Explainer Video',
    challenge:
      'Safety compliance software has a conservative buyer — facilities managers and HSE directors who are sceptical of change. We had to validate their current frustration, acknowledge the risk of switching, then make ISOBuilder the obvious, safe choice.',
    outcome:
      'ISOBuilder reported that the video became their primary sales asset for enterprise pilots. The direct comparison approach meant prospects arrived at demos with a clear mental model of the problem, compressing the sales cycle.',
    accentColor: '#0A4AEB',
    keyPoints: [
      {
        number: '01',
        heading: 'The Traditional Approach',
        body: 'Reviewing printed P&IDs, manually identifying isolation points, and recording details by hand. We animated this process with deliberate friction — each step slow, error-prone, and cognitively expensive — making the status quo feel uncomfortable.',
      },
      {
        number: '02',
        heading: 'The ISOBuilder Approach',
        body: 'Users click on isolation points directly on an interactive P&ID. The software automatically populates all relevant details into the equipment isolation list. We made this feel instant and inevitable — a complete contrast to the manual flow.',
      },
      {
        number: '03',
        heading: 'Error Elimination',
        body: 'Manual entry errors are the primary source of isolation list failures — and failures in hazardous energy management can be catastrophic. The video made the stakes visceral, then showed ISOBuilder removing the human error vector entirely.',
      },
      {
        number: '04',
        heading: 'Safety & Compliance',
        body: 'ISOBuilder improves accuracy, helps ensure compliance, and boosts overall productivity. The compliance angle was critical for HSE directors with regulatory obligations. We positioned ISOBuilder as a defence mechanism, not just a productivity tool.',
      },
    ],
  },
  {
    id: 'contacted',
    title: 'Contacted.io',
    subtitle: 'AI Voice Assistants',
    description:
      'A dynamic product launch VSL showcasing 24/7 natural voice interactions, seamless integrations, and FAQ tuning to drive immediate sales.',
    src: '/videos/contacted.mp4',
    featured: false,
    heroHeading: 'A Product Launch VSL\nBuilt to Close.',
    heroSummary:
      'Contacted needed more than an explainer — they needed a Video Sales Letter that drove immediate free trial signups. We engineered every frame around behavioral momentum: hook, desire, proof, CTA.',
    category: 'Product Launch VSL',
    year: '2026',
    deliverable: 'Video Sales Letter',
    challenge:
      'The AI voice assistant space is saturated. Contacted needed to immediately differentiate their product — natural speech, not robotic responses — and move viewers from awareness to a free trial in under 90 seconds.',
    outcome:
      'The VSL was deployed as the hero asset on the Contacted.io landing page and in paid social campaigns. Free trial signups increased in the first month post-launch, with the video cited in investor materials as a core growth asset.',
    accentColor: '#0A4AEB',
    keyPoints: [
      {
        number: '01',
        heading: 'Natural 24/7 Interactions',
        body: 'The assistant responds naturally to spoken customer inquiries faster than traditional chatbots — with no robotic delay or scripted feel. We opened the video with a live interaction demo to make this immediacy visceral.',
      },
      {
        number: '02',
        heading: 'Zero-Code Setup',
        body: 'Train an assistant in minutes by uploading files or adding a website URL — no technical skills required. The simplicity was a core differentiator. We showed the setup flow in real-time to make "anyone can do this" undeniable.',
      },
      {
        number: '03',
        heading: 'FAQ Tuning Dashboard',
        body: 'A dashboard allows easy updates to ensure the assistant provides correct information when it encounters edge cases. We positioned this as proactive quality control — the brand stays in control of every conversation.',
      },
      {
        number: '04',
        heading: 'Deep Tool Integration',
        body: 'The platform connects with Zoom, Salesforce, and custom APIs for tasks like booking, routing, and support. The integration screen was designed to feel like a power-user reveal — escalating desire in the final act of the VSL.',
      },
      {
        number: '05',
        heading: 'Free Trial CTA Architecture',
        body: 'The video closed with a direct, confident CTA for a free trial at contacted.io. The entire narrative arc was engineered to make this final moment feel like the only logical next step — not a request, but an inevitability.',
      },
    ],
  },
]