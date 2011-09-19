/**
File:
	PlayerPlaybackComponent.js
Created By:
	Mario Gonzalez
Project	:
	RealtimeMultiplayerNodeJS
Abstract:
 	Records a players keyboard state to enable playback of a level
 Basic Usage:

 License:
   Creative Commons Attribution-NonCommercial-ShareAlike
   http://creativecommons.org/licenses/by-nc-sa/3.0/

*/
(function(){
    "use strict";

	ChuClone.namespace("ChuClone.components.player");

	var PTM_RATIO = ChuClone.model.Constants.PTM_RATIO;
	ChuClone.components.player.PlayerPlaybackComponent = function() {
		ChuClone.components.player.PlayerPlaybackComponent.superclass.constructor.call(this);
		this.requiresUpdate = true;

		/*


		 */
		this._record = JSON.parse('[{"t":1,"x":1.448,"y":-0.189,"r":1.8639},{"t":160,"x":1.448,"y":0.11,"r":1.8639},{"t":322,"x":1.413,"y":0.901,"r":1.8027},{"t":489,"x":1.257,"y":0.99,"r":1.5351},{"t":1393,"x":1.39,"y":0.961,"r":1.6783},{"t":1544,"x":1.601,"y":0.842,"r":2.0444},{"t":1710,"x":2.27,"y":0.895,"r":2.9297},{"t":1860,"x":2.904,"y":0.812,"r":3.7881},{"t":2010,"x":3.401,"y":0.938,"r":4.5637},{"t":2160,"x":3.729,"y":0.981,"r":5.1687},{"t":2310,"x":3.926,"y":0.945,"r":5.4703},{"t":2460,"x":4.309,"y":1.027,"r":6.0137},{"t":2622,"x":4.847,"y":0.983,"r":6.7189},{"t":2777,"x":5.684,"y":1.039,"r":7.7627},{"t":2927,"x":6.596,"y":-0.244,"r":8.7301},{"t":3077,"x":8.165,"y":-3.205,"r":9.0481},{"t":3228,"x":10.224,"y":-5.304,"r":9.334},{"t":3394,"x":13.13,"y":-7.18,"r":9.6907},{"t":3544,"x":15.739,"y":-8.16,"r":10.0109},{"t":3695,"x":18.05,"y":-8.472,"r":10.2946},{"t":3860,"x":20.739,"y":-8.126,"r":10.6492},{"t":4010,"x":22.388,"y":-7.122,"r":10.9673},{"t":4161,"x":23.366,"y":-5.658,"r":11.2531},{"t":4327,"x":24.561,"y":-3.087,"r":11.6098},{"t":4477,"x":26.149,"y":-0.052,"r":11.9322},{"t":4643,"x":28.266,"y":-0.716,"r":14.8724},{"t":4794,"x":30.615,"y":-3.87,"r":17.5149},{"t":4944,"x":32.887,"y":-6.269,"r":20.0699},{"t":5094,"x":35.23,"y":-8.068,"r":22.6949},{"t":5244,"x":38.024,"y":-10.117,"r":25.2674},{"t":5410,"x":41.652,"y":-12.172,"r":28.1549},{"t":5560,"x":44.952,"y":-13.332,"r":30.7799},{"t":5710,"x":48.208,"y":-13.815,"r":33.3699},{"t":5860,"x":51.442,"y":-13.644,"r":35.9424},{"t":6010,"x":54.742,"y":-12.801,"r":38.5674},{"t":6161,"x":58.02,"y":-11.296,"r":41.1749},{"t":6327,"x":61.606,"y":-8.887,"r":44.0274},{"t":6477,"x":64.862,"y":-6.008,"r":46.6174},{"t":6627,"x":68.14,"y":-2.447,"r":49.2248},{"t":6777,"x":70.666,"y":-1.958,"r":51.4977},{"t":6927,"x":73.124,"y":-2.403,"r":53.7696},{"t":7094,"x":76.622,"y":-2.114,"r":56.2687},{"t":7244,"x":79.645,"y":-1.559,"r":58.3736},{"t":7394,"x":81.851,"y":-2.027,"r":60.1223},{"t":7544,"x":84.294,"y":-2.136,"r":61.9769},{"t":7694,"x":83.278,"y":-3.627,"r":64.3015},{"t":7844,"x":81.89,"y":-4.287,"r":66.2814},{"t":7993,"x":81.246,"y":-3.846,"r":66.7732},{"t":8144,"x":80.354,"y":-2.671,"r":67.2467},{"t":8310,"x":79.756,"y":-1.558,"r":67.3019},{"t":8460,"x":80.049,"y":-1.527,"r":67.3244},{"t":8610,"x":80.495,"y":-1.582,"r":67.9306},{"t":8761,"x":81.25,"y":-1.566,"r":68.8847},{"t":8911,"x":82.121,"y":-1.654,"r":69.8308},{"t":9077,"x":83.498,"y":-1.56,"r":70.9533},{"t":9227,"x":84.417,"y":-1.63,"r":72.0105},{"t":9377,"x":82.988,"y":-3.065,"r":74.2439},{"t":9527,"x":81.022,"y":-3.991,"r":76.3112},{"t":9677,"x":79.85,"y":-2.698,"r":77.9165},{"t":9827,"x":78.779,"y":-1.536,"r":78.3211},{"t":10061,"x":78.883,"y":-1.615,"r":77.9701},{"t":10211,"x":79.432,"y":-1.5,"r":78.6835},{"t":10377,"x":80.164,"y":-1.606,"r":79.606},{"t":10527,"x":81.093,"y":-1.645,"r":80.6337},{"t":10677,"x":82.192,"y":-1.543,"r":81.466},{"t":10827,"x":83.327,"y":-1.652,"r":82.4616},{"t":10977,"x":84.249,"y":-2.195,"r":83.8488},{"t":11144,"x":83.535,"y":-5.254,"r":85.9196},{"t":11294,"x":83.162,"y":-7.651,"r":88.0042},{"t":11444,"x":82.8,"y":-9.328,"r":90.0336},{"t":11594,"x":82.421,"y":-10.37,"r":92.1043},{"t":11760,"x":81.535,"y":-10.738,"r":94.1751},{"t":11910,"x":79.859,"y":-10.426,"r":96.2597},{"t":12061,"x":77.461,"y":-9.448,"r":98.3167},{"t":12227,"x":74.955,"y":-7.804,"r":100.3737},{"t":12377,"x":73.126,"y":-8.064,"r":102.4976},{"t":12527,"x":72.063,"y":-10.908,"r":104.882},{"t":12677,"x":71.774,"y":-13.04,"r":107.0121},{"t":12827,"x":72.179,"y":-16.028,"r":109.3806},{"t":12977,"x":73.339,"y":-18.324,"r":111.7174},{"t":13143,"x":75.304,"y":-19.998,"r":114.1018},{"t":13294,"x":78.063,"y":-21,"r":116.5022},{"t":13444,"x":81.323,"y":-21.32,"r":118.8707},{"t":13594,"x":84.601,"y":-20.973,"r":121.2393},{"t":13762,"x":87.923,"y":-19.942,"r":123.6396},{"t":13927,"x":91.245,"y":-18.227,"r":126.04},{"t":14078,"x":93.729,"y":-17.268,"r":128.2595},{"t":14244,"x":95.848,"y":-17.723,"r":130.4873},{"t":14394,"x":98.564,"y":-17.429,"r":132.4869},{"t":14544,"x":101.283,"y":-17.291,"r":134.8149},{"t":14710,"x":103.948,"y":-17.908,"r":138.0295},{"t":14860,"x":106.651,"y":-17.759,"r":140.9148},{"t":15010,"x":108.232,"y":-17.605,"r":143.0289},{"t":15161,"x":108.059,"y":-17.646,"r":143.5659},{"t":15327,"x":107.834,"y":-16.912,"r":144.0786},{"t":15478,"x":108.135,"y":-15.547,"r":144.5417},{"t":15644,"x":108.078,"y":-14.366,"r":143.6032},{"t":15794,"x":108.485,"y":-12.903,"r":142.512},{"t":15960,"x":108.844,"y":-10.949,"r":140.5398},{"t":16110,"x":108.44,"y":-9.302,"r":138.4703},{"t":16260,"x":108.803,"y":-6.98,"r":136.3868},{"t":16411,"x":109.579,"y":-6.343,"r":136.401},{"t":16577,"x":110.553,"y":-6.373,"r":137.3176},{"t":16728,"x":111.733,"y":-6.282,"r":138.4835},{"t":16894,"x":113.11,"y":-6.51,"r":139.9965},{"t":17044,"x":114.762,"y":-6.359,"r":141.8975},{"t":17210,"x":116.127,"y":-6.631,"r":144.1376},{"t":17360,"x":117.354,"y":-6.207,"r":146.1544},{"t":17511,"x":117.792,"y":-6.373,"r":146.9915},{"t":17677,"x":118.218,"y":-6.199,"r":147.7096},{"t":18461,"x":118.35,"y":-6.185,"r":147.6839},{"t":18622,"x":118.522,"y":-6.276,"r":147.9079},{"t":18778,"x":118.956,"y":-6.363,"r":148.5336},{"t":18943,"x":119.84,"y":-6.347,"r":149.6291},{"t":19094,"x":120.894,"y":-6.276,"r":150.7169},{"t":19244,"x":121.814,"y":-6.517,"r":151.8594},{"t":19410,"x":123.604,"y":-6.404,"r":153.482},{"t":19561,"x":125.672,"y":-6.353,"r":155.9569},{"t":19727,"x":127.493,"y":-7.02,"r":158.5696},{"t":19877,"x":129.788,"y":-7.015,"r":161.165},{"t":20027,"x":132.156,"y":-6.337,"r":163.7777},{"t":20177,"x":133.646,"y":-6.763,"r":166.1362},{"t":20327,"x":135.344,"y":-6.64,"r":168.8378},{"t":20477,"x":136.893,"y":-6.54,"r":171.2834},{"t":20643,"x":138.304,"y":-6.418,"r":173.4903},{"t":20794,"x":139.112,"y":-6.554,"r":175.2025},{"t":20960,"x":138.838,"y":-6.492,"r":176.6305},{"t":21123,"x":138.232,"y":-6.345,"r":176.2839},{"t":21277,"x":137.731,"y":-6.296,"r":175.6094},{"t":21427,"x":137.612,"y":-6.343,"r":175.416},{"t":21644,"x":137.759,"y":-6.285,"r":175.6528},{"t":21794,"x":138.146,"y":-6.152,"r":176.4209},{"t":21961,"x":138.318,"y":-6.199,"r":176.8381},{"t":22261,"x":138.196,"y":-6.131,"r":176.5598},{"t":23310,"x":138.307,"y":-6.197,"r":176.8092},{"t":23461,"x":138.884,"y":-7.263,"r":177.3151},{"t":23629,"x":140.438,"y":-7.849,"r":177.8825},{"t":23794,"x":142.732,"y":-7.613,"r":178.4465},{"t":23944,"x":144.87,"y":-6.689,"r":178.9592},{"t":24095,"x":144.837,"y":-8.154,"r":178.768},{"t":24260,"x":144.254,"y":-9.721,"r":177.9952},{"t":24411,"x":143.718,"y":-10.45,"r":177.2836},{"t":24577,"x":143.473,"y":-10.462,"r":176.5013},{"t":24727,"x":144.055,"y":-9.776,"r":175.8039},{"t":24877,"x":145.423,"y":-8.41,"r":175.097},{"t":25027,"x":147.3,"y":-8.282,"r":174.3317},{"t":25177,"x":149.088,"y":-11.194,"r":173.1083},{"t":25327,"x":150.189,"y":-13.571,"r":171.8932},{"t":25494,"x":150.51,"y":-16.874,"r":170.5312},{"t":25644,"x":149.982,"y":-19.116,"r":169.3161},{"t":25794,"x":148.681,"y":-20.7,"r":168.0927},{"t":25944,"x":147.121,"y":-21.605,"r":166.8776},{"t":26094,"x":145.552,"y":-21.843,"r":165.6543},{"t":26244,"x":144.42,"y":-21.411,"r":164.4391},{"t":26395,"x":144.061,"y":-20.314,"r":163.224},{"t":26561,"x":144.574,"y":-18.291,"r":161.862},{"t":26711,"x":145.673,"y":-19.383,"r":161.0336},{"t":26861,"x":147.637,"y":-22.14,"r":160.2679},{"t":27027,"x":150.092,"y":-24.393,"r":159.4257},{"t":27194,"x":152.348,"y":-25.739,"r":158.6549},{"t":27344,"x":155.08,"y":-26.397,"r":157.8943},{"t":27494,"x":158.342,"y":-26.389,"r":157.1337},{"t":27644,"x":161.29,"y":-25.813,"r":156.4497},{"t":27794,"x":164.59,"y":-24.529,"r":155.684},{"t":27944,"x":167.868,"y":-22.585,"r":154.9234},{"t":28094,"x":171.146,"y":-19.976,"r":154.1628},{"t":28244,"x":174.072,"y":-18.555,"r":153.4839},{"t":28395,"x":177.372,"y":-21.551,"r":152.4126},{"t":28560,"x":181.024,"y":-24.081,"r":151.227},{"t":28710,"x":183.972,"y":-25.52,"r":150.2699},{"t":28861,"x":186.92,"y":-26.42,"r":149.3128},{"t":29028,"x":190.55,"y":-26.788,"r":148.1343},{"t":29194,"x":193.894,"y":-26.404,"r":147.0487},{"t":29344,"x":197.172,"y":-25.356,"r":145.9845},{"t":29494,"x":200.494,"y":-23.614,"r":144.906},{"t":29644,"x":203.398,"y":-21.531,"r":143.9632},{"t":29794,"x":206.676,"y":-20.147,"r":142.9123},{"t":29944,"x":209.954,"y":-23.116,"r":141.9647},{"t":30094,"x":213.254,"y":-25.432,"r":141.0108},{"t":30244,"x":216.202,"y":-26.93,"r":140.1586},{"t":30394,"x":219.458,"y":-27.959,"r":139.2173},{"t":30545,"x":222.736,"y":-28.331,"r":138.2697},{"t":30711,"x":226.014,"y":-28.037,"r":137.3221},{"t":30861,"x":229.336,"y":-27.059,"r":136.3618},{"t":31011,"x":232.614,"y":-25.424,"r":135.4142},{"t":31161,"x":235.914,"y":-23.105,"r":134.4603},{"t":31328,"x":239.544,"y":-20.501,"r":133.4109},{"t":31494,"x":243.174,"y":-23.84,"r":132.5841},{"t":31644,"x":246.452,"y":-26.153,"r":131.8606},{"t":31794,"x":249.752,"y":-28.605,"r":131.1322},{"t":31960,"x":253.382,"y":-31.231,"r":130.3309},{"t":32111,"x":256.66,"y":-32.9,"r":129.6074},{"t":32261,"x":259.938,"y":-33.904,"r":128.8838},{"t":32427,"x":263.568,"y":-34.238,"r":128.0826},{"t":32577,"x":266.868,"y":-33.832,"r":127.3542},{"t":32728,"x":270.124,"y":-32.771,"r":126.6355},{"t":32894,"x":273.732,"y":-30.828,"r":125.8391},{"t":33044,"x":277.01,"y":-28.363,"r":125.1156},{"t":33194,"x":280.288,"y":-25.231,"r":124.392},{"t":33344,"x":281.319,"y":-24.449,"r":124.1564},{"t":33494,"x":281.548,"y":-24.336,"r":124.0823},{"t":33894,"x":281.68,"y":-24.336,"r":124.0893},{"t":34061,"x":281.925,"y":-24.337,"r":124.0893},{"t":34211,"x":282.247,"y":-24.353,"r":124.1336},{"t":34360,"x":282.571,"y":-24.49,"r":124.5129},{"t":34527,"x":283.402,"y":-25.036,"r":125.4739},{"t":34678,"x":284.958,"y":-25.734,"r":126.4686},{"t":34828,"x":287.249,"y":-25.76,"r":127.4566},{"t":34978,"x":289.742,"y":-25.12,"r":128.4446},{"t":35144,"x":292.251,"y":-25.96,"r":129.39},{"t":35294,"x":294.743,"y":-28.783,"r":130.1619},{"t":35445,"x":297.687,"y":-30.951,"r":130.939},{"t":35623,"x":301.295,"y":-32.551,"r":131.7886},{"t":35778,"x":304.617,"y":-34.432,"r":132.5708},{"t":35928,"x":307.917,"y":-35.948,"r":133.3479},{"t":36094,"x":311.569,"y":-36.839,"r":134.2078},{"t":36244,"x":314.517,"y":-36.955,"r":134.902},{"t":36394,"x":317.795,"y":-36.452,"r":135.6739},{"t":36544,"x":321.029,"y":-35.304,"r":136.4355},{"t":36694,"x":323.955,"y":-33.705,"r":137.1245},{"t":36844,"x":327.255,"y":-31.266,"r":137.9015},{"t":36995,"x":330.555,"y":-28.152,"r":138.6786},{"t":37145,"x":333.718,"y":-25.524,"r":139.5776},{"t":37311,"x":336.369,"y":-25.655,"r":140.6304},{"t":37461,"x":338.788,"y":-25.728,"r":142.1587},{"t":37623,"x":340.959,"y":-26.325,"r":144.909},{"t":37778,"x":343.906,"y":-26.246,"r":147.6593},{"t":37928,"x":347.168,"y":-25.615,"r":150.1527},{"t":38094,"x":350.394,"y":-25.569,"r":151.125},{"t":38244,"x":353.024,"y":-25.603,"r":152.1949},{"t":38394,"x":355.527,"y":-26.129,"r":154.545},{"t":38544,"x":358.378,"y":-26.41,"r":157.273},{"t":38694,"x":361.678,"y":-26.023,"r":160.0379},{"t":38844,"x":364.934,"y":-24.981,"r":162.766},{"t":38994,"x":366.988,"y":-25.263,"r":164.6011},{"t":39160,"x":369.402,"y":-25.345,"r":166.2255},{"t":39311,"x":372.513,"y":-24.832,"r":167.9004},{"t":39461,"x":375.12,"y":-24.953,"r":168.8369},{"t":39611,"x":377.94,"y":-24.996,"r":170.2042},{"t":39761,"x":380.468,"y":-25.287,"r":171.8992},{"t":39911,"x":382.985,"y":-24.961,"r":173.6672},{"t":40061,"x":385.061,"y":-24.908,"r":173.9924},{"t":40211,"x":386.311,"y":-25.039,"r":175.133},{"t":40361,"x":387.18,"y":-24.925,"r":176.3132},{"t":40511,"x":387.808,"y":-27.198,"r":176.9982},{"t":40677,"x":388.502,"y":-30.235,"r":177.3198},{"t":40828,"x":389.121,"y":-32.238,"r":177.6067},{"t":40978,"x":389.74,"y":-33.576,"r":177.8936},{"t":41144,"x":390.425,"y":-34.28,"r":178.2113},{"t":41294,"x":391.048,"y":-34.211,"r":178.5001},{"t":41444,"x":391.671,"y":-33.466,"r":178.789},{"t":41595,"x":392.294,"y":-32.047,"r":179.0778},{"t":41761,"x":392.979,"y":-35.465,"r":178.7735},{"t":41911,"x":393.602,"y":-37.863,"r":178.3554},{"t":42077,"x":394.291,"y":-39.731,"r":177.8928},{"t":42227,"x":394.914,"y":-40.707,"r":177.4748},{"t":42377,"x":395.529,"y":-41.009,"r":177.0623},{"t":42527,"x":396.152,"y":-40.644,"r":176.6443},{"t":42678,"x":396.775,"y":-39.604,"r":176.2263},{"t":42844,"x":397.46,"y":-37.681,"r":175.7665},{"t":42994,"x":398.083,"y":-35.223,"r":175.3484},{"t":43144,"x":398.702,"y":-32.114,"r":174.9332},{"t":43295,"x":399.321,"y":-28.339,"r":174.5179},{"t":43460,"x":399.74,"y":-23.349,"r":174.0553},{"t":43623,"x":399.324,"y":-18.129,"r":173.6373},{"t":43778,"x":398.144,"y":-12.275,"r":173.2221},{"t":43928,"x":396.108,"y":-11.127,"r":171.7169},{"t":44078,"x":393.779,"y":-11.493,"r":169.7667},{"t":44244,"x":390.657,"y":-11.174,"r":167.7906},{"t":44394,"x":388.051,"y":-11.119,"r":165.5127},{"t":44561,"x":385.801,"y":-11.906,"r":162.7495},{"t":44711,"x":383.266,"y":-11.949,"r":160.4918},{"t":44861,"x":379.995,"y":-11.365,"r":157.9813},{"t":45011,"x":377.692,"y":-11.552,"r":155.4603},{"t":45177,"x":375.394,"y":-12.064,"r":152.8811},{"t":45328,"x":372.695,"y":-11.891,"r":150.3359},{"t":45478,"x":370.033,"y":-11.06,"r":147.8246},{"t":45640,"x":368.797,"y":-11.556,"r":145.8125},{"t":45794,"x":367.732,"y":-11.62,"r":143.852},{"t":45944,"x":366.672,"y":-11.067,"r":141.9275},{"t":46096,"x":365.757,"y":-11.163,"r":140.4576},{"t":46261,"x":364.565,"y":-11.091,"r":139.13},{"t":46411,"x":362.968,"y":-11.161,"r":137.2955},{"t":46561,"x":360.61,"y":-11.993,"r":135.4732},{"t":46711,"x":357.828,"y":-12.171,"r":133.8221},{"t":46861,"x":354.506,"y":-11.723,"r":131.9753},{"t":47011,"x":351.386,"y":-10.78,"r":130.1492},{"t":47177,"x":349.79,"y":-11.506,"r":128.0608},{"t":47327,"x":347.402,"y":-11.555,"r":125.9585},{"t":47477,"x":344.472,"y":-10.933,"r":123.8841},{"t":47640,"x":342.361,"y":-11.364,"r":123.3019},{"t":47795,"x":340.343,"y":-11.342,"r":123.3019},{"t":47961,"x":338.284,"y":-10.865,"r":122.5576},{"t":48111,"x":336.92,"y":-10.997,"r":120.4258},{"t":48261,"x":335.714,"y":-10.948,"r":118.5022},{"t":48411,"x":334.737,"y":-10.955,"r":116.9118},{"t":48561,"x":334.128,"y":-10.876,"r":115.8751},{"t":48711,"x":334.003,"y":-10.9,"r":115.6602},{"t":48861,"x":334.316,"y":-10.748,"r":116.1759},{"t":49011,"x":334.5,"y":-10.784,"r":116.5326},{"t":49161,"x":334.219,"y":-10.799,"r":116.0485},{"t":49311,"x":333.668,"y":-11.07,"r":115.2453},{"t":49461,"x":332.449,"y":-12.071,"r":114.1804},{"t":49611,"x":330.566,"y":-12.414,"r":113.094},{"t":49761,"x":328.663,"y":-12.087,"r":112.0292},{"t":49911,"x":326.889,"y":-11.094,"r":110.9572},{"t":50061,"x":326.376,"y":-10.415,"r":110.0352},{"t":50211,"x":326.336,"y":-10.272,"r":109.9558},{"t":50360,"x":326.336,"y":-10.795,"r":109.9558},{"t":50661,"x":326.336,"y":-10.932,"r":109.9558},{"t":50811,"x":326.336,"y":-11.314,"r":109.9558},{"t":50961,"x":326.336,"y":-11.808,"r":109.9558},{"t":51111,"x":326.336,"y":-12.405,"r":109.9558},{"t":51261,"x":326.336,"y":-13.079,"r":109.9558},{"t":51411,"x":326.336,"y":-13.803,"r":109.9558},{"t":51561,"x":326.336,"y":-14.542,"r":109.9558},{"t":51711,"x":326.336,"y":-15.302,"r":109.9558},{"t":51861,"x":326.336,"y":-16.066,"r":109.9558},{"t":52011,"x":326.336,"y":-16.831,"r":109.9558},{"t":52161,"x":326.336,"y":-17.591,"r":109.9558},{"t":52311,"x":326.336,"y":-18.351,"r":109.9558},{"t":52461,"x":326.336,"y":-19.11,"r":109.9558},{"t":52611,"x":326.336,"y":-19.874,"r":109.9558},{"t":52761,"x":326.336,"y":-20.554,"r":109.9558},{"t":52911,"x":326.336,"y":-21.298,"r":109.9558},{"t":53072,"x":326.336,"y":-21.809,"r":109.9558},{"t":53223,"x":326.336,"y":-22.493,"r":109.9558},{"t":53373,"x":326.336,"y":-23.114,"r":109.9558},{"t":53540,"x":326.336,"y":-23.697,"r":109.9558},{"t":53706,"x":326.336,"y":-24.133,"r":109.9558},{"t":53856,"x":326.336,"y":-24.415,"r":109.9558},{"t":54006,"x":326.369,"y":-24.606,"r":109.9558},{"t":54156,"x":326.563,"y":-24.73,"r":109.9558},{"t":54306,"x":326.983,"y":-24.73,"r":109.9558},{"t":54456,"x":327.495,"y":-24.493,"r":109.9558},{"t":54606,"x":327.984,"y":-24.257,"r":109.9558},{"t":54756,"x":328.717,"y":-24.362,"r":109.9558},{"t":54906,"x":330.12,"y":-24.857,"r":109.9558},{"t":55056,"x":330.517,"y":-24.749,"r":109.8243},{"t":55506,"x":330.502,"y":-24.982,"r":110.0122},{"t":55656,"x":330.911,"y":-25.636,"r":110.8769},{"t":55806,"x":332.1,"y":-25.622,"r":111.7473},{"t":55956,"x":333.488,"y":-25.791,"r":113.3172},{"t":56106,"x":335.431,"y":-25.596,"r":115.0506},{"t":56256,"x":337.055,"y":-26.157,"r":117.1678},{"t":56406,"x":339.47,"y":-26.049,"r":119.2992},{"t":56556,"x":342.243,"y":-25.68,"r":121.4654},{"t":56706,"x":344.078,"y":-26.453,"r":123.8499},{"t":56856,"x":346.683,"y":-26.559,"r":126.2344},{"t":57006,"x":349.909,"y":-26,"r":128.6189},{"t":57156,"x":353.002,"y":-25.729,"r":129.802},{"t":57306,"x":356.255,"y":-25.475,"r":130.3797},{"t":57456,"x":358.8,"y":-25.87,"r":131.8154},{"t":57606,"x":361.991,"y":-25.639,"r":133.2584},{"t":57756,"x":365.125,"y":-25.248,"r":135.7426},{"t":57906,"x":368.116,"y":-25.309,"r":137.4272},{"t":58056,"x":371.317,"y":-25.548,"r":137.4272},{"t":58206,"x":374.617,"y":-25.111,"r":137.4272},{"t":58356,"x":377.445,"y":-25.206,"r":137.8741},{"t":58506,"x":380.644,"y":-26.037,"r":138.6803},{"t":58656,"x":383.901,"y":-26.193,"r":139.4865},{"t":58806,"x":386.913,"y":-25.686,"r":140.2819},{"t":58956,"x":389.194,"y":-27.495,"r":140.7711},{"t":59106,"x":390.721,"y":-30.179,"r":140.8697},{"t":59256,"x":391.992,"y":-32.197,"r":140.9684},{"t":59406,"x":393.781,"y":-34.198,"r":141.0677},{"t":59556,"x":394.099,"y":-36.046,"r":142.3847},{"t":59706,"x":394.039,"y":-36.939,"r":144.0405},{"t":59856,"x":394.655,"y":-37.158,"r":145.6852},{"t":60006,"x":395.402,"y":-36.845,"r":147.2526},{"t":60156,"x":395.918,"y":-36.836,"r":148.096},{"t":60306,"x":395.758,"y":-36.76,"r":147.8393},{"t":60456,"x":395.415,"y":-36.801,"r":147.3517},{"t":60606,"x":394.868,"y":-36.847,"r":146.5598},{"t":60756,"x":394.293,"y":-36.358,"r":145.5382},{"t":60906,"x":394.356,"y":-35.209,"r":144.4294},{"t":61056,"x":394.088,"y":-34.086,"r":143.0872},{"t":61206,"x":393.765,"y":-32.401,"r":141.7089},{"t":61356,"x":393.44,"y":-34.535,"r":140.3549},{"t":61506,"x":393.462,"y":-37.113,"r":139.0355},{"t":61656,"x":394.254,"y":-39.045,"r":137.7071},{"t":61806,"x":395.823,"y":-41.271,"r":136.3788},{"t":61956,"x":398.163,"y":-43.302,"r":135.0505},{"t":62106,"x":400.949,"y":-44.672,"r":133.7133},{"t":62256,"x":403.705,"y":-45.368,"r":132.376},{"t":62406,"x":405.886,"y":-45.389,"r":131.0388},{"t":62556,"x":407.317,"y":-44.735,"r":129.7016},{"t":62706,"x":408.339,"y":-43.817,"r":128.9145},{"t":62856,"x":408.151,"y":-43.847,"r":129.0432},{"t":63006,"x":407.731,"y":-43.867,"r":128.5031},{"t":63156,"x":407.253,"y":-43.925,"r":127.7692},{"t":63306,"x":406.924,"y":-43.768,"r":127.1137},{"t":64139,"x":407.055,"y":-43.763,"r":127.2671},{"t":64289,"x":407.177,"y":-43.846,"r":127.4711},{"t":64439,"x":407.561,"y":-43.945,"r":128.0496},{"t":64589,"x":408.347,"y":-43.853,"r":129.0441},{"t":64739,"x":408.76,"y":-43.937,"r":129.7119},{"t":64890,"x":409.193,"y":-43.725,"r":130.4361},{"t":65056,"x":409.699,"y":-42.882,"r":131.5622},{"t":65206,"x":410.06,"y":-41.41,"r":132.5798},{"t":65356,"x":409.74,"y":-39.262,"r":133.5974},{"t":65506,"x":409.668,"y":-37.013,"r":135.7126},{"t":65656,"x":409.488,"y":-34.481,"r":138.5244},{"t":65806,"x":409.535,"y":-31.627,"r":138.8453},{"t":65956,"x":409.561,"y":-28.801,"r":138.8453}]');
		//this._record = this._record.reverse();

	};

	ChuClone.components.player.PlayerPlaybackComponent.prototype = {
        /**
         * @type {String}
         */
		displayName						: "PlayerPlaybackComponent",					// Unique string name for this Trait

        /**
         * @type {ChuClone.GameEntity}
         */
        _player					: null,

		/**
		 * Must have a valid method 'getCurrentTime'
		 * @type {Object}
		 */
		_clockDelegate			: null,

		/**
		 * @type {Array}
		 */
		_record	    : null,

		/**
		 * Bitmask of the current keyboard state
		 * @type {Number}
		 */
		_currentState: 0,

		/**
		 * @inheritDoc
		 */
		attach: function(anEntity) {
			//anEntity.removeAllComponents();
			ChuClone.components.player.PlayerPlaybackComponent.superclass.attach.call(this, anEntity);
			this.attachedEntity.getBody().SetType( Box2D.Dynamics.b2Body.b2_staticBody );
		},

        execute: function() {
            ChuClone.components.player.PlayerPlaybackComponent.superclass.execute.call(this);
			if( !this._clockDelegate ) {
				console.error("Cannot attach PlayerPlaybackComponent without valid clock delegate");
				return;
			}
        },

		/**
		 * Overrides the keyboardComponents state
		 */
		update: function() {
			var time = this._clockDelegate.getCurrentTime();
			//time += 4;
			var len = this._record.length;
			var needsUpdate = false;
			var i = 0;
			this.lastI = 0;
			var lastState = null;
			while( i < len) {
				var stateInfo = this._record[i];

				// Match found - set our state and pop the element
				if(stateInfo.t >= time) {
					this._currentState = stateInfo;
					//this._record.shift();
					needsUpdate = true;
					//this.lastI = i-1;
					lastState = this._record[i-1];
					break;
				}
				i++;
			}


			if( !lastState || !this._currentState ) return;

			// Found an update state
			var offset = time - lastState.t;
			var durationBetweenPoints = (this._currentState.t - lastState.t);
			var t = Math.max(0, Math.min(1, offset / durationBetweenPoints) );
			//t = - 0.5 * ( Math.cos( Math.PI * t ) - 1 );
			//var k = t;
			//var s = 1.70158 * 1.525;
			//if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
			//t = 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );
			//t = k;

			/**
			 * - 0.5 * ( Math.cos( Math.PI * k ) - 1 );
			 */
			// Interpolate between two points
			var newX = (this._currentState.x - lastState.x) * t + lastState.x;
			var newY = (this._currentState.y - lastState.y) * t + lastState.y;
			var newRotation = (this._currentState.r - lastState.r) * t + lastState.r;
			this.attachedEntity.getBody().SetPositionAndAngle( new Box2D.Common.Math.b2Vec2(newX, newY), newRotation );
		},

        /**
         * Restore material and restitution
         */
        detach: function() {
           ChuClone.components.player.PlayerPlaybackComponent.superclass.detach.call(this);
        },

		/**
		 * Sets the object we call getClock on, probably the playlevelstate
		 * @param {ChuClone.states.PlayLevelState} aDelegate
		 */
		setClockDelegate: function( aDelegate ) {
		   if( typeof aDelegate.getCurrentTime === 'function' ) {
			   this._clockDelegate = aDelegate;
		   }
		},

		/**
		 * @return {Array}
		 */
		getRecord: function() { return this._record }
	};

    ChuClone.extend( ChuClone.components.player.PlayerPlaybackComponent, ChuClone.components.BaseComponent );
})();