"use strict";

class Rectangle {
    constructor(size, colorR, colorG, colorB, angle, startAngle) {
        this.size = size;
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
        this.angle = angle;
        this.actualAngle = startAngle;
    }

    draw() {
        push();
        stroke(0);
        strokeWeight(2);
        fill(this.colorR, this.colorG, this.colorB);
        rotate(this.actualAngle);
        rect(0, 0, this.size, this.size);
        pop();
    }

    increaseAngle() {
        this.actualAngle += this.angle;
    }
    
    setStartingAngle(){
        return this.actualAngle;
    }
}

var rectangles = [];

function setup() {
    var canvas1 = createCanvas(800, 800);
    canvas1.parent("regLog");
    var size = 12;
    for (var i = 0; i < 100; i++) {
        let ranR = random(150);
        let ranG = random(150);
        let ranB = random(150);
        let angle = random(-0.005, 0.005);
        let startAngle = random(30);
        rectangles.push(new Rectangle(size, ranR, ranG, ranB, angle, startAngle));
        size += 5;
    }
}

function draw() {
    background(255);

    rectMode(CENTER);
    translate(width / 2, height / 2);
    for (var i = rectangles.length - 1; i > 0; i--) {
        rectangles[i].draw();
    }
    
    if (second() % 1 == 0) {
        for (let i = 0; i < rectangles.length; i++) {
            rectangles[i].increaseAngle();
        }
    }
    
    noStroke();
    fill(255, 255, 255, 0);    
    rect(0, 0, 50, 50);
    textAlign(CENTER);
    fill(255);
    textSize(90);
    text("Coming soon!", 0, 0);
}