const OFFICIAL_ART = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const ARTWORK_UNAVAILABLE = './icons/artwork-unavailable.svg';
const API = 'https://pokeapi.co/api/v2';
const TEAM_CODES_LIVE_URL = 'https://raw.githubusercontent.com/ikki0304/champions-dex-data/main/team-codes.json';
const TEAM_CODES_BUNDLED_URL = './data/team-codes.json';
const APP_VERSION_MANIFEST_URL = 'https://raw.githubusercontent.com/ikki0304/champions-dex-data/main/app-version.json';

const CURRENT_UPDATE_ADDITIONS = new Set([
  'Wigglytuff','Persian','Alolan Persian',"Farfetch'd",'Mr. Mime','Swalot','Salamence','Gogoat','Golisopod',
  'Rillaboom','Cinderace','Inteleon','Thievul','Amped Toxtricity','Low Key Toxtricity','Grapploct','Perrserker',"Sirfetch'd",'Pincurchin',
  'Indeedee-M','Indeedee-F','Pawmot','Arboliva','Green Plumage Squawkabilly','Blue Plumage Squawkabilly',
  'Yellow Plumage Squawkabilly','White Plumage Squawkabilly','Mabosstiff','Baxcalibur'
]);

const FORM_API_NAMES = {
  'Alolan Raichu':'raichu-alola','Alolan Ninetales':'ninetales-alola','Alolan Persian':'persian-alola','Hisuian Arcanine':'arcanine-hisui',
  'Galarian Slowbro':'slowbro-galar','Paldean Tauros':'tauros-paldea-combat-breed','(Blaze) Paldean Tauros':'tauros-paldea-blaze-breed',
  '(Aqua) Paldean Tauros':'tauros-paldea-aqua-breed','Hisuian Typhlosion':'typhlosion-hisui','Galarian Slowking':'slowking-galar',
  'Heat Rotom':'rotom-heat','Wash Rotom':'rotom-wash','Frost Rotom':'rotom-frost','Fan Rotom':'rotom-fan','Mow Rotom':'rotom-mow',
  'Hisuian Samurott':'samurott-hisui','Hisuian Zoroark':'zoroark-hisui','Galarian Stunfisk':'stunfisk-galar',
  'Eternal Floette':'floette-eternal','Meowstic-M':'meowstic-male','Meowstic-F':'meowstic-female','Meowstic':'meowstic-male',
  'Aegislash':'aegislash-shield','Hisuian Goodra':'goodra-hisui','Gourgeist':'gourgeist-average','Hisuian Avalugg':'avalugg-hisui',
  'Hisuian Decidueye':'decidueye-hisui','Lycanroc':'lycanroc-midday','Basculegion-M':'basculegion-male',
  'Basculegion-F':'basculegion-female','Basculegion':'basculegion-male','Maushold':'maushold-family-of-four','Palafin':'palafin-zero',
  "Farfetch'd":'farfetchd','Mr. Mime':'mr-mime',"Sirfetch'd":'sirfetchd','Indeedee-M':'indeedee-male','Indeedee-F':'indeedee-female',
  'Amped Toxtricity':'toxtricity-amped','Low Key Toxtricity':'toxtricity-low-key',
  'Green Plumage Squawkabilly':'squawkabilly-green-plumage','Blue Plumage Squawkabilly':'squawkabilly-blue-plumage',
  'Yellow Plumage Squawkabilly':'squawkabilly-yellow-plumage','White Plumage Squawkabilly':'squawkabilly-white-plumage'
};

const FORM_ART_IDS = {
  'Alolan Raichu':10100,'Alolan Ninetales':10104,'Alolan Persian':10108,'Hisuian Arcanine':10229,'Galarian Slowbro':10165,
  'Paldean Tauros':10250,'(Blaze) Paldean Tauros':10251,'(Aqua) Paldean Tauros':10252,'Hisuian Typhlosion':10233,
  'Galarian Slowking':10172,'Heat Rotom':10008,'Wash Rotom':10009,'Frost Rotom':10010,'Fan Rotom':10011,'Mow Rotom':10012,
  'Hisuian Samurott':10236,'Hisuian Zoroark':10238,'Galarian Stunfisk':10180,'Eternal Floette':10061,
  'Meowstic-F':10025,'Hisuian Goodra':10242,'Hisuian Avalugg':10243,'Hisuian Decidueye':10244,'Basculegion-F':10248,
  'Low Key Toxtricity':10184,'Indeedee-F':10186,'Blue Plumage Squawkabilly':10260,
  'Yellow Plumage Squawkabilly':10261,'White Plumage Squawkabilly':10262
};

const KNOWN_MEGA_FORMS = {
  'Venusaur':['venusaur-mega'],'Charizard':['charizard-mega-x','charizard-mega-y'],'Blastoise':['blastoise-mega'],
  'Beedrill':['beedrill-mega'],'Pidgeot':['pidgeot-mega'],'Alakazam':['alakazam-mega'],'Slowbro':['slowbro-mega'],
  'Gengar':['gengar-mega'],'Kangaskhan':['kangaskhan-mega'],'Pinsir':['pinsir-mega'],'Gyarados':['gyarados-mega'],
  'Aerodactyl':['aerodactyl-mega'],'Ampharos':['ampharos-mega'],'Steelix':['steelix-mega'],'Scizor':['scizor-mega'],
  'Heracross':['heracross-mega'],'Houndoom':['houndoom-mega'],'Tyranitar':['tyranitar-mega'],'Sceptile':['sceptile-mega'],
  'Blaziken':['blaziken-mega'],'Swampert':['swampert-mega'],'Gardevoir':['gardevoir-mega'],'Sableye':['sableye-mega'],
  'Mawile':['mawile-mega'],'Aggron':['aggron-mega'],'Medicham':['medicham-mega'],'Manectric':['manectric-mega'],
  'Sharpedo':['sharpedo-mega'],'Camerupt':['camerupt-mega'],'Altaria':['altaria-mega'],'Banette':['banette-mega'],
  'Absol':['absol-mega','absol-mega-z'],'Glalie':['glalie-mega'],'Metagross':['metagross-mega'],'Lopunny':['lopunny-mega'],
  'Garchomp':['garchomp-mega','garchomp-mega-z'],'Lucario':['lucario-mega','lucario-mega-z'],'Abomasnow':['abomasnow-mega'],'Gallade':['gallade-mega'],
  'Salamence':['salamence-mega'],
  'Audino':['audino-mega']
};

const CHAMPIONS_MEGA_FORM_OVERRIDES = {
  'Eternal Floette': ['floette-mega'],
  'Meowstic-M': ['meowstic-mega'],
  'Golisopod': ['golisopod-mega'],
  'Baxcalibur': ['baxcalibur-mega']
};
const NON_MEGA_VARIANTS = new Set(['Floette', 'Meowstic-F', 'Meowstic']);

const roster = CHAMPIONS_ROSTER_DATA.map(([id, display, typeString, megaCapable], index) => ({
  id,
  dex: id,
  imageId: FORM_ART_IDS[display] || id,
  name: FORM_API_NAMES[display] || display.toLowerCase().replace(/[().]/g,'').replace(/\s+/g,'-'),
  apiName: FORM_API_NAMES[display] || null,
  display,
  types: typeString.split('/'),
  megaCapable: Boolean(megaCapable) && !NON_MEGA_VARIANTS.has(display),
  group: CURRENT_UPDATE_ADDITIONS.has(display) ? 'new' : 'roster',
  key: `${id}-${index}`
}));

const megaRoster = roster.filter(p => p.megaCapable).flatMap(base => {
  const apiForms = KNOWN_MEGA_FORMS[base.display] || CHAMPIONS_MEGA_FORM_OVERRIDES[base.display] || (base.display === 'Raichu' ? ['raichu-mega-x','raichu-mega-y'] : [`${base.name}-mega`]);
  return apiForms.map(apiForm => {
    const suffix = apiForm.endsWith('-x') ? ' X' : apiForm.endsWith('-y') ? ' Y' : apiForm.endsWith('-z') ? ' Z' : '';
    const championsForm = CHAMPIONS_MEGA_DATA[apiForm];
    const known = Boolean(KNOWN_MEGA_FORMS[base.display] || championsForm);
    return {
      ...base,
      dex: base.dex,
      id: base.id,
      imageId: base.imageId,
      name: apiForm,
      apiName: apiForm,
      baseName: base.apiName || base.id,
      display: championsForm?.display || `Mega ${base.display}${suffix}`,
      group: 'mega',
      futureMega: !known,
      baseKey: base.key,
      label: known ? 'Mega Evolution' : 'Champions Mega · reference data',
      key: `mega-${base.key}-${apiForm}`
    };
  });
});

let storageRecoveryNeeded = false;
function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    storageRecoveryNeeded = true;
    return fallback;
  }
}
const readStoredArray = key => {
  const value = readStoredJson(key, []);
  if (Array.isArray(value)) return value;
  storageRecoveryNeeded = true;
  return [];
};
const readStoredObject = (key, fallback = {}) => {
  const value = readStoredJson(key, fallback);
  if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  storageRecoveryNeeded = true;
  return fallback;
};

const state = {
  view: 'roster',
  filter: 'all',
  type: 'all',
  search: '',
  compareMoveQuery: '',
  mechanicsCategory: 'All',
  mechanicsExpandedAll: false,
  abilityMatches: new Set(),
  abilityMatchLabels: new Map(),
  abilitySearchPending: false,
  searchMode: 'name-ability',
  moveIndex: new Map(),
  moveIndexPromise: null,
  moveIndexReady: false,
  moveSearchPending: false,
  moveMatches: new Set(),
  moveMatchLabels: new Map(),
  moveCatalog: new Set(),
  moveMeta: new Map(),
  moveType: 'all',
  moveCategory: 'all',
  movePower: 'all',
  moveAccuracy: 'all',
  heatmapStat: 'hp',
  heatmapType: 'all',
  heatmapForm: 'all',
  heatmapAbility: '',
  heatmapMove: '',
  heatmapMin: '',
  heatmapMax: '',
  heatmapRecords: new Map(),
  heatmapLoading: false,
  heatmapError: '',
  heatmapSort: 'desc',
  heatmapCompact: false,
  heatmapTopOnly: false,
  team: readStoredObject('champions-team', { name:'Untitled Champions team', members:[] }),
  teamSearch: '',
  moveExplorerQuery: '',
  moveExplorerLoading: false,
  abilityExplorerQuery: '',
  itemSearch: '',
  itemCategory: 'all',
  glossarySearch: '',
  glossaryCategory: 'all',
  globalResultsOpen: false,
  notes: readStoredObject('champions-notes', {}),
  visibleLimit: 48,
  sort: 'dex',
  recent: readStoredArray('champions-recent').filter(value => typeof value === 'string').slice(0, 8),
  watchlist: new Set(readStoredArray('champions-watchlist')),
  compare: [],
  damage: {
    attackerIndex: 0,
    move: '',
    attackerPreset: 'base',
    defenderPreset: 'base',
    attackerItem: 'none',
    defenderItem: 'none',
    weather: 'none',
    terrain: 'none',
    screen: 'none',
    format: 'singles',
    attackerStatus: 'none',
    defenderStatus: 'none',
    critical: false,
    spread: false,
    friendGuard: false,
    contact: false,
    attackerGrounded: true,
    defenderGrounded: true,
    defenderFullHp: true,
    attackerStage: 0,
    defenderStage: 0,
    attackerAbility: '',
    defenderAbility: '',
    customAttacker: { points: { ...ChampionsCalc.PRESETS.base.points }, up: null, down: null },
    customDefender: { points: { ...ChampionsCalc.PRESETS.base.points }, up: null, down: null }
  },
  detail: null,
  detailData: new Map(),
  tc: {
    teams: [], updatedAt: null, source: 'loading', loaded: false, loading: false,
    search: '', selected: [], mode: 'AND', includeUnknownItems: false, onlyPublishedItems: true,
    regulation: 'current', format: 'all', sort: 'fullsets', favoritesOnly: false
  },
  tcFavorites: new Set(readStoredArray('champions-tc-favorites')),
  tcWorked: readStoredObject('champions-tc-worked', {})
};
state.team.members = Array.isArray(state.team.members) ? state.team.members : [];
state.team.format = state.team.format || 'doubles';
state.team.configs = state.team.configs || {};

const els = {
  grid: document.querySelector('#pokemonGrid'),
  empty: document.querySelector('#emptyState'),
  search: document.querySelector('#searchInput'),
  type: document.querySelector('#typeSelect'),
  panel: document.querySelector('#detailPanel'),
  detail: document.querySelector('#detailContent'),
  scrim: document.querySelector('#panelScrim'),
  compareView: document.querySelector('#compareView'),
  compareEmpty: document.querySelector('#compareEmpty'),
  compareBoard: document.querySelector('#compareBoard'),
  mechanicsView: document.querySelector('#mechanicsView'),
  mechanicsGrid: document.querySelector('#mechanicsGrid'),
  mechanicsFilters: document.querySelector('#mechanicsFilters'),
  mechanicsResultCount: document.querySelector('#mechanicsResultCount'),
  expandMechanics: document.querySelector('#expandMechanics'),
  gridFooter: document.querySelector('#gridFooter'),
  resultCount: document.querySelector('#resultCount'),
  loadMore: document.querySelector('#loadMoreButton'),
  searchMode: document.querySelector('#searchMode'),
  clearFilters: document.querySelector('#clearFiltersButton'),
  moveSearchTools: document.querySelector('#moveSearchTools'),
  moveType: document.querySelector('#moveTypeSelect'),
  moveCategory: document.querySelector('#moveCategorySelect'),
  movePower: document.querySelector('#movePowerSelect'),
  moveAccuracy: document.querySelector('#moveAccuracySelect'),
  moveOptions: document.querySelector('#moveOptions'),
  heatmapView: document.querySelector('#heatmapView'),
  heatmapGrid: document.querySelector('#heatmapGrid'),
  heatmapStatus: document.querySelector('#heatmapStatus'),
  heatmapStat: document.querySelector('#heatmapStatSelect'),
  heatmapType: document.querySelector('#heatmapTypeSelect'),
  heatmapForm: document.querySelector('#heatmapMegaSelect'),
  heatmapAbility: document.querySelector('#heatmapAbilityInput'),
  heatmapMove: document.querySelector('#heatmapMoveInput'),
  heatmapMin: document.querySelector('#heatmapMinInput'),
  heatmapMax: document.querySelector('#heatmapMaxInput'),
  heatmapSortButton: document.querySelector('#heatmapSortButton'),
  heatmapTopButton: document.querySelector('#heatmapTopButton'),
  heatmapCompactButton: document.querySelector('#heatmapCompactButton'),
  heatmapFullscreenButton: document.querySelector('#heatmapFullscreenButton'),
  heatmapExportButton: document.querySelector('#heatmapExportButton'),
  teamView: document.querySelector('#teamView'),
  teamName: document.querySelector('#teamNameInput'),
  teamFormat: document.querySelector('#teamFormatSelect'),
  teamSlots: document.querySelector('#teamSlots'),
  teamPicker: document.querySelector('#teamPicker'),
  teamSearch: document.querySelector('#teamSearchInput'),
  teamSummary: document.querySelector('#teamSummary'),
  teamSlotCount: document.querySelector('#teamSlotCount'),
  teamExport: document.querySelector('#teamExportButton'),
  teamImport: document.querySelector('#teamImportButton'),
  teamImportInput: document.querySelector('#teamImportInput'),
  moveExplorerView: document.querySelector('#moveExplorerView'),
  moveExplorerInput: document.querySelector('#moveExplorerInput'),
  moveExplorerButton: document.querySelector('#moveExplorerButton'),
  moveExplorerResult: document.querySelector('#moveExplorerResult'),
  abilityView: document.querySelector('#abilityExplorerView'),
  abilityInput: document.querySelector('#abilityExplorerInput'),
  abilityGrid: document.querySelector('#abilityExplorerGrid'),
  abilityExplorerCount: document.querySelector('#abilityExplorerCount'),
  itemView: document.querySelector('#itemExplorerView'),
  itemInput: document.querySelector('#itemExplorerInput'),
  itemCategory: document.querySelector('#itemCategorySelect'),
  itemGrid: document.querySelector('#itemExplorerGrid'),
  glossaryView: document.querySelector('#glossaryView'),
  glossaryInput: document.querySelector('#glossaryInput'),
  glossaryCategory: document.querySelector('#glossaryCategorySelect'),
  glossaryGrid: document.querySelector('#glossaryGrid'),
  intelView: document.querySelector('#intelView'),
  intelContent: document.querySelector('#intelContent'),
  globalResults: document.querySelector('#globalSearchResults'),
  knowledgeSheet: document.querySelector('#knowledgeSheet'),
  knowledgeContent: document.querySelector('#knowledgeContent'),
  knowledgeKind: document.querySelector('#knowledgeKind'),
  knowledgeScrim: document.querySelector('#knowledgeScrim'),
  dataView: document.querySelector('#dataCenterView'),
  dataHealth: document.querySelector('#dataHealthGrid'),
  dataChangelog: document.querySelector('#dataChangelog'),
  reportInput: document.querySelector('#dataReportInput'),
  copyReport: document.querySelector('#copyReportButton'),
  reportStatus: document.querySelector('#reportStatus'),
  resetLocalData: document.querySelector('#resetLocalDataButton'),
  updateButton: document.querySelector('#updateButton'),
  notice: document.querySelector('#appNotice'),
  compareTray: document.querySelector('#compareTray'),
  compareTraySlots: document.querySelector('#compareTraySlots'),
  compareTrayTitle: document.querySelector('#compareTrayTitle'),
  compareTrayAdd: document.querySelector('#compareTrayAdd'),
  compareTrayOpen: document.querySelector('#compareTrayOpen'),
  sidebar: document.querySelector('#primaryNavigation'),
  drawerScrim: document.querySelector('#mobileDrawerScrim'),
  drawerClose: document.querySelector('#drawerClose'),
  menuButton: document.querySelector('.mobile-menu'),
  mainContent: document.querySelector('#mainContent'),
  brandHome: document.querySelector('#brandHome'),
  sort: document.querySelector('#sortSelect'),
  recentStrip: document.querySelector('#recentStrip'),
  recentChips: document.querySelector('#recentChips'),
  clearRecent: document.querySelector('#clearRecentButton'),
  tcView: document.querySelector('#teamCodesView'),
  tcGrid: document.querySelector('#tcGrid'),
  tcStatus: document.querySelector('#teamCodesStatus'),
  tcResultLine: document.querySelector('#tcResultLine'),
  tcEmpty: document.querySelector('#tcEmpty'),
  tcEmptyText: document.querySelector('#tcEmptyText'),
  tcSearch: document.querySelector('#tcSearchInput'),
  tcSelected: document.querySelector('#tcSelected'),
  shortcutHelp: document.querySelector('#shortcutHelp'),
  shortcutHelpButton: document.querySelector('#shortcutHelpButton'),
  closeShortcutHelp: document.querySelector('#closeShortcutHelp')
};

let noticeTimer;
function showNotice(message, tone = 'info') {
  if (!els.notice) return;
  clearTimeout(noticeTimer);
  els.notice.textContent = message;
  els.notice.dataset.tone = tone;
  els.notice.hidden = false;
  noticeTimer = setTimeout(() => { els.notice.hidden = true; }, 4200);
}

const titleCase = value => value.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
const displayName = p => p.display || titleCase(p.name);
const pad = id => String(id).padStart(4, '0');
const spriteFor = p => CHAMPIONS_ARTWORK[p.key] || (p.group === 'mega' ? ARTWORK_UNAVAILABLE : (p.imageId ? OFFICIAL_ART(p.imageId) : OFFICIAL_ART(p.id)));
const artworkSourceFor = p => CHAMPIONS_ARTWORK_PROVENANCE[p.key] || null;
const keyOf = p => p.key || p.name;
const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const statusBadge = status => {
  const record = ChampionsKnowledge.statusFor(status);
  return `<span class="data-status ${record.className}">${escapeHtml(record.label)}</span>`;
};
const termButton = (id, label) => {
  const record = ChampionsKnowledge.term(id);
  if (!record) return escapeHtml(label || id);
  return `<button class="term-link" type="button" data-term-id="${escapeHtml(id)}">${escapeHtml(label || record.name)}<span aria-hidden="true">?</span></button>`;
};
const sourceMarkup = record => {
  const source = ChampionsKnowledge.sourceFor(record?.source);
  if (!source) return statusBadge('unavailable');
  return `<div class="source-line">${statusBadge(record.status)}<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.name)} ↗</a><span>Source checked ${escapeHtml(record.lastVerified || 'date unavailable')}</span></div>`;
};
const completeAbilityRecord = name => {
  const key = ChampionsKnowledge.slug(name);
  const reference = typeof CHAMPIONS_REFERENCE_ABILITY_META !== 'undefined' ? CHAMPIONS_REFERENCE_ABILITY_META[key] : null;
  const override = ChampionsKnowledge.ability(name);
  if (!reference && !override) return null;
  const description = override?.description || (override ? override.summary : reference?.description) || reference?.summary;
  const exact = override?.exact || (override ? [override.summary] : reference?.exact) || (description ? [description] : []);
  return { ...(reference || {}), ...(override || {}), description, exact };
};
const abilityCardMarkup = ability => {
  const knowledge = ability.knowledge || completeAbilityRecord(ability.name);
  const support = knowledge?.calculator === 'supported' ? '<span class="support-badge supported">CALCULATOR SUPPORTED</span>' : '<span class="support-badge unsupported">EFFECT DOCUMENTED</span>';
  const related = (knowledge?.relatedTerms || []).map(id => termButton(id)).join(' ');
  return `<article class="ability-card technical-card"><div class="technical-card-head"><strong>${escapeHtml(titleCase(ability.name))} ${ability.hidden ? '<em>HIDDEN</em>' : ''}</strong>${support}</div><p>${escapeHtml(knowledge?.summary || ability.description)}</p>${knowledge?.trigger ? `<dl class="compact-facts"><div><dt>TRIGGER</dt><dd>${escapeHtml(knowledge.trigger)}</dd></div><div><dt>SCOPE</dt><dd>${escapeHtml(knowledge.scope || 'See effect')}</dd></div></dl>` : ''}${related ? `<div class="related-links">${related}</div>` : ''}${knowledge ? sourceMarkup(knowledge) : `<div class="source-line">${statusBadge(ability.status || 'reference')}<span>Exact Champions effect unavailable</span></div>`}${knowledge ? `<button class="card-open-link" type="button" data-ability-id="${escapeHtml(ability.name)}">OPEN TECHNICAL RECORD →</button>` : ''}</article>`;
};

function recordFacts(record) {
  const ignored = new Set(['id','name','aliases','category','summary','short_effect','exact','description','flavor_text','related','relatedTerms','source','sourceUrl','status','lastVerified','display_name']);
  return Object.entries(record || {}).filter(([key, value]) => !ignored.has(key) && value !== null && value !== undefined && value !== '' && typeof value !== 'object').map(([key, value]) => `<div><dt>${escapeHtml(titleCase(key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)))}</dt><dd>${escapeHtml(String(value))}</dd></div>`).join('');
}

function knowledgeRecord(kind, id) {
  if (kind === 'term') return ChampionsKnowledge.term(id);
  if (kind === 'item') return ChampionsKnowledge.item(id);
  if (kind === 'move') return ChampionsKnowledge.move(id) || state.moveMeta.get(ChampionsKnowledge.slug(id)) || CHAMPIONS_REFERENCE_MOVE_META?.[ChampionsKnowledge.slug(id)] || null;
  if (kind === 'ability') {
    return completeAbilityRecord(id);
  }
  return null;
}

let knowledgeReturnFocus = null;
function openKnowledge(kind, id) {
  const record = knowledgeRecord(kind, id);
  if (!record || !els.knowledgeSheet) return;
  const exact = record.exact || (record.description ? [record.description] : []);
  const related = [...(record.related || []), ...(record.relatedTerms || [])];
  els.knowledgeKind.textContent = kind === 'term' ? 'BATTLE TERMINOLOGY' : `${kind.toUpperCase()} TECHNICAL RECORD`;
  els.knowledgeContent.innerHTML = `<article class="knowledge-record"><div class="knowledge-title"><span>${escapeHtml(record.category || kind)}</span><h2>${escapeHtml(record.name || titleCase(id))}</h2><p>${escapeHtml(record.summary || record.short_effect || 'No exact Champions-specific summary is available.')}</p></div>${exact.length ? `<section><h3>Exact effects</h3><ul>${exact.map(effect => `<li>${escapeHtml(effect)}</li>`).join('')}</ul></section>` : ''}${recordFacts(record) ? `<section><h3>Technical facts</h3><dl class="knowledge-facts">${recordFacts(record)}</dl></section>` : ''}${record.interactions ? `<section><h3>Interactions</h3><p>${escapeHtml(record.interactions)}</p></section>` : ''}${record.counterplay ? `<section><h3>Counterplay / removal</h3><p>${escapeHtml(record.counterplay)}</p></section>` : ''}${related.length ? `<section><h3>Related terminology</h3><div class="related-links">${[...new Set(related)].map(termId => termButton(termId)).join(' ')}</div></section>` : ''}${sourceMarkup(record)}</article>`;
  els.knowledgeSheet.classList.add('open');
  els.knowledgeSheet.setAttribute('aria-hidden', 'false');
  els.knowledgeScrim.hidden = false;
  document.body.classList.add('knowledge-open');
  els.knowledgeSheet.scrollTop = 0;
  syncScrollLock();
  knowledgeReturnFocus = document.activeElement;
  requestAnimationFrame(() => els.knowledgeSheet.focus({ preventScroll:true }));
}

function closeKnowledge() {
  if (!els.knowledgeSheet) return;
  els.knowledgeSheet.classList.remove('open');
  els.knowledgeSheet.setAttribute('aria-hidden', 'true');
  els.knowledgeScrim.hidden = true;
  document.body.classList.remove('knowledge-open');
  syncScrollLock();
  if (knowledgeReturnFocus instanceof HTMLElement) knowledgeReturnFocus.focus({ preventScroll:true });
  knowledgeReturnFocus = null;
}

