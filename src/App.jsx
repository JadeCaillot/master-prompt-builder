import { useState } from "react";

const SECTIONS = [
  {
    id: "identity",
    title: "L'entreprise",
    emoji: "🏢",
    questions: [
      {
        id: "company_name",
        text: "Quel est le nom de votre entreprise ?",
        hint: "Le nom commercial tel qu'il apparait sur vos supports de communication.",
        type: "text",
        placeholder: "Ex : Atelier Dumont, Pavillon de la Muette, izilist...",
      },
      {
        id: "sector",
        text: "Dans quel secteur d'activite etes-vous ?",
        hint: "Soyez precis : pas juste 'événementiel' mais 'lieu événementiel B2B premium' par exemple.",
        type: "text",
        placeholder: "Ex : Startup Deeptech, événementiel B2B premium, Architecture d'intérieure...",
      },
      {
        id: "activity_description",
        text: "En 2-3 phrases, decrivez ce que fait concretement votre entreprise au quotidien.",
        hint: "Ce que vous faites, comment vous le faites, et pour qui - sans jargon.",
        type: "textarea",
        placeholder: "Nous fabriquons / vendons / accompagnons / créons...",
      },
      {
        id: "company_age",
        text: "Depuis combien de temps votre entreprise existe-t-elle ?",
        hint: "L'anciennete peut etre un atout de credibilite dans votre communication.",
        type: "choice",
        choices: ["Moins d'1 an (creation recente)", "1 a 3 ans", "3 a 10 ans", "Plus de 10 ans"],
      },
      {
        id: "team_size",
        text: "Quelle est la taille de votre equipe ?",
        hint: "",
        type: "choice",
        choices: ["Dirigeant seul (solo)", "2 a 5 personnes", "6 a 20 personnes", "Plus de 20 personnes"],
      },
    ],
  },
  {
    id: "tone",
    title: "Ton & voix",
    emoji: "🎙️",
    questions: [
      {
        id: "tone_words",
        text: "Choisissez 3 a 5 adjectifs qui decrivent le mieux la facon dont votre entreprise communique.",
        hint: "Pensez a l'impression que vous voulez laisser apres chaque interaction.",
        type: "tags",
        suggestions: ["Professionnel", "Chaleureux", "Expert", "Accessible", "Dynamique", "Serieux", "Innovant", "Authentique", "Rassurant", "Direct", "Elegant", "Engage", "Local", "Humain", "Audacieux"],
      },
      {
        id: "tone_not",
        text: "Quels styles ou mots voulez-vous ABSOLUMENT eviter dans votre communication ?",
        hint: "Ex : Trop technique, trop familier, trop decontracte, trop commercial, trop froid, trop agressif, trop startupy, trop pompeux, trop emphatique...",
        type: "textarea",
        placeholder: "Ce que nous voulons eviter...",
      },
      {
        id: "vouvoiement",
        text: "Comment vous adressez-vous a vos clients ?",
        hint: "Ce choix doit rester coherent sur tous vos canaux.",
        type: "choice",
        choices: ["Vous (formel, professionnel)", "Tu (proximite, communaute)", "vous (startup, dynamique)", "Les deux selon le contexte"],
      },
      {
        id: "brand_reference",
        text: "Y a-t-il une marque dont vous admirez la communication ?",
        hint: "Pas pour copier, mais pour donner une direction de l'energie visee. Pas necessairement dans votre secteur.",
        type: "text",
        placeholder: "Ex : La Fourche pour l'authenticite, Decathlon pour la simplicite...",
      },
    ],
  },
  {
    id: "brand",
    title: "Essence de marque",
    emoji: "✨",
    questions: [
      {
        id: "mission",
        text: "Quelle est la raison d'être de votre entreprise ? Pourquoi existe-t-elle, au-dela du profit ?",
        hint: "Ce qui vous ferait lever le matin meme sans remuneration. La cause que vous servez.",
        type: "textarea",
        placeholder: "Notre raison d'etre...",
      },
      {
        id: "values",
        text: "Quelles sont les 3 valeurs qui guident toutes vos decisions (recrutement, tarifs, communication) ?",
        hint: "Des valeurs vraiment vecues, pas juste affichees.",
        type: "tags",
        suggestions: ["Qualite", "Proximite", "Innovation", "Durabilite", "Transparence", "Respect", "Excellence", "Simplicite", "Engagement", "Confiance", "Creativite", "Responsabilite", "Partage", "Independance"],
      },
      {
        id: "differentiator",
        text: "Qu'est-ce qui vous distingue reellement de vos concurrents ? Votre vrai avantage ?",
        hint: "Ce que vous seuls faites, ou faites differemment. Méthode, histoire, savoir-faire, equipe...",
        type: "textarea",
        placeholder: "Ce qui nous distingue vraiment...",
      },
      {
        id: "brand_feeling",
        text: "Quand un client interagit avec votre entreprise, comment voulez-vous qu'il se sente ?",
        hint: "Ex : En confiance et bien conseille, fier de son choix, soulage d'avoir trouve la bonne solution...",
        type: "textarea",
        placeholder: "Nous voulons que nos clients se sentent...",
      },
    ],
  },
  {
    id: "audience",
    title: "Clients cibles",
    emoji: "🎯",
    questions: [
      {
        id: "b2b_b2c",
        text: "Vous adressez-vous principalement a :",
        hint: "Cela change fondamentalement la strategie de communication.",
        type: "choice",
        choices: ["Des particuliers (B2C)", "Des entreprises (B2B)", "Les deux (B2C et B2B)", "Des collectivites / associations"],
      },
      {
        id: "client_profile",
        text: "Decrivez votre client ideal en quelques phrases : qui est-il, quelle est sa situation ?",
        hint: "B2C : age, style de vie, revenus, localisation. B2B : taille d'entreprise, secteur, interlocuteur decisionnaire.",
        type: "textarea",
        placeholder: "Notre client ideal est...",
      },
      {
        id: "client_pain",
        text: "Quel est le probleme n1 que ressent votre client AVANT de vous trouver ?",
        hint: "Dans ses propres mots. Ce qu'il tape sur Google, ce qu'il dit a ses proches.",
        type: "textarea",
        placeholder: "Son probleme principal / sa frustration...",
      },
      {
        id: "client_dream",
        text: "Quel est le resultat que votre client espere en faisant appel a vous ?",
        hint: "Son 'avant' vs son 'apres'. Ce pour quoi il est vraiment pret a payer.",
        type: "textarea",
        placeholder: "Ce qu'il espere obtenir / ressentir...",
      },
      {
        id: "client_blocker",
        text: "Quelles sont ses principales objections ou freins a l'achat ?",
        hint: "Ex : Prix trop eleve, peur de se tromper, deja un prestataire, pas le temps...",
        type: "textarea",
        placeholder: "Ses freins et objections les plus frequents...",
      },
    ],
  },
  {
    id: "positioning",
    title: "Positionnement",
    emoji: "📍",
    questions: [
      {
        id: "geographic_scope",
        text: "Quelle est votre zone geographique d'activite ?",
        hint: "",
        type: "choice",
        choices: ["Locale / ville", "Regionale", "Nationale", "Internationale"],
      },
      {
        id: "promise",
        text: "Quelle est votre promesse principale ? Ce que vous garantissez a chaque client ?",
        hint: "En 1 phrase claire. Ce sur quoi vous ne transigez jamais.",
        type: "textarea",
        placeholder: "Notre promesse...",
      },
      {
        id: "price_positioning",
        text: "Comment votre entreprise se positionne-t-elle sur les prix ?",
        hint: "",
        type: "choice",
        choices: ["Entree de gamme / prix bas", "Rapport qualite-prix / milieu de gamme", "Premium / haut de gamme", "Ultra-premium / luxe"],
      },
      {
        id: "positioning_phrase",
        text: "Si vous deviez resumer votre positionnement en une accroche memorable, ce serait quoi ?",
        hint: "Ex : Le plombier qui repond toujours present - ou - La compta sans prise de tete pour les artisans",
        type: "textarea",
        placeholder: "Notre positionnement en une phrase...",
      },
    ],
  },
  {
    id: "ambitions",
    title: "Ambitions 2026",
    emoji: "🚀",
    questions: [
      {
        id: "revenue_goal",
        text: "Quel est l'objectif de chiffre d'affaires ou de croissance vise pour 2026 ?",
        hint: "Une fourchette suffit. Cela permet de calibrer l'intensite de la strategie de communication.",
        type: "text",
        placeholder: "Ex : Atteindre 500K EUR de CA, +30% vs 2025...",
      },
      {
        id: "growth_lever",
        text: "Sur quoi repose principalement votre croissance en 2026 ?",
        hint: "Cochez tout ce qui est prioritaire.",
        type: "tags",
        suggestions: ["Nouveaux clients", "Fidelisation clients existants", "Nouveau produit / service", "Nouveau marche geographique", "Recrutement", "Partenariats", "Montee en gamme", "Automatisation"],
      },
      {
        id: "visibility_goal",
        text: "Quel est votre objectif de visibilite ou de notoriete d'ici fin 2026 ?",
        hint: "Ex : Etre reconnu comme reference locale, apparaitre dans les medias, doubler l'audience du site...",
        type: "textarea",
        placeholder: "Notre objectif de visibilite...",
      },
      {
        id: "priority_challenge",
        text: "Quel est le defi n1 a surmonter pour atteindre vos objectifs 2026 ?",
        hint: "Ex : Recruter, gagner en credibilite, sortir de la dependance au bouche-a-oreille, se digitaliser...",
        type: "textarea",
        placeholder: "Notre principal defi...",
      },
    ],
  },
  {
    id: "offer",
    title: "Offre phare",
    emoji: "💎",
    questions: [
      {
        id: "top_offer_name",
        text: "Comment s'appelle votre offre, produit ou service le plus rentable ou strategique ?",
        hint: "Celui sur lequel vous voulez concentrer vos efforts de communication en priorite.",
        type: "text",
        placeholder: "Nom de l'offre / produit / service phare...",
      },
      {
        id: "top_offer_description",
        text: "Decrivez cette offre en 2-3 phrases : ce que c'est, ce qu'elle inclut, quel resultat elle apporte.",
        hint: "Comme si vous l'expliquiez a un prospect en 30 secondes.",
        type: "textarea",
        placeholder: "Description claire de l'offre...",
      },
      {
        id: "top_offer_price",
        text: "Quel est son prix indicatif ? Et en quoi ce prix est-il justifie par la valeur apportee ?",
        hint: "La justification vous aidera a mieux l'argumenter dans vos contenus.",
        type: "textarea",
        placeholder: "Prix et valeur percue...",
      },
      {
        id: "top_offer_cta",
        text: "Quelle est l'action que vous souhaitez que vos prospects fassent pour acceder a cette offre ?",
        hint: "Ex : Appeler le magasin, remplir un formulaire de devis, reserver en ligne, envoyer un email...",
        type: "text",
        placeholder: "L'action souhaitee (CTA)...",
      },
    ],
  },
  {
    id: "timeline",
    title: "Temporalite",
    emoji: "📅",
    questions: [
      {
        id: "seasonality",
        text: "Votre activite est-elle saisonniere ? Y a-t-il des periodes de forte et faible activite ?",
        hint: "Ex : Pic en decembre, creux en aout, rentree de septembre strategique...",
        type: "textarea",
        placeholder: "Notre saisonnalite et moments cles de l'annee...",
      },
      {
        id: "key_moments",
        text: "Y a-t-il des evenements strategiques prevus dans les 12 prochains mois ?",
        hint: "Ex : Lancement d'un nouveau service, demenagement, recrutement, salon professionnel...",
        type: "textarea",
        placeholder: "Nos prochains evenements importants...",
      },
      {
        id: "content_rhythm",
        text: "A quelle frequence pouvez-vous produire du contenu de facon reguliere ?",
        hint: "Soyez realiste. La regularite prime sur la frequence.",
        type: "choice",
        choices: ["1 fois par semaine", "2 a 3 fois par semaine", "Tous les jours", "Plusieurs fois par jour"],
      },
      {
        id: "who_does_comms",
        text: "Qui gere la communication au sein de votre entreprise ?",
        hint: "Cela conditionne le niveau de complexite des contenus a produire.",
        type: "choice",
        choices: ["Le dirigeant lui-meme", "Un salarie dedie (partiellement)", "Un community manager interne", "Une agence / prestataire externe"],
      },
    ],
  },
  {
    id: "social",
    title: "Objectifs par canal",
    emoji: "📱",
    questions: [
      {
        id: "main_networks",
        text: "Sur quels canaux votre entreprise est-elle presente ou souhaite l'etre ?",
        hint: "Cochez tous ceux qui sont pertinents pour votre activite et votre cible.",
        type: "tags",
        suggestions: ["Instagram", "LinkedIn", "Facebook", "TikTok", "YouTube", "Google Business", "Site web / Blog", "Newsletter", "Pinterest", "WhatsApp Business", "Podcast"],
      },
      {
        id: "network_goals",
        text: "Pour chaque canal coche, quel est l'objectif principal de votre entreprise ?",
        hint: "Ex : LinkedIn pour les leads B2B / Instagram pour fideliser / Google Business pour capter les recherches locales",
        type: "textarea",
        placeholder: "Ex:\nInstagram : ...\nLinkedIn : ...\nFacebook : ...",
      },
      {
        id: "network_kpis",
        text: "Quels indicateurs regardez-vous pour mesurer l'efficacite de votre communication ?",
        hint: "Ex : Nombre de demandes de devis, appels recus, abonnes, taux d'engagement, visites site...",
        type: "textarea",
        placeholder: "Nos indicateurs de performance prioritaires...",
      },
      {
        id: "content_types",
        text: "Quels formats de contenu correspondent le mieux a votre activite et vos ressources ?",
        hint: "Pensez a ce que vous pouvez produire regulierement sans vous epuiser.",
        type: "tags",
        suggestions: ["Photos de produits / realisations", "Videos courtes (Reels/TikTok)", "Temoignages clients", "Conseils pratiques", "Coulisses de l'entreprise", "Actualites / nouveautes", "Promotions / offres", "Articles de blog", "Infographies", "Lives / webinaires"],
      },
    ],
  },
];

