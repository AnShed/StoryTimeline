class TimeAxis {
    constructor(posY) {
        this.posY = posY;
    }

    draw() {
        stroke(21, 219, 25);
        line(0, this.posY, 1200, this.posY);
        for (var i = 3; i > 0; i--) {
            stroke(21, 219, 25, 255 - (25 * i * 2));
            line(0, this.posY + i, 1200, this.posY + i);
        }
        for (var i = 3; i > 0; i--) {
            stroke(21, 219, 25, 255 - (25 * i * 2));
            line(0, this.posY - i, 1200, this.posY - i);
        }
    }

    getPosY() {
        return this.posY;
    }
}

class AxisMarker {
    constructor(title, description) {
        this.r = 15;
        this.x = -100;
        this.y = -100;
        this.colorR = 242;
        this.colorG = 3;
        this.colorB = 3;
        this.colorSpotlightR = undefined;
        this.colorSpotlightG = undefined;
        this.colorSpotlightB = undefined;
        this.activated = false;
        this.activatedHoverly = false;
        this.showSpotlight = false;
        this.title = title.slice(0, 20);
        this.description = description;
        this.labelFullHeight = 130;
        this.labelX1 = undefined;
        this.labelX2 = undefined;
        this.labelY1 = undefined;
        this.labelY2 = undefined;
    }

    draw(mX, mY) {
        this.drawOffshot();
        this.underMouse(mX, mY);
        this.drawSpotlight();
        this.drawPoint();
    }

