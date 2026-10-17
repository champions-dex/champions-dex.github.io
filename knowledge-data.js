// Champions Dex tournament knowledge layer.
// Numeric records are never promoted above the verification status shown here.
const CHAMPIONS_APP_VERSION = '1.4.0';

const CHAMPIONS_DATA_STATUSES = Object.freeze({
  official: { label: 'Officially confirmed', className: 'official', rank: 6 },
  tested: { label: 'Community-tested', className: 'tested', rank: 5 },
  specialist: { label: 'Champions-specific reference', className: 'specialist', rank: 5 },
  inferred: { label: 'Inferred', className: 'inferred', rank: 4 },
  reference: { label: 'Generic mainline reference', className: 'reference', rank: 3 },
  contradicted: { label: 'Contradicted', className: 'contradicted', rank: 2 },
  unavailable: { label: 'Unavailable', className: 'unavailable', rank: 1 }
});

const CHAMPIONS_SOURCES = Object.freeze({
  officialNews: {
    name: 'Official Pokémon Champions News',
    url: 'https://champions.pokemon.com/en-us/news/',
    kind: 'Official'
  },
  officialStrategy: {
    name: 'Official Regulation M-C Announcement',
    url: 'https://www.pokemon.com/us/news/get-ready-for-regulation-set-m-c-in-pokemon-champions',
    kind: 'Official'
  },
  officialRegulation: {
    name: 'Official Regulation Set M-C Record',
    url: 'https://champions-news.pokemon-home.com/en/page/816.html',
    kind: 'Official'
  },
  serebiiRegulation: {
    name: 'Serebii Regulation M-C',
    url: 'https://www.serebii.net/pokemonchampions/rankedbattle/regulationm-c.shtml',
    kind: 'Specialist reference'
  },
  serebiiMoves: {
    name: 'Serebii Champions Updated Attacks',
    url: 'https://www.serebii.net/pokemonchampions/updatedattacks.shtml',
    kind: 'Specialist reference'
  },
  serebiiMoveList: {
    name: 'Serebii Champions Available Moves',
    url: 'https://www.serebii.net/pokemonchampions/moves.shtml',
    kind: 'Specialist reference'
  },
  serebiiNewAbilities: {
    name: 'Serebii Champions Ability Database',
    url: 'https://www.serebii.net/pokemonchampions/newabilities.shtml',
    kind: 'Specialist reference'
  },
  serebiiUpdatedAbilities: {
    name: 'Serebii Champions Updated Abilities',
    url: 'https://www.serebii.net/pokemonchampions/updatedabilities.shtml',
    kind: 'Specialist reference'
  },
  serebiiItems: {
    name: 'Serebii Champions Items',
    url: 'https://www.serebii.net/pokemonchampions/items.shtml',
    kind: 'Specialist reference'
  },
  mechanicsResearch: {
    name: 'Smogon Champions Battle Mechanics Research',
    url: 'https://www.smogon.com/forums/threads/champions-battle-mechanics-research.3780372/',
    kind: 'Community research'
  },
  pokeapi: {
    name: 'PokéAPI canonical reference',
    url: 'https://pokeapi.co/',
    kind: 'Generic mainline reference'
  }
});

const CHAMPIONS_REGULATIONS = Object.freeze({
  active: 'M-C',
  records: {
    'M-C': {
      id: 'M-C',
      name: 'Regulation M-C',
      startDate: '2026-09-09T02:00:00Z',
      endDateExclusive: '2026-12-02T01:59:00Z',
      displayRange: '9 Sep 2026, 02:00 UTC – 2 Dec 2026, 01:59 UTC',
      timezoneNote: 'Official dates and times are shown in UTC.',
      level: 50,
      singles: { registerMin: 3, registerMax: 6, select: 3, previewSeconds: 90, turnSeconds: 45, playerSeconds: 420 },
      doubles: { registerMin: 4, registerMax: 6, select: 4, previewSeconds: 90, turnSeconds: 45, playerSeconds: 420 },
      clauses: { species: true, items: true, megaPerBattle: 1 },
      source: 'officialRegulation',
      status: 'official',
      lastVerified: '2026-09-10'
    }
  }
});

