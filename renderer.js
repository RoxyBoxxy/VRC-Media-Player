// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


    time=setInterval(function(){
        document.title = foo.getTitle().split("by").join("-");
        },100);


function changeURL(e){
    console.log(e);
    switch (e)
    {
        case "Youtube":
            foo.loadURL("https://youtube.com");
            break;
        case "SoundCloud":
            foo.loadURL("https://soundcloud.com");
            break;
        case "Youtube Music":
            foo.loadURL("https://music.youtube.com");
            break;
        
    };
};