    drawLabel() {
        if (this.activated) {
            var bigLabelWidth = 8 * this.title.length;
            if (bigLabelWidth < 100) {
                bigLabelWidth = 100;
            } else if (bigLabelWidth > 200) {
                bigLabelWidth = 200;
            }
            noStroke();
            fill(255, 255, 255);
            if (this.y < this.labelFullHeight) {
                triangle(this.x, this.y, this.x - 5, this.y + 25, this.x + 5, this.y + 25);
            } else {
                triangle(this.x, this.y, this.x - 5, this.y - 25, this.x + 5, this.y - 25);
            }
            noStroke();
            fill(255, 255, 255);

            if (this.y < this.labelFullHeight) {
                if (this.x < (bigLabelWidth / 2)) {
                    rect(this.x - 5, this.y + 20, bigLabelWidth + 13, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x, this.y + 30);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x, this.y + 35, bigLabelWidth, 80);
                    this.labelX1 = this.x - 5;
                    this.labelX2 = this.x - 5 + bigLabelWidth + 13;
                    this.labelY1 = this.y + 20;
                    this.labelY2 = this.y + 20 + 110;
                } else if (this.x > canvas.width - (bigLabelWidth / 2)) {
                    rect(this.x - bigLabelWidth, this.y + 20, bigLabelWidth + 5, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - bigLabelWidth + 5, this.y + 30);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x - bigLabelWidth + 5, this.y + 35, bigLabelWidth, 80);
                    this.labelX1 = this.x - bigLabelWidth;
                    this.labelX2 = this.x + 13;
                    this.labelY1 = this.y + 20;
                    this.labelY2 = this.y + 20 + 110;
                } else {
                    rect(this.x - (bigLabelWidth / 2), this.y + 20, bigLabelWidth + 13, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - (bigLabelWidth / 2) + 5, this.y + 30);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x - (bigLabelWidth / 2) + 5, this.y + 35, bigLabelWidth, 80);
                    this.labelX1 = this.x - (bigLabelWidth / 2);
                    this.labelX2 = this.x - (bigLabelWidth / 2) + bigLabelWidth + 13;
                    this.labelY1 = this.y + 20;
                    this.labelY2 = this.y + 20 + 110;
                }
            } else {
                if (this.x < (bigLabelWidth / 2)) {
                    rect(this.x - 5, this.y - this.labelFullHeight, bigLabelWidth + 13, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x, this.y - 120);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x, this.y - 115, bigLabelWidth, 80);
                    this.labelX1 = this.x - 5;
                    this.labelX2 = this.x - 5 + bigLabelWidth + 13;
                    this.labelY1 = this.y - this.labelFullHeight;
                    this.labelY2 = this.y - this.labelFullHeight + 110;
                } else if (this.x > canvas.width - (bigLabelWidth / 2)) {
                    rect(this.x - bigLabelWidth, this.y - this.labelFullHeight, bigLabelWidth + 5, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - bigLabelWidth + 5, this.y - 120);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x - bigLabelWidth + 5, this.y - 115, bigLabelWidth, 80);
                    this.labelX1 = this.x - bigLabelWidth;
                    this.labelX2 = this.x + 13;
                    this.labelY1 = this.y - this.labelFullHeight;
                    this.labelY2 = this.y - this.labelFullHeight + 110;
                } else {
                    rect(this.x - (bigLabelWidth / 2), this.y - this.labelFullHeight, bigLabelWidth + 13, 110, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - (bigLabelWidth / 2) + 5, this.y - 120);
                    textSize(10);
                    textFont("Verdana");
                    text("" + this.description.trim().slice(0, 300), this.x - (bigLabelWidth / 2) + 5, this.y - 115, bigLabelWidth, 80);
                    this.labelX1 = this.x - (bigLabelWidth / 2);
                    this.labelX2 = this.x - (bigLabelWidth / 2) + bigLabelWidth + 13;
                    this.labelY1 = this.y - this.labelFullHeight;
                    this.labelY2 = this.y - this.labelFullHeight + 110;
                }
            }
        } else if (this.activatedHoverly) {
            var labelWidth = 8 * this.title.length;
            if (labelWidth > 200) {
                labelWidth = 200;
            }
            noStroke();
            fill(255, 255, 255);
            if (this.y > canvas.height - 50) {
                if (this.x < (labelWidth / 2)) {
                    triangle(this.x, this.y, this.x - 5, this.y - 25, this.x + 5, this.y - 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - 5, this.y - 50, labelWidth + 13, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x, this.y - 30);
                } else if (this.x > canvas.width - (labelWidth)) {
                    triangle(this.x, this.y, this.x - 5, this.y - 25, this.x + 5, this.y - 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - labelWidth - 10, this.y - 50, labelWidth + 15, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - labelWidth - 5, this.y - 30);
                } else {
                    triangle(this.x, this.y, this.x - 5, this.y - 25, this.x + 5, this.y - 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - (labelWidth / 2), this.y - 50, labelWidth + 13, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - (labelWidth / 2) + 5, this.y - 30);
                }
            } else {
                if (this.x < (labelWidth / 2)) {
                    triangle(this.x, this.y, this.x - 5, this.y + 25, this.x + 5, this.y + 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - 5, this.y + 20, labelWidth + 13, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x, this.y + 40);
                } else if (this.x > canvas.width - (labelWidth)) {
                    triangle(this.x, this.y, this.x - 5, this.y + 25, this.x + 5, this.y + 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - labelWidth - 10, this.y + 20, labelWidth + 15, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - labelWidth - 5, this.y + 40);
                } else {
                    triangle(this.x, this.y, this.x - 5, this.y + 25, this.x + 5, this.y + 25);
                    noStroke();
                    fill(255, 255, 255);
                    rect(this.x - (labelWidth / 2), this.y + 20, labelWidth + 13, 30, 5);
                    fill(0);
                    textSize(12);
                    textFont("Verdana");
                    text("" + this.title.slice(0, 25), this.x - (labelWidth / 2) + 5, this.y + 40);
                }
            }
        }
    }
    
    drawPoint(){
        noStroke();
        fill(this.colorR, this.colorG, this.colorB);
        ellipse(this.x, this.y, this.r, this.r);
    }
    
    drawSpotlight() {
        if(this.showSpotlight){
            for (var i = this.r; i > 0; i--) {
                noStroke();
                fill(this.colorSpotlightR, this.colorSpotlightG, this.colorSpotlightB, 255 - (22 * i));
                ellipse(this.x, this.y, i * 3, i * 3);
            }
        }
    }

    drawOffshot() {
        stroke(21, 219, 25, 100);
        line(this.x, this.y, this.x, ax.getPosY());
        stroke(21, 219, 25, 100);
        line(this.x + 0.5, this.y, this.x + 0.5, ax.getPosY());
        stroke(21, 219, 25, 100);
        line(this.x - 0.5, this.y, this.x - 0.5, ax.getPosY());
    }

    setColor(r, g, b) {
        this.colorR = r;
        this.colorG = g;
        this.colorB = b;
    }
    
    setSpotlightColor(r, g, b) {
        this.colorSpotlightR = r;
        this.colorSpotlightG = g;
        this.colorSpotlightB = b;
    }
    
    underMouse(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        if (!this.activated) {
            if (d < this.r) {
                this.showSpotlight = true;
                this.setSpotlightColor(242, 252, 108);
                this.activatedHoverly = true;
            } else {
                this.showSpotlight = false;
                this.activatedHoverly = false;
            }
        }
    }

    clicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);

        if (this.activated && mx > this.labelX1 && mx < this.labelX2 && my > this.labelY1 && my < this.labelY2) {
            switchToMain();
        } else if (d < this.r) {
            this.showSpotlight = true;
            this.setSpotlightColor(0, 255, 0);
            this.activated = true;
            activeMarker = this;
        } else {
            this.showSpotlight = false;
            this.activated = false;
            this.activatedHoverly = false;
        }
    }

    setX(mx) {
        this.x = mx;
    }

    setY(my) {
        this.y = my;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setTitle(titleString) {
        this.title = titleString;
    }

    getTitle() {
        return this.title;
    }
    
    getDescription() {
        return this.description;
    }
    
    setDescription(descriptionString){
        this.description = descriptionString;
    }
}

