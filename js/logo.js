class gear {
    constructor(centerX, centerY, numberOfTeeth, toothWidth, toothHeight) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.numberOfTeeth = numberOfTeeth;
        this.toothWidth = toothWidth;
        this.toothHeight = toothHeight;
        this.rotation = 0;
    }

    draw(ctx) {
        const radius = 25;
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        for (let i = 0; i < this.numberOfTeeth; i++) {
            const angle = (i / this.numberOfTeeth) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            ctx.lineTo(x, y);
            ctx.lineTo(
                x + this.toothWidth * Math.cos(angle),
                y + this.toothWidth * Math.sin(angle)
            );
        }
        ctx.closePath();
        ctx.arc(0, 0, radius / 1.25, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
}

class MovingText {
    constructor(text, x, y, speedX) {
        this.text = text;
        this.x = x;
        this.y = 300;
        this.speedX = speedX;
    }

    update(canvasWidth) {
        this.x += this.speedX;
        
        if (this.x > canvasWidth) {
            this.x = -200; 
        }
    }

    draw(ctx) {
        ctx.font = "bold 24px Georgia";
        ctx.fillStyle = "#333";
        ctx.fillText(this.text, this.x, this.y);
    }
}

class Steam {
    constructor(startX, startY, width, height) {
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.adjust = 0;
        this.sway = 0;
    }

    update() {
        const step = this.width / 3600;
        if (this.adjust >= this.width / 6) this.sway = 1;
        else if (this.adjust <= 0) this.sway = 0;
        
        this.adjust += (this.sway === 0) ? step : -step;
    }

    draw(ctx) {
        let length = this.height / 6;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.quadraticCurveTo(2 * this.startX + this.width / 50 + this.adjust, this.startY - length / 2, this.startX + this.width / 30, this.startY - length);
        ctx.quadraticCurveTo(this.startX - this.width / 50 - this.adjust, this.startY - length * 3 / 2, this.startX + this.width / 30, this.startY - length * 2);
        ctx.quadraticCurveTo(-this.width / 50 - this.adjust, this.startY - length * 3 / 2, 0 + this.width / 100, this.startY - length);
        ctx.quadraticCurveTo(this.startX + this.width / 50 + this.adjust, this.startY - length / 2, this.startX, this.startY);
        ctx.strokeStyle = "rgba(100, 100, 100, 0.5)"; // Make steam slightly transparent
        ctx.stroke();
    }
}

window.addEventListener("load", function() {
    const myCanvas = document.getElementById("myCanvas");
    const teapot = document.getElementById("teapot");
    const ctx = myCanvas.getContext("2d");

    const leftGear = new gear(myCanvas.width / 2 - 35, myCanvas.height / 2 - 80, 10, 10, 40);
    const rightGear = new gear(myCanvas.width / 2 - 110, myCanvas.height / 2 - 80, 10, 10, 40);
    const steam = new Steam(teapot.width / 20, teapot.height / 2.5, teapot.width, teapot.height);
    
    
    const label = new MovingText("STEAM POWERED", 0, 450, 1.5);

    function animate() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

        
        leftGear.rotation += 0.01;
        rightGear.rotation -= 0.01;
        leftGear.draw(ctx);
        rightGear.draw(ctx);

        
        steam.update();
        steam.draw(ctx);

        
        label.update(myCanvas.width);
        label.draw(ctx);

        requestAnimationFrame(animate);
    }

    animate();
});



    
