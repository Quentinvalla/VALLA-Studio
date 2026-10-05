// === PRIX A MODIFIER ===
const prix_START = "390 €";
const prix_PRO = "650 €";
const prix_PREMIUM = "950 €";

document.getElementById("prix-start").textContent = prix_START;
document.getElementById("prix-pro").textContent = prix_PRO;
document.getElementById("prix-premium").textContent = prix_PREMIUM;

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu");
const navigation = document.getElementById("site-navigation");
const header = document.querySelector(".nav");

function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu",
  );
  menuButton.textContent = isOpen ? "×" : "☰";
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("click", (event) => {
  if (
    menuButton.getAttribute("aria-expanded") === "true" &&
    !header.contains(event.target)
  ) {
    setMenuOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});
window
  .matchMedia("(min-width: 801px)")
  .addEventListener("change", () => setMenuOpen(false));

const projectDetails = {
  bella: {
    title: "Bella Napoli",
    description:
      "Concept fictif de site vitrine pour un restaurant italien, imaginé autour d'une identité chaleureuse et d'une lecture simple du menu.",
    goal: "Donner envie de découvrir le restaurant et faciliter l'accès au menu et aux informations pratiques.",
    features: [
      "Menu organisé",
      "Accès aux horaires et coordonnées",
      "Parcours de réservation",
    ],
    responsive:
      "Mise en page pensée pour rester lisible du téléphone au grand écran.",
    technologies: "HTML, CSS et JavaScript vanilla.",
  },
  blackline: {
    title: "Blackline",
    description:
      "Concept fictif pour un barber studio, avec une direction visuelle contrastée et une approche mobile-first.",
    goal: "Présenter l'univers du studio et rendre les prestations et la prise de contact faciles à trouver.",
    features: [
      "Présentation des prestations",
      "Informations pratiques",
      "Accès rapide à la réservation",
    ],
    responsive:
      "Composition mobile-first adaptée aux téléphones, tablettes et ordinateurs.",
    technologies: "HTML, CSS et JavaScript vanilla.",
  },
  auto: {
    title: "Auto Performance",
    description:
      "Concept fictif de site vitrine pour un atelier automobile, conçu pour présenter les services de façon directe et rassurante.",
    goal: "Aider les automobilistes à comprendre les services proposés et à contacter l'atelier.",
    features: [
      "Présentation des services",
      "Repères de contact",
      "Parcours de demande de rendez-vous",
    ],
    responsive:
      "Contenus et actions adaptés aux écrans mobiles, tablettes et ordinateurs.",
    technologies: "HTML, CSS et JavaScript vanilla.",
  },
};

const projectDialog = document.getElementById("project-dialog");
const projectPreview = projectDialog.querySelector("[data-project-preview]");
let lastProjectTrigger;

document.querySelectorAll(".project-open").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const project = projectDetails[trigger.dataset.project];
    if (!project) return;

    lastProjectTrigger = trigger;
    projectDialog.querySelector("[data-project-title]").textContent =
      project.title;
    projectDialog.querySelector("[data-project-description]").textContent =
      project.description;
    projectDialog.querySelector("[data-project-goal]").textContent =
      project.goal;
    projectDialog.querySelector("[data-project-responsive]").textContent =
      project.responsive;
    projectDialog.querySelector("[data-project-technologies]").textContent =
      project.technologies;

    const features = projectDialog.querySelector("[data-project-features]");
    features.replaceChildren(
      ...project.features.map((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        return item;
      }),
    );

    const preview = trigger
      .closest(".project")
      .querySelector(".visual")
      .cloneNode(true);
    preview.setAttribute("aria-hidden", "true");
    projectPreview.replaceChildren(preview);
    projectDialog.showModal();
    projectDialog.querySelector(".dialog-close").focus();
  });
});

projectDialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog.addEventListener("close", () => lastProjectTrigger?.focus());
projectDialog
  .querySelector('a[href="#contact"]')
  .addEventListener("click", () => projectDialog.close());
