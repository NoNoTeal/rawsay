function toPreview() {
    var textArea = document.getElementById('jsonInput');
    var previewArea = document.getElementById('jsonPreview');
    var json;
    try {
        json = JSON.parse(textArea.value);
    } catch {}
    if(!textArea.value.length) {
        previewArea.innerHTML = "<span class=\"red bold italic noselect\">&#60;No Text Provided&#62;</span>";
        return;
    } else if(!json) {
        previewArea.innerHTML = "<span class=\"red bold italic noselect\">&#60;JSON can't be parsed&#62;</span>";
        return;
    } else {
        if(Array.isArray(json)) {
            if(json[0] !== "") {
                previewArea.innerHTML = "<span class=\"red bold italic noselect\">&#60;JSON isn't the expected [\"\",{\"text\":...}] value&#62;</span>";
                return;
            } else {
                var a = "";
                for(var p of json) {
                    a+=getFromTextObject(p);
                }
                previewArea.innerHTML = a;
            }
        } else {
            if(!json["text"]) {
                previewArea.innerHTML = "<span class=\"red bold italic noselect\">&#60;JSON isn't the expected {\"text\":...} value&#62;</span>";
                return;
            } else {
                previewArea.innerHTML = getFromTextObject(json);
            }
        }
    }
}

function getFromTextObject(obj) {
    if(typeof obj !== "object" && obj === null) return "";
    if(!obj["text"]) {
        return "";
    } else {
        var finalElement = "<span class='";
        if(obj["color"]) {
            finalElement+=obj["color"].replace("_", "")+" ";
        } else {
            finalElement+="white ";
        }
        if(obj["bold"]) {
            finalElement+="bold ";
        }
        if(obj["italic"]) {
            finalElement+="italic ";
        }
        if(obj["underlined"]) {
            finalElement+="underlined ";
        }
        if(obj["strikethrough"]) {
            finalElement+="strikethrough ";
        }
        if(obj["obfuscated"]) {
            finalElement+="obfuscated ";
        }
        finalElement+="noselect'>"+obj["text"]+"</span>";
        return finalElement;
    }
}