export type Publication = {
  id?: string;
  citation: string;
  /** Author list in citation order, e.g. "Xia, M., Xie, H., Liu, Q., et al." */
  authors?: string;
  venue: string;
  year: number;
  role?: "first" | "co" | "equal";
  doi?: string;
  url?: string;
  pdf?: string;
  /** Direct Google Scholar article URL; falls back to Scholar search if omitted. */
  scholarUrl?: string;
  highlight?: string;
};

export type ResearchFigure = {
  src: string;
  alt: string;
  caption: string;
  source?: string;
};

export type ResearchProject = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  period: string;
  status?: string;
  tags: string[];
  heroImage?: string;
  heroAlt?: string;
  pullQuote: string;
  abstract: string;
  sections: { heading: string; body: string }[];
  outcomes?: string[];
  figures?: ResearchFigure[];
  relatedPublicationIds?: string[];
  externalLinks?: { label: string; href: string }[];
};

export type PersonalPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export const personalPhotos = {
  headshot: {
    src: "/photos/headshot.png",
    alt: "Qiong Liu, Ph.D.",
  },
  award: {
    src: "/photos/snmmi-young-investigator-award.png",
    alt: "Qiong Liu receiving the SNMMI Cardiovascular Young Investigator Award",
    caption:
      "SNMMI Cardiovascular Young Investigator Award (1st Place), 2025.",
  },
  graduationPortrait: {
    src: "/photos/graduation-portrait.png",
    alt: "Qiong Liu in Yale doctoral regalia at commencement",
    caption: "Ph.D. commencement, Yale, 2025.",
  },
  graduationOutdoor: {
    src: "/photos/graduation-yale-outdoor.png",
    alt: "Qiong Liu with advisor on Yale campus at graduation",
    caption: "Yale Engineering, Class of 2025.",
  },
  speakingSNMMI: {
    src: "/photos/snmmi-presentation-2023.png",
    alt: "Qiong Liu presenting at SNMMI 2023",
    caption: "Oral presentation, SNMMI Annual Meeting, 2023.",
  },
  speakingIEEE: {
    src: "/photos/ieee-presentation-2024.jpg",
    alt: "Qiong Liu presenting at IEEE NSS/MIC 2024",
    caption: "Patlak-guided self-supervised denoising, IEEE NSS/MIC 2024.",
  },
} as const;

export type RoleEvidence = {
  label: string;
  href: string;
};

export type RoleProfile = {
  slug: string;
  title: string;
  /** Tooltip + screen-reader hint for what the role link opens */
  linkHint: string;
  summary: string;
  qualifications: string[];
  evidence: RoleEvidence[];
};

export const roleProfiles: RoleProfile[] = [
  {
    slug: "ai-machine-learning-scientist",
    title: "AI / Machine Learning Scientist",
    linkHint:
      "Opens a fit summary — qualifications and related experience for this role",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    qualifications: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    ],
    evidence: [
      {
        label: "Canon Medical — AI Scientist",
        href: "/experience/canon-reconstruction-scientist",
      },
      {
        label: "Cardiac PET motion correction",
        href: "/research/cardiac-pet-motion-correction",
      },
      { label: "Patents (pending)", href: "/patents" },
    ],
  },
  {
    slug: "computer-vision-engineer",
    title: "Computer Vision Engineer",
    linkHint:
      "Opens a fit summary — how image analysis and registration experience map to CV roles",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
    qualifications: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.",
    ],
    evidence: [
      {
        label: "EdgeFuse motion correction",
        href: "/research/cardiac-pet-motion-correction",
      },
      {
        label: "Yale Ph.D. — quantitative imaging",
        href: "/experience/yale-pet-center-phd",
      },
      { label: "Curriculum vitae", href: "/cv" },
    ],
  },
  {
    slug: "deep-learning-engineer",
    title: "Deep Learning Engineer",
    linkHint:
      "Opens a fit summary — training pipelines, denoising, and deployment-oriented work",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
    qualifications: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      "Nullam dictum felis eu pede mollis pretium. Integer tincidunt.",
      "Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend.",
    ],
    evidence: [
      {
        label: "Patlak self-supervised denoising",
        href: "/research/patlak-self-supervised-denoising",
      },
      {
        label: "Canon research intern — efficient denoising",
        href: "/experience/canon-research-intern",
      },
      {
        label: "Personalized PET denoising",
        href: "/research/personalized-pet-denoising",
      },
    ],
  },
  {
    slug: "imaging-perception-engineer",
    title: "Imaging & Perception Engineer",
    linkHint:
      "Opens a fit summary — spatiotemporal sensing, motion, and quantitative perception",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    qualifications: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
      "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien.",
    ],
    evidence: [
      {
        label: "ATTR parametric PET",
        href: "/research/attr-parametric-pet",
      },
      {
        label: "Canon — reconstruction & gating",
        href: "/experience/canon-reconstruction-scientist",
      },
      { label: "Patents (pending)", href: "/patents" },
    ],
  },
  {
    slug: "research-scientist-ml",
    title: "Research Scientist (ML)",
    linkHint:
      "Opens a fit summary — publications, awards, and research-led ML contributions",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    qualifications: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    ],
    evidence: [
      {
        label: "Yale PET Center — Ph.D.",
        href: "/experience/yale-pet-center-phd",
      },
      { label: "Publications", href: "/publications" },
      {
        label: "SNMMI Young Investigator (blog)",
        href: "/blog/snmmi-2025-young-investigator",
      },
    ],
  },
];