window.onload = function(){
    var menuDescription = document.getElementById("menuDescription");
    var menuDemo = document.getElementById("menuDemo");
    var menuRegLog = document.getElementById("menuRegLog");
    var descriptor = document.getElementById("description");
    var timeliner = document.getElementById("timelineContainer");
    var regLoger = document.getElementById("regLog");
    
    menuDescription.addEventListener("click", showDescription);
    menuDemo.addEventListener("click", showDemo);
    menuRegLog.addEventListener("click", showRegLog);
    
    function showDescription()
    {
        descriptor.classList.remove("hidden")
        timeliner.classList.add("hidden");
        regLoger.classList.add("hidden");
    }

    function showDemo()
    {
        descriptor.classList.add("hidden");
        timeliner.classList.remove("hidden");
        regLoger.classList.add("hidden");
    }

    function showRegLog()
    {
        descriptor.classList.add("hidden");
        timeliner.classList.add("hidden");
        regLoger.classList.remove("hidden");
    }
}


var dots = [];
var ax;
var addButton;
var addButtonEnabled;
var deleteButton;
var editButton;
var paintButton;
var moveButton;
var activeMarker;
var timelineMainTitle;
var timelineMainDescription;
var timelineMainCharcters;
var timelineEditInputText;
var timelineEditTextAreaDescription;
var timelineEditTextAreaCharacters;
var editTitle;
var editCancelButton;
var editSaveButton;
var painTitle;
var paintCancelButton;
var painSaveButton;
var colorPicker;
var moveTitle;
var moveCancelButton;
var moveSaveButton;
var deleteTitle;
var deleteCancelButton;
var deleteSaveButton;