function renderItems() {
  if (!els.itemGrid) return;
  const query = state.itemSearch.toLowerCase().trim();
  const list = CHAMPIONS_ITEMS.filter(item => (state.itemCategory === 'all' || item.category === state.itemCategory) && (!query || JSON.stringify(item).toLowerCase().includes(query)));
  els.itemGrid.innerHTML = list.map(item => `<article class="item-card"><div class="technical-card-head"><div><span>${escapeHtml(item.category)}</span><h3>${escapeHtml(item.name)}</h3></div>${item.calculator === 'supported' ? '<span class="support-badge supported">CALC</span>' : '<span class="support-badge unsupported">UNMODELED</span>'}</div><p>${escapeHtml(item.summary)}</p><dl class="compact-facts">${recordFacts(item)}</dl>${(item.relatedTerms || []).length ? `<div class="related-links">${item.relatedTerms.map(termId => termButton(termId)).join(' ')}</div>` : ''}${sourceMarkup(item)}<button class="card-open-link" type="button" data-item-id="${item.id}">OPEN ITEM RECORD →</button></article>`).join('') || '<div class="workspace-empty"><b>No matching item</b><p>Try another name, effect, or category.</p></div>';
}

function renderAbilityExplorer() {
  if (!els.abilityGrid) return;
  const query = normalizeMove(state.abilityExplorerQuery);
  const records = Object.entries(typeof CHAMPIONS_REFERENCE_ABILITY_META !== 'undefined' ? CHAMPIONS_REFERENCE_ABILITY_META : {})
    .map(([name, record]) => [name, completeAbilityRecord(name) || record])
    .filter(([name, record]) => !query || normalizeMove(`${name} ${record.summary} ${record.description}`).includes(query))
    .sort((a, b) => a[0].localeCompare(b[0]));
  if (els.abilityExplorerCount) els.abilityExplorerCount.textContent = `${records.length} OF ${Object.keys(CHAMPIONS_REFERENCE_ABILITY_META || {}).length}`;
  els.abilityGrid.innerHTML = records.map(([name, record]) => abilityCardMarkup({ name, description: record.summary, knowledge: record })).join('') || '<div class="workspace-empty"><b>No matching Ability</b><p>Try another Ability name or effect keyword.</p></div>';
}

function renderGlossary() {
  if (!els.glossaryGrid) return;
  const query = state.glossarySearch.toLowerCase().trim();
  const list = ChampionsKnowledge.allTerms().filter(term => (state.glossaryCategory === 'all' || term.category === state.glossaryCategory) && (!query || JSON.stringify(term).toLowerCase().includes(query)));
  els.glossaryGrid.innerHTML = list.map(term => `<button class="glossary-card" type="button" data-term-id="${term.id}"><span>${escapeHtml(term.category)}</span><h3>${escapeHtml(term.name)}</h3><p>${escapeHtml(term.summary)}</p><em>${escapeHtml(term.duration || ChampionsKnowledge.statusFor(term.status).label)}</em></button>`).join('') || '<div class="workspace-empty"><b>No matching term</b><p>Try another effect, rule, or alias.</p></div>';
}

function renderIntel() {
  if (!els.intelContent) return;
  const regulation = CHAMPIONS_REGULATIONS.records[CHAMPIONS_REGULATIONS.active];
  const source = ChampionsKnowledge.sourceFor(regulation.source);
  els.intelContent.innerHTML = `<div class="intel-grid"><article class="intel-card primary"><span>ACTIVE REGULATION</span><h2>${regulation.name}</h2><p>${regulation.displayRange}</p><small>${regulation.timezoneNote}</small>${sourceMarkup(regulation)}</article><article class="intel-card"><span>SINGLES</span><h3>Register ${regulation.singles.registerMin}–${regulation.singles.registerMax} · Select ${regulation.singles.select}</h3><p>Level ${regulation.level} · ${regulation.singles.previewSeconds}s preview · ${regulation.singles.turnSeconds}s turns · ${regulation.singles.playerSeconds / 60} minute player clock</p></article><article class="intel-card"><span>DOUBLES</span><h3>Register ${regulation.doubles.registerMin}–${regulation.doubles.registerMax} · Select ${regulation.doubles.select}</h3><p>Level ${regulation.level} · ${regulation.doubles.previewSeconds}s preview · ${regulation.doubles.turnSeconds}s turns · ${regulation.doubles.playerSeconds / 60} minute player clock</p></article><article class="intel-card"><span>MEGA RULE</span><h3>${regulation.clauses.megaPerBattle} Mega Evolution per battle</h3><p>Multiple Mega-capable candidates can create team-preview flexibility; validate each required Mega Stone in Team Builder.</p>${termButton('mega-evolution')}</article></div><article class="tournament-snapshot"><div class="section-heading"><h3>Version 1.2.0 update</h3><span>9 SEP 2026</span></div><p>Regulation M-C retains every earlier eligible Pokémon and adds 24 roster entries, six Mega Evolutions, new items, Battle Log, and Selection Support.</p><div class="intel-tags"><span>24 additions</span><span>6 new Megas</span><span>Battle Log</span><span>Selection Support</span><span>New items</span></div><a href="${CHAMPIONS_SOURCES.officialStrategy.url}" target="_blank" rel="noreferrer">Open official M-C announcement ↗</a></article>`;
}

function universalSearchResults(query) {
  const needle = String(query || '').toLowerCase().trim();
  if (needle.length < 2) return [];
  const pokemon = [...roster, ...megaRoster].filter(p => `${displayName(p)} ${p.name}`.toLowerCase().includes(needle)).slice(0, 8).map(record => ({ kind:'pokemon', id:keyOf(record), label:displayName(record), meta:record.group === 'mega' ? 'Mega Evolution' : record.types.join(' / '), record }));
  const knowledge = ChampionsKnowledge.search(needle).slice(0, 10).map(result => ({ kind:result.kind, id:result.record.id || ChampionsKnowledge.slug(result.record.name), label:result.record.name, meta:result.record.category || ChampionsKnowledge.statusFor(result.record.status).label }));
  const moves = [...state.moveCatalog].filter(name => name.includes(normalizeMove(needle))).slice(0, 8).map(name => ({ kind:'move', id:name, label:titleCase(name), meta:ChampionsKnowledge.statusFor(state.moveMeta.get(name)?.status || 'reference').label }));
  const abilities = Object.keys(typeof CHAMPIONS_REFERENCE_ABILITY_META !== 'undefined' ? CHAMPIONS_REFERENCE_ABILITY_META : {}).filter(name => name.includes(normalizeMove(needle))).slice(0, 8).map(name => ({ kind:'ability', id:name, label:titleCase(name), meta:ChampionsKnowledge.ability(name) ? 'Champions technical record' : 'Complete Ability record' }));
  return [...pokemon, ...knowledge, ...abilities, ...moves].filter((result, index, all) => all.findIndex(other => other.kind === result.kind && other.id === result.id) === index).slice(0, 20);
}

let globalSearchIndex = -1;
function syncGlobalSearchSelection() {
  const options = [...els.globalResults.querySelectorAll('[role="option"]')];
  options.forEach((option, index) => {
    option.classList.toggle('active', index === globalSearchIndex);
    option.setAttribute('aria-selected', String(index === globalSearchIndex));
  });
  const active = options[globalSearchIndex];
  if (active) {
    els.search.setAttribute('aria-activedescendant', active.id);
    const top = active.offsetTop;
    const bottom = top + active.offsetHeight;
    if (top < els.globalResults.scrollTop) els.globalResults.scrollTop = top;
    else if (bottom > els.globalResults.scrollTop + els.globalResults.clientHeight) els.globalResults.scrollTop = bottom - els.globalResults.clientHeight;
  } else els.search.removeAttribute('aria-activedescendant');
}
function renderGlobalSearch(query) {
  if (!els.globalResults) return;
  const results = universalSearchResults(query);
  const open = String(query || '').trim().length >= 2;
  globalSearchIndex = -1;
  els.globalResults.hidden = !open;
  els.search.setAttribute('aria-expanded', String(open));
  els.globalResults.innerHTML = results.length ? results.map((result, index) => `<button id="global-result-${index}" type="button" role="option" aria-selected="false" data-global-kind="${result.kind}" data-global-id="${escapeHtml(result.id)}"><span><b>${escapeHtml(result.label)}</b><em>${escapeHtml(result.meta || result.kind)}</em></span><strong>${result.kind.toUpperCase()}</strong></button>`).join('') : '<div class="global-search-empty" role="status"><b>No results</b><span>Try a shorter Pokémon, move, Ability, item, or mechanic name.</span></div>';
}

function resetGlobalSearch() {
  clearTimeout(abilitySearchTimer);
  state.search = '';
  state.abilityMatches = new Set();
  state.abilityMatchLabels = new Map();
  state.abilitySearchPending = false;
  state.moveMatches = new Set();
  state.moveMatchLabels = new Map();
  state.moveSearchPending = false;
  globalSearchIndex = -1;
  els.search.value = '';
  els.search.blur();
  els.search.setAttribute('aria-expanded', 'false');
  els.search.removeAttribute('aria-activedescendant');
  if (els.globalResults) {
    els.globalResults.hidden = true;
    els.globalResults.innerHTML = '';
    els.globalResults.scrollTop = 0;
  }
}

function resetWorkspaceSearch(view) {
  if (view === 'team') { state.teamSearch = ''; if (els.teamSearch) els.teamSearch.value = ''; }
  if (view === 'moves') { state.moveExplorerQuery = ''; moveExplorerRequestToken += 1; if (els.moveExplorerInput) els.moveExplorerInput.value = ''; }
  if (view === 'abilities') { state.abilityExplorerQuery = ''; if (els.abilityInput) els.abilityInput.value = ''; }
  if (view === 'items') { state.itemSearch = ''; if (els.itemInput) els.itemInput.value = ''; }
  if (view === 'glossary') { state.glossarySearch = ''; if (els.glossaryInput) els.glossaryInput.value = ''; }
  if (view === 'heatmap') {
    state.heatmapAbility = '';
    state.heatmapMove = '';
    if (els.heatmapAbility) els.heatmapAbility.value = '';
    if (els.heatmapMove) els.heatmapMove.value = '';
  }
}
const statNames = ChampionsCalc.STAT_NAMES;
const statLabel = name => ({ hp: 'HP', attack: 'Attack', defense: 'Defense', 'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', speed: 'Speed' }[name] || titleCase(name));
const baseStatsFor = data => ChampionsCalc.baseStatsFromPokemon(data?.pokemon);
const defaultStatsFor = data => ChampionsCalc.calculateStats(baseStatsFor(data), ChampionsCalc.PRESETS.base).stats;
const defaultStatTotal = stats => statNames.reduce((sum, name) => sum + (Number(stats?.[name]) || 0), 0);
const configForDamageSide = side => {
  const preset = state.damage[`${side}Preset`];
  return preset === 'custom' ? state.damage[side === 'attacker' ? 'customAttacker' : 'customDefender'] : ChampionsCalc.PRESETS[preset] || ChampionsCalc.PRESETS.base;
};
const statRowsMarkup = (stats, compact = false) => `<div class="stat-list ${compact ? 'compact-stats' : ''}">${statNames.map(name => `<div class="stat-row"><label>${statLabel(name)}</label><b>${stats[name]}</b><span class="stat-track"><i style="--value:${Math.min(100, stats[name] / 2.6)}%"></i></span></div>`).join('')}</div>`;
const baseEntryFor = p => p.group === 'mega' ? roster.find(base => base.key === p.baseKey) : p;
const megaFormsFor = p => {
  const base = baseEntryFor(p);
  return base ? megaRoster.filter(form => form.baseKey === base.key) : [];
};
let abilityIndexPromise;
let abilitySearchTimer;
const abilityDetailsCache = new Map();

function saveTeam() {
  const rawName = typeof state.team.name === 'string' ? state.team.name : '';
  state.team.name = rawName.trim() ? rawName : 'Untitled Champions team';
  localStorage.setItem('champions-team', JSON.stringify(state.team));
  document.querySelector('#teamCount').textContent = `${state.team.members.length}/6`;
}

function teamMember(key) {
  return [...roster, ...megaRoster].find(p => keyOf(p) === key);
}

function teamConfig(key) {
  if (!state.team.configs[key]) state.team.configs[key] = { role:'', ability:'', item:'', moves:'', preset:'base', lead:false, notes:'', alignmentUp:'', alignmentDown:'', points:{ ...ChampionsCalc.PRESETS.base.points } };
  state.team.configs[key].points = state.team.configs[key].points || { ...ChampionsCalc.PRESETS.base.points };
  return state.team.configs[key];
}

function teamLegality(members) {
  const issues = [];
  const regulation = CHAMPIONS_REGULATIONS.records[CHAMPIONS_REGULATIONS.active];
  const species = members.map(p => keyOf(baseEntryFor(p)));
  const duplicateSpecies = [...new Set(species.filter((key, index) => species.indexOf(key) !== index))];
  if (duplicateSpecies.length) issues.push('Species Clause: a normal form and its Mega form count as the same Pokémon slot.');
  const items = members.map(p => teamConfig(keyOf(p)).item.trim().toLowerCase()).filter(Boolean);
  if (new Set(items).size !== items.length) issues.push('Item Clause: duplicate held items are not legal in Regulation M–C.');
  const formatRule = regulation[state.team.format];
  if (members.length < formatRule.registerMin || members.length > formatRule.registerMax) issues.push(`${titleCase(state.team.format)} registration requires ${formatRule.registerMin}–${formatRule.registerMax} Pokémon; ${formatRule.select} are selected for battle.`);
  const heldItems = CHAMPIONS_ITEMS.filter(item => item.category !== 'Inventory / recruiting');
  const itemByName = new Map(heldItems.flatMap(item => [[normalizeMove(item.name), item], [normalizeMove(item.id), item]]));
  members.forEach(p => {
    const config = teamConfig(keyOf(p));
    const item = config.item.trim() ? itemByName.get(normalizeMove(config.item)) : null;
    if (config.item.trim() && !item) issues.push(`${displayName(p)}: “${config.item}” is not in the current Champions held-item index.`);
    if (p.group === 'mega') {
      const base = baseEntryFor(p);
      let validStones = heldItems.filter(record => record.category === 'Mega Stone' && normalizeMove(record.appliesTo) === normalizeMove(displayName(base)));
      if (/\b[xy]$/i.test(displayName(p))) validStones = validStones.filter(record => normalizeMove(record.name).endsWith(`-${displayName(p).slice(-1).toLowerCase()}`));
      if (!item || !validStones.some(record => record.id === item.id)) issues.push(`${displayName(p)} requires ${validStones.map(record => record.name).join(' or ') || 'its matching Mega Stone'}.`);
    }
    const snapshot = CHAMPIONS_REFERENCE_POKEMON[keyOf(p)] || CHAMPIONS_REFERENCE_POKEMON[p.baseKey];
    const knownAbilities = new Set((snapshot?.abilities || []).map(entry => normalizeMove(entry.ability?.name)));
    (CHAMPIONS_MEGA_DATA[p.name]?.abilities || []).forEach(entry => knownAbilities.add(normalizeMove(entry.name)));
    if (config.ability.trim() && !knownAbilities.has(normalizeMove(config.ability))) issues.push(`${displayName(p)}: Ability “${config.ability}” is not in the current form record.`);
    const chosenMoves = config.moves.split(',').map(move => normalizeMove(move)).filter(Boolean);
    if (chosenMoves.length > 4) issues.push(`${displayName(p)} has ${chosenMoves.length} moves; a team sheet allows four.`);
    const compatible = new Set(CHAMPIONS_REFERENCE_MOVE_INDEX[p.group === 'mega' ? p.baseKey : keyOf(p)] || []);
    chosenMoves.forEach(move => {
      if (!CHAMPIONS_REFERENCE_MOVE_META[move]) issues.push(`${displayName(p)}: ${titleCase(move)} is not on the current Champions available-move list.`);
      else if (!compatible.has(move)) issues.push(`${displayName(p)}: ${titleCase(move)} is not found in the current inferred compatibility record.`);
    });
    if (config.preset === 'custom') {
      const spread = ChampionsCalc.validateSpread(config.points);
      if (!spread.valid) issues.push(`${displayName(p)} has an invalid ${spread.total}/66 Stat Point spread.`);
    }
    if (config.alignmentUp && config.alignmentUp === config.alignmentDown) issues.push(`${displayName(p)} cannot increase and decrease the same Alignment stat.`);
  });
  return issues;
}

function getNote(p) {
  return state.notes[keyOf(p)] || '';
}

function saveNote(p, value) {
  const key = keyOf(p);
  if (value.trim()) state.notes[key] = value.trim();
  else delete state.notes[key];
  localStorage.setItem('champions-notes', JSON.stringify(state.notes));
  const status = document.querySelector('#detailNoteStatus');
  if (status) status.textContent = 'Saved locally on this device.';
}

function addToTeam(p) {
  if (state.team.members.includes(keyOf(p))) {
    showNotice(`${displayName(p)} is already on this team.`, 'warning');
    return;
  }
  if (state.team.members.length >= 6) {
    showNotice('This team already has six Pokémon. Remove one before adding another.', 'warning');
    return;
  }
  state.team.members.push(keyOf(p));
  saveTeam();
  renderTeam();
}

function removeFromTeam(key) {
  state.team.members = state.team.members.filter(member => member !== key);
  delete state.team.configs[key];
  saveTeam();
  renderTeam();
}

function typeReferenceSummary(members) {
  const types = members.flatMap(p => p.types);
  const counts = Object.entries(types.reduce((map, type) => { map[type] = (map[type] || 0) + 1; return map; }, {}));
  const repeated = counts.filter(([, count]) => count > 2).map(([type, count]) => `${titleCase(type)} ×${count}`);
  return `<div class="team-summary-card"><b>TYPE SPREAD</b><span>${counts.length ? counts.map(([type, count]) => `${titleCase(type)} ×${count}`).join(' · ') : 'No Pokémon selected'}</span><em>Standard type-chart reference · verify Champions effects</em></div>${repeated.length ? `<div class="team-warning"><b>REPEATED TYPES</b><span>${repeated.join(', ')}</span><em>May create concentrated matchup exposure.</em></div>` : ''}`;
}

function renderTeam() {
  if (!els.teamView) return;
  if (els.teamName && document.activeElement !== els.teamName) els.teamName.value = state.team.name || '';
  if (els.teamFormat) els.teamFormat.value = state.team.format;
  const members = state.team.members.map(teamMember).filter(Boolean);
  if (els.teamSlotCount) els.teamSlotCount.textContent = `${members.length}/6`;
  if (els.teamSlots) els.teamSlots.innerHTML = Array.from({ length: 6 }, (_, index) => {
    const p = members[index];
    if (!p) return `<article class="team-slot empty"><span>${String(index + 1).padStart(2, '0')}</span><b>OPEN SLOT</b><em>Select a Pokémon →</em></article>`;
    const config = teamConfig(keyOf(p));
    const statOptions = [["","Neutral"], ...statNames.filter(name => name !== 'hp').map(name => [name, statLabel(name)])];
    return `<article class="team-member-card"><div class="team-slot filled"><img src="${spriteFor(p)}" alt="${displayName(p)}"><div><b>${displayName(p)}</b><span>${p.group === 'mega' ? 'MEGA FORM' : p.types.join(' / ')}</span></div><button type="button" data-remove-team="${keyOf(p)}" aria-label="Remove ${displayName(p)}">×</button></div><details><summary>Competitive configuration</summary><div class="team-config-grid"><label><span>ROLE</span><input data-team-config="role" data-team-member="${keyOf(p)}" value="${escapeHtml(config.role)}" placeholder="Speed control, support…"></label><label><span>ABILITY</span><input data-team-config="ability" data-team-member="${keyOf(p)}" value="${escapeHtml(config.ability)}" placeholder="Selected Ability"></label><label><span>HELD ITEM</span><input data-team-config="item" data-team-member="${keyOf(p)}" value="${escapeHtml(config.item)}" list="itemOptions" placeholder="Life Orb"></label><label><span>SP PRESET</span><select data-team-config="preset" data-team-member="${keyOf(p)}">${damagePresetOptions(config.preset)}</select></label><label><span>ALIGNMENT +</span><select data-team-config="alignmentUp" data-team-member="${keyOf(p)}">${selectOptions(statOptions, config.alignmentUp || '')}</select></label><label><span>ALIGNMENT −</span><select data-team-config="alignmentDown" data-team-member="${keyOf(p)}">${selectOptions(statOptions, config.alignmentDown || '')}</select></label><label class="wide"><span>FOUR MOVES · COMMA SEPARATED</span><input data-team-config="moves" data-team-member="${keyOf(p)}" value="${escapeHtml(config.moves)}" placeholder="Protect, Thunderbolt, …"></label>${config.preset === 'custom' ? `<div class="wide damage-sp-grid">${statNames.map(name => `<label><span>${statLabel(name)} SP</span><input type="number" inputmode="numeric" min="0" max="32" value="${config.points[name] || 0}" data-team-stat="${name}" data-team-member="${keyOf(p)}"></label>`).join('')}</div>` : ''}<label class="wide"><span>PERSONAL NOTES</span><textarea data-team-config="notes" data-team-member="${keyOf(p)}" rows="2" placeholder="Lead plan, benchmark, matchup notes…">${escapeHtml(config.notes)}</textarea></label><label class="team-lead"><input type="checkbox" data-team-config="lead" data-team-member="${keyOf(p)}" ${config.lead ? 'checked' : ''}><span>Preferred lead</span></label></div></details></article>`;
  }).join('');
  els.teamSlots?.querySelectorAll('[data-remove-team]').forEach(button => button.addEventListener('click', () => removeFromTeam(button.dataset.removeTeam)));
  els.teamSlots?.querySelectorAll('[data-team-config]').forEach(control => control.addEventListener('change', event => {
    const config = teamConfig(control.dataset.teamMember);
    config[control.dataset.teamConfig] = control.type === 'checkbox' ? control.checked : control.value;
    saveTeam();
    if (['item','preset','alignmentUp','alignmentDown'].includes(control.dataset.teamConfig)) renderTeam();
  }));
  els.teamSlots?.querySelectorAll('[data-team-stat]').forEach(control => control.addEventListener('change', () => {
    const config = teamConfig(control.dataset.teamMember);
    config.points[control.dataset.teamStat] = Math.max(0, Math.min(32, Number(control.value) || 0));
    saveTeam();
    renderTeam();
  }));
  const legality = teamLegality(members);
  if (els.teamSummary) els.teamSummary.innerHTML = `${legality.length ? `<div class="team-warning"><b>REGULATION CHECK</b><span>${legality.map(escapeHtml).join(' · ')}</span><em>Based on the active Regulation M–C record verified 10 Sep 2026.</em></div>` : '<div class="team-summary-card"><b>REGULATION CHECK</b><span>Registration size, Species Clause, Item Clause, Mega Stones, selected moves, Abilities, and Stat Points pass the current bundled checks.</span><em>Multiple Mega-capable candidates may be registered, but only one can Mega Evolve during battle.</em></div>'}${typeReferenceSummary(members)}<div class="team-analytics" id="teamAnalytics"><span>Loading team stat and move coverage…</span></div>`;
  loadTeamAnalysis(members);
  const query = (state.teamSearch || '').toLowerCase().trim();
  const candidates = [...roster, ...megaRoster].filter(p => !query || `${p.display} ${p.name}`.toLowerCase().includes(query)).slice(0, 60);
  if (els.teamPicker) els.teamPicker.innerHTML = candidates.map(p => `<button class="team-picker-item ${state.team.members.includes(keyOf(p)) ? 'selected' : ''}" type="button" data-team-key="${keyOf(p)}"><img src="${spriteFor(p)}" alt=""><span><b>${displayName(p)}</b><em>${p.group === 'mega' ? 'MEGA · ' : ''}${p.types.join(' / ')}</em></span><strong>${state.team.members.includes(keyOf(p)) ? '✓' : '+'}</strong></button>`).join('') || '<div class="workspace-empty"><b>No matches</b><p>Try another Pokémon or Mega form.</p></div>';
  els.teamPicker?.querySelectorAll('[data-team-key]').forEach(button => button.addEventListener('click', () => addToTeam(teamMember(button.dataset.teamKey))));
}

async function loadTeamAnalysis(members) {
  if (!members.length || !els.teamSummary) return;
  const keys = members.map(keyOf).join('|');
  const data = await Promise.all(members.map(p => fetchPokemon(p).catch(() => null)));
  if (state.team.members.map(String).join('|') !== keys || !els.teamSummary.querySelector('#teamAnalytics')) return;
  const loaded = data.filter(Boolean);
  const averages = statNames.map(name => Math.round(loaded.reduce((sum, record) => sum + defaultStatsFor(record)[name], 0) / Math.max(1, loaded.length)));
  const abilities = [...new Set(loaded.flatMap(record => record.abilityDetails.map(item => titleCase(item.name))))];
  const moves = [...new Set(loaded.flatMap(record => (record.moveReference?.moves || []).map(item => titleCase(item.name))))];
  els.teamSummary.querySelector('#teamAnalytics').innerHTML = `<div class="team-summary-card"><b>TEAM ANALYTICS · DEFAULT CHAMPIONS STATS</b><span>Average 0 SP / neutral stats · ${statNames.map((name, index) => `${statLabel(name)} ${averages[index]}`).join(' · ')}</span><span>Known abilities · ${abilities.slice(0, 8).join(', ') || 'Unavailable'}</span><span>Indexed move coverage · ${moves.length ? moves.slice(0, 10).join(', ') : 'Unavailable'}</span><em>Move and Ability lists remain marked as unverified unless a Champions-specific source is loaded.</em></div>`;
}