export const site = {
  name: "Qiong Liu",
  credentials: "Ph.D.",
  title: "AI Scientist",
  headline: "Deep Learning · Computer Vision · Image Analysis",
  affiliation: "Canon Medical Research USA",
  tagline:
    "I build production-ready deep learning for image and spatiotemporal data — motion modeling, denoising, registration, and quantitative reconstruction — proven in medical imaging and transferable to robotics, autonomy, and industrial vision.",
  openTo:
    "Open to ML engineer, computer vision, and AI scientist roles across medical imaging, robotics, autonomy, industrial inspection, and scientific computing.",
  industryApplications: [
    "Medical & scientific imaging",
    "Robotics & autonomy",
    "Industrial inspection",
    "Video & sensor analytics",
    "R&D and product teams",
  ],
  email: "qiongliu.work@gmail.com",
  phone: "475-280-1364",
  location: "Vernon Hills, IL",
  workAuthorization: "Authorized to work in the U.S. without sponsorship",
  links: {
    linkedin: "https://www.linkedin.com/in/qiong-l-529b23196",
    scholar: "https://scholar.google.com/citations?user=SvnpHCkAAAAJ&hl=en",
    yaleNews:
      "https://medicine.yale.edu/news-article/snm-mi-honors-yale-researchers-with-awards-at-2025-annual-meeting/",
    cv: "/Qiong_Liu_CV.pdf",
  },
  intro: [
    [
      "I'm an AI Scientist at ",
      {
        text: "Canon Medical Research USA",
        href: "/experience/canon-reconstruction-scientist",
      },
      ", designing end-to-end deep learning pipelines for dynamic image analysis — motion correction, low-SNR denoising, registration, and quantitative reconstruction — with patents pending and paths toward product deployment.",
    ],
    [
      "My Ph.D. from ",
      {
        text: "Yale University",
        href: "/experience/yale-pet-center-phd",
      },
      " trained me in rigorous experiment design for noisy, high-dimensional imaging: self-supervised learning, physics-informed models, and validation that preserves the signals downstream teams actually use — skills that transfer directly to robotics, industrial vision, and scientific imaging beyond healthcare.",
    ],
    [
      "My research has been recognized with ",
      { text: "three SNMMI awards", href: "/cv#awards" },
      ", including the ",
      {
        text: "2025 Cardiovascular Young Investigator Award (1st place)",
        href: "/blog/snmmi-2025-young-investigator",
      },
      ", and ",
      { text: "two patents pending", href: "/patents" },
      " as lead inventor.",
    ],
  ] satisfies readonly RichText[],
} as const;

export type TextLink = {
  text: string;
  href: string;
};

export type RichText = readonly (string | TextLink)[];

export type StatIconId = "papers" | "awards" | "patents" | "institution";

export type SiteStat = {
  value: string;
  label: string;
  icon: StatIconId;
  href?: string;
};

export type AwardItem = {
  title: string;
  year: number;
  note?: string;
  href?: string;
};

export const stats: readonly SiteStat[] = [
  {
    value: "10+",
    label: "Peer-reviewed papers",
    icon: "papers",
    href: "/publications",
  },
  {
    value: "3",
    label: "SNMMI awards",
    icon: "awards",
    href: "/cv#awards",
  },
  {
    value: "2",
    label: "Patents pending",
    icon: "patents",
    href: "/patents",
  },
  {
    value: "5",
    label: "Years at Yale PET Center",
    icon: "institution",
    href: "/experience/yale-pet-center-phd",
  },
];

