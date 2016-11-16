const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');
var remote = require('electron').remote;
const {dialog} = require('electron').remote;
window.$ = window.jQuery = require('jquery');

lyrics = [];
processedLyrics = [];
i = 0;
displayed = true;

function initPage() {
	$("body").keydown( function (event) {
		if (String.fromCharCode(event.which) == 'C')
			changeLyric();
		else if (String.fromCharCode(event.which) == 'F')
			flash();
	});
}

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
	//timeUpdate = setInterval(updateTime,500);
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
	$("#allLyrics").html($("#allLyrics").html().replace(currentLyric[i] + "\n",""));
	document.getElementById('currentLyric').innerHTML = currentLyric;
	processedLyrics.push(new ProcessedLyric(document.getElementById('music').currentTime,'chl',currentLyric));
	document.getElementById('processed').innerHTML += (processedLyrics[processedLyrics.length-1].print());
	i++;
}

