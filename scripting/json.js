//my code might be spaghetti

//but it runs bitch
function jsonClick() {
    var textArea = document.getElementById('input');
    var previewArea = document.getElementById('json');
    if(!textArea.value.length) {
        previewArea.innerHTML = "<span class=\"red bold italic no_select\">&#60;No Text Provided&#62;</span>";
        return;
    } else {
        var cleanedArea = jsonAlignment(textArea.value);
        previewArea.className = "chatBox white";
        cleanedArea = JSON.stringify(cleanedArea, null);
        previewArea.innerText = cleanedArea;
        previewArea.style.height = "";
        previewArea.style.height = previewArea.scrollHeight + "px";
    };
}
function jsonAlignment(text) {
    var jsonContent = [];
    text = text.replace(/§(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g, "&")
    .replace('§', '');
    var lastColor = "white";

    var markdown = [];
    var placeholderText = "";
    var times = (text.match(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g) || "").length
    if(!times || !/^&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/i.test(text)) text = `&f${text}`; times = (text.match(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g) || "").length;
    while(times) {
        var index = text.search(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/);
        var code = `${text[index]}${text[index+1]}`;
        var thisType = colorCodes[code];
        if(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r))/.test(code)) {
            markdown = [];
            lastColor = thisType;
            placeholderText = text.split(/&(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k)/g)[2];
            text = text.replace(new RegExp(`${code}`), ``);
            jsonContent.push({
                "text":placeholderText,
                "color":thisType,
            });
        } else if(/&(?=(l|o|n|m|k))/.test(code)) {
            markdown.push(thisType);
            placeholderText = text.split(/&(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k)/g)[2];
            text = text.replace(new RegExp(`${code}`), ``);
            var pre = ({
                "text":placeholderText,
                "color":lastColor,
            });
            for(var md of markdown) {
                switch(md) {
                    case 'bold':
                        pre["bold"] = true;
                    break;
                    case 'italic':
                        pre["italic"] = true;
                    break;
                    case 'strikethrough':
                        pre["strikethrough"] = true;
                    break;
                    case 'underlined':
                        pre["underlined"] = true;
                    break;
                    case 'obfuscated':
                        pre["obfuscated"] = true;
                    break;
                }
            }
            jsonContent.push(pre);
        }
        times = (text.match(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g) || "").length
    }
    jsonContent = jsonContent.filter(obj => obj.text.length > 0);
    if(jsonContent.length !== 1) {
    jsonContent.unshift("");
    } else {jsonContent = jsonContent[0]}
    return jsonContent;
}