// ---------- Team Codes (Replica Teams) ----------
function tcResolveEntry(species) {
  const wanted = String(species || '').trim();
  if (!wanted) return null;
  const all = [...roster, ...megaRoster];
  const exact = all.find(entry => displayName(entry) === wanted || entry.display === wanted);
  if (exact) return exact;
  const fallbacks = {
    'Indeedee': 'Indeedee-F', 'Basculegion': 'Basculegion-M', 'Rotom-Heat': 'Heat Rotom', 'Rotom-Wash': 'Wash Rotom',
    'Mega Meowstic': 'Meowstic-M', 'Meowstic': 'Meowstic-M', 'Toxtricity': 'Amped Toxtricity'
  };
  if (fallbacks[wanted]) return all.find(entry => entry.display === fallbacks[wanted]) || null;
  if (wanted.startsWith('Mega ')) return roster.find(entry => entry.display === wanted.slice(5)) || null;
  return null;
}
const tcSpriteFor = species => { const entry = tcResolveEntry(species); return entry ? spriteFor(entry) : ARTWORK_UNAVAILABLE; };
const tcBaseDisplay = species => {
  const entry = tcResolveEntry(species);
  if (entry && entry.group === 'mega') { const base = roster.find(item => item.key === entry.baseKey); if (base) return base.display; }
  return entry ? entry.display : String(species || '').replace(/^Mega /, '').replace(/ [XYZ]$/, '');
};
function tcMegaStoneNames(species) {
  const base = tcBaseDisplay(species);
  return CHAMPIONS_ITEMS.filter(item => item.category === 'Mega Stone' && ChampionsKnowledge.slug(item.appliesTo) === ChampionsKnowledge.slug(base)).map(item => item.name);
}
function tcItemOptions(species) {
  const stones = tcMegaStoneNames(species);
  const rest = CHAMPIONS_ITEMS.filter(item => item.category !== 'Inventory / recruiting' && item.category !== 'Mega Stone').map(item => item.name).sort();
  return [...stones, ...rest];
}
function tcSaveLocal() {
  try { localStorage.setItem('champions-tc-favorites', JSON.stringify([...state.tcFavorites])); } catch { /* storage optional */ }
  try { localStorage.setItem('champions-tc-worked', JSON.stringify(state.tcWorked)); } catch { /* storage optional */ }
}
async function tcFetchJson(url, timeoutMs = 6000) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(url, controller ? { signal: controller.signal, cache: 'no-store' } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { if (timer) clearTimeout(timer); }
}
function tcApplyDataset(payload, source) {
  if (!payload || !Array.isArray(payload.teams) || !payload.teams.length) throw new Error('Empty team code list');
  state.tc.teams = payload.teams.filter(team => TeamCodesLib.isValidTeamCode(team.code));
  state.tc.updatedAt = payload.updatedAt || null;
  state.tc.source = source;
  state.tc.loaded = true;
  const navCount = document.querySelector('#teamCodeCount');
  if (navCount) navCount.textContent = state.tc.teams.length;
}
async function loadTeamCodes(force = false) {
  if (state.tc.loading || (state.tc.loaded && !force)) { if (state.tc.loaded) renderTeamCodes(); return; }
  state.tc.loading = true;
  if (els.tcStatus) els.tcStatus.textContent = 'Loading the live team code list…';
  try {
    const live = await tcFetchJson(TEAM_CODES_LIVE_URL, 6000);
    tcApplyDataset(live, 'live');
    try { localStorage.setItem('champions-tc-cache', JSON.stringify(live)); } catch { /* storage optional */ }
  } catch {
    let restored = null;
    try { restored = JSON.parse(localStorage.getItem('champions-tc-cache') || 'null'); } catch { restored = null; }
    if (restored && Array.isArray(restored.teams) && restored.teams.length) {
      try { tcApplyDataset(restored, 'cached'); } catch { restored = null; }
    }
    if (!restored) {
      try { tcApplyDataset(await tcFetchJson(TEAM_CODES_BUNDLED_URL, 6000), 'bundled'); }
      catch { state.tc.teams = []; state.tc.source = 'unavailable'; state.tc.loaded = true; }
    }
  }
  state.tc.loading = false;
  renderTeamCodes();
}
async function copyTeamCode(code, trigger) {
  const normalized = TeamCodesLib.normalizeTeamCode(code);
  if (!TeamCodesLib.isValidTeamCode(normalized)) { showNotice('That code is not a valid 10-character Replica Team code.', 'warning'); return false; }
  let copied = false;
  try {
    if (window.ChampionsAndroid?.copyText) { window.ChampionsAndroid.copyText(normalized); copied = true; }
  } catch { copied = false; }
  if (!copied) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(normalized);
      copied = true;
    } catch { copied = false; }
  }
  if (!copied) {
    try {
      const area = document.createElement('textarea');
      area.value = normalized;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(area);
      area.focus({ preventScroll: true });
      area.select();
      area.setSelectionRange(0, normalized.length);
      copied = document.execCommand('copy');
      area.remove();
    } catch { copied = false; }
  }
  if (copied) {
    showNotice(`Copied ✓ ${TeamCodesLib.formatTeamCode(normalized)} — paste it in Training → Replica Teams.`);
    if (trigger) {
      const original = trigger.dataset.label || trigger.textContent;
      trigger.dataset.label = original;
      trigger.classList.add('copied');
      if (trigger.classList.contains('tc-copy-btn')) trigger.textContent = 'COPIED ✓';
      setTimeout(() => { trigger.classList.remove('copied'); if (trigger.classList.contains('tc-copy-btn')) trigger.textContent = trigger.dataset.label || 'COPY CODE'; }, 1800);
    }
  } else {
    showNotice(`Copy failed — long-press to select: ${TeamCodesLib.formatTeamCode(normalized)}`, 'warning');
  }
  return copied;
}
function tcFiltered() {
  return TeamCodesLib.filterTeams(state.tc.teams, {
    search: state.tc.search, selected: state.tc.selected, mode: state.tc.mode,
    includeUnknownItems: state.tc.includeUnknownItems, onlyPublishedItems: state.tc.onlyPublishedItems, regulation: state.tc.regulation,
    format: state.tc.format, sort: state.tc.sort, favoritesOnly: state.tc.favoritesOnly,
    favorites: state.tcFavorites, currentRegulation: CHAMPIONS_REGULATIONS.active
  });
}
function renderTeamCodes() {
  if (!els.tcGrid) return;
  const statusLabel = state.tc.source === 'live' ? 'Live list' : state.tc.source === 'cached' ? 'Showing saved copy (offline)' : state.tc.source === 'bundled' ? 'Showing bundled snapshot (offline)' : 'List unavailable offline';
  const updated = state.tc.updatedAt ? new Date(state.tc.updatedAt) : null;
  const updatedText = updated && !Number.isNaN(updated.getTime()) ? updated.toLocaleString('en-IN', { timeZone: 'Asia/Calcutta', dateStyle: 'medium', timeStyle: 'short' }) + ' IST' : 'date unavailable';
  if (els.tcStatus) els.tcStatus.textContent = state.tc.teams.length ? `${statusLabel} · List updated ${updatedText} · ${state.tc.teams.length} teams` : 'No team code list is available yet. Connect once and refresh to save a copy.';
  // Selected Pokémon chips
  if (els.tcSelected) {
    els.tcSelected.innerHTML = state.tc.selected.map((selection, index) => {
      const listId = `tcItems-${index}`;
      const stones = tcMegaStoneNames(selection.species);
      return `<div class="tc-chip"><img src="${tcSpriteFor(selection.species)}" alt=""><div><b>${escapeHtml(selection.species)}</b><label><span>REQUIRED ITEM ${stones.length ? '· MEGA STONES FIRST' : ''}</span><input list="${listId}" data-tc-item="${index}" value="${escapeHtml(selection.item || '')}" placeholder="Any item (optional)"><datalist id="${listId}">${tcItemOptions(selection.species).map(name => `<option value="${escapeHtml(name)}">`).join('')}</datalist></label></div><button type="button" data-tc-remove="${index}" aria-label="Remove ${escapeHtml(selection.species)}">×</button></div>`;
    }).join('') || '<p class="tc-none-selected">No Pokémon filter yet — add up to 6 above.</p>';
  }
  const modeLabel = document.querySelector('#tcModeLabel');
  if (modeLabel) modeLabel.textContent = state.tc.mode === 'AND' ? 'ALL selected must be on the team' : 'ANY selected Pokémon matches';
  const modeToggle = document.querySelector('#tcModeToggle');
  if (modeToggle) { modeToggle.textContent = `MODE: ${state.tc.mode}`; modeToggle.setAttribute('aria-pressed', String(state.tc.mode === 'OR')); }
  const { visible, hiddenByUnknownItems, hiddenByUnpublishedItems = 0 } = tcFiltered();
  if (els.tcResultLine) els.tcResultLine.textContent = state.tc.teams.length ? `Showing ${visible.length} of ${state.tc.teams.length} teams${state.tc.onlyPublishedItems && hiddenByUnpublishedItems ? ` · ${hiddenByUnpublishedItems} hidden — items not published` : ''}${hiddenByUnknownItems ? ` · ${hiddenByUnknownItems} hidden because their held items were not published` : ''}` : '';
  if (els.tcEmpty) {
    els.tcEmpty.hidden = visible.length > 0 || !state.tc.teams.length;
    if (!visible.length && els.tcEmptyText) els.tcEmptyText.textContent = hiddenByUnknownItems
      ? `${hiddenByUnknownItems} team${hiddenByUnknownItems === 1 ? '' : 's'} ha${hiddenByUnknownItems === 1 ? 's' : 've'} your Pokémon but the source did not publish held items, so the item filter hid ${hiddenByUnknownItems === 1 ? 'it' : 'them'}. Tick “Include teams with unknown items” to see ${hiddenByUnknownItems === 1 ? 'it' : 'them'}, or remove the item requirement.`
      : state.tc.onlyPublishedItems && hiddenByUnpublishedItems
        ? `${hiddenByUnpublishedItems} team${hiddenByUnpublishedItems === 1 ? '' : 's'} matched but ${hiddenByUnpublishedItems === 1 ? 'its' : 'their'} items were not published, so “Only teams with published items” hid ${hiddenByUnpublishedItems === 1 ? 'it' : 'them'}. Turn that filter off to see species-only teams, or remove another filter.`
        : state.tc.favoritesOnly ? 'No favourite teams match yet. Tap ♥ on any team card to save it here.' : 'No teams match these filters. Try removing a Pokémon, an item requirement, or Reset Filters.';
  }
  els.tcGrid.innerHTML = visible.map(team => {
    const code = TeamCodesLib.normalizeTeamCode(team.code);
    const isFav = state.tcFavorites.has(code);
    const worked = state.tcWorked[code] || '';
    const current = team.regulation === CHAMPIONS_REGULATIONS.active;
    const dateText = TeamCodesLib.teamDate(team) || 'Date not listed';
    const tierLabel = team.dataTier === 'A' ? `Full set: ${team.members.filter(member => member.item).length} items listed` : team.dataTier === 'B' ? 'Species only · items not published' : 'Code only';
    const canBuild = team.dataTier === 'A' && team.members.every(member => tcResolveEntry(member.species));
    return `<article class="tc-card">
      <div class="tc-card-head"><div><h3>${escapeHtml(team.title || team.creator || 'Replica team')}</h3><p>${escapeHtml(team.creator || 'Creator not listed')}${team.event ? ` · ${escapeHtml(team.event.name)}${team.event.placing ? ` · ${escapeHtml(team.event.placing)}` : ''}` : ''} · ${escapeHtml(dateText)}</p></div><button class="tc-fav ${isFav ? 'active' : ''}" type="button" data-tc-fav="${code}" aria-label="Favourite ${code}" aria-pressed="${isFav}">${isFav ? '♥' : '♡'}</button></div>
      <div class="tc-chips"><span>${escapeHtml(team.regulation || 'Regulation not listed')}</span><span>${escapeHtml(team.format ? titleCase(team.format) : 'Format not listed')}</span><span>${tierLabel}</span><span class="${current ? 'current' : 'older'}">${current ? 'Current regulation' : 'Older regulation'}</span></div>
      <div class="tc-members">${team.members.map(member => `<div class="tc-member"><img src="${tcSpriteFor(member.species)}" alt="" loading="lazy"><b>${escapeHtml(member.species)}</b><span class="${member.item ? 'tc-item-known' : 'tc-item-unknown'}">${escapeHtml(member.item || 'Item not published')}</span>${member.ability ? `<em>${escapeHtml(member.ability)}</em>` : ''}</div>`).join('')}</div>
      <div class="tc-code-row"><button class="tc-code" type="button" data-tc-copy="${code}" title="Tap to copy" aria-label="Copy Replica Team code ${TeamCodesLib.formatTeamCode(code)}"><span>${TeamCodesLib.formatTeamCode(code)}</span><small>TAP CODE TO COPY</small></button><button class="tc-copy-btn" type="button" data-tc-copy="${code}">COPY CODE</button></div>
      <div class="tc-actions"><button type="button" data-tc-worked="worked" data-code="${code}" class="${worked === 'worked' ? 'active worked' : ''}">✓ Worked for me</button><button type="button" data-tc-worked="failed" data-code="${code}" class="${worked === 'failed' ? 'active failed' : ''}">✗ Didn’t work</button>${canBuild ? `<button type="button" data-tc-build="${code}">OPEN IN TEAM BUILDER</button>` : `<button type="button" disabled title="Open in Team Builder needs published items and moves (Tier A full sets)">BUILDER NEEDS FULL SETS</button>`}</div>
      <p class="tc-source">Listed ${escapeHtml(dateText)} · Source: ${team.source?.url ? `<a href="${escapeHtml(team.source.url)}" target="_blank" rel="noreferrer">${escapeHtml(team.source.name || 'Source')} ↗</a>` : escapeHtml(team.source?.name || 'Source not listed')} · Status is confirmed only inside Pokémon Champions.</p>
    </article>`;
  }).join('');
}
function openTeamCodeInBuilder(code) {
  const team = state.tc.teams.find(item => TeamCodesLib.normalizeTeamCode(item.code) === TeamCodesLib.normalizeTeamCode(code));
  if (!team || team.dataTier !== 'A') { showNotice('Open in Team Builder needs a full set with published items and moves.', 'warning'); return; }
  const members = []; const configs = {};
  for (const member of team.members) {
    const entry = tcResolveEntry(member.species);
    if (!entry) { showNotice(`${member.species} is not in the current roster, so this team cannot be opened safely.`, 'warning'); return; }
    const key = keyOf(entry);
    if (members.includes(key)) continue;
    members.push(key);
    configs[key] = { role: '', ability: member.ability || '', item: member.item || '', moves: Array.isArray(member.moves) ? member.moves.join(', ') : '', preset: 'base', lead: false, notes: `Replica code ${TeamCodesLib.formatTeamCode(team.code)} · ${team.source?.name || ''}`, alignmentUp: '', alignmentDown: '', points: { ...ChampionsCalc.PRESETS.base.points } };
  }
  state.team = { name: (team.title || 'Replica team').slice(0, 40), format: team.format === 'singles' ? 'singles' : 'doubles', members: members.slice(0, 6), configs };
  saveTeam();
  setView('team');
  showNotice('Replica team opened in Team Builder. Stat Points use the base preset — the code’s exact spreads stay in-game.');
}

function saveTextFile(filename, mimeType, content) {
  if (window.ChampionsAndroid?.saveTextFile) {
    window.ChampionsAndroid.saveTextFile(filename, mimeType, content);
    showNotice('Choose where to save the file on your device.');
    return;
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportJson(filename, value) {
  saveTextFile(filename, 'application/json', JSON.stringify(value, null, 2));
}

function saveWatchlist() {
  localStorage.setItem('champions-watchlist', JSON.stringify([...state.watchlist]));
  document.querySelector('#watchCount').textContent = state.watchlist.size;
}

function getViewRoster() {
  if (state.view === 'watchlist') return [...roster, ...megaRoster].filter(p => state.watchlist.has(keyOf(p)) || state.watchlist.has(p.name));
  if (state.search.trim()) return [...roster, ...megaRoster];
  return roster;
}

const normalizeMove = value => String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

function moveDatasetFor(p) {
  const explicit = typeof CHAMPIONS_MOVE_DATA !== 'undefined' ? CHAMPIONS_MOVE_DATA[p.name] : null;
  if (explicit?.moves?.length) return { moves: explicit.moves.map(move => typeof move === 'string' ? { name: normalizeMove(move), source: 'champions-verified' } : move), source: 'champions-verified', note: explicit.note || 'Champions-specific learnset' };
  const base = baseEntryFor(p);
  const baseExplicit = base && typeof CHAMPIONS_MOVE_DATA !== 'undefined' ? CHAMPIONS_MOVE_DATA[base.name] : null;
  if (p.group === 'mega' && baseExplicit?.moves?.length) return { moves: baseExplicit.moves.map(move => typeof move === 'string' ? { name: normalizeMove(move), source: 'champions-base-inherited' } : move), source: 'champions-base-inherited', note: `Inherited from ${displayName(base)} Champions learnset` };
  return { moves: [], source: 'unavailable', note: 'No confirmed Champions-specific learnset is loaded.' };
}

function moveReferenceFor(p, pokemon) {
  const explicit = moveDatasetFor(p);
  if (explicit.moves.length) return explicit;
  const base = baseEntryFor(p);
  const source = p.group === 'mega' ? 'champions-available-base-reference' : 'champions-available-reference';
  const moves = (pokemon?.moves || []).map(item => ({ name: normalizeMove(item.move?.name), source }));
  return {
    moves: moves.filter(item => item.name),
    source,
    note: p.group === 'mega' ? `Every listed move is available in Champions; compatibility is inherited from ${displayName(base)} as an inferred species reference.` : 'Every listed move is available in Champions; per-Pokémon compatibility is inferred from generic species data until a Champions-specific learnset is confirmed.'
  };
}

function moveMatchesFilters(meta) {
  if (!meta) return false;
  if (state.moveType !== 'all' && meta.type !== state.moveType) return false;
  if (state.moveCategory !== 'all' && meta.damage_class !== state.moveCategory) return false;
  if (state.movePower === 'damage' && !(meta.power > 0)) return false;
  if (state.movePower === 'status' && meta.power > 0) return false;
  if (state.moveAccuracy === 'reliable' && !(meta.accuracy === null || meta.accuracy >= 90)) return false;
  if (state.moveAccuracy === 'unreliable' && !(meta.accuracy !== null && meta.accuracy < 90)) return false;
  if (state.moveAccuracy === 'always' && !(meta.accuracy === null)) return false;
  return true;
}

function sortedRoster(list) {
  const byDex = (a, b) => (a.dex || a.id) - (b.dex || b.id) || displayName(a).localeCompare(displayName(b));
  const sorted = [...list];
  if (state.sort === 'name') sorted.sort((a, b) => displayName(a).localeCompare(displayName(b)) || byDex(a, b));
  else if (state.sort === 'type') sorted.sort((a, b) => (a.types[0] || '').localeCompare(b.types[0] || '') || byDex(a, b));
  else if (state.sort === 'mega') sorted.sort((a, b) => Number(b.group === 'mega' || b.megaCapable) - Number(a.group === 'mega' || a.megaCapable) || byDex(a, b));
  else sorted.sort(byDex);
  return sorted;
}

function filteredRoster() {
  return sortedRoster(getViewRoster().filter(p => {
    const nameMatch = `${p.name} ${p.display || ''}`.toLowerCase().includes(state.search.toLowerCase());
    const searchMatch = state.searchMode === 'move' ? (!state.search || state.moveMatches.has(keyOf(p))) : (nameMatch || state.abilityMatches.has(keyOf(p)));
    const typeMatch = state.type === 'all' || p.types.includes(state.type);
    const groupMatch = state.filter === 'all' || (state.filter === 'mega' ? p.megaCapable : p.group === state.filter);
    return searchMatch && typeMatch && groupMatch;
  }));
}

async function getAbilityIndex() {
  if (!abilityIndexPromise) {
    abilityIndexPromise = fetch(`${API}/ability?limit=1000`).then(response => {
      if (!response.ok) throw new Error('Ability index unavailable');
      return response.json();
    }).then(data => data.results);
  }
  return abilityIndexPromise;
}

async function getAbilityDetails(ability) {
  if (!abilityDetailsCache.has(ability.name)) {
    abilityDetailsCache.set(ability.name, fetch(ability.url).then(response => {
      if (!response.ok) throw new Error(`Ability unavailable: ${ability.name}`);
      return response.json();
    }));
  }
  return abilityDetailsCache.get(ability.name);
}

async function searchAbilityMatches(query) {
  const normalized = query.toLowerCase().trim().replace(/\s+/g, '-');
  const matches = new Set();
  const labels = new Map();

  [...roster, ...megaRoster].forEach(pokemon => {
    const snapshot = CHAMPIONS_REFERENCE_POKEMON[keyOf(pokemon)];
    const matchingAbilities = (snapshot?.abilities || []).map(item => item.ability?.name).filter(name => name?.includes(normalized));
    matchingAbilities.forEach(name => {
      const label = `${titleCase(name)} · reference`;
      matches.add(keyOf(pokemon));
      const current = labels.get(keyOf(pokemon)) || [];
      if (!current.includes(label)) current.push(label);
      labels.set(keyOf(pokemon), current);
    });
  });

  megaRoster.forEach(form => {
    const record = CHAMPIONS_MEGA_DATA[form.name];
    const matchingAbilities = record?.abilities.filter(ability => ability.name.includes(normalized)) || [];
    matchingAbilities.forEach(ability => {
      const label = titleCase(ability.name);
      matches.add(keyOf(form));
      const current = labels.get(keyOf(form)) || [];
      if (!current.includes(label)) current.push(label);
      labels.set(keyOf(form), current);
    });
  });

  try {
    if (matches.size) throw new Error('Bundled ability index satisfied this search.');
    const index = await getAbilityIndex();
    let candidates = index.filter(ability => ability.name.includes(normalized));
    const exact = candidates.find(ability => ability.name === normalized);
    candidates = exact ? [exact] : candidates.slice(0, 20);
    const details = await Promise.all(candidates.map(getAbilityDetails));
    if (state.search !== query) return;

    details.forEach((ability, abilityIndex) => {
      const pokemonNames = new Set(ability.pokemon.map(item => item.pokemon.name));
      const label = titleCase(candidates[abilityIndex].name);
      roster.forEach(pokemon => {
        if (pokemonNames.has(pokemon.apiName || pokemon.name) || pokemonNames.has(pokemon.name)) {
          matches.add(keyOf(pokemon));
          const current = labels.get(keyOf(pokemon)) || [];
          if (!current.includes(label)) current.push(label);
          labels.set(keyOf(pokemon), current);
        }
      });
      megaRoster.forEach(form => {
        if (pokemonNames.has(form.apiName || form.name)) {
          matches.add(keyOf(form));
          const current = labels.get(keyOf(form)) || [];
          if (!current.includes(label)) current.push(label);
          labels.set(keyOf(form), current);
        }
      });
    });
  } catch {
    if (state.search !== query) return;
  } finally {
    if (state.search === query) {
      state.abilityMatches = matches;
      state.abilityMatchLabels = labels;
      state.abilitySearchPending = false;
      renderGrid();
    }
  }
}

async function fetchMoveSource(p) {
  const explicit = moveDatasetFor(p);
  if (explicit.moves.length) return explicit;
  const apiName = p.group === 'mega' ? (p.baseName || p.dex || p.id) : (p.apiName || p.id);
  const response = await fetch(`${API}/pokemon/${apiName}`).catch(() => null);
  if (!response?.ok) return { moves: [], source: 'unavailable', note: 'Move data unavailable.' };
  return moveReferenceFor(p, await response.json());
}

function saveMoveIndex() {
  try {
    const serialized = Object.fromEntries([...state.moveIndex].map(([key, value]) => [key, value]));
    localStorage.setItem('champions-move-index-v1', JSON.stringify(serialized));
  } catch {
    // Storage is optional; the in-memory index remains usable.
  }
}

function restoreMoveIndex() {
  if (typeof CHAMPIONS_REFERENCE_MOVE_INDEX !== 'undefined' && typeof CHAMPIONS_REFERENCE_MOVE_META !== 'undefined') {
    state.moveIndex = new Map();
    roster.forEach(p => {
      const names = CHAMPIONS_REFERENCE_MOVE_INDEX[keyOf(p)] || [];
      state.moveIndex.set(keyOf(p), {
        moves: Object.fromEntries(names.map(name => [name, { source: 'champions-available-reference', meta: CHAMPIONS_REFERENCE_MOVE_META[name] || null }])),
        source: 'champions-available-reference',
        note: 'Move availability in Champions is confirmed by the current move list; this Pokémon’s compatibility is an inferred species reference.'
      });
    });
    megaRoster.forEach(p => {
      const names = CHAMPIONS_REFERENCE_MOVE_INDEX[p.baseKey] || [];
      state.moveIndex.set(keyOf(p), {
        moves: Object.fromEntries(names.map(name => [name, { source: 'champions-available-base-reference', meta: CHAMPIONS_REFERENCE_MOVE_META[name] || null }])),
        source: 'champions-available-base-reference',
        note: `Every listed move is available in Champions; compatibility is inherited from ${displayName(baseEntryFor(p))} as an inferred species reference.`
      });
    });
    state.moveCatalog = new Set(Object.keys(CHAMPIONS_REFERENCE_MOVE_META));
    Object.entries(CHAMPIONS_REFERENCE_MOVE_META).forEach(([name, meta]) => state.moveMeta.set(name, { ...meta }));
    Object.entries(CHAMPIONS_MOVE_OVERRIDES).forEach(([name, meta]) => state.moveMeta.set(name, { ...(state.moveMeta.get(name) || {}), ...meta }));
    state.moveIndexReady = true;
    updateMoveOptions();
    return true;
  }
  try {
    const stored = readStoredJson('champions-move-index-v1', null);
    if (!stored) return false;
    state.moveIndex = new Map(Object.entries(stored));
    state.moveCatalog = new Set([...state.moveIndex.values()].flatMap(entry => Object.keys(entry.moves || {})));
    state.moveIndexReady = true;
    updateMoveOptions();
    return true;
  } catch {
    return false;
  }
}

function updateMoveOptions() {
  if (!els.moveOptions) return;
  const names = [...state.moveCatalog].sort((a, b) => a.localeCompare(b));
  els.moveOptions.innerHTML = names.map(name => `<option value="${titleCase(name)}"></option>`).join('');
}

async function ensureMoveIndex() {
  if (state.moveIndexReady) return;
  if (state.moveIndexPromise) return state.moveIndexPromise;
  if (restoreMoveIndex()) return;
  const targets = [...roster, ...megaRoster];
  state.moveIndexPromise = (async () => {
    let completed = 0;
    const queue = [...targets];
    const worker = async () => {
      while (queue.length) {
        const p = queue.shift();
        const result = await fetchMoveSource(p);
        const moves = Object.fromEntries(result.moves.map(move => [normalizeMove(move.name), { source: move.source || result.source, meta: move.meta || null }]));
        state.moveIndex.set(keyOf(p), { moves, source: result.source, note: result.note });
        Object.keys(moves).forEach(name => state.moveCatalog.add(name));
        completed += 1;
        if (state.searchMode === 'move') els.resultCount.textContent = `Indexing Champions move references… ${completed}/${targets.length}`;
      }
    };
    await Promise.all(Array.from({ length: 6 }, worker));
    state.moveIndexReady = true;
    state.moveIndexPromise = null;
    saveMoveIndex();
    updateMoveOptions();
  })().catch(error => {
    state.moveIndexPromise = null;
    throw error;
  });
  return state.moveIndexPromise;
}

async function getMoveDetails(names) {
  names.forEach(name => {
    const bundled = typeof CHAMPIONS_REFERENCE_MOVE_META !== 'undefined' ? CHAMPIONS_REFERENCE_MOVE_META[name] : null;
    const override = ChampionsKnowledge.move(name);
    if (bundled || override) state.moveMeta.set(name, { ...(bundled || {}), ...(override || {}) });
  });
  const queue = names.filter(name => !state.moveMeta.has(name));
  const worker = async () => {
    while (queue.length) {
      const name = queue.shift();
      const response = await fetch(`${API}/move/${name}`).catch(() => null);
      if (!response?.ok) continue;
      const data = await response.json();
      state.moveMeta.set(name, {
        name,
        type: data.type?.name || null,
        damage_class: data.damage_class?.name || null,
        power: data.power,
        accuracy: data.accuracy,
        priority: data.priority,
        target: data.target?.name || null,
        spread: ['all-opponents','all-other-pokemon','all-pokemon','user-and-allies','all-allies'].includes(data.target?.name),
        contact: null,
        short_effect: data.effect_entries?.find(entry => entry.language.name === 'en')?.short_effect || '',
        status: 'reference', source: 'pokeapi', lastVerified: '2026-08-03'
      });
    }
  };
  await Promise.all(Array.from({ length: 5 }, worker));
}

async function searchMoveMatches(query) {
  state.moveSearchPending = true;
  state.moveMatches = new Set();
  state.moveMatchLabels = new Map();
  renderGrid();
  const matchesByPokemon = new Set();
  const labelsByPokemon = new Map();
  try {
    await ensureMoveIndex();
    const normalized = normalizeMove(query);
    const candidates = [...state.moveCatalog].filter(name => name.includes(normalized));
    await getMoveDetails(candidates.slice(0, 60));
    if (state.search !== query || state.searchMode !== 'move') return;
    const eligible = new Set(candidates.filter(name => moveMatchesFilters(state.moveMeta.get(name))));
    [...state.moveIndex].forEach(([key, entry]) => {
      const matches = Object.keys(entry.moves || {}).filter(name => eligible.has(name));
      if (!matches.length) return;
      matchesByPokemon.add(key);
      labelsByPokemon.set(key, { moves: matches, source: entry.source, note: entry.note });
    });
  } catch {
    matchesByPokemon.clear();
    labelsByPokemon.clear();
  } finally {
    if (state.search === query && state.searchMode === 'move') {
      state.moveMatches = matchesByPokemon;
      state.moveMatchLabels = labelsByPokemon;
      state.moveSearchPending = false;
      renderGrid();
      if (state.view === 'heatmap') renderHeatmap();
    }
  }
}

function recordRecent(p) {
  const key = keyOf(p);
  state.recent = [key, ...state.recent.filter(item => item !== key)].slice(0, 8);
  try { localStorage.setItem('champions-recent', JSON.stringify(state.recent)); } catch { /* storage optional */ }
  renderRecent();
}

function renderRecent() {
  if (!els.recentStrip || !els.recentChips) return;
  const entries = state.recent.map(key => teamMember(key)).filter(Boolean);
  const show = entries.length > 0 && (state.view === 'roster' || state.view === 'watchlist') && !state.search.trim();
  els.recentStrip.hidden = !show;
  if (!show) return;
  els.recentChips.innerHTML = entries.map(entry => `<button class="recent-chip" type="button" data-recent-key="${escapeHtml(keyOf(entry))}"><img src="${spriteFor(entry)}" alt=""><span>${escapeHtml(displayName(entry))}</span></button>`).join('');
  els.recentChips.querySelectorAll('[data-recent-key]').forEach(button => button.addEventListener('click', () => { const target = teamMember(button.dataset.recentKey); if (target) openDetail(target); }));
}

function renderCard(p) {
  const node = document.querySelector('#cardTemplate').content.cloneNode(true);
  const card = node.querySelector('.pokemon-card');
  card.dataset.name = p.name;
  card.dataset.type = p.types[0];
  node.querySelector('.dex-number').textContent = `#${pad(p.dex || p.id)}`;
  const image = node.querySelector('img');
  image.src = spriteFor(p);
  image.alt = displayName(p);
  image.onerror = () => { image.onerror = null; image.src = ARTWORK_UNAVAILABLE; image.closest('.pokemon-card')?.classList.add('artwork-missing'); };
  node.querySelector('h2').textContent = displayName(p);
  const label = node.querySelector('.card-label');
  const matchedAbilities = state.abilityMatchLabels.get(keyOf(p));
  const matchedMove = state.moveMatchLabels.get(keyOf(p));
  label.textContent = matchedAbilities?.length ? `Ability · ${matchedAbilities.slice(0, 2).join(', ')}` : p.label || (p.group === 'new' ? 'M–C addition' : p.megaCapable ? 'Mega-capable · M–C eligible' : 'M–C eligible');
  label.classList.toggle('mega', p.group === 'mega');
  if (state.searchMode === 'move' && matchedMove) label.textContent = `Move: ${matchedMove.moves.slice(0, 2).map(titleCase).join(', ')}`;
  label.classList.toggle('ability-match', Boolean(matchedAbilities?.length || matchedMove));
  node.querySelector('.type-row').innerHTML = p.types.map(type => `<span class="type-pill" data-type="${type}">${type}</span>`).join('');
  const watch = node.querySelector('.watch-button');
  const isSaved = state.watchlist.has(keyOf(p)) || state.watchlist.has(p.name);
  watch.classList.toggle('saved', isSaved);
  watch.textContent = isSaved ? '◆' : '◇';
  watch.setAttribute('aria-label', `${isSaved ? 'Remove' : 'Add'} ${displayName(p)} ${isSaved ? 'from' : 'to'} watchlist`);
  watch.addEventListener('click', event => {
    event.stopPropagation();
    toggleWatch(p);
  });
  const hitbox = node.querySelector('.card-hitbox');
  hitbox.setAttribute('aria-label', `Open ${displayName(p)} details`);
  hitbox.addEventListener('click', () => openDetail(p));
  return node;
}

function renderGrid() {
  if (state.view === 'compare') {
    els.grid.hidden = true;
    els.empty.hidden = true;
    els.gridFooter.hidden = true;
    els.compareView.hidden = false;
    renderCompare();
    return;
  }
  els.compareView.hidden = true;
  els.grid.hidden = false;
  renderRecent();
  const list = filteredRoster();
  const visible = list.slice(0, state.visibleLimit);
  els.grid.innerHTML = '';
  visible.forEach(p => els.grid.append(renderCard(p)));
  els.empty.hidden = list.length !== 0 || state.abilitySearchPending || state.moveSearchPending;
  els.grid.hidden = list.length === 0;
  els.gridFooter.hidden = list.length === 0 && !state.abilitySearchPending && !state.moveSearchPending;
  if (!els.empty.hidden) {
    const title = els.empty.querySelector('h2');
    const message = els.empty.querySelector('p');
    if (state.view === 'watchlist') {
      title.textContent = 'Your watchlist is empty';
      message.textContent = 'Save Pokémon with the diamond button and they will appear here.';
    } else if (state.searchMode === 'move') {
      title.textContent = 'No compatible Pokémon found';
      message.textContent = 'Try another move name or clear the move filters.';
    } else {
      title.textContent = 'No Pokémon found';
      message.textContent = 'Try another name, Ability, type, or roster filter.';
    }
  }
  const abilityNames = [...new Set([...state.abilityMatchLabels.values()].flat())];
  const moveNames = [...new Set([...state.moveMatchLabels.values()].flatMap(value => value.moves || []))];
  const abilitySuffix = abilityNames.length ? ` · Ability: ${abilityNames.slice(0, 2).join(', ')}${abilityNames.length > 2 ? ` +${abilityNames.length - 2}` : ''}` : '';
  els.resultCount.textContent = state.abilitySearchPending ? `${list.length ? `Showing ${visible.length} name match${visible.length === 1 ? '' : 'es'} · ` : ''}Searching Abilities…` : `Showing ${visible.length} of ${list.length}${abilitySuffix}`;
  if (state.searchMode === 'move' && !state.moveSearchPending) {
    els.resultCount.textContent = `Showing ${visible.length} of ${list.length}${moveNames.length ? ` · Move: ${moveNames.slice(0, 2).map(titleCase).join(', ')}` : ''}`;
  }
  els.loadMore.hidden = visible.length >= list.length;
}

function mechanicSearchText(mechanic) {
  return [mechanic.name, mechanic.category, mechanic.duration, mechanic.summary, ...mechanic.effects, mechanic.interactions, mechanic.counter].join(' ').toLowerCase();
}

function renderMechanics() {
  const query = state.search.toLowerCase();
  const list = CHAMPIONS_MECHANICS.filter(mechanic => {
    const categoryMatch = state.mechanicsCategory === 'All' || mechanic.category === state.mechanicsCategory;
    return categoryMatch && mechanicSearchText(mechanic).includes(query);
  });
  els.mechanicsResultCount.textContent = `${list.length} mechanic${list.length === 1 ? '' : 's'} shown`;
  els.mechanicsFilters.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset.category === state.mechanicsCategory));
  els.mechanicsGrid.innerHTML = list.map(mechanic => {
    const championsSpecific = mechanic.category === 'Champions Rules' || ['paralysis','freeze','sleep','electric-terrain'].includes(mechanic.id);
    const categoryClass = mechanic.category.toLowerCase().replace(/\s+/g, '-');
    return `<article class="mechanic-card ${categoryClass}" data-mechanic-id="${mechanic.id}">
      <button class="mechanic-summary" type="button" aria-expanded="${state.mechanicsExpandedAll}">
        <span class="mechanic-icon">${mechanic.icon}</span>
        <span class="mechanic-title"><small>${mechanic.category}${championsSpecific ? ' · CHAMPIONS VERIFIED' : ''}</small><b>${mechanic.name}</b><em>${mechanic.summary}</em></span>
        <span class="mechanic-duration">${mechanic.duration}</span>
        <span class="mechanic-chevron">⌄</span>
      </button>
      <div class="mechanic-body" ${state.mechanicsExpandedAll ? '' : 'hidden'}>
        <section><h4>Exact effects</h4><ul>${mechanic.effects.map(effect => `<li>${effect}</li>`).join('')}</ul></section>
        <section><h4>Interactions</h4><p>${mechanic.interactions}</p></section>
        <section class="mechanic-counter"><h4>Counterplay / removal</h4><p>${mechanic.counter}</p></section>
        <section class="mechanic-record-link">${sourceMarkup(ChampionsKnowledge.term(mechanic.id))}<button class="card-open-link" type="button" data-term-id="${mechanic.id}">OPEN SHARED TERMINOLOGY RECORD →</button></section>
      </div>
    </article>`;
  }).join('');
  if (!list.length) els.mechanicsGrid.innerHTML = '<div class="mechanics-empty"><b>No matching mechanic</b><p>Try a condition, effect, move, Ability, or counter.</p></div>';
  els.mechanicsGrid.querySelectorAll('.mechanic-summary').forEach(button => button.addEventListener('click', () => {
    const body = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
  }));
}