export const researchProjects: ResearchProject[] = [
  {
    slug: "attr-parametric-pet",
    number: "01",
    title: "Parametric Cardiac PET for ATTR Amyloidosis",
    subtitle:
      "Dynamic ¹⁸F-flutemetamol PET methods that quantify treatment response in transthyretin cardiac amyloidosis.",
    period: "2022 — 2026",
    status: "Journal of Nuclear Medicine, 2026",
    tags: ["Cardiovascular", "Kinetic modeling", "Clinical translation"],
    heroImage: "/research/attr-pet-pipeline.png",
    heroAlt: "End-to-end pipeline for dynamic 18F-flutemetamol cardiac PET",
    pullQuote:
      "Volume of distribution decreased significantly after six months of tafamidis (2.11 → 1.96, p = 0.046).",
    abstract:
      "Static SUV measurements inadequately capture tracer kinetics in transthyretin cardiac amyloidosis. I developed dynamic parametric PET methods using metabolite-corrected input functions and multilinear analysis to quantify myocardial volume of distribution—producing image-derived biomarkers sensitive enough to detect treatment-related changes after six months of tafamidis therapy.",
    sections: [
      {
        heading: "Why static SUV falls short",
        body: "In ATTR cardiac amyloidosis, ¹⁸F-flutemetamol binds to misfolded transthyretin deposits in the myocardium. Clinical practice has relied on static standardized uptake values (SUV), but these miss the temporal information that distinguishes specific tracer binding from blood-pool and non-specific uptake. Reliable quantification of amyloid burden—and the ability to detect treatment response—requires dynamic kinetic modeling.",
      },
      {
        heading: "Method",
        body: "I built an end-to-end pipeline combining (1) image-derived input functions corrected for blood-to-plasma ratios and metabolite breakdown, (2) a two-tissue reversible compartment model fit with V_B estimated from the first 10 minutes, and (3) multilinear analysis (MA1) over 2–20 min to generate parametric V_T images. The pipeline was validated against echocardiography, ⁸²Rb myocardial blood flow, and clinical biomarkers.",
      },
      {
        heading: "Findings",
        body: "Across 12 treatment-naive ATTR-CA patients scanned at baseline and after six months of tafamidis: mean myocardial blood volume V_B was 22% ± 6%. MA1 with 2–20 min data produced the lowest-variance V_T maps. Crucially, V_T decreased significantly with treatment—from 2.11 ± 0.33 to 1.96 ± 0.20 (p = 0.046)—demonstrating sensitivity to therapeutic effect not visible in static SUV.",
      },
      {
        heading: "Clinical impact",
        body: "Dynamic ¹⁸F-flutemetamol PET enables robust, image-based quantification of myocardial amyloid burden and supports treatment monitoring. The framework is generalizable to other cardiac amyloid tracers and to longitudinal clinical trials.",
      },
    ],
    outcomes: [
      "SNMMI Young Investigator Award, 1st Place (Cardiovascular Council Clinical Science), 2025",
      "Accepted, Journal of Nuclear Medicine, 2026",
      "SNMMI Young Investigator Award, 2nd Place, 2023 (earlier kinetic modeling work)",
    ],
    figures: [
      {
        src: "/research/attr-pet-pipeline.png",
        alt: "Cardiac PET analysis pipeline",
        caption:
          "End-to-end workflow: dynamic frames, myocardium and blood-pool masks, population-based corrections, compartment modeling, and parametric V_T maps.",
      },
      {
        src: "/research/attr-dynamic-pet.png",
        alt: "Dynamic PET frames for two patients",
        caption:
          "Representative dynamic ¹⁸F-flutemetamol PET sequences (10s → 50 min) supporting kinetic analysis.",
      },
      {
        src: "/research/attr-vt-polarmaps.png",
        alt: "Per-patient VT polar maps",
        caption:
          "Polar maps of myocardial V_T at baseline (Scan 1) vs. after 6 months of tafamidis (Scan 2) across all 12 patients.",
      },
    ],
    relatedPublicationIds: ["liu2026parametric"],
  },
  {
    slug: "personalized-pet-denoising",
    number: "02",
    title: "Personalized Deep Learning Denoising for Low-Count PET",
    subtitle:
      "A blending strategy that turns the noise-vs-blur tradeoff into a dial clinicians can tune.",
    period: "2020 — 2022",
    status: "Physics in Medicine & Biology, 2022",
    tags: ["Deep learning", "Low-count PET", "Quantitative imaging"],
    heroImage: "/research/denoising-personalized-framework.png",
    heroAlt: "Personalized denoising framework combining two U-Net models",
    pullQuote:
      "One-size-fits-all denoising fails across clinical noise levels. Personalize the inference instead.",
    abstract:
      "Deep learning PET denoisers are typically trained on a single noise level, then deployed against highly variable clinical data. We characterized this mismatch, then proposed a personalized strategy: blend the outputs of two U-Nets trained on different count levels using a tunable weight, exposing the noise-vs-resolution tradeoff to the clinical user.",
    sections: [
      {
        heading: "The problem with one model for all noise",
        body: "Real clinical PET varies in count level by an order of magnitude—patient size, injected dose, scan time, and protocol all contribute. A model trained on a single noise distribution either over-smooths low-noise data or under-denoises noisier data. A larger 'one-size-fits-all' training set helps on average but generalizes poorly to the tails.",
      },
      {
        heading: "Five models, five behaviors",
        body: "We trained five 3D U-Nets on disjoint 20%, 30%, 40%, 50%, and 60% count-level subsets, plus a sixth model on the full mixed distribution. Across all six, a clear pattern emerged: models trained on noisier data denoise more aggressively but blur fine structure; models trained on cleaner data preserve detail but leave residual noise. The mixed model split the difference but was best at neither task.",
      },
      {
        heading: "Personalized blending",
        body: "Rather than picking one operating point, we blend two complementary models at inference time: Final = α · UNet₂₀(x) + (1 − α) · UNet₆₀(x). Sweeping α exposes a continuous tradeoff. Noisier inputs benefit from higher α (more aggressive denoising); cleaner inputs need lower α. Different downstream tasks—structural similarity, MSE, lesion detectability—prefer different operating points, and clinicians can tune accordingly.",
      },
      {
        heading: "Results",
        body: "On held-out clinical data, the personalized blend dominated both single-noise-level models and the one-size-fits-all baseline on SSIM and MSE across a wide range of input noise. The 20%-count-trained model produced the best liver lesion detectability when used alone—a task-specific operating point unavailable from a single fixed network.",
      },
    ],
    outcomes: [
      "Published in Physics in Medicine & Biology, 2022",
      "Foundation for follow-up work on population-based deep image priors",
      "Cited and extended by collaborators at multiple institutions",
    ],
    figures: [
      {
        src: "/research/denoising-personalized-framework.png",
        alt: "Personalized denoising framework",
        caption:
          "Two U-Nets (trained at 20% and 60% count levels) combined with weight α. The single dial replaces choosing between models.",
      },
      {
        src: "/research/denoising-model-comparison.png",
        alt: "Model comparison across noise levels",
        caption:
          "Comparison of five models plus the mixed-training baseline against ground truth. Yellow values mark per-row best MSE/PSNR/SSIM.",
      },
      {
        src: "/research/denoising-noise-levels.png",
        alt: "Representative PET images across noise groups",
        caption:
          "Whole-body PET across five count-level groups motivates the need for noise-aware inference rather than a single fixed denoiser.",
      },
    ],
    relatedPublicationIds: ["liu2022personalized", "liu2024population"],
  },
  {
    slug: "patlak-self-supervised-denoising",
    number: "03",
    title: "Patlak-Guided Self-Supervised Dynamic PET Denoising",
    subtitle:
      "Self-supervised denoising that respects tracer kinetics—no paired training data required.",
    period: "2023 — 2026",
    status: "IEEE TRPMS, 2026",
    tags: ["Self-supervised learning", "Physics-informed AI", "Dynamic PET"],
    pullQuote:
      "Denoising should not flatten kinetics. Build the kinetic constraint into the loss.",
    abstract:
      "Supervised denoising in dynamic PET requires paired low/high-count training data that is impractical to collect for many tracers. We developed a self-supervised approach guided by Patlak kinetics: the loss enforces consistency with the underlying tracer behavior, preserving the parametric information that downstream quantification depends on.",
    sections: [
      {
        heading: "Why supervised learning struggles in dynamic PET",
        body: "Each dynamic PET acquisition produces a high-dimensional 4D dataset and rarely has a matched high-count ground truth at every frame. Supervised denoisers often degrade quantitative accuracy: per-frame restoration looks reasonable visually while subtly distorting the temporal curves used for kinetic modeling.",
      },
      {
        heading: "Patlak as a physics-informed prior",
        body: "Patlak graphical analysis linearizes irreversible tracer uptake into a slope (K_i) and intercept. We use this linearity as a structural prior in a self-supervised training objective: the denoised frames must produce a Patlak fit consistent with the noisy observations, while the spatial denoising loss removes per-frame noise. The kinetic constraint prevents the network from finding shortcuts that improve voxel-wise MSE at the cost of temporal fidelity.",
      },
      {
        heading: "Outcome",
        body: "Across multiple subjects and acquisition protocols, Patlak-guided self-supervised denoising produced lower-noise dynamic frames with downstream parametric quantification that matched or exceeded supervised baselines—without paired training data. The framework generalizes to other linearizable kinetic models.",
      },
    ],
    outcomes: [
      "Oral presentation, IEEE NSS/MIC 2024",
      "Accepted, IEEE Transactions on Radiation and Plasma Medical Sciences, 2026",
    ],
    figures: [
      {
        src: "/photos/ieee-presentation-2024.jpg",
        alt: "Qiong Liu presenting Patlak-guided self-supervised denoising",
        caption:
          "Oral presentation at IEEE NSS/MIC 2024, Tampa.",
      },
    ],
    relatedPublicationIds: ["liu2026patlak"],
  },
  {
    slug: "cardiac-pet-motion-correction",
    number: "04",
    title: "EdgeFuse: Edge-Guided Motion Correction & Dual Gating",
    subtitle:
      "Two patent-pending frameworks for cardiac PET — one extracts physiological motion from the data; the other corrects for it.",
    period: "2024 — Present",
    status: "Two patents pending · Canon Medical Research USA",
    tags: ["Motion correction", "Patent pending", "Signal processing"],
    pullQuote:
      "Smooth deformation fields blur the myocardium. Sharp fields amplify noise. The answer is spatially adaptive.",
    abstract:
      "At Canon Medical Research USA, I lead two parallel motion-correction efforts for dynamic cardiac PET. The first—a data-driven dual gating method—extracts respiratory and cardiac motion signals directly from PET data without external gating hardware. The second—EdgeFuse—fuses deformation fields with spatially varying smoothness, preserving myocardial boundaries while keeping background motion smooth.",
    sections: [
      {
        heading: "Automatic Cardiac–Respiratory Dual Gating",
        body: "Conventional cardiac PET relies on ECG and respiratory belts for gating, which adds workflow complexity and fails when external signals are noisy or unavailable. I developed a framework that combines autoencoder feature learning, PCA, and frequency-domain decomposition to extract respiratory and cardiac motion signals directly from the dynamic PET sequence. The extracted cardiac signal was validated against ECG; the respiratory signal was visually validated against high-temporal-resolution mini-frame movies of the diaphragm.",
      },
      {
        heading: "EdgeFuse: Spatially Adaptive Deformation Field Fusion",
        body: "Standard deformable registration uses a single global smoothness prior. Too smooth and myocardial boundaries blur; too sharp and background regions develop spurious distortions. EdgeFuse maintains two deformation fields trained with different smoothness constraints and fuses them with an edge-aware spatial weighting—sharp where structure matters, smooth elsewhere. The result is improved lesion localization and quantitative accuracy without sacrificing global motion stability.",
      },
      {
        heading: "Integration",
        body: "Both methods plug into the broader reconstruction pipeline alongside denoising and quantitative assessment. The dual gating output feeds motion correction; the corrected images feed parametric analysis. The full pipeline is being evaluated for clinical use in collaboration with physicians and product teams.",
      },
    ],
    outcomes: [
      "Patent pending: Edge-Guided Deformation Field Fusion for PET Motion Correction (Lead Inventor)",
      "Patent pending: Automatic Data-Driven Cardiac-Respiratory Gating (Lead Inventor)",
    ],
    relatedPublicationIds: [],
  },
];

