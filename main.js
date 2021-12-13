song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scorerightWrist=0;
scoreleftWrist=0;
status_song1="";
status_song2="";

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotposes);
}

function modelLoaded()
{
    console.log("posenet is loaded");
}

function gotposes(results)
{
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("Right wrist x= "+rightWristX+" y= "+rightWristY);
        console.log("Left wrist x= "+leftWristX+" y= "+leftWristY);

        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;


    }
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("red");


    if(scoreleftWrist>0.2)
    {
        status_song1=song1.isPlaying();
        status_song2=song2.isPlaying();
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(status_song2==false)
        {
            song2.play();
            document.getElementById("song_status").innerHTML="Playing Oh Rider";
        }

        
    }

    if(scorerightWrist>0.2)
    {
        status_song1=song1.isPlaying();
        status_song2=song2.isPlaying();
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(status_song1==false)
        {
            song1.play();
            document.getElementById("song_status").innerHTML="Playing Harry Potter";
        }

        
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}