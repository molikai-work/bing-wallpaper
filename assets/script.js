/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

(function() {
    const linkRelList = document.createElement("link").relList;

    if (linkRelList && linkRelList.supports && linkRelList.supports("modulepreload")) return;

    document.querySelectorAll('link[rel="modulepreload"]').forEach(preloadModule);

    new MutationObserver(mutations => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach(node => {
                if (node.tagName === "LINK" && node.rel === "modulepreload") {
                    preloadModule(node);
                }
            });
        });
    }).observe(document, { childList: true, subtree: true });

    function getFetchOptions(link) {
        const options = {};
        if (link.integrity) options.integrity = link.integrity;
        if (link.referrerPolicy) options.referrerPolicy = link.referrerPolicy;
        options.credentials = link.crossOrigin === "use-credentials" ? "include" :
            link.crossOrigin === "anonymous" ? "omit" : "same-origin";
        return options;
    }

    function preloadModule(link) {
        if (link.preloaded) return;
        link.preloaded = true;
        fetch(link.href, getFetchOptions(link));
    }
})();

const apiEndpoint = "/api";

function openInNewTab() {
    window.open(`${apiEndpoint}/1080p`);
}

function redirectToReadme() {
    window.location.href = '/README.md';
}

function redirectToJson() {
    window.location.href = `${apiEndpoint}/json`;
}

window.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        openInNewTab();
    }
});

window.addEventListener("load", async () => {
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        try {
            const response = await fetch(`${apiEndpoint}/json`);
            if (!response.ok) throw new Error(response.status.toString());
            const data = await response.json();
            if (data) {
                const title = data.images?.[0]?.title || "No title available";
                const copyright = data.images?.[0]?.copyright || "No copyright available";
                copyrightElement.innerHTML = `${title}<br />${copyright}`;
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                copyrightElement.textContent = `Error: ${error.message}`;
            }
        }
    }
});

document.getElementById("bg-img")?.addEventListener("contextmenu", event => {
    event.preventDefault();
    openInNewTab();
});

document.getElementById("footer")?.addEventListener("click", event => {
    if (event.target?.id === "copyright") {
        redirectToJson();
    } else {
        redirectToReadme();
    }
});