function setup() {
    addButton = document.getElementById("editMenuPlus");
    addButtonIcon = document.getElementById("editMenuPlusIconContainer");
    deleteButton = document.getElementById("editMenuTrash");
    editButton = document.getElementById("editMenuEdit");
    paintButton = document.getElementById("editMenuBrush");
    moveButton = document.getElementById("editMenuMove");
    timelineMainTitle = document.getElementById("markerTitleText");
    timelineMainDescription = document.getElementById("markerDescriptionText");
    timelineMainCharcters = document.getElementById("markerCharactersText");
    timelineEditInputText = document.getElementById("timelineEditInputText");
    timelineEditTextAreaDescription = document.getElementById("timelineEditTextAreaDescription");
    timelineEditTextAreaCharacters = document.getElementById("timelineEditTextAreaCharacters");
    editTitle = document.getElementById("editTitle");
    editCancelButton = document.getElementById("editCancel");
    editSaveButton = document.getElementById("editSave");
    colorPicker = document.getElementById("colorPicker");
    paintTitle = document.getElementById("paintTitle");
    paintCancelButton = document.getElementById("paintCancel");
    paintSaveButton = document.getElementById("paintSave");
    moveTitle = document.getElementById("moveTitle");
    moveCancelButton = document.getElementById("moveCancel");
    moveSaveButton = document.getElementById("moveSave");
    deleteTitle = document.getElementById("deleteTitle");
    deleteCancelButton = document.getElementById("deleteCancel");
    deleteSaveButton = document.getElementById("deleteSave");
    addButtonEnabled = true;
    
    createProperAdd();
    createProperEdit();
    createProperMove();
    createProperPaint();
    createProperDelete();
    
    var canvas = createCanvas(1200, 450);
    canvas.parent("timeline");
    ax = new TimeAxis(235);
}

function draw() {
    background(50, 50, 50);
    ax.draw();

    for (var i = 0; i < dots.length; i++) {
        dots[i].draw(mouseX, mouseY);
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].drawLabel(mouseX, mouseY);
    }
    
    addButton.drawMarker(mouseX, mouseY);
    moveButton.redockMarker(mouseX, mouseY);
    moveButton.drawTemporarMarker()
}

function mousePressed() {
    addButton.clickToDock(mouseX, mouseY);
    moveButton.redock(mouseX, mouseY);
    for (var i = 0; i < dots.length; i++) {
        dots[i].clicked(mouseX, mouseY);
    }
}

function switchToMain(){
    timelineMain.classList.remove("hidden");
    timelineEdit.classList.add("hidden");
    timelineMove.classList.add("hidden");
    timelinePaint.classList.add("hidden");
    timelineDelete.classList.add("hidden");
    
    printfInformations();
}

function printfInformations(){
    timelineMainTitle.innerHTML = activeMarker.getTitle();
    timelineMainDescription.innerHTML = activeMarker.getDescription();
    //timelineMainCharcters = activeMarker.getCharacters();
}

function createProperAdd() {
    addButton.isDocked = true;
    addButton.choosing = false;

    addButton.addEventListener("click", function(){
        if(addButtonEnabled){
            paintButton.classList.remove("activatedElement");
            deleteButton.classList.remove("activatedElement");
            editButton.classList.remove("activatedElement");
            moveButton.classList.remove("activatedElement");
            if(this.isDocked === true){
                this.isDocked = false;
                this.choosing = true;
                addButton.classList.add("activatedElement");
                addButtonIcon.classList.add("activatedElementIcon");
            }
            else{
                this.isDocked = true;
                this.choosing = false;
                addButton.classList.remove("activatedElement");
                addButtonIcon.classList.remove("activatedElementIcon");
            }
        }
    });
    
    addButton.drawMarker = function(mx, my) {
        if (!this.isDocked) {
            noStroke();
            fill(242, 252, 108, 200);
            ellipse(mx, my, 15, 15);
        }
    }
    
    addButton.clickToDock = function(mx, my){
        if (!this.isDocked && this.choosing) {
            if (mx > 10 && mx < canvas.width - 10 && my > 10 && my < canvas.height - 10) {
                dots.push(new AxisMarker("RND" + dots.length, ""));
                dots[dots.length - 1].setX(mx);
                dots[dots.length - 1].setY(my);
                this.isDocked = true;
                this.choosing = false;
                addButton.classList.remove("activatedElement");
                addButtonIcon.classList.remove("activatedElementIcon");
                activeMarker = dots[dots.length - 1];
                editButton.showEditField();
                dots[dots.length - 1].setColor(random(255), random(255), random(255));
                timelineEditInputText.scrollIntoView();
            }
        }
    }
}

