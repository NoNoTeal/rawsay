const formatColorCodes = {
    '§4':'dark_red',
    '§c':'red',
    '§6':'gold',
    '§e':'yellow',
    '§a':'green',
    '§2':'dark_green',
    '§b':'aqua',
    '§3':'dark_aqua',
    '§9':'blue',
    '§1':'dark_blue',
    '§5':'dark_purple',
    '§d':'light_purple',
    '§f':'white',
    '§7':'gray',
    '§8':'dark_gray',
    '§0':'black',
    '§r':'reset',
    '§l':'bold',
    '§o':'italic',
    '§n':'underlined', 
    '§m':'strikethrough',
    '§k':'obfuscated'
};

function __a(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function toFormat() {
    var textArea = document.getElementById('jsonInput');
    var previewArea = document.getElementById('jsonFormatting');
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
                    a+=getFromTextObjectFormat(p);
                }
                previewArea.innerHTML = a;
                previewArea.style.height = "";
                previewArea.style.height = previewArea.scrollHeight + "px";
            }
        } else {
            if(!json["text"]) {
                previewArea.innerHTML = "<span class=\"red bold italic noselect\">&#60;JSON isn't the expected {\"text\":...} value&#62;</span>";
                return;
            } else {
                previewArea.innerHTML = getFromTextObjectFormat(json);
                previewArea.style.height = "";
                previewArea.style.height = previewArea.scrollHeight + "px";
            }
        }
    }
}

function getFromTextObjectFormat(obj) {
    if(typeof obj !== "object" && obj === null) return "";
    if(!obj["text"]) {
        return "";
    } else {
        var finalElement = "";
        if(obj["color"]) {
            if(__a(formatColorCodes, obj["color"])) {
                finalElement+=__a(formatColorCodes, obj["color"]);
            }
        } else {
            finalElement+=__a(formatColorCodes, "white");
        }
        if(obj["bold"]) {
            finalElement+=__a(formatColorCodes, "bold");
        }
        if(obj["italic"]) {
            finalElement+=__a(formatColorCodes, "italic");
        }
        if(obj["underlined"]) {
            finalElement+=__a(formatColorCodes, "underlined");
        }
        if(obj["strikethrough"]) {
            finalElement+=__a(formatColorCodes, "strikethrough");
        }
        if(obj["obfuscated"]) {
            finalElement+=__a(formatColorCodes, "obfuscated");
        }
        finalElement+=obj["text"];
        return finalElement;
    }
}