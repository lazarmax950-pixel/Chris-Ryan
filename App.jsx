import { useState, useEffect } from "react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/81gpfudulpu6n";

// ── ADD NEW POSTS HERE each week ──────────────────────────────────
const POSTS = [
  {
    id: 1,
    week: "Week 1 - Monday",
    pillar: "Authority / Proof",
    body: `I'm 45. When people see me they always say the same thing.

"You're 45?"

Yeah. Going to be 46 in April.

I train alongside college kids. I competed in CrossFit regionals. I ran 800m at D1 level at the University of Florida.

And I'm not that far off from where I was in my 20s - because I've trained all along the way.

Most 45-year-olds don't look like that. Don't act like that. Don't think that way.

That's not genetics. That's doing what you say you're going to do, day in and day out, for a long time.

You can become a legitimate badass in your 40s and 50s. Most people just don't believe it's possible for them - so they never start.

That's what I work on with the executives I coach. Not just the workouts. The belief that it's worth doing.

DM me if you're ready to find out what you're actually capable of.`,
  },
  {
    id: 2,
    week: "Week 1 - Wednesday",
    pillar: "Executive Insight",
    body: `You already understand compounding. You've built a career on it.

Compound, compound, compound. That's what Warren Buffett talks about. You make $100, live off $60, reinvest $30. You don't touch it. You let it build.

Your body works exactly the same way.

Move for 30 minutes, five days a week. Eat well 80% of the time. Sleep. Do that year in and year out - and all of a sudden you wake up in your 50s and you're the person people are looking at going, how does he do that?

It's not complicated. It just requires you to stop being short-sighted about it.

The executives I work with who get this - really get it - don't talk about losing weight or getting back in shape. They talk about being strong at 70. Being the one in the room with energy left at the end of the day.

Play the long game. Your body is worth the investment.`,
  },
  {
    id: 3,
    week: "Week 1 - Friday",
    pillar: "Accountability / Tough Love",
    body: `I had a guy tell me he didn't have time to work out.

CFO. Sharp guy. Genuinely busy.

He was also Netflix and chilling until 11pm every night and wondering why he had no energy at 6am.

I told him: I'm not here to judge how you spend your time. But you said you wanted to lose 25 pounds and feel better. So we have to look at what's actually going on.

It's not that he didn't have time. It's that fitness wasn't a priority yet.

I can care as much as you care. I can't care more.

So the real question isn't whether you have time. It's whether you actually want it - or whether you just want to think you want it.

He decided he wanted it.

When you're ready to make the call, DM me.

[NOTE: Please confirm the client title and fill in the specific result before this goes live]`,
  },
];
// ─────────────────────────────────────────────────────────────────