function initMechanics() {
  const categories = ['All', ...new Set(CHAMPIONS_MECHANICS.map(mechanic => mechanic.category))];
  els.mechanicsFilters.innerHTML = categories.map(category => `<button type="button" data-category="${category}">${category}${category === 'All' ? ` <em>${CHAMPIONS_MECHANICS.length}</em>` : ''}</button>`).join('');
  els.mechanicsFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    state.mechanicsCategory = button.dataset.category;
    state.mechanicsExpandedAll = false;
    els.expandMechanics.textContent = 'Expand all';
    renderMechanics();
  }));
}

function toggleWatch(p) {
  const key = keyOf(p);
  if (state.watchlist.has(key) || state.watchlist.has(p.name)) {
    state.watchlist.delete(key);
    state.watchlist.delete(p.name);
  } else {
    state.watchlist.add(key);
  }
  saveWatchlist();
  renderGrid();
  if (keyOf(state.detail || {}) === key) {
    const button = document.querySelector('#detailWatch');
    const saved = state.watchlist.has(key) || state.watchlist.has(p.name);
    button?.classList.toggle('active', saved);
    if (button) button.textContent = saved ? '◆ SAVED' : '◇ SAVE';
  }
}

async function fetchPokemon(p) {
  const key = keyOf(p);
  if (state.detailData.has(key)) return state.detailData.get(key);
  const championsMega = CHAMPIONS_MEGA_DATA[p.name];
  let pokemon = typeof CHAMPIONS_REFERENCE_POKEMON !== 'undefined' ? CHAMPIONS_REFERENCE_POKEMON[key] : null;
  let fallback = false;
  if (pokemon) pokemon = JSON.parse(JSON.stringify(pokemon));
  if (!pokemon) {
    let apiName = championsMega ? (p.baseName || p.dex || p.id) : (p.apiName || p.id);
    let response = await fetch(`${API}/pokemon/${apiName}`).catch(() => null);
    const fallbackKey = p.baseName || p.dex || p.id;
    if (!response?.ok && String(fallbackKey) !== String(apiName)) {
      apiName = fallbackKey;
      fallback = true;
      response = await fetch(`${API}/pokemon/${apiName}`).catch(() => null);
    }
    if (!response?.ok) throw new Error('Pokémon data is unavailable in the bundled reference or network source.');
    pokemon = await response.json();
  }
  const species = null;
  if (championsMega) {
    pokemon.name = championsMega.slug;
    pokemon.types = championsMega.types.map((name, slot) => ({ slot: slot + 1, type: { name } }));
    pokemon.stats = Object.entries(championsMega.stats).map(([name, base_stat]) => ({ base_stat, effort: 0, stat: { name } }));
    pokemon.abilities = championsMega.abilities.map((ability, slot) => ({ ability: { name: ability.name }, is_hidden: false, slot: slot + 1 }));
  }
  if (p.group === 'mega' && typeof CHAMPIONS_REFERENCE_POKEMON !== 'undefined') {
    const basePokemon = CHAMPIONS_REFERENCE_POKEMON[p.baseKey];
    if (basePokemon?.moves) pokemon.moves = JSON.parse(JSON.stringify(basePokemon.moves));
  }
  const abilityDetails = pokemon.abilities.map(item => {
    const localMegaAbility = championsMega?.abilities.find(ability => ability.name === item.ability.name);
    const knowledge = completeAbilityRecord(item.ability.name);
    return {
      name: item.ability.name,
      hidden: item.is_hidden,
      description: knowledge?.summary || localMegaAbility?.description,
      knowledge,
      status: knowledge?.status || (localMegaAbility ? 'inferred' : 'reference'),
      source: knowledge?.source || (localMegaAbility ? null : 'pokeapi'),
      lastVerified: knowledge?.lastVerified || '2026-08-03'
    };
  });
  const moveReference = moveReferenceFor(p, pokemon);
  const result = { pokemon, species, abilityDetails, fallback, championsOverride: Boolean(championsMega), moveReference };
  state.detailData.set(key, result);
  return result;
}

let lockedScrollY = 0;
const viewScrollPositions = new Map([['roster', 0]]);
let pendingViewScroll = 0;

function setDocumentScroll(top) {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, Math.max(0, top || 0));
  document.documentElement.style.scrollBehavior = previousBehavior;
}

function syncInteractionIsolation() {
  const menuOpen = document.body.classList.contains('menu-open');
  const detailOpen = document.body.classList.contains('panel-open');
  const knowledgeOpen = document.body.classList.contains('knowledge-open');
  const mobile = window.matchMedia('(max-width: 1024px)').matches;
  if (els.menuButton) els.menuButton.setAttribute('aria-expanded', String(menuOpen));
  if (els.drawerScrim) els.drawerScrim.hidden = !menuOpen;
  if (els.sidebar) {
    els.sidebar.toggleAttribute('inert', mobile && !menuOpen);
    els.sidebar.setAttribute('aria-hidden', String(mobile && !menuOpen));
  }
  if (els.mainContent) els.mainContent.toggleAttribute('inert', menuOpen || detailOpen || knowledgeOpen);
  if (els.panel) {
    els.panel.toggleAttribute('inert', knowledgeOpen || !detailOpen);
    els.panel.setAttribute('aria-hidden', String(!detailOpen || knowledgeOpen));
  }
}

function positionGlobalSearchResults() {
  if (!els.search || !els.globalResults) return;
  const rect = els.search.closest('.global-search')?.getBoundingClientRect();
  if (!rect) return;
  document.documentElement.style.setProperty('--search-results-top', `${Math.round(rect.bottom + 6)}px`);
  document.documentElement.style.setProperty('--search-results-left', `${Math.round(rect.left)}px`);
  document.documentElement.style.setProperty('--search-results-width', `${Math.round(rect.width)}px`);
}

function updateCompareTrayClearance() {
  const height = els.compareTray && !els.compareTray.hidden ? Math.ceil(els.compareTray.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty('--compare-tray-height', `${height}px`);
}

function syncViewHistory(view, mode = 'push') {
  if (mode === 'none') return;
  const url = new URL(window.location.href);
  url.searchParams.set('view', view);
  if (view !== 'moves') url.searchParams.delete('move');
  if (!document.body.classList.contains('panel-open')) url.searchParams.delete('pokemon');
  history[mode === 'replace' ? 'replaceState' : 'pushState']({ view }, '', url);
}

function syncScrollLock() {
  const shouldLock = document.body.classList.contains('panel-open')
    || document.body.classList.contains('knowledge-open')
    || document.body.classList.contains('menu-open');
  const isLocked = document.body.classList.contains('scroll-locked');
  if (shouldLock && !isLocked) {
    lockedScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add('scroll-locked');
  } else if (!shouldLock && isLocked) {
    document.body.classList.remove('scroll-locked');
    document.body.style.top = '';
    setDocumentScroll(lockedScrollY);
  }
  syncInteractionIsolation();
}

function toggleMobileMenu(force) {
  const open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  syncScrollLock();
}

function queueViewScroll(view) {
  cancelAnimationFrame(pendingViewScroll);
  pendingViewScroll = requestAnimationFrame(() => setDocumentScroll(viewScrollPositions.get(view) || 0));
}

let detailReturnFocus = null;
async function openDetail(p, options = {}) {
  state.detail = p;
  recordRecent(p);
  const requestedKey = keyOf(p);
  const panelWasOpen = els.panel.classList.contains('open');
  const link = new URL(window.location.href);
  link.searchParams.set('pokemon', p.name || p.display || p.id);
  if (options.historyMode !== 'none') history[panelWasOpen ? 'replaceState' : 'pushState']({ view: state.view, overlay:'detail' }, '', link);
  els.panel.classList.add('open');
  els.panel.setAttribute('aria-hidden', 'false');
  els.scrim.hidden = false;
  document.body.classList.add('panel-open');
  els.panel.scrollTop = 0;
  syncScrollLock();
  if (!detailReturnFocus) detailReturnFocus = document.activeElement;
  els.panel.setAttribute('aria-label', `${displayName(p)} Pokémon details`);
  requestAnimationFrame(() => els.panel.focus({ preventScroll:true }));
  els.detail.innerHTML = '<div class="loading-detail">SYNCING DATA…</div>';
  try {
    const data = await fetchPokemon(p);
    if (keyOf(state.detail || {}) === requestedKey) renderDetail(p, data);
  } catch (error) {
    if (keyOf(state.detail || {}) === requestedKey) els.detail.innerHTML = `<div class="error-detail"><h2>Data unavailable</h2><p>${escapeHtml(error.message)}</p><button class="detail-action" type="button" data-retry-detail="${escapeHtml(requestedKey)}">RETRY</button></div>`;
  }
}

function renderDetailFromCache(p) {
  const data = state.detailData.get(keyOf(p));
  if (data) renderDetail(p, data);
}

function detailImage(p, data) {
  return spriteFor(p);
}

function statRadarMarkup(stats) {
  const values = statNames.map(name => Number(stats[name] || 0));
  const points = values.map((value, index) => {
    const angle = (-Math.PI / 2) + (Math.PI * 2 * index / 6);
    const radius = Math.max(8, Math.min(44, value / 260 * 44));
    return `${50 + Math.cos(angle) * radius},${50 + Math.sin(angle) * radius}`;
  }).join(' ');
  const labels = ['HP','ATK','DEF','SpA','SpD','SPD'];
  return `<div class="stat-radar"><div class="section-heading"><h3>Default Champions profile</h3><span>0 SP · NEUTRAL</span></div><svg viewBox="0 0 100 100" role="img" aria-label="Default Champions stat radar"><polygon class="radar-ring" points="50,6 88,28 88,72 50,94 12,72 12,28"></polygon><polygon class="radar-ring inner" points="50,28 69,39 69,61 50,72 31,61 31,39"></polygon><polygon class="radar-shape" points="${points}"></polygon>${labels.map((label, index) => { const angle = (-Math.PI / 2) + (Math.PI * 2 * index / 6); return `<text x="${50 + Math.cos(angle) * 47}" y="${52 + Math.sin(angle) * 47}" text-anchor="middle">${label}</text>`; }).join('')}</svg><p>Level 50 values before any of the player’s 66 Stat Points are assigned.</p></div>`;
}

function renderDetail(p, data) {
  const { pokemon, species, abilityDetails, fallback, championsOverride, moveReference } = data;
  const flavor = species?.flavor_text_entries?.find(x => x.language.name === 'en')?.flavor_text.replace(/\s+/g, ' ') || 'Battle data linked from the international Pokédex network.';
  const baseStats = baseStatsFor(data);
  const championsStats = defaultStatsFor(data);
  const total = defaultStatTotal(championsStats);
  const rawTotal = defaultStatTotal(baseStats);
  const artworkSource = artworkSourceFor(p);
  const stats = statRowsMarkup(championsStats);
  const moves = pokemon.moves.map(item => {
    const latest = item.version_group_details.at(-1);
    return { name: item.move.name, method: latest?.move_learn_method?.name || 'move pool', level: latest?.level_learned_at || 0 };
  }).sort((a,b) => a.name.localeCompare(b.name));
  const baseEntry = baseEntryFor(p);
  const relatedMegas = megaFormsFor(p);
  const formTargets = p.group === 'mega' ? [baseEntry, ...relatedMegas.filter(form => keyOf(form) !== keyOf(p))] : relatedMegas;
  const formSwitcher = formTargets.length ? `
    <section class="mega-switcher">
      <div class="mega-switcher-head">
        <div><span class="mega-spark">✦</span><span><b>${p.group === 'mega' ? 'FORM SELECTOR' : 'MEGA EVOLUTION'}</b><small>${p.group === 'mega' ? 'Return to normal or switch Mega form' : `${relatedMegas.length} battle form${relatedMegas.length === 1 ? '' : 's'} available`}</small></span></div>
        <em>${p.group === 'mega' ? 'MEGA ACTIVE' : 'COMPATIBLE'}</em>
      </div>
      <div class="mega-form-actions">
        ${formTargets.map(target => `<button class="mega-form-button" data-form-key="${keyOf(target)}" type="button">${target.group === 'mega' ? '✦' : '↩'} ${displayName(target)}</button>`).join('')}
      </div>
    </section>` : '';

  els.detail.innerHTML = `
    <div class="detail-hero" data-dex="#${pad(p.dex || p.id)}"><img src="${detailImage(p, data)}" alt="${displayName(p)}"><span class="artwork-credit">${p.group === 'mega' ? 'FORM-SPECIFIC MEGA ARTWORK' : 'OFFICIAL FORM ARTWORK'}${artworkSource ? ` · ${escapeHtml(artworkSource.source)}` : ''}</span></div>
    <div class="detail-heading">
      <div class="detail-title-row">
        <div><span class="eyebrow">#${pad(p.dex || p.id)} · ${p.label || (p.group === 'new' ? 'M–C ADDITION' : 'M–C ELIGIBLE')}</span><h2>${displayName(p)}</h2></div>
        <div class="detail-actions">
          <button class="detail-action ${state.watchlist.has(keyOf(p)) || state.watchlist.has(p.name) ? 'active' : ''}" id="detailWatch" type="button">${state.watchlist.has(keyOf(p)) || state.watchlist.has(p.name) ? '◆ SAVED' : '◇ SAVE'}</button>
          <button class="detail-action ${state.compare.some(x => keyOf(x) === keyOf(p)) ? 'active' : ''}" id="detailCompare" type="button">⇄ COMPARE</button>
          <button class="detail-action" id="detailTeam" type="button">＋ TEAM</button>
        </div>
      </div>
      <div class="type-row">${pokemon.types.map(item => `<span class="type-pill" data-type="${item.type.name}">${item.type.name}</span>`).join('')}</div>
      <p class="detail-description">${flavor}</p>
    </div>
    ${formSwitcher}
    ${championsOverride ? '<p class="data-note">Champions-specific Mega stats, typing, and Ability records are shown with their individual provenance. The move pool is inherited from the normal form and remains a clearly labeled reference where Champions compatibility is unconfirmed.</p>' : fallback ? '<p class="data-note">Detailed form data is unavailable. Any base-form fallback is explicitly labeled and is not claimed as Champions form data.</p>' : '<p class="data-note">Default Champions stats are calculated locally. Each Ability and move record below carries its own verification status; generic reference data is never presented as Champions-confirmed.</p>'}
    <div class="detail-tabs" role="tablist">
      <button class="detail-tab active" id="detail-tab-stats" role="tab" aria-selected="true" aria-controls="detail-panel-stats" tabindex="0" data-tab="stats" type="button">STATS</button>
      <button class="detail-tab" id="detail-tab-abilities" role="tab" aria-selected="false" aria-controls="detail-panel-abilities" tabindex="-1" data-tab="abilities" type="button">ABILITIES</button>
      <button class="detail-tab" id="detail-tab-moves" role="tab" aria-selected="false" aria-controls="detail-panel-moves" tabindex="-1" data-tab="moves" type="button">MOVES <small>${moves.length}</small></button>
    </div>
    <div class="tab-panel" id="detail-panel-stats" role="tabpanel" aria-labelledby="detail-tab-stats" data-panel="stats">
      <div class="section-heading"><h3>Default Champions stats</h3><span>LEVEL 50 · 0 SP · NEUTRAL</span></div>
      <p class="data-note"><b>CHAMPIONS FORMULA</b> HP = Base + 75. Every other stat = Base + 20 before player-assigned Stat Points and Alignment.</p>
      ${stats}
      ${statRadarMarkup(championsStats)}
      <div class="stat-total"><span>DEFAULT CHAMPIONS STAT TOTAL</span><b>${total}</b></div>
      <details class="raw-stat-reference"><summary>Raw species base-stat reference</summary>${statRowsMarkup(baseStats, true)}<div class="stat-total"><span>RAW BASE STAT TOTAL</span><b>${rawTotal}</b></div></details>
      <div class="section-heading" style="margin-top:20px"><h3>Profile</h3><span>CANONICAL</span></div>
      <div class="ability-list">
        <div class="ability-card"><strong>Height <em>${pokemon.height / 10} M</em></strong></div>
        <div class="ability-card"><strong>Weight <em>${pokemon.weight / 10} KG</em></strong></div>
        <div class="ability-card"><strong>Base XP <em>${pokemon.base_experience ?? '—'}</em></strong></div>
      </div>
    </div>
    <div class="tab-panel" id="detail-panel-abilities" role="tabpanel" aria-labelledby="detail-tab-abilities" data-panel="abilities" hidden>
      <div class="section-heading"><h3>Abilities</h3><span>${abilityDetails.length} FOUND</span></div>
      <div class="ability-list">${abilityDetails.map(abilityCardMarkup).join('')}</div>
    </div>
    <div class="tab-panel" id="detail-panel-moves" role="tabpanel" aria-labelledby="detail-tab-moves" data-panel="moves" hidden>
      <div class="section-heading"><h3>Move pool</h3><span>${moves.length} MOVES</span></div>
      <p class="data-note move-provenance"><b>${moveReference.source === 'champions-verified' ? 'CHAMPIONS-SPECIFIC' : 'UNVERIFIED REFERENCE'}</b> ${moveReference.note}</p>
      <div class="moves-controls"><input id="moveSearch" type="search" placeholder="Filter moves…"></div>
      <div class="move-list" id="moveList">${moveRows(moves)}</div>
    </div>
    <div class="detail-note-box"><div class="section-heading"><h3>Personal note</h3><span>LOCAL ONLY</span></div><textarea id="detailNoteInput" rows="3" placeholder="Add a training or matchup note…">${escapeHtml(getNote(p))}</textarea><button id="saveDetailNote" class="detail-action" type="button">SAVE NOTE</button><p id="detailNoteStatus" class="data-note"></p></div>
  `;

  document.querySelector('#detailWatch').addEventListener('click', () => toggleWatch(p));
  document.querySelector('#detailCompare').addEventListener('click', () => toggleCompare(p));
  document.querySelector('#detailTeam').addEventListener('click', () => { addToTeam(p); setView('team'); closeDetail(); });
  document.querySelector('#saveDetailNote').addEventListener('click', () => saveNote(p, document.querySelector('#detailNoteInput').value));
  document.querySelectorAll('.mega-form-button').forEach(button => button.addEventListener('click', () => {
    const target = [baseEntry, ...relatedMegas].find(form => keyOf(form) === button.dataset.formKey);
    if (target) openDetail(target);
  }));
  document.querySelectorAll('.detail-tab').forEach(button => {
    button.addEventListener('click', () => switchDetailTab(button.dataset.tab));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const tabs = [...document.querySelectorAll('.detail-tab')];
      const current = tabs.indexOf(button);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      switchDetailTab(tabs[next].dataset.tab); tabs[next].focus();
    });
  });
  document.querySelector('#moveSearch').addEventListener('input', event => {
    const query = event.target.value.toLowerCase();
    document.querySelector('#moveList').innerHTML = moveRows(moves.filter(m => m.name.includes(query)));
  });
}

