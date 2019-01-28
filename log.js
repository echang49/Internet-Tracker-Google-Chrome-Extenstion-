
var textObj = document.getElementById("logsText");

chrome.storage.sync.get("visitedLink", function(result) {
    visitedLinkData = result.visitedLink;

    var sortedItems = SortDictionary(visitedLinkData);
    for(var i = 0; i < Object.keys(sortedItems).length; i++){
        var item = sortedItems[i];
        var link = item[0];
        var time = item[1];
        if(link != null && link != ""){
            if(time == 0){
                var text = link;
                if(link == "newtab"){
                    text = "Empty Page"
                }
                textObj.innerHTML += text + " - "  + "less than 1 minute spent \n \n";
				linebreak = document.createElement("p");
				textObj.appendChild(linebreak);
            }else{
                textObj.innerHTML += link + " - " + time + " minute(s) spent \n \n";
				linebreak = document.createElement("p");
				textObj.appendChild(linebreak);
            }
        }         
    }

    if(textObj.innerHTML == ""){
        textObj.innerHTM += "No logs available";
    }
    
});


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