const ONBOARDING_SECTIONS = [
  {
    id: "vision", title: "Account Vision", icon: "◈",
    fields: [
      { id: "goal",          label: "In one or two sentences - what do you want your LinkedIn to do for your business?", type: "textarea", placeholder: "e.g. Generate inbound leads from executives who want high-ticket coaching..." },
      { id: "success",       label: "What does success look like after 60 days on LinkedIn?",                           type: "textarea", placeholder: "e.g. 2 new executive coaching clients, a handful of corporate wellness conversations..." },
      { id: "differentiate", label: "What makes you different from every other fitness coach on LinkedIn? Be specific.", type: "textarea", placeholder: "Your credentials, your track record, your approach..." },
    ],
  },
  {
    id: "tone", title: "Tone & Style", icon: "◉",
    fields: [
      { id: "voice",        label: "How would you describe your coaching voice? Pick words that fit.", type: "tags", options: ["Direct","Warm","No-nonsense","Motivating","Data-driven","Storytelling","Authoritative","Conversational","Tough love","Encouraging"] },
      { id: "avoid_tone",   label: "What tones or styles do you want to avoid in your content?",       type: "textarea", placeholder: "e.g. Overly positive cheerleader, preachy, political, cheesy motivational quotes..." },
      { id: "example_post", label: "Is there a LinkedIn post you've seen that you thought 'that's the energy I want'? Paste it or describe it.", type: "textarea", placeholder: "Optional - paste text or describe the vibe..." },
    ],
  },
  {
    id: "brand", title: "Your Brand", icon: "◆",
    fields: [
      { id: "credentials",  label: "List your top 5 credentials or career moments - the ones that carry the most weight with executives.", type: "textarea", placeholder: "NBC Strong, Mirror/Lululemon acquisition, D1 track..." },
      { id: "story",        label: "Is there a moment - a client result, a career turning point, a personal realization - that shaped how you coach today?", type: "textarea", placeholder: "The story behind why you do what you do..." },
      { id: "avoid_topics", label: "Any topics, names, or stories that are off-limits in your content?", type: "textarea", placeholder: "Former clients, personal details, controversies..." },
    ],
  },
  {
    id: "audience", title: "Target Audience", icon: "◎",
    fields: [
      { id: "who",        label: "Describe your ideal client. Be as specific as possible.",                                            type: "textarea", placeholder: "Age range, title, industry, city, income level, what they're struggling with right now..." },
      { id: "pain",       label: "What's the #1 thing your ideal client says when they first reach out to you?",                       type: "textarea", placeholder: "The exact words they use, the problem they name first..." },
      { id: "objections", label: "What are the top 2-3 reasons someone in your target audience doesn't pull the trigger on coaching?", type: "textarea", placeholder: "Too busy, too expensive, tried it before and it didn't stick..." },
    ],
  },
  {
    id: "offer", title: "Your Offer", icon: "◐",
    fields: [
      { id: "program", label: "Describe your executive coaching program in plain language. What does someone get and what does it cost?", type: "textarea", placeholder: "3 or 6 month program, bi-weekly calls, price range, what's included..." },
      { id: "result",  label: "What's the most common result a client sees in the first 60-90 days working with you?",                   type: "textarea", placeholder: "Lost X lbs, sleeping better, more energy, ran first 5K..." },
      { id: "cta",     label: "How do you want people to reach out? What should they do first?",                                         type: "textarea", placeholder: "DM you on LinkedIn, fill out a form, book a call directly..." },
    ],
  },
  {
    id: "assets", title: "Assets & Links", icon: "◍",
    fields: [
      { id: "drive",        label: "Google Drive folder with photos, media, magazine covers, NBC clips, etc.", type: "url",      placeholder: "https://drive.google.com/..." },
      { id: "linkedin",     label: "Your LinkedIn profile URL",                                                type: "url",      placeholder: "https://linkedin.com/in/..." },
      { id: "website",      label: "Website",                                                                  type: "url",      placeholder: "https://chrisryanfitness.com" },
      { id: "instagram",    label: "Instagram handle",                                                         type: "text",     placeholder: "@chrisryanfitness" },
      { id: "booking",      label: "Booking or application link (Calendly, intake form, etc.)",                type: "url",      placeholder: "https://..." },
      { id: "other_assets", label: "Any other links or assets Max should have access to",                      type: "textarea", placeholder: "Substack, blog, YouTube, media press kit..." },
    ],
  },
];

const statusConfig = {
  pending:  { label: "Awaiting Review", color: "#C9A84C", bg: "rgba(201,168,76,0.12)" },
  approved: { label: "Approved",        color: "#5AAF7A", bg: "rgba(90,175,122,0.12)" },
  revision: { label: "Needs Changes",   color: "#E07060", bg: "rgba(224,112,96,0.12)" },
};

