//BRONNEN
//Achtergrond: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fiverr.com%2Fpikatchoum%2Fdraw-a-pixel-pokemon-battle-background&psig=AOvVaw1hI2aVKPT2EQ2_suiHgDJu&ust=1748801012097000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDQ4sqlzo0DFQAAAAAdAAAAABAE
//Charizard: https://www.google.com/url?sa=i&url=https%3A%2F%2Fdeathbattle.fandom.com%2Ff%2Ft%2FCharizard&psig=AOvVaw0FssbSoVTwwk8KdksSwpV5&ust=1748801388987000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLiKvP-mzo0DFQAAAAAdAAAAABAV 
//Zoryu: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.artstation.com%2Fartwork%2FBXLZP6&psig=AOvVaw2GCyPY8cBDL5NPXf-Rl0qk&ust=1748801370200000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLi_8vWmzo0DFQAAAAAdAAAAABAE
//Pokéball Fav-icon: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiTTRRJw_pokeball-hd-pokeball-pixel-art-hd-png-download%2F&psig=AOvVaw09KXMhYpejmGLyNhlqSUzg&ust=1748801308334000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjspeCmzo0DFQAAAAAdAAAAABAE
//Healthbar: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwhatsticker.online%2Fp%2F329%2FSG&psig=AOvVaw1_6BTYi3YzQlylngmSLejS&ust=1748801278133000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiX38qmzo0DFQAAAAAdAAAAABAE

//ALVAST AANMAKEN VAN VARIABELEN OM LATER AANROEPEN MAKKELIJKER TE MAKEN

//Tekst onderin scherm die verteld wat er gebeurd
const message = document.getElementById('message');

//Maximaal aantal healthpoints voor enemy en player
let enemyHealth = 15;
const maxEnemyHealth = 15;

let playerHealth = 15;
const maxPlayerHealth = 15;

//Healthbars
const hpenemy = document.querySelector("#healthbarenemy");
const hpself = document.querySelector("#healthbarself");

//Attacks
const attackMenu = document.querySelector("#Attacks");
const basicAttack = document.querySelector("#basicattack");
const specialAttack = document.querySelector("#specialattack");
const backAttacksButton = document.querySelector("#BackAttacks");

//Potions
const potionsMenu = document.querySelector("#Potions");
const healButton = document.querySelector("#heal");
const superPotionButton = document.querySelector("#superheal");
const backPotionsButton = document.querySelector("#BackPotions");

//Flee
const fleeButton = document.querySelector("#Flee");

//Beide Pokémons
const charizard = document.querySelector("#charizard");
const zoryu = document.querySelector("#zoryu")

//Array voor de afbeeldingen van de verschillende aantal healthpoints
const hpArray = ['0hp.png', '1hp.png', '2hp.png', '3hp.png', '4hp.png', '5hp.png', '6hp.png', '7hp.png', '8hp.png', '9hp.png', '10hp.png', '11hp.png', '12hp.png', '13hp.png', '14hp.png', '15hp.png'];

//Weergave van de enemy- en player healthbar
function updateEnemyDisplay() {
  hpenemy.src = 'images/' + hpArray[Math.max(0, enemyHealth)];
}

function updatePlayerDisplay() { 
  hpself.src = 'images/' + hpArray[Math.max(0, playerHealth)];
}

//AANVAL ACTIES DIE DE ENEMY UITVOERT TUSSEN BEURTEN IN
function enemyAttackFunction() {
  const damage = Math.floor(Math.random() * 5) + 1; //Damage wordt bepaald door random getal tussen 1 en 5 (Hulp van ChatGPT)
  playerHealth = Math.max(0, playerHealth - damage); //Player health wordt opnieuw bepaald
  updatePlayerDisplay(); //Functie aanhalen die de healthbar van de player update

  hpself.classList.remove('hit-flash'); //Verwijderen van de hit-flash class als deze nog aanwezig was
    void hpself.offsetWidth; //Browser de breedte laten herbereken en vergeten (void) om te laten weten dat er iets is veranderd zodat de class opnieuw toegevoegd kan worden (hulp van ChatGPT)
    hpself.classList.add('hit-flash'); //Toevoegen van de hit-flash class


  message.textContent += ` The enemy attacks! You lose ${damage} HP.`; //Toeveoegen van tekst onderin het scherm met de accurate hoeveelheid damage

  checkPlayerFaint(); //Functie aanroepen die checkt of de player nog genoeg HP heeft om door te spelen, anders stopt het spel
}