const CHAMPIONS_TERM_EXTRAS = [
  {
    id: 'grounded', name: 'Grounded', aliases: ['on the ground', 'airborne'], category: 'Position',
    summary: 'A grounded Pokémon is affected by Ground moves, grounded hazards, and terrain effects.',
    exact: ['Flying types and Levitate users are normally ungrounded.', 'Gravity, Iron Ball, Ingrain, Roost, and selected move effects can make a Pokémon grounded.', 'Grounded state is evaluated when the relevant move or field effect resolves.'],
    conditions: 'Typing, Ability, held item, field state, and temporary effects all matter.',
    exceptions: 'Some effects explicitly bypass or ignore ordinary grounded checks.',
    related: ['gravity', 'electric-terrain', 'grassy-terrain', 'psychic-terrain', 'misty-terrain', 'spikes'],
    status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'contact', name: 'Contact move', aliases: ['makes contact', 'non-contact'], category: 'Move property',
    summary: 'A move flagged as contact can activate contact-based Abilities, items, and move effects.',
    exact: ['Contact is a move flag, not a test of whether the animation visibly touches the target.', 'Protecting or missing normally prevents contact-triggered effects because the hit did not connect.'],
    conditions: 'The move record must explicitly carry the contact flag.',
    exceptions: 'Long Reach and similar effects can suppress contact behavior.',
    related: ['flinch'], status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03'
  },
  {
    id: 'full-hp', name: 'Full HP', aliases: ['maximum HP', 'at full health'], category: 'Battle state',
    summary: 'The Pokémon currently has exactly its maximum HP.',
    exact: ['Even 1 HP of damage means the Pokémon is not at full HP.', 'Healing back to maximum HP restores full-HP conditions unless an effect says otherwise.'],
    related: ['multiscale'], status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'residual-damage', name: 'Residual damage', aliases: ['chip damage', 'end-of-turn damage'], category: 'Damage',
    summary: 'Indirect HP loss from status, weather, trapping, hazards, or persistent effects.',
    exact: ['Residual damage is normally calculated from maximum HP using the effect’s listed fraction.', 'It is not direct move damage and may bypass modifiers that only affect attacks.'],
    related: ['poison', 'bad-poison', 'burn', 'sand', 'leech-seed', 'salt-cure'], status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'recoil', name: 'Recoil', aliases: ['recoil damage', 'crash damage'], category: 'Move property',
    summary: 'HP the user loses because of its own move.',
    exact: ['Damage-based recoil uses the actual damage inflicted, subject to the move’s listed fraction.', 'Crash damage occurs when selected moves miss or fail and follows that move’s own rule.'],
    exceptions: 'Rock Head and other effects can prevent specified recoil but do not necessarily prevent crash damage.',
    status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03'
  },
  {
    id: 'redirection', name: 'Redirection', aliases: ['redirect', 'Rage Powder', 'Follow Me'], category: 'Targeting',
    summary: 'Changes the target of an opposing single-target move in Double Battles.',
    exact: ['Redirection does not normally affect spread moves.', 'Some move types, Abilities, or target rules can ignore a redirection effect.'],
    status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'suppression', name: 'Suppression', aliases: ['suppressed', 'ignored while active'], category: 'Rules',
    summary: 'Temporarily prevents an Ability, item, weather, or other effect from functioning without removing it.',
    exact: ['The underlying Ability or item remains present.', 'Its effect resumes when the suppressing condition ends unless another rule removes it.'],
    related: ['magic-room'], status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'immunity', name: 'Immunity', aliases: ['immune', 'no effect'], category: 'Damage',
    summary: 'An immune target receives no effect from the relevant move or condition.',
    exact: ['A type multiplier of ×0 deals 0 HP damage.', 'Ability, item, terrain, status, or targeting immunities may block all or only part of a move.'],
    related: ['types'], status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'bypass', name: 'Bypass', aliases: ['ignores', 'goes through'], category: 'Rules',
    summary: 'An explicit exception that prevents a normal defensive or targeting rule from applying.',
    exact: ['The bypass applies only to the named rule; it does not automatically ignore unrelated defenses.'],
    status: 'reference', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  },
  {
    id: 'damage-roll', name: 'Damage roll', aliases: ['random roll', 'damage variance'], category: 'Damage',
    summary: 'The random multiplier applied during damage calculation.',
    exact: ['Current Champions community research indicates integer rolls from 86 through 100 inclusive.', 'The app shows every resulting HP value after integer flooring; repeated HP values can come from different random rolls.'],
    conditions: 'This is community-tested rather than an officially published formula.',
    status: 'tested', source: 'mechanicsResearch', lastVerified: '2026-08-03'
  }
];

