function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
        starsContainer.appendChild(star);
    }
}
createStars();

let bombCount = 0;
const maxBombs = 50;

function createBomb() {
    if (bombCount >= maxBombs || document.hidden) return;

    const bomb = document.createElement("div");
    bomb.className = "bomb";
    
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 100);
    bomb.style.left = `${x}px`;
    bomb.style.top = `${y}px`;

    document.body.appendChild(bomb);
    bombCount++;

    bomb.addEventListener("click", function() {
        this.classList.add("explode");
        
        for (let i = 0; i < 300; i++) {
            const spark = document.createElement("div");
            spark.className = "spark";
            const angle = (Math.PI * 2 * i) / 300;
            const distance = Math.random() * 300 + 100;
            const sparkX = Math.cos(angle) * distance;
            const sparkY = Math.sin(angle) * distance;
            spark.style.setProperty("--spark-x", `${sparkX}px`);
            spark.style.setProperty("--spark-y", `${sparkY}px`);
            spark.style.background = `hsl(${Math.random() * 60}, 100%, 50%)`;
            spark.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
            this.appendChild(spark);
        }

        const smoke = document.createElement("div");
        smoke.className = "smoke";
        smoke.style.left = `${x}px`;
        smoke.style.top = `${y}px`;
        document.body.appendChild(smoke);

        this.addEventListener("animationend", () => {
            this.remove();
            bombCount--;
            if (bombCount < maxBombs) createBomb();
            smoke.remove();
        }, {once: true});
    });
}

for (let i = 0; i < maxBombs; i++) {
    setTimeout(createBomb, i * 50);
}

window.addEventListener('resize', () => {
    document.querySelectorAll('.bomb').forEach(bomb => {
        bomb.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
        bomb.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    });
});