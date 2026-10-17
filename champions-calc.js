(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ChampionsCalc = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const STAT_NAMES = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  const NEUTRAL_POINTS = Object.freeze(Object.fromEntries(STAT_NAMES.map(name => [name, 0])));

  const PRESETS = Object.freeze({
    base: { label: 'Basic stats · 0 SP', points: { ...NEUTRAL_POINTS }, up: null, down: null, note: 'The original Level 50 values before the player assigns any of the 66 Stat Points.' },
    'fast-physical': { label: 'Fast physical · 32 Atk / 32 Spe / 2 HP', points: { ...NEUTRAL_POINTS, hp: 2, attack: 32, speed: 32 }, up: 'speed', down: 'special-attack', note: 'Universal fast physical attacker preset.' },
    'strong-physical': { label: 'Strong physical · 32 Atk / 32 Spe / 2 HP', points: { ...NEUTRAL_POINTS, hp: 2, attack: 32, speed: 32 }, up: 'attack', down: 'special-attack', note: 'Universal maximum physical damage preset.' },
    'fast-special': { label: 'Fast special · 32 SpA / 32 Spe / 2 HP', points: { ...NEUTRAL_POINTS, hp: 2, 'special-attack': 32, speed: 32 }, up: 'speed', down: 'attack', note: 'Universal fast special attacker preset.' },
    'strong-special': { label: 'Strong special · 32 SpA / 32 Spe / 2 HP', points: { ...NEUTRAL_POINTS, hp: 2, 'special-attack': 32, speed: 32 }, up: 'special-attack', down: 'attack', note: 'Universal maximum special damage preset.' },
    'physical-bulk': { label: 'Physical bulk · 32 HP / 32 Def / 2 SpD', points: { ...NEUTRAL_POINTS, hp: 32, defense: 32, 'special-defense': 2 }, up: 'defense', down: 'special-attack', note: 'Universal physically defensive preset.' },
    'special-bulk': { label: 'Special bulk · 32 HP / 32 SpD / 2 Def', points: { ...NEUTRAL_POINTS, hp: 32, defense: 2, 'special-defense': 32 }, up: 'special-defense', down: 'attack', note: 'Universal specially defensive preset.' },
    'balanced-bulk': { label: 'Balanced bulk · 32 HP / 17 Def / 17 SpD', points: { ...NEUTRAL_POINTS, hp: 32, defense: 17, 'special-defense': 17 }, up: null, down: null, note: 'Universal neutral balanced-bulk preset.' },
    'max-hp': { label: 'Maximum HP · 32 HP', points: { ...NEUTRAL_POINTS, hp: 32 }, up: null, down: null, note: 'Shows the direct effect of maximum HP investment.' },
    'max-speed': { label: 'Maximum Speed · 32 Spe', points: { ...NEUTRAL_POINTS, speed: 32 }, up: 'speed', down: 'special-attack', note: 'Universal maximum-Speed benchmark.' }
  });

  const TYPE_CHART = Object.freeze({
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
    fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
  });

  function baseStatsFromPokemon(pokemon) {
    return Object.fromEntries((pokemon?.stats || []).map(item => [item.stat.name, Number(item.base_stat) || 0]));
  }

  function validateSpread(points) {
    const normalized = Object.fromEntries(STAT_NAMES.map(name => [name, Math.max(0, Math.min(32, Math.floor(Number(points?.[name]) || 0)))]));
    const total = STAT_NAMES.reduce((sum, name) => sum + normalized[name], 0);
    return { points: normalized, total, valid: total <= 66, remaining: Math.max(0, 66 - total) };
  }

  function alignmentFor(stat, up, down) {
    if (stat === up) return 1.1;
    if (stat === down) return 0.9;
    return 1;
  }

  function calculateStats(baseStats, configuration = PRESETS.base) {
    const spread = validateSpread(configuration.points || NEUTRAL_POINTS);
    const result = {};
    STAT_NAMES.forEach(stat => {
      const base = Number(baseStats?.[stat]) || 0;
      const point = spread.points[stat];
      result[stat] = stat === 'hp'
        ? base + point + 75
        : Math.floor((base + point + 20) * alignmentFor(stat, configuration.up, configuration.down));
    });
    return { stats: result, spread, up: configuration.up || null, down: configuration.down || null };
  }

  function typeEffectiveness(moveType, defenderTypes) {
    return (defenderTypes || []).reduce((value, type) => value * (TYPE_CHART[moveType]?.[type] ?? 1), 1);
  }

  function fraction(value, numerator, denominator) {
    return Math.max(1, Math.floor(value * numerator / denominator));
  }

  function abilityKey(value) {
    return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  }

  function stageMultiplier(stage) {
    const value = Math.max(-6, Math.min(6, Math.trunc(Number(stage) || 0)));
    return value >= 0 ? (2 + value) / 2 : 2 / (2 - value);
  }

  function calculateDamage(options) {
    const move = options.move || {};
    const category = move.damage_class;
    const power = Number(move.power);
    if (!['physical', 'special'].includes(category)) return { available: false, reason: 'Status moves do not deal direct formula damage.' };
    if (!(power > 0)) return { available: false, reason: 'This move has variable or fixed damage and needs a move-specific Champions rule.' };
    if (Number(move.max_hits) > 1 || Array.isArray(move.multiHit)) return { available: false, reason: 'Multi-hit damage needs hit-count selection and is withheld until that Champions-specific sequence is modeled.' };

    const attackerBuild = calculateStats(options.attackerBase, options.attackerConfig || PRESETS.base);
    const defenderBuild = calculateStats(options.defenderBase, options.defenderConfig || PRESETS.base);
    const attackerStats = { ...attackerBuild.stats };
    const defenderStats = { ...defenderBuild.stats };
    const attackerAbility = abilityKey(options.attackerAbility);
    const defenderAbility = abilityKey(options.defenderAbility);
    const item = options.attackerItem || 'none';
    const defenderItem = options.defenderItem || 'none';
    const notes = [];
    const breakdown = [];
    let moveType = move.type;
    let movePower = power;
    let attackStat = category === 'physical' ? 'attack' : 'special-attack';
    let defenseStat = category === 'physical' ? 'defense' : 'special-defense';

    if (options.weather === 'none') {
      const weatherSetter = [attackerAbility, defenderAbility].find(ability => ['drought','drizzle','sand-stream','snow-warning'].includes(ability));
      if (weatherSetter) {
        options = { ...options, weather: ({ drought:'sun', drizzle:'rain', 'sand-stream':'sand', 'snow-warning':'snow' })[weatherSetter] };
        notes.push(`${weatherSetter.replace(/-/g, ' ')} automatically set ${options.weather} for this calculation.`);
      }
    }

    if (abilityKey(move.name) === 'body-press') attackStat = 'defense';
    if (abilityKey(move.name) === 'foul-play') {
      attackerStats.attack = defenderStats.attack;
      attackStat = 'attack';
      notes.push('Foul Play uses the defender’s calculated Attack.');
    }
    if (['psyshock', 'psystrike', 'secret-sword'].includes(abilityKey(move.name))) defenseStat = 'defense';
    if (abilityKey(move.name) === 'facade' && options.attackerStatus !== 'none') movePower *= 2;
    if (attackerAbility === 'dragonize' && moveType === 'normal') {
      moveType = 'dragon';
      movePower = Math.floor(movePower * 1.2);
      notes.push('Dragonize changed the move to Dragon type and applied its Champions 1.2× power boost.');
    }

    const rawAttackStage = Number(options.attackerStage) || 0;
    const rawDefenseStage = Number(options.defenderStage) || 0;
    const attackStage = options.critical && rawAttackStage < 0 ? 0 : rawAttackStage;
    const defenseStage = options.critical && rawDefenseStage > 0 ? 0 : rawDefenseStage;
    attackerStats[attackStat] = Math.floor(attackerStats[attackStat] * stageMultiplier(attackStage));
    defenderStats[defenseStat] = Math.floor(defenderStats[defenseStat] * stageMultiplier(defenseStage));
    breakdown.push({ label:'Attacking stat stage', value:`${rawAttackStage > 0 ? '+' : ''}${rawAttackStage} → ×${stageMultiplier(attackStage).toFixed(3)}${attackStage !== rawAttackStage ? ' (ignored by critical hit)' : ''}` });
    breakdown.push({ label:'Defending stat stage', value:`${rawDefenseStage > 0 ? '+' : ''}${rawDefenseStage} → ×${stageMultiplier(defenseStage).toFixed(3)}${defenseStage !== rawDefenseStage ? ' (ignored by critical hit)' : ''}` });

    if (['huge-power', 'pure-power'].includes(attackerAbility) && attackStat === 'attack') attackerStats.attack *= 2;
    if (attackerAbility === 'guts' && options.attackerStatus !== 'none' && attackStat === 'attack') attackerStats.attack = Math.floor(attackerStats.attack * 1.5);
    if (['hustle', 'gorilla-tactics'].includes(attackerAbility) && attackStat === 'attack') attackerStats.attack = Math.floor(attackerStats.attack * 1.5);
    if (attackerAbility === 'orichalcum-pulse' && options.weather === 'sun' && attackStat === 'attack') attackerStats.attack = Math.floor(attackerStats.attack * 4 / 3);
    if (attackerAbility === 'hadron-engine' && options.terrain === 'electric' && attackStat === 'special-attack') attackerStats['special-attack'] = Math.floor(attackerStats['special-attack'] * 4 / 3);
    if (attackerAbility === 'solar-power' && options.weather === 'sun' && attackStat === 'special-attack') attackerStats['special-attack'] = Math.floor(attackerStats['special-attack'] * 1.5);
    if (defenderAbility === 'fur-coat' && defenseStat === 'defense') defenderStats.defense *= 2;
    if (defenderAbility === 'marvel-scale' && options.defenderStatus !== 'none' && defenseStat === 'defense') defenderStats.defense = Math.floor(defenderStats.defense * 1.5);
    if (defenderAbility === 'ice-scales' && defenseStat === 'special-defense') defenderStats['special-defense'] *= 2;

    if (options.weather === 'snow' && (options.defenderTypes || []).includes('ice') && defenseStat === 'defense') defenderStats.defense = Math.floor(defenderStats.defense * 1.5);
    if (options.weather === 'sand' && (options.defenderTypes || []).includes('rock') && defenseStat === 'special-defense') defenderStats['special-defense'] = Math.floor(defenderStats['special-defense'] * 1.5);

    let effectiveness = typeEffectiveness(moveType, options.defenderTypes);
    if (effectiveness === 0) return { available: true, immune: true, min: 0, max: 0, rolls: [0], percentMin: 0, percentMax: 0, effectiveness, attackerStats, defenderStats, notes };

    const hp = defenderStats.hp;
    let base = Math.floor(Math.floor(Math.floor((22 * movePower * attackerStats[attackStat]) / Math.max(1, defenderStats[defenseStat])) / 50) + 2);
    const applyCommon = (damage, randomRoll) => {
      let value = damage;
      if (options.spread) value = fraction(value, 3, 4);
      if (options.weather === 'sun' && moveType === 'fire') value = fraction(value, 3, 2);
      if (options.weather === 'sun' && moveType === 'water') value = fraction(value, 1, 2);
      if (options.weather === 'rain' && moveType === 'water') value = fraction(value, 3, 2);
      if (options.weather === 'rain' && moveType === 'fire') value = fraction(value, 1, 2);
      if (options.critical) value = fraction(value, 3, 2);
      value = fraction(value, randomRoll, 100);

      const hasType = (options.attackerTypes || []).includes(moveType);
      const stab = hasType ? (attackerAbility === 'adaptability' ? 2 : 1.5) : 1;
      if (stab === 2) value = fraction(value, 2, 1);
      else if (stab === 1.5) value = fraction(value, 3, 2);

      if (effectiveness === 4) value = fraction(value, 4, 1);
      else if (effectiveness === 2) value = fraction(value, 2, 1);
      else if (effectiveness === 0.5) value = fraction(value, 1, 2);
      else if (effectiveness === 0.25) value = fraction(value, 1, 4);

      if (category === 'physical' && options.attackerStatus === 'burn' && attackerAbility !== 'guts' && abilityKey(move.name) !== 'facade') value = fraction(value, 1, 2);
      if (options.terrain === 'electric' && moveType === 'electric' && options.attackerGrounded) value = fraction(value, 13, 10);
      if (options.terrain === 'grassy' && moveType === 'grass' && options.attackerGrounded) value = fraction(value, 13, 10);
      if (options.terrain === 'psychic' && moveType === 'psychic' && options.attackerGrounded) value = fraction(value, 13, 10);
      if (options.terrain === 'misty' && moveType === 'dragon' && options.defenderGrounded) value = fraction(value, 1, 2);
      if (item === 'life-orb') value = fraction(value, 13, 10);
      if ((item === 'muscle-band' && category === 'physical') || (item === 'wise-glasses' && category === 'special')) value = fraction(value, 11, 10);
      if (item === 'type-boost') value = fraction(value, 6, 5);
      if (item === 'expert-belt' && effectiveness > 1) value = fraction(value, 6, 5);
      if (defenderItem === 'resist-berry' && effectiveness > 1) value = fraction(value, 1, 2);

      if (['transistor', 'dragons-maw'].includes(attackerAbility) && ((attackerAbility === 'transistor' && moveType === 'electric') || moveType === 'dragon')) value = fraction(value, 13, 10);
      if (['steelworker', 'rocky-payload', 'steely-spirit'].includes(attackerAbility) && ((attackerAbility !== 'rocky-payload' && moveType === 'steel') || (attackerAbility === 'rocky-payload' && moveType === 'rock'))) value = fraction(value, 3, 2);
      if (attackerAbility === 'fire-mane' && moveType === 'fire') value = fraction(value, 3, 2);
      if (attackerAbility === 'tough-claws' && options.contact) value = fraction(value, 13, 10);
      if (attackerAbility === 'tinted-lens' && effectiveness < 1) value = fraction(value, 2, 1);
      if (defenderAbility === 'thick-fat' && ['fire', 'ice'].includes(moveType)) value = fraction(value, 1, 2);
      if (['filter', 'solid-rock', 'prism-armor'].includes(defenderAbility) && effectiveness > 1) value = fraction(value, 3, 4);
      if (['multiscale', 'shadow-shield'].includes(defenderAbility) && options.defenderFullHp) value = fraction(value, 1, 2);
      if (defenderAbility === 'fluffy') {
        if (options.contact) value = fraction(value, 1, 2);
        if (moveType === 'fire') value = fraction(value, 2, 1);
      }
      if (options.friendGuard) value = fraction(value, 3, 4);
      const screenMatches = options.screen === 'aurora-veil' || (options.screen === 'reflect' && category === 'physical') || (options.screen === 'light-screen' && category === 'special');
      if (screenMatches && !options.critical) value = options.format === 'doubles' ? fraction(value, 2, 3) : fraction(value, 1, 2);
      if (defenderItem === 'focus-sash' && options.defenderFullHp && value >= hp) value = Math.max(1, hp - 1);
      return Math.max(1, value);
    };

    const rolls = [];
    for (let roll = 86; roll <= 100; roll += 1) rolls.push(applyCommon(base, roll));
    const min = Math.min(...rolls);
    const max = Math.max(...rolls);
    const rollProbabilities = [...new Set(rolls)].map(damage => ({ damage, chance: Number((rolls.filter(value => value === damage).length / rolls.length * 100).toFixed(1)) }));
    const unknownAbilities = [];
    const modeled = new Set(['', 'none', 'adaptability', 'huge-power', 'pure-power', 'guts', 'hustle', 'gorilla-tactics', 'orichalcum-pulse', 'hadron-engine', 'solar-power', 'tough-claws', 'drought', 'drizzle', 'sand-stream', 'snow-warning', 'transistor', 'dragons-maw', 'steelworker', 'rocky-payload', 'steely-spirit', 'fire-mane', 'tinted-lens', 'fur-coat', 'marvel-scale', 'ice-scales', 'thick-fat', 'filter', 'solid-rock', 'prism-armor', 'multiscale', 'shadow-shield', 'fluffy', 'dragonize']);
    if (!modeled.has(attackerAbility)) unknownAbilities.push(`Attacker Ability ${attackerAbility || 'none'} has no modeled direct modifier.`);
    if (!modeled.has(defenderAbility)) unknownAbilities.push(`Defender Ability ${defenderAbility || 'none'} has no modeled direct modifier.`);
    return {
      available: true,
      immune: false,
      min,
      max,
      rolls,
      rollProbabilities,
      percentMin: hp ? min / hp * 100 : 0,
      percentMax: hp ? max / hp * 100 : 0,
      effectiveness,
      attackerStats,
      defenderStats,
      hp,
      attackStat,
      defenseStat,
      moveType,
      movePower,
      breakdown: [
        { label:'Champions default stats', value:`${attackStat} ${attackerStats[attackStat]} vs ${defenseStat} ${defenderStats[defenseStat]} · defender HP ${hp}` },
        { label:'Base damage before modifiers', value:String(base) },
        { label:'Move', value:`${movePower} power · ${moveType} · ${category}` },
        { label:'Type effectiveness', value:`×${effectiveness}` },
        { label:'Random factor', value:'15 equally likely rolls from 86% through 100%' },
        ...breakdown
      ],
      notes: notes.concat(unknownAbilities),
      ko: defenderItem === 'focus-sash' && options.defenderFullHp && max === hp - 1 ? 'OHKO prevented by intact Focus Sash' : min >= hp ? 'Guaranteed OHKO' : max >= hp ? 'Possible OHKO' : min * 2 >= hp ? 'Guaranteed 2HKO' : max * 2 >= hp ? 'Possible 2HKO' : 'Not a 2HKO before recovery'
    };
  }

  return { STAT_NAMES, PRESETS, TYPE_CHART, baseStatsFromPokemon, validateSpread, calculateStats, typeEffectiveness, stageMultiplier, calculateDamage };
});
