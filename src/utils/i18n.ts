// Translations for multi-language support
export type Language = 'id' | 'en';

export interface TranslationMap {
    [key: string]: string;
}

export const translations: Record<Language, TranslationMap> = {
    id: {
        'nav-home': 'BERANDA',
        'nav-about': 'TENTANG',
        'nav-works': 'KARYA',
        'hero-badge': 'System Online // Welcome User',
        'hero-title-1': 'NAUFAL',
        'hero-title-2': 'KHADDAFY',
        'hero-desc': 'Software Engineer yang antusias mengeksplorasi teknologi AI untuk meningkatkan produktivitas pengembangan software dan menciptakan solusi digital yang inovatif.',
        'hero-btn-works': 'LIHAT KARYA',
        'hero-btn-ai': 'AI ASSISTANT',
        'about-badge': '01 // ABOUT_ME',
        'about-title': 'Muhammad Naufal Khaddafy',
        'about-desc': 'Lulusan S1 Informatika dari Universitas Muhammadiyah Malang. Software Engineer dengan ketertarikan mendalam pada pemanfaatan AI dalam pengembangan software, automation workflow, dan tools produktivitas modern.',
        'projects-badge': '04 // SELECTED_WORKS',
        'projects-title': 'LATEST PROJECTS',
        'p1-title': 'eCopy Document Automation',
        'p1-desc': 'Sistem scanning dokumen otomatis untuk workflow perusahaan.',
        'p2-title': 'SPFx Web Parts',
        'p2-desc': 'Pengembangan web parts SharePoint dengan SPFx Framework.',
        'contact-title': 'HUBUNGI SAYA',
        'contact-desc': 'Gunakan AI untuk membuat draft pesan kepada saya.',
        'btn-generate-text': 'BUAT DRAFT AI',
    },
    en: {
        'nav-home': 'HOME',
        'nav-about': 'ABOUT',
        'nav-works': 'WORKS',
        'hero-badge': 'System Online // Welcome User',
        'hero-title-1': 'NAUFAL',
        'hero-title-2': 'KHADDAFY',
        'hero-desc': "Software Engineer passionate about exploring AI technology to enhance software development productivity and create innovative digital solutions.",
        'hero-btn-works': 'EXPLORE WORKS',
        'hero-btn-ai': 'AI ASSISTANT',
        'about-badge': '01 // ABOUT_ME',
        'about-title': 'Muhammad Naufal Khaddafy',
        'about-desc': "Bachelor's degree graduate in Informatics from University of Muhammadiyah Malang. Software Engineer with deep interest in leveraging AI for software development, workflow automation, and modern productivity tools.",
        'projects-badge': '04 // SELECTED_WORKS',
        'projects-title': 'LATEST PROJECTS',
        'p1-title': 'eCopy Document Automation',
        'p1-desc': 'Automated document scanning system for enterprise workflow.',
        'p2-title': 'SPFx Web Parts',
        'p2-desc': 'SharePoint web parts development with SPFx Framework.',
        'contact-title': 'GET IN TOUCH',
        'contact-desc': 'Use AI to draft a message to me.',
        'btn-generate-text': 'GENERATE AI DRAFT',
    },
};

export function getTranslation(lang: Language, key: string): string {
    return translations[lang]?.[key] || key;
}
