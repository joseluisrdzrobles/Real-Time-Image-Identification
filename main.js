var previousResult = "";

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

function modelLoaded() {
  console.log("The model is loaded succefully");
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    var object = results[0].label;
    var confidence = results[0].confidence;
    confidence = Math.round(confidence * 100);
    if (object != previousResult && confidence > 0.5) {
      document.getElementById("object").innerText = object;
      document.getElementById("precision").innerText = confidence;
      previousResult = object;
    }
  }
}