export const expertise = [
  {
    category: "Core ML & Computer Vision",
    items: [
      "Deep learning (CNNs, transformers, diffusion)",
      "Self-supervised & physics-informed learning",
      "Image segmentation, registration & restoration",
      "Spatiotemporal & video sequence modeling",
      "Evaluation design for noisy, real-world data",
    ],
  },
  {
    category: "Signals, Motion & Quantification",
    items: [
      "Motion correction & deformation fields",
      "Dual-signal / multi-component decomposition",
      "Low-SNR denoising & noise modeling",
      "Parametric imaging & quantitative biomarkers",
      "End-to-end training → inference pipelines",
    ],
  },
  {
    category: "Domain depth (medical imaging)",
    items: [
      "Dynamic PET & tracer kinetics",
      "Cardiac imaging & clinical translation",
      "Patent-pending reconstruction methods",
      "Cross-functional work with physicians & product teams",
    ],
  },
  {
    category: "Programming & Tools",
    items: ["Python", "PyTorch", "NumPy", "SciPy", "MATLAB", "Git"],
  },
] as const;

export type TeachingActivity = {
  title: string;
  period?: string;
  role?: string;
  details: readonly string[];
};

export type ExperienceRole = {
  slug: string;
  org: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: readonly string[];
  teaching?: readonly TeachingActivity[];
  relatedResearchSlugs?: readonly string[];
};

