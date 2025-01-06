document.addEventListener('DOMContentLoaded', () => {
    
    function refreshTime() {
        let d = new Date();

        let hour = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours();
        let minute = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes();
        
        let second = (d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds();

        let day = (d.getDate() < 10) ? `0${d.getDate()}` : d.getDate(); 
        let month = (d.getMonth() + 1 < 10) ? `0${d.getMonth() + 1}` : d.getMonth() + 1; 
        let year = d.getFullYear();

        if (showTime) {
            timeEl.innerHTML = (showSecond) ? 
            `${hour}:${minute}:${second}` : `${hour}:${minute}`;
        }

        dateEl.innerHTML = showDate ? `${day}/${month}/${year}` : '';
    }

    function saveClockSettings() {
        showDate = clockSettings[0].querySelector('input').checked;
        localStorage.setItem(`${LSPrefix} showDate`, showDate);

        showTime = clockSettings[1].querySelector('input').checked;
        localStorage.setItem(`${LSPrefix} showTime`, showTime);

        showSecond = clockSettings[2].querySelector('input').checked;
        localStorage.setItem(`${LSPrefix} showSecond`, showSecond);

        loadClockSettings();
    }

    function saveHotbarSettings() {
        let icons = '';
        let links = '';
    
        const iconsArr = Array.from(settingsEl.getElementsByClassName("icon"));
        iconsArr.forEach(icon => {
            const iconInput = icon.querySelector('input');
            if (iconInput) {
                icons += `${iconInput.value} |-| `;
            }
        });
    
        const linksArr = Array.from(settingsEl.getElementsByClassName("link"));
        linksArr.forEach(link => {
            const linkInput = link.querySelector('input');
            if (linkInput) {
                links += `${linkInput.value} |-| `; 
            }
        });
    
        localStorage.setItem(`${LSPrefix} icons`, icons);
        localStorage.setItem(`${LSPrefix} links`, links);

        loadHotbarSettings()
    }
    

    function loadClockSettings() {
        function string2bool(value) {
            return value !== "false" ? true : false;
        } 

        sd = localStorage.getItem(`${LSPrefix} showDate`);
        showDate = string2bool(sd)

        dateEl.style.display = showDate ? "block" : "none";
        clockSettings[0].querySelector('input').checked = showDate;

        st = localStorage.getItem(`${LSPrefix} showTime`);
        showTime = string2bool(st);

        timeEl.style.display = showTime ? "block" : "none";
        clockSettings[1].querySelector('input').checked = showTime;
        
        ss = localStorage.getItem(`${LSPrefix} showSecond`);
        showSecond = string2bool(ss);

        clockSettings[2].querySelector('input').checked = showSecond;
    }

    function unloadHotBarSettings() {
        const items2d = document.querySelectorAll('.item');

        items2d.forEach(element => {
            element.remove();
        });
    }

    function loadHotbarSettings() {
        unloadHotBarSettings();
    
        let iconsData = localStorage.getItem(`${LSPrefix} icons`);
        let linksData = localStorage.getItem(`${LSPrefix} links`);
    
        let icons = iconsData ? iconsData.split(' |-| ').slice(0, -1) : ['fa-solid fa-question'];
        let links = linksData ? linksData.split(' |-| ').slice(0, -1) : ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'];
        let counter = 0;
    
        while (icons.length > counter && links.length > counter) {
            let icon = icons[counter];
            let link = links[counter];

            guid = generateGUID();
    
            addItem();
    
            let items = settingsEl.getElementsByClassName('item');
            items[items.length - 1].classList.add(guid);
    
            let iconInput = items[items.length - 1].getElementsByTagName('input')[0];
            iconInput.value = icon;
    
            let linkInput = items[items.length - 1].getElementsByTagName('input')[1];
            linkInput.value = link;

            let deletionBtn = items[items.length - 1].getElementsByClassName('delete')[0];
            deletionBtn.setAttribute("id", guid);
    
            const atag = document.createElement("a");
            atag.classList.add('item');
            atag.classList.add(guid);
            atag.setAttribute('href', link);
    
            const itag = document.createElement("i");
            let iconClasses = Array.from(icon.split(' '));
    
            iconClasses = (iconClasses[iconClasses.length - 1] === "" || iconClasses[iconClasses.length - 1] === " ")
                ? iconClasses.slice(0, -1) : iconClasses;
    
            iconClasses.forEach(iconClass => {
                itag.classList.add(iconClass);
            });
    
            itag.classList.add('no-flex');
    
            hotbar.appendChild(atag);
            atag.appendChild(itag);
    
            counter++;
        }
    }    

    function deleteFromHotbar(guid) {
        const items2del = Array.from(document.getElementsByClassName(guid));
        items2del.forEach(item2del => {
            item2del.remove();
        });
    }

    function loadAllSettings() {
        loadClockSettings();
        loadHotbarSettings();
    }

    function closeMenu() {
        settingsEl.classList.remove("opened");
        settingsEl.classList.add("closed");
    }

    function openMenu() {
        settingsEl.classList.remove("closed");
        settingsEl.classList.add("opened");
    }

    function generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    function addItem(returning = false) {

        const item = document.createElement("div");
        item.classList.add("item");

        const iconCon = document.createElement("div");
        iconCon.classList.add("icon");
        iconCon.classList.add("hotbar-input");
        
        const iconLabel = document.createElement("label");
        iconLabel.innerHTML = "Icon:";
        iconLabel.setAttribute('for', 'icon');
        
        const iconInput = document.createElement("input"); 
        iconInput.setAttribute('type', 'text');
        iconInput.setAttribute('name', 'icon');
        iconInput.setAttribute('id', 'icon');

        const linkCon = document.createElement("div"); 
        linkCon.classList.add("link");
        linkCon.classList.add("hotbar-input");

        const linkLabel = document.createElement("label"); 
        linkLabel.innerHTML = "Link:";
        linkLabel.setAttribute('for', 'link');

        const linkInput = document.createElement("input"); 
        linkInput.setAttribute('type', 'text');
        linkInput.setAttribute('name', 'link');
        linkInput.setAttribute('id', 'link');

        const deletion = document.createElement('div');
        deletion.classList.add("delete");

        const deletionIcon = document.createElement("i");
        deletionIcon.classList.add("fa-solid");
        deletionIcon.classList.add("fa-delete-left");

        hotbarSettingsEl.appendChild(item);
        item.appendChild(iconCon);
        iconCon.appendChild(iconLabel);
        iconCon.appendChild(iconInput);
        item.appendChild(linkCon);
        linkCon.appendChild(linkLabel);
        linkCon.appendChild(linkInput);
        item.appendChild(deletion);
        deletion.appendChild(deletionIcon);

        return returning ? item : null;
    }

    const LSPrefix = 'newpage settings';

    const widgetEl = document.getElementById("timewidget");
    const timeEl = widgetEl.getElementsByClassName("time")[0];
    const dateEl = widgetEl.getElementsByClassName("date")[0];
    
    const hotbar = document.getElementsByClassName('linklist')[0] 

    const settingsEl = document.getElementById("settings");
    const clockSettings = settingsEl.getElementsByClassName("clock");
    const hotbarSettingsEl = settingsEl.getElementsByClassName("hotbar")[0];
    
    // document.getElementById('save-clock').addEventListener('click', saveClockSettings);
    document.getElementById('save-hotbar').addEventListener('click', saveHotbarSettings);
    document.getElementById('close').addEventListener('click', closeMenu);
    document.getElementById('open').addEventListener('click', openMenu);
    document.getElementById('add-item').addEventListener('click', addItem);

    loadAllSettings();

    const deleteButtons = Array.from(document.getElementsByClassName("delete"));

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            deleteFromHotbar(button.getAttribute("id"));
        });
    });

    Array.from(clockSettings).forEach(button => {
        button.querySelector('input').addEventListener("click", function () {
            saveClockSettings();
        })
    })

    refreshTime();
    setInterval(refreshTime, 500);

    console.log("SUCCESS: scripts loaded");
});