function moveRows(moves) {
  if (!moves.length) return '<div class="move-row"><b>No matching moves</b></div>';
  return moves.map(m => {
    const meta = state.moveMeta.get(m.name) || CHAMPIONS_REFERENCE_MOVE_META?.[m.name] || {};
    const override = ChampionsKnowledge.move(m.name);
    const record = { ...meta, ...(override || {}) };
    const status = record.status || 'reference';
    return `<button class="move-row technical" type="button" data-move-id="${m.name}"><span><b>${titleCase(m.name)}</b><em>${record.type ? titleCase(record.type) : 'TYPE —'} · ${record.damage_class ? titleCase(record.damage_class) : 'CATEGORY —'} · ${record.power ?? '—'} POWER</em><small>${escapeHtml(record.summary || record.short_effect || record.description)}</small></span><span>${m.method.replace('-', ' ')}${m.level ? ` · LV ${m.level}` : ''}${statusBadge(status)}</span></button>`;
  }).join('');
}

function switchDetailTab(tab) {
  document.querySelectorAll('.detail-tab').forEach(button => { const active = button.dataset.tab === tab; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
  document.querySelectorAll('.tab-panel').forEach(panel => panel.hidden = panel.dataset.panel !== tab);
}

function closeDetail(options = {}) {
  els.panel.classList.remove('open');
  els.panel.setAttribute('aria-hidden', 'true');
  els.scrim.hidden = true;
  document.body.classList.remove('panel-open');
  syncScrollLock();
  state.detail = null;
  if (options.syncHistory !== false) {
    const link = new URL(window.location.href);
    link.searchParams.delete('pokemon');
    history.replaceState({ view: state.view }, '', link);
  }
  if (detailReturnFocus instanceof HTMLElement) detailReturnFocus.focus({ preventScroll:true });
  detailReturnFocus = null;
}

function requestCloseDetail() {
  if (history.state?.overlay === 'detail') history.back();
  else closeDetail();
}

function renderCompareTray() {
  if (!els.compareTray) return;
  const visible = state.compare.length > 0 && state.view !== 'compare';
  els.compareTray.hidden = !visible;
  document.body.classList.toggle('compare-tray-open', visible);
  els.compareTrayTitle.textContent = state.compare.length === 1 ? '1 selected · choose an opponent' : `${state.compare.length}/2 selected`;
  els.compareTraySlots.innerHTML = state.compare.map(p => `<span class="compare-tray-chip"><img src="${spriteFor(p)}" alt=""><b>${escapeHtml(displayName(p))}</b><button type="button" data-remove-compare="${escapeHtml(keyOf(p))}" aria-label="Remove ${escapeHtml(displayName(p))} from comparison">×</button></span>`).join('');
  els.compareTrayOpen.disabled = state.compare.length !== 2;
  requestAnimationFrame(updateCompareTrayClearance);
}

async function toggleCompare(p) {
  const index = state.compare.findIndex(x => keyOf(x) === keyOf(p));
  if (index >= 0) state.compare.splice(index, 1);
  else {
    if (state.compare.length === 2) {
      showNotice('Comparison already has two Pokémon. Remove one before adding another.', 'warning');
      return;
    }
    state.compare.push(p);
    await fetchPokemon(p).catch(() => null);
  }
  document.querySelector('#compareCount').textContent = `${state.compare.length}/2`;
  renderCompareTray();
  renderDetailFromCache(p);
  if (index < 0 && state.compare.length === 2) {
    closeDetail();
    setView('compare');
  } else if (state.view === 'compare') {
    renderCompare();
  }
}

function compareStatsMarkup(data, compact = false) {
  const stats = defaultStatsFor(data);
  const total = defaultStatTotal(stats);
  return `${statRowsMarkup(stats, compact)}<div class="compare-bst"><span>DEFAULT CHAMPIONS TOTAL · 0 SP</span><b>${total}</b></div>`;
}

function compareAbilitiesMarkup(data) {
  return `<div class="compare-abilities">${data.abilityDetails.map(abilityCardMarkup).join('')}</div>`;
}

function compareMoveMarkup(p, data) {
  const moveQuery = state.compareMoveQuery.trim();
  if (!moveQuery) return '';
  const query = normalizeMove(moveQuery);
  const reference = data.moveReference || moveReferenceFor(p, data.pokemon);
  const matched = reference.moves.filter(move => normalizeMove(move.name).includes(query));
  const status = matched.length ? 'COMPATIBLE IN CURRENT REFERENCE' : 'NOT FOUND IN CURRENT REFERENCE';
  const matchedName = matched[0] ? normalizeMove(matched[0].name) : query;
  const moveMeta = CHAMPIONS_REFERENCE_MOVE_META?.[matchedName];
  return `<div class="compare-section-heading"><h3>Move compatibility</h3><span>${status}</span></div><div class="compare-move-compatibility ${matched.length ? 'yes' : 'no'}"><strong>${matched.length ? '✓' : '×'} ${titleCase(moveQuery)}</strong><span>${matched.length ? matched.map(move => titleCase(move.name)).join(', ') : `No matching entry for ${titleCase(moveQuery)}`}</span>${moveMeta?.summary ? `<p>${escapeHtml(moveMeta.summary)}</p>` : ''}<em>${reference.source === 'champions-verified' ? 'Champions-specific learnset' : 'Champions move · inferred species compatibility'}</em></div>`;
}

function selectOptions(values, selected) {
  return values.map(([value, label]) => `<option value="${value}" ${value === selected ? 'selected' : ''}>${label}</option>`).join('');
}

function damagePresetOptions(selected) {
  const options = Object.entries(ChampionsCalc.PRESETS).map(([value, preset]) => [value, preset.label]);
  options.push(['custom', 'Custom Stat Point spread']);
  return selectOptions(options, selected);
}

function stageOptions(selected) {
  return Array.from({ length: 13 }, (_, index) => index - 6).map(stage => `<option value="${stage}" ${Number(selected) === stage ? 'selected' : ''}>${stage > 0 ? '+' : ''}${stage}${stage === 0 ? ' (neutral)' : ''}</option>`).join('');
}

function customSpreadMarkup(side) {
  const config = state.damage[side === 'attacker' ? 'customAttacker' : 'customDefender'];
  const validation = ChampionsCalc.validateSpread(config.points);
  return `<details class="damage-custom-spread" ${state.damage[`${side}Preset`] === 'custom' ? 'open' : ''}>
    <summary>Custom ${side} Stat Points <em>${validation.total}/66</em></summary>
    <div class="damage-sp-grid">${statNames.map(name => `<label><span>${statLabel(name)}</span><input type="number" inputmode="numeric" min="0" max="32" value="${config.points[name] || 0}" data-sp-side="${side}" data-sp-stat="${name}"></label>`).join('')}</div>
    <div class="damage-alignment-grid"><label><span>INCREASED</span><select data-alignment-side="${side}" data-alignment-key="up">${selectOptions([["","None"], ...statNames.filter(name => name !== 'hp').map(name => [name, statLabel(name)])], config.up || '')}</select></label><label><span>DECREASED</span><select data-alignment-side="${side}" data-alignment-key="down">${selectOptions([["","None"], ...statNames.filter(name => name !== 'hp').map(name => [name, statLabel(name)])], config.down || '')}</select></label></div>
    <p class="damage-sp-status ${validation.valid ? '' : 'invalid'}">${validation.valid ? `${validation.remaining} Stat Points remaining` : `${validation.total - 66} points over the Champions limit`}</p>
  </details>`;
}

function damageCalculatorMarkup(selected, pair) {
  const attackerIndex = Math.min(1, state.damage.attackerIndex);
  const defenderIndex = attackerIndex === 0 ? 1 : 0;
  const attacker = selected[attackerIndex];
  const defender = selected[defenderIndex];
  const attackerData = pair[attackerIndex];
  const defenderData = pair[defenderIndex];
  const moveNames = [...new Set((attackerData.moveReference?.moves || []).map(move => normalizeMove(move.name)))].sort();
  if (!moveNames.includes(state.damage.move)) {
    const preferred = ['earthquake','thunderbolt','flamethrower','ice-beam','psychic','close-combat','water-pulse','aerial-ace','quick-attack','tackle'];
    state.damage.move = preferred.find(name => moveNames.includes(name)) || moveNames[0] || '';
  }
  const attackerAbilities = attackerData.abilityDetails.map(ability => ability.name);
  const defenderAbilities = defenderData.abilityDetails.map(ability => ability.name);
  if (!attackerAbilities.includes(state.damage.attackerAbility)) state.damage.attackerAbility = attackerAbilities[0] || '';
  if (!defenderAbilities.includes(state.damage.defenderAbility)) state.damage.defenderAbility = defenderAbilities[0] || '';
  const itemOptions = [['none','No held item'], ...CHAMPIONS_ITEMS.filter(item => ['life-orb','muscle-band','wise-glasses','expert-belt'].includes(item.id) || item.category === 'Type boost').map(item => [item.id, item.name])];
  const defenderItems = [['none','No held item'], ...CHAMPIONS_ITEMS.filter(item => item.id === 'focus-sash' || item.category === 'Resistance Berry').map(item => [item.id, item.name])];
  return `<article class="damage-calculator">
    <div class="compare-section-heading"><div><h3>Champions Damage Calculator</h3><p>Level 50 · exact community-tested 86–100 damage rolls</p></div><button id="swapDamageSides" type="button">SWAP ATTACKER ⇄</button></div>
    <div class="damage-versus"><div><img src="${spriteFor(attacker)}" alt=""><span><small>ATTACKER</small><b>${displayName(attacker)}</b></span></div><strong>VS</strong><div><img src="${spriteFor(defender)}" alt=""><span><small>DEFENDER</small><b>${displayName(defender)}</b></span></div></div>
    <div class="damage-primary-grid">
      <label><span>MOVE</span><select id="damageMoveSelect">${moveNames.map(name => `<option value="${name}" ${name === state.damage.move ? 'selected' : ''}>${titleCase(name)}</option>`).join('')}</select></label>
      <label><span>ATTACKER PRESET</span><select data-damage-key="attackerPreset">${damagePresetOptions(state.damage.attackerPreset)}</select></label>
      <label><span>DEFENDER PRESET</span><select data-damage-key="defenderPreset">${damagePresetOptions(state.damage.defenderPreset)}</select></label>
      <label><span>ATTACKER ABILITY</span><select data-damage-key="attackerAbility">${selectOptions(attackerAbilities.map(name => [name, titleCase(name)]), state.damage.attackerAbility)}</select></label>
      <label><span>DEFENDER ABILITY</span><select data-damage-key="defenderAbility">${selectOptions(defenderAbilities.map(name => [name, titleCase(name)]), state.damage.defenderAbility)}</select></label>
      <label><span>ATTACKER ITEM</span><select data-damage-key="attackerItem">${selectOptions(itemOptions, state.damage.attackerItem)}</select></label>
      <label><span>DEFENDER ITEM</span><select data-damage-key="defenderItem">${selectOptions(defenderItems, state.damage.defenderItem)}</select></label>
      <label><span>WEATHER</span><select data-damage-key="weather">${selectOptions([['none','None'],['sun','Sun'],['rain','Rain'],['sand','Sandstorm'],['snow','Snow']], state.damage.weather)}</select></label>
      <label><span>TERRAIN</span><select data-damage-key="terrain">${selectOptions([['none','None'],['electric','Electric Terrain'],['grassy','Grassy Terrain'],['psychic','Psychic Terrain'],['misty','Misty Terrain']], state.damage.terrain)}</select></label>
      <label><span>SCREEN</span><select data-damage-key="screen">${selectOptions([['none','None'],['reflect','Reflect'],['light-screen','Light Screen'],['aurora-veil','Aurora Veil']], state.damage.screen)}</select></label>
      <label><span>FORMAT</span><select data-damage-key="format">${selectOptions([['singles','Singles'],['doubles','Doubles']], state.damage.format)}</select></label>
      <label><span>ATTACKER STATUS</span><select data-damage-key="attackerStatus">${selectOptions([['none','None'],['burn','Burn'],['poison','Poison'],['paralysis','Paralysis']], state.damage.attackerStatus)}</select></label>
      <label><span>DEFENDER STATUS</span><select data-damage-key="defenderStatus">${selectOptions([['none','None'],['burn','Burn'],['poison','Poison'],['paralysis','Paralysis']], state.damage.defenderStatus)}</select></label>
      <label><span>ATTACKING STAT STAGE</span><select data-damage-key="attackerStage">${stageOptions(state.damage.attackerStage)}</select></label>
      <label><span>DEFENDING STAT STAGE</span><select data-damage-key="defenderStage">${stageOptions(state.damage.defenderStage)}</select></label>
    </div>
    <div class="damage-toggle-grid">
      ${[['critical','Critical hit'],['spread','Spread move'],['friendGuard','Friend Guard'],['contact','Contact move'],['attackerGrounded','Attacker grounded'],['defenderGrounded','Defender grounded'],['defenderFullHp','Defender at full HP']].map(([key,label]) => `<label><input type="checkbox" data-damage-key="${key}" ${state.damage[key] ? 'checked' : ''}><span>${label}</span></label>`).join('')}
    </div>
    <div class="damage-context-links"><b>EXACT TERMINOLOGY</b>${['stat-stages','sun','rain','sand','snow','electric-terrain','grassy-terrain','psychic-terrain','misty-terrain','reflect','light-screen','aurora-veil','critical','spread','contact','grounded','full-hp'].map(id => termButton(id)).join(' ')}</div>
    <div class="damage-custom-columns">${customSpreadMarkup('attacker')}${customSpreadMarkup('defender')}</div>
    <div class="damage-result" id="damageResult"><div class="compare-loading">CALCULATING MOVE DATA…</div></div>
    <p class="data-note"><b>DATA STATUS</b> Stat formula and 66/32 limits are Champions-specific. A move or Ability marked unmodeled is never silently treated as having a modifier. Current move learnsets and standard type/item effects remain clearly identified as reference data where Champions confirmation is unavailable.</p>
  </article>`;
}

function damageOptionsFor(selected, pair, attackerConfig, defenderConfig, move = null) {
  const attackerIndex = Math.min(1, state.damage.attackerIndex);
  const defenderIndex = attackerIndex === 0 ? 1 : 0;
  const attackerData = pair[attackerIndex];
  const defenderData = pair[defenderIndex];
  return {
    attackerBase: baseStatsFor(attackerData),
    defenderBase: baseStatsFor(defenderData),
    attackerConfig,
    defenderConfig,
    attackerTypes: attackerData.pokemon.types.map(item => item.type.name),
    defenderTypes: defenderData.pokemon.types.map(item => item.type.name),
    attackerAbility: state.damage.attackerAbility,
    defenderAbility: state.damage.defenderAbility,
    attackerItem: (() => { const item = ChampionsKnowledge.item(state.damage.attackerItem); return item?.category === 'Type boost' ? (normalizeMove(item.appliesTo).startsWith(normalizeMove(move?.type)) ? 'type-boost' : 'none') : state.damage.attackerItem; })(),
    defenderItem: (() => { const item = ChampionsKnowledge.item(state.damage.defenderItem); return item?.category === 'Resistance Berry' ? (normalizeMove(item.appliesTo).startsWith(normalizeMove(move?.type)) ? 'resist-berry' : 'none') : state.damage.defenderItem; })(),
    weather: state.damage.weather,
    terrain: state.damage.terrain,
    screen: state.damage.screen,
    format: state.damage.format,
    attackerStatus: state.damage.attackerStatus,
    defenderStatus: state.damage.defenderStatus,
    attackerStage: Number(state.damage.attackerStage),
    defenderStage: Number(state.damage.defenderStage),
    critical: state.damage.critical,
    spread: state.damage.spread,
    friendGuard: state.damage.friendGuard,
    contact: state.damage.contact,
    attackerGrounded: state.damage.attackerGrounded,
    defenderGrounded: state.damage.defenderGrounded,
    defenderFullHp: state.damage.defenderFullHp
  };
}

function damageResultMarkup(result, label = '') {
  if (!result?.available) return `<div class="damage-unavailable"><b>Damage unavailable</b><p>${escapeHtml(result?.reason || 'Move metadata is not loaded.')}</p></div>`;
  if (result.immune) return `<div class="damage-number immune"><span>${label}</span><b>0 HP</b><strong>IMMUNE</strong></div>`;
  const barMin = Math.max(0, Math.min(100, result.percentMin));
  const barMax = Math.max(barMin, Math.min(100, result.percentMax));
  return `<div class="damage-number"><span>${label}</span><b>${result.min}–${result.max} HP</b><strong>${result.percentMin.toFixed(1)}–${result.percentMax.toFixed(1)}%</strong><span class="damage-hp-bar" role="img" aria-label="Damage covers ${result.percentMin.toFixed(1)} to ${result.percentMax.toFixed(1)} percent of the defender HP"><i style="width:${barMax}%"></i><b style="width:${barMin}%"></b></span><em>${result.ko}</em></div>`;
}

async function updateDamageResult(selected, pair) {
  const target = document.querySelector('#damageResult');
  if (!target || !state.damage.move) return;
  const attackerIndex = Math.min(1, state.damage.attackerIndex);
  const defenderIndex = attackerIndex === 0 ? 1 : 0;
  if ((pair[attackerIndex].fallback && !pair[attackerIndex].championsOverride) || (pair[defenderIndex].fallback && !pair[defenderIndex].championsOverride)) {
    target.innerHTML = '<div class="damage-unavailable"><b>Form stats unavailable</b><p>This comparison contains a Mega form whose Champions stats are not loaded. Damage is withheld instead of using the base form incorrectly.</p></div>';
    return;
  }
  const attackerValidation = ChampionsCalc.validateSpread(configForDamageSide('attacker').points);
  const defenderValidation = ChampionsCalc.validateSpread(configForDamageSide('defender').points);
  if (!attackerValidation.valid || !defenderValidation.valid) {
    target.innerHTML = '<div class="damage-unavailable"><b>Invalid Stat Point spread</b><p>Each side must use no more than 66 total points and 32 points in one stat.</p></div>';
    return;
  }
  await getMoveDetails([state.damage.move]);
  if (!document.querySelector('#damageResult')) return;
  const meta = state.moveMeta.get(state.damage.move);
  if (!meta) {
    target.innerHTML = '<div class="damage-unavailable"><b>Move metadata unavailable</b><p>Reconnect to load this move, or choose another cached move.</p></div>';
    return;
  }
  const exactMeta = { ...meta, ...(ChampionsKnowledge.move(state.damage.move) || {}) };
  if (typeof exactMeta.spread === 'boolean') state.damage.spread = exactMeta.spread;
  else if (/all-opponents|all-other/.test(exactMeta.target || '')) state.damage.spread = true;
  if (typeof exactMeta.contact === 'boolean') state.damage.contact = exactMeta.contact;
  const spreadControl = document.querySelector('[data-damage-key="spread"]');
  const contactControl = document.querySelector('[data-damage-key="contact"]');
  if (spreadControl) spreadControl.checked = state.damage.spread;
  if (contactControl) contactControl.checked = state.damage.contact;
  const currentOptions = damageOptionsFor(selected, pair, configForDamageSide('attacker'), configForDamageSide('defender'), exactMeta);
  const current = ChampionsCalc.calculateDamage({ ...currentOptions, move: exactMeta });
  const selectedAttackItem = ChampionsKnowledge.item(state.damage.attackerItem);
  const selectedDefenseItem = ChampionsKnowledge.item(state.damage.defenderItem);
  if (selectedAttackItem?.category === 'Type boost' && currentOptions.attackerItem === 'none') current.notes.push(`${selectedAttackItem.name} does not boost ${titleCase(exactMeta.type)}-type moves.`);
  if (selectedDefenseItem?.category === 'Resistance Berry' && currentOptions.defenderItem === 'none') current.notes.push(`${selectedDefenseItem.name} does not reduce ${titleCase(exactMeta.type)}-type damage.`);
  const categoryPreset = exactMeta.damage_class === 'physical' ? 'strong-physical' : 'strong-special';
  const scenarios = [
    ['Basic · 0 SP vs 0 SP', ChampionsCalc.PRESETS.base, ChampionsCalc.PRESETS.base],
    ['Maximum offense vs basic', ChampionsCalc.PRESETS[categoryPreset], ChampionsCalc.PRESETS.base],
    ['Basic vs physical bulk', ChampionsCalc.PRESETS.base, ChampionsCalc.PRESETS['physical-bulk']],
    ['Basic vs special bulk', ChampionsCalc.PRESETS.base, ChampionsCalc.PRESETS['special-bulk']],
    ['Selected presets', configForDamageSide('attacker'), configForDamageSide('defender')]
  ];
  const rows = scenarios.map(([label, attackerConfig, defenderConfig]) => {
    const result = ChampionsCalc.calculateDamage({ ...damageOptionsFor(selected, pair, attackerConfig, defenderConfig, exactMeta), move: exactMeta });
    return `<tr><th>${label}</th><td>${result.available ? `${result.min}–${result.max} HP` : 'Unavailable'}</td><td>${result.available ? `${result.percentMin.toFixed(1)}–${result.percentMax.toFixed(1)}%` : escapeHtml(result.reason)}</td><td>${result.ko || '—'}</td></tr>`;
  }).join('');
  const attackerStats = current.attackerStats || ChampionsCalc.calculateStats(currentOptions.attackerBase, currentOptions.attackerConfig).stats;
  const defenderStats = current.defenderStats || ChampionsCalc.calculateStats(currentOptions.defenderBase, currentOptions.defenderConfig).stats;
  const attackerAbilityRecord = completeAbilityRecord(state.damage.attackerAbility);
  const defenderAbilityRecord = completeAbilityRecord(state.damage.defenderAbility);
  target.innerHTML = `<div class="damage-result-head">${damageResultMarkup(current, titleCase(state.damage.move))}<div class="damage-move-facts"><span><b>${exactMeta.power ?? '—'}</b>POWER</span><span><b>${titleCase(exactMeta.type || 'unknown')}</b>TYPE</span><span><b>${titleCase(exactMeta.damage_class || 'unknown')}</b>CATEGORY</span><span><b>${current.effectiveness ?? '—'}×</b>EFFECTIVE</span><span><b>${state.damage.spread ? 'YES' : 'NO'}</b>SPREAD · AUTO</span><span><b>${state.damage.contact ? 'YES' : 'NO'}</b>CONTACT · AUTO</span></div></div>
    <div class="damage-move-description"><b>${titleCase(state.damage.move)} effect</b><p>${escapeHtml(exactMeta.summary || exactMeta.short_effect || exactMeta.description)}</p>${sourceMarkup(exactMeta)}</div>
    <div class="damage-ability-context">${attackerAbilityRecord ? `<button type="button" data-ability-id="${escapeHtml(state.damage.attackerAbility)}"><b>ATTACKER · ${escapeHtml(attackerAbilityRecord.name)}</b><span>${escapeHtml(attackerAbilityRecord.summary)}</span></button>` : ''}${defenderAbilityRecord ? `<button type="button" data-ability-id="${escapeHtml(state.damage.defenderAbility)}"><b>DEFENDER · ${escapeHtml(defenderAbilityRecord.name)}</b><span>${escapeHtml(defenderAbilityRecord.summary)}</span></button>` : ''}</div>
    <div class="damage-stat-context"><span>Attacking ${statLabel(current.attackStat || (exactMeta.damage_class === 'physical' ? 'attack' : 'special-attack'))}: <b>${attackerStats[current.attackStat || (exactMeta.damage_class === 'physical' ? 'attack' : 'special-attack')]}</b></span><span>Defending ${statLabel(current.defenseStat || (exactMeta.damage_class === 'physical' ? 'defense' : 'special-defense'))}: <b>${defenderStats[current.defenseStat || (exactMeta.damage_class === 'physical' ? 'defense' : 'special-defense')]}</b></span><span>Defender HP: <b>${defenderStats.hp}</b></span></div>
    ${current.rolls?.length ? `<div class="damage-rolls"><b>Possible HP rolls</b><span>${[...new Set(current.rolls)].join(', ')}</span>${current.rollProbabilities ? `<em>${current.rollProbabilities.map(row => `${row.damage} HP: ${row.chance}%`).join(' · ')}</em>` : ''}</div>` : ''}
    ${current.breakdown?.length ? `<details class="damage-breakdown"><summary>Show calculation breakdown</summary><ol>${current.breakdown.map(step => `<li><b>${escapeHtml(step.label)}</b><span>${escapeHtml(step.value)}</span></li>`).join('')}</ol></details>` : ''}
    ${current.notes?.length ? `<div class="damage-warnings">${current.notes.map(note => `<p>${escapeHtml(note)}</p>`).join('')}</div>` : ''}
    <div class="damage-scenario-table"><table><thead><tr><th>Universal SP scenario</th><th>Damage</th><th>HP percent</th><th>Outcome</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function bindDamageCalculator(selected, pair) {
  document.querySelector('#swapDamageSides')?.addEventListener('click', () => {
    state.damage.attackerIndex = state.damage.attackerIndex === 0 ? 1 : 0;
    state.damage.move = '';
    state.damage.attackerAbility = '';
    state.damage.defenderAbility = '';
    renderCompare();
  });
  document.querySelector('#damageMoveSelect')?.addEventListener('change', event => { state.damage.move = event.target.value; updateDamageResult(selected, pair); });
  document.querySelectorAll('[data-damage-key]').forEach(control => control.addEventListener('change', event => {
    state.damage[control.dataset.damageKey] = control.type === 'checkbox' ? control.checked : control.value;
    if (['attackerPreset','defenderPreset'].includes(control.dataset.damageKey)) renderCompare();
    else updateDamageResult(selected, pair);
  }));
  document.querySelectorAll('[data-sp-side]').forEach(input => input.addEventListener('change', event => {
    const side = input.dataset.spSide;
    const config = state.damage[side === 'attacker' ? 'customAttacker' : 'customDefender'];
    config.points[input.dataset.spStat] = Math.max(0, Math.min(32, Number(event.target.value) || 0));
    state.damage[`${side}Preset`] = 'custom';
    renderCompare();
  }));
  document.querySelectorAll('[data-alignment-side]').forEach(select => select.addEventListener('change', () => {
    const side = select.dataset.alignmentSide;
    const config = state.damage[side === 'attacker' ? 'customAttacker' : 'customDefender'];
    config[select.dataset.alignmentKey] = select.value || null;
    state.damage[`${side}Preset`] = 'custom';
    renderCompare();
  }));
  updateDamageResult(selected, pair);
}

let compareRenderToken = 0;
async function renderCompare() {
  const renderToken = ++compareRenderToken;
  els.compareBoard.innerHTML = '';
  const selected = [...state.compare];
  const selectionSignature = selected.map(keyOf).join('|');
  els.compareEmpty.hidden = selected.length === 2;
  if (selected.length < 2) {
    els.compareEmpty.innerHTML = selected.length === 0
      ? '<span>⇄</span><h2>Pick two contenders</h2><p>Open any Pokémon and choose “Compare” to line up default Champions stats and calculate move damage.</p><button class="empty-action" type="button" data-choose-opponent>CHOOSE FIRST POKÉMON</button>'
      : `<span>1/2</span><h2>Choose an opponent</h2><p>${escapeHtml(displayName(selected[0]))} is ready. Add one more Pokémon to unlock the complete comparison and damage calculator.</p><div class="empty-actions"><button class="empty-action" type="button" data-choose-opponent>CHOOSE OPPONENT</button><button class="empty-action secondary" type="button" data-remove-only-compare>REMOVE ${escapeHtml(displayName(selected[0]))}</button></div>`;
    els.compareEmpty.querySelector('[data-choose-opponent]')?.addEventListener('click', () => { setView('roster'); requestAnimationFrame(() => els.search.focus()); });
    els.compareEmpty.querySelector('[data-remove-only-compare]')?.addEventListener('click', () => toggleCompare(selected[0]));
  }
  if (selected.length) {
    els.compareBoard.insertAdjacentHTML('beforeend', `<div class="compare-tools"><label><span>CHECK MOVE COMPATIBILITY</span><input id="compareMoveInput" list="moveOptions" type="search" value="${escapeHtml(state.compareMoveQuery)}" placeholder="Protect, Thunderbolt, Psycho Cut…"></label><button id="applyCompareMove" type="button">${state.compareMoveQuery ? 'UPDATE MOVE' : 'CHECK MOVE'}</button>${state.compareMoveQuery ? '<button id="clearCompareMove" class="secondary" type="button">CLEAR</button>' : ''}<button id="copyCompareSummary" class="secondary" type="button">COPY SUMMARY</button></div>`);
    document.querySelector('#applyCompareMove')?.addEventListener('click', () => { state.compareMoveQuery = document.querySelector('#compareMoveInput')?.value.trim() || ''; renderCompare(); });
    document.querySelector('#compareMoveInput')?.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); state.compareMoveQuery = event.currentTarget.value.trim(); renderCompare(); } });
    document.querySelector('#clearCompareMove')?.addEventListener('click', () => { state.compareMoveQuery = ''; renderCompare(); });
    document.querySelector('#copyCompareSummary')?.addEventListener('click', async () => {
      try {
        const pair = await Promise.all(selected.map(entry => fetchPokemon(entry).catch(() => null)));
        const lines = selected.map((entry, index) => {
          const data = pair[index];
          if (!data) return `${displayName(entry)} · data unavailable`;
          const stats = defaultStatsFor(data);
          return `${displayName(entry)} · ${data.pokemon.types.map(item => titleCase(item.type.name)).join('/')} · HP ${stats.hp} Atk ${stats.attack} Def ${stats.defense} SpA ${stats['special-attack']} SpD ${stats['special-defense']} Spe ${stats.speed} · Total ${defaultStatTotal(stats)}`;
        });
        const text = `Champions Dex comparison (Level 50, 0 SP, neutral)\n${lines.join('\n')}${state.compareMoveQuery ? `\nMove check: ${state.compareMoveQuery}` : ''}`;
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        showNotice('Comparison summary copied.');
      } catch { showNotice('Copy failed. Clipboard access is unavailable on this device.', 'warning'); }
    });
  }
  if (selected.length === 2) {
    const pair = await Promise.all(selected.map(p => fetchPokemon(p).catch(() => null)));
    if (renderToken !== compareRenderToken || selectionSignature !== state.compare.map(keyOf).join('|')) return;
    if (pair.every(Boolean) && state.view === 'compare') {
      const [left, right] = pair;
      const leftStats = defaultStatsFor(left);
      const rightStats = defaultStatsFor(right);
      const leftSpeed = leftStats.speed;
      const rightSpeed = rightStats.speed;
      const sharedTypes = left.pokemon.types.map(item => item.type.name).filter(type => right.pokemon.types.some(other => other.type.name === type));
      const stronger = ['hp','attack','defense','special-attack','special-defense','speed'].map(stat => {
        const a = leftStats[stat];
        const b = rightStats[stat];
        return a === b ? null : `${statLabel(stat)}: ${a > b ? displayName(selected[0]) : displayName(selected[1])}`;
      }).filter(Boolean);
      els.compareBoard.append(Object.assign(document.createElement('article'), { className: 'compare-overview', innerHTML: `<div class="compare-section-heading"><h3>Default Champions comparison</h3><span>LEVEL 50 · 0 SP · NEUTRAL</span></div><div class="matchup-grid"><div><b>${displayName(selected[0])}</b><span>${leftSpeed} Speed</span></div><div><b>${leftSpeed === rightSpeed ? 'Speed tie' : leftSpeed > rightSpeed ? `${displayName(selected[0])} is faster` : `${displayName(selected[1])} is faster`}</b><span>${rightSpeed} Speed</span></div><div><b>${sharedTypes.length ? sharedTypes.map(titleCase).join(' / ') : 'No shared type'}</b><span>Shared typing</span></div></div><p class="data-note"><b>CHAMPIONS FORMULA</b> This comparison uses the original in-game Level 50 values before either player assigns Stat Points.</p><div class="matchup-winners">${stronger.map(item => `<span>${item}</span>`).join('')}</div>` }));
      els.compareBoard.insertAdjacentHTML('beforeend', damageCalculatorMarkup(selected, pair));
      bindDamageCalculator(selected, pair);
    }
  }
  selected.forEach(async p => {
    const article = document.createElement('article');
    article.className = 'compare-card';
    article.innerHTML = `<div class="compare-loading">SYNCING ${displayName(p).toUpperCase()}…</div>`;
    els.compareBoard.append(article);
    try {
      const data = await fetchPokemon(p);
      const relatedMegas = megaFormsFor(p).filter(form => p.group !== 'mega' || keyOf(form) !== keyOf(p));
      const megaRecords = await Promise.all(relatedMegas.map(async form => ({ form, data: await fetchPokemon(form).catch(() => null) })));
      if (renderToken !== compareRenderToken || selectionSignature !== state.compare.map(keyOf).join('|') || state.view !== 'compare' || !state.compare.some(item => keyOf(item) === keyOf(p))) return;
      const megaSection = megaRecords.length ? `
        <div class="compare-section-heading"><h3>${p.group === 'mega' ? 'Related Mega Forms' : 'Mega Evolutions'}</h3><span>${megaRecords.length}</span></div>
        <div class="compare-mega-list">${megaRecords.map(({form, data:megaData}) => megaData ? `
          <section class="compare-mega-card">
            <header><img src="${detailImage(form, megaData)}" alt="${displayName(form)}"><div><span>✦ MEGA FORM</span><h4>${displayName(form)}</h4><div class="type-row">${megaData.pokemon.types.map(item => `<span class="type-pill" data-type="${item.type.name}">${item.type.name}</span>`).join('')}</div></div></header>
            ${compareStatsMarkup(megaData, true)}
            <div class="compare-mini-label">ABILITIES</div>
            ${compareAbilitiesMarkup(megaData)}
            ${compareMoveMarkup(form, megaData)}
            ${megaData.championsOverride ? '<p class="compare-reference-note">Champions-specific stats, typing, Ability, and dedicated Mega artwork. The move pool is inherited from the normal form and carries its own provenance label.</p>' : megaData.fallback ? '<p class="compare-reference-note">Base-form reference data shown; canonical Champions Mega stats are pending.</p>' : ''}
          </section>` : `<section class="compare-mega-card"><p>Form data unavailable.</p></section>`).join('')}</div>` : `
        <div class="compare-section-heading"><h3>Mega Evolution</h3><span>0</span></div>
        <div class="compare-no-mega">No Mega Evolution available in Regulation M–C.</div>`;

      article.innerHTML = `
        <div class="compare-identity">
          <img class="compare-main-art" src="${detailImage(p, data)}" alt="${displayName(p)}">
          <span>#${pad(p.dex || p.id)} · ${p.group === 'mega' ? 'MEGA FORM' : 'M–C ELIGIBLE'}</span>
          <h2>${displayName(p)}</h2>
          <div class="type-row">${data.pokemon.types.map(item => `<span class="type-pill" data-type="${item.type.name}">${item.type.name}</span>`).join('')}</div>
        </div>
        <div class="compare-section-heading"><h3>Default Champions Stats</h3><span>0 SP · NEUTRAL</span></div>
        ${compareStatsMarkup(data)}
        <div class="compare-section-heading"><h3>Abilities</h3><span>${data.abilityDetails.length}</span></div>
        ${compareAbilitiesMarkup(data)}
        ${compareMoveMarkup(p, data)}
        ${megaSection}`;
    } catch {
      article.innerHTML = `<div class="compare-loading"><strong>${displayName(p)}</strong><p>Battle data could not be loaded.</p></div>`;
    }
  });
}

function statMapFrom(pokemon) {
  return Object.fromEntries((pokemon.stats || []).map(item => [item.stat.name, item.base_stat]));
}

async function fetchHeatmapRecord(p) {
  const championsMega = typeof CHAMPIONS_MEGA_DATA !== 'undefined' ? CHAMPIONS_MEGA_DATA[p.name] : null;
  if (championsMega) {
    return { p, stats: championsMega.stats, abilities: championsMega.abilities.map(item => item.name), types: championsMega.types, source: 'champions-specific form data', uncertain: false };
  }
  let pokemon = typeof CHAMPIONS_REFERENCE_POKEMON !== 'undefined' ? CHAMPIONS_REFERENCE_POKEMON[keyOf(p)] : null;
  if (!pokemon) {
    const response = await fetch(`${API}/pokemon/${p.apiName || p.id}`).catch(() => null);
    if (!response?.ok) return { p, stats: null, abilities: [], types: p.types, source: 'unavailable', uncertain: true };
    pokemon = await response.json();
  }
  const stats = statMapFrom(pokemon);
  const abilities = (pokemon.abilities || []).map(item => item.ability?.name).filter(Boolean);
  return { p, stats, abilities, types: pokemon.types?.map(item => item.type.name) || p.types, source: 'bundled specialist-reference data', uncertain: true };
}

function heatmapValue(record) {
  if (!record?.stats) return null;
  const calculated = ChampionsCalc.calculateStats(record.stats, ChampionsCalc.PRESETS.base).stats;
  if (state.heatmapStat === 'bst') return defaultStatTotal(calculated);
  return Number(calculated[state.heatmapStat]);
}

function heatmapMoveMatch(record) {
  if (!state.heatmapMove.trim()) return true;
  const query = normalizeMove(state.heatmapMove);
  const entry = state.moveIndex.get(keyOf(record.p));
  return Boolean(entry && Object.keys(entry.moves || {}).some(name => name.includes(query)));
}

function heatmapFilteredRecords() {
  const ability = normalizeMove(state.heatmapAbility);
  const min = state.heatmapMin === '' ? null : Number(state.heatmapMin);
  const max = state.heatmapMax === '' ? null : Number(state.heatmapMax);
  const records = [...state.heatmapRecords.values()].filter(record => {
    const value = heatmapValue(record);
    if (value === null || Number.isNaN(value)) return false;
    if (state.heatmapType !== 'all' && !record.types.includes(state.heatmapType)) return false;
    if (state.heatmapForm === 'mega' && record.p.group !== 'mega') return false;
    if (state.heatmapForm === 'normal' && record.p.group === 'mega') return false;
    if (ability && !record.abilities.some(name => normalizeMove(name).includes(ability))) return false;
    if (!heatmapMoveMatch(record)) return false;
    if (min !== null && value < min) return false;
    if (max !== null && value > max) return false;
    return true;
  });
  const highestFirst = records.sort((a, b) => heatmapValue(b) - heatmapValue(a));
  const selected = state.heatmapTopOnly ? highestFirst.slice(0, 10) : highestFirst;
  return state.heatmapSort === 'desc' ? selected : selected.reverse();
}

function renderHeatmap() {
  if (!els.heatmapGrid) return;
  const records = heatmapFilteredRecords();
  const allValues = [...state.heatmapRecords.values()].map(heatmapValue).filter(value => Number.isFinite(value));
  const min = Math.min(...allValues, 0);
  const max = Math.max(...allValues, 1);
  const label = state.heatmapStat === 'bst' ? 'Default Champions Stat Total' : titleCase(state.heatmapStat);
  const unavailableCount = state.heatmapRecords.size - allValues.length;
  els.heatmapStatus.textContent = `${state.heatmapRecords.size}/${roster.length + megaRoster.length} entries loaded · ${records.length} shown${unavailableCount ? ` · ${unavailableCount} unavailable stat record${unavailableCount === 1 ? '' : 's'} omitted` : ''} · ${label} · Level 50 / 0 SP / neutral${state.heatmapMove ? ` · move: ${state.heatmapMove}` : ''}${state.heatmapError ? ` · Loading paused: ${state.heatmapError}` : ''}`;
  if (!records.length) {
    els.heatmapGrid.innerHTML = state.heatmapError
      ? `<div class="heatmap-empty"><b>Stat data could not finish loading</b><p>${escapeHtml(state.heatmapError)}</p><button class="empty-action" type="button" data-retry-heatmap>RETRY</button></div>`
      : '<div class="heatmap-empty"><b>No loaded entries match these filters</b><p>Try clearing the type, Ability, move, or stat-range filters.</p></div>';
    els.heatmapGrid.querySelector('[data-retry-heatmap]')?.addEventListener('click', loadHeatmap);
    return;
  }
  els.heatmapGrid.innerHTML = records.map(record => {
    const value = heatmapValue(record);
    const intensity = Math.round(((value - min) / Math.max(1, max - min)) * 100);
    const source = record.uncertain ? 'UNVERIFIED REFERENCE' : 'CHAMPIONS DATA';
    const percentile = allValues.length ? Math.round(allValues.filter(item => item <= value).length / allValues.length * 100) : 0;
    return `<button class="heatmap-cell ${record.p.group === 'mega' ? 'mega' : ''}" type="button" style="--heat:${intensity}%" data-record-key="${keyOf(record.p)}">
      <span class="heatmap-cell-top"><small>#${pad(record.p.dex || record.p.id)}</small><strong>${value}</strong></span>
      <img src="${spriteFor(record.p)}" alt="${displayName(record.p)}" loading="lazy">
      <b>${displayName(record.p)}</b>
      <span class="type-row">${record.types.map(type => `<i class="type-pill" data-type="${type}">${type}</i>`).join('')}</span>
      <small class="heatmap-percentile">${ChampionsKnowledge.ordinal(percentile)} percentile</small>
      <em>${record.p.group === 'mega' ? '✦ MEGA · ' : ''}${source}</em>
    </button>`;
  }).join('');
  els.heatmapGrid.querySelectorAll('.heatmap-cell').forEach(button => button.addEventListener('click', () => {
    const record = state.heatmapRecords.get(button.dataset.recordKey);
    if (record) openDetail(record.p);
  }));
}

async function loadHeatmap() {
  if (state.heatmapLoading || state.heatmapRecords.size === roster.length + megaRoster.length) return;
  state.heatmapLoading = true;
  state.heatmapError = '';
  const queue = [...roster, ...megaRoster];
  let completed = 0;
  const worker = async () => {
    while (queue.length) {
      const p = queue.shift();
      const record = await fetchHeatmapRecord(p);
      state.heatmapRecords.set(keyOf(p), record);
      completed += 1;
      if (completed % 24 === 0) renderHeatmap();
    }
  };
  try {
    await Promise.all(Array.from({ length: 8 }, worker));
  } catch (error) {
    state.heatmapError = error.message || 'Some stat data is unavailable. Retry while online.';
  } finally {
    state.heatmapLoading = false;
    renderHeatmap();
  }
}

function dataQualityCounts() {
  const records = [
    ...ChampionsKnowledge.allTerms(),
    ...CHAMPIONS_ITEMS,
    ...Object.values(typeof CHAMPIONS_REFERENCE_ABILITY_META !== 'undefined' ? CHAMPIONS_REFERENCE_ABILITY_META : {}),
    ...Object.values(typeof CHAMPIONS_REFERENCE_MOVE_META !== 'undefined' ? CHAMPIONS_REFERENCE_MOVE_META : {}),
    ...Object.values(typeof CHAMPIONS_MEGA_DATA !== 'undefined' ? CHAMPIONS_MEGA_DATA : {})
  ];
  const confirmed = records.filter(record => ['official', 'tested'].includes(record.status)).length;
  const unverified = records.filter(record => ['reference', 'inferred'].includes(record.status)).length + roster.length + megaRoster.length;
  const specialist = records.filter(record => record.status === 'specialist').length;
  const issues = ChampionsKnowledge.validate();
  return { confirmed, unverified, specialist, unavailable: issues.length, total: records.length, issues };
}

async function renderMoveExplorerLegacy(query = state.moveExplorerQuery) {
  if (!els.moveExplorerResult) return;
  state.moveExplorerQuery = query.trim();
  if (!state.moveExplorerQuery) {
    els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>Choose a move</b><p>Search by name or partial name to open its details.</p></div>';
    return;
  }
  const moveLink = new URL(window.location.href);
  moveLink.searchParams.set('view', 'moves');
  moveLink.searchParams.set('move', state.moveExplorerQuery);
  history.replaceState({}, '', moveLink);
  els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>Indexing move references…</b><p>Previously loaded data will be reused from this device.</p></div>';
  try {
    await ensureMoveIndex();
    const normalized = normalizeMove(state.moveExplorerQuery);
    const matches = [...state.moveCatalog].filter(name => name.includes(normalized)).slice(0, 20);
    await getMoveDetails(matches);
    const exact = matches.find(name => name === normalized) || matches[0];
    if (!exact) {
      els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>No move found</b><p>Try a partial name or check the data status.</p></div>';
      return;
    }
    const meta = state.moveMeta.get(exact) || {};
    const compatible = [...state.moveIndex.entries()].filter(([, entry]) => entry.moves?.[exact]).map(([key, entry]) => ({ p: teamMember(key), entry })).filter(item => item.p);
    els.moveExplorerResult.innerHTML = `<article class="move-detail-card"><div class="move-detail-head"><div><span class="eyebrow">MOVE RECORD · ${meta.type ? titleCase(meta.type) : 'TYPE UNAVAILABLE'}</span><h2>${titleCase(exact)}</h2><p>${escapeHtml(meta.short_effect || 'Effect description unavailable from the current source.')}</p></div><div class="move-stat-grid"><span><b>${meta.power ?? '—'}</b>POWER</span><span><b>${meta.accuracy ?? '—'}</b>ACC</span><span><b>${meta.priority ?? '—'}</b>PRIORITY</span><span><b>${meta.damage_class ? titleCase(meta.damage_class) : '—'}</b>CATEGORY</span></div></div><p class="data-note"><b>${compatible.some(item => item.entry.source === 'champions-verified') ? 'CHAMPIONS-SPECIFIC DATA' : 'UNVERIFIED REFERENCE'}</b> ${compatible.length} compatible app entries found. Confirm availability and effects in Champions when the source is not explicitly verified.</p><div class="section-heading"><h3>Compatible roster entries</h3><span>${compatible.length}</span></div><div class="move-compatible-grid">${compatible.map(({p, entry}) => `<button class="move-compatible-item" type="button" data-move-pokemon="${keyOf(p)}"><img src="${spriteFor(p)}" alt=""><span><b>${displayName(p)}</b><em>${p.group === 'mega' ? 'MEGA · ' : ''}${entry.source === 'champions-verified' ? 'CHAMPIONS CONFIRMED' : 'UNVERIFIED REFERENCE'}</em></span></button>`).join('') || '<div class="workspace-empty"><b>No compatible entries</b><p>This move is not present in the currently indexed reference data.</p></div>'}</div></article>`;
    els.moveCompatibleGrid = els.moveExplorerResult.querySelector('.move-compatible-grid');
    els.moveExplorerResult.querySelectorAll('[data-move-pokemon]').forEach(button => button.addEventListener('click', () => openDetail(teamMember(button.dataset.movePokemon))));
    document.querySelector('#moveCount').textContent = state.moveCatalog.size;
  } catch {
    els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>Move data unavailable</b><p>Reconnect and try again. Cached data will be used when available.</p></div>';
  }
}

function renderDataCenterLegacy() {
  const counts = dataQualityCounts();
  if (els.dataHealth) els.dataHealth.innerHTML = `<article><b>${counts.confirmed}</b><span>Champions-confirmed records</span><em>Explicit overrides and verified mechanics</em></article><article><b>${counts.unverified}</b><span>Unverified references</span><em>Canonical or standard-chart research aids</em></article><article><b>${counts.unavailable}</b><span>Unavailable learnset records</span><em>Not placed as confirmed data</em></article><article><b>${state.watchlist.size}</b><span>Saved local items</span><em>Watchlist, notes, and team draft</em></article>`;
  if (els.dataChangelog) els.dataChangelog.innerHTML = '<div class="changelog-entry"><b>v1.0.9</b><span>Replaced primary base-stat displays with default Champions stats and added the two-Pokémon damage calculator, SP presets, custom spreads, and battle conditions.</span></div><div class="changelog-entry"><b>v1.0.8</b><span>Added team stat, Ability, and indexed move coverage analytics.</span></div><div class="changelog-entry"><b>v1.0.7</b><span>Added Team Builder, Move Explorer, Data Quality Center, notes, deep links, and analytics controls.</span></div><div class="changelog-entry"><b>v1.0.6</b><span>Release workflow now publishes signed APKs to GitHub Releases.</span></div><div class="changelog-entry"><b>Current</b><span>Data cache uses network-first updates with offline fallback.</span></div>';
}

function setViewLegacy(view) {
  const crossesMechanicsBoundary = (state.view === 'mechanics') !== (view === 'mechanics');
  if (crossesMechanicsBoundary) {
    state.search = '';
    els.search.value = '';
    state.abilityMatches = new Set();
    state.abilityMatchLabels = new Map();
    state.abilitySearchPending = false;
    state.moveSearchPending = false;
    state.moveMatches = new Set();
    state.moveMatchLabels = new Map();
    clearTimeout(abilitySearchTimer);
  }
  state.view = view;
  state.filter = 'all';
  state.visibleLimit = 48;
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === view));
  document.querySelectorAll('.filter-tab').forEach(item => item.classList.toggle('active', item.dataset.filter === 'all'));
  const copy = {
    roster: ['REGULATION M–C DATABASE','Build your champion team.','Explore all current eligible entries; Mega Evolutions are linked inside each compatible final form.'],
    mechanics: ['BATTLE SYSTEM ENCYCLOPEDIA','Control the entire field.','Weather, terrain, rooms, side effects, hazards, statuses, volatile conditions, and Champions-specific rules in one reference.'],
    watchlist: ['YOUR SAVED PARTNERS','The team starts here.','Keep the Pokémon and Mega forms you want to train within easy reach.'],
    compare: ['HEAD-TO-HEAD ANALYSIS','Measure every advantage.','Compare default Champions stats, Stat Point presets, Mega forms, and exact move-damage ranges.'],
    heatmap: ['ROSTER STAT HEATMAP','See the stat landscape.','Map every default Level 50 Champions stat with 0 SP, including Mega forms as separate entries.'],
    team: ['TEAM BUILDER','Build your six.','Save a local team draft, inspect its type spread, and export it for backup.'],
    moves: ['MOVE EXPLORER','Find the right move.','Inspect move metadata and every compatible entry in the current Champions-specific data index.'],
    data: ['DATA QUALITY CENTER','Know the source.','Track confirmed, unverified, inferred, and unavailable values before relying on them.']
  }[view];
  document.querySelector('#viewEyebrow').textContent = copy[0];
  document.querySelector('#viewTitle').textContent = copy[1];
  document.querySelector('#viewDescription').textContent = copy[2];
  document.querySelector('#toolbar').hidden = ['compare','mechanics','heatmap','team','moves','data'].includes(view);
  document.querySelector('#updateStrip').hidden = view !== 'roster';
  els.mechanicsView.hidden = view !== 'mechanics';
  els.heatmapView.hidden = view !== 'heatmap';
  els.teamView.hidden = view !== 'team';
  if (els.tcView) els.tcView.hidden = view !== 'teamcodes';
  els.moveExplorerView.hidden = view !== 'moves';
  els.dataView.hidden = view !== 'data';
  els.moveSearchTools.hidden = view !== 'roster' || state.searchMode !== 'move';
  els.search.placeholder = view === 'mechanics' ? 'Search mechanics, effects, or counters…' : view === 'heatmap' ? 'Use heatmap controls below…' : ['team','moves','data'].includes(view) ? 'Use this workspace below…' : state.searchMode === 'move' ? 'Search Protect, Thunderbolt, Psycho Cut…' : 'Search by Pokémon or Ability…';
  if (view === 'mechanics') {
    els.grid.hidden = true;
    els.gridFooter.hidden = true;
    els.empty.hidden = true;
    els.compareView.hidden = true;
    document.querySelector('#metricRoster').textContent = CHAMPIONS_MECHANICS.length;
    document.querySelector('#metricRosterLabel').textContent = 'mechanics';
    document.querySelector('#metricMega').textContent = new Set(CHAMPIONS_MECHANICS.map(mechanic => mechanic.category)).size;
    document.querySelector('#metricMegaLabel').textContent = 'categories';
    document.querySelector('#metricThird').textContent = 'M–C';
    document.querySelector('#metricThirdLabel').textContent = 'current rules';
    renderMechanics();
  } else if (view === 'heatmap') {
    els.grid.hidden = true;
    els.gridFooter.hidden = true;
    els.empty.hidden = true;
    els.compareView.hidden = true;
    document.querySelector('#metricRoster').textContent = roster.length + megaRoster.length;
    document.querySelector('#metricRosterLabel').textContent = 'heatmap entries';
    document.querySelector('#metricMega').textContent = megaRoster.length;
    document.querySelector('#metricMegaLabel').textContent = 'Mega forms';
    document.querySelector('#metricThird').textContent = '7';
    document.querySelector('#metricThirdLabel').textContent = 'mapped stats';
    renderHeatmap();
    loadHeatmap().catch(() => { els.heatmapStatus.textContent = 'Some stat data is unavailable; only loaded numeric entries are shown.'; });
  } else if (view === 'team' || view === 'moves' || view === 'data') {
    els.grid.hidden = true;
    els.gridFooter.hidden = true;
    els.empty.hidden = true;
    els.compareView.hidden = true;
    document.querySelector('#metricRoster').textContent = view === 'team' ? state.team.members.length : view === 'moves' ? state.moveCatalog.size : dataQualityCounts().confirmed;
    document.querySelector('#metricRosterLabel').textContent = view === 'team' ? 'team members' : view === 'moves' ? 'indexed moves' : 'confirmed fields';
    document.querySelector('#metricMega').textContent = view === 'team' ? 6 : view === 'moves' ? state.moveMeta.size : dataQualityCounts().unverified;
    document.querySelector('#metricMegaLabel').textContent = view === 'team' ? 'slots' : view === 'moves' ? 'move details' : 'unverified refs';
    document.querySelector('#metricThird').textContent = view === 'data' ? dataQualityCounts().unavailable : 'LOCAL';
    document.querySelector('#metricThirdLabel').textContent = view === 'data' ? 'unavailable fields' : 'workspace';
    if (view === 'team') renderTeam();
    if (view === 'moves') renderMoveExplorer(state.moveExplorerQuery);
    if (view === 'data') renderDataCenter();
  } else {
    document.querySelector('#metricRoster').textContent = roster.length;
    document.querySelector('#metricRosterLabel').textContent = 'eligible';
    document.querySelector('#metricMega').textContent = roster.filter(p => p.megaCapable).length;
    document.querySelector('#metricMegaLabel').textContent = 'mega-capable';
    document.querySelector('#metricThird').textContent = '6';
    document.querySelector('#metricThirdLabel').textContent = 'core stats';
    renderGrid();
  }
  document.body.classList.remove('menu-open');
}

let moveExplorerRequestToken = 0;
async function renderMoveExplorer(query = state.moveExplorerQuery) {
  if (!els.moveExplorerResult) return;
  const requestToken = ++moveExplorerRequestToken;
  state.moveExplorerQuery = String(query || '').trim();
  if (state.moveExplorerQuery.length < 2) {
    const moveUrl = new URL(window.location.href);
    moveUrl.searchParams.delete('move');
    history.replaceState({}, '', moveUrl);
    els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>Choose a move</b><p>Type at least two letters. Partial matches will be shown before a move is opened.</p></div>';
    return;
  }
  els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>Searching move index…</b><p>Using the bundled Champions move list and cached compatibility data.</p></div>';
  try {
    await ensureMoveIndex();
    if (requestToken !== moveExplorerRequestToken) return;
    const normalized = normalizeMove(state.moveExplorerQuery);
    const matches = [...state.moveCatalog].filter(name => name.includes(normalized)).slice(0, 30);
    const exactMatch = matches.find(name => name === normalized);
    if (!exactMatch && matches.length > 1) {
      els.moveExplorerResult.innerHTML = `<div class="move-suggestions"><div class="section-heading"><h3>Choose a move</h3><span>${matches.length} MATCHES</span></div>${matches.map(name => `<button type="button" data-move-choice="${name}">${titleCase(name)}</button>`).join('')}</div>`;
      els.moveExplorerResult.querySelectorAll('[data-move-choice]').forEach(button => button.addEventListener('click', () => { els.moveExplorerInput.value = titleCase(button.dataset.moveChoice); renderMoveExplorer(button.dataset.moveChoice); }));
      return;
    }
    const exact = exactMatch || matches[0];
    if (!exact) {
      els.moveExplorerResult.innerHTML = '<div class="workspace-empty"><b>No move found</b><p>Try a shorter name or a different spelling.</p></div>';
      return;
    }
    await getMoveDetails([exact]);
    if (requestToken !== moveExplorerRequestToken) return;
    const meta = state.moveMeta.get(exact) || {};
    const override = ChampionsKnowledge.move(exact);
    const technical = { ...meta, ...(override || {}) };
    const compatible = [...state.moveIndex.entries()]
      .filter(([, entry]) => entry.moves?.[exact])
      .map(([key, entry]) => ({ p: teamMember(key), entry }))
      .filter(item => item.p);
    const moveUrl = new URL(window.location.href);
    moveUrl.searchParams.set('view', 'moves');
    moveUrl.searchParams.set('move', exact);
    history.replaceState({}, '', moveUrl);
    els.moveExplorerResult.innerHTML = `<article class="move-detail-card">
    <div class="move-detail-head"><div><span class="eyebrow">MOVE RECORD · ${technical.type ? titleCase(technical.type) : 'TYPE UNAVAILABLE'}</span><h2>${titleCase(exact)}</h2><p>${escapeHtml(technical.summary || technical.short_effect || technical.description)}</p></div>
    <div class="move-stat-grid"><span><b>${technical.power ?? '—'}</b>POWER</span><span><b>${technical.always_hits ? 'ALWAYS' : technical.accuracy ?? '—'}</b>ACC</span><span><b>${technical.priority ?? 0}</b>PRIORITY</span><span><b>${technical.damage_class ? titleCase(technical.damage_class) : '—'}</b>CATEGORY</span><span><b>${technical.contact === true ? 'YES' : technical.contact === false ? 'NO' : '—'}</b>CONTACT</span><span><b>${technical.spread === true ? 'YES' : technical.spread === false ? 'NO' : '—'}</b>SPREAD</span></div></div>
    ${technical.description && technical.description !== technical.summary ? `<div class="move-effect-detail"><b>DETAILED EFFECT</b><p>${escapeHtml(technical.description)}</p></div>` : ''}
    ${sourceMarkup(technical)}
    ${(technical.relatedTerms || []).length ? `<div class="related-links">${technical.relatedTerms.map(id => termButton(id)).join(' ')}</div>` : ''}
    <p class="data-note"><b>LEARNSET PROVENANCE</b> ${compatible.length} app entries match. Every shown move is on the current Champions available-move list; per-Pokémon compatibility is inferred from species data unless explicitly Champions-confirmed. Mega forms inherit their base/final-form move pool.</p>
    <div class="section-heading"><h3>Compatible roster entries</h3><span>${compatible.length}</span></div>
    <div class="move-compatible-grid">${compatible.map(({ p, entry }) => `<button class="move-compatible-item" type="button" data-move-pokemon="${keyOf(p)}"><img src="${spriteFor(p)}" alt=""><span><b>${displayName(p)}</b><em>${p.group === 'mega' ? 'MEGA · INHERITED POOL · ' : ''}${entry.source === 'champions-verified' ? 'CHAMPIONS CONFIRMED' : 'CHAMPIONS MOVE · INFERRED COMPATIBILITY'}</em></span></button>`).join('') || '<div class="workspace-empty"><b>No compatible entries</b><p>No app entry contains this move in the current index.</p></div>'}</div>
    </article>`;
    els.moveExplorerResult.querySelectorAll('[data-move-pokemon]').forEach(button => button.addEventListener('click', () => openDetail(teamMember(button.dataset.movePokemon))));
    document.querySelector('#moveCount').textContent = state.moveCatalog.size;
  } catch (error) {
    if (requestToken !== moveExplorerRequestToken) return;
    els.moveExplorerResult.innerHTML = `<div class="workspace-empty"><b>Move data unavailable</b><p>${escapeHtml(error.message || 'The move index could not be loaded.')}</p><button class="empty-action" type="button" data-retry-move>RETRY</button></div>`;
    els.moveExplorerResult.querySelector('[data-retry-move]')?.addEventListener('click', () => renderMoveExplorer(state.moveExplorerQuery));
  }
}

function renderDataCenter() {
  const counts = dataQualityCounts();
  if (els.dataHealth) els.dataHealth.innerHTML = `<article><b>${counts.specialist}</b><span>Complete move records</span><em>Champions move effects and technical fields bundled offline</em></article><article><b>${Object.keys(CHAMPIONS_REFERENCE_ABILITY_META || {}).length}</b><span>Complete Ability records</span><em>Every roster and Mega Ability has an effect description</em></article><article><b>${counts.unavailable}</b><span>Validation issues</span><em>${counts.issues.map(issue => escapeHtml(issue.message)).join(' · ') || 'No source-link conflicts detected'}</em></article><article><b>${state.watchlist.size}</b><span>Saved local entries</span><em>Watchlist, notes, and team draft stay on-device</em></article>`;
  if (els.dataChangelog) els.dataChangelog.innerHTML = `<div class="changelog-entry"><b>v1.4.1</b><span>Team Codes now opens on full sets with published items first, with an “Only teams with published items” filter on by default, so species-only teams no longer greet you with “Item not published”.</span></div><div class="changelog-entry"><b>v1.4.0</b><span>Added the live Team Codes section: Replica Team codes fetched from the public data feed with a bundled offline snapshot, Pokémon + held-item (Mega Stone) filtering, tap-to-copy codes, favourites, worked-for-me feedback, and Open in Team Builder for full sets. Added in-app update awareness against the public version manifest.</span></div><div class="changelog-entry"><b>v1.3.0</b><span>Nova arena UI revamp: aurora glass design, type-glowing cards, roster sorting, recently viewed Pokémon, a visual damage HP bar, copyable comparison summaries, and keyboard-shortcut help.</span></div><div class="changelog-entry"><b>v1.2.15</b><span>Added a searchable Ability Explorer and replaced blank, vague, or placeholder move and Ability text with complete offline technical records. Details now flow through Pokémon pages, comparisons, Move Explorer, universal search, and the damage calculator.</span></div><div class="changelog-entry"><b>v1.2.14</b><span>Search now resets reliably between primary tabs; browser Back restores views and detail sheets; mobile navigation, compare prompts, move lookup, heatmap recovery, focus handling, and update reporting are hardened.</span></div><div class="changelog-entry"><b>v1.2.13</b><span>Rebuilt page, sidebar, detail-sheet, knowledge-sheet, comparison-tray, and mobile navigation scrolling with preserved positions and no overlay-obscured content.</span></div><div class="changelog-entry"><b>v1.2.0</b><span>Regulation M-C roster, six new Megas, battle-relevant alternate forms, version 1.2.0 move/Ability/item updates, professional comparison tray, accessibility fixes, and dedicated local artwork for all ${roster.length + megaRoster.length} entries.</span></div><div class="changelog-entry"><b>Offline</b><span>The app and APK bundle ${state.moveCatalog.size} complete move records and ${Object.keys(CHAMPIONS_REFERENCE_ABILITY_META || {}).length} complete Ability records.</span></div>`;
}

function setView(view, options = {}) {
  const validViews = new Set(['roster','mechanics','heatmap','team','teamcodes','moves','abilities','items','glossary','intel','data','watchlist','compare']);
  if (!validViews.has(view)) view = 'roster';
  const previousView = state.view;
  const switchingViews = previousView !== view;
  if (switchingViews) viewScrollPositions.set(previousView, document.body.classList.contains('scroll-locked') ? lockedScrollY : window.scrollY);
  if (switchingViews && view === 'compare' && state.searchMode === 'move' && state.search.trim()) state.compareMoveQuery = state.search.trim();
  if (switchingViews) { resetGlobalSearch(); resetWorkspaceSearch(previousView); }
  state.view = view;
  if (switchingViews) syncViewHistory(view, options.historyMode || 'push');
  state.visibleLimit = 48;
  const workspaceViews = ['compare','mechanics','heatmap','team','teamcodes','moves','abilities','items','glossary','intel','data'];
  const copy = {
    roster: ['REGULATION M–C DATABASE','Build your champion team.','Explore every currently indexed eligible entry; Mega Evolutions are linked to their normal final forms.'],
    mechanics: ['BATTLE SYSTEM ENCYCLOPEDIA','Control the entire field.','Exact weather, terrain, screen, room, hazard, status, and Champions rule terminology.'],
    watchlist: ['YOUR SAVED PARTNERS','The team starts here.','Keep Pokémon and Mega forms you want to train within easy reach.'],
    compare: ['HEAD-TO-HEAD ANALYSIS','Measure every advantage.','Compare default Champions stats, Abilities, moves, Mega forms, SP presets, and exact damage ranges.'],
    heatmap: ['ROSTER STAT HEATMAP','See the stat landscape.','Map every default Level 50 Champions stat with 0 SP, with Mega forms as distinct entries.'],
    team: ['TEAM BUILDER','Build your six.','Save a local team draft and inspect default stats, typing, Abilities, and indexed move coverage.'],
    teamcodes: ['REPLICA TEAM CODES','Take a proven team into battle.','Live Replica Team codes with Pokémon + held-item filtering. Tap any code to copy it — status is only ever confirmed inside the game.'],
    moves: ['MOVE EXPLORER','Find the right move.','Inspect technical move fields and compatible roster entries with explicit provenance.'],
    abilities: ['ABILITY EXPLORER','Understand every Ability.','Search every roster and Mega Ability by name or effect, with complete descriptions and explicit provenance.'],
    items: ['CHAMPIONS ITEM DEX','Know every modifier.','Search held-item multipliers, triggers, costs, restrictions, and calculator support.'],
    glossary: ['BATTLE GLOSSARY','Decode every battle term.','Open exact percentages, durations, triggers, scope, interactions, and counterplay.'],
    intel: ['TOURNAMENT INTELLIGENCE','Prepare for Regulation M–C.','Current format rules, clocks, team selection, Mega clause, and dated source context.'],
    data: ['DATA QUALITY CENTER','Know the source.','Track confirmed, tested, reference, inferred, and unavailable records before relying on them.']
  }[view];
  document.querySelectorAll('.nav-item').forEach(item => {
    const active = item.dataset.view === view;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
  });
  document.querySelectorAll('.filter-tab').forEach(item => {
    const active = item.dataset.filter === state.filter;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-mobile-view]').forEach(item => item.classList.toggle('active', item.dataset.mobileView === view));
  document.querySelector('[data-mobile-more]')?.classList.toggle('active', ['mechanics','heatmap','teamcodes','moves','abilities','items','glossary','intel','data','watchlist'].includes(view));
  document.querySelector('#viewEyebrow').textContent = copy[0];
  document.querySelector('#viewTitle').textContent = copy[1];
  document.querySelector('#viewDescription').textContent = copy[2];
  document.querySelector('#toolbar').hidden = workspaceViews.includes(view);
  document.querySelector('#updateStrip').hidden = view !== 'roster';
  els.mechanicsView.hidden = view !== 'mechanics';
  els.heatmapView.hidden = view !== 'heatmap';
  els.teamView.hidden = view !== 'team';
  if (els.tcView) els.tcView.hidden = view !== 'teamcodes';
  els.moveExplorerView.hidden = view !== 'moves';
  els.abilityView.hidden = view !== 'abilities';
  els.itemView.hidden = view !== 'items';
  els.glossaryView.hidden = view !== 'glossary';
  els.intelView.hidden = view !== 'intel';
  els.dataView.hidden = view !== 'data';
  els.compareView.hidden = view !== 'compare';
  const rosterView = view === 'roster' || view === 'watchlist';
  els.grid.hidden = !rosterView;
  els.gridFooter.hidden = !rosterView;
  els.empty.hidden = !rosterView;
  els.moveSearchTools.hidden = !rosterView || state.searchMode !== 'move';
  els.search.placeholder = 'Search Pokémon, moves, Abilities, items, or mechanics…';
  if (view === 'mechanics') renderMechanics();
  else if (view === 'heatmap') { renderHeatmap(); loadHeatmap().catch(renderHeatmap); }
  else if (view === 'team') renderTeam();
  else if (view === 'teamcodes') { renderTeamCodes(); loadTeamCodes(); }
  else if (view === 'moves') renderMoveExplorer(state.moveExplorerQuery);
  else if (view === 'abilities') renderAbilityExplorer();
  else if (view === 'items') renderItems();
  else if (view === 'glossary') renderGlossary();
  else if (view === 'intel') renderIntel();
  else if (view === 'data') { renderDataCenter(); checkForAppUpdate(); }
  else if (view === 'compare') renderCompare();
  else renderGrid();
  const metrics = view === 'items' ? [CHAMPIONS_ITEMS.length, 'items', new Set(CHAMPIONS_ITEMS.map(item => item.category)).size, 'categories', 'SOURCE', 'aware']
    : view === 'glossary' ? [ChampionsKnowledge.allTerms().length, 'terms', new Set(ChampionsKnowledge.allTerms().map(term => term.category)).size, 'categories', 'EXACT', 'effects']
    : view === 'intel' ? ['M–C', 'regulation', '50', 'battle level', 'LIVE', 'current rules']
    : view === 'moves' ? [state.moveCatalog.size, 'indexed moves', Object.keys(CHAMPIONS_MOVE_OVERRIDES).length, 'Champions overrides', 'OFFLINE', 'index']
    : view === 'abilities' ? [Object.keys(CHAMPIONS_REFERENCE_ABILITY_META || {}).length, 'complete Abilities', Object.keys(CHAMPIONS_ABILITY_OVERRIDES).length, 'Champions overrides', '0', 'blank descriptions']
    : view === 'heatmap' ? [roster.length + megaRoster.length, 'heatmap entries', megaRoster.length, 'Mega forms', '7', 'mapped stats']
    : view === 'mechanics' ? [CHAMPIONS_MECHANICS.length, 'mechanics', new Set(CHAMPIONS_MECHANICS.map(m => m.category)).size, 'categories', 'M–C', 'current rules']
    : view === 'teamcodes' ? [state.tc.teams.length || '…', 'replica teams', state.tcFavorites.size, 'favourites', 'LIVE', 'team codes']
    : view === 'team' ? [state.team.members.length, 'team members', 6, 'slots', 'LOCAL', 'workspace']
    : view === 'data' ? [dataQualityCounts().confirmed, 'confirmed fields', dataQualityCounts().unverified, 'labeled refs', dataQualityCounts().unavailable, 'validation issues']
    : [roster.length, 'eligible', roster.filter(p => p.megaCapable).length, 'mega-capable', '6', 'core stats'];
  document.querySelector('#metricRoster').textContent = metrics[0];
  document.querySelector('#metricRosterLabel').textContent = metrics[1];
  document.querySelector('#metricMega').textContent = metrics[2];
  document.querySelector('#metricMegaLabel').textContent = metrics[3];
  document.querySelector('#metricThird').textContent = metrics[4];
  document.querySelector('#metricThirdLabel').textContent = metrics[5];
  document.body.classList.remove('menu-open');
  syncScrollLock();
  renderCompareTray();
  if (switchingViews) queueViewScroll(view);
}

function initTypes() {
  const types = [...new Set(roster.flatMap(p => p.types))].sort();
  types.forEach(type => {
    els.type.insertAdjacentHTML('beforeend', `<option value="${type}">${titleCase(type)}</option>`);
    els.heatmapType?.insertAdjacentHTML('beforeend', `<option value="${type}">${titleCase(type)}</option>`);
    els.moveType?.insertAdjacentHTML('beforeend', `<option value="${type}">${titleCase(type)}</option>`);
  });
}

document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  state.visibleLimit = 48;
  document.querySelectorAll('.filter-tab').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderGrid();
}));
function updateSearchMode() {
  state.searchMode = els.searchMode.value;
  state.visibleLimit = 48;
  state.abilityMatches = new Set();
  state.abilityMatchLabels = new Map();
  state.moveMatches = new Set();
  state.moveMatchLabels = new Map();
  state.abilitySearchPending = false;
  state.moveSearchPending = false;
  els.moveSearchTools.hidden = !(state.view === 'roster' || state.view === 'watchlist') || state.searchMode !== 'move';
  els.search.placeholder = state.searchMode === 'move' ? 'Search Protect, Thunderbolt, Psycho Cut…' : 'Search by Pokémon or Ability…';
  renderGrid();
  if (state.searchMode === 'move' && state.search.length >= 2) {
    clearTimeout(abilitySearchTimer);
    searchMoveMatches(state.search);
  }
}
els.searchMode?.addEventListener('change', updateSearchMode);
els.searchMode?.addEventListener('input', updateSearchMode);
els.clearFilters?.addEventListener('click', () => {
  state.filter = 'all';
  state.type = 'all';
  state.moveType = 'all';
  state.moveCategory = 'all';
  state.movePower = 'all';
  state.moveAccuracy = 'all';
  state.visibleLimit = 48;
  state.searchMode = 'name-ability';
  if (els.searchMode) els.searchMode.value = 'name-ability';
  if (els.moveSearchTools) els.moveSearchTools.hidden = true;
  if (els.type) els.type.value = 'all';
  if (els.moveType) els.moveType.value = 'all';
  if (els.moveCategory) els.moveCategory.value = 'all';
  if (els.movePower) els.movePower.value = 'all';
  if (els.moveAccuracy) els.moveAccuracy.value = 'all';
  document.querySelectorAll('.filter-tab').forEach(item => {
    const active = item.dataset.filter === 'all';
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  resetGlobalSearch();
  renderGrid();
  showNotice('Roster search and filters cleared.');
});
els.search.addEventListener('keydown', event => {
  const options = els.globalResults.hidden ? [] : [...els.globalResults.querySelectorAll('[role="option"]')];
  if (!options.length) {
    if (event.key === 'Escape') { els.globalResults.hidden = true; els.search.setAttribute('aria-expanded', 'false'); }
    return;
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    globalSearchIndex = (globalSearchIndex + direction + options.length) % options.length;
    syncGlobalSearchSelection();
  } else if (event.key === 'Home') {
    event.preventDefault(); globalSearchIndex = 0; syncGlobalSearchSelection();
  } else if (event.key === 'End') {
    event.preventDefault(); globalSearchIndex = options.length - 1; syncGlobalSearchSelection();
  } else if (event.key === 'Enter') {
    event.preventDefault(); options[globalSearchIndex >= 0 ? globalSearchIndex : 0].click();
  } else if (event.key === 'Escape') {
    event.preventDefault(); els.globalResults.hidden = true; els.search.setAttribute('aria-expanded', 'false'); globalSearchIndex = -1; syncGlobalSearchSelection();
  }
});
function updateMoveFilter() {
  state.moveType = els.moveType.value;
  state.moveCategory = els.moveCategory.value;
  state.movePower = els.movePower.value;
  state.moveAccuracy = els.moveAccuracy.value;
  if (state.searchMode === 'move' && state.search.length >= 2) searchMoveMatches(state.search);
}
[els.moveType, els.moveCategory, els.movePower, els.moveAccuracy].forEach(select => {
  select?.addEventListener('change', updateMoveFilter);
  select?.addEventListener('input', updateMoveFilter);
});
els.search.addEventListener('input', event => {
  const query = event.target.value.trim();
  state.search = query;
  renderGlobalSearch(query);
  state.visibleLimit = 48;
  if (!['roster','watchlist','mechanics'].includes(state.view)) return;
  if (state.view === 'mechanics') {
    renderMechanics();
    return;
  }
  if (state.searchMode === 'move') {
    state.abilityMatches = new Set();
    state.abilityMatchLabels = new Map();
    clearTimeout(abilitySearchTimer);
    renderGrid();
    if (query.length >= 2) searchMoveMatches(query);
    return;
  }
  state.abilityMatches = new Set();
  state.abilityMatchLabels = new Map();
  state.abilitySearchPending = query.length >= 2;
  clearTimeout(abilitySearchTimer);
  renderGrid();
  if (state.abilitySearchPending) abilitySearchTimer = setTimeout(() => searchAbilityMatches(query), 280);
});
els.type.addEventListener('change', event => { state.type = event.target.value; state.visibleLimit = 48; renderGrid(); });
els.sort?.addEventListener('change', event => { state.sort = event.target.value; state.visibleLimit = 48; renderGrid(); });
els.clearRecent?.addEventListener('click', () => { state.recent = []; try { localStorage.removeItem('champions-recent'); } catch { /* ignore */ } renderRecent(); });
els.loadMore.addEventListener('click', () => { state.visibleLimit += 48; renderGrid(); });
els.expandMechanics.addEventListener('click', () => {
  state.mechanicsExpandedAll = !state.mechanicsExpandedAll;
  els.expandMechanics.textContent = state.mechanicsExpandedAll ? 'Collapse all' : 'Expand all';
  renderMechanics();
});
const heatmapSelectUpdate = (key, event) => { state[key] = event.target.value; renderHeatmap(); };
[ [els.heatmapStat, 'heatmapStat'], [els.heatmapType, 'heatmapType'], [els.heatmapForm, 'heatmapForm'] ].forEach(([select, key]) => {
  select?.addEventListener('change', event => heatmapSelectUpdate(key, event));
  select?.addEventListener('input', event => heatmapSelectUpdate(key, event));
});
els.heatmapAbility?.addEventListener('input', event => { state.heatmapAbility = event.target.value; renderHeatmap(); });
els.heatmapMin?.addEventListener('input', event => { state.heatmapMin = event.target.value; renderHeatmap(); });
els.heatmapMax?.addEventListener('input', event => { state.heatmapMax = event.target.value; renderHeatmap(); });
els.heatmapMove?.addEventListener('input', event => {
  state.heatmapMove = event.target.value;
  renderHeatmap();
  if (state.heatmapMove.trim().length >= 2) ensureMoveIndex().then(renderHeatmap).catch(renderHeatmap);
});
els.heatmapSortButton?.addEventListener('click', () => { state.heatmapSort = state.heatmapSort === 'desc' ? 'asc' : 'desc'; els.heatmapSortButton.textContent = state.heatmapSort === 'desc' ? 'SORT: HIGH → LOW' : 'SORT: LOW → HIGH'; renderHeatmap(); });
els.heatmapTopButton?.addEventListener('click', () => { state.heatmapTopOnly = !state.heatmapTopOnly; els.heatmapTopButton.textContent = state.heatmapTopOnly ? 'SHOW FULL ROSTER' : 'SHOW TOP 10'; renderHeatmap(); });
els.heatmapCompactButton?.addEventListener('click', () => { state.heatmapCompact = !state.heatmapCompact; els.heatmapGrid.classList.toggle('compact', state.heatmapCompact); els.heatmapCompactButton.textContent = state.heatmapCompact ? 'COMFORT VIEW' : 'COMPACT VIEW'; });
els.heatmapFullscreenButton?.addEventListener('click', async () => { try { const section = document.querySelector('#heatmapView'); if (!document.fullscreenElement) await section?.requestFullscreen?.(); else await document.exitFullscreen?.(); } catch { showNotice('Full screen is not available in this browser or app shell.', 'warning'); } });
els.heatmapExportButton?.addEventListener('click', () => {
  const records = heatmapFilteredRecords();
  const label = state.heatmapStat === 'bst' ? 'Default Champions Stat Total' : titleCase(state.heatmapStat);
  const width = 720; const height = Math.max(180, 90 + records.length * 24);
  const rows = records.map((record, index) => `<text x="30" y="${60 + index * 24}" fill="#d9edf2" font-family="Arial" font-size="14">${index + 1}. ${escapeHtml(displayName(record.p))} — ${heatmapValue(record)}${record.p.group === 'mega' ? ' · MEGA' : ''}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#08131f"/><text x="30" y="32" fill="#42d9e8" font-family="Arial" font-size="18" font-weight="700">Champions Dex · ${escapeHtml(label)} heatmap</text>${rows}</svg>`;
  saveTextFile(`champions-dex-${state.heatmapStat}-heatmap.svg`, 'image/svg+xml', svg);
});

// Team Codes controls
document.querySelector('#tcPokemonOptions')?.replaceChildren(...roster.map(p => { const o = document.createElement('option'); o.value = p.display; return o; }));
els.tcSearch?.addEventListener('input', event => { state.tc.search = event.target.value; renderTeamCodes(); });
document.querySelector('#tcRegulationSelect')?.addEventListener('change', event => { state.tc.regulation = event.target.value; renderTeamCodes(); });
document.querySelector('#tcFormatSelect')?.addEventListener('change', event => { state.tc.format = event.target.value; renderTeamCodes(); });
document.querySelector('#tcSortSelect')?.addEventListener('change', event => { state.tc.sort = event.target.value; renderTeamCodes(); });
document.querySelector('#tcFavOnly')?.addEventListener('change', event => { state.tc.favoritesOnly = event.target.checked; renderTeamCodes(); });
document.querySelector('#tcIncludeUnknown')?.addEventListener('change', event => { state.tc.includeUnknownItems = event.target.checked; renderTeamCodes(); });
document.querySelector('#tcOnlyPublished')?.addEventListener('change', event => { state.tc.onlyPublishedItems = event.target.checked; renderTeamCodes(); });
document.querySelector('#teamCodesRefresh')?.addEventListener('click', () => { state.tc.loaded = false; loadTeamCodes(true); });
function tcReset() {
  state.tc.search = ''; state.tc.selected = []; state.tc.mode = 'AND'; state.tc.includeUnknownItems = false;
  state.tc.regulation = 'current'; state.tc.format = 'all'; state.tc.sort = 'fullsets'; state.tc.favoritesOnly = false; state.tc.onlyPublishedItems = true;
  if (els.tcSearch) els.tcSearch.value = '';
  const set = (id, value) => { const el = document.querySelector(id); if (el) el.value = value; };
  set('#tcRegulationSelect', 'current'); set('#tcFormatSelect', 'all'); set('#tcSortSelect', 'fullsets');
  const onlyPub = document.querySelector('#tcOnlyPublished'); if (onlyPub) onlyPub.checked = true;
  const fav = document.querySelector('#tcFavOnly'); if (fav) fav.checked = false;
  const unk = document.querySelector('#tcIncludeUnknown'); if (unk) unk.checked = false;
  renderTeamCodes();
}
document.querySelector('#tcResetFilters')?.addEventListener('click', tcReset);
document.querySelector('#tcEmptyReset')?.addEventListener('click', tcReset);
document.querySelector('#tcModeToggle')?.addEventListener('click', () => { state.tc.mode = state.tc.mode === 'AND' ? 'OR' : 'AND'; renderTeamCodes(); });
function tcAddSelected() {
  const input = document.querySelector('#tcPokemonInput');
  const raw = (input?.value || '').trim();
  if (!raw) return;
  const entry = roster.find(p => p.display.toLowerCase() === raw.toLowerCase()) || roster.find(p => p.display.toLowerCase().includes(raw.toLowerCase()));
  if (!entry) { showNotice(`“${raw}” is not in the current roster. Pick a Pokémon from the list.`, 'warning'); return; }
  if (state.tc.selected.some(item => item.species === entry.display)) { showNotice(`${entry.display} is already in the filter.`, 'warning'); return; }
  if (state.tc.selected.length >= 6) { showNotice('A team has six Pokémon — remove one filter first.', 'warning'); return; }
  state.tc.selected.push({ species: entry.display, item: '' });
  if (input) input.value = '';
  renderTeamCodes();
}
document.querySelector('#tcAddPokemon')?.addEventListener('click', tcAddSelected);
document.querySelector('#tcPokemonInput')?.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); tcAddSelected(); } });
document.querySelector('#tcPokemonInput')?.addEventListener('change', tcAddSelected);
els.tcSelected?.addEventListener('change', event => {
  const input = event.target.closest('[data-tc-item]');
  if (!input) return;
  const selection = state.tc.selected[Number(input.dataset.tcItem)];
  if (selection) { selection.item = input.value.trim(); renderTeamCodes(); }
});
els.tcSelected?.addEventListener('click', event => {
  const button = event.target.closest('[data-tc-remove]');
  if (!button) return;
  state.tc.selected.splice(Number(button.dataset.tcRemove), 1);
  renderTeamCodes();
});
els.tcGrid?.addEventListener('click', event => {
  const copy = event.target.closest('[data-tc-copy]');
  if (copy) { copyTeamCode(copy.dataset.tcCopy, copy); return; }
  const fav = event.target.closest('[data-tc-fav]');
  if (fav) {
    const code = TeamCodesLib.normalizeTeamCode(fav.dataset.tcFav);
    if (state.tcFavorites.has(code)) state.tcFavorites.delete(code); else state.tcFavorites.add(code);
    tcSaveLocal(); renderTeamCodes(); return;
  }
  const worked = event.target.closest('[data-tc-worked]');
  if (worked) {
    const code = TeamCodesLib.normalizeTeamCode(worked.dataset.code);
    state.tcWorked[code] = state.tcWorked[code] === worked.dataset.tcWorked ? undefined : worked.dataset.tcWorked;
    if (!state.tcWorked[code]) delete state.tcWorked[code];
    tcSaveLocal(); renderTeamCodes(); return;
  }
  const build = event.target.closest('[data-tc-build]');
  if (build) openTeamCodeInBuilder(build.dataset.tcBuild);
});

