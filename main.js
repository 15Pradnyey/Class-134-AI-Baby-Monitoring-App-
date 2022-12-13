Status = "";
objects = [];
cars = ["Bugatti", "Lamborghini", "Porche", "Rolls-Royce", "Mercedes", "BMW"];
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting object";
    for(var k = 0; k < cars.length; k++){
        random_car = Math.floor(Math.random() * cars.length);
        console.log(cars[random_car]);
    }
}

function modelloaded() {
    console.log("COCOssd model initiated");
    Status = true;
    console.log(Status);
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        objects = results;
        
    }
}

function draw() {
    image(video, 0, 0, 640, 420);
    document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected : " + objects.length;
    if(Status != ""){
        for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            fill(random(255), random(255), random(255));
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            textSize(25);
            noFill();
            stroke(random(255), random(255), random(255));
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    
        }
    }
    
}

