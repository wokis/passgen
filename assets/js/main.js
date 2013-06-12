function generatePassword(options) {
    options = Object.prototype.toString.call(options) === "[object Object]" ? options : {};

    var keyspace = "",
        result = "",
        i = 0,
        l,
        gen,
        punctuation;

    if (options.hex) {
        keyspace = "0123456789abcdef";
        if (options.uppercase) {
            keyspace = keyspace.toUpperCase();
        }
    } else {
        if (options.alpha) {
            keyspace += "abcdefghjkmnpqrstuvwxyz";
        }

        if (options.uppercase) {
            keyspace += "ABCDEFGHJKLMNPQRSTUVWXYZ";
        }

        if (options.numeric) {
            keyspace += "123456789";
        }

        if (options.punctuation) {
            punctuation = "!?$%^&*()_-+=@~#<>";
            keyspace += punctuation;
        }
    }

    l = keyspace.length - 1;
    if (l < 0) {
        return result;
    }

    //options.size = options.size >>> 0 || 16;
    if (options.size < 4) {
        options.size = 4;
    } else if (options.size > 100) {
        options.size = 100;
    }

    while (i < options.size) {
        gen = keyspace[Math.round(Math.random() * l)];
        if ( (result.charAt( result.length-1 ) == gen) && (options.nosimilar)) {
            result = result.substring(0, result.length - 1);
            //console.log('Generated character same as the last one. Trunkated and regenerated.');
            i--;
            continue;
        }
        result += gen;
        i++;
    }
    
    // if we need letters make sure we get atleast one
    if ( (result.match(/[a-z]/) == null) && (options.alpha)) {
        //console.log('Password generated but no letters found. Regenerating.');
        return generatePassword(options);
    }
    
    // if we need upper case make sure we get atleast one
    if ( (result.match(/[A-Z]/) == null) && (options.uppercase)) {
        //console.log('Password generated but no upper case found. Regenerating.');
        return generatePassword(options);
    }

    // if we need numbers make sure we get atleast one
    if ( (result.match(/\d+/g) == null) && (options.numeric)) {
        //console.log('Password generated but no numbers found. Regenerating.');
        return generatePassword(options);
    }
    
    // if we need punctuation make sure we get atleast one
    if (options.punctuation) {
        for ( var i = 0; i < punctuation.length; i++ )
        {
            // Break if we find a punctuation
            if (result.indexOf(punctuation.charAt(i)) != -1) break;
            //console.log('Password generated but no punctuation found. Regenerating.');
            return generatePassword(options);
        }
    }
    
    return result;
}

function generate() {
    if (parseInt($("#maxLength").val()) < 4) {
        alert('Password length is less then 4.');
        return;
    }
    
    if (!$("#chLetters").prop('checked') && !$("#chUpperCase").prop('checked') && !$("#chNumbers").prop('checked') && !$("#chPunctuation").prop('checked')) {
        alert('You haven\'t selected anything.');
        return;
    }
    
    $("#passgen").text(generatePassword({
                                        alpha: $("#chLetters").prop('checked'),
                                        uppercase: $("#chUpperCase").prop('checked'),
                                        numeric: $("#chNumbers").prop('checked'),
                                        punctuation: $("#chPunctuation").prop('checked'),
                                        size: $("#maxLength").val(),
                                        nosimilar: $("#chNoSimilar").prop('checked')
    }));
    
    $("#generated").prepend('<li>' + $("#passgen").text() + '</li>');
}

$(document).ready(function() {
    generate();
    $("#generate").click(function(event) {
        generate();
        event.preventDefault();
    });
});

$(document).keydown(function(e){
    if (e.keyCode == 13) { 
       generate();
       return false;
    }
});