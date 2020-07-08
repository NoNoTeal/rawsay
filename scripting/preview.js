//do you really expect me to explain shit in comments?
const colorCodes = {
    '&4':'dark_red',
    '&c':'red',
    '&6':'gold',
    '&e':'yellow',
    '&a':'green',
    '&2':'dark_green',
    '&b':'aqua',
    '&3':'dark_aqua',
    '&9':'blue',
    '&1':'dark_blue',
    '&5':'dark_purple',
    '&d':'light_purple',
    '&f':'white',
    '&7':'gray',
    '&8':'dark_gray',
    '&0':'black',
    '&r':'white',
    '&l':'bold',
    '&o':'italic',
    '&n':'underlined', 
    '&m':'strikethrough',
    '&k':'obfuscated'
};

function previewClick() {
    var textArea = document.getElementById('input');
    var previewArea = document.getElementById('output');
    if(!textArea.value.length) {
        previewArea.innerHTML = "<span class=\"red bold italic no_select\">&#60;No Text Provided&#62;</span>";
        return;
    } else {
        var cleanedArea = colorAlignment(textArea.value);
        previewArea.className = "chatBox white no_select";

        var parsed = new DOMParser().parseFromString(cleanedArea, 'text/html');
        parsed = parsed.body.innerHTML;
        previewArea.innerHTML = parsed;
        previewArea.style.height = "";
        previewArea.style.height = previewArea.scrollHeight + "px";
    };
}
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&(?!(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g, "&#38;")
         .replace(/</g, "&#60;")
         .replace(/>/g, "&#62;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/\n/g,"</br>")
}

function colorAlignment(text) {
    text = escapeHtml(text.replace(/§(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g, "&")
    .replace('§', ''));
    text = `<span class="white">${text}`;
    var lastColor = "white";
    var markdown = [];
    var times = (text.match(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g) || "").length
    while(times) {
        var index = text.search(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/);
        var code = `${text[index]}${text[index+1]}`;
        var thisType = colorCodes[code];
        if(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r))/.test(code)) {
            markdown = [];
            lastColor = thisType;
            text = text.replace(new RegExp(`${code}`), `</span><span class='${lastColor} no_select'>`);
        } else if(/&(?=(l|o|n|m|k))/.test(code)) {
            markdown.push(thisType);
                text = text.replace(new RegExp(`${code}`), `</span><span class='${lastColor} ${markdown.join(' ')} no_select'>`);
        }
        times = (text.match(/&(?=(4|c|6|e|a|2|b|3|9|1|5|d|f|7|8|0|r|l|o|n|m|k))/g) || "").length
    }
    text = `${text}</span>`
    return text;
}