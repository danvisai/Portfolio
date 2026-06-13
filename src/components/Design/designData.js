import spatialStoryboard from "../../Assets/design/spatial-storyboard.jpg";
import spatialAssets from "../../Assets/design/spatial-assets.png";
import spatialMapping from "../../Assets/design/spatial-mapping.png";
import spatialCombinations from "../../Assets/design/spatial-combinations.png";
import spatialMsgFirstThen from "../../Assets/design/spatial-msg-firstthen.png";
import spatialMsgTutorial from "../../Assets/design/spatial-msg-tutorial.png";
import spatialMsgGoodJob from "../../Assets/design/spatial-msg-goodjob.png";
import spatialMsgTryAgain from "../../Assets/design/spatial-msg-tryagain.png";
import valorantRoster from "../../Assets/design/valorant-roster.jpg";
import valorantFood from "../../Assets/design/valorant-food.jpg";
import valorantLotus from "../../Assets/design/valorant-lotus.jpg";
import valorantWheel from "../../Assets/design/valorant-wheel.jpg";
import hwFeatured from "../../Assets/design/hw-featured.png";
import hwLevels from "../../Assets/design/hw-levels.png";
import hwControls from "../../Assets/design/hw-controls.png";
import hwPersona from "../../Assets/design/hw-persona.png";
import detroitCrowd from "../../Assets/design/detroit-crowd.jpg";
import detroitFlowchart from "../../Assets/design/detroit-flowchart.jpg";
import detroitScene from "../../Assets/design/detroit-scene.jpg";
import disneyCollage from "../../Assets/design/disney-collage.jpg";
import gdcHero from "../../Assets/design/gdc-hero.jpg";
import gdcMemory from "../../Assets/design/gdc-memory.png";
import gdcCompare from "../../Assets/design/gdc-compare.jpg";

export const DESIGN_PROCESS = [
  {
    step: "Discover",
    body: "Play the game, study its systems, and frame what's worth asking.",
  },
  {
    step: "Define",
    body: "Turn curiosity into concrete research objectives and questions.",
  },
  {
    step: "Research",
    body: "Surveys, moderated playtests, observation, and contextual interviews.",
  },
  {
    step: "Analyze",
    body: "Triangulate self-reported data against observed behavior.",
  },
  {
    step: "Recommend",
    body: "Translate insights into actionable design recommendations.",
  },
];

