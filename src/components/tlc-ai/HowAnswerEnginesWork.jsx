import { motion } from 'framer-motion'
import {
  Section, SectionHeading, InView, fadeUp,
  bg, surface, border, blue, blueL, blueD, red, fg, fgMuted, fgDim, gold, fgLight, font,
} from './shared.jsx'

// ─── Retrieval pipeline ───────────────────────────────────────────────────────
const pipeline = [
  { n: '1', t: 'Decide', d: 'Decides whether the question needs fresh information.' },
  { n: '2', t: 'Retrieve', d: 'Retrieves candidate pages and shortlists the ones worth reading.' },
  { n: '3', t: 'Chunk', d: 'Breaks their content into smaller passages — the industry calls these chunks.' },
  { n: '4', t: 'Score', d: 'Scores those passages against the question.' },
  { n: '5', t: 'Assemble', d: 'Assembles a limited set of the best ones into its working context.' },
  { n: '6', t: 'Draft + cite', d: 'Drafts the answer from that selected evidence, with citations pointing back to the passages that survived.' },
]

// ─── Five findings ────────────────────────────────────────────────────────────
const findings = [
  {
    n: '01',
    t: 'Each engine keeps its own reading list',
    d: 'Ask ChatGPT and Google AI Overviews the same question and the cited pages barely overlap. Of the 12,958 cited URLs in our study, only 375 were cited by both platforms. AI visibility is not a single ranking you win once. It\'s a moving probability that differs by platform and by day.',
    stat: '375 / 12,958',
    statLabel: 'cited by both platforms',
  },
  {
    n: '02',
    t: 'Each platform has its own content appetite',
    d: 'Google\'s AI surfaces are comfortable drawing on longer, broader source material. ChatGPT prefers compact, focused pages. A single generic "AI-optimised page" serves neither particularly well; the platform you most need to win on should shape how the content is built.',
  },
  {
    n: '03',
    t: 'The opening paragraph is a retrieval gate',
    d: 'Pages whose first visible passage states directly what the page offers and who it\'s for were cited across platforms nearly twice as often as pages that warm up slowly: 14.1% against 7.5% in our data. Warm-up paragraphs and brand fluff are not neutral. They\'re a cost.',
    stat: '14.1% vs 7.5%',
    statLabel: 'direct opener vs slow warm-up',
  },
  {
    n: '04',
    t: 'Medium-sized paragraphs beat dense blocks',
    d: 'The best-performing passages in our study ran to roughly 2 or 3 focused sentences, with one claim, answer or proof point each. Extra-large blocks of text consistently underperformed. Bigger paragraphs do not produce more AI coverage. Selectable passages do.',
  },
  {
    n: '05',
    t: 'Position on the page barely matters. Clarity does',
    d: 'Across 97,627 passage observations, citation frequency was essentially flat from the top of the page to the bottom. Once a page enters consideration, the engine scans all of it for useful passages. A clear, self-contained answer in your final section is still entirely viable. A vague one at the top is not.',
    stat: '97,627',
    statLabel: 'passage observations',
  },
]

// ─── Category ownership data ──────────────────────────────────────────────────
const categories = [
  { label: 'Owned-page first', cats: 'Healthcare, Aesthetics, Video', pct: 79, color: blue },
  { label: 'Hybrid', cats: 'Education, Fitness, Wellness', pct: 64, color: blueL },
  { label: 'Third-party shaped', cats: 'Fintech', pct: 41, color: gold },
  { label: 'Competitor-influenced', cats: 'F&B Catering', pct: 22, color: red },
]

function OwnershipBar({ label, cats, pct, color }) {
  return (
    <motion.div variants={fadeUp} style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: fg }}>{label}</span>
          <span style={{ fontFamily: font, fontSize: 13, color: fgMuted, marginLeft: 10 }}>{cats}</span>
        </div>
        <span style={{ fontFamily: font, fontSize: 15, fontWeight: 900, color }}>~{pct}% owned</span>
      </div>
      <div style={{ height: 14, borderRadius: 100, background: '#EEF4FB', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 100, background: color }}
        />
      </div>
    </motion.div>
  )
}

