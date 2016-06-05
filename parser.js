const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');
var remote = require('remote');
var dialog = remote.require('dialog');

lyrics = [];
processedLyrics = [];

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
	
	i = 0;
	currentStart = 0; currentStop = 0; currentLyric = lyrics[0];
	timeUpdate = setInterval(updateTime,500);
}

function click()
{
	i += 0.5;
	if (i%1 == 0.5)
	{
		currentStart = document.getElementById('music').currentTime;
		currentLyric = lyrics[i-0.5];
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