export const CASE_STUDIES = [
  {
    id: "01",
    anchor: "spatial-vr",
    kicker: "VR · Accessibility · CGT 581 Design Futures",
    title: "Gamified Spatial Thinking",
    summary:
      "A narrative VR puzzle that trains spatial-arrangement skills in autistic children aged 11–18, built by a six-person team under Dr. Nandhini Giri with the Iconic Engine team. The whole team researched; I made it run — Unity scripting, XR interactions, and the puzzle logic.",
    meta: {
      role: "Developer — Scripting & VR Interactions",
      scope: "6-person team · Unity, Blender & XR · Iconic Engine metaverse",
      methods: "Secondary Research · Competitive Analysis · Storyboarding · VR Prototyping",
    },
    stats: [
      { value: "16", label: "Valid luggage arrangements the puzzle accepts" },
      { value: "10", label: "Existing games studied in competitive analysis" },
      { value: "11–18", label: "Age range of our autistic player group" },
    ],
    hero: {
      src: spatialStoryboard,
      alt: "Storyboard keyframes of the VR game's user journey",
      caption:
        "Keyframes from the storyboard — a road-trip story wraps the puzzle: pack the trunk, then hit the road.",
    },
    blocks: [
      {
        type: "text",
        heading: "Finding the gap",
        body: "We analyzed ten spatial-thinking games — board games, arrangement puzzles, wayfinding and circuit builders. Almost everything out there was 2D, got repetitive fast, and really trained time or resource management instead of spatial skills. Immersive spatial-thinking games with co-experiencing simply didn't exist. That gap became our prompt: a story-driven VR mini-game for spatial arrangement, designed autism-first.",
      },
      {
        type: "figures",
        images: [
          {
            src: spatialMapping,
            alt: "Object mapping diagram of the trunk and luggage grid",
            caption:
              "Object mapping: a real jeep trunk (43 × 35.5 × 18.5) scaled to a clean 7 : 6 : 3 grid, with six luggage pieces sized to whole numbers.",
          },
          {
            src: spatialCombinations,
            alt: "Grid of all sixteen valid luggage arrangements",
            caption:
              "Enumerating the design space: all 16 logically valid arrangements — a yoga mat can never sit under a suitcase.",
          },
        ],
      },
      {
        type: "text",
        heading: "Puzzle math before pixels",
        body: "We mapped the trunk onto a whole-number grid so every piece — suitcase, water tank, yoga mat — had clean, scalable proportions, then enumerated every arrangement the trunk could accept. The game validates any of the 16 correct permutations, and the scripts I wrote (PuzzlePiece.cs, PuzzleManager.cs) are structured so future levels can define their own.",
      },
      {
        type: "points",
        heading: "An autism-first design system",
        items: [
          {
            title: "Color psychology over decoration",
            body: "Pastel backgrounds, one dominant color per object with a solid outline — high contrast exactly where it matters, zero visual overload everywhere else.",
          },
          {
            title: "Green means go, yellow means try again",
            body: "Research flagged red as a trigger color that can incite aggression in autistic children — so constructive feedback is calm yellow, positive feedback reassuring green.",
          },
          {
            title: "“First… then” statements",
            body: "A behavioral-management pattern from autism research drives every instruction: pair the less desirable task with the more desirable one, in short, clear language.",
          },
          {
            title: "Nothing unexpected",
            body: "No flashing elements, no startling audio, smooth anticipated transitions — the game is built to be a safe space before it is a fun one.",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: spatialMsgFirstThen,
            alt: "First-then action message card",
            caption: "Action messages",
          },
          {
            src: spatialMsgTutorial,
            alt: "Tutorial narration message card",
            caption: "Narration & tutorial style",
          },
          {
            src: spatialMsgGoodJob,
            alt: "Green positive feedback message card",
            caption: "Positive feedback — green, celebratory",
          },
          {
            src: spatialMsgTryAgain,
            alt: "Yellow constructive feedback message card",
            caption: "Constructive feedback — yellow, never red",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: spatialAssets,
            alt: "Toon-shaded low-poly luggage assets modeled in Blender",
            caption:
              "Custom low-poly assets modeled in Blender with toon shading — soft corners, distinct calm colors, and realistic handles so each object still reads as real-world luggage.",
          },
        ],
      },
      {
        type: "text",
        heading: "What I built",
        body: "I set up the Unity scene inside the Vasoo ecosystem, added colliders and XR interactions to every asset, implemented the in-game UI — main menu and progress indicator — and wrote the puzzle logic. On a correct arrangement, a fireworks particle system fires: a small celebration, deliberately calm, for a player group that earns it.",
      },
    ],
    takeaway:
      "Designing for autistic players turned every default — color, sound, timing, feedback — into a deliberate decision backed by research. Accessibility isn't a checklist at the end; it's the brief.",
  },
  {
    id: "02",
    anchor: "valorant-engagement",
    kicker: "Games User Research · Mixed Methods",
    title: "What Keeps Players in VALORANT?",
    summary:
      "Seven players. A thousand-plus hours each. Zero competitive FPS background. I combined surveys, gameplay observation, and in-game contextual interviews to find out why they stay — and only trusted conclusions where what players said matched what they did.",
    meta: {
      role: "UX Researcher",
      scope: "7 participants · competitive & casual modes",
      methods: "Survey · Observation · Contextual Interview",
    },
    stats: [
      { value: "7", label: "Players surveyed & observed" },
      { value: "1,000+", label: "Hours played by every participant" },
      { value: "0", label: "Had prior competitive FPS experience" },
    ],
    hero: {
      src: valorantRoster,
      alt: "Grid of VALORANT's full agent roster",
      caption:
        "The roster players sink those hours into. Every participant mained agents they first saw played by streamers.",
    },
    blocks: [
      {
        type: "text",
        heading: "The study",
        body: "I recruited players already familiar with the game and ran three passes: a survey for self-reported motivations, observation sessions across competitive and casual modes, and short interviews asked while participants were in-game — so answers reflected real moments, not memories. Conclusions were only drawn where the survey and the observed behavior agreed.",
      },
      {
        type: "points",
        heading: "What the data agreed on",
        items: [
          {
            title: "Motivation is social before it is competitive",
            body: "Across all seven players, social interaction, ranking up, entertainment, and gratification drove engagement. Playing with friends and getting better consistently outranked any single piece of content.",
          },
          {
            title: "Streamers are the real onboarding system",
            body: "Players preferred live Twitch pros over prerecorded videos, adapted their strategies and ability usage, and discovered aim trainers through them. Observation confirmed it: trainer users showed visibly faster reflexes, and esports watchers replicated pro strategies.",
          },
          {
            title: "Watching fills every gap playing leaves",
            body: "Players watched streams between rounds, after dying, and during loading screens. Watching and playing aren't separate activities — they're one continuous engagement loop.",
          },
          {
            title: "Frustration has a consistent shape",
            body: "Toxic random teammates, cheaters, early eliminations, and stalled rank progress were the universal pain points — the exact places the loop is most likely to break.",
          },
        ],
      },
      {
        type: "recs",
        heading: "Recommendations",
        items: [
          "Treat toxicity and cheating as retention work, not just moderation work — they attack the strongest motivator players have.",
          "Support content creators: they function as the game's de facto tutorial, strategy guide, and marketing channel.",
          "Protect competitive integrity — rank progression is a core motivator, so smurfs and cheaters directly attack retention.",
        ],
      },
    ],
    takeaway:
      "Self-reported motivations aligned closely with observed behavior — a rare, satisfying validation. The bigger lesson: a game's ecosystem (streams, trainers, friends) matters as much as the game itself.",
  },
  {
    id: "03",
    anchor: "valorant-culturalization",
    kicker: "Cross-Cultural Design Audit",
    title: "How VALORANT Carries Culture",
    summary:
      "A design audit separating the game's tangible cultural elements — maps, skins, controlled comms — from intangible ones: event-triggered banter the player can't script. The goal: find where the representation works, where it breaks, and what other games can steal.",
    meta: {
      role: "UX Researcher / Designer",
      scope: "Agent roster · voice lines · maps & cosmetics",
      methods: "Heuristic Audit · Content Analysis",
    },
    stats: [
      { value: "2", label: "Element types analyzed: tangible & intangible" },
      { value: "20+", label: "Agents representing distinct cultures" },
      { value: "3", label: "Core recommendations delivered" },
    ],
    hero: {
      src: valorantLotus,
      alt: "Concept art of the Lotus map with carved architecture",
      caption:
        "Map architecture as a tangible cultural element — built spaces that ground the fiction in real places.",
    },
    blocks: [
      {
        type: "text",
        heading: "Tangible vs. intangible",
        body: "I split the game's cultural signals into two buckets. Tangible: map structures, weapon skins, and controlled communication — radio commands where a character speaks for the player without losing their accent or dialect. Intangible: uncontrolled communication — banter between agents that references each other's cultures and colloquialisms, triggered by events the player doesn't control. The intangible bucket carries the heaviest cultural load.",
      },
      {
        type: "quotes",
        items: [
          {
            text: "Feels like just yesterday I was chopping 달래 at the store. Wonder if that place is still standing.",
            attribution: "Korean agent, mid-match — “달래” is Korean wild chive",
          },
          {
            text: "Breach! Bra jobbat! Did I say that right? Jobbat? Jobbatchi? Jobbatchi.",
            attribution: "Brazilian agent fumbling a Swedish colloquialism for “nice job”",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: valorantFood,
            alt: "Official art of three agents sharing dumplings",
            caption:
              "Culture carried through everyday scenes, not costumes — agents sharing a meal in official art.",
          },
          {
            src: valorantWheel,
            alt: "Three radial command wheel UI screenshots",
            caption:
              "Controlled communication: radial commands keep each agent's accent and natural dialect intact.",
          },
        ],
      },
      {
        type: "points",
        heading: "The audit verdict",
        items: [
          {
            title: "What works: voice as culture",
            body: "Voice lines are the highlight of the representation. Accents survive both controlled and uncontrolled communication, attire reinforces each background, and switching the game's language changes the voice lines themselves — not just the menus.",
          },
          {
            title: "What breaks: aesthetic dissonance",
            body: "The spike looks generically sci-fi no matter whose hands hold it, seasonal lore drops clash with the current art style, and the competitive player base skips the story anyway — narrative investment isn't landing where it's spent.",
          },
        ],
      },
      {
        type: "recs",
        heading: "Recommendations",
        items: [
          "Introduce a dedicated story-supporting game mode instead of delivering lore only through seasonal drops competitive players skip.",
          "Refresh gameplay or visuals on a regular cadence — Fortnite's quarterly shake-ups are the benchmark for keeping a live game fresh.",
          "Write more voice lines grounded in real-world scenarios; they're the game's most effective cultural vehicle.",
        ],
      },
    ],
    takeaway:
      "Cross-cultural design works when it resonates with a global audience instead of decorating for one. My playbook going forward: research deeply, consult cultural advisors, build diverse characters, offer inclusive language options — and treat representation as a process, not a checkbox.",
  },
  {
    id: "04",
    anchor: "happy-wheels",
    kicker: "Moderated Playtests · Usability",
    title: "Playtesting Happy Wheels",
    summary:
      "The developer bet that exaggerated gore could make repeated death fun. I ran moderated playtests and post-session interviews to test that bet — and to find where the UI quietly taxes players every single session.",
    meta: {
      role: "UX Researcher",
      scope: "Browser playtests · post-session interviews",
      methods: "Moderated Playtest · Interview · Persona",
    },
    stats: [
      { value: "3", label: "Research objectives tested" },
      { value: "5–7 min", label: "Average time to learn the controls, unaided" },
      { value: "4", label: "Usability issues uncovered" },
    ],
    hero: {
      src: hwFeatured,
      alt: "Happy Wheels featured levels browser UI",
      caption:
        "The featured-levels browser — the storefront for the game's real content: levels made by other players.",
    },
    blocks: [
      {
        type: "points",
        heading: "What the sessions showed",
        items: [
          {
            title: "The gore reads as comedy — exactly as intended",
            body: "Players smiled at the graphic visuals and were delighted they could keep moving an amputated character. Nobody found it disturbing. The designer's hypothesis — enjoyable death sustains a death-heavy loop — passed.",
          },
          {
            title: "Controls are instantly learnable",
            body: "Arrow keys plus one or two per-character actions meant every player figured the game out within 5–7 minutes, unaided. The game's high reactivity made experimenting feel safe.",
          },
          {
            title: "The UI fights the player in three places",
            body: "The in-level menu hides behind TAB instead of ESC. There's no quick-restart in a game whose loop is dying and retrying. And the level list scrolls slowly with no scroll bar — putting friction between players and the game's best content.",
          },
          {
            title: "User-generated levels are the motivation engine",
            body: "With no progression system, players stayed for the endless variety of player-made levels and the low time commitment: easy to play, fast to fun.",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: hwLevels,
            alt: "User submitted levels list UI",
            caption:
              "User-submitted levels doing the job a progression system normally would.",
          },
          {
            src: hwControls,
            alt: "Diagram of the keyboard control scheme",
            caption: "The entire control scheme — learnable in minutes.",
          },
        ],
      },
      {
        type: "persona",
        image: { src: hwPersona, alt: "Cartoon avatar of player persona Jay" },
        name: "Jay, 20 — playtest composite persona",
        body: "Loves the reactive mechanics, spends his time in the level editor, and prefers short games that get to the fun fast. Every recommendation below is tuned to keep Jay playing.",
      },
      {
        type: "recs",
        heading: "Recommendations",
        items: [
          "Rebind the in-level menu to ESC — or accept both — to match the convention every other game taught players.",
          "Add a one-key quick restart: the single highest-impact fix for a game built on dying and retrying.",
          "Add a scroll bar and faster browsing to the level list so user-generated content, the core motivator, is frictionless to reach.",
        ],
      },
    ],
    takeaway:
      "A designer's intent is a hypothesis until players confirm it. The gore hypothesis passed; the UI assumptions didn't. Small conventions — ESC to open menus, instant restarts — carry enormous weight, and breaking them taxes players every session.",
  },
  {
    id: "05",
    anchor: "detroit",
    kicker: "Interaction & Systems Analysis",
    title: "Choice & Consequence in Detroit: Become Human",
    summary:
      "A systems-level deconstruction of Quantic Dream's branching narrative — how a flowchart story system and a morality system convert player choices into consequence, and where the structure punishes the curiosity it invites.",
    meta: {
      role: "UX Analyst",
      scope: "Full-game analysis · 3 protagonist arcs",
      methods: "Systems Deconstruction · Interaction Loop Mapping",
    },
    stats: [
      { value: "3", label: "Playable protagonists with branching arcs" },
      { value: "2", label: "Core systems mapped: story flow & morality" },
      { value: "3", label: "Redesign proposals" },
    ],
    hero: {
      src: detroitCrowd,
      alt: "Rows of identical androids in a vast white hall",
      caption:
        "The game stakes its premise on heavy themes — AI rights, civil rights, and technology-driven unemployment.",
    },
    blocks: [
      {
        type: "loop",
        heading: "The core interaction loop",
        steps: [
          {
            label: "Input",
            body: "The player faces a moral dilemma — should Markus lead a peaceful protest, or turn to violence?",
          },
          {
            label: "Action",
            body: "The player chooses, guided by judgment, morality, or the storyline they want.",
          },
          {
            label: "Feedback",
            body: "The story reacts immediately — character reactions, branch reveals, flowchart updates.",
          },
          {
            label: "Outcome",
            body: "Consequences ripple forward, reshaping Markus's fate and public opinion of androids.",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: detroitFlowchart,
            alt: "Detroit: Become Human chapter flowchart screen",
            caption:
              "The in-game flowchart makes branches visible after the fact — but does nothing for in-the-moment cognitive load.",
          },
          {
            src: detroitScene,
            alt: "Android standing in the segregated android compartment of a bus",
            caption:
              "The android compartment — environmental storytelling that mirrors historical segregation.",
          },
        ],
      },
      {
        type: "points",
        heading: "Where the structure strains",
        items: [
          {
            title: "The consequence loop is the product",
            body: "Immediate, visible feedback after every choice is what makes decisions feel weighty. The emotional power comes from the loop's tightness, not from any single branch.",
          },
          {
            title: "Branch complexity outpaces player memory",
            body: "With three protagonists and deeply branching arcs, players struggle to hold the story state in their heads — and the flowchart only helps in hindsight.",
          },
          {
            title: "Replay punishes curiosity",
            body: "A missed choice can't be revisited in isolation: finish the chapter, then replay the story from the beginning. The system invites experimentation, then makes it expensive.",
          },
        ],
      },
      {
        type: "recs",
        heading: "Proposed redesigns",
        items: [
          "Allow chapter-level replay so players get wiggle room to explore alternate choices without restarting a whole arc.",
          "Fix scenes where the camera falls out of focus — polish issues are amplified in a game built on cinematic presentation.",
          "Explore a co-op mode: shared moral decision-making would externalize the deliberation players already do internally.",
        ],
      },
    ],
    takeaway:
      "Branching narrative is an interaction-design problem as much as a writing problem. Detroit nails the systems that create meaning — choice, consequence, morality — and underbuilds the ones that respect a player's time and memory.",
  },
  {
    id: "06",
    anchor: "spiderman-port",
    kicker: "GDC Talk Breakdown · Graphics & Performance",
    title: "Porting Spider-Man Remastered to PC",
    summary:
      "A breakdown of Nixxes' GDC Advanced Graphics Summit talk on bringing Insomniac's PS5 flagship to PC — read through a player-experience lens, because every pipeline decision lands somewhere a player can feel it: a shader hiccup, a cropped cutscene, a reflection that finally holds up.",
    meta: {
      role: "Analyst / Presenter",
      scope: "GDC Advanced Graphics Summit session · PS5 → PC port",
      methods: "Talk Analysis · Technical Deconstruction · Discussion Facilitation",
    },
    stats: [
      { value: "3", label: "Strategies weighed against shader-compilation stutter" },
      { value: "2", label: "Memory models reconciled: unified PS5 vs. split PC" },
      { value: "42:9", label: "Aspect ratio where graceful degradation finally adds bars" },
    ],
    hero: {
      src: gdcHero,
      alt: "Spider-Man gameplay with the gadget wheel HUD over the city",
      caption:
        "Insomniac's PS5 flagship running on PC — the port work is invisible exactly when it succeeds.",
    },
    blocks: [
      {
        type: "points",
        heading: "What Nixxes had to solve",
        items: [
          {
            title: "Shader stutter is a first-impression problem",
            body: "Direct3D 12 builds pipeline state objects at runtime, so something has to give: let the game stutter, pre-compile everything at boot behind a long wait, or stream PSOs during loading screens. Nixxes treated it as part of material streaming — the option players never notice.",
          },
          {
            title: "Two memory models, one game",
            body: "PS5 uses unified memory; PC splits video and system memory. Go over the VRAM budget and Windows' video memory manager demotes heaps to system RAM — the port has to budget around a mechanism it doesn't control.",
          },
          {
            title: "Ray tracing got a PC-sized upgrade",
            body: "The acceleration structure splits into BLAS per object and TLAS for the scene. PS5 renders reflections at half resolution; on PC, Nixxes pushed full resolution, better LOD models, and extra geometry the console version never included.",
          },
          {
            title: "Ultrawide is a design problem, not a render problem",
            body: "Cinematics are authored for 16:9 — naively widening them clips scenes apart. Up to 32:9 the edges blur into peripheral vision; past 42:9 black bars appear. Graceful degradation, tuned ratio by ratio.",
          },
        ],
      },
      {
        type: "figures",
        images: [
          {
            src: gdcCompare,
            alt: "Side-by-side comparison frames of Spider-Man swinging through the city",
            caption:
              "Side-by-side frames from the talk — same swing, different pipeline budgets.",
          },
          {
            src: gdcMemory,
            alt: "D3D12 memory management thread diagram from the talk",
            caption:
              "The D3D12 memory-management flow: render, memory-move, and release threads negotiating one budget.",
          },
        ],
      },
      {
        type: "text",
        heading: "The discussion I led",
        body: "I closed the session with two prompts: which PC-only features have you personally felt that the console version couldn't offer — and why don't console exclusives ship with PC-level flexibility when the hardware is clearly capable? The conversation kept landing on the same point: platform constraints are design constraints, and players experience them directly.",
      },
    ],
    takeaway:
      "Players don't see pipelines — they feel them. A PSO hiccup is a bad first impression; an ultrawide crop is a broken cutscene. The best port work is invisible: constraint after constraint resolved so the player never knows there was one.",
  },
];

export const DESIGN_CODA = {
  kicker: "Off the clock",
  title: "Animation history, studied like a design system",
  body: "I presented a deep-dive on Disney's early feature films: how the multiplane camera faked 3D depth in 1937, how Fantasound put surround sound in theaters in 1940, and how the Xerox process traded painterly perfection for the “spark of life” in 101 Dalmatians. Old constraints, inventive workarounds — the same job description as UX.",
  image: {
    src: disneyCollage,
    alt: "Collage of classic Disney characters around the words “it was all started by a mouse”",
  },
};
