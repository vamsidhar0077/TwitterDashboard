let url = window.location.href;
let globalTweets = [];
let localTweets = [];
let filtersData = new Map();
let searchedVal = "";
let topicRelatedArticles = new Map();

$(document).ready(function () {

    loadArticles();

    $("#getTweets").click(function () {
        // searchedVal = $("#searchedInput").val();
        // let localUrl = url + "rest/twitter/getTweets/"+searchedVal;
        // globalTweets = [];
        // localTweets = [];
        $.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=10&playlistId=PLSti19ysyJtDYa2JdSjVYWaKhuul1jPUP&key=AIzaSyDTGhMfm5U-u8vjKfA36qZdOs6RMQsdU-k", function (data) {
            // for(var i=0;i<data.length;i++){
            //     globalTweets.push(data[i]);
            //     localTweets.push(data[i]['tweet_text']);
            // }
            // display();
            // displayChartsCountry(globalTweets);
            // displayChartsLanguage(globalTweets);
            // displayChartsSentiment(globalTweets);
            // displayChartsLTopic(globalTweets);
            debugger;

        })
    });


    var filters = function () {
        searchedVal =  $("#searchedInput").val();
        let localUrl = url + "rest/twitter/getFilteredTweets/";
        var obj = mapToObj(filtersData);
        localUrl = localUrl + obj;
        if(searchedVal.length > 0)
            localUrl = localUrl + "tweet_text:("+searchedVal+")";
        else
            localUrl = localUrl.substring(0, localUrl.length - 3);

        $.get(localUrl, function (data) {
            data = JSON.parse(data);
            globalTweets = [];
            localTweets = [];
            for(var i=0;i<data.length;i++){
                globalTweets.push(data[i]);
                localTweets.push(data[i]['tweet_text']);
            }
            display();
            displayChartsCountry(globalTweets);
            displayChartsLanguage(globalTweets);
            displayChartsSentiment(globalTweets);
            displayChartsLTopic(globalTweets);
        })
    };


    $('#countryFilter').on('change', function () {
        var selectedCountries = new Array();
        $('input[name="country"]:checked').each(function() {
            selectedCountries.push(this.value);
        });
        filtersData.set("country", selectedCountries);
        filters();
    });

    $('#languageFilter').on('change', function () {
        var selectedLanguage = new Array();
        $('input[name="language"]:checked').each(function() {
            selectedLanguage.push(this.value);
        });
        filtersData.set("language", selectedLanguage);
        filters();
    });

    $('#poiFilter').on('change', function () {
        var selectedPOIs = new Array();
        $('input[name="user_name"]:checked').each(function() {
            selectedPOIs.push(this.value);
        });
        filtersData.set("user_name", selectedPOIs);
        filters();
    });

    $('#topicFilter').on('change', function () {
        var selectedtopics = new Array();
        $('input[name="topic"]:checked').each(function() {
            selectedtopics.push(this.value);
        });
        filtersData.set("topic", selectedtopics);
        filters();
    });

    var display = function () {
        $("#itemList").empty();
        var rows = "<tbody>";
        for(var i=0;i<globalTweets.length;i++) {
            rows += "<tr>" +
                "<td>" + globalTweets[i]["user_name"];
            if (globalTweets[i]["verified"] == "[true]") {
                rows += "<i class=\"fas fa-check-circle\" style='color: deepskyblue'></i>"
            }
            rows += "<br>"+globalTweets[i]["tweet_text"] + "</td>";
        }
        rows +="</tbody>";
        $( rows ).appendTo( "#itemList" );
        $("#results").css("overflow-y","scroll");
        $("#results").css("height","500");
        $("#results").css("width","inherit");
    };

    function mapToObj(map){
        let str = "";
        for (let [k,v] of map){
            for(let i=0;i<v.length;i++){
                if(k == "tweet_text"){
                    v[i] = v[i].toString().trim().replaceAll(" "," AND ");
                }
                str = str + k+":"+v[i]+" AND ";
            }
        }
        return str.substr(0, str.length);
    }

    function displayChartsCountry(globalTweets) {
        $("#myPieChart").empty();
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';
        var dataPoints = [0,0,0];
        for(var i=0;i<globalTweets.length;i++){
            if(globalTweets[i]["country"] == "India"){
                dataPoints[0] = dataPoints[0] + 1;
            }
            if(globalTweets[i]["country"] == "Brazil"){
                dataPoints[1] = dataPoints[1] + 1;
            }
            if(globalTweets[i]["country"] == "US"|| globalTweets[i]["country"] == "USA"){
                dataPoints[2] = dataPoints[2] + 1;
            }
        }
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["India", "Brazil", "USA"],
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }


    function displayChartsLanguage(globalTweets) {
        debugger;
        $("#myBarChart").empty();
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';
        var dataPoints = [0,0,0];
        for(var i=0;i<globalTweets.length;i++){
            if(globalTweets[i]["lang"] == "hi"){
                dataPoints[0] = dataPoints[0] + 1;
            }
            if(globalTweets[i]["lang"] == "pt"){
                dataPoints[1] = dataPoints[1] + 1;
            }
            if(globalTweets[i]["lang"] == "en"){
                dataPoints[2] = dataPoints[2] + 1;
            }
        }
        debugger;
        var ctx = document.getElementById("myBarChart");
        var myPieChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Hindi", "Portuguese", "English"],
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['#DF8D0C', '#6c88c5', '#14CC80'],
                    hoverBackgroundColor: ['#DF8D0C', '#769fc5', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    function displayChartsSentiment(globalTweets) {
        $("#myLineChart").empty();
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';
        var dataPoints = [0,0];
        for(var i=0;i<globalTweets.length;i++){
            if(globalTweets[i]["sentiment"] == "[positive]"){
                dataPoints[0] = dataPoints[0] + 1;
            }
            if(globalTweets[i]["sentiment"] == "[negative]"){
                dataPoints[1] = dataPoints[1] + 1;
            }
        }

        var ctx = document.getElementById("myLineChart");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Positive", "Negative"],
                datasets: [{
                    data: dataPoints,
                    backgroundColor: [ '#04c80e', '#cc1222'],
                    hoverBackgroundColor: [ '#0da620', '#af1419'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    function displayChartsLTopic(globalTweets) {
        $("#topicChart").empty();
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';
        var dataPoints = [0,0,0,0,0,0,0,0,0,0];
        debugger;
        for(var i=0;i<globalTweets.length;i++){
            if(globalTweets[i]["topic"] == "[ Politics]]"){
                dataPoints[0] = dataPoints[0] + 1;
            }
            if(globalTweets[i]["topic"] == "[Campaign]"){
                dataPoints[1] = dataPoints[1] + 1;
            }
            if(globalTweets[i]["topic"] == "[Violence]"){
                dataPoints[2] = dataPoints[2] + 1;
            }
            if(globalTweets[i]["topic"] == "[Social Welfare]"){
                dataPoints[3] = dataPoints[3] + 1;
            }
            if(globalTweets[i]["topic"] == "[Elections]"){
                dataPoints[4] = dataPoints[4] + 1;
            }
            if(globalTweets[i]["topic"] == "[Economy]"){
                dataPoints[5] = dataPoints[5] + 1;
            }
            if(globalTweets[i]["topic"] == "[Vote]"){
                dataPoints[6] = dataPoints[6] + 1;
            }
            if(globalTweets[i]["topic"] == "[Railway]"){
                dataPoints[7] = dataPoints[7] + 1;
            }
            if(globalTweets[i]["topic"] == "[ Government]]"){
                dataPoints[8] = dataPoints[8] + 1;
            }
            if(globalTweets[i]["topic"] == "[ Democracy]]"){
                dataPoints[9] = dataPoints[9] + 1;
            }
        }
        debugger;
        var ctx = document.getElementById("topicChart");
        var topicChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Politics", "Campaign", "Violence", "Social Welfare","Elections", "Economy","Vote",  "Railway", "Government" , "Democracy"] ,
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['#DF8D0C', '#6c88c5', '#14CC80', '#DF1BBC', '#DBDADF', '#DF9EBD', '#DF775B', '#4249DF', '#C5BE13', '#C5B86C','#14CC80' ],
                    hoverBackgroundColor: ['#DF8D0C', '#6c88c5', '#14CC80', '#DF1BBC', '#DBDADF', '#DF9EBD', '#DF775B', '#4249DF', '#C5BE13', '#C5B86C','#14CC80'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    function loadArticles() {
        topicRelatedArticles.set("Politics", []);
        topicRelatedArticles.get("Politics").push("https://www.nytimes.com/2019/09/12/us/politics/kamala-harris-debate.html\n" +
            "https://abcnews.go.com/Politics/democrats-gear-abc-news-debate-houston-front-runners/story?id=65390001");
        topicRelatedArticles.get("Politics").push("https://www.newyorker.com/news/news-desk/the-new-yorkers-coverage-of-the-september-democratic-debate")
        topicRelatedArticles.get("Politics").push("https://www.nytimes.com/2019/09/12/us/politics/democratic-presidential-debate-recap.html");
        topicRelatedArticles.get("Politics").push("https://abcnews.go.com/Politics/gop-super-pac-anti-aoc-ad-aired-dems/story?id=65603942\n");
        topicRelatedArticles.get("Politics").push("https://time.com/4496518/brazil-lula-corruption-charges/");
        topicRelatedArticles.get("Politics").push("https://www.bloomberg.com/news/articles/2019-09-15/no-release-date-set-so-far-for-brazil-s-bolsonaro-after-surgery");
        topicRelatedArticles.get("Politics").push("https://www.churchmilitant.com/news/article/the-pope-brazil-and-liberation-theology");
        topicRelatedArticles.get("Politics").push("http://www.trueactivist.com/brazil-in-crisis-was-dilma-rousseffs-impeachment-a-coup/");

        topicRelatedArticles.set("Campaign",[]);
        topicRelatedArticles.get("Campaign").push("https://www.nytimes.com/2019/09/15/us/politics/kamala-harris-san-francisco-da.html");
        topicRelatedArticles.get("Campaign").push("https://www.nytimes.com/2019/09/13/us/politics/joe-biden-elizabeth-warren-debate.html");
        topicRelatedArticles.get("Campaign").push("https://www.nytimes.com/2019/09/13/us/politics/alexandria-ocasio-cortez-debate-ad.html");
        topicRelatedArticles.get("Campaign").push("https://www.nytimes.com/2019/09/13/us/politics/joe-biden-elizabeth-warren-debate.html");
        topicRelatedArticles.get("Campaign").push("https://www.institutolula.org/en/the-french-newspaper-l-humanite-praised-the-huge-legacy-left-by-lula");
        topicRelatedArticles.get("Campaign").push("https://www.bloomberg.com/news/articles/2019-09-15/no-release-date-set-so-far-for-brazil-s-bolsonaro-after-surgery");
        topicRelatedArticles.get("Campaign").push("https://montrealgazette.com/news/national/election-2019/federal-election-2019-last-vote-showed-a-campaign-can-upend-predictions");

        topicRelatedArticles.set("Violence", []);
        topicRelatedArticles.get("Violence").push("https://www.foxnews.com/transcript/kamala-harris-laughs-when-biden-tells-her-she-cant-ban-guns-with-an-executive-order");
        topicRelatedArticles.get("Violence").push("https://www.nytimes.com/2019/09/13/us/politics/democratic-debate-issues-abortion.html");
        topicRelatedArticles.get("Violence").push("https://www.nj.com/politics/2019/09/democratic-debate-booker-just-talked-about-gun-violence-in-newark-heres-his-plan-on-guns.html");
        topicRelatedArticles.get("Violence").push("https://www.nbcnews.com/news/us-news/mourners-use-reading-9-11-victims-names-criticize-rep-omar-n1052391");
        topicRelatedArticles.get("Violence").push("https://money.usnews.com/investing/news/articles/2019-09-11/brazil-tax-reform-slides-into-confusion-as-key-official-fired-bolsonaro-wades-in");
        topicRelatedArticles.get("Violence").push("https://www.bloomberg.com/news/articles/2016-09-14/brazil-prosecutors-charge-lula-with-corruption-papers-report");
        topicRelatedArticles.get("Violence").push("https://www.cnn.com/2019/09/11/americas/brazil-women-girls-domestic-violence-rape-intl-hnk/index.html");
        topicRelatedArticles.get("Violence").push("https://www.hrw.org/news/2019/09/17/brazil-criminal-networks-target-rainforest-defenders");

        topicRelatedArticles.set("Social Welfare", []);
        topicRelatedArticles.get("Social Welfare").push("https://www.nytimes.com/2019/10/15/us/politics/kamala-harris-reproductive-rights.html");
        topicRelatedArticles.get("Social Welfare").push("https://www.cnn.com/2019/09/15/politics/joe-biden-birmingham-16th-street-baptist-church-speech/index.html");
        topicRelatedArticles.get("Social Welfare").push("https://www.nytimes.com/2019/09/12/us/politics/elizabeth-warren-social-security.html");
        topicRelatedArticles.get("Social Welfare").push("https://www.heritage.org/poverty-and-inequality/report/the-war-poverty-after-50-years");

        topicRelatedArticles.set("Elections", []);
        topicRelatedArticles.get("Elections").push("https://www.nytimes.com/interactive/2020/us/elections/kamala-harris.html");
        topicRelatedArticles.get("Elections").push("https://www.nytimes.com/2019/09/18/us/politics/alexandria-ocasio-cortez-washington.html");
        topicRelatedArticles.get("Elections").push("https://www.nytimes.com/2019/09/15/us/politics/joe-biden-black-voters.html");
        topicRelatedArticles.get("Elections").push("https://www.nbcnews.com/politics/2020-election/cory-booker-memo-may-not-be-race-much-longer-if-n1057196");

        topicRelatedArticles.set("Democracy", []);
        topicRelatedArticles.get("Democracy").push("https://www.nytimes.com/2019/09/15/opinion/kamala-harris.html");
        topicRelatedArticles.get("Democracy").push("https://www.nytimes.com/2019/09/19/opinion/the-argument-joe-biden.html");
        topicRelatedArticles.get("Democracy").push("https://www.justsecurity.org/45047/norms-watch-democracy-trump-administration-reactions-september-8-september-15/");
        topicRelatedArticles.get("Democracy").push("https://www.nytimes.com/2019/09/14/opinion/sunday/democrats-debate-trump.html");
    }
});


