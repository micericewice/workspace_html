// onload=mainLoad;

/*function mainLoad (argument) {
	console.log("========= mainLoad function ========");
	decode("*L~bnzf&");
	decode(".@@DPBC2");
	decode(" TSKBH\\");
	decode("#?`lp94&nbz3I");
	decode("8[uunx=Dpol\"+pwofd *xxl||duzzf8twt2");
	decode("5Vzxm}:Asrs?bx\"ppdtwd|mbb~ l| ");
	decode("%~$eijal~b{at<q|xzd5\";9+,-<3\"cmq``t%2+ddbh,#2~brw|bn:#*5/`I");
	decode("(]gfboh`|uu2Pxzcs8CutqF");
	decode(")}osx%");
	decode("0k3b|g|b~ww8!>||lomwwa\'*%dll.7,> aj187txlmuv>\'<+0qz!(\'|*agnnt/4-!!\"#$%4;:oshuwsiu{!>\'pn{`hgi/\"-txacxto5\";xws~u=,#alhjt%2+)mjk,#2ewk`8ey}ul>\'<qoog!(\'`hf}\'mm`gci3(1gtxd5jiu{<3\"gmmp(unrl(1.<>h3>1rzxc5nr{uj=:#`lha$+*ykohd`h2+0!dm4;:{uixxl=:#3s|%uhd`n+/9>?2=0quv}pjvoux0}plnp!>\'%c89(vO");
	decode("&et{)");
	decode(">n~rrgIWJH5");
	decode("&et{)");
	decode(">n~rrgIWJH5");
	decode(".o`t|w@z[");
	decode("4}s>`qw~tk3rpc`vjkk(wzf~dobb2-3tzxp,51koiop?f`npa>pfz)i6icm`ttGA]Vyzhvt~ri6hiofls+jhkh~bcc gbf}uxs>#x\'z2nnsiu*!(\'/<nfx#zl|/r,\"(v)w9t|t|hu%}+*+jb-e:5hQiQqrl>bgqgad~v~2x2q{qguj.,d]eU\'fnbjzg; ;:)(+56;1zGCc|,3\"98e)agnntBh\'2?08uNtJ3;495ab/=<?`*lhcmqEm$lUmM:0=6<?e}moir</$rdvvvk\'7$");
	decode(".cfst`zwpa~{|4xsp6");
	decode('1j0c{fcqvt9&?}snnvp`$+*eomx/4-!!bk694uwmntq?$=41r{&)$}%`doiu,52 "#$%&54;lrot|vlhvz&?$qazci`h,#2u{`dywn:#8ypr}t"- `kiiu*3((jkh-<3fvla;dpx~tk?$=nnlf&)$agg~&jlcf|h0)6fwyk4i~ntx=,#dljq+taso)6/??`i0?6syyl4m~uzvk"; akib%$+zjhigaw3(1&en54;xtny{m"; 2t}&tgeco,.:? 3>1vtu|kunry3|ommq&?$$l9:)qO');
	decode("asds");
	decode(".]fdta)y|urjpy~kt}z.bmn$Pubz3^YELB/EBWA4Yt}wi~&S1^ Ecwa?Gro):8 -<?!$3");
	decode("asds");
	decode("asds");
	decode("asds");
	decode("asds");
	decode("asds");
	decode("asds");
	decode("asds");
	decode("asds");
	var strEn = encode("TRIAL");
	decode(strEn);
}*/

function decode (encodedString) {
	var decodedString = "";
	var c = '';
	d = encodedString.charCodeAt(0) - 32;


    for (var i = 1; i < encodedString.length - 1; i++) {
    	c = encodedString.charCodeAt(i);
    	c ^= d & 31;
    	d++;
    	decodedString += String.fromCharCode(c);
    };


	console.log("DECODE: " + decodedString);
    return decodedString;
}

function encode (stringEncode) {
	var strLen = stringEncode.length;
	var d = stringEncode.charCodeAt(strLen-1);
	var c = '';
	var encodedString = "";
	encodedString += String.fromCharCode(d - 32);

	for (var i = strLen-1; i >= 0; --i) {
		d--;
		c = stringEncode.charCodeAt(i);
		c ^= d & 31;
		encodedString += String.fromCharCode(c);
	};

	// finally: add first char as key to decode
	var firstCharCode = d + 32;
	encodedString += String.fromCharCode(firstCharCode);

	console.log("== Code: " + firstCharCode + " ----- Char: " + String.fromCharCode(firstCharCode));
	// then reverse the string
	encodedString = reverse(encodedString);

	console.log("ENCODE: " + encodedString);
	return encodedString;
}

function reverse(s) {
  for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
  return o;
}