function createProperEdit(){
    editButton.addEventListener("click", function(){
        editButton.classList.add("activatedElement");
        paintButton.classList.remove("activatedElement");
        deleteButton.classList.remove("activatedElement");
        moveButton.classList.remove("activatedElement");
        addButton.classList.remove("activatedElement");
        addButtonIcon.classList.remove("activatedElementIcon");
        editButton.showEditField();
    });
    
    editButton.showEditField = function(){
        timelineEdit.classList.remove("hidden");
        timelineMain.classList.add("hidden");
        timelineMove.classList.add("hidden");
        timelinePaint.classList.add("hidden");
        timelineDelete.classList.add("hidden");
        addButtonEnabled = false;
        editButton.loadMarkerData();
        editTitle.innerHTML = "<h2><span>Wydarzenie</span></h2>";
        editButton.warned = false;
    }
    
    editButton.loadMarkerData = function(){
        if(activeMarker != undefined){
            timelineEditInputText.value = activeMarker.getTitle();
            timelineEditTextAreaDescription.value = activeMarker.description + "";
            timelineEditTextAreaCharacters.value = "teścik Charactersów";
            activeMarker.showSpotlight = true;
        }
        else{
            timelineEditInputText.value = "Żaden znacznik osi nie został wybrany";
            timelineEditTextAreaDescription.value = "Żaden znacznik osi nie został wybrany";
            timelineEditTextAreaCharacters.value = "Żaden znacznik osi nie został wybrany";
        }
    }
        
    editCancel.addEventListener("click", function(){
        timelineEditInputText.value = "";
        timelineEditTextAreaDescription.value = "";
        timelineEditTextAreaCharacters.value = "";
        editButton.classList.remove("activatedElement");
        switchToMain();
        addButtonEnabled = true;
    });
    
    editSave.addEventListener("click", function(){
        if(activeMarker != undefined && timelineEditInputText.value.trim() != ""){
            editButton.classList.remove("activatedElement");
            addButtonEnabled = true;
            activeMarker.setTitle(timelineEditInputText.value);
            activeMarker.setDescription(timelineEditTextAreaDescription.value);
            switchToMain();
            moveTitle.innerHTML = "Wydarzenie";
        }
        else{
            if(!editButton.warned){
                editTitle.innerHTML += "<h2><span>Tytuł znacznika osi nie może byc pusty</span></h2>";
                editButton.warned = true;
            }
        }
    });
}

function createProperMove(){
    moveButton.redocking = false;
    moveButton.tempDocked = false;
    moveButton.x = undefined;
    moveButton.y = undefined;
    moveButton.addEventListener("click", function(){
        paintButton.classList.remove("activatedElement");
        deleteButton.classList.remove("activatedElement");
        editButton.classList.remove("activatedElement");
        addButton.classList.remove("activatedElement");
        addButtonIcon.classList.remove("activatedElementIcon");
        timelineMove.classList.remove("hidden");
        timelineMain.classList.add("hidden");
        timelineEdit.classList.add("hidden");
        timelinePaint.classList.add("hidden");
        timelineDelete.classList.add("hidden");
        moveButton.classList.add("activatedElement");
        addButtonEnabled = false;
        this.redocking = true;
        setMoveTitle();
    });
    
    moveButton.redockMarker = function(mx, my){
        if(this.redocking && activeMarker != undefined){
            noStroke();
            fill(242, 252, 108, 200);
            ellipse(mx, my, 15, 15);
        }
    }
    
    moveButton.redock = function(mx, my){
        if(this.redocking && activeMarker != undefined){
            this.redocking = false;
            this.tempDocked = true;
            this.x = mx;
            this.y = my;
        }
    }
    
    moveButton.drawTemporarMarker = function(){
        if(this.tempDocked){
            noStroke();
            fill(242, 252, 108, 200);
            ellipse(this.x, this.y, 15, 15);
        }
    }
    
    function setMoveTitle(){
        if(activeMarker != undefined){
            moveTitle.innerHTML = "Zmieniasz pozycje znacznika osi o tytule " + activeMarker.getTitle() + ".";
        }
        else{
            moveTitle.innerHTML = "Żaden znacznik osi nie został wybrany.";
        }
    }
    
    moveCancelButton.addEventListener("click", function(){
        moveButton.classList.remove("activatedElement");
        switchToMain();
        addButtonEnabled = true;
        moveButton.redocking = false;
        moveButton.tempDocked = false;
    });
    
    moveSaveButton.addEventListener("click", function(){
        if(activeMarker != undefined){
            if(moveButton.x != undefined && moveButton.y != undefined){
                activeMarker.setX(moveButton.x);
                activeMarker.setY(moveButton.y);
            }
            moveButton.classList.remove("activatedElement");
            moveButton.x = undefined;
            moveButton.y = undefined;
            switchToMain();
            addButtonEnabled = true;
            moveButton.redocking = false;
            moveButton.tempDocked = false;
        }
    });

}

