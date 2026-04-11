'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'fr' | 'ar';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.home':        { fr: 'Accueil',        ar: 'الرئيسية' },
  'nav.about':       { fr: 'À Propos',       ar: 'عن المحامي' },
  'nav.services':    { fr: 'Services',        ar: 'الخدمات' },
  'nav.blog':        { fr: 'Blog',            ar: 'المدونة' },
  'nav.contact':     { fr: 'Contact',         ar: 'اتصل بنا' },
  'nav.consult':     { fr: 'Consultation',    ar: 'استشارة' },

  // Hero
  'hero.badge':      { fr: 'Avocat au Barreau de Casablanca', ar: 'محامٍ لدى نقابة الدار البيضاء' },
  'hero.title1':     { fr: 'Excellence',      ar: 'التميز' },
  'hero.title2':     { fr: 'Juridique',       ar: 'القانوني' },
  'hero.title3':     { fr: '& Intégrité',     ar: 'والنزاهة' },
  'hero.desc':       { fr: 'Un accompagnement juridique personnalisé, rigoureux et confidentiel. Votre défense est notre priorité absolue.', ar: 'مرافقة قانونية شخصية وصارمة وسرية. دفاعك هو أولويتنا المطلقة.' },
  'hero.cta1':       { fr: 'Prendre RDV',     ar: 'احجز موعداً' },
  'hero.cta2':       { fr: 'Nos Services',    ar: 'خدماتنا' },
  'hero.stat1':      { fr: 'Années d\'expérience', ar: 'سنوات الخبرة' },
  'hero.stat2':      { fr: 'Affaires gagnées', ar: 'قضايا رابحة' },
  'hero.stat3':      { fr: 'Clients satisfaits', ar: 'عملاء راضون' },

  // About
  'about.badge':     { fr: 'À Propos',        ar: 'نبذة عنّا' },
  'about.title':     { fr: 'Maître Abdessamad Ratby', ar: 'الأستاذ عبد الصمد راتبي' },
  'about.desc1':     { fr: 'Avocat au Barreau de Casablanca spécialisé en Droit des Affaires et Contentieux.', ar:'محامٍ في نقابة المحامين بالدار البيضاء متخصص في قانون الأعمال والتقاضي' },
  'about.desc2':     { fr: 'Maître Ratby met à profit son expertise juridique rigoureuse pour accompagner les entreprises et les particuliers.', ar: 'يستغل المحامي راتبي خبرته لأنه بسبب الشركات والأفراد. بفضل خبرته الراسخة في الشركات المرموقة والإدارة القانونية، يقدم نهجاً استراتيجياً ومتعدد التخصصات.' },
  'about.exp':       { fr: '5+ ans d\'expérience', ar: '+5 سنة خبرة' },
  'about.lang':      { fr: 'Arabe • Français • Anglais', ar: 'العربية • الفرنسية • الإنجليزية' },
  'about.bar':       { fr: 'Barreau de Casablanca', ar: 'نقابة المحامين بالدار البيضاء' },

  // Services
  'services.badge':  { fr: 'Domaines d\'Expertise', ar: 'مجالات الخبرة' },
  'services.title':  { fr: 'Nos Domaines de Pratique', ar: 'مجالات ممارستنا' },
  's1.title':        { fr: 'Droit des Affaires',    ar: 'قانون الأعمال' },
  's1.desc':         { fr: 'Conseil juridique pour entreprises, contrats commerciaux, fusions et acquisitions.', ar: 'استشارات قانونية للشركات والعقود التجارية والاندماجات والاستحواذات.' },
  's2.title':        { fr: 'Droit de la Famille',   ar: 'قانون الأسرة' },
  's2.desc':         { fr: 'Divorce, garde d\'enfants, successions et partages patrimoniaux.', ar: 'الطلاق وحضانة الأطفال والميراث وتقسيم الأموال.' },
  's3.title':        { fr: 'Droit Immobilier',      ar: 'قانون العقارات' },
  's3.desc':         { fr: 'Transactions immobilières, litiges fonciers et baux commerciaux.', ar: 'المعاملات العقارية والنزاعات المتعلقة بالأراضي وعقود الإيجار التجارية.' },
  's4.title':        { fr: 'Contentieux Pénal',     ar: 'النزاعات الجنائية' },
  's4.desc':         { fr: 'Défense pénale, assistance aux victimes et représentation devant les tribunaux.', ar: 'الدفاع الجنائي ومساعدة الضحايا والتمثيل أمام المحاكم.' },
  's5.title':        { fr: 'Droit du Travail',      ar: 'قانون العمل' },
  's5.desc':         { fr: 'Litiges employeur-employé, licenciements, négociations collectives.', ar: 'نزاعات أصحاب العمل والموظفين والفصل التعسفي والمفاوضات الجماعية.' },
  's6.title':        { fr: 'Droit Administratif',  ar: 'القانون الإداري' },
  's6.desc':         { fr: 'Recours administratifs, marchés publics et contentieux avec l\'État.', ar: 'الطعون الإدارية والصفقات العمومية والنزاعات مع الدولة.' },

  // Blog
  'blog.badge':      { fr: 'Articles Juridiques', ar: 'مقالات قانونية' },
  'blog.title':      { fr: 'Notre Blog',          ar: 'مدونتنا' },
  'blog.readmore':   { fr: 'Lire la suite →',     ar: '← اقرأ المزيد' },
  'blog.empty':      { fr: 'Aucun article pour le moment.', ar: 'لا توجد مقالات حالياً.' },

  // Contact
  'contact.badge':   { fr: 'Contact',             ar: 'التواصل' },
  'contact.title':   { fr: 'Nous Contacter',      ar: 'تواصل معنا' },
  'contact.name':    { fr: 'Votre Nom',            ar: 'اسمك' },
  'contact.email':   { fr: 'Votre Email',          ar: 'بريدك الإلكتروني' },
  'contact.phone':   { fr: 'Téléphone',            ar: 'الهاتف' },
  'contact.subject': { fr: 'Sujet',                ar: 'الموضوع' },
  'contact.message': { fr: 'Votre Message',        ar: 'رسالتك' },
  'contact.send':    { fr: 'Envoyer →',            ar: '← إرسال' },
  'contact.address': { fr: 'Adresse',              ar: 'العنوان' },
  'contact.hours':   { fr: 'Heures d\'ouverture',  ar: 'ساعات العمل' },
  'contact.hours.val': { fr: 'Lun – Ven: 9h – 18h\nSam: 9h – 13h', ar: 'الإثنين – الجمعة: 9 – 18\nالسبت: 9 – 13' },
  'contact.addr.val':  { fr: '157 LOT CHAHDIA, RUE 86 N8, Casablanca 20220', ar: '157 LOT  CHAHDIA, RUE 86 N8, Casablanca 20220' },
  'contact.success':   { fr: 'Message envoyé avec succès!', ar: 'تم إرسال رسالتك بنجاح!' },

  // Footer
  'footer.rights':   { fr: 'Tous droits réservés', ar: 'جميع الحقوق محفوظة' },
  'footer.tagline':  { fr: 'L\'excellence juridique à votre service.', ar: 'التميز القانوني في خدمتك.' },
  'footer.privacy':  { fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' },
  'footer.terms':    { fr: 'Conditions générales', ar: 'الشروط والأحكام' },

  // Whatsapp
  'whatsapp.tooltip': { fr: 'Chattez sur WhatsApp', ar: 'تحدث عبر واتساب' },

  // Lang toggle
  'lang.switch':     { fr: 'عربي', ar: 'Français' },
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const toggleLang = () => setLang(l => l === 'fr' ? 'ar' : 'fr');

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