export type Patent = {
  slug: string;
  title: string;
  status: string;
  role: string;
  year: string;
  description: string;
  relatedResearchSlug?: string;
};

export const experience: ExperienceRole[] = [
  {
    slug: "canon-reconstruction-scientist",
    org: "Canon Medical Research USA",
    role: "Reconstruction Scientist",
    location: "Vernon Hills, IL",
    period: "Apr 2025 — Present",
    summary:
      "Full-time AI role building motion correction, dual-signal gating, and reconstruction pipelines for dynamic 4D imaging — from research prototypes through validation to product-oriented collaboration.",
    highlights: [
      "AI-driven motion correction and reconstruction for dynamic cardiac PET under noisy, low-count conditions.",
      "Automatic cardiac-respiratory dual gating from dynamic PET sequences (patent pending).",
      "EdgeFuse: edge-guided deformation field fusion for cardiac PET motion correction (patent pending).",
      "End-to-end pipelines spanning preprocessing, training, inference, motion correction, denoising, and quantitative assessment.",
    ],
    relatedResearchSlugs: ["cardiac-pet-motion-correction"],
  },
  {
    slug: "canon-research-intern",
    org: "Canon Medical Research USA",
    role: "Research Scientist Intern",
    location: "Vernon Hills, IL",
    period: "Jun 2023 — May 2024",
    summary:
      "Internship focused on efficient deep-learning denoising and physics-informed noise modeling for low-SNR PET, plus scatter estimation to accelerate reconstruction workflows.",
    highlights: [
      "Efficient attention-based denoising with modified transformer architectures.",
      "Physics-informed noise modeling for signal-dependent noise in low-SNR PET.",
      "Deep learning scatter estimation, removing a reconstruction-pipeline bottleneck.",
    ],
    relatedResearchSlugs: [
      "personalized-pet-denoising",
      "patlak-self-supervised-denoising",
    ],
  },
  {
    slug: "yale-pet-center-phd",
    org: "Yale University PET Center",
    role: "Ph.D. Researcher",
    location: "New Haven, CT",
    period: "Aug 2020 — May 2025",
    summary:
      "Doctoral research on quantitative dynamic imaging — self-supervised denoising, kinetic modeling, and clinical studies — plus teaching and mentoring in analysis pipelines transferable to any image-domain ML team.",
    highlights: [
      "AI and quantitative methods for dynamic cardiac PET, tracer kinetic modeling, and parametric imaging.",
      "Led clinical ATTR-CA studies with dynamic ¹⁸F-flutemetamol PET and tafamidis treatment monitoring.",
      "Self-supervised and deep-image-prior denoising preserving kinetic modeling accuracy.",
      "Close collaboration with cardiologists and nuclear medicine physicians at Yale New Haven Hospital.",
    ],
    teaching: [
      {
        title: "Yale PET Center — trainee instruction",
        period: "2021 — 2025",
        role: "Mentoring & workshops",
        details: [
          "Mentored rotation students and undergraduate researchers on dynamic PET kinetic modeling, parametric imaging, and analysis pipelines in Python and MATLAB.",
          "Led hands-on workshops on Patlak analysis, metabolite-corrected input functions, and quality control for PET Center fellows and visiting scholars.",
        ],
      },
      {
        title: "Yale Biomedical Engineering — graduate seminars",
        period: "2022 — 2024",
        role: "Guest lecturer",
        details: [
          "Invited lectures on deep learning for low-count PET, physics-informed denoising, and translating quantitative imaging methods for clinical research audiences.",
        ],
      },
    ],
    relatedResearchSlugs: [
      "attr-parametric-pet",
      "patlak-self-supervised-denoising",
    ],
  },
  {
    slug: "united-imaging-intern",
    org: "United Imaging Healthcare",
    role: "Student Intern",
    location: "Wuhan, China",
    period: "Jul 2019 — Aug 2019",
    summary:
      "Summer internship on surgical robotics: image registration, system validation, and performance evaluation for clinical deployment.",
    highlights: [
      "Surgical robotics system development and testing: image registration, system validation, performance evaluation.",
    ],
  },
];

