export const services = ["archive.is", "archive.org", "perma.cc", "webcitation.org"];

const blacklist = ["file://", "about:", "chrome://", "http://127.0.0.1", "http://localhost"];

export function is_local(url) {
    for (let b of blacklist) {
        if (url.startsWith(b)) return true;
    }
    return false;
}

export function get_archiving_url(page, service, email) {
    let url = "https://archive.is/?run=1&url=" + encodeURIComponent(page); // default
    if (service === "archive.org") {
        // breaks if page is URI encoded
        url = "https://web.archive.org/save/" + page;
    } else if (service === "perma.cc") {
        url = "https://www.perma.cc/service/bookmarklet-create/?v=1&url=" + encodeURIComponent(page);
    } else if (service === "webcitation.org") {
        let base = "http://www.webcitation.org/archive?url=";
        url = base + encodeURIComponent(page) + "&email=" + encodeURIComponent(email);
    }
    return url;
}

export let hasPageCapture;
if (chrome.hasOwnProperty("pageCapture")) {
    hasPageCapture = true;
} else {
    hasPageCapture = false;
}
