$(document)
    .ready(
    function () {
        $("#nav li").mouseover(function () {
            $(this).parent().children("li").removeClass("over");
            $(this).addClass("over");
        }).mouseout(function () {
            $(this).removeClass("over");
        });

        $("#nav>li>ul>li a")
            .click(
            function () {
                $("#nav").children("li").removeClass(
                    "active");
                $(this).parent().parent().parent()
                    .addClass("active");

                var url = $(this).attr("href");
                var type = $(this).attr("type") != 'undefined' ? $(
                    this).attr("type")
                    : "html";
                var title = $(this).html();
                if (url) {
                    var tabs = mini.get("dashboard-container");

                    var exist = tabs.getTab(title);
                    if (exist) {
                        tabs.activeTab(exist);
                    } else {
                        //add tab
                        tab = tabs.addTab({
                            name:title,
                            title: title,
                            url: url,
                            showCloseButton:true
                        });

                        //active tab
                        tabs.activeTab(tab);
                    }
                }
                return false;
            });
        $("#nav>li>a")
            .click(
            function () {
                $("#nav>li").removeClass("active");
                $(this).parent().addClass("active");

                var url = $(this).attr("href");
                var type = $(this).attr("type") != 'undefined' ? $(
                    this).attr("type")
                    : "html";
                var title = $(this).html();
                if (url) {
                    var tabs = mini.get("dashboard-container");

                    var exist = tabs.getTab(title);
                    if (exist) {
                        tabs.activeTab(exist);
                    } else {
                        //add tab
                        tab = tabs.addTab({
                            name:title,
                            title: title,
                            url: url,
                            showCloseButton:true
                        });

                        //active tab
                        tabs.activeTab(tab);
                    }
                }
                return false;
            });

        $("#customer_info_tabs a").click(function () {
            $("#customer_info_tabs a").removeClass("active");
            $(this).addClass("active");
        })
    });