export const patents: Patent[] = [
  {
    slug: "edgefuse-motion-correction",
    title: "Edge-Guided Deformation Field Fusion for PET Motion Correction",
    status: "Patent Pending",
    role: "Lead Inventor",
    year: "2026",
    description:
      "Adaptively combines deformation fields to preserve myocardial boundaries and improve quantitative accuracy in cardiac PET motion correction.",
    relatedResearchSlug: "cardiac-pet-motion-correction",
  },
  {
    slug: "cardiac-respiratory-gating",
    title: "Automatic Data-Driven Cardiac-Respiratory Gating",
    status: "Patent Pending",
    role: "Lead Inventor",
    year: "2025",
    description:
      "Extracts respiratory and cardiac physiological motion signals from dynamic PET data without external gating hardware.",
    relatedResearchSlug: "cardiac-pet-motion-correction",
  },
];

export function getPatentBySlug(slug: string) {
  return patents.find((p) => p.slug === slug);
}

export const allPublications: Publication[] = [
  {
    id: "liu2026parametric",
    citation:
      "Parametric cardiac imaging with ¹⁸F-flutemetamol PET to evaluate the impact of tafamidis in patients with transthyretin cardiac amyloidosis",
    venue: "Journal of Nuclear Medicine",
    year: 2026,
    role: "first",
    highlight: "SNMMI YIA 1st Place, 2025",
    doi: "10.2967/jnumed.125.270003",
  },
  {
    id: "liu2026patlak",
    citation: "Patlak-guided self-supervised learning for dynamic PET denoising",
    venue: "IEEE Transactions on Radiation and Plasma Medical Sciences",
    year: 2026,
    role: "first",
  },
  {
    id: "liu2024population",
    citation:
      "Population-based deep image prior for dynamic PET denoising: a data-driven approach to improve parametric quantification",
    venue: "Medical Image Analysis",
    year: 2024,
    role: "first",
    doi: "10.1016/j.media.2024.103180",
    url: "https://doi.org/10.1016/j.media.2024.103180",
  },
  {
    id: "liu2022personalized",
    citation:
      "A personalized deep learning denoising strategy for low-count PET images",
    venue: "Physics in Medicine & Biology",
    year: 2022,
    role: "first",
    doi: "10.1088/1361-6560/ac783d",
    url: "https://doi.org/10.1088/1361-6560/ac783d",
  },
  {
    citation:
      "LeqMod: adaptable lesion-quantification-consistent modulation for deep learning low-count PET image denoising",
    authors: "Xia, M., Xie, H., Liu, Q., et al.",
    venue: "IEEE Transactions on Medical Imaging",
    year: 2025,
    role: "co",
    doi: "10.1109/TMI.2025.3618247",
  },
  {
    citation:
      "Anatomically and metabolically informed diffusion for unified denoising and segmentation in low-count PET imaging",
    authors: "Xia, M., Ko, K.-Y., Wang, D.-S., Chen, M.-K., Liu, Q., et al.",
    venue: "Medical Image Analysis",
    year: 2025,
    role: "co",
    doi: "10.1016/j.media.2025.103831",
  },
  {
    citation:
      "A generalizable diffusion framework for 3D low-dose and few-view cardiac SPECT imaging",
    authors: "Xie, H., Gan, W., Ji, W., Chen, X., Liu, Q., et al.",
    venue: "Medical Image Analysis",
    year: 2025,
    role: "co",
    doi: "10.1016/j.media.2025.103729",
  },
  {
    citation:
      "DuDoCFNet: Dual-Domain Coarse-to-Fine Progressive Network for Simultaneous Denoising, Limited-View Reconstruction, and Attenuation Correction of Cardiac SPECT",
    authors: "Chen, X., Zhou, B., Guo, X., Xie, H., Liu, Q., et al.",
    venue: "IEEE Transactions on Medical Imaging",
    year: 2024,
    role: "co",
    doi: "10.1109/TMI.2024.3514925",
  },
  {
    citation:
      "TAI-GAN: A Temporally and Anatomically Informed GAN for early-to-late frame conversion in dynamic cardiac PET inter-frame motion correction",
    authors: "Guo, X., Shi, L., Chen, X., Liu, Q., et al.",
    venue: "Medical Image Analysis",
    year: 2024,
    role: "co",
    doi: "10.1016/j.media.2024.103190",
  },
  {
    citation:
      "FedFTN: personalized federated learning with deep feature transformation network for multi-institutional low-count PET denoising",
    authors: "Zhou, B., Xie, H., Liu, Q., et al.",
    venue: "Medical Image Analysis",
    year: 2023,
    role: "co",
    doi: "10.1016/j.media.2023.102993",
  },
];

