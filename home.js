var visitedLinkData = {};
var totalTimeSpent = 0;
var topVisited = {};

document.getElementById("timeSpent").innerHTML = 0;

chrome.storage.sync.get("visitedLink", function(result) {
    visitedLinkData = result.visitedLink;

    for(key in visitedLinkData){
        totalTimeSpent += visitedLinkData[key];
    }

    var sortedItems = SortDictionary(visitedLinkData);
 
    for(var i = 0; i < Object.keys(sortedItems).length; i++){
        var item = sortedItems[i];
        console.log(item);
        if(i < 4 && item[0] != ""){
            topVisited[item[0]] = item[1];
        }
    }
    
    var index = 1;
    for(item in topVisited){
        if(document.getElementById("top" + index)  && item != "newtab"){ 
            if(topVisited[item] == 0){
                document.getElementById("top" + index).innerHTML =  item + " - "  + "less than 1 minute spent"; 
            }else{
                document.getElementById("top" + index).innerHTML =  item + " - " + topVisited[item] + " minute(s) spent"; 
            }
           
        }
        index += 1;
    }


    document.getElementById("timeSpent").innerHTML = GetTimeString(totalTimeSpent);
 });

 var startSet;
 var endSet;
 var textObj = document.getElementById("trackingText");

 chrome.storage.sync.get("startSet", function(result){
       
    if(result.startSet != null){
        startSet = result.startSet;
        if(startSet > 12){
            startSet = startSet-12 + "pm"
        }else{
            startSet += "am"
        }
        textObj.innerHTML = "Tracking from " + startSet;
    }else{
        textObj.innerHTML = "Tracking from " + "0am to 0am"
    }
});

chrome.storage.sync.get("endSet", function(result){
    if(result.endSet != null){
        endSet = result.endSet;
        if(endSet > 12){
            endSet = endSet-12 + "pm"
        }else{
            endSet += "am"
        }
        textObj.innerHTML += " to " + endSet;
    }
});


 function GetTimeString(minutes){
     var hours = Math.floor(minutes/60);
     var remainingMinutes = minutes - hours*60;

     if(hours == 0){
        var time = remainingMinutes + " minutes";
        return time;
     }

     var time = hours + " hours " + remainingMinutes + " minutes";
     return time;
 }

function SortDictionary(visitedLinkData){
    // Create items array
    var items = [];

    for(var data in visitedLinkData){
        items.push([data, visitedLinkData[data]]);
    }

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    return items;
}