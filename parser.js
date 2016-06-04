const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');

rl = readline.createInterface({
  input: fs.createReadStream ('plain_lyrics.txt',{encoding: 'utf8'}),
  output: fs.createWriteStream ('lyrics.srt',{encoding: 'utf8'})
});

rl.on('line',parseLine);

lyrics = [];
processedLyrics = [];

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

function updateTime()
{
	if ($("#music").prop("ended") == true)
		clearInterval(timeUpdate);
	var time = $("#music").prop("currentTime");
	var mins = floor(time / 60);
	var secs = floor(time % 60);
	$("#time").html(mins + ":" + secs);
	
}