export const conferencePresentations: Publication[] = [
  {
    citation:
      "Effect of Six-Month Tafamidis Treatment on Dynamic ¹⁸F-Flutemetamol PET in ATTR Cardiac Amyloidosis",
    venue: "SNMMI Annual Meeting (Oral)",
    year: 2025,
    role: "first",
  },
  {
    citation:
      "Patlak-Guided Self-Supervised Learning for Dynamic PET Denoising",
    venue: "IEEE NSS/MIC (Oral)",
    year: 2024,
    role: "first",
  },
  {
    citation:
      "Comparison of network structures for deep learning-based cardiac PET scatter correction",
    venue: "IEEE NSS/MIC (Poster)",
    year: 2024,
    role: "first",
  },
  {
    citation:
      "Prompt Attention Convolution Net (PAC-Net) for low-count Zr-89 CD8 ImmunoPET denoising",
    venue: "SNMMI Annual Meeting",
    year: 2024,
    role: "first",
  },
  {
    citation:
      "Dynamic imaging and tracer kinetic modeling of ¹⁸F-flutemetamol PET for ATTR cardiac amyloidosis patients",
    venue: "SNMMI Annual Meeting (Oral)",
    year: 2023,
    role: "first",
    highlight: "SNMMI YIA 2nd Place, 2023",
  },
  {
    citation:
      "Population-based Deep Image Prior for Dynamic PET Denoising",
    venue: "IEEE NSS/MIC (Oral)",
    year: 2023,
    role: "first",
  },
  {
    citation:
      "Prompts-matched Deep Learning Denoising for Standard-Count and Low-Count Whole-body Dynamic PET",
    venue: "IEEE NSS/MIC (Oral)",
    year: 2022,
    role: "first",
  },
  {
    citation:
      "The impact of noise level mismatch between training and testing images for deep learning-based PET denoising",
    venue: "SNMMI Annual Meeting (Oral)",
    year: 2021,
    role: "first",
  },
  {
    citation: "Noise-aware Network for Low-dose PET Denoising",
    venue: "IEEE NSS/MIC Workshop",
    year: 2022,
    role: "equal",
  },
];

export const education = [
  {
    school: "Yale University",
    degree: "Ph.D. in Biomedical Engineering",
    period: "2020 — 2025",
    detail:
      "Thesis: Improving Image Quality and Quantification Accuracy for Static and Dynamic PET",
    advisors: "Chi Liu, Ph.D. · Richard E. Carson, Ph.D.",
    href: "/experience/yale-pet-center-phd",
  },
  {
    school: "Huazhong University of Science and Technology",
    degree: "B.S. in Biomedical Engineering, Minor in Computer Science",
    period: "2016 — 2020",
    detail: "GPA: 3.94 / 4.00",
  },
] as const;