export default function HowAnswerEnginesWork() {
  return (
    <Section id="how" soft>
      <InView>
        <SectionHeading
          chip="03 · HOW ENGINES DECIDE"
          chipColor={blue}
          title="How Answer Engines Decide Which Brands To Recommend"
          subtitle="Getting recommended by an AI engine looks like luck from the outside. It isn't. It's the output of a retrieval process with observable rules."
          maxTitle={800}
        />

        {/* Pipeline */}
        <motion.h3 variants={fadeUp} style={{ fontFamily: font, fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 6 }}>How AI Builds An Answer</motion.h3>
        <motion.p variants={fadeUp} style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.7, marginBottom: 24, maxWidth: 760 }}>
          When someone asks ChatGPT or Google a question, the model doesn't read the whole internet and it doesn't recite a stored answer. It runs a short pipeline.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%), 1fr))', gap: 14, marginBottom: 24 }}>
          {pipeline.map((p) => (
            <motion.div
              key={p.n}
              variants={fadeUp}
              style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 12, padding: '20px 22px', position: 'relative' }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${blue}12`, border: `1px solid ${blue}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontSize: 13, fontWeight: 900, color: blue, marginBottom: 12 }}>{p.n}</div>
              <div style={{ fontFamily: font, fontSize: 15, fontWeight: 800, color: fg, marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontFamily: font, fontSize: 13, color: fgMuted, lineHeight: 1.6 }}>{p.d}</div>
            </motion.div>
          ))}
        </div>

        {/* Key idea callout */}
        <motion.div
          variants={fadeUp}
          style={{
            background: surface === bg ? '#EAF2FC' : '#0A1B3D', borderRadius: 16,
            padding: 'clamp(26px,4vw,40px)', marginBottom: 44, textAlign: 'center',
            border: `1.5px solid ${blueD}`,
          }}
        >
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.16em', fontWeight: 700, color: blueL, marginBottom: 14 }}>THE KEY IDEA</div>
          <p style={{ fontFamily: font, fontSize: 'clamp(18px,2.6vw,26px)', fontWeight: 800, color: fgLight, lineHeight: 1.4, maxWidth: 760, margin: '0 auto' }}>
            The model does not read everything. Your brand isn't competing to be crawled. It's competing to be <span style={{ color: '#FBD24B' }}>selected, passage by passage.</span>
          </p>
        </motion.div>

        {/* The study — 5 findings */}
        <motion.h3 variants={fadeUp} style={{ fontFamily: font, fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 6 }}>
          What We Found When We Studied 342,426 Passages
        </motion.h3>
        <motion.p variants={fadeUp} style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.7, marginBottom: 24, maxWidth: 760 }}>
          At The Last Click Summit in 2026, our technical team presented a study built to answer one question: Which passages actually survive retrieval? We analysed 342,426 individual content passages across 12,958 unique URLs cited by AI engines. Five findings matter most for anyone trying to get a brand recommended.
        </motion.p>

        {/* 5 findings — flex so the last row centres instead of orphaning */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          {findings.map((f) => (
            <motion.div
              key={f.n}
              variants={fadeUp}
              style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 'clamp(22px,3vw,30px)', display: 'flex', flexDirection: 'column', flex: '1 1 300px', maxWidth: 360 }}
            >
              <div style={{ fontFamily: font, fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', color: fgDim, marginBottom: 12 }}>{f.n}</div>
              <h4 style={{ fontFamily: font, fontSize: 'clamp(16px,1.7vw,18px)', fontWeight: 800, color: fg, lineHeight: 1.3, marginBottom: 10 }}>{f.t}</h4>
              <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65, flex: 1 }}>{f.d}</p>
              {f.stat && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${border}` }}>
                  <div style={{ fontFamily: font, fontSize: 'clamp(22px,2.6vw,28px)', fontWeight: 900, color: blue, lineHeight: 1, letterSpacing: '-0.02em' }}>{f.stat}</div>
                  <div style={{ fontFamily: font, fontSize: 12, color: fgMuted, marginTop: 5 }}>{f.statLabel}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Two-step filter */}
        <motion.div variants={fadeUp} style={{ background: `${blue}08`, border: `1.5px solid ${blue}28`, borderRadius: 14, padding: 'clamp(24px,4vw,36px)', marginBottom: 44 }}>
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blue, marginBottom: 16 }}>PUT TOGETHER: A TWO-STEP FILTER</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: 18 }}>
            <div>
              <div style={{ fontFamily: font, fontSize: 15, fontWeight: 800, color: fg, marginBottom: 6 }}>At page level</div>
              <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>Your metadata, title, headings and opening paragraph earn you a place in the candidate set.</p>
            </div>
            <div>
              <div style={{ fontFamily: font, fontSize: 15, fontWeight: 800, color: fg, marginBottom: 6 }}>At passage level</div>
              <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>The engine then hunts inside the page for self-contained answer blocks it can lift cleanly into its context. A passage that only makes sense in sequence makes no sense to a retrieval system.</p>
            </div>
          </div>
        </motion.div>

        {/* The pages AI reads are not always yours */}
        <motion.h3 variants={fadeUp} style={{ fontFamily: font, fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 6 }}>
          The Pages AI Reads Are Not Always Yours
        </motion.h3>
        <motion.p variants={fadeUp} style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.7, marginBottom: 24, maxWidth: 760 }}>
          The page an engine cites when it recommends a brand is often not that brand's page. Our citation data shows the balance differs sharply by category.
        </motion.p>

        <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 'clamp(24px,4vw,36px)', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font, fontSize: 11, fontWeight: 700, color: fgDim, marginBottom: 18 }}>
            <span>0%</span><span>SHARE OF CITED PAGES OWNED BY THE BRAND</span><span>100%</span>
          </div>
          {categories.map((c) => <OwnershipBar key={c.label} {...c} />)}
        </motion.div>

        <motion.p variants={fadeUp} style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.7, marginBottom: 32, maxWidth: 820 }}>
          In healthcare, medical aesthetics and video production, around 79% of cited pages belong to the brands themselves, so the priority is making your own service pages directly answerable. Education, fitness, wellness and coworking sit in a hybrid zone, with owned pages accounting for roughly 57 to 70% of citations alongside trusted editorial roundups. In fintech the picture inverts: Owned pages account for closer to 41%, and comparison and listicle content shapes most answers. In categories like F&B catering, competitor pages themselves influence how the engine frames the entire category.
        </motion.p>

        {/* Platform sourcing + practical rule */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: 16, marginBottom: 18 }}>
          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 800, color: blue, marginBottom: 10 }}>Google's AI surfaces</div>
            <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>Draw heavily on community platforms and video, with Semrush's study finding Quora and Reddit the most-cited sites in AI Overviews and YouTube playing a growing role in how products get evaluated.</p>
          </motion.div>
          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 800, color: red, marginBottom: 10 }}>ChatGPT</div>
            <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>Leans on discussion platforms like Reddit alongside business and service websites, which made up half of the links in its answers in the same study.</p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} style={{ background: `linear-gradient(135deg, ${blue}10, ${red}06)`, border: `1.5px solid ${blue}30`, borderRadius: 14, padding: 'clamp(24px,4vw,36px)' }}>
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blue, marginBottom: 10 }}>THE PRACTICAL RULE</div>
          <p style={{ fontFamily: font, fontSize: 'clamp(16px,1.8vw,20px)', color: fg, fontWeight: 600, lineHeight: 1.55 }}>
            Optimise where the engine is already looking. Sometimes that's your service page. Sometimes it's the comparison article that ranks for your category. Sometimes it's a thread where your customers are already talking about you, or conspicuously not. A brand that only tends its own website is optimising a fraction of the surface the engines actually read.
          </p>
        </motion.div>
      </InView>
    </Section>
  )
}
