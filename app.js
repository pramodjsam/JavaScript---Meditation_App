const app= function(){
	const song=document.querySelector(".song");
	const play=document.querySelector(".play");
	const outline=document.querySelector(".moving-outline circle");
	const video=document.querySelector(".video-container video");

	//sounds
	const sounds=document.querySelectorAll(".sound-picker button");
	//time display
	const timeDisplay=document.querySelector(".time-display");
	const timeSelect=document.querySelectorAll(".time-select button");
	//outline length
	const outlineLength=outline.getTotalLength();
	let fakeDuration=600;
	outline.style.strokeDasharray=outlineLength;
	outline.style.strokeDashoffset=outlineLength;

	sounds.forEach(function(sound){
		sound.addEventListener("click",function(){
			song.src=this.getAttribute("data-sound");
			video.src=this.getAttribute("data-video");
			checkPlaying(song)
		})
	})

	play.addEventListener("click",function(){
		checkPlaying(song)
	})

	timeSelect.forEach(function(option){
		option.addEventListener("click",function(){
			fakeDuration= this.getAttribute("data-time");
			timeDisplay.innerHTML=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
		})
	})

	const checkPlaying= function(song){
		if(song.paused){
			song.play();
			video.play();
			play.src="./svg/pause.svg"
		}else if(song.play){
			song.pause();
			video.pause();
			play.src="./svg/play.svg"
		}
	}

	song.ontimeupdate= function(){
		let currentTime= song.currentTime;
		console.log(currentTime)
		let elapsed= fakeDuration - currentTime;
		let seconds= Math.floor(elapsed % 60);
		let minutes= Math.floor(elapsed / 60);
		console.log(minutes,seconds);
		let progress= outlineLength - (currentTime / fakeDuration) * outlineLength;
		outline.style.strokeDashoffset=progress;
		timeDisplay.innerHTML=`${minutes}:${seconds}`;

		if(currentTime>=fakeDuration){
			song.pause();
			video.pause();
			song.currentTime=0;
			play.src="./svg/play.svg"
		}
	}
}

app();