// Optional verified learnsets can be added here as Champions publishes or confirms them.
// Empty means the app must label its PokéAPI move references as unverified.
const CHAMPIONS_MOVE_DATA = {};
const CHAMPIONS_MEGA_DATA = {};

function addChampionsMega(slug, display, types, stats, ability, description, source) {
  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  CHAMPIONS_MEGA_DATA[slug] = {
    slug,
    display,
    types,
    stats: Object.fromEntries(statNames.map((name, index) => [name, stats[index]])),
    abilities: [{ name: ability, hidden: false, description }],
    source
  };
}

addChampionsMega('raichu-mega-x', 'Mega Raichu X', ['electric'], [60,135,95,90,95,110], 'electric-surge', 'Creates Electric Terrain when the Pokémon enters battle.', 'https://pokebase.app/pokemon-champions/pokemon/raichu-mega-x');
addChampionsMega('raichu-mega-y', 'Mega Raichu Y', ['electric'], [60,100,55,160,80,130], 'no-guard', 'Moves used by or against this Pokémon cannot miss.', 'https://pokebase.app/pokemon-champions/pokemon/raichu-mega-y');
addChampionsMega('clefable-mega', 'Mega Clefable', ['fairy','flying'], [95,80,93,135,110,70], 'magic-bounce', 'Reflects many non-damaging moves back at the user.', 'https://pokebase.app/pokemon-champions/pokemon/clefable-mega');
addChampionsMega('victreebel-mega', 'Mega Victreebel', ['grass','poison'], [80,125,85,135,95,70], 'innards-out', 'If knocked out by an attack, damages the attacker by the amount of HP it had before the hit.', 'https://pokebase.app/pokemon-champions/pokemon/victreebel-mega');
addChampionsMega('starmie-mega', 'Mega Starmie', ['water','psychic'], [60,100,105,130,105,120], 'huge-power', 'Doubles this Pokémon’s Attack stat.', 'https://pokebase.app/pokemon-champions/pokemon/starmie-mega');
addChampionsMega('dragonite-mega', 'Mega Dragonite', ['dragon','flying'], [91,124,115,145,125,100], 'multiscale', 'Reduces damage taken while this Pokémon is at full HP.', 'https://pokebase.app/pokemon-champions/pokemon/dragonite-mega');
addChampionsMega('meganium-mega', 'Mega Meganium', ['grass','fairy'], [80,92,115,143,115,80], 'mega-sol', 'Allows applicable moves to behave as though harsh sunlight were active.', 'https://pokebase.app/pokemon-champions/pokemon/meganium-mega');
addChampionsMega('feraligatr-mega', 'Mega Feraligatr', ['water','dragon'], [85,160,125,89,93,78], 'dragonize', 'Changes Normal-type moves into Dragon-type moves and boosts their power.', 'https://pokebase.app/pokemon-champions/pokemon/feraligatr-mega');
addChampionsMega('skarmory-mega', 'Mega Skarmory', ['steel','flying'], [65,140,110,40,100,110], 'stalwart', 'Ignores effects that redirect this Pokémon’s moves.', 'https://pokebase.app/pokemon-champions/pokemon/skarmory-mega');
addChampionsMega('chimecho-mega', 'Mega Chimecho', ['psychic','steel'], [75,50,110,135,120,65], 'levitate', 'Grants immunity to Ground-type moves and grounded entry hazards.', 'https://pokebase.app/pokemon-champions/pokemon/chimecho-mega');
addChampionsMega('staraptor-mega', 'Mega Staraptor', ['fighting','flying'], [85,140,100,60,90,110], 'contrary', 'Reverses stat changes: increases become decreases and decreases become increases.', 'https://pokebase.app/pokemon-champions/pokemon/staraptor-mega');
addChampionsMega('froslass-mega', 'Mega Froslass', ['ice','ghost'], [70,80,70,140,100,120], 'snow-warning', 'Creates snow when the Pokémon enters battle.', 'https://pokebase.app/pokemon-champions/pokemon/froslass-mega');
addChampionsMega('emboar-mega', 'Mega Emboar', ['fire','fighting'], [110,148,75,110,110,75], 'mold-breaker', 'Its moves can ignore opposing Abilities that would otherwise affect them.', 'https://pokebase.app/pokemon-champions/pokemon/emboar-mega');
addChampionsMega('excadrill-mega', 'Mega Excadrill', ['ground','steel'], [110,165,100,65,65,103], 'piercing-drill', 'Contact moves can strike through protection for one quarter of their usual damage.', 'https://pokebase.app/pokemon-champions/pokemon/excadrill-mega');
addChampionsMega('scolipede-mega', 'Mega Scolipede', ['bug','poison'], [60,140,149,75,99,62], 'shell-armor', 'Prevents opposing attacks from landing critical hits.', 'https://pokebase.app/pokemon-champions/pokemon/scolipede-mega');
addChampionsMega('scrafty-mega', 'Mega Scrafty', ['dark','fighting'], [65,130,135,55,135,68], 'intimidate', 'Lowers opposing Pokémon’s Attack when this Pokémon enters battle.', 'https://pokebase.app/pokemon-champions/pokemon/scrafty-mega');
addChampionsMega('eelektross-mega', 'Mega Eelektross', ['electric'], [85,145,80,135,90,80], 'eelevate', 'Makes the Pokémon airborne; after it knocks out a target, its highest stat rises by one stage.', 'https://pokebase.app/pokemon-champions/pokemon/eelektross-mega');
addChampionsMega('chandelure-mega', 'Mega Chandelure', ['ghost','fire'], [60,75,110,175,110,90], 'infiltrator', 'Ignores opposing barriers and Substitute when attacking.', 'https://pokebase.app/pokemon-champions/pokemon/chandelure-mega');
addChampionsMega('golurk-mega', 'Mega Golurk', ['ground','ghost'], [89,159,105,70,105,55], 'unseen-fist', 'Contact moves can hit targets even while they are protected.', 'https://pokebase.app/pokemon-champions/pokemon/golurk-mega');
addChampionsMega('chesnaught-mega', 'Mega Chesnaught', ['grass','fighting'], [88,137,172,74,115,44], 'bulletproof', 'Protects the Pokémon from ball and bomb moves.', 'https://pokebase.app/pokemon-champions/pokemon/chesnaught-mega');
addChampionsMega('delphox-mega', 'Mega Delphox', ['fire','psychic'], [75,69,72,159,125,134], 'levitate', 'Grants immunity to Ground-type moves and grounded entry hazards.', 'https://pokebase.app/pokemon-champions/pokemon/delphox-mega');
addChampionsMega('greninja-mega', 'Mega Greninja', ['water','dark'], [72,125,77,133,81,142], 'protean', 'Changes the Pokémon’s type to match the move it is about to use, once per switch-in.', 'https://pokebase.app/pokemon-champions/pokemon/greninja-mega');
addChampionsMega('pyroar-mega', 'Mega Pyroar', ['fire','normal'], [86,88,92,129,86,126], 'fire-mane', 'Boosts the power of this Pokémon’s Fire-type moves by 50%.', 'https://pokebase.app/pokemon-champions/pokemon/pyroar-mega');
addChampionsMega('floette-mega', 'Mega Floette', ['fairy'], [74,85,87,155,148,102], 'fairy-aura', 'Boosts the power of Fairy-type moves used by every Pokémon on the field.', 'https://game8.co/games/Pokemon-Champions/archives/592419');
addChampionsMega('meowstic-mega', 'Mega Meowstic (Male)', ['psychic'], [74,48,76,143,101,124], 'trace', 'When this Pokémon enters battle, its Ability changes to match an opponent’s Ability.', 'https://game8.co/games/Pokemon-Champions/archives/592420');
addChampionsMega('malamar-mega', 'Mega Malamar', ['dark','psychic'], [86,102,88,98,120,88], 'contrary', 'Reverses stat changes: increases become decreases and decreases become increases.', 'https://game8.co/games/Pokemon-Champions/archives/605638');
addChampionsMega('barbaracle-mega', 'Mega Barbaracle', ['rock','fighting'], [72,140,130,64,106,88], 'tough-claws', 'Boosts the power of moves that make direct contact.', 'https://pokebase.app/pokemon-champions/pokemon/barbaracle-mega');
addChampionsMega('dragalge-mega', 'Mega Dragalge', ['poison','dragon'], [65,85,105,132,163,44], 'regenerator', 'Restores some HP when this Pokémon is withdrawn from battle.', 'https://pokebase.app/pokemon-champions/pokemon/dragalge-mega');
addChampionsMega('hawlucha-mega', 'Mega Hawlucha', ['fighting','flying'], [78,137,100,74,93,118], 'no-guard', 'Moves used by or against this Pokémon cannot miss.', 'https://pokebase.app/pokemon-champions/pokemon/hawlucha-mega');
addChampionsMega('crabominable-mega', 'Mega Crabominable', ['fighting','ice'], [97,157,122,62,107,33], 'iron-fist', 'Boosts the power of punching moves.', 'https://pokebase.app/pokemon-champions/pokemon/crabominable-mega');
addChampionsMega('drampa-mega', 'Mega Drampa', ['normal','dragon'], [78,85,110,160,116,36], 'berserk', 'Raises Special Attack when damage causes its HP to fall to half or below.', 'https://pokebase.app/pokemon-champions/pokemon/drampa-mega');
addChampionsMega('falinks-mega', 'Mega Falinks', ['fighting'], [65,135,135,70,65,100], 'defiant', 'Sharply raises Attack when an opposing Pokémon lowers one of its stats.', 'https://pokebase.app/pokemon-champions/pokemon/falinks-mega');
addChampionsMega('scovillain-mega', 'Mega Scovillain', ['grass','fire'], [65,138,85,138,85,75], 'spicy-spray', 'Burns an attacker when this Pokémon takes damage from its move.', 'https://pokebase.app/pokemon-champions/pokemon/scovillain-mega');
addChampionsMega('glimmora-mega', 'Mega Glimmora', ['rock','poison'], [83,90,105,150,96,101], 'adaptability', 'Increases the same-type attack bonus from 1.5× to 2×.', 'https://pokebase.app/pokemon-champions/pokemon/glimmora-mega');
addChampionsMega('absol-mega-z', 'Mega Absol Z', ['dark','ghost'], [65,154,60,75,60,151], 'sharpness', 'Boosts the power of slicing moves by 50%.', 'https://www.serebii.net/pokedex-champions/absol/');
addChampionsMega('salamence-mega', 'Mega Salamence', ['dragon','flying'], [95,145,130,120,90,120], 'aerilate', 'Changes Normal-type moves into Flying-type moves and boosts their power by 20%.', 'https://www.serebii.net/pokedex-champions/salamence/');
addChampionsMega('garchomp-mega-z', 'Mega Garchomp Z', ['dragon'], [108,130,85,141,85,151], 'levitate', 'Makes the Pokémon immune to Ground-type moves and grounded entry hazards.', 'https://www.serebii.net/pokedex-champions/garchomp/');
addChampionsMega('lucario-mega-z', 'Mega Lucario Z', ['fighting','steel'], [70,100,70,164,70,151], 'aura-guard', 'Halves damage this Pokémon receives from contact moves.', 'https://www.serebii.net/pokedex-champions/lucario/');
addChampionsMega('golisopod-mega', 'Mega Golisopod', ['bug','steel'], [75,150,175,70,120,40], 'tough-claws', 'Boosts the power of moves that make direct contact by 30%.', 'https://www.serebii.net/pokedex-champions/golisopod/');
addChampionsMega('baxcalibur-mega', 'Mega Baxcalibur', ['dragon','ice'], [115,175,117,105,101,87], 'thermal-exchange', 'Raises Attack by one stage after being hit by a Fire-type move and prevents burns.', 'https://www.serebii.net/pokedex-champions/baxcalibur/');