const TOTAL_QUESTIONS = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);

function TagSelector({ suggestions, value = [], onChange }) {
  const [custom, setCustom] = useState("");
  const toggle = (tag) => {
    if (value.includes(tag)) onChange(value.filter((t) => t !== tag));
    else onChange([...value, tag]);
  };
  const addCustom = () => {
    const t = custom.trim();
    if (t && !value.includes(t)) { onChange([...value, t]); setCustom(""); }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {suggestions.map((tag) => (
          <button key={tag} onClick={() => toggle(tag)} style={{
            padding: "6px 14px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
            background: value.includes(tag) ? "#1a1a1a" : "transparent",
            color: value.includes(tag) ? "#fff" : "#1a1a1a",
            border: "1.5px solid #1a1a1a", transition: "all 0.15s",
            fontWeight: value.includes(tag) ? "600" : "400",
          }}>{tag}</button>
        ))}
      </div>
      {value.filter(v => !suggestions.includes(v)).length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {value.filter(v => !suggestions.includes(v)).map(tag => (
            <span key={tag} style={{
              padding: "6px 14px", borderRadius: "20px", fontSize: "13px",
              background: "#1a1a1a", color: "#fff", border: "1.5px solid #1a1a1a",
              display: "flex", alignItems: "center", gap: "6px", fontWeight: "600",
            }}>
              {tag}
              <span onClick={() => toggle(tag)} style={{ cursor: "pointer", opacity: 0.7, fontSize: "11px" }}>x</span>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        <input value={custom} onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCustom()}
          placeholder="Ajouter le votre..."
          style={{
            flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1.5px solid #ccc",
            fontSize: "13px", fontFamily: "inherit", outline: "none",
          }} />
        <button onClick={addCustom} style={{
          padding: "8px 14px", borderRadius: "8px", background: "#1a1a1a", color: "#fff",
          border: "none", cursor: "pointer", fontSize: "13px", fontFamily: "inherit",
        }}>+</button>
      </div>
    </div>
  );
}

function ChoiceSelector({ choices, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {choices.map((c) => (
        <button key={c} onClick={() => onChange(c)} style={{
          padding: "12px 16px", borderRadius: "10px", textAlign: "left", cursor: "pointer",
          fontFamily: "inherit", fontSize: "14px", transition: "all 0.15s",
          background: value === c ? "#1a1a1a" : "transparent",
          color: value === c ? "#fff" : "#1a1a1a",
          border: "1.5px solid " + (value === c ? "#1a1a1a" : "#ddd"),
          fontWeight: value === c ? "600" : "400",
        }}>{c}</button>
      ))}
    </div>
  );
}

function buildMasterPrompt(answers) {
  const get = (id) => answers[id] || "Non renseigne";
  const getArr = (id) => Array.isArray(answers[id]) ? answers[id].join(", ") : (answers[id] || "Non renseigne");

  return [
    "# MASTER PROMPT -- " + get("company_name"),
    "## Document source - Communication & Marketing",
    "Genere le " + new Date().toLocaleDateString("fr-FR"),
    "",
    "---",
    "",
    "## PRESENTATION DE L'ENTREPRISE",
    "",
    "Nom : " + get("company_name"),
    "Secteur : " + get("sector"),
    "Anciennete : " + get("company_age"),
    "Taille de l'equipe : " + get("team_size"),
    "",
    "Ce que nous faisons : " + get("activity_description"),
    "",
    "---",
    "",
    "## TON & VOIX DE MARQUE",
    "",
    "Adjectifs de communication : " + getArr("tone_words"),
    "Ce qu'on evite absolument : " + get("tone_not"),
    "Tutoiement / Vouvoiement : " + get("vouvoiement"),
    "Reference de communication : " + get("brand_reference"),
    "",
    "---",
    "",
    "## ESSENCE DE LA MARQUE",
    "",
    "Raison d'etre : " + get("mission"),
    "Valeurs fondamentales : " + getArr("values"),
    "Avantage concurrentiel : " + get("differentiator"),
    "Experience client visee : " + get("brand_feeling"),
    "",
    "---",
    "",
    "## CLIENTS CIBLES",
    "",
    "Type de clientele : " + get("b2b_b2c"),
    "Profil client ideal : " + get("client_profile"),
    "Probleme n1 : " + get("client_pain"),
    "Resultat / transformation attendue : " + get("client_dream"),
    "Freins et objections : " + get("client_blocker"),
    "",
    "---",
    "",
    "## POSITIONNEMENT",
    "",
    "Zone geographique : " + get("geographic_scope"),
    "Promesse principale : " + get("promise"),
    "Positionnement tarifaire : " + get("price_positioning"),
    "Accroche de positionnement : " + get("positioning_phrase"),
    "",
    "---",
    "",
    "## AMBITIONS 2026",
    "",
    "Objectif CA / croissance : " + get("revenue_goal"),
    "Leviers de croissance prioritaires : " + getArr("growth_lever"),
    "Objectif de visibilite : " + get("visibility_goal"),
    "Defi principal : " + get("priority_challenge"),
    "",
    "---",
    "",
    "## OFFRE PHARE (LA PLUS RENTABLE)",
    "",
    "Nom de l'offre : " + get("top_offer_name"),
    "Description : " + get("top_offer_description"),
    "Prix et valeur percue : " + get("top_offer_price"),
    "Call-to-action principal : " + get("top_offer_cta"),
    "",
    "---",
    "",
    "## TEMPORALITE & ORGANISATION",
    "",
    "Saisonnalite : " + get("seasonality"),
    "Evenements strategiques a venir : " + get("key_moments"),
    "Frequence de publication : " + get("content_rhythm"),
    "Responsable de la communication : " + get("who_does_comms"),
    "",
    "---",
    "",
    "## STRATEGIE PAR CANAL",
    "",
    "Canaux actifs : " + getArr("main_networks"),
    "",
    "Objectifs par canal :",
    get("network_goals"),
    "",
    "Indicateurs de performance :",
    get("network_kpis"),
    "",
    "Formats de contenu privilegies : " + getArr("content_types"),
    "",
    "---",
    "",
    "## INSTRUCTIONS POUR L'IA -- A LIRE EN PRIORITE",
    "",
    "Tu es l'assistant communication et marketing de " + get("company_name") + ", entreprise specialisee dans " + get("sector") + ".",
    "",
    "REGLES ABSOLUES :",
    "",
    "Ton & style :",
    "- Adopte systematiquement ce ton : " + getArr("tone_words"),
    "- Adresse-toi aux clients en utilisant le : " + get("vouvoiement"),
    "- Evite absolument : " + get("tone_not"),
    "",
    "Cible :",
    "- Tu t'adresses a : " + get("client_profile"),
    "- Leur probleme principal : " + get("client_pain"),
    "- Ce qu'ils veulent vraiment : " + get("client_dream"),
    "- Les freins a lever dans chaque contenu : " + get("client_blocker"),
    "",
    "Positionnement :",
    "- La promesse de l'entreprise est : " + get("promise"),
    "- Ce qui la distingue : " + get("differentiator"),
    "- L'accroche de reference : " + get("positioning_phrase"),
    "",
    "Objectif commercial prioritaire :",
    "- Mettre en valeur l'offre : " + get("top_offer_name"),
    "- Inciter systematiquement a l'action : " + get("top_offer_cta"),
    "",
    "Contexte 2026 :",
    "- Objectif : " + get("revenue_goal"),
    "- Defi a surmonter : " + get("priority_challenge"),
    "",
    "Chaque contenu produit doit servir la croissance de " + get("company_name") + " et refleter ses valeurs : " + getArr("values") + ".",
  ].join("\n");
}

export default function App() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("intro");
  const [copied, setCopied] = useState(false);

  const section = SECTIONS[sectionIdx];
  const question = section?.questions[questionIdx];
  const currentValue = answers[question?.id] ?? (question?.type === "tags" ? [] : "");
  const setCurrentValue = (val) => setAnswers(prev => ({ ...prev, [question.id]: val }));

  const canNext = () => {
    const v = currentValue;
    if (!v && v !== 0) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== "";
  };

  const globalStep = SECTIONS.slice(0, sectionIdx).reduce((a, s) => a + s.questions.length, 0) + questionIdx + 1;

  const goNext = () => {
    if (questionIdx + 1 < section.questions.length) setQuestionIdx(q => q + 1);
    else if (sectionIdx + 1 < SECTIONS.length) { setSectionIdx(s => s + 1); setQuestionIdx(0); }
    else setPhase("result");
  };

  const goPrev = () => {
    if (questionIdx > 0) setQuestionIdx(q => q - 1);
    else if (sectionIdx > 0) { setSectionIdx(s => s - 1); setQuestionIdx(SECTIONS[sectionIdx - 1].questions.length - 1); }
  };

  const masterPrompt = phase === "result" ? buildMasterPrompt(answers) : "";

  const copyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const isFirst = sectionIdx === 0 && questionIdx === 0;
  const isLast = sectionIdx === SECTIONS.length - 1 && questionIdx === section?.questions.length - 1;

  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', 'Times New Roman', serif", padding: "24px" }}>
      <div style={{ maxWidth: "580px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", marginBottom: "32px", fontFamily: "'Helvetica Neue', sans-serif" }}>
          Outil Communication TPE / PME
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "24px", fontWeight: "normal", letterSpacing: "-1px" }}>
          Construisez le Master Prompt de votre entreprise
        </h1>
        <p style={{ fontSize: "17px", color: "#888", lineHeight: 1.7, marginBottom: "48px", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: "300" }}>
          En {TOTAL_QUESTIONS} questions guidees, creez le document source qui permettra a votre agent IA de produire tous vos contenus marketing en respectant votre ton, votre positionnement et vos objectifs.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "48px" }}>
          {SECTIONS.map(s => (
            <div key={s.id} style={{ background: "#1a1a1a", borderRadius: "12px", padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.emoji}</div>
              <div style={{ fontSize: "11px", color: "#666", fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.5px" }}>{s.title}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setPhase("quiz")} style={{ background: "#f5f0e8", color: "#0e0e0e", border: "none", padding: "18px 48px", borderRadius: "40px", fontSize: "15px", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: "600", letterSpacing: "0.5px" }}>
          Commencer
        </button>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#555", fontFamily: "sans-serif" }}>
          ~15 minutes - {TOTAL_QUESTIONS} questions - Donnees non envoyees
        </p>
      </div>
    </div>
  );

  if (phase === "result") return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", fontFamily: "'Helvetica Neue', sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "48px 0 32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <h1 style={{ color: "#f5f0e8", fontSize: "32px", fontWeight: "300", marginBottom: "8px" }}>
            Votre Master Prompt est pret
          </h1>
          <p style={{ color: "#888", fontSize: "15px" }}>
            Copiez-le dans le champ Instructions systeme de votre agent IA favori.
          </p>
        </div>
        <div style={{ background: "#1a1a1a", borderRadius: "16px", padding: "32px", marginBottom: "24px", border: "1px solid #2a2a2a" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ color: "#888", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>Document source</span>
            <button onClick={copyPrompt} style={{ background: copied ? "#2d6a4f" : "#f5f0e8", color: copied ? "#fff" : "#0e0e0e", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" }}>
              {copied ? "Copie !" : "Copier le prompt"}
            </button>
          </div>
          <pre style={{ color: "#c8b89a", fontSize: "12px", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "500px", overflowY: "auto", fontFamily: "'Courier New', monospace" }}>
            {masterPrompt}
          </pre>
        </div>
        <div style={{ background: "#1a1a1a", borderRadius: "16px", padding: "24px", border: "1px solid #2a2a2a", marginBottom: "32px" }}>
          <h3 style={{ color: "#f5f0e8", fontSize: "16px", marginBottom: "16px", fontWeight: "500" }}>
            Comment utiliser ce prompt ?
          </h3>
          <ol style={{ color: "#888", fontSize: "14px", lineHeight: 2, paddingLeft: "20px", margin: 0 }}>
            <li>Copiez l'integralite du prompt ci-dessus</li>
            <li>Ouvrez votre outil IA (Claude, ChatGPT, Mistral...)</li>
            <li>Creez un nouvel agent personnalise</li>
            <li>Collez-le dans le champ "Instructions systeme"</li>
            <li>Nommez-le (ex : Agent comm NomEntreprise) et enregistrez</li>
            <li>Demandez-lui de creer vos posts, emails, fiches produits... Il parlera au nom de votre entreprise</li>
          </ol>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => { setPhase("quiz"); setSectionIdx(0); setQuestionIdx(0); }} style={{ background: "transparent", color: "#888", border: "1px solid #333", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
            Modifier mes reponses
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", flexDirection: "column", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ height: "3px", background: "#e0d8cc", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ height: "100%", background: "#1a1a1a", width: `${(globalStep / TOTAL_QUESTIONS) * 100}%`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid #e0d8cc", background: "#f5f0e8", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>{section.emoji}</span>
          <span style={{ fontSize: "13px", color: "#888", letterSpacing: "0.5px" }}>{section.title}</span>
        </div>
        <div style={{ fontSize: "12px", color: "#aaa" }}>{globalStep} / {TOTAL_QUESTIONS}</div>
      </div>

      <div style={{ display: "flex", gap: "4px", padding: "12px 32px", overflowX: "auto", borderBottom: "1px solid #e0d8cc", background: "#f5f0e8" }}>
        {SECTIONS.map((s, i) => (
          <div key={s.id} style={{
            display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "20px", fontSize: "12px",
            background: i === sectionIdx ? "#1a1a1a" : i < sectionIdx ? "#d4cfc7" : "transparent",
            color: i === sectionIdx ? "#fff" : i < sectionIdx ? "#555" : "#bbb",
            whiteSpace: "nowrap", fontWeight: i === sectionIdx ? "600" : "400", transition: "all 0.2s",
          }}>
            <span>{s.emoji}</span>
            {i === sectionIdx && <span>{s.title}</span>}
            {i < sectionIdx && <span style={{ fontSize: "10px" }}>ok</span>}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "36px", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", border: "1px solid #e8e0d4" }}>
            <div style={{ fontSize: "11px", color: "#bbb", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>
              Question {questionIdx + 1} / {section.questions.length}
            </div>
            <h2 style={{ fontSize: "20px", color: "#1a1a1a", lineHeight: 1.45, marginBottom: "12px", fontWeight: "500", letterSpacing: "-0.3px" }}>
              {question.text}
            </h2>
            {question.hint && (
              <p style={{ fontSize: "13px", color: "#999", lineHeight: 1.6, marginBottom: "24px" }}>
                {question.hint}
              </p>
            )}

            {question.type === "text" && (
              <input
                value={currentValue}
                onChange={e => setCurrentValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && canNext() && goNext()}
                placeholder={question.placeholder}
                style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1.5px solid #e0d8cc", fontSize: "15px", fontFamily: "inherit", outline: "none", color: "#1a1a1a", background: "#fdfaf6", boxSizing: "border-box" }}
              />
            )}
            {question.type === "textarea" && (
              <textarea
                value={currentValue}
                onChange={e => setCurrentValue(e.target.value)}
                placeholder={question.placeholder}
                rows={4}
                style={{ width: "100%", padding: "14px 16px", borderRadius: "10px", border: "1.5px solid #e0d8cc", fontSize: "15px", fontFamily: "inherit", outline: "none", color: "#1a1a1a", background: "#fdfaf6", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
              />
            )}
            {question.type === "tags" && <TagSelector suggestions={question.suggestions} value={currentValue} onChange={setCurrentValue} />}
            {question.type === "choice" && <ChoiceSelector choices={question.choices} value={currentValue} onChange={setCurrentValue} />}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "28px" }}>
              <button onClick={goPrev} disabled={isFirst} style={{ background: "transparent", color: "#aaa", border: "1px solid #e0d8cc", padding: "11px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", opacity: isFirst ? 0.3 : 1 }}>
                Precedent
              </button>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {!canNext() && (
                  <button onClick={goNext} style={{ background: "transparent", color: "#bbb", border: "none", cursor: "pointer", fontSize: "12px", padding: "4px" }}>
                    Passer
                  </button>
                )}
                <button onClick={goNext} disabled={!canNext()} style={{ background: canNext() ? "#1a1a1a" : "#e0d8cc", color: canNext() ? "#fff" : "#aaa", border: "none", padding: "12px 28px", borderRadius: "10px", cursor: canNext() ? "pointer" : "not-allowed", fontSize: "14px", fontWeight: "600", transition: "all 0.2s", fontFamily: "inherit" }}>
                  {isLast ? "Generer mon Master Prompt" : "Suivant"}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {section.questions.map((_, i) => (
              <div key={i} style={{ width: i === questionIdx ? "24px" : "8px", height: "8px", borderRadius: "4px", transition: "all 0.3s", background: i < questionIdx ? "#888" : i === questionIdx ? "#1a1a1a" : "#d4cfc7" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}