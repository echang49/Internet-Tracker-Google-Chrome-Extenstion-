
document.getElementById("changepass").addEventListener("click", PassChange);
document.getElementById("startsettime").addEventListener("change", StartSetTime);
document.getElementById("endsettime").addEventListener("change", EndSetTime);

var startTime;
var endTime;

chrome.storage.sync.get("startSet", function(result){
    if(result.startSet != null){
        console.log("Startdate: " + result.startSet);
        document.getElementById("startsettime").value = result.startSet;
    }else{
        chrome.storage.sync.set({"startSet": 0}, function(){
            document.getElementById("startsettime").value = 0
        });
    }

});

chrome.storage.sync.get("endSet", function(result){
    if(result.endSet != null){
        console.log("Enddate: " + result.endSet);
        document.getElementById("endsettime").value = result.endSet;
    }else{
        chrome.storage.sync.set({"endSet": 0}, function(){
            document.getElementById("endsettime").value = 0
        });
    }
});


function StartSetTime(){
    startTime = document.getElementById("startsettime").value;
    chrome.storage.sync.set({"startSet": startTime}, function(){
        console.log("start date set");
    });
}

function EndSetTime(){
    endTime = document.getElementById("endsettime").value;
    chrome.storage.sync.set({"endSet": endTime}, function(){
        console.log("end date set");
    });
}

function PassChange(){
    var userOldInput = document.getElementById("OldPassword").value;
	var userNewInput = document.getElementById("NewPassword").value;
	
    chrome.storage.sync.get("pass", function(result){
        if(result.pass == userOldInput){
              chrome.storage.sync.set({"pass": userNewInput}, function() {
                // Notify that we saved.
                console.log('password saved');
				alert("Password Changed");  
              });
        }else{
            alert("Wrong Password, try again");  
        }
    })
}