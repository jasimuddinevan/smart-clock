function clock() {
    return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        audio: new Audio('ticking-clock_1-27477.mp3'),
        audioPermissionGranted: false,
        async startClock() {
            // Start the clock immediately without sound
            const clockInterval = setInterval(() => {
                const now = new Date();
                this.hours = now.getHours() % 12;
                this.minutes = now.getMinutes();
                this.seconds = now.getSeconds();
                
                // Only play sound if permission is granted
                if (this.audioPermissionGranted && this.seconds !== this.lastSecond) {
                    this.lastSecond = this.seconds;
                    try {
                        this.audio.currentTime = 0;
                        this.audio.play();
                    } catch (err) {}
                }
            }, 1000);

            // Request audio permission after 3 seconds
            setTimeout(async () => {
                try {
                    this.audio.volume = 0.5;
                    await this.audio.play();
                    this.audio.pause();
                    this.audioPermissionGranted = true;
                } catch (err) {
                    console.warn('Audio permission not granted or browser does not support audio:', err);
                }
            }, 3000);
        }
    }
}
