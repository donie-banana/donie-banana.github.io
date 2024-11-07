
// Rainbow colors as filter matrix values
const colorMatrices = {
    red: `
        1 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 1 0
    `,
    orange: `
        1 0.5 0 0 0
        0 0.4 0 0 0
        0 0 0.1 0 0
        0 0 0 1 0
    `,
    yellow: `
        1 1 0 0 0
        0 1 0 0 0
        0 0 0 0 0
        0 0 0 1 0
    `,
    green: `
        0 0 0 0 0
        0 1 0 0 0
        0 1 0 0 0
        0 0 0 1 0
    `,
    blue: `
        0 0 0 0 0
        0 0 0 0 0
        0 0 1 0 0
        0 0 0 1 0
    `,
    purple: `
        0.5 0 0.5 0 0
        0 0 0 0 0
        1 0 1 0 0
        0 0 0 1 0
    `,
};

function applyRandomColorToSVG(imageId, filterId) {
    const img = document.getElementById(imageId);

    // Load the SVG content from the image
    fetch(img.src)
        .then((response) => response.text())
        .then((svgText) => {
            // Parse the SVG text
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
            const svgElement = svgDoc.documentElement;

            // Ensure <defs> exists in the SVG
            let defs = svgElement.querySelector("defs");
            if (!defs) {
                defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                svgElement.insertBefore(defs, svgElement.firstChild);
            }

            // Remove any existing filter with the same ID
            const existingFilter = svgElement.querySelector(`#${filterId}`);
            if (existingFilter) {
                existingFilter.remove();
            }

            // Create a new filter element
            const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
            filter.setAttribute("id", filterId);

            // Select a random color matrix
            const colors = Object.keys(colorMatrices);
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const feColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
            feColorMatrix.setAttribute("type", "matrix");
            feColorMatrix.setAttribute("values", colorMatrices[randomColor]);

            // Append the color matrix to the filter
            filter.appendChild(feColorMatrix);
            defs.appendChild(filter);

            // Apply the filter to the entire SVG
            svgElement.setAttribute("filter", `url(#${filterId})`);

            // Replace the image source with the updated SVG
            const serializer = new XMLSerializer();
            const updatedSVG = serializer.serializeToString(svgElement);
            img.src = `data:image/svg+xml;base64,${btoa(updatedSVG)}`;
        })
        .catch((error) => console.error("Error loading SVG:", error));
}

// Apply a random color to the pipe-img image
applyRandomColorToSVG("pipe-img", "randomColorFilter");