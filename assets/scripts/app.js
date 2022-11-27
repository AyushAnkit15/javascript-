const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 21;
const STRONG__ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("max life daal", "");

let chosenMaxlife = parseInt(enteredValue);
let battlelog = [];
if (isNaN(chosenMaxlife || chosenMaxlife <= 0)) {
  chosenMaxlife = 100;
}
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
adjustHealthBars(chosenMaxlife);
function writeToLog(event, value, monsterHealth, playerHealth) {
  logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",

      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: "HEAL",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_GAME_OVER) {
  }
  battlelog.push(logEntry);
}
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
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentMonsterHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("bach gaya bsdk ");
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won ");
    writeToLog(LOG_EVENT_GAME_OVER,"PLAYER WON" ,currentMonsterHealth ,currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
    writeToLog(LOG_EVENT_GAME_OVER,"MONSTER WON" ,currentMonsterHealth ,currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("draw");
    writeToLog(LOG_EVENT_GAME_OVER,"DRAW" ,currentMonsterHealth ,currentPlayerHealth);
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}
function attackMonster(mode) {
  let logEvent ;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent =LOG_EVENT_PLAYER_ATTACK ;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG__ATTACK_VALUE;
    logEvent =LOG_EVENT_PLAYER_STRONG_ATTACK ;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent,damage ,currentMonsterHealth ,currentPlayerHealth);
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
  writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth ,currentPlayerHealth);
  endRound();
}
function printLogHandler() {
  console.log(battlelog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click",printLogHandler);
