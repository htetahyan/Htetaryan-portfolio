// Projects data - easily reorder by moving items in the array
// The first item appears at the top

export interface Project {
    id: string;
    title: string;
    service: string;
    client: string;
    year: string;
    description: string;
    roles: string[];
    link?: string;
    color: string;
    images: string[];
}

export const projects: Project[] = [
    // ========== TOP FEATURED PROJECTS ==========
    {
        id: "01",
        title: "Standigy(support ninja)",
        service: "Full-Stack Development",
        client: "lodash venture",
        year: "2025",
        description:
            "Customer conversion outsourcing platform for SaaS companies. Helps streamline the customer conversion process from freemium to premium, ensuring a seamless experience that drives revenue.",
        roles: ["Development", "Landing Page", "Analytics"],
        link: "http://supportninja.com/",
        color: "#f97316",
        images: [
            "/projects/standigy1.png",
            "/projects/standigy2.png",
            "/projects/standigy3.png",
        ],
    },
    {
        id: "02",
        title: "ClickMinded",
        service: "Full-Stack Development",
        client: "lodash venture",
        year: "2025",
        description:
            "A 'Marketing Operating System' providing AI tools, SOPs, and courses to help agencies and marketers 10x their traffic. Features a comprehensive resource library, AI-powered prompts, and streamlined campaign management.",
        roles: ["Full-Stack", "AI Tools", "Resource Library"],
        link: "https://clickminded.com",
        color: "#0084f4",
        images: [
            "/projects/clickminded1.png",
            "/projects/clickminded2.png",
            "/projects/clickminded3.png",
        ],
    },
    {
        id: "03",
        title: "NextStep Visa",
        service: "Web Development",
        client: "NextStep",
        year: "2025",
        description:
            "Comprehensive visa services platform trusted by 10,000+ applicants worldwide. Features Schengen visa services, travel planning, and curated journeys across Europe, Asia, and the Middle East.",
        roles: ["Full Stack", "UI/UX", "SEO Optimization", "CMS"],
        link: "https://nextsteptravelandtourism.com/",
        color: "#22c55e",
        images: [
            "/projects/nextstep1.png",
            "/projects/nextstep2.png",
            "/projects/nextstep3.png",
        ],
    },
    {
        id: "04",
        title: "Gold Tower Agent Portal",
        service: "Full-Stack Development",
        client: "Gold Tower",
        year: "2025",
        description:
            "Agent portal for Gold Tower Academy with student management, commission tracking, and payment processing. Features dashboard analytics, student enrollment, and earnings overview.",
        roles: ["Full-Stack", "Dashboard", "Payment tracking"],

        color: "#eab308",
        images: [
            "/projects/goldtower1.png",
            "/projects/goldtower2.png",
            "/projects/goldtower3.png",
        ],
    },
    {
        id: "05",
        title: "Raytheon Book",
        service: "Web Development",
        client: "personal",
        year: "2023",
        description:
            "Interactive digital book platform developed for Raytheon. Features smooth page transitions, high-resolution graphics, and an immersive user experience designed for professional training.",
        roles: ["Full Stack", "UI/UX", "Interactive Design"],
        color: "#d1d5db",
        images: [
            "/projects/rayteonbook1.png",
            "/projects/rayteonbook2.png",
            "/projects/rayteonbook3.png",
        ],
    },

    {
        id: "06",
        title: "Content Writer",
        service: "Full-Stack Development",
        client: "personal",
        year: "2024",
        description:
            "Best Burmese content generation platform for social media. Create engaging posts for Facebook, Instagram, Twitter and all major social platforms. Trusted by 10,000+ creators with 4.9/5 rating.",
        roles: ["Full-Stack", "AI Content", "Social Media"],
        link: "https://content-padauk.vercel.app/",
        color: "#f59e0b",
        images: [
            "/projects/contentwriter1.png",
            "/projects/contentwriter2.png",
            "/projects/contentwriter3.png",
        ],
    },
    {
        id: "07",
        title: "ARA International",
        service: "Web Development",
        client: "Freelance",
        year: "2024",
        description:
            "Corporate website for ARA International Company, empowering Myanmar talent for global opportunities through comprehensive training, international partnerships, and career development programs.",
        roles: ["Frontend", "Corporate Site", "UI/UX"],
        link: "https://arainternational.org/",
        color: "#3b82f6",
        images: [
            "/projects/ara1.png",
            "/projects/ara2.png",
            "/projects/ara3.png",
        ],
    },
    {
        id: "08",
        title: "Everlasting Peace Travel",
        service: "Web Development",
        client: "Freelance",
        year: "2024",
        description:
            "Travel agency website featuring breathtaking destinations and unforgettable memories. Book expert-guided tours to experience the world's most beautiful places with curated travel packages.",
        roles: ["Frontend", "Booking System", "UI/UX"],
        link: "https://www.everlastingpeacetravel.com/",
        color: "#06b6d4",
        images: [
            "/projects/ever1.png",
            "/projects/ever2.png",
            "/projects/ever3.png",
        ],
    },
    {
        id: "09",
        title: "Earthquake Alert",
        service: "Full-Stack Development",
        client: "EDUSN",
        year: "2025",
        description:
            "Real-time earthquake alert system for Myanmar, providing instant notifications and updates. Tracks earthquake data including magnitude, location, and aftershock information with accurate pricing for donations.",
        roles: ["Full-Stack", "Real-time Data", "Alert System"],
        link: "https://earthquake-edusn.vercel.app/",
        color: "#ef4444",
        images: [
            "/projects/earthquakealert1.png",
            "/projects/earthquakealert2.png",
        ],
    },
    {
        id: "10",
        title: "Earthquake Support",
        service: "Full-Stack Development",
        client: "EDUSN",
        year: "2025",
        description:
            "Built a donation platform to support earthquake victims in Myanmar. Features real-time donation tracking, donor management, and transparent fund allocation with over 19 million MMK raised from 176+ donors.",
        roles: ["Full-Stack", "UI/UX", "Real-time Updates"],
        link: "https://donate-earthquake-edusn.vercel.app/",
        color: "#3b82f6",
        images: [
            "/projects/earthquake1.png",
            "/projects/earthquake2.png",
            "/projects/earthquake3.png",
        ],
    },
    {
        id: "11",
        title: "Doszy(landbot)",
        service: "Frontend Development",
        client: "Lodash Venture",
        link: "http://doszy.com/",
        year: "2025",
        description:
            "A creative and intuitive chatbot platform designed to streamline digital workflows.",
        roles: ["Frontend", "Web App", "UI Architecture"],
        color: "#ff3366",
        images: [
            "/projects/doozy1.png",
            "/projects/doozy2.png",
            "/projects/doozy3.png",
        ],
    },
    {
        id: "12",
        title: "TrySkillsTest",
        service: "Full-Stack Development",
        client: "Freelance",
        year: "2024",
        description:
            "AI-powered quiz generation platform that creates skill assessments from job descriptions. Helps recruiters gain deeper insights into candidates' abilities with customizable, detailed analysis.",
        roles: ["Full-Stack", "AI Integration", "SaaS"],
        link: "https://tryskillstest.com",
        color: "#8b5cf6",
        images: [
            "/projects/tryskillstest1.png",
            "/projects/tryskilltest2.png",
            "/projects/tryskillstest3.png",
        ],
    },
];

// Helper function to reorder projects - move item from one index to another
export function reorderProjects(fromIndex: number, toIndex: number): Project[] {
    const result = [...projects];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
}

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}
