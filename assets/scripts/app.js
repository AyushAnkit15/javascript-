
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 21;
const STRONG__ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK' ; 
const MODE_STRONG_ATTACK = 'STRONG_ATTACK' ; 

 const enteredValue =  prompt('max life daal'  , '');

 let chosenMaxlife = parseInt(enteredValue);
 if(isNaN(chosenMaxlife || chosenMaxlife <= 0)){
    chosenMaxlife  = 100 ; 
 }
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
adjustHealthBars(chosenMaxlife);
function reset() {
  currentMonsterHealth = chosenMaxlife;
  currentPlayerHealth = chosenMaxlife;
  resetGame(chosenMaxlife);
}
let maxDamage;
function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  let hasBonusLife = true;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("bach gaya bsdk ");
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won ");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("draw");
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}
function attackMonster(mode) {
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG__ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}
function attackHandler() {
  attackMonster("ATTACK");
}
function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxlife - HEAL_VALUE) {
    alert("can't heal than max");
    healValue = chosenMaxlife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
