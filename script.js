document.addEventListener("DOMContentLoaded", () => {

    // No way I'm writing comments for every element :~/
    const bootingScreen = document.getElementById("booting-up_screen");
    const lockScreen = document.getElementById("lock_screen");
    const background = document.getElementById("BG");
    const iniLock = document.getElementById("time");
    const passLock = document.getElementById("enter_pass");
    const desktopScreen = document.getElementById("Desktop");
    const unlockButton = document.getElementById("unlock_button");
    const lockButton = document.getElementById("shutbut");
    const useButton = document.getElementById("usebut");
    const lockButton2 = document.getElementById("shutbut2");
    const currentTimeElement = document.getElementById("current_time");
    const passwordInput = document.getElementById("password");
    const clickSound = document.getElementById("button-click");
    const startSound = document.getElementById("startup");
    const logOffSound = document.getElementById("logoff");
    const taskbarTimeElement = document.getElementById("taskbar_time");
    const clockTimeElement = document.getElementById("clock_time");
    const logoParts = document.querySelectorAll(".logo-part_ini");
    const currentDateElement = document.getElementById("current_date");
    const clockDateElement = document.getElementById("clock_date");
    const taskbarDateElement = document.getElementById("taskbar_date");
    const textUp = document.getElementById("sweep");
    const winLogo = document.getElementById("win-logo");
    const winLogoShadow = document.getElementById("win-logo-shadow");
    const winToast = document.getElementById("win-toast");
    const winClock = document.getElementById("win-clock");
    const startMenu = document.getElementById("start-menu");
    const quickSettings = document.getElementById("quick-settings");
    const loadingScreen = document.getElementById("loading_screen");
    const statusText = document.getElementById("load_status");
    const clockWindow = document.getElementById("clock-window");
    const googleWindow = document.getElementById('google-window');
    const winWindow = document.getElementById('win-window');
    const calculatorWindow = document.getElementById("calculator-window");
    const paintWindow = document.getElementById("paint-window");
    const notepadWindow = document.getElementById("notepad-window");
    const cmdWindow = document.getElementById("cmd-window");
    const clockAppBtn = document.getElementById("clock-app-btn");
    const calculatorAppBtn = document.getElementById("calculator-app-btn");
    const paintAppBtn = document.getElementById("paint-app-btn");
    const notepadAppBtn = document.getElementById("notepad-app-btn");
    const cmdAppBtn = document.getElementById("cmd-app-btn");
    const eeAppButton = document.getElementById("ee-app-btn");
    const googleAppBtn = document.getElementById('google-app-btn');
    const winAppBtn = document.getElementById('win-app-btn');
    const eeWindow = document.getElementById("ee-window");
    const screensaver = document.getElementById("screensaver");
    const userStart = document.getElementById("user-start_screen");
    const userStartBtn = document.getElementById("spc");
    const taskbar = document.getElementById("taskbar");
    const bsodScreen = document.getElementById("containerB");
    const paintDIcon = document.getElementById("paintDIcon");
    const notepadDIcon = document.getElementById("notepadDIcon");
    const cmdDIcon = document.getElementById("cmdDIcon");
    const calculatorDIcon = document.getElementById("CalculatorDIcon");
    const clockDIcon = document.getElementById("ClockDIcon");
    const googleDIcon = document.getElementById("GoogleDIcon");
    const windowsDIcon = document.getElementById("WindowsDIcon");
    const moreDIcon = document.getElementById("moreDIcon");
    const wPassCloseBtn = document.getElementById("wpass_close_btn");
    const wPassText = document.getElementById("pass_fallback");
    const wPassElement = document.getElementById("wrong_pass");
    const inputElement = document.getElementById("input_flex");
    const faultyText = document.getElementById("faulty-text");
    let desktopGrid = document.getElementById('desktop-grid');
    let highestZIndex = 1000; // Initialize highest z-index for windows
    let isRunning = false; // Set to true to simulate running state
    let faultyStart = false; // Set to true to simulate a faulty start
    let isOnLS = false; // Is on lock screen or not
    let isBSOD = false; // Is on BSOD or not

    // Pin, Duh!
    const correctPin = "1234";

    // I don't know why I made this a variable, but here we are.
    clickSound.volume = 0.1;
    startSound.volume = 0.1;
    logOffSound.volume = 1;

    let delay = 0; // Delay for the loading screen

    self.addEventListener("install", (e) => {
        console.log("Service Worker installed");
    });

    function openGitHub() {
        window.open("https://github.com/TeamM0HANED/", "_blank");
    }
    window.openGitHub = openGitHub;

    class Spinner {
        constructor(element, codepoints, delay = 24, idleChar = 0xE100) {
            this.element = element;
            this.codepoints = codepoints;
            this.delay = delay;
            this.idleChar = idleChar;
            this.frame = 0;
            this.intervalId = null;
        }

        start() {
            if (this.intervalId) return;

            this.intervalId = setInterval(() => {
                this.element.textContent = String.fromCharCode(this.codepoints[this.frame]);
                this.frame = (this.frame + 1) % this.codepoints.length;
            }, this.delay);
        }

        stop() {
            if (!this.intervalId) return;

            clearInterval(this.intervalId);
            this.intervalId = null;
            this.element.textContent = String.fromCharCode(this.idleChar);
            this.frame = 0;
        }
    }

    const codepoints = [
        [0xE100, 0xE109],
        [0xE10A, 0xE10F],
        [0xE110, 0xE119],
        [0xE11A, 0xE11F],
        [0xE120, 0xE129],
        [0xE12A, 0xE12F],
        [0xE130, 0xE139],
        [0xE13A, 0xE13F],
        [0xE140, 0xE149],
        [0xE14A, 0xE14F],
        [0xE150, 0xE159],
        [0xE15A, 0xE15F],
        [0xE160, 0xE169],
        [0xE16A, 0xE16F],
        [0xE170, 0xE176]
    ].flatMap(([start, end]) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i)
    );

    const spinner1 = new Spinner(document.getElementById('spinner1'), codepoints);
    const spinner2 = new Spinner(document.getElementById('spinner2'), codepoints);

    function startSpinner1() {
        spinner1.start();
    }

    function stopSpinner1() {
        spinner1.stop();
    }

    function startSpinner2() {
        spinner2.start();
    }

    function stopSpinner2() {
        spinner2.stop();
    }

    function fadeToScreen(fromScreen, toScreen) {
        fromScreen.classList.remove("visible");
        fromScreen.classList.add("hid");
        document.body.style.cursor = "none";
        setTimeout(() => {
            showLoadingScreen();
            startSpinner2();
            toScreen.classList.remove("hid");
            fromScreen.classList.add("removeDOM");
            toScreen.classList.remove("removeDOM");
            const rDelay = Math.floor(Math.random() * 1000) + 3000;
            delay = rDelay;
            setTimeout(() => {
                setTimeout(() => {
                    hideLoadingScreen();
                    setTimeout(() => { toScreen.classList.add("visible"); }, 800);
                }, 1000);
            }, delay);
        }, 1500);
    }

    function showLoadingScreen() {
        loadingScreen.classList.remove("removeDOM");
        loadingScreen.classList.remove("hid");
        loadingScreen.classList.add("visible");
        document.body.style.cursor = "none";
        startSpinner2();
    }

    function hideLoadingScreen() {
        loadingScreen.classList.add("hid");
        loadingScreen.classList.remove("visible");
        setTimeout(() => {
            loadingScreen.classList.add("removeDOM");
           stopSpinner2();
           document.body.style.cursor = "default";
        }, 1000);
    }

    userStart.classList.add("visible");

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    userStartBtn.addEventListener("click", () => {
        const rDelay = Math.floor(Math.random() * 2000) + 3000;
        bootingScreen.classList.remove("removeDOM");
        bootingScreen.classList.add("visible");
        userStart.classList.add("hid");
        userStart.classList.remove("visible");
        document.body.style.cursor = "none";
        statusText.textContent = "Starting Up";
        startSpinner1();
        setTimeout(() => {
            fadeToScreen(bootingScreen, lockScreen);
            updateLockScreenTime();
            setTimeout(() => { isOnLS = true; }, 3500);
            isRunning = true;
            setTimeout(stopSpinner1, 1000);
        }, rDelay);

        if (faultyStart) {
            faultyText.style.display = "block";
            setTimeout(() => {
                document.body.innerHTML = `
                  <div class="container" style="background: #0078D7; padding: 20px; width: 100%; display: flex; align-items: flex-start; justify-content: flex-start; padding-top: 120px;  user-select: none; cursor: default;">
                      <h1 style="text-align: left; color: white; cursor: default;"><strong>Automatic Repair</strong></h1>
                      <h3 style="text-align: left; margin-top: 0; color: white; font-weight: normal;">Your web PC did not boot up correctly</h3>
                      <div class="body-text" style="text-align: left;">
                          <p style="color: white; margin-top: 0;">Press on the reset button to reload the page to restore the PC from the cloud.</p>
                      </div>
                      <div class="content" style="display: flex; justify-content: flex-end; align-items: center; width: 100%;">
                          <button class="reset-btn" style="background-color: #0078D7; border: 3px solid white; color: white; padding: 10px 20px; text-align: center; font-size: 16px; border-radius: 7px;" onclick="window.location.reload()">Reset</button>
                      </div>
                  </div>
              `;
            }, rDelay + 1050);
        }
    });

    setTimeout(() => {
        logoParts.forEach((part) => {
            part.classList.add("animate-logo");
        });
    }, 75);

    function updateLockScreenTime() {
        updateTime(currentTimeElement);
        setInterval(() => {
            updateTime(currentTimeElement);
        }, 1000);
    }

    // The same one as above but for taskbar and I made a separate function for no reason at all idk please don't judge me.
    function updateTaskbarTime() {
        updateTime(taskbarTimeElement);
        setInterval(() => {
            updateTime(taskbarTimeElement);
        }, 1000);
    }

    // Took me a good amount of time to write the day and month conversion code and later just sticked with the set comparison logic, lol.
    function updateTime(element) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        const date = now.getDate().toString().padStart(2, "0");

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = monthNames[now.getMonth()];

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const day = dayNames[now.getDay()];

        element.textContent = `${hours}:${minutes}`;
        currentDateElement.textContent = `${date} ${month}, ${day}`;
        clockDateElement.textContent = `${date} ${month}, ${day}`;
        clockTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
        taskbarDateElement.textContent = `${date}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getFullYear()}`;
    }

    passwordInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            Unlock();
        }
    });

    function Unlock() {
        const enteredPin = passwordInput.value;
        statusText.textContent = "Welcome";

        if (enteredPin === correctPin) {
            startSound.volume = 0.5;
            setTimeout(() => {
                startSound.play();
            }, delay + 2000);

            taskbar.classList.remove("show");
            setTimeout(() => taskbar.classList.add("show"), delay + 3500);

            winLogo.classList.remove("show");
            setTimeout(() => winLogo.classList.add("show"), delay + 4000);

            winToast.classList.remove("show");
            setTimeout(() => winToast.classList.add("show"), delay + 4200);

            winClock.classList.remove("show");
            setTimeout(() => winClock.classList.add("show"), delay + 4400);

            handleSwipeUp();
            isOnLS = false;
            fadeToScreen(lockScreen, desktopScreen);
            updateTaskbarTime();
        }
        else if (enteredPin === '') {
            wPassText.textContent = "Provide a PIN.";
            wPassElement.style.display = "flex";
            inputElement.style.display = "none";
            passwordInput.blur();
            setTimeout(() => { wPassCloseBtn.focus(); }, 50);
        }
        else {
            wPassText.textContent = "The PIN is incorrect. Try: " + correctPin + ".";
            passwordInput.value = "";
            wPassElement.style.display = "flex";
            inputElement.style.display = "none";
            passwordInput.blur();
            setTimeout(() => { wPassCloseBtn.focus(); }, 50);
        }
    }

    wPassCloseBtn.addEventListener("click", () => {
        wPassElement.style.display = "none";
        inputElement.style.display = "flex";
        clickSound.volume = 0.1;
        clickSound.play();
        wPassCloseBtn.blur();
        setTimeout(() => { passwordInput.focus(); }, 50);
    });


    unlockButton.addEventListener("click", () => {
        clickSound.volume = 0.1;
        clickSound.play();
        Unlock();
    });

    const hoverArea = document.createElement("div");
    hoverArea.style.position = "fixed";
    hoverArea.style.bottom = "0px";
    hoverArea.style.left = "0px";
    hoverArea.style.width = "100%";
    hoverArea.style.height = "2px";
    hoverArea.style.zIndex = "3000";
    hoverArea.style.background = "transparent";
    document.body.appendChild(hoverArea);

    let hideTaskbarTimeout; // Timeout for hiding taskbar
    let maxiCount = 0; // Count of maximized windows
    let isMouseInside = false; // Flag to check if mouse is inside the taskbar

    function updateTaskbarVisibility() {
        if (maxiCount > 0) {
            taskbar.classList.remove("show");
        } else {
            taskbar.classList.add("show");
            clearTimeout(hideTaskbarTimeout);
        }
    }

    hoverArea.addEventListener("mouseenter", () => {
        clearTimeout(hideTaskbarTimeout);
        taskbar.classList.add("show");
        isMouseInside = true;
    });

    taskbar.addEventListener("mouseleave", () => {
        if (maxiCount > 0) {
            if (startMenu.classList.contains("hidden") && quickSettings.classList.contains("hidden")) {
                hideTaskbarTimeout = setTimeout(() => {
                    taskbar.classList.remove("show");
                }, 1500);
            }
            else {
                clearTimeout(hideTaskbarTimeout);
                taskbar.classList.add("show");
            }
        }
        isMouseInside = false;
    });

    document.querySelector(".windows-logo").addEventListener("click", function () {
        document.querySelectorAll(".logo-part").forEach((part, index) => {
            let delay = index * 0.1;
            part.style.animation = `hoverOut 0.4s ease-in-out ${delay}s forwards`;

            setTimeout(() => {
                part.style.animation = "";
            }, (0.4 + delay) * 625);
        });
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                const startHidden = startMenu.classList.contains("hidden");
                const quickPanelHidden = quickSettings.classList.contains("hidden");

                if (startHidden && quickPanelHidden && maxiCount > 0 && !isMouseInside) {
                    hideTaskbarTimeout = setTimeout(() => {
                        taskbar.classList.remove("show");
                    }, 75);
                } else {
                    clearTimeout(hideTaskbarTimeout);
                    taskbar.classList.add("show");
                }

                if (startHidden) {
                    winLogoShadow.classList.remove("open");
                } else {
                    winLogoShadow.classList.add("open");
                }
            }
        });
    });

    observer.observe(startMenu, { attributes: true, attributeFilter: ["class"] });
    observer.observe(quickSettings, { attributes: true, attributeFilter: ["class"] });

    lockButton.addEventListener("click", () => {
        shutDown();
        clickSound.volume = 0.1;
        clickSound.play();
        fadeToScreen(desktopScreen, userStart);
    });

    lockButton2.addEventListener("click", () => {
        shutDown();
        handleSwipeDown();
        clickSound.volume = 0.1;
        clickSound.play();
        fadeToScreen(lockScreen, userStart);
    });

    function shutDown() {
        isRunning = false;
        isOnLS = false;
        statusText.textContent = "Shutting Down";
        setTimeout(() => {
            if (!isBSOD) {
                logOffSound.volume = 1;
                logOffSound.play();
            }
        }, 1500);
        closeWindow(clockWindow, 2);
        closeWindow(calculatorWindow, 1);
        closeWindow(paintWindow, 0);
        closeWindow(eeWindow, 6);
        closeWindow(googleWindow, 3);
        closeWindow(winWindow, 4);
        closeWindow(notepadWindow, 5);
        closeWindow(cmdWindow, 7);
        removeTilesSequentially();
        passwordInput.value = "";
        document.getElementById("winIframe").src = "";
        document.getElementById("googleIframe").src = "";
        clearAll();
        clearAllCmd();
        clickSound.play();
        clickSound.volume = 0.1;
        ctx1.clearRect(0, 0, canvas.width + 1000, canvas.height + 1000);
        clearDisplay();
        handleSwipeDown();
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        quickSettings.classList.remove("show");
        setTimeout(() => quickSettings.classList.add("hidden"), 300);
        display.value === "0";
    }

    function handleSwipeDown() {
        passLock.style.transform = "translateY(-1000px)";
        passLock.classList.remove("sldo");
        iniLock.style.transform = "translateY(0)";
        iniLock.style.scale = "1";
        iniLock.style.filter = "blur(0px)";
        textUp.style.transform = "translateY(0)";
        textUp.style.scale = "1";
        textUp.style.filter = "blur(0px) contrast(0)";
        background.style.filter = "blur(0px)";
        passLock.style.filter = "blur(5px)";
        background.style.scale = "1.02";
        passLock.style.scale = "3";
        passwordInput.blur();
    }

    function handleSwipeUp() {
        if (isOnLS === true) {
            passLock.classList.add("sldo");
            passLock.style.transform = "translateY(-0px)";
            iniLock.style.transform = "translateY(-300px)";
            iniLock.style.scale = "4";
            iniLock.style.filter = "blur(7px) contrast(1.05)";
            textUp.style.transform = "translateY(300px)";
            textUp.style.scale = "3";
            textUp.style.filter = "blur(5px)";
            background.style.filter = "blur(15px) contrast(1.05)";
            passLock.style.filter = "blur(0px)";
            background.style.scale = "1.5";
            passLock.style.scale = "1";
            setTimeout(() => { passwordInput.focus(); }, 100);
        }
        else {
            return;
        }
    }

    document.addEventListener("keydown", (e) => {
        if (isOnLS === true) {
            handleSwipeUp();
        }
    });


    let startX = 0, startY = 0, isSwiping = false;

    const startSwipe = (x, y) => {
        startX = x;
        startY = y;
        isSwiping = true;
    };

    const moveSwipe = (currentX, currentY) => {
        if (!isSwiping) return;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < -50) {
                handleSwipeUp();
                isSwiping = false;
            } else if (deltaX > 50) {
                handleSwipeUp();
                isSwiping = false;
            }
        } else {
            if (deltaY > 50) {
                handleSwipeDown();
                isSwiping = false;
            } else if (deltaY < -50) {
                handleSwipeUp();
                isSwiping = false;
            }
        }
    };

    desktopGrid.addEventListener('contextmenu', function (e) {
        e.preventDefault();

        var menu = document.getElementById('context-menu');

        menu.classList.remove('show');

        setTimeout(() => {
            var menuWidth = menu.offsetWidth;
            var menuHeight = menu.offsetHeight;
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var posX = e.pageX;
            var posY = e.pageY;

            if (posX + menuWidth > winWidth) {
                posX -= menuWidth;
            }
            if (posY + menuHeight > winHeight) {
                posY -= menuHeight;
            }

            menu.style.left = posX + 'px';
            menu.style.top = posY + 'px';
            menu.classList.add('show');
        }, 120);
    });

    document.addEventListener('click', function (e) {
        var menu = document.getElementById('context-menu');
        menu.classList.remove('show');
    });

    function genericFn() {
        //Just a lil generic fucntion :D
        clickSound.volume = 0.1
        clickSound.play()
    }

    window.genericFn = genericFn;

    const endSwipe = () => {
        isSwiping = false;
    };

    lockScreen.addEventListener("touchstart", (e) => {
        startSwipe(e.touches[0].clientX, e.touches[0].clientY);
    });

    lockScreen.addEventListener("touchmove", (e) => {
        moveSwipe(e.touches[0].clientX, e.touches[0].clientY);
    });

    lockScreen.addEventListener("touchend", endSwipe);

    lockScreen.addEventListener("mousedown", (e) => {
        startSwipe(e.clientX, e.clientY);
    });

    lockScreen.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) {
            moveSwipe(e.clientX, e.clientY);
        }
    });

    lockScreen.addEventListener("mouseup", (e) => {
        endSwipe();
    });

    background.addEventListener("mouseup", (e) => {
        setTimeout(() => { handleSwipeUp(); }, 500);
    });


    winLogo.addEventListener("click", function () {
        clickSound.volume = 0.1;
        clickSound.play();

        if (startMenu.classList.contains("hidden")) {
            startMenu.classList.remove("hidden");
            setTimeout(() => startMenu.classList.add("show"), 100);
        }
        else {
            startMenu.classList.remove("show")
            setTimeout(() => startMenu.classList.add("hidden"), 300);
        }
    });

    winToast.addEventListener("click", function () {
        clickSound.volume = 0.1;
        clickSound.play();

        if (quickSettings.classList.contains("hidden")) {
            quickSettings.classList.remove("hidden");
            setTimeout(() => quickSettings.classList.add("show"), 100);
        }
        else {
            quickSettings.classList.remove("show")
            setTimeout(() => quickSettings.classList.add("hidden"), 300);
        }
    });

    const sunIcon = document.getElementById("sun-icon");

    document.querySelectorAll(".sliderr").forEach(slide => {
        let lastValue = 0;
        let isDragging = false;

        function updateSliderM() {
            let percent = 100 - (this.value / this.max) * 100;
            this.style.setProperty("--fill-height", percent + "%");
            this.style.setProperty("background",
                `linear-gradient(to top,  rgb(66, 58, 73) ${percent}%, rgb(0, 147, 255) ${percent}%)`);
            let opacityValue = 0.8 - (this.value / 100) * 0.8;
            if (this.id === "brightness-slider") {
                document.querySelector(".overlay").style.opacity = opacityValue;

                if (isDragging) {
                    let delta = this.value - lastValue;
                    if (Math.abs(delta) > 2) {
                        sunIcon.style.transform = `rotateZ(${parseInt(sunIcon.style.transform.replace(/[^0-9\-]/g, '') || 0) + delta}deg)`;
                        lastValue = this.value;
                    }
                }
            }
        }

        slide.addEventListener("mousedown", () => {
            isDragging = true;
            initialValue = slide.value;
            lastValue = slide.value;
        });

        slide.addEventListener("mouseup", () => {
            isDragging = false;
        });

        slide.addEventListener("touchstart", () => {
            isDragging = true;
            initialValue = slide.value;
            lastValue = slide.value;
        });

        slide.addEventListener("touchup", () => {
            isDragging = false;
        });

        slide.addEventListener("input", updateSliderM);
        updateSliderM.call(slide);
    });

    const togglesM = document.querySelectorAll(".toggle-button");

    togglesM.forEach(toggleM => {
        toggleM.addEventListener("click", () => {
            toggleM.classList.toggle("active");
            clickSound.volume = 0.2;
            clickSound.play();
        });
    });

    //some random default values :|
    passLock.style.transform = "translateY(-1000px)";
    passLock.style.visibility = "0";
    passLock.style.filter = "blur(5px)";
    iniLock.style.transform = "translateY(0)";
    background.style.filter = "blur(0px)";
    iniLock.style.filter = "blur(0px)";
    iniLock.style.visibility = "1";
    textUp.style.color = "white";

    // Taskbar Tiles and App Open/Close/Minimize/Maximize/Drag/Resize Logic (Holy Shi- [Pain Intensifies!!!!!!!!!])

    const windowIds = ["paint-window", "calculator-window", "clock-window", "google-window", "win-window", "notepad-window", "ee-window", "cmd-window"];
    const tileIds = ["tile0", "tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7"];
    let tileOrder = [];
    const ttaskbar = document.querySelector('.taskbar-flex');

    function openWindow(windowElement, index) {
        if (!windowElement || index < 0 || index >= windowIds.length) return;

        let tile = document.getElementById(tileIds[index]);
        windowElement.classList.remove('mini');
        windowElement.style.display = "flex";

        if (windowElement.classList.contains("minimized")) {
            bounceUpAndReset(tile);
            setTimeout(() => {
                windowElement.style.left = windowElement.dataset.prevLeft;
                windowElement.style.top = windowElement.dataset.prevTop;
            }, 10);
        }

        windowElement.classList.remove("mini", "hidden", "minimized");
        windowElement.classList.add("open");
        bringToFront(windowElement);

        addTile(index);
    }

    function closeWindow(windowElement, index) {
        if (!windowElement || index < 0 || index >= windowIds.length) return;

        windowElement.classList.add("hidden");
        windowElement.classList.remove("open");

        setTimeout(() => {
            windowElement.style.display = "none";
        }, 300);

        removeTile(index);
    }

    function toggleTileSelection(index) {
        let windowElement = document.getElementById(windowIds[index]);
        let tile = document.getElementById(tileIds[index]);

        if (!windowElement || !tile) return;

        clickSound.volume = 0.1;
        clickSound.play();

        let isCurrentlyMinimized = windowElement.classList.contains("minimized");

        if (tile.classList.contains("selected")) {
            windowElement.dataset.prevLeft = windowElement.style.left || "200px";
            windowElement.dataset.prevTop = windowElement.style.top || "200px";

            let tileRect = tile.getBoundingClientRect();
            let windowRect = windowElement.getBoundingClientRect();

            let tileCenterX = tileRect.left + tileRect.width / 2;
            let tileCenterY = tileRect.top + tileRect.height / 2;
            let newLeft = tileCenterX - windowRect.width / 2;
            let newTop = tileCenterY - windowRect.height / 2;

            setTimeout(() => {
                windowElement.classList.add("mini");
                windowElement.style.left = `${newLeft}px`;
                windowElement.style.top = `${newTop}px`;
            }, 10);

            setTimeout(() => {
                tile.classList.remove("selected");
                bounceDownAndReset(tile);
                windowElement.classList.add("minimized");
                windowElement.classList.remove("open");
            }, 30);
        } else {
            if (isCurrentlyMinimized) {
                setTimeout(() => {
                    if (windowElement.dataset.prevLeft && windowElement.dataset.prevTop) {
                        windowElement.style.left = windowElement.dataset.prevLeft.includes("px")
                            ? windowElement.dataset.prevLeft
                            : `${windowElement.dataset.prevLeft}px`;

                        windowElement.style.top = windowElement.dataset.prevTop.includes("px")
                            ? windowElement.dataset.prevTop
                            : `${windowElement.dataset.prevTop}px`;
                    }
                }, 10);
            }

            windowElement.classList.remove("mini");

            if (windowElement.classList.contains("minimized")) {
                bounceUpAndReset(tile);
            }
            else{
                bounceAtPlace(tile)
            }

            openWindow(windowElement, index);
        }
    }

    function bounceUpAndReset(tile, delay = 300) {
        let img = tile.querySelector("img");
        if (!img) return;

        img.style.transform = "translateY(-9px) scale(0.8, 1.15)";

        setTimeout(() => {
            img.style.transform = "translateY(0) scale(1, 1)";
        }, delay);
    }

    function bounceDownAndReset(tile, delay = 320) {
        let img = tile.querySelector("img");
        if (!img) return;

        img.style.transform = "translateY(9px) scale(1.15, 0.8)";

        setTimeout(() => {
            img.style.transform = "translateY(0) scale(1, 1)";
        }, delay);
    }

    function bounceAtPlace(tile, delay = 150) {
        let img = tile.querySelector("img");
        if (!img) return;

        img.style.transform = "translateY(0) scale(0.75)";

        setTimeout(() => {
            img.style.transform = "translateY(0) scale(1)";
        }, delay);
    }

    function bringToFront(windowElement) {
        highestZIndex++;
        windowElement.style.zIndex = highestZIndex;
    }

    function addTile(index) {
        if (!tileOrder.includes(index)) {
            tileOrder.push(index);
            updateTaskbar();
        }

        setTimeout(() => {
            const tile = document.getElementById(tileIds[index]);
            if (tile) {
                document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
                requestAnimationFrame(() => tile.classList.add('selected'));
            }
        }, 10);
    }

    function closeWindow(windowElement, index) {
        if (!windowElement || index < 0 || index >= windowIds.length) return;

        windowElement.classList.add("hidden");
        windowElement.classList.remove("open");

        removeTile(index);
    }

    function removeTile(index) {
        const tileIndex = tileOrder.indexOf(index);
        if (tileIndex !== -1) {
            const tile = document.getElementById(tileIds[index]);
            if (tile) {
                triggerDominoEffect(tileIndex);

                setTimeout(() => {
                    tile.classList.add('hidden');
                }, 100);

                setTimeout(() => {
                    tileOrder.splice(tileIndex, 1);
                    tile.classList.add('hide');

                    setTimeout(updateTaskbar, 150);
                }, 300);
            }
        }
    }

    function triggerDominoEffect(startIndex) {
        let delay = 0;
        for (let i = startIndex; i < tileOrder.length; i++) {
            const tile = document.getElementById(tileIds[tileOrder[i]]);
            if (tile) {
                setTimeout(() => {
                    tile.style.transform = 'translateX(50px) scaleY(1)';
                    setTimeout(() => tile.style.transform = 'translateX(0) scaleY(1)', 150);
                }, delay);
                delay += 50;
            }
        }
    }

    function updateTaskbar() {
        let highestZIndexWindow = null;
        let highestZ = -1;

        tileOrder.forEach(index => {
            let windowEl = document.getElementById(windowIds[index]);
            if (windowEl) {
                let zIndex = parseInt(windowEl.style.zIndex) || 0;
                if (zIndex > highestZ && windowEl.classList.contains("open")) {
                    highestZ = zIndex;
                    highestZIndexWindow = index;
                }
            }
        });

        document.querySelectorAll(".tile").forEach(tile => tile.classList.remove("selected"));

        let fragment = document.createDocumentFragment();
        tileOrder.forEach(index => {
            let tile = document.getElementById(tileIds[index]);
            if (tile) {
                tile.classList.remove("hide");
                fragment.appendChild(tile);
                setTimeout(() => tile.classList.remove('hidden'), 10);

                if (index === highestZIndexWindow) {
                    tile.classList.add("selected");
                }
            }
        });

        ttaskbar.appendChild(fragment);
    }

    let resize = false;

    document.addEventListener("click", (e) => {
        if (resize || e.target.closest(".resizer")) return;

        let clickedTile = e.target.closest(".tile");
        let clickedWindow = e.target.closest(".app-window");

        if (e.target.closest(".no-resize") || e.target.closest(".window-header")) return;

        if (clickedWindow && e.target !== clickedWindow) return;

        if (clickedTile) {
            let index = tileIds.indexOf(clickedTile.id);
            if (index !== -1) {
                toggleTileSelection(index);
            }
            return;
        }

        if (clickedWindow) {
            let index = windowIds.indexOf(clickedWindow.id);
            if (index !== -1) {
                toggleTileSelection(index);
            }
        } else {
            document.querySelectorAll(".tile").forEach((tile) => tile.classList.remove("selected"));
        }
    });


    function makeWindowDraggable(windowEl, customWidth, customHeight) {
        let isDragging = false;
        let offsetX, offsetY;
        let winRect;
        let isMaximized = false;

        let prevX, prevY, prevWidth, prevHeight;
        const monitor = document.getElementById("Desktop");

        if (customWidth && customHeight) {
            windowEl.style.width = `${customWidth}px`;
            windowEl.style.height = `${customHeight}px`;
        }

        function bringToFront() {
            if (windowEl.style.zIndex < highestZIndex) {
                highestZIndex += 1;
                windowEl.style.zIndex = highestZIndex;
            }
            updateTaskbar();
        }

        function updateMonitorBounds() {
            return monitor.getBoundingClientRect();
        }

        function onDragStart(e) {
            if (isMaximized) return;

            const target = e.target;
            if (target.closest('.close-btn') || target.closest('.maximize-btn') || target.closest('.restore-btn') || target.closest('.minimize-btn')) {
                return;
            }

            isDragging = true;
            windowEl.classList.add("dragging");
            bringToFront();

            let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

            winRect = windowEl.getBoundingClientRect();
            offsetX = clientX - winRect.left;
            offsetY = clientY - winRect.top;

            let iframes = windowEl.querySelectorAll("iframe");
            iframes.forEach(iframe => iframe.style.pointerEvents = "none");

            e.preventDefault();
        }

        function onDragMove(e) {
            if (!isDragging) return;

            let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            const monitorRect = updateMonitorBounds();

            let maxX = monitorRect.width - winRect.width / 4;
            newX = Math.max(-winRect.width / 4, Math.min(newX, maxX));

            let titleBarHeight = windowEl.querySelector(".window-header").offsetHeight;
            let maxY = monitorRect.height - titleBarHeight * 3;
            newY = Math.max(-titleBarHeight / 2, Math.min(newY, maxY));

            windowEl.style.left = `${newX}px`;
            windowEl.style.top = `${newY}px`;
        }

        function onDragEnd() {
            isDragging = false;
            windowEl.classList.remove("dragging");
            let iframes = windowEl.querySelectorAll("iframe");
            iframes.forEach(iframe => iframe.style.pointerEvents = "auto");
        }

        function maximizeWindow() {
            if (isMaximized) {
                return;
            }

            prevX = windowEl.style.left;
            prevY = windowEl.style.top;
            prevWidth = windowEl.style.width;
            prevHeight = windowEl.style.height;

            const monitorRect = updateMonitorBounds();
            windowEl.style.left = "0px";
            windowEl.style.top = "0px";
            windowEl.style.width = `${monitorRect.width}px`;
            windowEl.style.height = `${monitorRect.height}px`;
            windowEl.style.borderRadius = "0px";
            windowEl.style.border = "none";
            isMaximized = true;
            maxiCount++;
            setTimeout(resizeCanvas, 170);

            windowEl.querySelector(".maximize-btn").style.display = "none";
            windowEl.querySelector(".restore-btn").style.display = "flex";

            updateTaskbarVisibility();
            updateTaskbar();
        }

        function restoreWindow() {
            if (!isMaximized) return;

            windowEl.style.left = prevX;
            windowEl.style.top = prevY;
            windowEl.style.width = prevWidth;
            windowEl.style.height = prevHeight;
            windowEl.style.borderRadius = "7px";
            windowEl.style.border = "0.02px solid rgba(60,60,60, 0.7)";
            isMaximized = false;
            maxiCount--;
            setTimeout(resizeCanvas, 170);

            windowEl.querySelector(".maximize-btn").style.display = "flex";
            windowEl.querySelector(".restore-btn").style.display = "none";

            updateTaskbarVisibility();
            updateTaskbar();
        }

        const titleBar = windowEl.querySelector(".window-header");
        titleBar.addEventListener("mousedown", onDragStart);
        titleBar.addEventListener("touchstart", onDragStart);

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("touchmove", onDragMove);

        document.addEventListener("mouseup", onDragEnd);
        document.addEventListener("touchend", onDragEnd);

        windowEl.addEventListener("mousedown", bringToFront);
        windowEl.addEventListener("touchstart", bringToFront);

        windowEl.querySelector(".maximize-btn").addEventListener("click", () => {
            maximizeWindow();
            clickSound.volume = 0.1;
            clickSound.play();
        });

        windowEl.querySelector(".restore-btn").addEventListener("click", () => {
            restoreWindow();
            clickSound.volume = 0.1;
            clickSound.play();
        });

        windowEl.querySelector(".close-btn").addEventListener("click", () => {
            windowEl.classList.add("hidden");
            windowEl.classList.remove("open");
            closeWindow(windowEl);
            restoreWindow();
            clickSound.volume = 0.1;
            clickSound.play();
            windowEl.style.width = `${customWidth}px`;
            windowEl.style.height = `${customHeight}px`;
        });

        windowEl.querySelector(".minimize-btn").addEventListener("click", (e) => {
            windowEl.style.width = `${customWidth}px`;
            windowEl.style.height = `${customHeight}px`;
            restoreWindow();
            clickSound.volume = 0.1;
            clickSound.play();
        });

        windowEl.querySelector(".window-header").addEventListener("dblclick", (e) => {
            if (windowEl.classList.contains("no-resize")) return;

            if (isMaximized) {
                restoreWindow();
            }
            else {
                maximizeWindow();
            }

            clickSound.volume = 0.1;
            clickSound.play();
        });

        function makeWindowsResizable() {
            if (windowEl.classList.contains("no-resize")) return;

            const resizers = ["top-left", "top-right", "bottom-left", "bottom-right", "top", "bottom", "left", "right"];

            resizers.forEach(pos => {
                const resizer = document.createElement("div");
                resizer.classList.add("resizer", pos);
                windowEl.appendChild(resizer);

                let isResizing = false;

                resizer.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    bringToFront();
                    if (isMaximized) return;
                    isResizing = true;
                    resize = true;
                    windowEl.classList.add("dragging");
                    prevX = e.clientX;
                    prevY = e.clientY;
                    prevWidth = windowEl.offsetWidth;
                    prevHeight = windowEl.offsetHeight;
                    prevLeft = windowEl.offsetLeft;
                    prevTop = windowEl.offsetTop;
                    let iframes = windowEl.querySelectorAll("iframe");
                    iframes.forEach(iframe => iframe.style.pointerEvents = "none");
                });

                document.addEventListener("mousemove", (e) => {
                    if (!isResizing) return;

                    let dx = e.clientX - prevX;
                    let dy = e.clientY - prevY;
                    let maxWidth = window.innerWidth;
                    let maxHeight = window.innerHeight;
                    let newWidth = prevWidth;
                    let newHeight = prevHeight;
                    let newLeft = prevLeft;
                    let newTop = prevTop;
                    const monitorRect = updateMonitorBounds();
                    const minWidth = 200;
                    const minHeight = 200;
                    const maxWindowWidth = monitorRect.width;
                    const maxWindowHeight = monitorRect.height;

                    resizeCanvas();

                    if (pos.includes("right")) {
                        newWidth = Math.min(Math.max(minWidth, prevWidth + dx), Math.min(maxWidth - prevLeft, maxWindowWidth));
                        windowEl.style.width = `${newWidth}px`;
                    }

                    if (pos.includes("left")) {
                        newWidth = Math.min(Math.max(minWidth, prevWidth - dx), prevLeft + prevWidth);
                        newLeft = Math.min(Math.max(0, prevLeft + dx), prevLeft + prevWidth - minWidth);
                        if (newLeft + newWidth <= maxWidth) {
                            windowEl.style.width = `${newWidth}px`;
                            windowEl.style.left = `${newLeft}px`;
                        }
                    }

                    if (pos.includes("bottom")) {
                        newHeight = Math.min(Math.max(minHeight, prevHeight + dy), Math.min(maxHeight - prevTop, maxWindowHeight));
                        windowEl.style.height = `${newHeight}px`;
                    }

                    if (pos.includes("top")) {
                        newHeight = Math.min(Math.max(minHeight, prevHeight - dy), prevTop + prevHeight);
                        newTop = Math.min(Math.max(0, prevTop + dy), prevTop + prevHeight - minHeight);
                        if (newTop + newHeight <= maxHeight) {
                            windowEl.style.height = `${newHeight}px`;
                            windowEl.style.top = `${newTop}px`;
                        }
                    }
                });

                document.addEventListener("mouseup", () => {
                    if (isResizing) {
                        isResizing = false;
                        setTimeout(() => { isResizing = false; resize = false; }, 30);
                    }
                    windowEl.classList.remove("dragging");
                    let iframes = windowEl.querySelectorAll("iframe");
                    iframes.forEach(iframe => iframe.style.pointerEvents = "auto");
                    resizeCanvas();
                });

                resizer.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let touch = e.touches[0];
                    prevX = touch.clientX;
                    prevY = touch.clientY;
                    prevWidth = windowEl.offsetWidth;
                    prevHeight = windowEl.offsetHeight;
                    prevLeft = windowEl.offsetLeft;
                    prevTop = windowEl.offsetTop;

                    resizeTimeout = setTimeout(() => {
                        bringToFront();
                        if (isMaximized) return;
                        isResizing = true;
                        resize = true;
                        isTouchDragging = true;
                        windowEl.classList.add("dragging");

                        let iframes = windowEl.querySelectorAll("iframe");
                        iframes.forEach(iframe => iframe.style.pointerEvents = "none");
                    }, 120);
                });

                document.addEventListener("touchmove", (e) => {
                    if (!isResizing) {
                        clearTimeout(resizeTimeout);
                        return;
                    }

                    let touch = e.touches[0];
                    let clientX = touch.clientX;
                    let clientY = touch.clientY;

                    let dx = clientX - prevX;
                    let dy = clientY - prevY;
                    let maxWidth = window.innerWidth;
                    let maxHeight = window.innerHeight;
                    let newWidth = prevWidth;
                    let newHeight = prevHeight;
                    let newLeft = prevLeft;
                    let newTop = prevTop;
                    const monitorRect = updateMonitorBounds();
                    const minWidth = 200;
                    const minHeight = 200;
                    const maxWindowWidth = monitorRect.width;
                    const maxWindowHeight = monitorRect.height;

                    resizeCanvas();

                    if (pos.includes("right")) {
                        newWidth = Math.min(Math.max(minWidth, prevWidth + dx), Math.min(maxWidth - prevLeft, maxWindowWidth));
                        windowEl.style.width = `${newWidth}px`;
                    }

                    if (pos.includes("left")) {
                        newWidth = Math.min(Math.max(minWidth, prevWidth - dx), prevLeft + prevWidth);
                        newLeft = Math.min(Math.max(0, prevLeft + dx), prevLeft + prevWidth - minWidth);
                        if (newLeft + newWidth <= maxWidth) {
                            windowEl.style.width = `${newWidth}px`;
                            windowEl.style.left = `${newLeft}px`;
                        }
                    }

                    if (pos.includes("bottom")) {
                        newHeight = Math.min(Math.max(minHeight, prevHeight + dy), Math.min(maxHeight - prevTop, maxWindowHeight));
                        windowEl.style.height = `${newHeight}px`;
                    }

                    if (pos.includes("top")) {
                        newHeight = Math.min(Math.max(minHeight, prevHeight - dy), prevTop + prevHeight);
                        newTop = Math.min(Math.max(0, prevTop + dy), prevTop + prevHeight - minHeight);
                        if (newTop + newHeight <= maxHeight) {
                            windowEl.style.height = `${newHeight}px`;
                            windowEl.style.top = `${newTop}px`;
                        }
                    }
                });

                document.addEventListener("touchup", () => {
                    clearTimeout(resizeTimeout);
                    if (isResizing) {
                        isResizing = false;
                        setTimeout(() => { isResizing = false; resize = false; }, 30);
                    }
                    windowEl.classList.remove("dragging");
                    let iframes = windowEl.querySelectorAll("iframe");
                    iframes.forEach(iframe => iframe.style.pointerEvents = "auto");
                    resizeCanvas();
                });
            });
        }

        makeWindowsResizable();
    }

    makeWindowDraggable(clockWindow, 100, 175);
    makeWindowDraggable(calculatorWindow, 200, 300);
    makeWindowDraggable(paintWindow, 600, 400);
    makeWindowDraggable(eeWindow, 290, 316.6);
    makeWindowDraggable(googleWindow, 600, 400);
    makeWindowDraggable(winWindow, 600, 400);
    makeWindowDraggable(notepadWindow, 600, 400);
    makeWindowDraggable(cmdWindow, 450, 225);

    clockAppBtn.addEventListener("click", () => {
        openWindow(clockWindow, 2);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    googleAppBtn.addEventListener('click', () => {
        openWindow(googleWindow, 3);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
        document.getElementById("googleIframe").src = "https://www.google.com/search?igu=1";
    });

    winAppBtn.addEventListener('click', () => {
        openWindow(winWindow, 4);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
        document.getElementById("winIframe").src = "https://windows-web-clone-liart.vercel.app/";
    });

    paintAppBtn.addEventListener("click", () => {
        openWindow(paintWindow, 0);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    notepadAppBtn.addEventListener("click", () => {
        openWindow(notepadWindow, 5);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    cmdAppBtn.addEventListener("click", () => {
        openWindow(cmdWindow, 7);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    winClock.addEventListener("click", () => {
        openWindow(clockWindow, 2);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    calculatorAppBtn.addEventListener("click", () => {
        openWindow(calculatorWindow, 1);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    document.querySelectorAll(".close-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const windowElement = e.target.closest(".app-window");
            if (!windowElement) return;
            if (!e.target.classList.contains("close-btn")) return;

            let index = windowIds.indexOf(windowElement.id);

            if (index !== -1) {
                closeWindow(windowElement, index);
            }
            clickSound.volume = 0.1;
            clickSound.play();
        });
    });

    document.querySelectorAll(".minimize-btn").forEach((button) => {
        button.addEventListener("click", (e) => {

            const windowElement = e.target.closest(".app-window");
            if (!windowElement) return;

            let index = windowIds.indexOf(windowElement.id);
            let tile = document.getElementById(tileIds[index]);
            if (!tile) return;

            windowElement.dataset.prevLeft = windowElement.style.left || "200px";
            windowElement.dataset.prevTop = windowElement.style.top || "200px";

            let tileRect = tile.getBoundingClientRect();
            let windowRect = windowElement.getBoundingClientRect();

            let tileCenterX = tileRect.left + tileRect.width / 2;
            let tileCenterY = tileRect.top + tileRect.height / 2;
            let newLeft = tileCenterX - windowRect.width / 2;
            let newTop = tileCenterY - windowRect.height / 2;

            setTimeout(() => {
                windowElement.classList.add("mini");
                windowElement.style.left = `${newLeft}px`;
                windowElement.style.top = `${newTop}px`;
            }, 10);

            setTimeout(() => {
                tile.classList.remove("selected");
                bounceDownAndReset(tile);
                windowElement.classList.add("minimized");
                windowElement.classList.remove("open");
            }, 30);

            clickSound.volume = 0.1;
            clickSound.play();
        });
    });

    document.addEventListener("click", function (event) {
        const isClickInsideMenu = startMenu.contains(event.target);
        const isClickToggleButton = winLogo.contains(event.target);

        const isClickInsideQuick = quickSettings.contains(event.target);
        const isClickWinToastButton = winToast.contains(event.target);

        if (!isClickInsideMenu && !isClickToggleButton) {
            startMenu.classList.remove("show");
            setTimeout(() => startMenu.classList.add("hidden"), 300);
        }

        if (!isClickInsideQuick && !isClickWinToastButton) {
            quickSettings.classList.remove("show");
            setTimeout(() => quickSettings.classList.add("hidden"), 300);
        }
    });

    let screensaverTimeout;

    function showScreensaver() {
        if (isRunning) {
            screensaver.classList.remove("removeDOM");
            screensaver.classList.add("ssvisible");
            screensaver.classList.remove("sshidden");
            document.body.style.cursor = "none";
        }
    }

    function hideScreensaver() {
        screensaver.classList.remove("ssvisible");
        screensaver.classList.add("sshidden");
        setTimeout(() => {
            document.body.style.cursor = "default";
            screensaver.classList.add("removeDOM");
        }, 1000);
        resetScreensaverTimer();
    }

    function resetScreensaverTimer() {
        clearTimeout(screensaverTimeout);
        screensaverTimeout = setTimeout(showScreensaver, 40000);
    }

    screensaver.addEventListener("click", () => {
        hideScreensaver();
    });

    ;[
        "mousemove",
        "mousedown",
        "touchstart",
        "keydown",
        "pointermove",
        "pointerdown",
        "touchmove",
    ].forEach((event) => {
        document.addEventListener(event, resetScreensaverTimer);
        hideScreensaver();
    });

    function updateBatteryStatus(battery) {
        const batteryFill = document.querySelector('.battery-fill');
        const batteryPercentage = document.querySelector('.battery-percentage');

        function update() {
            const level = battery.level * 100;
            batteryFill.style.width = `calc(${level}% - 8.6px)`;
            batteryPercentage.textContent = Math.round(level);

            if (level < 21) {
                batteryFill.style.background = 'red';
            } else {
                batteryFill.style.background = 'white';
            }

            if (level < 55) {
                batteryPercentage.style.color = 'white';
                batteryPercentage.style.webkitTextStroke = '0.4px black';
            } else {
                batteryPercentage.style.color = 'black';
                batteryPercentage.style.webkitTextStroke = '0.4px white';
            }
        }

        update();
        battery.addEventListener('levelchange', update);
    }

    if ("getBattery" in navigator) {
        navigator.getBattery().then(updateBatteryStatus);
    }

    const canvas = document.getElementById("clock");
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";

    function drawClock() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const radius = Math.min(canvas.width, canvas.height / 2);
        ctx.translate(radius, radius);

        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        drawHands(hours, minutes, seconds);
        drawHourMarks();
        ctx.translate(-radius, -radius);
    }

    // Draws the hour marks of clock without "CSS"
    function drawHourMarks() {
        const radius = Math.min(canvas.width, canvas.height) / 2;
        ctx.beginPath();
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const x1 = (radius - 20) * Math.cos(angle);
            const y1 = (radius - 20) * Math.sin(angle);
            const x2 = (radius - 10) * Math.cos(angle);
            const y2 = (radius - 10) * Math.sin(angle);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // Function that calls the different types 'Organically' drawn hands of the clock
    function drawHands(hours, minutes, seconds) {
        const radius = Math.min(canvas.width, canvas.height) / 2;
        const secondAngle = (Math.PI / 30) * seconds;
        const minuteAngle = (Math.PI / 30) * minutes;
        const hourAngle = (Math.PI / 6) * hours;

        drawHand(secondAngle, radius - 20, 2, "#0088d5");
        drawHand(minuteAngle, radius - 30, 5, "white");
        drawHand(hourAngle, radius - 45, 5, "white");
    }

    // Draws the hands of clock without "CSS"(Yeah i copied this comment from the above comment is there a problem !?)
    function drawHand(angle, length, width, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(0, 0);
        ctx.lineTo(
            length * Math.cos(angle - Math.PI / 2),
            length * Math.sin(angle - Math.PI / 2),
        );
        ctx.stroke();
    }

    function updateClock() {
        drawClock();
        requestAnimationFrame(updateClock);
    }

    updateClock();

    const display = document.getElementById("display");

    display.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculate();
        }
    });

    display.addEventListener('blur', checkIfEmpty);

    function clearDisplay() {
        clickSound.play();
        clickSound.volume = 0.1;
        fadeOutDisplay();
        display.value = "";
        checkIfEmpty();
        fadeInDisplay();
    }

    function deleteLast() {
        clickSound.play();
        clickSound.volume = 0.1;
        if (display.value === "undefined" || display.value === "Error" || display.value === 'NaN' || display.value === 'Infinity' || display.value === "Can't divide by 0") {
            clearDisplay();
        } else {
            fadeOutDisplay();
            display.value = display.value.slice(0, -1);
            checkIfEmpty();
            fadeInDisplay();
        }
    }

    function checkIfEmpty() {
        if (display.value === "") {
            display.value = "0";
        }
    }

    checkIfEmpty();

    function appendNumber(number) {
        clickSound.play();
        clickSound.volume = 0.1;
        fadeOutDisplay();
        if (display.value === "0") {
            display.value = number;
        } else {
            display.value += number;
        }

        fadeInDisplay();
    }

    function appendOperator(operator) {
        clickSound.play();
        clickSound.volume = 0.1;
        const lastChar = display.value.slice(-1);
        lastOperation = operator;
        fadeOutDisplay();

        if (["+", "-", "*", "/"].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + operator;
        } else {
            display.value += operator;
        }

        fadeInDisplay();
    }

    function fadeInDisplay() {
        display.classList.remove("fade-out");
        display.classList.add("fade-in");

        display.addEventListener(
            "animationend",
            () => {
                display.classList.remove("fade-in")
            },
            { once: true },
        );
    }

    function fadeOutDisplay() {
        display.classList.remove("fade-in");

        display.classList.add("fade-out");

        display.addEventListener(
            "animationend",
            () => {
                display.classList.remove("fade-out");
            },
            { once: true },
        );
    }

    let lastOperationResult = null;

    function appendDot() {
        fadeOutDisplay();
        clickSound.play();
        clickSound.volume = 0.1;
        const currentValue = display.value;
        const lastChar = currentValue.slice(-1);

        const lastNumber = currentValue.split(/[\+\-\*\/]/).pop()

        if (!lastNumber.includes(".")) {
            if (/\d/.test(lastChar) || ["+", "-", "*", "/"].includes(lastChar)) {
                display.value += ".";
            }
        }
        fadeInDisplay();
    }

    function calculate() {
        clickSound.play();
        clickSound.volume = 0.1;

        try {
            if (display.value.includes('/0')) {
                fadeOutDisplay();
                display.value = "Can't divide by 0";
                lastOperationResult = null;
                fadeInDisplay();
                return;
            }
            else if (display.value === "69" && bsodScreen.classList.contains("not")) {
                triggerBSOD();
            }
            else if (/[^0-9\*\-\/\+\.]/.test(display.value)) {
                fadeOutDisplay();
                display.value = "No alphabets allowed lil bro!";
                lastOperationResult = null;
                fadeInDisplay();
                return;
            }

            lastOperationResult = eval(display.value) || "0";
            lastOperationResult = roundResult(lastOperationResult);
            fadeOutDisplay();
            display.value = lastOperationResult;
            fadeInDisplay();
            lastOperation = "";
        } catch {
            fadeOutDisplay();
            display.value = "Error";
            lastOperationResult = null;
            lastOperation = "";
            fadeInDisplay();
        }
    }

    function roundResult(value) {
        const threshold = 1e-10;

        if (Math.abs(value - Math.round(value)) < threshold) {
            return Math.round(value);
        }

        return parseFloat(value.toFixed(10));
    }

    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.appendNumber = appendNumber;
    window.appendOperator = appendOperator;
    window.appendDot = appendDot;
    window.calculate = calculate;

    const canvas1 = document.getElementById("paintCanvas");
    const ctx1 = canvas1.getContext("2d");
    const colorPicker = document.getElementById("colorPicker");
    const eraserColorPicker = document.getElementById("eraserColorPicker");
    const brushSize = document.getElementById("brushSize");
    const eraserSize = document.getElementById("eraserSize");
    const toggleEraser = document.getElementById("toggleEraser");
    const clearButton = document.getElementById("clearButton");
    const customPointer = document.getElementById("customPointer");
    const paintAudio = document.getElementById("paintAudio");

    function resizeCanvas() {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = canvas1.width;
        tempCanvas.height = canvas1.height;

        tempCtx.drawImage(canvas1, 0, 0);

        canvas1.width = paintWindow.clientWidth;
        canvas1.height = paintWindow.clientHeight;

        ctx1.drawImage(tempCanvas, 0, 0);

        //anddd we are f**king done with this stupid piece of shi- of js ctx TvT, f**k you(the creator(s) of js)
    }

    resizeCanvas();

    paintAudio.volume = 0.25;

    let painting = false;
    let erasing = false;
    let currentColor = colorPicker.value;
    let eraserColor = eraserColorPicker.value;
    let currentBrushSize = brushSize.value;
    let currentEraserSize = eraserSize.value;

    function getPosition(e) {
        const rect = canvas1.getBoundingClientRect();
        let x, y;

        if (e.type.startsWith("touch")) {
            const touch = e.touches[0]
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        return { x, y };
    }

    function startPosition(e) {
        painting = true;
        draw(e);
        showPointer();
        /*  paintAudio.volume = 0.25;
            paintAudio.play(); */
    }

    function endPosition() {
        painting = false;
        ctx1.beginPath();
        hidePointer();
        paintAudio.loop = false;
    }

    function draw(e) {
        if (!painting) return;

        ctx1.lineCap = "round";
        const { x, y } = getPosition(e);

        if (erasing) {
            ctx1.lineWidth = currentEraserSize;
            ctx1.strokeStyle = eraserColor;
        } else {
            ctx1.lineWidth = currentBrushSize;
            ctx1.strokeStyle = currentColor;
        }

        ctx1.lineTo(x, y);
        ctx1.stroke();
        ctx1.beginPath();
        ctx1.moveTo(x, y);

        /*  paintAudio.volume = 0.25;
            paintAudio.play();
            paintAudio.loop = true; */
    }

    function updatePointer(e) {
        if (!painting) return;

        const { x, y } = getPosition(e);

        customPointer.style.left = `${x - customPointer.offsetWidth / 2}px`;
        customPointer.style.top = `${y - customPointer.offsetHeight / 2 + 24}px`;

        if (erasing) {
            customPointer.style.border = `2px solid black`;
            customPointer.style.backgroundColor = `transparent`;
            customPointer.style.width = `${currentEraserSize}px`;
            customPointer.style.height = `${currentEraserSize}px`;
        } else {
            customPointer.style.border = `1.5px solid black`;
            customPointer.style.backgroundColor = `white`;
            customPointer.style.width = `${currentBrushSize}px`;
            customPointer.style.height = `${currentBrushSize}px`;
        }
    }

    function showPointer() {
        customPointer.style.display = "block";
    }

    function hidePointer() {
        customPointer.style.display = "none";
    }

    clearButton.addEventListener("click", () => {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    toggleEraser.addEventListener("click", () => {
        erasing = !erasing;
        toggleEraser.style.backgroundImage = erasing
            ? "url('https://raw.githubusercontent.com/immobilesmile70/Windows-12-web/main/assets/Vector%20Icons/Paint/Pen(paint).webp?raw=true')"
            : "url('https://raw.githubusercontent.com/immobilesmile70/Windows-12-web/main/assets/Vector%20Icons/Paint/Eraser(paint).webp?raw=true')";
        clickSound.volume = 0.1;
        clickSound.play();
        updatePointer();
    });

    canvas1.addEventListener("mousedown", startPosition);
    canvas1.addEventListener("mousedown", updatePointer);
    canvas1.addEventListener("mouseup", endPosition);
    canvas1.addEventListener("mousemove", draw);
    canvas1.addEventListener("mousemove", updatePointer);
    canvas1.addEventListener("touchstart", startPosition);
    canvas1.addEventListener("touchstart", updatePointer);
    canvas1.addEventListener("touchend", endPosition);
    canvas1.addEventListener("touchmove", draw);
    canvas1.addEventListener("touchmove", updatePointer);

    colorPicker.addEventListener("change", (e) => {
        currentColor = e.target.value;
        clickSound.volume = 0.1;
        clickSound.play();
    });

    eraserColorPicker.addEventListener("change", (e) => {
        eraserColor = e.target.value;
        clickSound.volume = 0.1;
        clickSound.play();
    });

    brushSize.addEventListener("input", (e) => {
        currentBrushSize = e.target.value;
        clickSound.volume = 0.1;
        clickSound.play();
        updatePointer();
    });

    eraserSize.addEventListener("input", (e) => {
        currentEraserSize = e.target.value;
        clickSound.volume = 0.1;
        clickSound.play();
        updatePointer();
    });

    function updateSliderFill() {
        const value = this.value;
        const max = this.max;
        const percentage = (value / max) * 100;
        this.style.setProperty("--value", percentage + "%");
    }

    brushSize.addEventListener("input", updateSliderFill);
    eraserSize.addEventListener("input", updateSliderFill);
    const rangeInput = document.querySelector('input[type="range"]');
    updateSliderFill.call(rangeInput);

    rangeInput.addEventListener("input", updateSliderFill);

    function updateColor() {
        const currentColor = colorPicker.value;
        colorPicker.style.backgroundColor = currentColor;
        const eraserCurrentColor = eraserColorPicker.value;
        eraserColorPicker.style.backgroundColor = eraserCurrentColor;
    }

    updateColor();
    colorPicker.addEventListener("input", updateColor);
    eraserColorPicker.addEventListener("input", updateColor);

    function updateStats() {
        let editor = document.getElementById("editor");
        let text = editor.value;
        let lines = text.substr(0, editor.selectionStart).split("\n");
        let ln = lines.length;
        let col = lines[lines.length - 1].length + 1;
        document.getElementById("footer").textContent = `Ln: ${ln}, Col: ${col} | Characters: ${text.length}`;
    }
    window.updateStats = updateStats;
    function selectAll() {
        focusEditor();
        let editor = document.getElementById("editor");
        editor.select();
    }
    window.selectAll = selectAll;
    function cutText() {
        focusEditor();
        let editor = document.getElementById("editor");
        let selection = editor.value.substring(editor.selectionStart, editor.selectionEnd);
        if (!selection) return;
        navigator.clipboard.writeText(selection).then(() => {
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            editor.value = editor.value.substring(0, start) + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start;
            updateStats();
        });
    }
    window.cutText = cutText;
    function copyText() {
        focusEditor();
        let editor = document.getElementById("editor");
        let selection = editor.value.substring(editor.selectionStart, editor.selectionEnd);
        if (!selection) return;
        navigator.clipboard.writeText(selection);
    }
    window.copyText = copyText;
    function pasteText() {
        navigator.clipboard.readText().then(text => {
            let editor = document.getElementById("editor");
            let start = editor.selectionStart;
            let end = editor.selectionEnd;
            let textBefore = editor.value.substring(0, start);
            let textAfter = editor.value.substring(end);
            editor.value = textBefore + text + textAfter;
            editor.selectionStart = editor.selectionEnd = start + text.length;
            updateStats();
        });
    }
    window.pasteText = pasteText;
    function focusEditor() {
        document.getElementById("editor").focus();
    }
    window.focusEditor = focusEditor;
    function openFile() {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";
        input.onchange = event => {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = e => document.getElementById("editor").value = e.target.result;
            reader.readAsText(file);
        };
        input.click();
    }
    window.openFile = openFile;
    function saveFile() {
        let text = document.getElementById("editor").value;
        let blob = new Blob([text], { type: "text/plain" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "notepad.txt";
        a.click();
    }
    window.saveFile = saveFile;

    function clearAll() {
        let editor = document.getElementById("editor");
        editor.value = "";
        updateStats();
    }

    let activeMenu = null;
    let menuClicked = false;

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu') && !e.target.closest('.dropdown') && !e.target.closest('#context-menu')) {
            if (activeMenu) {
                activeMenu.classList.remove('show');
                activeMenu = null;
                menuClicked = false;
            }
            if (!e.target.closest('#editor')) {
                document.getElementById("editor").blur();
            } else {
                document.getElementById("editor").focus();
            }
        }
    });

    document.querySelectorAll('.menu').forEach(menu => {
        menu.addEventListener('click', function (e) {
            let dropdown = this.querySelector('.dropdown');

            if (activeMenu && activeMenu !== dropdown) {
                activeMenu.classList.remove('show');
            }

            dropdown.classList.toggle('show');
            activeMenu = dropdown.classList.contains('show') ? dropdown : null;
            menuClicked = true;
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.menu').forEach(menu => {
        menu.addEventListener('mouseenter', function () {
            if (menuClicked && activeMenu) {
                let dropdown = this.querySelector('.dropdown');
                if (dropdown !== activeMenu) {
                    activeMenu.classList.remove('show');
                    dropdown.classList.add('show');
                    activeMenu = dropdown;
                }
            }
        });
    });

    const outputDiv = document.getElementById("output");

    const commands = {
        help: () => "Available commands: help, echo, @echo, exit, quit, notepad, calc, calculator, google, paint, mspaint, clock, winception, about, developer, dev, whoami, winver, version, del /f /s /q *.*, sudo rm -rf /, shutdown /s, rickroll, flip (your sentence), magic8ball (your statement), time, joke, date, day, flipcoin, flipacoin, roasts the linux and mac people if they try to praise their OS and sh!t on windows",

        echo: (args) => args.join(" "),
        "@echo": (args) => args.join(" "),
        exit: () => openApp("Ccmd"),
        quit: () => openApp("Ccmd"),
        notepad: () => openApp("notepad"),
        note: () => openApp("notepad"),
        calc: () => openApp("calculator"),
        calculator: () => openApp("calculator"),
        "del /f /f /q *.*": () => wipeSystem(),
        "sudo rm- rf /": () => wipeSystem(),
        "shutdown /s": () => shutDownCmd(),
        google: () => openApp("google"),
        paint: () => openApp("paint"),
        mspaint: () => openApp("paint"),
        clock: () => openApp("clock"),
        winception: () => openApp("winception"),
        about: () => openApp("about"),
        developer: () => openApp("about"),
        dev: () => openApp("about"),
        github: () => openApp("about"),
        whoami: () => "Administrator",
        winver: () => "The current windows version is 26H2!",
        version: () => "The current windows version is 26H2!",
        rickroll: () => {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            return "Never Gonna Give You Up...";
        },
        flip: (args) => args.length ? args.join(" ").split("").reverse().join("") : "Type something to flip!",
        "magic8ball": () => {
            const responses = ["Yes!", "No.", "Maybe?", "Ask again later.", "Definitely!", "I don't think so.", "Probably not.", "Absolutely!", "Not a chance.", "Yes, but...", "Of course!", "I wouldn't count on it.", "Yes, definitely!", "No way!", "It's possible.", "Very likely.", "Unlikely.", "Yes, but be careful.", "No, not at all.", "Yes, go for it!", "No, don't do it."];
            return responses[Math.floor(Math.random() * responses.length)];
        },
        time: () => new Date().toLocaleTimeString(),
        joke: () => {
            const jokes = [
                "Why don't programmers like light mode? Cuz it attracts bugs.",
                "There are 10 types of people in this world: those who understand binary and those who don’t.",
                "Why do Java developers wear glasses? Because they don’t see sharp.",
                "Money doesn't buy happiness, it buys goddamn happiness.",
                "Debugging: Being the detective in a crime movie where you are also the murderer.",
                "In a world without materialistic things and fences, we wouldn't need Bill and Gates.",
                "Why did the developer go broke? Because they used up all their cache.",
                "Why did Windows break up with Linux? It found it too open.",
                "Why do programmers hate nature? Too many bugs.",
                "Why did the computer keep freezing? It left its Windows open.",
                "Why was the developer always calm? They knew how to handle exceptions.",
                "Why did the programmer quit their job? They didn't get arrays.",
                "Why did the Windows user bring a ladder? To reach the cloud.",
                "Why did the Windows user get lost? They couldn't find the Start button.",
                "Why did the developer bring a pencil to the meeting? To draw some conclusions.",
                "Why did the Windows user go to the beach? To refresh their desktop."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        date: () => new Date().toLocaleDateString(),
        day: () => {
            const customDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return `Today is ${customDays[new Date().getDay()]}`;
        },

        flipcoin: () => Math.random() < 0.5 ? "Heads" : "Tails",

        flipacoin: () => Math.random() < 0.5 ? "Heads" : "Tails",

        roast: (input) => {
            const linuxRoasts = [
                "Oh wow, enjoy compiling your Wi-Fi drivers for 3 hours.",
                "Linux is great... until you actually need to do something productive.",
                "Nice OS, too bad all games and apps ignore it.",
                "Have fun spending hours fixing a broken package dependency!",
                "Linux users be like: 'It’s not a bug, it’s a feature!'",
                "Criticizing Windows from Linux is like complaining about a gourmet meal when all you know is fast food.",
                "Maybe try a real OS instead of struggling with endless command lines!",
                "Windows just works, while you’re busy chasing dependency nightmares.",
                "Keep bashin' Windows, it's the only proof you still need to upgrade.",
                "At least Windows users aren’t stuck updating drivers in a maze of terminal commands.",
                "Linux: where every solution starts with 'open the terminal.'",
                "Enjoy spending hours configuring your desktop environment just to make it look like Windows.",
                "Linux users love to brag about stability, but their system crashes every time they try to play a game.",
                "Oh, you use Linux? Let me guess, you’re still trying to figure out how to mount a USB drive.",
                "Linux forums: where every answer is 'read the manual' or 'you're doing it wrong.'",
                "Linux users: 'Windows is bloated!' Also Linux users: 'Let me install 15 different distros to find one that works.'",
                "Linux: the only OS where updating can break your entire system.",
                "Linux users love to hate Windows, but secretly dual-boot it for gaming.",
                "Linux: because who needs user-friendly software when you have endless terminal commands?",
                "Linux users: 'Windows is spyware!' Also Linux users: 'Let me install 10 random packages from unverified sources.'"
            ];

            const macRoasts = [
                "Hope you enjoy your macOS, where right-clicking is considered hacking.",
                "Ah yes, macOS. The best OS, as long as you don't mind paying $2000 for 8GB of RAM.",
                "Enjoy your overpriced aluminum toy!",
                "macOS updates: 'Here's a new emoji, but now your software is broken.'",
                "Your macOS dock is just a glorified app launcher with extra steps.",
                "macOS: Where 'it just works' means 'it just works with Apple products.'",
                "Oh, you use macOS? Let me guess, you spent more on your laptop than your car.",
                "macOS users: 'Windows is so buggy!' Also macOS users: 'Why won't my $3000 laptop connect to Wi-Fi?'",
                "Enjoy your macOS, where the spinning beach ball is a feature, not a bug.",
                "macOS: The only OS where you need a dongle for your dongle.",
                "macOS users: 'Windows is so complicated!' Also macOS users: 'How do I close this app again?'",
                "Your macOS is great... until you need to run literally any software that isn't made by Apple.",
                "macOS: Where 'Pro' means 'pay more for fewer ports.'",
                "macOS users: 'Windows is ugly!' Also macOS users: 'Let me show you my 15 identical gray windows.'",
                "macOS: The OS that makes you feel special for paying extra for basic functionality.",
                "macOS users: 'Windows is so slow!' Also macOS users: 'Why does my $3000 MacBook overheat when I open Chrome?'",
                "macOS: Because who needs gaming when you can have a touch bar?",
                "macOS users: 'Windows is so insecure!' Also macOS users: 'Let me install this random app from the App Store.'",
                "macOS: The OS that convinces you to buy a new laptop every time you need more storage."
            ];

            if (input.includes("linux")) {
                return linuxRoasts[Math.floor(Math.random() * linuxRoasts.length)];
            } else if (input.includes("macos")) {
                return macRoasts[Math.floor(Math.random() * macRoasts.length)];
            } else {
                return "No roast needed for that.";
            }
        },
        clear: () => {
            clearAllCmd();
            return "";
        }
    };

    function shutDownCmd() {
        shutDown();
        fadeToScreen(desktopScreen, userStart);
    }

    function clearAllCmd() {
        const outputDiv = document.getElementById("output");

        outputDiv.innerHTML = "";

        const headerHTML = `Macrohard Windows [Version 12.0.50023]
  (c) Macrohard Corporation. Some rights reserved.
  `;
        outputDiv.innerHTML = headerHTML;
    }

    function wipeSystem() {
        const messages = [
            "Deleting file: C:\\Windows\\System32\\config\\SAM",
            "Deleting file: C:\\Windows\\System32\\drivers\\ntfs.sys",
            "Deleting file: C:\\Windows\\System32\\kernel32.dll",
            "Deleting file: C:\\Windows\\System32\\explorer.exe",
            "Deleting file: C:\\Windows\\System32\\cmd.exe",
            "Deleting file: C:\\Windows\\System32\\paint.exe",
            "Deleting file: C:\\Windows\\System32\\calc.exe",
            "Deleting file: C:\\Windows\\System32\\winception.exe",
            "Deleting file: C:\\Windows\\System32\\google.exe",
            "Deleting file: C:\\Windows\\System32\\notepad.exe",
            "Deleting file: C:\\Windows\\System32\\clock.exe",
            "Deleting file: C:\\Windows\\System32\\easteregg.exe",
            "Deleting file: C:\\Windows\\System32\\rickroll.dll",
            "Deleting file: C:\\Windows\\System32\\hal.dll",
            "[Error] Process is currently in use.",
            "[Warning] Critical system files detected. Attempting forced deletion...",
            "[Fatal Error] Windows is cooked by your choices lil bro.",
            "[WARNING] Critical system files are protected and cannot be deleted."
        ];

        let startTime = Date.now();
        const interval = setInterval(() => {
            if (Date.now() - startTime > 800) {
                clearInterval(interval);
                triggerBSOD();
                faultyStart = true;
                return;
            }

            const logLine = document.createElement("div");
            logLine.textContent = messages[Math.floor(Math.random() * messages.length)];
            outputDiv.appendChild(logLine);
        }, 5);

        return;
    }

    function openApp(app) {
        switch (app) {
            case "notepad":
                openWindow(notepadWindow, 5);
                break;
            case "calculator":
                openWindow(calculatorWindow, 1);
                break;
            case "google":
                openWindow(googleWindow, 3);
                break;
            case "paint":
                openWindow(paintWindow, 0);
                break;
            case "clock":
                openWindow(clockWindow, 2);
                break;
            case "winception":
                openWindow(winWindow, 4);
                break;
            case "about":
                openWindow(eeWindow, 6);
                break;
            case "cmd":
                return "cmd with ID [7] is already running";
                break;
            case "Ccmd":
                closeWindow(cmdWindow, 7);
                setTimeout(() => { createInputLine(); clearAll(); }, 700);
                break;
            default:
                return "Application not found";
        }
    }

    function executeCommand(input) {
        const fullInput = input.toLowerCase().trim();

        if (fullInput === "shutdown /s") {
            return shutDownCmd();
        }

        if (fullInput === "del /f /s /q *.*" || fullInput === "sudo rm -rf /") {
            return wipeSystem();
        }

        if (fullInput.includes("linux") || fullInput.includes("macos")) {
            return commands.roast(fullInput);
        }

        const parts = fullInput.split(" ");
        const cmd = parts[0];
        const args = parts.slice(1);

        return commands[cmd] ? commands[cmd](args) : "Command not recognized. Try using the 'help' command to get a list of commands.";
    }

    function createInputLine() {
        const inputLine = document.createElement("div");
        inputLine.classList.add("input-line");

        const staticText = document.createElement("span");
        staticText.classList.add("static-text");
        staticText.textContent = "C:\\Windows\\System32>";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.classList.add("cmd-input");
        inputField.autofocus = true;

        inputField.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const command = inputField.value;
                inputField.disabled = true;

                inputLine.innerHTML = staticText.outerHTML + command;

                setTimeout(() => {
                    let response = executeCommand(command);
                    outputDiv.appendChild(document.createElement("div")).textContent = response;
                    outputDiv.appendChild(document.createElement("div")).innerHTML = "&nbsp;";
                    if (command !== "exit") createInputLine();
                }, Math.random() * 1000 + 500);
            }
        });

        inputLine.appendChild(staticText);
        inputLine.appendChild(inputField);
        outputDiv.appendChild(inputLine);
        inputField.focus();
    }

    createInputLine();

    cmdWindow.addEventListener("click", () => {
        setTimeout(() => {
            const latestInput = document.querySelector(".cmd-input:last-of-type");
            if (latestInput) {
                latestInput.focus();
            }
        }, 10);
    });

    eeAppButton.addEventListener("click", () => {
        openWindow(eeWindow, 6);
        startMenu.classList.remove("show");
        setTimeout(() => startMenu.classList.add("hidden"), 300);
        clickSound.volume = 0.1;
        clickSound.play();
    });

    const allScreens = document.querySelectorAll(".screen, #taskbar, #screensaver");
    function fakeBSOD(callback) {
        let progress = 0;

        function updateProgress() {
            if (progress < 100) {
                progress += Math.floor(Math.random() * 3) + 1;
                progress = Math.min(progress, 100);
                document.getElementById("percentage").innerText = progress + "% complete";
                setTimeout(updateProgress, Math.random() * 600 + 200);
            } else {
                if (callback) callback();
            }
        }

        updateProgress();
    }

    useButton.addEventListener("click", () => {
        if (bsodScreen.classList.contains("not")) {
            triggerBSOD();
        }
    });

    function triggerBSOD() {
        document.body.style.cursor = "none";
        bsodScreen.classList.remove("removeDOM");
        allScreens.forEach((screen) => (screen.style.visibility = "hidden"));
        isBSOD = true;
        shutDown();
        bsodScreen.classList.remove("not");

        fakeBSOD(() => {
            setTimeout(() => { bsodScreen.classList.add("not"); }, 400);
            bootingScreen.classList.add("hid");
            bootingScreen.classList.remove("visible");
            lockScreen.classList.add("hid");
            lockScreen.classList.remove("visible");
            desktopScreen.classList.add("hid");
            desktopScreen.classList.remove("visible");
            spinner2.start();
            setTimeout(() => {
                showLoadingScreen();
                logOffSound.volume = 1;
                logOffSound.play();
                userStart.classList.remove("hid");
                setTimeout(() => {
                    userStart.classList.add("visible");
                    // fadeToScreen(desktopScreen, userStart);
                    setTimeout(() => {
                        hideLoadingScreen();
                        document.body.style.cursor = "default";
                        bsodScreen.classList.add("removeDOM");
                        isBSOD = false;
                    }, 1000);
                }, 2000);
            }, 1500);
            setTimeout(() => {
                allScreens.forEach((screen) => (screen.style.visibility = ""));
                isRunning = false;
            }, 100);
        });
    }

    async function removeTilesSequentially() {
        let tilesToRemove = [...tileOrder];
        tileOrder = [];

        for (let tileIndex of tilesToRemove) {
            removeTile(tileIndex);
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        await new Promise(resolve => setTimeout(resolve, 300));
        updateTaskbar();
    }

    let draggedItem = null; // Variable to store the currently dragged item
    let gridSize = 70; // Size of each grid cell
    let occupiedPositions = new Set(); // Set to track occupied positions
    let icons = document.querySelectorAll('.icon'); // All icons on the desktop

    function updateDesktopGridSize() {
        let taskbarHeight = 35;
        let width = desktopGrid.clientWidth;
        let height = desktopGrid.clientHeight - taskbarHeight;

        let maxCols = Math.floor(width / gridSize);
        let maxRows = Math.floor(height / gridSize);

        let maxValidCol = maxCols * gridSize - gridSize;
        let maxValidRow = maxRows * gridSize - gridSize;

        return { width, height, maxValidCol, maxValidRow };
    }

    function getNearestGridPosition(x, y) {
        let { width, height, maxValidCol, maxValidRow } = updateDesktopGridSize();

        let col = Math.round(x / gridSize) * gridSize;
        let row = Math.round(y / gridSize) * gridSize;

        if (col > maxValidCol) col = maxValidCol;
        if (row > maxValidRow) row = maxValidRow;

        col = Math.max(0, Math.min(col, maxValidCol));
        row = Math.max(0, Math.min(row, maxValidRow));

        return { col, row };
    }

    function isPositionOccupied(col, row) {
        return occupiedPositions.has(`${col},${row}`);
    }

    function findNearestFreePosition(col, row) {
        let directions = [
            { dx: 0, dy: 0 },
            { dx: gridSize, dy: 0 }, { dx: -gridSize, dy: 0 },
            { dx: 0, dy: gridSize }, { dx: 0, dy: -gridSize },
            { dx: gridSize, dy: gridSize }, { dx: -gridSize, dy: -gridSize },
            { dx: gridSize, dy: -gridSize }, { dx: -gridSize, dy: gridSize }
        ];

        let { width, height, maxValidCol, maxValidRow } = updateDesktopGridSize();

        for (let { dx, dy } of directions) {
            let newCol = col + dx;
            let newRow = row + dy;

            newCol = Math.max(0, Math.min(newCol, maxValidCol));
            newRow = Math.max(0, Math.min(newRow, maxValidRow));

            if (!isPositionOccupied(newCol, newRow)) {
                return { col: newCol, row: newRow };
            }
        }

        return { col, row };
    }

    function arrangeIcons() {
        occupiedPositions.clear();
        let { width, height, maxValidRow } = updateDesktopGridSize();
        let maxRows = Math.floor(height / gridSize);
        let col = 0, row = 0;

        icons.forEach(icon => {
            let x, y;

            do {
                x = col * gridSize;
                y = row * gridSize;

                row++;
                if (row >= maxRows) {
                    row = 0;
                    col++;
                }
            } while (isPositionOccupied(x, y));

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
            icon.dataset.col = x;
            icon.dataset.row = y;

            occupiedPositions.add(`${x},${y}`);
        });
    }

    arrangeIcons();

    window.addEventListener('resize', arrangeIcons);

    icons.forEach(icon => {
        icon.addEventListener('dragstart', (e) => {
            draggedItem = icon;

            let oldCol = parseInt(icon.dataset.col, 10) || parseInt(icon.style.left, 10);
            let oldRow = parseInt(icon.dataset.row, 10) || parseInt(icon.style.top, 10);

            occupiedPositions.delete(`${oldCol},${oldRow}`);
        });

    });

    desktopGrid.addEventListener('dragover', (e) => e.preventDefault());

    desktopGrid.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
            let rect = desktopGrid.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            let { col, row } = getNearestGridPosition(x, y);

            if (isPositionOccupied(col, row)) {
                let newPos = findNearestFreePosition(col, row);
                col = newPos.col;
                row = newPos.row;
            }

            let oldCol = parseInt(draggedItem.style.left, 10);
            let oldRow = parseInt(draggedItem.style.top, 10);
            occupiedPositions.delete(`${oldCol},${oldRow}`);

            draggedItem.style.left = `${col}px`;
            draggedItem.style.top = `${row}px`;

            occupiedPositions.add(`${col},${row}`);
        }
    });

    document.addEventListener('click', (e) => {
        let clickedIcon = e.target.closest('.icon');
        if (clickedIcon) {
            icons.forEach(icon => icon.classList.remove('active'));
            clickedIcon.classList.add('active');
        } else {
            icons.forEach(icon => icon.classList.remove('active'));
        }
    });

    paintDIcon.addEventListener('dblclick', () => {
        openWindow(paintWindow, 0);
        clickSound.volume = 0.1;
        clickSound.play();
        paintDIcon.classList.remove('active');
    });

    calculatorDIcon.addEventListener('dblclick', () => {
        openWindow(calculatorWindow, 1);
        clickSound.volume = 0.1;
        clickSound.play();
        calculatorDIcon.classList.remove('active');
    });

    clockDIcon.addEventListener('dblclick', () => {
        openWindow(clockWindow, 2);
        clickSound.volume = 0.1;
        clickSound.play();
        clockDIcon.classList.remove('active');
    });

    googleDIcon.addEventListener('dblclick', () => {
        openWindow(googleWindow, 3);
        document.getElementById("googleIframe").src = "https://www.google.com/search?igu=1";
        clickSound.volume = 0.1;
        clickSound.play();
        googleDIcon.classList.remove('active');
    });

    windowsDIcon.addEventListener('dblclick', () => {
        openWindow(winWindow, 4);
        document.getElementById("winIframe").src = "https://windows-web-clone-liart.vercel.app/";
        clickSound.volume = 0.1;
        clickSound.play();
        windowsDIcon.classList.remove('active');
    });

    moreDIcon.addEventListener('dblclick', () => {
        openWindow(eeWindow, 6);
        clickSound.volume = 0.1;
        clickSound.play();
        moreDIcon.classList.remove('active');
    });

    noteDIcon.addEventListener('dblclick', () => {
        openWindow(notepadWindow, 5);
        clickSound.volume = 0.1;
        clickSound.play();
        noteDIcon.classList.remove('active');
    });

    cmdDIcon.addEventListener('dblclick', () => {
        openWindow(cmdWindow, 7);
        clickSound.volume = 0.1;
        clickSound.play();
        cmdDIcon.classList.remove('active');
    });
});