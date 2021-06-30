

//lukee koko koodin ennen sivun lataamista
document.addEventListener("DOMContentLoaded", function() {

// todoo list

// pistetaulukko
// pelisäännöt
// kielen vaihto suomi/englanti

let kortit = document.querySelectorAll(".card");

// pelin aloitus
// tyhjentää edelliseen peliin kuuluvat tekstikentät
function uusipeli() {

let uusibtn = document.getElementById("aloita_uusi");
uusibtn.addEventListener('click', function() {

  document.getElementById('pelaajanpisteet').innerHTML = 0;
  document.getElementById('vastustajanpisteet').innerHTML = 0;
  document.getElementById('voittoteksti').innerHTML = '';
  document.getElementById('komboteksti').innerHTML = '';
  document.getElementById('vastustajankomboteksti').innerHTML = '';
  document.getElementById("tablebody").innerHTML = '';
  document.getElementById("tablebody2").innerHTML = '';

let cards = document.querySelectorAll(".card");

  for (let i = cards.length - 1; 0 <= i; i--) {
    cards[i].classList.contains("taytetty", "makaavapossu","seisovapossu", "selallaapossu", "kuonopossu", "paraspossu");
    cards[i].classList.remove("taytetty", "makaavapossu","seisovapossu", "selallaapossu", "kuonopossu", "paraspossu");
}
heittonappi();
});
return 0;
}

//nappi joka käynnistää arpojen monistuksen

function heittonappi() {
  let arpabtn = document.getElementById("arpabutton");
  arpabtn.addEventListener('click', arpamonistus, true);

  return 0;
}

//tekee neljä arpanumeroa
//ja vie ne arpaheittoon

function arpamonistus() {
  let laskenta = 0;
  let kaikkipisteet = [];
  while (laskenta < 4) {
    laskenta++;
    kaikkipisteet.push(arpaheitto(laskenta));
  }
  pisteytys(kaikkipisteet);
  return 0;
}

//arpoo numerot
//ja määrittää numerolle arvon

function arpaheitto(laskenta) {
  let pistekuva = '';
  let pisterivi = 0;
  //let min = 1;
  let max = 100;
  //let arpanumerot = Math.floor(Math.random() * +max + +min);
  let arpanumerot = Math.ceil(Math.random() * +max);

//muuntaa numerot teksteiksi
  if (arpanumerot === 1) {
    // 15 pistettä
    pistekuva = "paraspossu";
    pisterivi = 0;
  }
  else if (arpanumerot >= 2 && arpanumerot <= 5) {
    // 10 pistettä
    pistekuva = "kuonopossu";
    pisterivi = 1;
  }
  else if (arpanumerot >= 6 && arpanumerot <= 15) {
    // 5 pistettä
    pistekuva = "selallaapossu";
    pisterivi = 2;
  }
  else if (arpanumerot >= 16 && arpanumerot <= 40) {
    // 5 pistettä
    pistekuva = "seisovapossu";
    pisterivi = 3;
  }
  else if (arpanumerot >= 41) {
    // 0 pistettä
    pistekuva = "makaavapossu";
    pisterivi = 4;
  }

  asettelu(laskenta, pistekuva);

  return pisterivi;
}

//tämä funktio asettelee randomilla arvot pelikentälle

function asettelu(laskenta, pistekuva) {
  //poistaa aiemmat kuvat jos niitä on
  if (laskenta === 1) {
    for (let i = kortit.length - 1; 0 <= i; i--) {
      kortit[i].classList.remove("taytetty", "makaavapossu","seisovapossu", "selallaapossu", "kuonopossu", "paraspossu");
    }
  }

  let vasenpuoli = document.querySelectorAll('#vasenlauta .card:not(.taytetty)');
  let oikeapuoli = document.querySelectorAll('#oikealauta .card:not(.taytetty)');
  let vruutu = Math.floor(Math.random() * vasenpuoli.length);
  let oruutu = Math.floor(Math.random() * oikeapuoli.length);

  //asettaa kaksi ensimmäistä sikaa vasempaan (kortit 1-9) ja kaksi oikeaan (kortit 10-18)

  if (laskenta <= 2) {
     vasenpuoli.item(vruutu).classList.add('taytetty');
     vasenpuoli.item(vruutu).classList.add(pistekuva);
  } else {
    oikeapuoli.item(oruutu).classList.add('taytetty');
    oikeapuoli.item(oruutu).classList.add(pistekuva);
  }
  return 0;
}



function pisteytys(kaikkipisteet, pistekuva) {
  // ensimmäinen array = pisteet, toinen = sika, kolmas = bonuspisteet, neljäs = kombon nimi
  let pistetaulukko = [
    [15, 'paras', 30, 'Tuplaetupotka!!!!! :O :O :O'],
    [10, 'kuono', 20, 'Tuplasiansyltty!!!! :o :o :o'],
    [5, 'selallaa', 10, 'Tuplasianselkä!!! :o :o'],
    [5, 'seisova', 10, 'Tuplatavallinen sika!! :o'],
    [0, 'makaava', 1, 'Silavaa!']
  ];

  let omatvanhatpisteet = parseInt(document.getElementById('pelaajanpisteet').innerHTML);
  let vastustajanvanhatpisteet = parseInt(document.getElementById('vastustajanpisteet').innerHTML);
  let omatpisteet = pistetaulukko[kaikkipisteet[0]][0] + pistetaulukko[kaikkipisteet[1]][0] + omatvanhatpisteet;
  let vastustajanpisteet = pistetaulukko[kaikkipisteet[2]][0] + pistetaulukko[kaikkipisteet[3]][0] + vastustajanvanhatpisteet;

  // kombojen pisteytys
  // omien possujen kombot
  // X O X O X O X O X O X O X O X O X O X O

  if (kaikkipisteet[0] === kaikkipisteet[1]) {
    omatpisteet = omatpisteet + pistetaulukko[kaikkipisteet[0]][2];
    //console.log(pistetaulukko[kaikkipisteet[1]][1]);

    document.getElementById('komboteksti').innerHTML = pistetaulukko[kaikkipisteet[0]][3];
  } else {
    document.getElementById('komboteksti').innerHTML = '';
  }
  if (kaikkipisteet[2] === kaikkipisteet[3]) {
    vastustajanpisteet = vastustajanpisteet + pistetaulukko[kaikkipisteet[2]][2];

    document.getElementById('vastustajankomboteksti').innerHTML = pistetaulukko[kaikkipisteet[2]][3];
  } else {
    document.getElementById('vastustajankomboteksti').innerHTML = '';
  }

  // tablen luonti

  let cell;
  let pistetaulu;
  let rivi;

    rivi = document.createElement('tr');
    cell = rivi.insertCell(0);
    //cell.innerHTML = pistetaulukko[kaikkipisteet[0]][1];
    cell.innerHTML = '<img height="30" src="' + pistetaulukko[kaikkipisteet[0]][1] + 'possu.png">';

    cell = rivi.insertCell(1);
    cell.innerHTML = '<img height="30" src="' + pistetaulukko[kaikkipisteet[1]][1] + 'possu.png">';

    pistetaulu = rivi.insertCell(2);
    pistetaulu.innerHTML = omatpisteet;

    document.getElementById("tablebody").prepend(rivi);

  // vastustajan tablen luonti

  let cell2;
  let pistetaulu2;
  let rivi2;

    rivi2 = document.createElement('tr');
    cell2 = rivi2.insertCell(0);
    cell2.innerHTML = '<img height="30" src="' + pistetaulukko[kaikkipisteet[2]][1] + 'possu.png">';

    cell2 = rivi2.insertCell(1);
    cell2.innerHTML = '<img height="30" src="' + pistetaulukko[kaikkipisteet[3]][1] + 'possu.png">';

    pistetaulu2 = rivi2.insertCell(2);
    pistetaulu2.innerHTML = vastustajanpisteet;

    document.getElementById("tablebody2").prepend(rivi2);

  // voittoteksti ja pelin pysäytys

  if (omatpisteet >= 100) {
    document.getElementById('voittoteksti').innerHTML = 'Voitit!!!';
    pelinlopetus();
  }
  if (vastustajanpisteet >= 100) {
    document.getElementById('voittoteksti').innerHTML = 'Vastustaja voitti :(';
    pelinlopetus();
  }

  document.getElementById('pelaajanpisteet').innerHTML = omatpisteet;
  document.getElementById('vastustajanpisteet').innerHTML = vastustajanpisteet;

  return 0;
}

// kun pisteet menevät yli 100:n. Tämä funktio poistaa klikin heitä napista

function pelinlopetus() {
  let arpabtn = document.getElementById("arpabutton");
  arpabtn.removeEventListener('click', arpamonistus, true);
}

uusipeli();
});