els.teamSearch?.addEventListener('input', event => { state.teamSearch = event.target.value; renderTeam(); });
els.teamName?.addEventListener('input', event => { state.team.name = event.target.value; saveTeam(); });
els.teamFormat?.addEventListener('change', event => { state.team.format = event.target.value; saveTeam(); renderTeam(); });
els.teamExport?.addEventListener('click', () => exportJson('champions-dex-team.json', { app: 'Champions Dex', version: CHAMPIONS_APP_VERSION, exportedAt: new Date().toISOString(), regulation: CHAMPIONS_REGULATIONS.active, team: state.team, notes: state.notes }));
els.teamImport?.addEventListener('click', () => els.teamImportInput?.click());
els.teamImportInput?.addEventListener('change', event => {
  const file = event.target.files?.[0]; if (!file) return;
  const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); const team = imported.team || imported; if (!Array.isArray(team.members)) throw new Error('Team members are missing.'); state.team = { name: typeof team.name === 'string' && team.name.trim() ? team.name : 'Imported Champions team', format: ['singles','doubles'].includes(team.format) ? team.format : 'doubles', members: team.members.filter(key => teamMember(key)).slice(0, 6), configs: team.configs && typeof team.configs === 'object' ? team.configs : {} }; saveTeam(); renderTeam(); showNotice(`Imported ${state.team.members.length} team member${state.team.members.length === 1 ? '' : 's'}.`); } catch { showNotice('That file is not a valid Champions Dex team backup. No saved data was changed.', 'warning'); } }; reader.readAsText(file); event.target.value = '';
});
els.compareTraySlots?.addEventListener('click', event => {
  const button = event.target.closest('[data-remove-compare]');
  if (!button) return;
  const target = state.compare.find(p => keyOf(p) === button.dataset.removeCompare);
  if (target) toggleCompare(target);
});
els.compareTrayAdd?.addEventListener('click', () => { setView('roster'); els.search.focus(); els.search.select(); });
els.compareTrayOpen?.addEventListener('click', () => { if (state.compare.length === 2) setView('compare'); });
els.moveExplorerInput?.addEventListener('input', event => { state.moveExplorerQuery = event.target.value; renderMoveExplorer(state.moveExplorerQuery); });
els.moveExplorerButton?.addEventListener('click', () => renderMoveExplorer(els.moveExplorerInput.value));
els.abilityInput?.addEventListener('input', event => { state.abilityExplorerQuery = event.target.value; renderAbilityExplorer(); });
els.itemInput?.addEventListener('input', event => { state.itemSearch = event.target.value; renderItems(); });
els.itemCategory?.addEventListener('change', event => { state.itemCategory = event.target.value; renderItems(); });
els.glossaryInput?.addEventListener('input', event => { state.glossarySearch = event.target.value; renderGlossary(); });
els.glossaryCategory?.addEventListener('change', event => { state.glossaryCategory = event.target.value; renderGlossary(); });
document.querySelector('#closeKnowledge')?.addEventListener('click', closeKnowledge);
els.knowledgeScrim?.addEventListener('click', closeKnowledge);
document.addEventListener('click', event => {
  if (!event.target.closest('.global-search') && !event.target.closest('#globalSearchResults') && !els.globalResults.hidden) {
    els.globalResults.hidden = true;
    els.search.setAttribute('aria-expanded', 'false');
    globalSearchIndex = -1;
    syncGlobalSearchSelection();
  }
  const term = event.target.closest('[data-term-id]');
  const item = event.target.closest('[data-item-id]');
  const move = event.target.closest('[data-move-id]');
  const ability = event.target.closest('[data-ability-id]');
  const retryDetail = event.target.closest('[data-retry-detail]');
  if (retryDetail && state.detail) { event.preventDefault(); openDetail(state.detail); }
  else if (term) { event.preventDefault(); openKnowledge('term', term.dataset.termId); }
  else if (item) { event.preventDefault(); openKnowledge('item', item.dataset.itemId); }
  else if (move) { event.preventDefault(); openKnowledge('move', move.dataset.moveId); }
  else if (ability) { event.preventDefault(); openKnowledge('ability', ability.dataset.abilityId); }
});
els.globalResults?.addEventListener('click', event => {
  const button = event.target.closest('[data-global-kind]');
  if (!button) return;
  const { globalKind: kind, globalId: id } = button.dataset;
  els.globalResults.hidden = true;
  els.search.setAttribute('aria-expanded', 'false');
  if (kind === 'pokemon') openDetail(teamMember(id));
  else if (kind === 'move') { setView('moves'); state.moveExplorerQuery = id; if (els.moveExplorerInput) els.moveExplorerInput.value = titleCase(id); renderMoveExplorer(id); }
  else if (kind === 'ability') openKnowledge('ability', id);
  else openKnowledge(kind, id);
});
document.querySelectorAll('[data-mobile-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.mobileView)));
document.querySelector('[data-mobile-search]')?.addEventListener('click', () => { els.search.focus(); els.search.select(); });
document.querySelector('[data-mobile-more]')?.addEventListener('click', () => toggleMobileMenu());
els.drawerClose?.addEventListener('click', () => toggleMobileMenu(false));
els.drawerScrim?.addEventListener('click', () => toggleMobileMenu(false));
els.brandHome?.addEventListener('click', () => setView('roster'));
function setShortcutHelp(open) {
  if (!els.shortcutHelp) return;
  els.shortcutHelp.hidden = !open;
  els.shortcutHelpButton?.setAttribute('aria-expanded', String(open));
  if (open) els.closeShortcutHelp?.focus({ preventScroll:true });
}
els.shortcutHelpButton?.addEventListener('click', () => setShortcutHelp(els.shortcutHelp?.hidden !== false));
els.closeShortcutHelp?.addEventListener('click', () => { setShortcutHelp(false); els.shortcutHelpButton?.focus({ preventScroll:true }); });
els.copyReport?.addEventListener('click', async () => {
  const value = els.reportInput?.value.trim();
  if (!value) { if (els.reportStatus) els.reportStatus.textContent = 'Describe the issue before copying a report.'; return; }
  const report = `Champions Dex data report\nVersion: ${CHAMPIONS_APP_VERSION}\nTime: ${new Date().toISOString()}\n\n${value}`;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable');
    await navigator.clipboard.writeText(report);
    if (els.reportStatus) els.reportStatus.textContent = 'Report copied. Paste it into a GitHub Issue or your update notes.';
  } catch {
    if (els.reportStatus) els.reportStatus.textContent = 'Copy failed. Select the report text manually and copy it from this device.';
  }
});
els.resetLocalData?.addEventListener('click', () => {
  if (!window.confirm('Remove the saved team, notes, watchlist, and cached search index from this device?')) return;
  ['champions-team','champions-notes','champions-watchlist','champions-move-index-v1','champions-recent'].forEach(key => localStorage.removeItem(key));
  window.location.reload();
});
els.updateButton?.addEventListener('click', async () => {
  try {
    if (!('serviceWorker' in navigator)) throw new Error('Update checks require the installed web app');
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) throw new Error('No installed app cache was found');
    await registration.update();
    els.updateButton.textContent = 'CHECK COMPLETE';
    showNotice('Update check completed. Any available app update will activate automatically.');
  } catch (error) {
    els.updateButton.textContent = 'CHECK FAILED';
    showNotice(error.message || 'Update check failed. Try again while online.', 'warning');
  } finally {
    setTimeout(() => { els.updateButton.textContent = 'CHECK FOR UPDATES'; }, 2400);
  }
});
document.querySelector('#closeDetail').addEventListener('click', requestCloseDetail);
els.scrim.addEventListener('click', requestCloseDetail);
document.querySelector('.mobile-menu').addEventListener('click', () => toggleMobileMenu());
document.querySelector('#randomButton').addEventListener('click', () => {
  if (state.view === 'mechanics') {
    const buttons = [...els.mechanicsGrid.querySelectorAll('.mechanic-summary')];
    const button = buttons[Math.floor(Math.random() * buttons.length)];
    if (button) button.click();
    return;
  }
  const list = filteredRoster();
  if (list.length) openDetail(list[Math.floor(Math.random() * list.length)]);
});
document.addEventListener('keydown', event => {
  const editable = event.target instanceof HTMLElement && (event.target.matches('input, textarea, select, [contenteditable="true"]') || event.target.isContentEditable);
  if (event.key === '?' && !editable) { event.preventDefault(); setShortcutHelp(els.shortcutHelp?.hidden !== false); return; }
  if (event.key === '/' && !editable && !els.knowledgeSheet?.classList.contains('open') && !els.panel?.classList.contains('open')) { event.preventDefault(); els.search.focus(); }
  if (event.key === 'Escape') {
    if (els.shortcutHelp && !els.shortcutHelp.hidden) setShortcutHelp(false);
    else if (!els.globalResults.hidden) { els.globalResults.hidden = true; els.search.setAttribute('aria-expanded', 'false'); }
    else if (els.knowledgeSheet?.classList.contains('open')) closeKnowledge();
    else if (els.panel?.classList.contains('open')) requestCloseDetail();
    else if (document.body.classList.contains('menu-open')) toggleMobileMenu(false);
  }
  if (event.key === 'Tab') {
    const modal = els.knowledgeSheet?.classList.contains('open') ? els.knowledgeSheet : els.panel?.classList.contains('open') ? els.panel : null;
    if (!modal) return;
    const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) { event.preventDefault(); modal.focus(); return; }
    const first = focusable[0]; const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.addEventListener('focusin', event => {
  document.body.classList.toggle('input-focused', event.target instanceof HTMLElement && event.target.matches('input, textarea, select, [contenteditable="true"]'));
  if (event.target === els.search) positionGlobalSearchResults();
});
document.addEventListener('focusout', () => requestAnimationFrame(() => {
  const active = document.activeElement;
  document.body.classList.toggle('input-focused', active instanceof HTMLElement && active.matches('input, textarea, select, [contenteditable="true"]'));
}));
window.addEventListener('resize', () => { syncInteractionIsolation(); positionGlobalSearchResults(); updateCompareTrayClearance(); });
window.visualViewport?.addEventListener('resize', positionGlobalSearchResults);
if ('ResizeObserver' in window && els.compareTray) new ResizeObserver(updateCompareTrayClearance).observe(els.compareTray);

document.querySelector('#rosterCount').textContent = roster.length;
document.querySelector('#mechanicsCount').textContent = CHAMPIONS_MECHANICS.length;
document.querySelector('#heatmapCount').textContent = roster.length + megaRoster.length;
document.querySelector('#moveCount').textContent = Object.keys(CHAMPIONS_REFERENCE_MOVE_META || {}).length;
document.querySelector('#abilityCount').textContent = Object.keys(CHAMPIONS_REFERENCE_ABILITY_META || {}).length;
document.querySelector('#itemCount').textContent = CHAMPIONS_ITEMS.length;
document.querySelector('#termCount').textContent = ChampionsKnowledge.allTerms().length;
document.querySelector('#metricRoster').textContent = roster.length;
document.querySelector('#metricMega').textContent = roster.filter(p => p.megaCapable).length;
initTypes();
document.body.insertAdjacentHTML('beforeend', `<datalist id="itemOptions">${CHAMPIONS_ITEMS.filter(item => item.category !== 'Inventory / recruiting').map(item => `<option value="${escapeHtml(item.name)}"></option>`).join('')}</datalist>`);
for (const category of [...new Set(CHAMPIONS_ITEMS.map(item => item.category))].sort()) els.itemCategory?.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`);
for (const category of [...new Set(ChampionsKnowledge.allTerms().map(term => term.category))].sort()) els.glossaryCategory?.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`);
initMechanics();
restoreMoveIndex();
saveWatchlist();
saveTeam();
renderTeam();
renderAbilityExplorer();
renderDataCenter();
renderGrid();
renderRecent();
renderCompareTray();
syncInteractionIsolation();
positionGlobalSearchResults();
if (storageRecoveryNeeded) showNotice('Some saved local data was invalid and has been safely reset. The Dex is ready to use.', 'warning');

const deepLink = new URLSearchParams(window.location.search);
const deepView = ['roster','mechanics','heatmap','watchlist','compare','team','teamcodes','moves','abilities','items','glossary','intel','data'].includes(deepLink.get('view')) ? deepLink.get('view') : null;
if (deepLink.get('view') === 'team-codes') setView('teamcodes', { historyMode:'replace' });
if (deepView) setView(deepView, { historyMode:'replace' });
if (deepLink.get('move')) {
  setView('moves', { historyMode:'replace' });
  if (els.moveExplorerInput) els.moveExplorerInput.value = deepLink.get('move');
  renderMoveExplorer(deepLink.get('move'));
}
if (deepLink.get('pokemon')) {
  const wanted = normalizeMove(deepLink.get('pokemon'));
  const target = [...roster, ...megaRoster].find(p => normalizeMove(p.name) === wanted || normalizeMove(p.display) === wanted);
  if (target) openDetail(target, { historyMode:'none' });
}
history.replaceState({ view: state.view, ...(state.detail ? { overlay:'detail' } : {}) }, '', window.location.href);

window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  const view = ['roster','mechanics','heatmap','watchlist','compare','team','teamcodes','moves','abilities','items','glossary','intel','data'].includes(params.get('view')) ? params.get('view') : 'roster';
  if (state.view !== view) setView(view, { historyMode:'none' });
  const pokemon = params.get('pokemon');
  if (!pokemon && els.panel.classList.contains('open')) closeDetail({ syncHistory:false });
  else if (pokemon) {
    const wanted = normalizeMove(pokemon);
    const target = [...roster, ...megaRoster].find(p => normalizeMove(p.name) === wanted || normalizeMove(p.display) === wanted);
    if (target && keyOf(state.detail || {}) !== keyOf(target)) openDetail(target, { historyMode:'none' });
  }
});


