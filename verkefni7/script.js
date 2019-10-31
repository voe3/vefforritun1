/**
 * Verkefni 7 – Gisk leikur
 *
 * Leikur sem snýst um að giska á tölu milli 0 og 100
 */


/**
 * Global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur enginn leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *  - Fyrsti leikur kláraðist í tveim ágiskunum.
 *  - Seinni leikur kláraðist í þrem ágiskunum.
 */

 const games = [];



 /**
  * Byrjar leikinn okkar með því að kalla í play().
  * Eftir að play() klárar þá er boðið notandanum að spila annann leik með confirm()
  * Ef notandi ýtir á "ok" þá er annar leikur spilaður.
  * Ef notandi ýtir á "cancel" þá er sótt niðurstöður með getResults() og þær birtar með alert().
  */
function start() {

  do{
    play();
  }while(confirm("Viltu spila annan leik ?"))

  alert(getResults());
}

/**
 * Spilar einn leik. Sér um að:
 *  x- Velja tölu af handahófi í byrjun með randomNumber()
 *  x- Biðja notanda um tölu með prompt()
 *  - Vinna úr intaki frá notanda með parseGuess()
 *  - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *  - Haldautan um fjölda ágiskana
 *  - Vista fjölda ágiskana í "games" fylki þegar búið er að giska rétt
 * 
 * Ef notandi ýtir á cancel þegar beðið er um ágiskun skal hætta í leik en ekki vista ágiskanir
 *  - t.d. með því að nota break í lykkju.
 * 
 * Þarf aðútfæra með lykkju og flæðisstýringum
 */
function play() {
  const random = randomNumber(1,100);
  var count = 0;

  do{
    var svarNotanda = prompt("Giskaðu á tölu sem er á milli 0 og 100","0-100");

    if(svarNotanda === null){
      break;
    }

    var takainput = parseGuess(svarNotanda);

    alert(getResponse(takainput, random));

    if(takainput === random){
      games.push(count); //bætir fjölda ágiskana per leik inn í fylkið
    }
    else{
      count++;
    }
  }while(takainput !== random);
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjöldi leikja er skilað ásamt meðalfjölda giska, t.d.:
 *    "þú spilaðir 10 leiki
 *     Meðalfjöldi ágiskana var 5"
 * ATH að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er skilað:
 *    "Þú spilaðir engann leik >_<"
 */
function getResults(){
  if(games === undefined || games.length == 0){
    return "Þú spilaðir engann leik >_<" ;
  }

  var mean = calculateAverage();

  var nidurstada = `þú spilaðir ${games.length} leiki\n Meðalfjöldi ágiskana var ${mean}`;
  return nidurstada;
}

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í 
 * global breytu "games". Skilar gildi með tveim aukastöfum.
 * Ef games = [3,3,4] er niðurstaðan (3+3+4)/3 = 3.66666667
 * og henni skilað sem 3.67
 * 
 * þarf að útfæra með lykkju.
 */
function calculateAverage(){
  var sum = 0;
  for(var i=0; i < games.length; i++){
    sum = sum + games[i];
  }

  var mean = (sum/games.length);

  return mean.toFixed(2);
}

/**
 * tekur in input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er skilað null
 */
function parseGuess(input){
  var takainput = parseInt(input); 

  if(isNaN(takainput))
  {
    return null;
  }
  return takainput;
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *  - guess sem tölu, ágiskun notanda
 *  - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 * 
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct){
  if(guess === correct){
    return "Rétt" ;
  }

  if (guess === null || guess < 0){
    return "Ekki rétt";
  } 

  var abs = Math.abs(correct-guess);

  if(abs < 5){
    return "Mjög nálægt";
  }

  else if(abs < 10 ){
    return "Nálægt";
  }

  else if(abs < 20){
    return "Frekar langt frá";
  }

  else if(abs < 50){
    return "Langt frá";
  }

  else {
    return "Mjög langt frá";
  }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