function defaultPostStates() {
  const m = {};
  POSTS.forEach(p => { m[p.id] = { status: "pending", notes: "" }; });
  return m;
}

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Send a row to a specific SheetDB sheet tab
async function sendToSheet(sheet, data) {
  try {
    await fetch(`${SHEETDB_URL}?sheet=${sheet}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [{ ...data, submitted_at: new Date().toLocaleString() }] }),
    });
  } catch (e) {
    console.error("SheetDB error:", e);
  }
}

export default function Portal() {
  const [view, setView]               = useState("home");
  const [postStates, setPostStates]   = useState(() => load("postStates", defaultPostStates()));
  const [activePost, setActivePost]   = useState(null);
  const [editingNote, setEditingNote] = useState("");
  const [onboarding, setOnboarding]   = useState(() => load("onboarding", {}));
  const [selTags, setSelTags]         = useState(() => load("selectedTags", []));
  const [activeSection, setSection]   = useState(0);
  const [submitted, setSubmitted]     = useState(() => load("submitted", false));
  const [cardHover, setCardHover]     = useState(null);
  const [submitting, setSubmitting]   = useState(false);

  useEffect(() => { save("postStates",   postStates); }, [postStates]);
  useEffect(() => { save("onboarding",   onboarding); }, [onboarding]);
  useEffect(() => { save("selectedTags", selTags);    }, [selTags]);
  useEffect(() => { save("submitted",    submitted);  }, [submitted]);

  const updateStatus = async (id, status) => {
    const post = POSTS.find(p => p.id === id);
    setPostStates(prev => ({ ...prev, [id]: { status, notes: editingNote } }));
    // Send approval to Google Sheet
    await sendToSheet("Approvals", {
      post_id:   id,
      week:      post.week,
      pillar:    post.pillar,
      status:    status === "approved" ? "Approved" : "Needs Changes",
      notes:     editingNote || "",
    });
    setActivePost(null);
    setEditingNote("");
  };

  const handleField = (fieldId, value) =>
    setOnboarding(prev => ({ ...prev, [fieldId]: value }));

  const toggleTag = (tag) => {
    setSelTags(prev => {
      const next = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag];
      handleField("voice", next.join(", "));
      return next;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Flatten all onboarding answers into one row
    await sendToSheet("Onboarding", {
      goal:          onboarding.goal          || "",
      success:       onboarding.success       || "",
      differentiate: onboarding.differentiate || "",
      voice:         onboarding.voice         || "",
      avoid_tone:    onboarding.avoid_tone    || "",
      example_post:  onboarding.example_post  || "",
      credentials:   onboarding.credentials   || "",
      story:         onboarding.story         || "",
      avoid_topics:  onboarding.avoid_topics  || "",
      who:           onboarding.who           || "",
      pain:          onboarding.pain          || "",
      objections:    onboarding.objections    || "",
      program:       onboarding.program       || "",
      result:        onboarding.result        || "",
      cta:           onboarding.cta           || "",
      drive:         onboarding.drive         || "",
      linkedin:      onboarding.linkedin      || "",
      website:       onboarding.website       || "",
      instagram:     onboarding.instagram     || "",
      booking:       onboarding.booking       || "",
      other_assets:  onboarding.other_assets  || "",
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  const cur = ONBOARDING_SECTIONS[activeSection];
  const progress = Math.round((activeSection / ONBOARDING_SECTIONS.length) * 100);
  const g = "Georgia,'Times New Roman',serif";

  const S = {
    root:        { minHeight:"100vh", background:"#0D0D0D", color:"#E8E0D4", fontFamily:g },
    nav:         { borderBottom:"1px solid rgba(232,224,212,0.08)", padding:"20px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0D0D0D", position:"sticky", top:0, zIndex:100 },
    logo:        { fontFamily:g, fontSize:"15px", letterSpacing:"0.12em", textTransform:"uppercase", color:"#C9A84C", fontWeight:"normal" },
    navBtn:  (a) => ({ background:a?"rgba(201,168,76,0.1)":"transparent", border:a?"1px solid rgba(201,168,76,0.3)":"1px solid transparent", color:a?"#C9A84C":"rgba(232,224,212,0.4)", padding:"8px 18px", borderRadius:"3px", fontSize:"13px", cursor:"pointer", letterSpacing:"0.06em", fontFamily:g }),
    hero:        { padding:"80px 32px 60px", maxWidth:"680px", margin:"0 auto" },
    heroLabel:   { fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A84C", marginBottom:"20px", display:"block" },
    heroTitle:   { fontSize:"38px", fontWeight:"normal", lineHeight:"1.25", color:"#E8E0D4", marginBottom:"16px" },
    heroSub:     { fontSize:"16px", color:"rgba(232,224,212,0.5)", lineHeight:"1.6", marginBottom:"40px" },
    cardGrid:    { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", maxWidth:"680px", margin:"0 auto", padding:"0 32px 80px" },
    card:    (h) => ({ background:h?"rgba(232,224,212,0.04)":"rgba(232,224,212,0.02)", border:"1px solid rgba(232,224,212,0.08)", borderRadius:"4px", padding:"28px", cursor:"pointer", transition:"all 0.2s" }),
    cardIcon:    { fontSize:"22px", color:"#C9A84C", marginBottom:"14px" },
    cardTitle:   { fontSize:"16px", fontWeight:"normal", color:"#E8E0D4", marginBottom:"8px" },
    cardDesc:    { fontSize:"13px", color:"rgba(232,224,212,0.45)", lineHeight:"1.55" },
    section:     { maxWidth:"680px", margin:"0 auto", padding:"48px 32px 80px" },
    pageTitle:   { fontSize:"26px", fontWeight:"normal", color:"#E8E0D4", marginBottom:"6px" },
    pageDesc:    { fontSize:"14px", color:"rgba(232,224,212,0.4)", marginBottom:"36px", lineHeight:"1.6" },
    postCard:    { background:"rgba(232,224,212,0.02)", border:"1px solid rgba(232,224,212,0.08)", borderRadius:"4px", padding:"24px", marginBottom:"12px", cursor:"pointer" },
    postMeta:    { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" },
    postWeek:    { fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(232,224,212,0.35)" },
    badge:   (s) => ({ fontSize:"11px", padding:"3px 10px", borderRadius:"2px", background:statusConfig[s].bg, color:statusConfig[s].color, letterSpacing:"0.06em" }),
    pillarTag:   { fontSize:"12px", color:"#C9A84C", marginBottom:"8px" },
    postPreview: { fontSize:"14px", color:"rgba(232,224,212,0.6)", lineHeight:"1.55", whiteSpace:"pre-wrap" },
    modal:       { position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"flex-start", justifyContent:"center", zIndex:200, padding:"40px 20px", overflowY:"auto" },
    modalBox:    { background:"#141414", border:"1px solid rgba(232,224,212,0.1)", borderRadius:"6px", padding:"40px", width:"100%", maxWidth:"580px", position:"relative" },
    closeBtn:    { position:"absolute", top:"20px", right:"20px", background:"transparent", border:"none", color:"rgba(232,224,212,0.4)", fontSize:"20px", cursor:"pointer" },
    postFull:    { fontSize:"15px", color:"#E8E0D4", lineHeight:"1.7", whiteSpace:"pre-wrap", marginBottom:"28px", padding:"20px", background:"rgba(232,224,212,0.03)", borderRadius:"4px", border:"1px solid rgba(232,224,212,0.06)" },
    noteLabel:   { fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(232,224,212,0.35)", marginBottom:"8px" },
    textarea:    { width:"100%", background:"rgba(232,224,212,0.04)", border:"1px solid rgba(232,224,212,0.1)", borderRadius:"4px", color:"#E8E0D4", fontSize:"14px", padding:"14px", resize:"vertical", minHeight:"80px", fontFamily:g, lineHeight:"1.6", outline:"none", boxSizing:"border-box", marginBottom:"20px" },
    btnRow:      { display:"flex", gap:"10px", flexWrap:"wrap" },
    btn:     (v) => ({ padding:"10px 22px", borderRadius:"3px", fontSize:"13px", cursor:"pointer", fontFamily:g, transition:"all 0.2s", border:v==="approve"?"1px solid rgba(90,175,122,0.4)":v==="revision"?"1px solid rgba(224,112,96,0.4)":"1px solid rgba(232,224,212,0.15)", background:v==="approve"?"rgba(90,175,122,0.12)":v==="revision"?"rgba(224,112,96,0.12)":"transparent", color:v==="approve"?"#5AAF7A":v==="revision"?"#E07060":"rgba(232,224,212,0.5)" }),
    progressBar: { height:"2px", background:"rgba(232,224,212,0.08)", marginBottom:"48px", borderRadius:"1px", overflow:"hidden" },
    progressFill:{ height:"100%", background:"#C9A84C", transition:"width 0.4s ease" },
    secHeader:   { display:"flex", alignItems:"center", gap:"14px", marginBottom:"32px" },
    secIcon:     { fontSize:"20px", color:"#C9A84C" },
    secTitle:    { fontSize:"22px", fontWeight:"normal", color:"#E8E0D4" },
    fieldGroup:  { marginBottom:"28px" },
    fieldLabel:  { fontSize:"14px", color:"rgba(232,224,212,0.7)", marginBottom:"10px", lineHeight:"1.5", display:"block" },
    input:       { width:"100%", background:"rgba(232,224,212,0.04)", border:"1px solid rgba(232,224,212,0.1)", borderRadius:"4px", color:"#E8E0D4", fontSize:"14px", padding:"12px 14px", fontFamily:g, outline:"none", boxSizing:"border-box" },
    tagGrid:     { display:"flex", flexWrap:"wrap", gap:"8px" },
    tag:     (a) => ({ padding:"7px 14px", borderRadius:"2px", fontSize:"13px", cursor:"pointer", fontFamily:g, transition:"all 0.15s", border:a?"1px solid rgba(201,168,76,0.5)":"1px solid rgba(232,224,212,0.12)", background:a?"rgba(201,168,76,0.1)":"transparent", color:a?"#C9A84C":"rgba(232,224,212,0.45)" }),
    navBtns:     { display:"flex", justifyContent:"space-between", marginTop:"40px", paddingTop:"24px", borderTop:"1px solid rgba(232,224,212,0.06)" },
    goldBtn:     { padding:"12px 28px", background:"#C9A84C", border:"none", borderRadius:"3px", color:"#0D0D0D", fontSize:"13px", cursor:"pointer", fontFamily:g, letterSpacing:"0.06em" },
    ghostBtn:    { padding:"12px 22px", background:"transparent", border:"1px solid rgba(232,224,212,0.15)", borderRadius:"3px", color:"rgba(232,224,212,0.5)", fontSize:"13px", cursor:"pointer", fontFamily:g },
    successBox:  { textAlign:"center", padding:"80px 32px" },
  };

  return (
    <div style={S.root}>
      <nav style={S.nav}>
        <span style={S.logo}>ChrisRyanFitness</span>
        <div style={{ display:"flex", gap:"8px" }}>
          {["home","content","onboarding"].map(v => (
            <button key={v} style={S.navBtn(view===v)} onClick={() => setView(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {view === "home" && <>
        <div style={S.hero}>
          <span style={S.heroLabel}>Client Portal - Max Lazar x ChrisRyanFitness</span>
          <h1 style={S.heroTitle}>Your LinkedIn operation, in one place.</h1>
          <p style={S.heroSub}>Review and approve weekly posts before they go live. Complete your onboarding so Max can write in your voice from day one.</p>
        </div>
        <div style={S.cardGrid}>
          {[
            { key:"content",    icon:"◈", title:"Content Approval", desc:"Review this week's posts. Approve them or leave notes for changes." },
            { key:"onboarding", icon:"◉", title:"Onboarding Form",  desc:"Brand, tone, audience, offer, and asset links. One time - takes about 10 minutes." },
          ].map(c => (
            <div key={c.key} style={S.card(cardHover===c.key)} onMouseEnter={() => setCardHover(c.key)} onMouseLeave={() => setCardHover(null)} onClick={() => setView(c.key)}>
              <div style={S.cardIcon}>{c.icon}</div>
              <div style={S.cardTitle}>{c.title}</div>
              <div style={S.cardDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </>}

      {view === "content" && (
        <div style={S.section}>
          <h2 style={S.pageTitle}>Content Approval</h2>
          <p style={S.pageDesc}>Read each post, then approve it or leave notes if something needs to change. Your decisions are saved automatically.</p>
          {POSTS.map(post => {
            const ps = postStates[post.id] || { status:"pending", notes:"" };
            return (
              <div key={post.id} style={S.postCard} onClick={() => { setActivePost(post); setEditingNote(ps.notes||""); }}>
                <div style={S.postMeta}>
                  <span style={S.postWeek}>{post.week}</span>
                  <span style={S.badge(ps.status)}>{statusConfig[ps.status].label}</span>
                </div>
                <div style={S.pillarTag}>{post.pillar}</div>
                <div style={S.postPreview}>{post.body.slice(0,160)}...</div>
                {ps.notes && <div style={{ marginTop:"12px", fontSize:"12px", color:"rgba(224,112,96,0.8)", fontStyle:"italic" }}>Your note: {ps.notes}</div>}
              </div>
            );
          })}
          {activePost && (
            <div style={S.modal} onClick={e => { if (e.target===e.currentTarget) { setActivePost(null); setEditingNote(""); } }}>
              <div style={S.modalBox}>
                <button style={S.closeBtn} onClick={() => { setActivePost(null); setEditingNote(""); }}>×</button>
                <div style={{ marginBottom:"6px" }}><span style={S.postWeek}>{activePost.week}</span></div>
                <div style={{ ...S.pillarTag, marginBottom:"16px", fontSize:"13px" }}>{activePost.pillar}</div>
                <div style={S.postFull}>{activePost.body}</div>
                <div style={S.noteLabel}>Notes for Max (optional)</div>
                <textarea style={S.textarea} placeholder="e.g. Change the title to VP, the result number should be 18 lbs..." value={editingNote} onChange={e => setEditingNote(e.target.value)} />
                <div style={S.btnRow}>
                  <button style={S.btn("approve")}  onClick={() => updateStatus(activePost.id, "approved")}>Approve - ready to post</button>
                  <button style={S.btn("revision")} onClick={() => updateStatus(activePost.id, "revision")}>Needs changes</button>
                  <button style={S.btn("cancel")}   onClick={() => { setActivePost(null); setEditingNote(""); }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view === "onboarding" && !submitted && (
        <div style={S.section}>
          <h2 style={S.pageTitle}>Onboarding</h2>
          <p style={S.pageDesc}>Six sections. Your answers save automatically as you type - come back any time and pick up where you left off.</p>
          <div style={S.progressBar}><div style={{ ...S.progressFill, width:`${progress}%` }} /></div>
          <div style={{ display:"flex", gap:"6px", marginBottom:"36px", flexWrap:"wrap" }}>
            {ONBOARDING_SECTIONS.map((s,i) => (
              <button key={s.id} onClick={() => setSection(i)} style={{ padding:"6px 14px", borderRadius:"2px", fontSize:"12px", cursor:"pointer", fontFamily:g, letterSpacing:"0.06em", border:activeSection===i?"1px solid rgba(201,168,76,0.4)":"1px solid rgba(232,224,212,0.08)", background:activeSection===i?"rgba(201,168,76,0.08)":"transparent", color:activeSection===i?"#C9A84C":"rgba(232,224,212,0.35)" }}>
                {s.icon} {s.title}
              </button>
            ))}
          </div>
          <div style={S.secHeader}><span style={S.secIcon}>{cur.icon}</span><span style={S.secTitle}>{cur.title}</span></div>
          {cur.fields.map(field => (
            <div key={field.id} style={S.fieldGroup}>
              <label style={S.fieldLabel}>{field.label}</label>
              {field.type==="textarea" && <textarea style={{ ...S.textarea, marginBottom:0 }} placeholder={field.placeholder} value={onboarding[field.id]||""} onChange={e => handleField(field.id, e.target.value)} rows={4} />}
              {(field.type==="text"||field.type==="url") && <input style={S.input} type={field.type} placeholder={field.placeholder} value={onboarding[field.id]||""} onChange={e => handleField(field.id, e.target.value)} />}
              {field.type==="tags" && (
                <div style={S.tagGrid}>
                  {field.options.map(opt => <button key={opt} style={S.tag(selTags.includes(opt))} onClick={() => toggleTag(opt)}>{opt}</button>)}
                </div>
              )}
            </div>
          ))}
          <div style={S.navBtns}>
            <button style={S.ghostBtn} onClick={() => setSection(Math.max(0,activeSection-1))} disabled={activeSection===0}>Back</button>
            {activeSection < ONBOARDING_SECTIONS.length-1
              ? <button style={S.goldBtn} onClick={() => setSection(activeSection+1)}>Next section</button>
              : <button style={S.goldBtn} onClick={handleSubmit} disabled={submitting}>{submitting ? "Sending..." : "Submit to Max"}</button>
            }
          </div>
        </div>
      )}

      {view === "onboarding" && submitted && (
        <div style={S.successBox}>
          <div style={{ fontSize:"32px", marginBottom:"20px", color:"#C9A84C" }}>◈</div>
          <h2 style={{ ...S.pageTitle, fontSize:"28px", marginBottom:"12px" }}>Done. Max has everything he needs.</h2>
          <p style={{ ...S.heroSub, maxWidth:"400px", margin:"0 auto 32px" }}>He'll go through your answers before the next post batch goes out. If anything is unclear, he'll reach out directly.</p>
          <button style={S.goldBtn} onClick={() => setView("home")}>Back to portal</button>
        </div>
      )}
    </div>
  );
}