//FUNCTIES DIE CHECKEN OF DE ENEMY OF PLAYER DOOD ZIJN

function checkPlayerFaint() {
    if (playerHealth <= 0) { //Checken of de speler minder of precies 0HP heeft, als dit klopt worden de volgende dingen aangeroepen:
        message.textContent = "You fainted! Game over."; //Tekst wordt weergegeven onderin scherm
        zoryu.classList.add('fade-out'); //Class wordt toegevoegd aan de afbeelding van Zoryu, void niet nodig want eerste keer aanroepen
        disableAllButtons(); //Functie wordt aangeroepen zodat alle buttons uit worden gezet
    }
}


function checkEnemyFaint() {
    if (enemyHealth <= 0) { //Checken of de enemy minder of precies 0HP heeft, als dit klopt worden de volgende dingen aangeroepen:
        message.textContent = 'Enemy fainted!'; //Tekst
        charizard.classList.add('fade-out'); //Class toevoegen
        disableAllButtons(); //Functie
    }
}

function disableAllButtons() { //Functie om alle knoppen niet meer werkend te laten maken (Hulp van ChatGPT)
  basicAttack.disabled = true; //Basic attack disable op true zetten zodat dit gebeurt
  specialAttack.disabled = true; //Idem dito voor special attack
  healButton.disabled = true; //Idem dito voor heal button
  superPotionButton.disabled = true; //Idem dito voor super potion button
}

//ACTIES DIE DE PLAYER UIT KAN VOEREN

function attackBasicFunction() {
  if (enemyHealth > 0) { //Checken of de enemy nog niet dood is
    const damage = Math.floor(Math.random() * 2) + 1; //Random getal tussen 1 en 2 om damage te bepalen (Hulp van ChatGPT)
    enemyHealth = Math.max(0, enemyHealth - damage); //Nieuwe enemyhealth wordt berekend door de damage er vanaf te trekken
    updateEnemyDisplay();

    hpenemy.classList.remove('shake', 'hit-flash');
    void hpenemy.offsetWidth;
    hpenemy.classList.add('shake', 'hit-flash');
    

    message.textContent = `Attack hit! You did ${damage} damage.`;
    checkEnemyFaint(); //Functie aanroepen die checkt of de enemy nog leeft of niet

    if (enemyHealth > 0) { //Als de enemy nog niet dood is, gebeurt het volgende:
    setTimeout(enemyAttackFunction, 1000); //enemyAttackFunctuion wordt aangeropen na 1 seconde
        }
    }
}

function attackSpecialFunction() {
  if (enemyHealth > 0) { //Health check
    const damage = Math.floor(Math.random() * 4) + 2; //Random getal voor damage tussen 2 en 4
    enemyHealth = Math.max(0, enemyHealth - damage); //Nieuwe health berekenen
    updateEnemyDisplay();

    hpenemy.classList.remove('shake', 'hit-flash');
    void hpenemy.offsetWidth;
    hpenemy.classList.add('shake', 'hit-flash');

    message.textContent = `Special attack hit! You did ${damage} damage.`;
    checkEnemyFaint();

    if (enemyHealth > 0) {
        setTimeout(enemyAttackFunction, 1000);
  }
}
}

function healFunction() {
  if (playerHealth < maxPlayerHealth) { //Als de health van de player minder is dan de max HP, gebeurt het volgende:
    playerHealth = Math.min(maxPlayerHealth, playerHealth + 4); //Nieuwe player health wordt berkekend door oude health + 4HP te doen
    updatePlayerDisplay();

    message.textContent = 'You used a potion! +4 HP.';

    if (enemyHealth > 0) {
        setTimeout(enemyAttackFunction, 1000);
  }
  }
}

