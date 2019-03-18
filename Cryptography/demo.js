function mod(a, b) {
    if(a+b==0)
        return 0;
    return a >= 0 ? a % b : b + a%b; 
}

function module_inverse(k, N){
        var t1 = 0, t2 =1;
        while(k > 0) {
            q = Math.floor(N/k);
            r = N - k*q;
            N = k;
            k = r;
            t = t1 - t2*q;
            t1 = t2;
            t2 = t;
        }
        if (N==1)
            return t1;
        return 0;
}

function stringToArray(text) {
    var arr = [];
    for(var i = 0; i < text.length; i++) {
        charIndex = text.charCodeAt(i);
        charIndex >= 65 &&  charIndex <= 90 ? arr.push(charIndex - 65): arr.push(charIndex - 97);
    }
    return arr;
}

function encrypt(){
    var ciphers = $('select[name=ciphers]').val();
    text = document.getElementById('inputLeft').value;
    k = parseInt(document.getElementById('myRange').value);
    kVegenere = document.getElementById('kVegenere').value;
    
    switch(ciphers){
        case '1':
            document.getElementById('inputRight').value = ceasar.encrypt(text, k, 26); break;
        case '2':
            document.getElementById('inputRight').value = multi.encrypt(text, k, 26); break;
        case '3':
            k2 = parseInt(document.getElementById('myRange2').value);
            document.getElementById('inputRight').value = affine.encrypt(text, k, k2, 26);
            break;
        case '4':
            document.getElementById('inputRight').value = vegenere.encrypt(text, kVegenere, 26); break;
    }
}

function decrypt() {
    var ciphers = $('select[name=ciphers]').val();
    text = document.getElementById('inputLeft').value;
    k = parseInt(document.getElementById('myRange').value);
    kVegenere = document.getElementById('kVegenere').value;

    switch(ciphers){
        case '1':
            document.getElementById('inputRight').value = ceasar.decrypt(text, k, 26); break;
        case '2':
            document.getElementById('inputRight').value = multi.decrypt(text, k, 26); break;
        case '3':
            k2 = parseInt(document.getElementById('myRange2').value);
            document.getElementById('inputRight').value = affine.decrypt(text, k, k2, 26);
            break;
        case '4':
        document.getElementById('inputRight').value = vegenere.decrypt(text, kVegenere, 26); break;
    }
}

function CeasarCipher() {
    this.encrypt = function(plainText, k, N) {
        var cipherText = "";
        for (var i = 0; i<plainText.length; i++) {
            charIndex = plainText.charCodeAt(i);
            if(charIndex == 32)
                cipherText += " ";
            else if(charIndex >= 65 && charIndex <= 90)
                cipherText += String.fromCharCode(mod((charIndex - 65 + k), N) + 65);
            else
                cipherText += String.fromCharCode(mod((charIndex - 97 + k), N) + 97);
        }
        return cipherText;
    }

    this.decrypt = function(cipherText, k, N) {
        return this.encrypt(cipherText, k*-1, N);
    }
}

function MultiplicativeCipher() {
    this.encrypt = function(plainText, k, N) {
        var cipherText = "";
        for (var i = 0; i<plainText.length; i++) {
            charIndex = plainText.charCodeAt(i);
            if(charIndex == 32)
                cipherText += " ";
            else if(charIndex >= 65 && charIndex <= 90)
                cipherText += String.fromCharCode(mod(((charIndex - 65) * k), N) + 65);
            else
                cipherText += String.fromCharCode(mod(((charIndex - 97) * k), N) + 97);
        }
        return cipherText;
    }

    this.decrypt = function(cipherText, k, N) {
        k = module_inverse(k, N);
        if(k!=0)
            return this.encrypt(cipherText, k, N);
        return "Can't decode!";
    }
}

function AffineCipher(){
    this.encrypt = function(plainText, k1, k2, N) {
        var cipherText = "";
        for (var i = 0; i<plainText.length; i++) {
            charIndex = plainText.charCodeAt(i);
            if(charIndex == 32)
                cipherText += " ";
            else if(charIndex >= 65 && charIndex <= 90)
                cipherText += String.fromCharCode(mod(((charIndex - 65) * k1 + k2), N) + 65);
            else
                cipherText += String.fromCharCode(mod(((charIndex - 97) * k1 + k2), N) + 97);
        }
        return cipherText;
    }

    this.decrypt = function(cipherText, k1, k2, N) {
        k1 = module_inverse(k1, N);
        if(k1!=0) {
            var plainText = "";
            for (var i = 0; i<cipherText.length; i++) {
                charIndex = cipherText.charCodeAt(i);
                if(charIndex == 32)
                    plainText += " ";
                else if(charIndex >= 65 && charIndex <= 90)
                    plainText += String.fromCharCode(mod(((charIndex - 65 - k2) * k1), N) + 65);
                else
                    plainText += String.fromCharCode(mod(((charIndex - 97 - k2) * k1), N) + 97);
            }
            return plainText;
        }
        return "Can't decode!";
    }
}

function VegenereCipher() {
    this.encrypt = function(plainText, k, N) {
        // plainText = stringToArray(plainText);
        k = stringToArray(k);
        cipherText = "";
        for(var i = 0; i < plainText.length; i++) {
            charIndex = plainText.charCodeAt(i);
            if(charIndex == 32)
                cipherText += " ";
            else if(charIndex >= 65 && charIndex <= 90)
                cipherText += String.fromCharCode(mod(charIndex - 65 + k[i % k.length], N) + 65);
            else
                cipherText += String.fromCharCode(mod(charIndex - 97 + k[i % k.length], N) + 97);
        }
        return cipherText;
    }

    this.decrypt = function(cipherText, k, N) {
        k = stringToArray(k);
        plainText = "";
        for(var i = 0; i < cipherText.length; i++) {
            charIndex = cipherText.charCodeAt(i);
            if(charIndex == 32)
                plainText += " ";
            else if(charIndex >= 65 && charIndex <= 90)
                plainText += String.fromCharCode(mod(charIndex - 65 - k[i % k.length], N) + 65);
            else
                plainText += String.fromCharCode(mod(charIndex - 97 - k[i % k.length], N) + 97);
        }
        return plainText;
    }
}