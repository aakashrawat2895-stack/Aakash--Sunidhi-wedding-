// ===============================
// Sunidhi Wedding Invite
// ===============================
// Optional: add the family's WhatsApp number in international format,
// e.g. "919876543210" (digits only). The RSVP section will then show
// a one-tap WhatsApp button. Leave blank to use the copy/share RSVP flow.
const RSVP_WHATSAPP = "919928967627";

const opening = document.getElementById("opening");
const enterBtn = document.getElementById("enterBtn");
const invitation = document.getElementById("invitation");

enterBtn.addEventListener("click", () => {
  opening.classList.add("opening-hide");
  setTimeout(() => {
    opening.style.display = "none";
    invitation.classList.remove("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
  }, 650);
});

const petals = document.querySelector(".petals");
const symbols = ["✿","❀","❁","✦"];
function makePetal() {
  const p = document.createElement("span");
  p.className = "petal";
  p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  p.style.left = Math.random()*100 + "vw";
  p.style.setProperty("--drift", (Math.random()*180-90) + "px");
  p.style.animationDuration = (7 + Math.random()*8) + "s";
  p.style.fontSize = (10 + Math.random()*12) + "px";
  petals.appendChild(p);
  setTimeout(() => p.remove(), 16000);
}
setInterval(makePetal, 900);
for(let i=0;i<7;i++) setTimeout(makePetal, i*350);

const form = document.getElementById("rsvpForm");
const result = document.getElementById("rsvpResult");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;
  const events = [...form.querySelectorAll('input[name="event"]:checked')].map(x => x.value);

  if (!events.length) {
    result.hidden = false;
    result.innerHTML = "Please select at least one celebration before sending your RSVP.";
    return;
  }

  const message = `Hello! This is ${name}. I would like to RSVP for Sunidhi's wedding celebrations. Guests: ${count}. Attending: ${events.join(", ")}.`;
  result.hidden = false;

  if (RSVP_WHATSAPP) {
    const url = `https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(message)}`;
    result.innerHTML = `<strong>RSVP ready ✦</strong><br>Your WhatsApp message is prepared.<br><a class="map-btn" style="margin-top:10px" target="_blank" rel="noopener" href="${url}">Send via WhatsApp →</a>`;
  } else {
    result.innerHTML = `<strong>RSVP prepared ✦</strong><br>${message}<br><button type="button" id="copyRsvp">Copy RSVP message</button>`;
    document.getElementById("copyRsvp").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(message);
        document.getElementById("copyRsvp").textContent = "Copied ✓";
      } catch {
        alert(message);
      }
    });
  }
});