// ---------- In-app update awareness (web layer) ----------
// Fetches a tiny public manifest; any failure is silent. A newer version only
// surfaces a dismissible banner — installing an APK still needs the user's tap.
function versionParts(value) {
  return String(value || '').replace(/^v/i, '').split('.').map(part => Number.parseInt(part, 10) || 0);
}
function isNewerVersion(latest, current) {
  const a = versionParts(latest); const b = versionParts(current);
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return false;
}
let appUpdateCheckedAt = 0;
async function checkForAppUpdate(force = false) {
  const now = Date.now();
  if (!force && now - appUpdateCheckedAt < 10 * 60 * 1000) return;
  appUpdateCheckedAt = now;
  const status = document.querySelector('#appUpdateStatus');
  try {
    const manifest = await tcFetchJson(APP_VERSION_MANIFEST_URL, 5000);
    if (!manifest || !manifest.latestVersion) throw new Error('No version manifest');
    const latest = String(manifest.latestVersion).replace(/^v/i, '');
    if (status) status.textContent = isNewerVersion(latest, CHAMPIONS_APP_VERSION)
      ? `Update available: v${latest} (you have v${CHAMPIONS_APP_VERSION}). Open the release to download the new APK, then tap the file to install.`
      : `You are on the latest version (v${CHAMPIONS_APP_VERSION}). Web content also refreshes itself automatically when you are online.`;
    let dismissed = '';
    try { dismissed = localStorage.getItem('champions-update-dismissed') || ''; } catch { dismissed = ''; }
    if (isNewerVersion(latest, CHAMPIONS_APP_VERSION) && dismissed !== latest) {
      const banner = document.querySelector('#updateBanner');
      const text = document.querySelector('#updateBannerText');
      const link = document.querySelector('#updateBannerLink');
      if (text) text.textContent = `Update available v${latest}${manifest.notes ? ` — ${String(manifest.notes).slice(0, 140)}` : ''}`;
      if (link && manifest.releaseUrl) link.href = manifest.releaseUrl;
      if (banner) banner.hidden = false;
    }
  } catch {
    if (status) status.textContent = `App version v${CHAMPIONS_APP_VERSION}. Update check needs an internet connection; the Pokédex itself works fully offline.`;
  }
}
document.querySelector('#updateBannerDismiss')?.addEventListener('click', () => {
  const banner = document.querySelector('#updateBanner');
  if (banner) banner.hidden = true;
  const text = document.querySelector('#updateBannerText')?.textContent || '';
  const match = text.match(/v(\d+\.\d+\.\d+)/);
  try { if (match) localStorage.setItem('champions-update-dismissed', match[1]); } catch { /* storage optional */ }
});
checkForAppUpdate();

