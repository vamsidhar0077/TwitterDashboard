let url = window.location.href;
let globalTweets = [];
let localTweets = [];
let filtersData = new Map();
let searchedVal = "";
let topicRelatedArticles = new Map();

$(document).ready(function () {

    loadArticles();

    $("#getTweets").click(function () {
        searchedVal = $("#searchedInput").val();
        let localUrl = url + "rest/twitter/getTweets/" + searchedVal;
        globalTweets = [];
        localTweets = [];
        for (var i = 0; i < data.length; i++) {
            globalTweets.push(data[i]);
            localTweets.push(data[i]['tweet_text']);
        }
        display();
        displayChartsCountry(globalTweets);
        displayChartsLanguage(globalTweets);
        displayChartsSentiment(globalTweets);
        displayChartsLTopic(globalTweets);

    })


    var filters = function () {
        searchedVal = $("#searchedInput").val();
        let localUrl = url + "rest/twitter/getFilteredTweets/";
        var obj = mapToObj(filtersData);
        localUrl = localUrl + obj;
        if (searchedVal.length > 0)
            localUrl = localUrl + "tweet_text:(" + searchedVal + ")";
        else
            localUrl = localUrl.substring(0, localUrl.length - 3);

        $.get(localUrl, function (data) {
            data = JSON.parse(data);
            globalTweets = [];
            localTweets = [];
            for (var i = 0; i < data.length; i++) {
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
        $('input[name="country"]:checked').each(function () {
            selectedCountries.push(this.value);
        });
        filtersData.set("country", selectedCountries);
        filters();
    });

    $('#languageFilter').on('change', function () {
        var selectedLanguage = new Array();
        $('input[name="language"]:checked').each(function () {
            selectedLanguage.push(this.value);
        });
        filtersData.set("language", selectedLanguage);
        filters();
    });

    $('#poiFilter').on('change', function () {
        var selectedPOIs = new Array();
        $('input[name="user_name"]:checked').each(function () {
            selectedPOIs.push(this.value);
        });
        filtersData.set("user_name", selectedPOIs);
        filters();
    });

    $('#topicFilter').on('change', function () {
        var selectedtopics = new Array();
        $('input[name="topic"]:checked').each(function () {
            selectedtopics.push(this.value);
        });
        filtersData.set("topic", selectedtopics);
        filters();
    });

    var display = function () {
        $("#itemList").empty();
        var rows = "<tbody>";
        for (var i = 0; i < globalTweets.length; i++) {
            rows += "<tr>" +
                "<td>" + globalTweets[i]["user_name"];
            if (globalTweets[i]["verified"] == "[true]") {
                rows += "<i class=\"fas fa-check-circle\" style='color: deepskyblue'></i>"
            }
            rows += "<br>" + globalTweets[i]["tweet_text"] + "</td>";
        }
        rows += "</tbody>";
        $(rows).appendTo("#itemList");
        $("#results").css("overflow-y", "scroll");
        $("#results").css("height", "500");
        $("#results").css("width", "inherit");
    };

    function mapToObj(map) {
        let str = "";
        for (let [k, v] of map) {
            for (let i = 0; i < v.length; i++) {
                if (k == "tweet_text") {
                    v[i] = v[i].toString().trim().replaceAll(" ", " AND ");
                }
                str = str + k + ":" + v[i] + " AND ";
            }
        }
        return str.substr(0, str.length);
    }

    function displayChartsCountry(globalTweets) {
        $("#myPieChart").empty();
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';
        var dataPoints = [0, 0, 0];
        for (var i = 0; i < globalTweets.length; i++) {
            if (globalTweets[i]["country"] == "India") {
                dataPoints[0] = dataPoints[0] + 1;
            }
            if (globalTweets[i]["country"] == "Brazil") {
                dataPoints[1] = dataPoints[1] + 1;
            }
            if (globalTweets[i]["country"] == "US" || globalTweets[i]["country"] == "USA") {
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
        var dataPoints = [0, 0, 0];
        for (var i = 0; i < globalTweets.length; i++) {
            if (globalTweets[i]["lang"] == "hi") {
                dataPoints[0] = dataPoints[0] + 1;
            }
            if (globalTweets[i]["lang"] == "pt") {
                dataPoints[1] = dataPoints[1] + 1;
            }
            if (globalTweets[i]["lang"] == "en") {
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
        var dataPoints = [0, 0];
        for (var i = 0; i < globalTweets.length; i++) {
            if (globalTweets[i]["sentiment"] == "[positive]") {
                dataPoints[0] = dataPoints[0] + 1;
            }
            if (globalTweets[i]["sentiment"] == "[negative]") {
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
                    backgroundColor: ['#04c80e', '#cc1222'],
                    hoverBackgroundColor: ['#0da620', '#af1419'],
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
        var dataPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        debugger;
        for (var i = 0; i < globalTweets.length; i++) {
            if (globalTweets[i]["topic"] == "[ Politics]]") {
                dataPoints[0] = dataPoints[0] + 1;
            }
            if (globalTweets[i]["topic"] == "[Campaign]") {
                dataPoints[1] = dataPoints[1] + 1;
            }
            if (globalTweets[i]["topic"] == "[Violence]") {
                dataPoints[2] = dataPoints[2] + 1;
            }
            if (globalTweets[i]["topic"] == "[Social Welfare]") {
                dataPoints[3] = dataPoints[3] + 1;
            }
            if (globalTweets[i]["topic"] == "[Elections]") {
                dataPoints[4] = dataPoints[4] + 1;
            }
            if (globalTweets[i]["topic"] == "[Economy]") {
                dataPoints[5] = dataPoints[5] + 1;
            }
            if (globalTweets[i]["topic"] == "[Vote]") {
                dataPoints[6] = dataPoints[6] + 1;
            }
            if (globalTweets[i]["topic"] == "[Railway]") {
                dataPoints[7] = dataPoints[7] + 1;
            }
            if (globalTweets[i]["topic"] == "[ Government]]") {
                dataPoints[8] = dataPoints[8] + 1;
            }
            if (globalTweets[i]["topic"] == "[ Democracy]]") {
                dataPoints[9] = dataPoints[9] + 1;
            }
        }
        debugger;
        var ctx = document.getElementById("topicChart");
        var topicChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Politics", "Campaign", "Violence", "Social Welfare", "Elections", "Economy", "Vote", "Railway", "Government", "Democracy"],
                datasets: [{
                    data: dataPoints,
                    backgroundColor: ['#DF8D0C', '#6c88c5', '#14CC80', '#DF1BBC', '#DBDADF', '#DF9EBD', '#DF775B', '#4249DF', '#C5BE13', '#C5B86C', '#14CC80'],
                    hoverBackgroundColor: ['#DF8D0C', '#6c88c5', '#14CC80', '#DF1BBC', '#DBDADF', '#DF9EBD', '#DF775B', '#4249DF', '#C5BE13', '#C5B86C', '#14CC80'],
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
    };
});

