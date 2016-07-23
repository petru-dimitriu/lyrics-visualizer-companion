const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');
var remote = require('remote');
var dialog = remote.require('dialog');

lyrics = [];
processedLyrics = [];
i = 0;
displayed = true;

function openSong()
{
	dialog.showOpenDialog(
		function(fileNames)
		{
			if (typeof fileNames === 'undefined')
				return;
			loadSong(fileNames[0]);
		});
}

function loadSong(name)
{
	document.getElementById('music').src = name;
}

function ProcessedLyric(start,stop,lyric)
{
	this.start = start;
	this.stop = stop;
	this.lyric = lyric;
	this.print = function()
	{
		return start + "|" + stop + "|" + lyric + "\n";
	};
}

function parseLine(line)
{
	lyrics.push(line);
	document.getElementById('allLyrics').value += line + "\n";
}

function start()
{
	document.getElementById('music').play();
	lyrics = document.getElementById('allLyrics').value.split('\n');
	
	currentStart = 0; currentStop = 0; currentLyric = lyrics[0];
	timeUpdate = setInterval(updateTime,500);
}

function click()
{
	if (!displayed || i == 0)
	{
		i++;
		currentStart = document.getElementById('music').currentTime;
		currentLyric = lyrics[i];
		document.getElementById('currentLyric').innerHTML = currentLyric;
		document.getElementById('allLyrics').innerHTML = document.getElementById('allLyirics').innerHTML.replace(currentLyric+'\n',"");
	}
	else
	{
		currentEnd = document.getElementById('music').currentTime;
		processedLyrics.push(new ProcessedLyric(currentStart,currentEnd,currentLyric));
		document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
		document.getElementById('currentLyric').innerHTML = "<br>";
	}
}

function flash()
{
	processedLyrics.push(new ProcessedLyric(document.getElementById('music').currentTime,'flash','rand'));
	document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
}

function beginLongFlash()
{
	processedLyrics.push(new ProcessedLyric(document.getElementById('music').currentTime,'blf',''));
	document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
}

function endLongFlash()
{
	processedLyrics.push(new ProcessedLyric(document.getElementById('music').currentTime,'elf',''));
	document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
}

function changeLyric()
{
	currentLyric = lyrics[i];
	document.getElementById('currentLyric').innerHTML = currentLyric;
	processedLyrics.push(new ProcessedLyric(document.getElementById('music').currentTime,'chl',currentLyric));
	document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
	i++;
}
/*
Nimeni nu mă caută, să ştii
Chiar şi tu la mine nu mai vii
Diagnoza noastră –
amnezii
Poate tu nu ai observat
Timpul ca nisipul s-a spălat
Nu lăsa uitat tot ce-ai uitat
În scrisoarea mea din poezii
Vei citi că viu sunt printre vii
Încă nume-n piatră
n-am purtat
Rătăcind tăceri îmi e pe plac
Să privesc la cer neîncetat
Când soarele-noptează
merg în pat
Ies în stradă, calc noaptea
Din mâini scrisorile-mi cad
În pumni am degete strânse
În toate uşile bat
Deschideţi poarta!
Poştaşul de voi n-a uitat!
Eu îţi caut fereastra
în care m-ai aşteptat
În care m-ai așteptat!
În care m-ai așteptat!
De tine n-am uitat!
Nimeni nu mă caută, să ştii
Chiar şi tu la mine nu mai vii
Diagnoza noastră –
amnezii
Pe covorul meu verde crustat
A rămas un scaun și un pat
Un perete spart
de-un geam uitat
În scrisoarea mea din poezii
Vei citi că viu sunt printre vii
Încă nume-n piatră
n-am purtat
Rătăcind tăceri îmi e pe plac
Să privesc la cer neîncetat
Când soarele-noptează
merg în pat
Ies în stradă, calc noaptea
Din mâini scrisorile-mi cad
În pumni am degete strânse
În toate uşile bat
Deschideţi poarta!
Poştaşul de voi n-a uitat!
Eu îţi caut fereastra
în care m-ai aşteptat
În care m-ai așteptat!
În care m-ai așteptat!
De tine n-am uitat!
Ies în stradă, calc noaptea
Din mâini scrisorile-mi cad
În pumni am degete strânse
În toate uşile bat
Deschideţi poarta!
Poştaşul de voi n-a uitat!
Eu îţi caut fereastra
în care m-ai aşteptat.
*/