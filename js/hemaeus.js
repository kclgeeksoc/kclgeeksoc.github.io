function get_content() {
    console.log("Loading content");
    var current_page = window.location.pathname;
    var url_structure = current_page.split("/");
    url_structure.shift();  // Remove the empty first element
    var page_to_load = "posts/404.md";
    if (current_page == "/" || current_page == "/index.html") {
        console.log("Found index url");
        page_to_load = "/posts/index.md";
    } else if (url_structure.length == 2 && url_structure[0] == "posts") {
        console.log("Found post url");
        var post_name = url_structure[1];
        // Get and show the post
    } else if (url_structure.length == 1) {
        console.log("Found page url");
        for (var page in site_data["pages"]) {
            page = site_data["pages"][page];
            if (encodeURIComponent(page["name"].toLowerCase()) + ".html" == url_structure[0]) {
                page_to_load = page["source"];
                break;
            }
        }
    }
    $.ajax(page_to_load, {"success": function (data, a, b) {
        $("#article").html(markdown.toHTML(data));
    }});
}

function get_navigation() {
    var nav = "<a href='/'>Home</a>";
    for (var page in site_data["pages"]) {
        page = site_data["pages"][page];
        nav += " | <a href='/" + encodeURIComponent(page["name"].toLowerCase()) + ".html'>" + page["name"] + "</a>";
    }
    $("#nav").html(nav);
}

function get_events(number) {
    $("#events").html("<h3>Upcoming Events:</h3>" +
        "<ul class='unbulleted'>" +
        "<li>Coming Soon!</li>" +
        "<li>See Flyers For Details!</li>" +
        "</ul>");  // Fetch all the events, and return [number] events that are in the future
}

