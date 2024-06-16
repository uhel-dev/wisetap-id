export function validateUrl(url) {
    // Function to validate the URL using a regex pattern
    function isValidUrl(str) {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?" +               // Optional protocol
            "(([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+(:([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+)?@)?" + // Username:Password@ (optional)
            "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}|" + // Domain name
            "((\\d{1,3}\\.){3}\\d{1,3})))" +    // OR IPv4
            "(:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?" +  // Port (optional)
            "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" +     // Query string (optional)
            "(\\#[-a-zA-Z0-9_]*)?$",            // Fragment locator (optional)
            "i"
        );
        return pattern.test(str);
    }

    // Ensure the URL has a protocol, default to https:// if not present
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    // Validate the URL after ensuring it has a protocol
    if (isValidUrl(url)) {
        return url;
    } else {
        return "Invalid URL";
    }
}