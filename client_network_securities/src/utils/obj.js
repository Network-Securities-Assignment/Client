export const attributeObject = (attributes) => attributes.reduce((obj, item) => {
    // Assuming each type has only one value for simplicity
    obj[item.type] = item.values;
    return obj;
}, {});

export function extractUsername(dn) {
    // Regular expression to match 'cn' followed by any characters until the first comma
    const match = dn.match(/cn=([^,]+)/);
    if (match && match[1]) {
        return match[1]; // The first capturing group is the username
    }
    return null; // Return null if no match is found
}