export const awards: { org: string; items: AwardItem[] }[] = [
  {
    org: "Society of Nuclear Medicine and Molecular Imaging",
    items: [
      {
        title:
          "Young Investigator Award, 1st Place — Cardiovascular Council Clinical Science",
        year: 2025,
        note: "Parametric ¹⁸F-flutemetamol PET for ATTR cardiac amyloidosis",
        href: "/blog/snmmi-2025-young-investigator",
      },
      {
        title:
          "Poster Award, 2nd Place — Physics, Instrumentation & Data Sciences",
        year: 2024,
        href: "/research/attr-parametric-pet",
      },
      {
        title:
          "Young Investigator Award, 2nd Place — Cardiovascular Council",
        year: 2023,
        note: "Dynamic ¹⁸F-flutemetamol PET kinetic modeling for ATTR-CA",
        href: "/research/attr-parametric-pet",
      },
    ],
  },
  {
    org: "Mitacs",
    items: [{ title: "Globalink Research Award", year: 2019 }],
  },
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readMinutes: number;
  tags: string[];
  excerpt: string;
  pullQuote?: string;
  sections: { heading?: string; body: string }[];
  relatedLinks?: { label: string; href: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "snmmi-2025-young-investigator",
    title: "What winning SNMMI Young Investigator taught me about clinical PET science",
    date: "2025-06-12",
    readMinutes: 6,
    tags: ["SNMMI", "ATTR", "Clinical translation"],
    excerpt:
      "Reflections from the 2025 Cardiovascular Young Investigator Award — bridging kinetic modeling, physician collaboration, and what it takes to move parametric PET toward the clinic.",
    pullQuote:
      "The best imaging science answers a question clinicians are already asking.",
    sections: [
      {
        body: "Presenting parametric ¹⁸F-flutemetamol PET work at SNMMI 2025 was a milestone — not because of the award itself, but because it validated a direction I've pursued since my first ATTR amyloidosis studies at Yale: quantitative imaging should change how we measure treatment response, not just how pretty the pictures look.",
      },
      {
        heading: "From polar maps to treatment decisions",
        body: "Our pipeline extracts Patlak slope and distribution volume from dynamic PET, then maps them onto standard polar displays cardiologists already use for perfusion. That design choice matters. A new metric nobody reads is a metric that never influences care. When physicians can see parametric change alongside familiar anatomy, the conversation shifts from \"interesting research\" to \"how soon can we use this?\"",
      },
      {
        heading: "What I'd tell early-career imaging scientists",
        body: "Invest in the clinical question early. Talk to referring physicians before you finalize the network architecture. Build validation that mirrors how images will actually be read — including reader studies when possible. And don't underestimate the value of clear visual summaries: one well-labeled polar map often communicates more than a table of SUV ratios.",
      },
      {
        body: "I'm grateful to my Yale PET Center mentors and collaborators at Canon Medical Research USA who continue pushing this work toward broader evaluation. If you're working at the intersection of cardiovascular PET and machine learning, I'd love to hear from you.",
      },
    ],
    relatedLinks: [
      {
        label: "Yale Medicine — SNMMI 2025 awards coverage",
        href: "https://medicine.yale.edu/news-article/snm-mi-honors-yale-researchers-with-awards-at-2025-annual-meeting/",
      },
    ],
  },
  {
    slug: "physics-informed-pet-denoising",
    title: "Why physics-informed beats one-size-fits-all for PET denoising",
    date: "2024-11-03",
    readMinutes: 8,
    tags: ["Deep learning", "Denoising", "PET physics"],
    excerpt:
      "Low-count PET is not a single problem — scan time, tracer, and reconstruction all change the noise structure. Here's how personalized training changes the game.",
    pullQuote:
      "The noise you see in a 2-minute scan is not the noise in a 10-minute scan.",
    sections: [
      {
        body: "Deep learning denoisers trained on high-count reference images often fail when deployed on short acquisitions — not because the network is weak, but because the noise distribution shifted. In cardiac and neurology PET, scan time is frequently constrained by patient tolerance and throughput, so denoising must generalize across count levels without retraining from scratch each time.",
      },
      {
        heading: "Personalized noise models",
        body: "Our framework conditions denoising on estimated noise level and reconstruction context, using physics-based simulation to span the acquisition space during training. The goal isn't photorealistic texture — it's preserving uptake ratios and kinetic parameters physicians rely on. We evaluate with Patlak slope stability, lesion contrast, and reader preference, not PSNR alone.",
      },
      {
        heading: "Self-supervision when paired data is scarce",
        body: "Fully supervised denoising needs matched high/low count pairs, which are expensive in clinical workflow. Self-supervised and Patlak-guided objectives let the network learn from single acquisitions by exploiting temporal structure in dynamic PET. That matters for multi-center studies where you can't always control acquisition protocols.",
      },
      {
        body: "The broader lesson: imaging AI should respect physics first and aesthetics second. When denoising improves parametric quantification, it earns a place in the reconstruction pipeline — not just as a post-processing pretty filter.",
      },
    ],
  },
  {
    slug: "motion-correction-without-belts",
    title: "Extracting cardiac and respiratory motion from PET — no belts required",
    date: "2024-08-19",
    readMinutes: 7,
    tags: ["Motion correction", "Cardiac PET", "Canon Medical"],
    excerpt:
      "External gating hardware adds workflow friction. Data-driven dual gating and EdgeFuse deformation offer a path toward motion-corrected cardiac PET that starts from the emission data itself.",
    sections: [
      {
        body: "Dynamic cardiac PET is exquisitely sensitive to motion — a few millimeters of misregistration can bias Patlak slopes and wall uptake. Clinics routinely gate with ECG and respiratory belts, but belts fail, signals drift, and setup time adds burden. At Canon Medical Research USA, I've been building methods that recover physiological motion directly from the PET time series.",
      },
      {
        heading: "Dual gating from the data",
        body: "By combining learned temporal features, PCA, and frequency analysis, we separate cardiac and respiratory components without external hardware. Cardiac traces align with ECG in validation studies; respiratory patterns match diaphragm motion on high-temporal-resolution reconstructions. The payoff is a gating signal available even when belts are missing or unreliable.",
      },
      {
        heading: "EdgeFuse: when one smoothness prior isn't enough",
        body: "Deformable registration traditionally applies uniform smoothness — too much blurs the myocardium, too little warps the background. EdgeFuse trains two fields at different smoothness levels and fuses them with edge-aware weights: sharp at boundaries, smooth elsewhere. Lesion localization and quantitative accuracy improve without sacrificing global stability.",
      },
      {
        body: "Motion correction isn't an isolated module — it feeds denoising, parametric imaging, and clinical read workflows. The next step is rigorous multi-site evaluation with physicians who will ultimately trust the images at the bedside.",
      },
    ],
  },
];

export function getPublicationById(id: string) {
  return allPublications.find((p) => p.id === id);
}

export function getResearchProjectBySlug(slug: string) {
  return researchProjects.find((p) => p.slug === slug);
}

export function getExperienceBySlug(slug: string) {
  return experience.find((e) => e.slug === slug);
}

export function getRoleProfileBySlug(slug: string) {
  return roleProfiles.find((r) => r.slug === slug);
}

export function roleProfileHref(slug: string) {
  return `/roles/${slug}` as const;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatBlogDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const publications = {
  firstAuthor: allPublications.filter((p) => p.role === "first"),
  coAuthor: allPublications.filter((p) => p.role === "co"),
  selectedTalks: conferencePresentations.slice(0, 4),
};
