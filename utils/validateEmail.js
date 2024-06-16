export function validateEmail(email) {
    const emailRegex = new RegExp(
        "^(?=.{1,254}$)" +                   // Entire email length constraint
        "(?=.{1,64}@.{1,255}$)" +            // Local and domain part length constraints
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+" + // Local part characters
        "(?:\\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*" + // Additional local part characters (with dot-separated parts)
        "@" +                                // At symbol separating local and domain
        "(?:(?!-)[a-zA-Z0-9-]+(?<!-)\\.)+" + // Domain part with subdomains
        "(?:[a-zA-Z]{2,63})$"                // Top-Level Domain (TLD)
    );

    return emailRegex.test(email);
}