const CHAMPIONS_ABILITY_OVERRIDES = Object.freeze({
  drought: { name: 'Drought', summary: 'Sets Harsh Sunlight when the Pokémon enters battle.', trigger: 'On entry', scope: 'Entire field', durationTerm: 'sun', relatedTerms: ['sun'], calculator: 'supported', status: 'tested', source: 'mechanicsResearch', lastVerified: '2026-08-03' },
  drizzle: { name: 'Drizzle', summary: 'Sets Rain when the Pokémon enters battle.', trigger: 'On entry', scope: 'Entire field', durationTerm: 'rain', relatedTerms: ['rain'], calculator: 'supported', status: 'tested', source: 'mechanicsResearch', lastVerified: '2026-08-03' },
  'sand-stream': { name: 'Sand Stream', summary: 'Sets Sandstorm when the Pokémon enters battle.', trigger: 'On entry', scope: 'Entire field', durationTerm: 'sand', relatedTerms: ['sand'], calculator: 'supported', status: 'tested', source: 'mechanicsResearch', lastVerified: '2026-08-03' },
  'snow-warning': { name: 'Snow Warning', summary: 'Sets Snow when the Pokémon enters battle.', trigger: 'On entry', scope: 'Entire field', durationTerm: 'snow', relatedTerms: ['snow'], calculator: 'supported', status: 'tested', source: 'mechanicsResearch', lastVerified: '2026-08-03' },
  blaze: { name: 'Blaze', summary: 'At 1/3 max HP or less, Fire-type move damage becomes ×1.5 (a 50% increase).', trigger: 'Damage calculation', scope: 'User', threshold: 'HP ≤ 1/3 maximum', multiplier: 1.5, calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  overgrow: { name: 'Overgrow', summary: 'At 1/3 max HP or less, Grass-type move damage becomes ×1.5 (a 50% increase).', trigger: 'Damage calculation', scope: 'User', threshold: 'HP ≤ 1/3 maximum', multiplier: 1.5, calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  chlorophyll: { name: 'Chlorophyll', summary: 'Effective Speed becomes ×2 during Harsh Sunlight.', trigger: 'While weather is active', scope: 'User', multiplier: 2, relatedTerms: ['sun'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  'swift-swim': { name: 'Swift Swim', summary: 'Effective Speed becomes ×2 during Rain.', trigger: 'While weather is active', scope: 'User', multiplier: 2, relatedTerms: ['rain'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  'solar-power': { name: 'Solar Power', summary: 'During Harsh Sunlight, Special Attack becomes ×1.5 and the user loses 1/8 (12.5%) max HP at each turn end.', trigger: 'Weather active / turn end', scope: 'User', multiplier: 1.5, cost: '1/8 max HP each turn', relatedTerms: ['sun', 'residual-damage'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  'tough-claws': { name: 'Tough Claws', summary: 'Moves that make contact deal ×1.3 damage (a 30% increase).', trigger: 'Damage calculation', scope: 'User', multiplier: 1.3, relatedTerms: ['contact'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  'thick-fat': { name: 'Thick Fat', summary: 'Damage taken from Fire- and Ice-type moves becomes ×0.5 (a 50% reduction).', trigger: 'Damage calculation', scope: 'User', multiplier: 0.5, calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  intimidate: { name: 'Intimidate', summary: 'Lowers each adjacent opposing Pokémon’s Attack by 1 stage (×2/3 from neutral).', trigger: 'On entry', scope: 'Adjacent opponents', stages: { attack: -1 }, relatedTerms: ['stat-stages'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  'friend-guard': { name: 'Friend Guard', summary: 'Damage received by allies becomes ×0.75 (a 25% reduction); it does not protect the Ability holder itself.', trigger: 'Damage calculation', scope: 'Allies', multiplier: 0.75, calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  multiscale: { name: 'Multiscale', summary: 'At full HP, direct move damage received becomes ×0.5 (a 50% reduction).', trigger: 'Damage calculation', scope: 'User', threshold: 'Exactly full HP', multiplier: 0.5, relatedTerms: ['full-hp'], calculator: 'supported', status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03' },
  sharpness: { name:'Sharpness', summary:'Slicing moves deal ×1.5 damage (a 50% increase).', trigger:'Damage calculation', scope:'User', multiplier:1.5, calculator:'not-modeled', status:'tested', source:'serebiiRegulation', lastVerified:'2026-09-10' },
  aerilate: { name:'Aerilate', summary:'Normal-type moves become Flying-type and then deal ×1.2 damage (a 20% increase).', trigger:'Before damage calculation', scope:'User', multiplier:1.2, calculator:'not-modeled', status:'tested', source:'serebiiRegulation', lastVerified:'2026-09-10' },
  levitate: { name:'Levitate', summary:'The Pokémon is immune to Ground-type attacks and is normally ungrounded for terrain and grounded hazards.', trigger:'Continuous', scope:'User', relatedTerms:['grounded'], calculator:'supported', status:'tested', source:'serebiiRegulation', lastVerified:'2026-09-10' },
  'aura-guard': { name:'Aura Guard', summary:'Contact move damage received becomes ×0.5 (a 50% reduction).', trigger:'Damage calculation', scope:'User', multiplier:0.5, relatedTerms:['contact'], calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  'piercing-drill': { name:'Piercing Drill', summary:'Contact moves can hit through protection for 25% of their ordinary damage; all non-protection effects still trigger.', trigger:'Protected target', scope:'User', multiplier:0.25, relatedTerms:['contact','protect'], calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  dragonize: { name:'Dragonize', summary:'Normal-type moves become Dragon-type and receive a ×1.2 power multiplier (a 20% increase).', trigger:'Before damage calculation', scope:'User', multiplier:1.2, calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  eelevate: { name:'Eelevate', summary:'Makes the Pokémon ungrounded and immune to Ground moves, Spikes, Toxic Spikes, and Sticky Web; after it KOs a target with an attack, its highest stat rises by 1 stage.', trigger:'Continuous / after an attacking KO', scope:'User', relatedTerms:['grounded','stat-stages'], calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  'mega-sol': { name:'Mega Sol', summary:'The Pokémon can use its moves as though Harsh Sunlight were active even when the field weather is not Harsh Sunlight.', trigger:'While selecting and resolving moves', scope:'User', relatedTerms:['sun'], calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  'fire-mane': { name:'Fire Mane', summary:'Fire-type move power becomes ×1.5 (a 50% increase).', trigger:'Damage calculation', scope:'User', multiplier:1.5, calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  'spicy-spray': { name:'Spicy Spray', summary:'When the Pokémon takes damage from a move, the attacker is burned.', trigger:'After taking move damage', scope:'Attacker', relatedTerms:['burn'], calculator:'not-modeled', status:'specialist', source:'serebiiNewAbilities', lastVerified:'2026-09-12' },
  'thermal-exchange': { name:'Thermal Exchange', summary:'A Fire-type hit raises Attack by 1 stage, and the Pokémon cannot be burned.', trigger:'After taking a Fire-type hit / status check', scope:'User', stages:{attack:1}, relatedTerms:['stat-stages','burn'], calculator:'not-modeled', status:'tested', source:'serebiiRegulation', lastVerified:'2026-09-10' },
  'run-away': { name:'Run Away', summary:'Allows the Pokémon to switch even when another effect would normally prevent switching.', trigger:'Switch selection', scope:'User', calculator:'not-modeled', status:'specialist', source:'serebiiUpdatedAbilities', lastVerified:'2026-09-12' },
  'unseen-fist': { name:'Unseen Fist', summary:'Eligible contact moves can hit through protection for 25% of their ordinary damage.', trigger:'Protected target', scope:'User', multiplier:0.25, relatedTerms:['contact','protect'], calculator:'not-modeled', status:'specialist', source:'serebiiUpdatedAbilities', lastVerified:'2026-09-12' }
});

const typeBoostItems = [
  ['black-belt','Black Belt','fighting'], ['black-glasses','Black Glasses','dark'], ['charcoal','Charcoal','fire'],
  ['dragon-fang','Dragon Fang','dragon'], ['fairy-feather','Fairy Feather','fairy'], ['hard-stone','Hard Stone','rock'],
  ['magnet','Magnet','electric'], ['metal-coat','Metal Coat','steel'], ['miracle-seed','Miracle Seed','grass'],
  ['mystic-water','Mystic Water','water'], ['never-melt-ice','Never-Melt Ice','ice'], ['poison-barb','Poison Barb','poison'],
  ['sharp-beak','Sharp Beak','flying'], ['silk-scarf','Silk Scarf','normal'], ['silver-powder','Silver Powder','bug'],
  ['soft-sand','Soft Sand','ground'], ['spell-tag','Spell Tag','ghost'], ['twisted-spoon','Twisted Spoon','psychic']
].map(([id,name,type]) => ({ id, name, category: 'Type boost', summary: `${titleCaseKnowledge(type)}-type move damage becomes ×1.2 (a 20% increase).`, multiplier: 1.2, appliesTo: `${titleCaseKnowledge(type)}-type moves`, consumed: false, calculator: 'supported', status: 'tested', source: 'serebiiItems', lastVerified: '2026-08-03' }));

const megaStoneItems = [
  ['abomasite','Abomasite','Abomasnow'],
  ['absolite','Absolite','Absol'],
  ['aerodactylite','Aerodactylite','Aerodactyl'],
  ['aggronite','Aggronite','Aggron'],
  ['alakazite','Alakazite','Alakazam'],
  ['altarianite','Altarianite','Altaria'],
  ['ampharosite','Ampharosite','Ampharos'],
  ['audinite','Audinite','Audino'],
  ['banettite','Banettite','Banette'],
  ['barbaracite','Barbaracite','Barbaracle'],
  ['beedrillite','Beedrillite','Beedrill'],
  ['blastoisinite','Blastoisinite','Blastoise'],
  ['blazikenite','Blazikenite','Blaziken'],
  ['cameruptite','Cameruptite','Camerupt'],
  ['chandelurite','Chandelurite','Chandelure'],
  ['charizardite-x','Charizardite X','Charizard'],
  ['charizardite-y','Charizardite Y','Charizard'],
  ['chesnaughtite','Chesnaughtite','Chesnaught'],
  ['chimechite','Chimechite','Chimecho'],
  ['clefablite','Clefablite','Clefable'],
  ['crabominite','Crabominite','Crabominable'],
  ['delphoxite','Delphoxite','Delphox'],
  ['dragalgite','Dragalgite','Dragalge'],
  ['dragoninite','Dragoninite','Dragonite'],
  ['drampanite','Drampanite','Drampa'],
  ['eelektrossite','Eelektrossite','Eelektross'],
  ['emboarite','Emboarite','Emboar'],
  ['excadrite','Excadrite','Excadrill'],
  ['falinksite','Falinksite','Falinks'],
  ['feraligite','Feraligite','Feraligatr'],
  ['floettite','Floettite','Eternal Floette'],
  ['froslassite','Froslassite','Froslass'],
  ['galladite','Galladite','Gallade'],
  ['garchompite','Garchompite','Garchomp'],
  ['gardevoirite','Gardevoirite','Gardevoir'],
  ['gengarite','Gengarite','Gengar'],
  ['glalitite','Glalitite','Glalie'],
  ['glimmoranite','Glimmoranite','Glimmora'],
  ['golurkite','Golurkite','Golurk'],
  ['greninjite','Greninjite','Greninja'],
  ['gyaradosite','Gyaradosite','Gyarados'],
  ['hawluchanite','Hawluchanite','Hawlucha'],
  ['heracronite','Heracronite','Heracross'],
  ['houndoominite','Houndoominite','Houndoom'],
  ['kangaskhanite','Kangaskhanite','Kangaskhan'],
  ['lopunnite','Lopunnite','Lopunny'],
  ['lucarionite','Lucarionite','Lucario'],
  ['malamarite','Malamarite','Malamar'],
  ['manectite','Manectite','Manectric'],
  ['mawilite','Mawilite','Mawile'],
  ['medichamite','Medichamite','Medicham'],
  ['meganiumite','Meganiumite','Meganium'],
  ['meowsticite','Meowsticite','Meowstic'],
  ['metagrossite','Metagrossite','Metagross'],
  ['pidgeotite','Pidgeotite','Pidgeot'],
  ['pinsirite','Pinsirite','Pinsir'],
  ['pyroarite','Pyroarite','Pyroar'],
  ['raichunite-x','Raichunite X','Raichu'],
  ['raichunite-y','Raichunite Y','Raichu'],
  ['sablenite','Sablenite','Sableye'],
  ['sceptilite','Sceptilite','Sceptile'],
  ['scizorite','Scizorite','Scizor'],
  ['scolipite','Scolipite','Scolipede'],
  ['scovillainite','Scovillainite','Scovillain'],
  ['scraftinite','Scraftinite','Scrafty'],
  ['sharpedonite','Sharpedonite','Sharpedo'],
  ['skarmorite','Skarmorite','Skarmory'],
  ['slowbronite','Slowbronite','Slowbro'],
  ['staraptite','Staraptite','Staraptor'],
  ['starminite','Starminite','Starmie'],
  ['steelixite','Steelixite','Steelix'],
  ['swampertite','Swampertite','Swampert'],
  ['tyranitarite','Tyranitarite','Tyranitar'],
  ['venusaurite','Venusaurite','Venusaur'],
  ['victreebelite','Victreebelite','Victreebel'],
  ['absolite-z','Absolite Z','Absol'],
  ['salamencite','Salamencite','Salamence'],
  ['garchompite-z','Garchompite Z','Garchomp'],
  ['lucarionite-z','Lucarionite Z','Lucario'],
  ['golisopite','Golisopite','Golisopod'],
  ['baxcalibrite','Baxcalibrite','Baxcalibur']
].map(([id,name,species]) => ({ id, name, category:'Mega Stone', summary:`Allows ${species} to Mega Evolve during battle. The current regulation permits one Mega Evolution per Trainer in a battle.`, appliesTo:species, consumed:false, relatedTerms:['mega-evolution'], calculator:'not-applicable', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' }));

// Mega form slug (as used in megaRoster / CHAMPIONS_MEGA_DATA) -> required Mega Stone display name.
// Built explicitly so X/Y/Z variants never collapse into one another.
const CHAMPIONS_MEGA_STONE_BY_FORM = Object.freeze({
  'venusaur-mega': 'Venusaurite', 'charizard-mega-x': 'Charizardite X', 'charizard-mega-y': 'Charizardite Y',
  'blastoise-mega': 'Blastoisinite', 'beedrill-mega': 'Beedrillite', 'pidgeot-mega': 'Pidgeotite',
  'raichu-mega-x': 'Raichunite X', 'raichu-mega-y': 'Raichunite Y', 'clefable-mega': 'Clefablite',
  'victreebel-mega': 'Victreebelite', 'alakazam-mega': 'Alakazite', 'slowbro-mega': 'Slowbronite',
  'gengar-mega': 'Gengarite', 'kangaskhan-mega': 'Kangaskhanite', 'starmie-mega': 'Starminite',
  'pinsir-mega': 'Pinsirite', 'gyarados-mega': 'Gyaradosite', 'aerodactyl-mega': 'Aerodactylite',
  'dragonite-mega': 'Dragoninite', 'meganium-mega': 'Meganiumite', 'feraligatr-mega': 'Feraligite',
  'ampharos-mega': 'Ampharosite', 'steelix-mega': 'Steelixite', 'scizor-mega': 'Scizorite',
  'heracross-mega': 'Heracronite', 'skarmory-mega': 'Skarmorite', 'houndoom-mega': 'Houndoominite',
  'tyranitar-mega': 'Tyranitarite', 'sceptile-mega': 'Sceptilite', 'blaziken-mega': 'Blazikenite',
  'swampert-mega': 'Swampertite', 'gardevoir-mega': 'Gardevoirite', 'sableye-mega': 'Sablenite',
  'mawile-mega': 'Mawilite', 'aggron-mega': 'Aggronite', 'medicham-mega': 'Medichamite',
  'manectric-mega': 'Manectite', 'sharpedo-mega': 'Sharpedonite', 'camerupt-mega': 'Cameruptite',
  'altaria-mega': 'Altarianite', 'banette-mega': 'Banettite', 'chimecho-mega': 'Chimechite',
  'absol-mega': 'Absolite', 'absol-mega-z': 'Absolite Z', 'glalie-mega': 'Glalitite',
  'salamence-mega': 'Salamencite', 'metagross-mega': 'Metagrossite', 'staraptor-mega': 'Staraptite',
  'froslass-mega': 'Froslassite', 'emboar-mega': 'Emboarite', 'excadrill-mega': 'Excadrite',
  'scolipede-mega': 'Scolipite', 'scrafty-mega': 'Scraftinite', 'eelektross-mega': 'Eelektrossite',
  'chandelure-mega': 'Chandelurite', 'golurk-mega': 'Golurkite', 'chesnaught-mega': 'Chesnaughtite',
  'delphox-mega': 'Delphoxite', 'greninja-mega': 'Greninjite', 'pyroar-mega': 'Pyroarite',
  'floette-mega': 'Floettite', 'meowstic-mega': 'Meowsticite', 'malamar-mega': 'Malamarite',
  'barbaracle-mega': 'Barbaracite', 'dragalge-mega': 'Dragalgite', 'hawlucha-mega': 'Hawluchanite',
  'lopunny-mega': 'Lopunnite', 'garchomp-mega': 'Garchompite', 'garchomp-mega-z': 'Garchompite Z',
  'lucario-mega': 'Lucarionite', 'lucario-mega-z': 'Lucarionite Z', 'abomasnow-mega': 'Abomasite',
  'gallade-mega': 'Galladite', 'audino-mega': 'Audinite', 'crabominable-mega': 'Crabominite',
  'drampa-mega': 'Drampanite', 'falinks-mega': 'Falinksite', 'scovillain-mega': 'Scovillainite',
  'glimmora-mega': 'Glimmoranite', 'golisopod-mega': 'Golisopite', 'baxcalibur-mega': 'Baxcalibrite'
});
const megaStoneForForm = formSlug => CHAMPIONS_MEGA_STONE_BY_FORM[String(formSlug || '').toLowerCase()] || null;

const resistanceBerryItems = [
  ['babiri-berry','Babiri Berry','steel'],
  ['charti-berry','Charti Berry','rock'],
  ['chilan-berry','Chilan Berry','normal'],
  ['chople-berry','Chople Berry','fighting'],
  ['coba-berry','Coba Berry','flying'],
  ['colbur-berry','Colbur Berry','dark'],
  ['haban-berry','Haban Berry','dragon'],
  ['kasib-berry','Kasib Berry','ghost'],
  ['kebia-berry','Kebia Berry','poison'],
  ['occa-berry','Occa Berry','fire'],
  ['passho-berry','Passho Berry','water'],
  ['payapa-berry','Payapa Berry','psychic'],
  ['rindo-berry','Rindo Berry','grass'],
  ['roseli-berry','Roseli Berry','fairy'],
  ['shuca-berry','Shuca Berry','ground'],
  ['tanga-berry','Tanga Berry','bug'],
  ['wacan-berry','Wacan Berry','electric'],
  ['yache-berry','Yache Berry','ice']
].map(([id,name,type]) => ({ id, name, category:'Resistance Berry', summary:`When hit by a qualifying ${titleCaseKnowledge(type)}-type move, damage from that move becomes ×0.5; the Berry is consumed. ${type === 'normal' ? 'Unlike the other resistance Berries, Chilan does not require the hit to be supereffective.' : 'The hit must be supereffective.'}`, multiplier:0.5, appliesTo:`${titleCaseKnowledge(type)}-type damage`, consumed:true, calculator:'supported', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' }));

const utilityBerryItems = [
  ['aspear-berry','Aspear Berry','Cures freeze when triggered.'],
  ['cheri-berry','Cheri Berry','Cures paralysis when triggered.'],
  ['chesto-berry','Chesto Berry','Cures sleep when triggered.'],
  ['leppa-berry','Leppa Berry','Restores 10 PP to a depleted move when triggered.'],
  ['lum-berry','Lum Berry','Cures a major status condition or confusion when triggered.'],
  ['oran-berry','Oran Berry','Restores 10 HP when its HP trigger is reached.'],
  ['pecha-berry','Pecha Berry','Cures poison when triggered.'],
  ['persim-berry','Persim Berry','Cures confusion when triggered.'],
  ['rawst-berry','Rawst Berry','Cures burn when triggered.']
].map(([id,name,summary]) => ({ id, name, category:'Utility Berry', summary, consumed:true, calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' }));

const inventoryItems = [
  ...['Bug','Dark','Dragon','Electric','Fairy','Fighting','Fire','Flying','Ghost','Grass','Ground','Ice','Normal','Poison','Psychic','Rock','Steel','Water'].map(type => [`${type.toLowerCase()}-affinity-ticket`,`${type}-Type Affinity Ticket`,`Makes the next Recruit Ranch lineup more likely to contain ${type}-type Pokémon.`]),
  ...['Dive','Dusk','Heal','Luxury','Nest','Net','Poke','Premier','Quick','Rare Poke','Repeat','Timer'].map(ball => [`${ball.toLowerCase().replaceAll(' ','-')}-ball-ticket`,`${ball} Ball Guaranteed Ticket`,`Generates a Recruit Ranch lineup using ${ball} Balls.`]),
  ['quick-coupon','Quick Coupon','Reduces Recruit Ranch wait time.'],
  ['teammate-ticket','Teammate Ticket','Recruits a Pokémon at Recruit Ranch.'],
  ['training-ticket','Training Ticket','Trains a Pokémon without spending Victory Points.']
].map(([id,name,summary]) => ({ id, name, category:'Inventory / recruiting', summary, consumed:true, calculator:'not-applicable', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' }));

function titleCaseKnowledge(value) {
  return String(value || '').split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

const CHAMPIONS_ITEMS = Object.freeze([
  { id:'life-orb', name:'Life Orb', category:'Damage', summary:'Move damage becomes ×1.3 (a 30% increase); after a successful damaging attack, the holder loses 1/10 (10%) max HP.', multiplier:1.3, cost:'1/10 max HP after a successful damaging move', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'choice-scarf', name:'Choice Scarf', category:'Speed', summary:'Speed becomes ×1.5, but the holder is locked into its first selected move until it leaves the field or the item is suppressed/removed.', multiplier:1.5, appliesTo:'Speed', consumed:false, calculator:'supported', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'muscle-band', name:'Muscle Band', category:'Damage', summary:'Physical move damage becomes ×1.1 (a 10% increase).', multiplier:1.1, appliesTo:'Physical moves', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'wise-glasses', name:'Wise Glasses', category:'Damage', summary:'Special move damage becomes ×1.1 (a 10% increase).', multiplier:1.1, appliesTo:'Special moves', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'expert-belt', name:'Expert Belt', category:'Damage', summary:'Supereffective move damage becomes ×1.2 (a 20% increase).', multiplier:1.2, appliesTo:'Supereffective moves', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'light-clay', name:'Light Clay', category:'Field duration', summary:'Reflect, Light Screen, and Aurora Veil set by the holder last 8 turns instead of 5.', consumed:false, relatedTerms:['reflect','light-screen','aurora-veil'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'heat-rock', name:'Heat Rock', category:'Weather duration', summary:'Harsh Sunlight set by the holder lasts 8 turns instead of 5.', consumed:false, relatedTerms:['sun'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'damp-rock', name:'Damp Rock', category:'Weather duration', summary:'Rain set by the holder lasts 8 turns instead of 5.', consumed:false, relatedTerms:['rain'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'smooth-rock', name:'Smooth Rock', category:'Weather duration', summary:'Sandstorm set by the holder lasts 8 turns instead of 5.', consumed:false, relatedTerms:['sand'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'icy-rock', name:'Icy Rock', category:'Weather duration', summary:'Snow set by the holder lasts 8 turns instead of 5.', consumed:false, relatedTerms:['snow'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'focus-sash', name:'Focus Sash', category:'Survival', summary:'At full HP, a hit that would knock out the holder instead leaves it at 1 HP; the item is then consumed.', threshold:'Exactly full HP', consumed:true, relatedTerms:['full-hp'], calculator:'supported', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'sitrus-berry', name:'Sitrus Berry', category:'Recovery', summary:'When HP falls to 1/2 maximum or less, restores 1/4 (25%) max HP and is consumed.', threshold:'HP ≤ 1/2 maximum', recovery:'1/4 max HP', consumed:true, calculator:'supported', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'leftovers', name:'Leftovers', category:'Recovery', summary:'Restores 1/16 (6.25%) max HP at each turn end.', recovery:'1/16 max HP each turn', consumed:false, calculator:'supported', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'wide-lens', name:'Wide Lens', category:'Accuracy', summary:'Move accuracy becomes ×1.1, capped at 100%.', multiplier:1.1, appliesTo:'Accuracy', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'zoom-lens', name:'Zoom Lens', category:'Accuracy', summary:'If the holder acts after its target, move accuracy becomes ×1.2, capped at 100%.', multiplier:1.2, appliesTo:'Accuracy when moving after target', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'iron-ball', name:'Iron Ball', category:'Speed / position', summary:'Speed becomes ×0.5 and the holder becomes grounded.', multiplier:0.5, appliesTo:'Speed', consumed:false, relatedTerms:['grounded'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'shed-shell', name:'Shed Shell', category:'Switching', summary:'The holder can switch out even when an opposing trapping effect would normally prevent it.', consumed:false, calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'big-root', name:'Big Root', category:'Recovery', summary:'HP recovered from draining moves, Leech Seed, Aqua Ring, and Ingrain becomes ×1.3.', multiplier:1.3, consumed:false, relatedTerms:['leech-seed','aqua-ring','ingrain'], calculator:'supported', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'metronome-item', name:'Metronome', category:'Damage', summary:'Repeated use of the same move increases its damage in steps; changing moves or failing the chain resets the boost.', consumed:false, calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'scope-lens', name:'Scope Lens', category:'Critical hit', summary:'Raises the holder’s critical-hit stage by 1.', consumed:false, relatedTerms:['critical'], calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'quick-claw', name:'Quick Claw', category:'Turn order', summary:'Has a chance to let the holder act first within its priority bracket; it does not change move priority.', consumed:false, relatedTerms:['priority'], calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'bright-powder', name:'Bright Powder', category:'Accuracy / evasion', summary:'Moves targeting the holder have their final accuracy multiplied by ×0.9.', multiplier:0.9, consumed:false, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'focus-band', name:'Focus Band', category:'Survival', summary:'When a hit would knock out the holder, it has a chance to endure at 1 HP. Unlike Focus Sash, full HP is not required and the item is not consumed.', consumed:false, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'kings-rock', name:"King's Rock", category:'Flinch', summary:'Eligible damaging moves gain a chance to make the target flinch. It does not add another chance to moves that already have an intrinsic flinch chance.', consumed:false, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'light-ball', name:'Light Ball', category:'Species item', summary:'When held by Pikachu, Attack and Special Attack become ×2.', multiplier:2, appliesTo:'Pikachu Attack and Special Attack', consumed:false, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'mental-herb', name:'Mental Herb', category:'Status cure', summary:'Cures selected move-restricting volatile effects such as Taunt, Encore, Torment, Disable, and Heal Block, then is consumed.', consumed:true, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'shell-bell', name:'Shell Bell', category:'Recovery', summary:'After the holder deals direct move damage, it restores 1/8 of the HP damage inflicted.', recovery:'1/8 of direct damage dealt', consumed:false, calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'white-herb', name:'White Herb', category:'Stat reset', summary:'When any of the holder’s stat stages are below neutral, restores those lowered stages to neutral and is consumed.', consumed:true, relatedTerms:['stat-stages'], calculator:'not-modeled', status:'reference', source:'serebiiItems', lastVerified:'2026-08-03' },
  { id:'leek', name:'Leek', category:'Species item', summary:"When held by Farfetch’d or Sirfetch’d, raises the user’s critical-hit ratio by 2 stages.", appliesTo:"Farfetch’d and Sirfetch’d", consumed:false, relatedTerms:['critical'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'rocky-helmet', name:'Rocky Helmet', category:'Contact punishment', summary:'When the holder is hit by a contact move, the attacker loses 1/6 (about 16.67%) of its maximum HP.', cost:'1/6 attacker max HP per triggering contact hit', consumed:false, relatedTerms:['contact'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'air-balloon', name:'Air Balloon', category:'Ground immunity', summary:'Makes the holder airborne and immune to Ground-type moves until it is hit by a damaging move, which pops the Balloon.', consumed:true, relatedTerms:['grounded'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'red-card', name:'Red Card', category:'Forced switching', summary:'After the holder takes direct move damage, the attacker is forced to switch to a random eligible teammate; the card is consumed.', consumed:true, calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'binding-band', name:'Binding Band', category:'Residual damage', summary:'Damage dealt by partial-trapping effects becomes 1/6 of the target’s maximum HP each turn instead of 1/8.', multiplier:'1/6 max HP each turn', consumed:false, relatedTerms:['residual-damage'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'eject-button', name:'Eject Button', category:'Switching', summary:'After the holder takes direct move damage, it immediately switches out if an eligible teammate exists; the item is consumed.', consumed:true, calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'normal-gem', name:'Normal Gem', category:'Damage', summary:'The first eligible Normal-type damaging move used by the holder deals ×1.3 damage (a 30% increase); the Gem is consumed.', multiplier:1.3, appliesTo:'First eligible Normal-type damaging move', consumed:true, calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'terrain-extender', name:'Terrain Extender', category:'Field duration', summary:'A terrain created by the holder lasts 8 turns instead of 5—three additional turns.', consumed:false, relatedTerms:['electric-terrain'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'electric-seed', name:'Electric Seed', category:'Terrain seed', summary:'While Electric Terrain is active, raises the grounded holder’s Defense by 1 stage (×1.5 from neutral), then is consumed.', consumed:true, relatedTerms:['electric-terrain','grounded','stat-stages'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'psychic-seed', name:'Psychic Seed', category:'Terrain seed', summary:'While Psychic Terrain is active, raises the grounded holder’s Special Defense by 1 stage (×1.5 from neutral), then is consumed.', consumed:true, relatedTerms:['grounded','stat-stages'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'misty-seed', name:'Misty Seed', category:'Terrain seed', summary:'While Misty Terrain is active, raises the grounded holder’s Special Defense by 1 stage (×1.5 from neutral), then is consumed.', consumed:true, relatedTerms:['grounded','stat-stages'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  { id:'grassy-seed', name:'Grassy Seed', category:'Terrain seed', summary:'While Grassy Terrain is active, raises the grounded holder’s Defense by 1 stage (×1.5 from neutral), then is consumed.', consumed:true, relatedTerms:['grounded','stat-stages'], calculator:'not-modeled', status:'tested', source:'serebiiItems', lastVerified:'2026-09-10' },
  ...typeBoostItems,
  ...megaStoneItems,
  ...resistanceBerryItems,
  ...utilityBerryItems,
  ...inventoryItems
]);

const CHAMPIONS_MOVE_OVERRIDES = Object.freeze({
  protect: { name:'Protect', type:'normal', damage_class:'status', power:null, accuracy:null, priority:4, target:'self', protectable:false, contact:false, spread:false, summary:'Blocks most attacks targeting the user for this turn. Consecutive full-protection attempts usually fall to 1/3, 1/9, then 1/27 success.', relatedTerms:['protect','priority'], status:'tested', source:'mechanicsResearch', lastVerified:'2026-08-03' },
  growth: { name:'Growth', type:'normal', damage_class:'status', power:null, accuracy:null, priority:0, target:'self', summary:'Raises Attack and Special Attack by 1 stage; during Harsh Sunlight it raises both by 2 stages.', stageChanges:{attack:1,'special-attack':1}, weatherStageChanges:{sun:{attack:2,'special-attack':2}}, relatedTerms:['stat-stages','sun'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  crabhammer: { name:'Crabhammer', type:'water', damage_class:'physical', power:100, accuracy:95, priority:0, target:'selected opponent', contact:true, spread:false, critStage:1, summary:'A 100-power physical Water move with 95% accuracy and a one-stage increased critical-hit ratio.', relatedTerms:['contact','critical'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'bone-rush': { name:'Bone Rush', type:'ground', damage_class:'physical', power:30, accuracy:90, priority:0, target:'selected opponent', contact:false, spread:false, multiHit:[2,5], summary:'Hits 2–5 times; each hit has 30 base power.', status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'iron-head': { name:'Iron Head', type:'steel', damage_class:'physical', power:80, accuracy:100, priority:0, target:'selected opponent', contact:true, spread:false, secondaryChance:20, summary:'Has a 20% chance to make the target flinch.', relatedTerms:['contact','flinch'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  moonblast: { name:'Moonblast', type:'fairy', damage_class:'special', power:95, accuracy:100, priority:0, target:'selected opponent', contact:false, spread:false, secondaryChance:10, summary:'Has a 10% chance to lower the target’s Special Attack by 1 stage.', stageChanges:{'special-attack':-1}, relatedTerms:['stat-stages'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'first-impression': { name:'First Impression', type:'bug', damage_class:'physical', power:100, accuracy:100, priority:2, target:'selected opponent', contact:true, spread:false, summary:'Fails unless it is the first move the user selects after entering battle.', relatedTerms:['priority','contact'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'fire-lash': { name:'Fire Lash', type:'fire', damage_class:'physical', power:90, accuracy:100, priority:0, target:'selected opponent', contact:true, spread:false, secondaryChance:100, summary:'Lowers the target’s Defense by 1 stage.', stageChanges:{defense:-1}, relatedTerms:['stat-stages','contact'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'beak-blast': { name:'Beak Blast', type:'flying', damage_class:'physical', power:120, accuracy:100, priority:-3, target:'selected opponent', contact:false, spread:false, summary:'If the user is hit by a contact move before it acts, that attacker is burned.', relatedTerms:['contact','burn','priority'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'grav-apple': { name:'Grav Apple', type:'grass', damage_class:'physical', power:90, accuracy:100, priority:0, target:'selected opponent', contact:false, spread:false, gravityMultiplier:1.5, summary:'Lowers Defense by 1 stage. During Gravity, base power is multiplied by 1.5.', stageChanges:{defense:-1}, relatedTerms:['gravity','stat-stages'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'rage-fist': { name:'Rage Fist', type:'ghost', damage_class:'physical', power:50, accuracy:100, priority:0, target:'selected opponent', contact:true, spread:false, dynamicPower:'50 + 50 for each hit the user has taken; maximum 350. Counter resets on switch.', summary:'Starts at 50 power, gains 50 whenever the user is hit, caps at 350, and resets on switching.', relatedTerms:['contact','switching'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  'make-it-rain': { name:'Make It Rain', type:'steel', damage_class:'special', power:120, accuracy:100, priority:0, target:'all opponents', contact:false, spread:true, summary:'Hits both opponents and lowers the user’s Special Attack by 2 stages.', stageChanges:{'special-attack':-2}, relatedTerms:['spread','stat-stages'], status:'tested', source:'serebiiMoves', lastVerified:'2026-08-03' },
  slash: { name:'Slash', type:'normal', damage_class:'physical', power:80, accuracy:100, pp:20, priority:0, target:'selected opponent', contact:true, spread:false, critStage:1, summary:'An 80-power physical Normal move with perfect base accuracy and a one-stage increased critical-hit ratio.', relatedTerms:['contact','critical'], status:'tested', source:'serebiiMoves', lastVerified:'2026-09-10' },
  wish: { name:'Wish', type:'normal', damage_class:'status', power:null, accuracy:null, pp:8, priority:0, target:'user position', contact:false, spread:false, summary:'At the end of the next turn, restores HP to the Pokémon occupying the user’s position. Pokémon Champions version 1.2.0 reduced PP from 12 to 8.', status:'tested', source:'serebiiMoves', lastVerified:'2026-09-10' },
  'strength-sap': { name:'Strength Sap', type:'grass', damage_class:'status', power:null, accuracy:100, pp:8, priority:0, target:'selected opponent', contact:false, spread:false, summary:'Lowers the target’s Attack by 1 stage and restores HP based on its Attack. Pokémon Champions version 1.2.0 reduced PP from 12 to 8.', stageChanges:{attack:-1}, relatedTerms:['stat-stages'], status:'tested', source:'serebiiMoves', lastVerified:'2026-09-10' }
});

const ChampionsKnowledge = (() => {
  const sourceFor = key => CHAMPIONS_SOURCES[key] || null;
  const statusFor = key => CHAMPIONS_DATA_STATUSES[key] || CHAMPIONS_DATA_STATUSES.unavailable;
  const mechanicTerms = () => (typeof CHAMPIONS_MECHANICS === 'undefined' ? [] : CHAMPIONS_MECHANICS.map(mechanic => ({
    id: mechanic.id,
    name: mechanic.name,
    aliases: [],
    category: mechanic.category,
    summary: mechanic.summary,
    exact: mechanic.effects,
    duration: mechanic.duration,
    interactions: mechanic.interactions,
    counterplay: mechanic.counter,
    related: [],
    status: mechanic.category === 'Champions Rules' || ['paralysis','freeze','sleep','electric-terrain'].includes(mechanic.id) ? 'tested' : 'reference',
    source: mechanic.source || (['timer','team-rules'].includes(mechanic.id) ? 'serebiiRegulation' : mechanic.category === 'Champions Rules' ? 'mechanicsResearch' : 'pokeapi'),
    lastVerified: mechanic.lastVerified || '2026-08-03'
  })));
  const allTerms = () => [...mechanicTerms(), ...CHAMPIONS_TERM_EXTRAS];
  const term = id => allTerms().find(record => record.id === id) || null;
  const item = id => CHAMPIONS_ITEMS.find(record => record.id === id) || null;
  const ability = name => CHAMPIONS_ABILITY_OVERRIDES[slug(name)] || null;
  const move = name => CHAMPIONS_MOVE_OVERRIDES[slug(name)] || null;
  const slug = value => String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const ordinal = value => {
    const number = Number(value) || 0;
    const tens = number % 100;
    const suffix = tens >= 11 && tens <= 13 ? 'th' : ({ 1:'st', 2:'nd', 3:'rd' }[number % 10] || 'th');
    return `${number}${suffix}`;
  };
  const search = query => {
    const needle = String(query || '').toLowerCase().trim();
    if (!needle) return [];
    return [
      ...allTerms().map(record => ({ kind:'term', record })),
      ...CHAMPIONS_ITEMS.map(record => ({ kind:'item', record })),
      ...Object.values(CHAMPIONS_ABILITY_OVERRIDES).map(record => ({ kind:'ability', record })),
      ...Object.values(CHAMPIONS_MOVE_OVERRIDES).map(record => ({ kind:'move', record }))
    ].filter(result => JSON.stringify(result.record).toLowerCase().includes(needle));
  };
  const validate = () => {
    const issues = [];
    const ids = new Set();
    allTerms().forEach(record => {
      if (ids.has(record.id)) issues.push({ type:'duplicate-term', id:record.id, message:`Duplicate terminology id: ${record.id}` });
      ids.add(record.id);
      if (!record.source || !sourceFor(record.source)) issues.push({ type:'missing-source', id:record.id, message:`${record.name} has no registered source.` });
      if (!record.lastVerified) issues.push({ type:'missing-date', id:record.id, message:`${record.name} has no last-verified date.` });
    });
    Object.entries(CHAMPIONS_ABILITY_OVERRIDES).forEach(([id, record]) => {
      if (record.duration && record.durationTerm) issues.push({ type:'duplicated-duration', id, message:`${record.name} duplicates a linked mechanic duration.` });
      if (record.durationTerm && !term(record.durationTerm)) issues.push({ type:'broken-term-link', id, message:`${record.name} links to missing term ${record.durationTerm}.` });
    });
    return issues;
  };
  return Object.freeze({ sourceFor, statusFor, allTerms, term, item, ability, move, search, validate, slug, ordinal, megaStoneForForm });
})();

if (typeof module === 'object' && module.exports) {
  module.exports = { CHAMPIONS_APP_VERSION, CHAMPIONS_DATA_STATUSES, CHAMPIONS_SOURCES, CHAMPIONS_REGULATIONS, CHAMPIONS_TERM_EXTRAS, CHAMPIONS_ABILITY_OVERRIDES, CHAMPIONS_ITEMS, CHAMPIONS_MOVE_OVERRIDES, CHAMPIONS_MEGA_STONE_BY_FORM, ChampionsKnowledge };
}
