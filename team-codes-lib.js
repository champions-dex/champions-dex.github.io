// Champions Dex Team Codes library: pure, DOM-free helpers shared by app.js and Node tests.
// A Replica Team code is exactly 10 alphanumeric characters. Display groups it as XXXXX XXXXX;
// the copied value is always the normalised 10 characters with no space.
const TeamCodesLib = (() => {
  const normalizeTeamCode = value => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const isValidTeamCode = value => /^[A-Z0-9]{10}$/.test(normalizeTeamCode(value));
  const formatTeamCode = value => {
    const code = normalizeTeamCode(value);
    return code.length === 10 ? `${code.slice(0, 5)} ${code.slice(5)}` : code;
  };
  const slugify = value => String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // Canonical key so "Mega Garchomp Z", "Garchomp", "Rotom-Heat" and "Heat Rotom" compare sensibly.
  function speciesKey(value) {
    let name = String(value || '').trim();
    name = name.replace(/^mega\s+/i, '').replace(/\s+(x|y|z)$/i, '');
    let key = slugify(name);
    if (key.startsWith('rotom-')) key = `${key.slice('rotom-'.length)}-rotom`;
    if (key.endsWith('-hisui')) key = `hisuian-${key.slice(0, -'-hisui'.length)}`;
    if (key.endsWith('-alola')) key = `alolan-${key.slice(0, -'-alola'.length)}`;
    if (key.endsWith('-galar')) key = `galarian-${key.slice(0, -'-galar'.length)}`;
    // Gender/form suffixes that the roster splits but sources often omit or spell differently.
    key = key.replace(/^(indeedee|basculegion|meowstic)-(f|m|female|male)$/, '$1');
    key = key.replace(/-(eternal|masterpiece|teatime)$/, '');
    key = key.replace(/-(f|m|female|male)$/, '');
    return key;
  }

  const itemKey = value => slugify(value);

  // Full set = Tier A with a published held item for every member (see validateDataset).
  function isFullSetTeam(team) {
    return Boolean(team && team.dataTier === 'A' && Array.isArray(team.members) && team.members.length > 0
      && team.members.every(member => member && member.item));
  }

  function memberForSelection(team, selection) {
    const wanted = speciesKey(selection && selection.species);
    if (!wanted) return null;
    return (team.members || []).find(member => speciesKey(member.species) === wanted) || null;
  }

  // Returns 'match' | 'unknown' | 'miss'. Unknown = Pokémon present, held item not published.
  function selectionState(team, selection) {
    const member = memberForSelection(team, selection);
    if (!member) return 'miss';
    if (!selection.item) return 'match';
    if (!member.item) return 'unknown';
    return itemKey(member.item) === itemKey(selection.item) ? 'match' : 'miss';
  }

  function teamDate(team) {
    return (team.event && team.event.date) || team.firstSeen || team.lastSeen || '';
  }

  function filterTeams(teams, options = {}) {
    const selections = Array.isArray(options.selected) ? options.selected.filter(item => item && item.species) : [];
    const mode = options.mode === 'OR' ? 'OR' : 'AND';
    const includeUnknownItems = Boolean(options.includeUnknownItems);
    const hasItemConstraint = selections.some(item => item.item);
    const search = String(options.search || '').trim().toLowerCase();
    const favorites = options.favorites instanceof Set ? options.favorites : new Set(options.favorites || []);
    let hiddenByUnknownItems = 0;
    let hiddenByUnpublishedItems = 0;

    const visible = (Array.isArray(teams) ? teams : []).filter(team => {
      if (!team || !isValidTeamCode(team.code)) return false;
      if (options.favoritesOnly && !favorites.has(normalizeTeamCode(team.code))) return false;
      if (options.regulation && options.regulation !== 'all') {
        const wanted = options.regulation === 'current' ? (options.currentRegulation || 'M-C') : options.regulation;
        if (String(team.regulation || '') !== wanted) return false;
      }
      if (options.format && options.format !== 'all' && String(team.format || '') !== options.format) return false;
      if (search) {
        const haystack = [team.code, team.title, team.creator, team.event && team.event.name, team.event && team.event.placing,
          ...(team.members || []).flatMap(member => [member.species, member.item, member.ability])].filter(Boolean).join(' ').toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      // Only-published gate runs before the item-constraint check so a Tier B/C team is
      // counted once here and never double-counted in hiddenByUnknownItems below.
      if (options.onlyPublishedItems && !isFullSetTeam(team)) { hiddenByUnpublishedItems += 1; return false; }
      if (!selections.length) return true;
      const states = selections.map(selection => selectionState(team, selection));
      if (mode === 'OR') {
        if (states.includes('match')) return true;
        if (hasItemConstraint && states.includes('unknown')) {
          if (includeUnknownItems) return true;
          hiddenByUnknownItems += 1;
        }
        return false;
      }
      if (states.every(state => state === 'match')) return true;
      // Strict-by-default: a team that has the Pokémon but an unpublished item is hidden, and counted.
      if (hasItemConstraint && states.every(state => state !== 'miss') && states.includes('unknown')) {
        if (includeUnknownItems) return true;
        hiddenByUnknownItems += 1;
      }
      return false;
    });

    const sort = options.sort || 'fullsets';
    const sorted = [...visible].sort((a, b) => {
      if (sort === 'fullsets') {
        const tierOrder = Number(isFullSetTeam(b)) - Number(isFullSetTeam(a));
        if (tierOrder) return tierOrder;
        return teamDate(b).localeCompare(teamDate(a));
      }
      if (sort === 'oldest') return teamDate(a).localeCompare(teamDate(b));
      if (sort === 'creator') return String(a.creator || a.title || '').localeCompare(String(b.creator || b.title || ''));
      return teamDate(b).localeCompare(teamDate(a));
    });
    return { visible: sorted, hiddenByUnknownItems, hiddenByUnpublishedItems };
  }

  function validateDataset(payload) {
    if (!payload || !Array.isArray(payload.teams)) return { valid: false, issues: ['teams array missing'] };
    const issues = [];
    const seen = new Set();
    payload.teams.forEach((team, index) => {
      if (!isValidTeamCode(team.code)) issues.push(`team ${index}: invalid code ${team.code}`);
      const code = normalizeTeamCode(team.code);
      if (seen.has(code)) issues.push(`duplicate code ${code}`);
      seen.add(code);
      if (!Array.isArray(team.members) || team.members.length !== 6) issues.push(`team ${code}: expected 6 members`);
      (team.members || []).forEach(member => { if (!member.species) issues.push(`team ${code}: member without species`); });
      if (!['A', 'B', 'C'].includes(team.dataTier)) issues.push(`team ${code}: invalid dataTier ${team.dataTier}`);
      if (team.dataTier === 'A' && (team.members || []).some(member => !member.item)) issues.push(`team ${code}: Tier A team missing an item`);
    });
    return { valid: issues.length === 0, issues };
  }

  return Object.freeze({ normalizeTeamCode, isValidTeamCode, formatTeamCode, slugify, speciesKey, itemKey, memberForSelection, selectionState, filterTeams, validateDataset, teamDate, isFullSetTeam });
})();

if (typeof module === 'object' && module.exports) module.exports = TeamCodesLib;
