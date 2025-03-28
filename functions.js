function openTab(evt, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    for (let content of tabContents) {
        content.classList.remove("active");
    }

    let tabLinks = document.getElementsByClassName("tab-link");
    for (let link of tabLinks) {
        link.classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");


    if (tabName === "formTab") {
      
        document.querySelector('.nav-links a[onclick*="formTab"]').classList.add("active");
    } else {
     
        if (evt && evt.currentTarget.classList.contains("tab-link")) {
            evt.currentTarget.classList.add("active");
        }
    }

    localStorage.setItem("activeTab", tabName);
}

function restoreTab() {
    
    let activeTab = localStorage.getItem("activeTab");

    
    if (activeTab) {
        openTab(null, activeTab);
    } else {
        
        openTab(null, "formTab");
    }
}

window.onload = restoreTab;
