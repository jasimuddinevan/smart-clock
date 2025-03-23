function clock() {
    return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        audio: new Audio('ticking-clock_1-27477.mp3'),
        async startClock() {
            try {
                this.audio.volume = 0.5;
                await this.audio.play();
                this.audio.pause();
            } catch (err) {
                console.warn('Audio permission not granted or browser does not support audio:', err);
            }
            
            setInterval(() => {
                const now = new Date();
                this.hours = now.getHours() % 12;
                this.minutes = now.getMinutes();
                const newSeconds = now.getSeconds();
                
                if (newSeconds !== this.seconds) {
                    this.seconds = newSeconds;
                    try {
                        this.audio.currentTime = 0;
                        this.audio.play();
                    } catch (err) {}
                }
            }, 1000);
        }
    }
}