function superpotionFunction() { //Zelfde functie als hiervoor, maar dan met +7HP i.p.v. +4HP
  if (playerHealth < maxPlayerHealth) {
    playerHealth = Math.min(maxPlayerHealth, playerHealth + 7);
    updatePlayerDisplay();

    message.textContent = 'You used a super potion! +7 HP.';

    if (enemyHealth > 0) {
        setTimeout(enemyAttackFunction, 1000);
  }
  }
}


//NAVIGATIE BINNEN MENU OM VERSCHILLENDE KNOPPEN TE LATEN ZIEN 

function revealAttacks() { //Zorgt ervoor dat je alleen de 'Back', 'Basic Attack' en 'Special Attack' button ziet
  basicAttack.classList.remove('hidden'); //Class 'hidden' verwijderen
  specialAttack.classList.remove('hidden'); //Class 'hidden' verwijderen
  potionsMenu.classList.add('hidden'); //Class 'hidden' toevoegen
  attackMenu.classList.add('hidden'); //Class 'hidden' toevoegen
  backAttacksButton.classList.remove('hidden'); //Class 'hidden' verwijderen
  fleeButton.classList.add('hidden'); //Class 'hidden' toevoegen
}

function attacksToMenu() { //Zorgt ervoor dat de attacks weer verborgen worden en je terug gaat naar het basis menu (tegenovergestelde van functie hierboven)
  basicAttack.classList.add('hidden');
  specialAttack.classList.add('hidden');
  potionsMenu.classList.remove('hidden');
  attackMenu.classList.remove('hidden');
  backAttacksButton.classList.add('hidden');
  fleeButton.classList.remove('hidden');
}

function revealPotions() { //Zorgt ervoor dat je alleen de 'Back', 'Heal' en 'Super potion' button ziet
  attackMenu.classList.add('hidden');
  backPotionsButton.classList.remove('hidden');
  fleeButton.classList.add('hidden');
  healButton.classList.remove('hidden');
  superPotionButton.classList.remove('hidden');
  potionsMenu.classList.add('hidden');
}

function potionsToMenu() { //Zorgt ervoor dat de heal functies weer verborgen worden en je terug gaat naar het basis menu (tegenovergestelde van functie hierboven)
  attackMenu.classList.remove('hidden');
  backPotionsButton.classList.add('hidden');
  fleeButton.classList.remove('hidden');
  healButton.classList.add('hidden');
  superPotionButton.classList.add('hidden');
  potionsMenu.classList.remove('hidden');
}

//EVENT LISTENERS OM TE CHECKEN OF EEN KNOP INGEDRUKT WORDT

basicAttack.addEventListener("click", attackBasicFunction); //Roept basic attack funtie aan als basicAttack button wordt gebruikt
specialAttack.addEventListener("click", attackSpecialFunction); //Roept special attack funtie aan als specialAttack button wordt gebruikt
healButton.addEventListener("click", healFunction); //Roept basic heal funtie aan als healButton button wordt gebruikt
superPotionButton.addEventListener("click", superpotionFunction); //Roept super potion funtie aan als superPotionButton button wordt gebruikt
attackMenu.addEventListener("click", revealAttacks); //Roept de functie aan die het attack menu weergeeft als er op de attackMenu knop gedrukt wordt
backAttacksButton.addEventListener("click", attacksToMenu); //Roept de functie aan die het attack menu verbergt als er op de backAttacksMenu knop gedrukt wordt
potionsMenu.addEventListener("click", revealPotions); //Roept de functie aan die het potions menu weergeeft als er op de potionsMenu knop gedrukt wordt
backPotionsButton.addEventListener("click", potionsToMenu); //Roept de functie aan die het potions menu verbergt als er op de backPotionsMenu knop gedrukt wordt







 