// Progressive Web App support. The full interface remains available in a
// normal browser; installation is offered only when the browser confirms it.
let installPrompt = null;
const installButton = document.querySelector('#installButton');
const dataStatus = document.querySelector('#dataStatus');
const dataStatusText = document.querySelector('#dataStatusText');

function isStandaloneApp() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function updateConnectionState() {
  const online = navigator.onLine;
  dataStatus?.classList.toggle('offline', !online);
  if (dataStatusText) dataStatusText.textContent = online ? 'Online · update checks ready' : 'Offline · bundled data ready';
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event;
  if (!isStandaloneApp()) installButton.hidden = false;
});

installButton?.addEventListener('click', async () => {
  if (!installPrompt) return;
  installButton.disabled = true;
  await installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
  installButton.disabled = false;
});

window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installButton.hidden = true;
});
window.addEventListener('online', updateConnectionState);
window.addEventListener('offline', updateConnectionState);
updateConnectionState();

if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => showNotice('Offline installation could not be initialized on this browser.', 'warning')));
}

window.handleChampionsBack = () => {
  if (els.knowledgeSheet?.classList.contains('open')) { closeKnowledge(); return true; }
  if (document.body.classList.contains('panel-open')) { requestCloseDetail(); return true; }
  if (document.body.classList.contains('menu-open')) { toggleMobileMenu(false); return true; }
  if (state.view !== 'roster') { setView('roster'); return true; }
  return false;
};