function createProperPaint(){
    paintButton.addEventListener("click", function(){
        deleteButton.classList.remove("activatedElement");
        editButton.classList.remove("activatedElement");
        moveButton.classList.remove("activatedElement");
        addButton.classList.remove("activatedElement");
        addButtonIcon.classList.remove("activatedElementIcon");
        timelinePaint.classList.remove("hidden");
        timelineMain.classList.add("hidden");
        timelineEdit.classList.add("hidden");
        timelineMove.classList.add("hidden");
        timelineDelete.classList.add("hidden");
        setPaintTitle();
        addButtonEnabled = false;
        paintButton.classList.add("activatedElement");
    });
    
    function setPaintTitle(){
        if(activeMarker != undefined){
            paintTitle.innerHTML = "Zmieniasz kolor znacznika osi o tytule " + activeMarker.getTitle() + ".";
        }
        else{
            paintTitle.innerHTML = "Żaden znacznik osi nie został wybrany.";
        }
    }
    
    function setColor(){
        activeMarker.setColor(parseInt( colorPicker.value.slice(1, 3), 16), parseInt(colorPicker.value.slice(3, 5), 16), parseInt(colorPicker.value.slice(5, 7), 16));
    }
    
    paintCancelButton.addEventListener("click", function(){
        paintButton.classList.remove("activatedElement");
        switchToMain();
        addButtonEnabled = true;
    });
    
    paintSaveButton.addEventListener("click", function(){
        if(activeMarker != undefined){
            paintButton.classList.remove("activatedElement");
            switchToMain();
            addButtonEnabled = true;
            setColor();
        }
    });
}

function createProperDelete(){
    deleteButton.addEventListener("click", function(){
        editButton.classList.remove("activatedElement");
        deleteButton.classList.remove("activatedElement");
        moveButton.classList.remove("activatedElement");
        addButton.classList.remove("activatedElement");
        addButtonIcon.classList.remove("activatedElementIcon");
        timelineDelete.classList.remove("hidden");
        timelineMain.classList.add("hidden");
        timelineEdit.classList.add("hidden");
        timelineMove.classList.add("hidden");
        timelinePaint.classList.add("hidden");
        deleteButton.classList.add("activatedElement");
        addButtonEnabled = false;
        setDeleteTitle();
        activeMarker.showSpotlight = true;
    });
    
    function setDeleteTitle(){
        if(activeMarker != undefined){
            deleteTitle.innerHTML = "Wybrany został znacznik osi o tytule " + activeMarker.getTitle() + ". Czy na pewno chcesz go usunąć?";
        }
        else{
           deleteTitle.innerHTML = "Żaden znacznik osi nie został wybrany.";
        }
    }
    
    deleteCancelButton.addEventListener("click", function(){
        deleteButton.classList.remove("activatedElement");
        switchToMain();
        addButtonEnabled = true;
    });
    
    deleteSaveButton.addEventListener("click", function(){
        deleteButton.classList.remove("activatedElement");
        switchToMain();
        addButtonEnabled = true;
        var tempIndex = dots.findIndex(x => x.title===activeMarker.getTitle() && x.description ===activeMarker.getDescription());
        dots.splice(tempIndex, 1);
        activeMarker = undefined;
    });
}