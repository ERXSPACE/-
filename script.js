var root = {
  wavecolor: {  
    r: 125,
    g: 52,
    b: 253
    },
    rainbowSpeed: 0.5,
    rainbow: true,
    matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
var konkani  = "आर्यावलोकितेश्वरो बोधिसत्त्वो गंभीरायां प्रज्ञापारमितायां चर्यां चरमाणो व्यवलोकयति स्म । पंचस्कन्धाः । तांश्च स्वभावशून्यान्पश्यति स्म । इह शारिपुत्र रूपं शून्यता शून्यतैव रूपं रूपान्न पृथक्शून्यता शून्यताया न पृथग्रूपं यद्रूपं सा शून्यता या शून्यता तद्रूपं । एवमेव वेदनासंज्ञासंस्कारविज्ञानानि । इह शारिपुत्र सर्वधर्माः शून्यतालक्षणा अनुत्पन्ना अनिरुद्धा अमला न विमला नोना न परिपूर्णाः । तस्माच्छारिपुत्र शून्यतायां न रूपं न वेदना न संज्ञा न संस्कारा न विज्ञानानि । न चक्षुःश्रोत्रघ्राणजिह्वाकायमनांसी । न रूपशब्दगंधरसस्प्रष्टव्यधर्माः । न चक्षुर्धातुर्यावन्न मनोविज्ञानधातुः । न विद्या नाविद्या न विद्याक्षयो नाविद्याक्षयो यावन्न जरामरणं न जरामरणक्षयो न दुःखसमुदयनिरोधमार्गा न ज्ञानं न प्राप्तिः ॥ तस्मादप्राप्तित्वाद्बोधिसत्त्वाणां प्रज्ञापारमितामाश्रित्य विहरत्यचित्तावरणः । चित्तावरणनास्तित्वादत्रस्तो विपर्यासातिक्रान्तो निष्ठनिर्वाणः ।। त्र्यध्वव्यवस्थिताः सर्वबुद्धाः प्रज्ञापारमितामाश्रित्यानुत्तरां सम्यक्सम्बोधिमभिसंबुद्धाः ।। तस्माज्ज्ञातव्यं प्रज्ञापारमिता महामन्त्रो महाविद्यामन्त्रो ऽनुत्तरमन्त्रो ऽसमसममन्त्रः सर्वदुःखप्रशमनः । सत्यममिथ्यत्वात् । प्रज्ञपारमितायामुक्तो मन्त्रः । तद्यथा गते गते पारगते पारसंगते बोधि स्वाहा ।। इति प्रज्ञापारमिताहृदयं समाप्तम्"
// converting the string into an array of single characters
var characters = konkani.split("");
var font_size = 14;
var columns = c.width/font_size;    // number of columns for the rain
var gradient = ctx.createLinearGradient(0,10, 0,200);
// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

// drawing the characters
function draw() {
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail

    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = font_size + "px arial";

    // looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        // background color
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillRect(i * font_size, drops[i] * font_size,font_size,font_size);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size

        if (root.rainbow) {
          hue += (hueFw) ? 0.01 : -0.01;
          var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
          var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
          var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
          ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
          ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]++;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
       if (drops[i] * font_size > c.height && Math.random() > 0.975)
			      drops[i] = 0;
    }
}

setInterval(draw, root.matrixspeed);


function livelyPropertyListener(name, val)
{
  switch(name) {
    case "matrixColor":
      root.wavecolor =  hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;   
    case "rainbowSpeed":
      root.rainbowSpeed = val/100;
      break;     
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

