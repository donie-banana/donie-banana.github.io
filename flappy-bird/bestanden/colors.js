function randomColor(img, filterId) {

    // Function to generate random RGB values ensuring brightness
    function generateRandomBrightColorMatrix() {
        let r = Math.random() * 0.9 + 0.1; // Ensure at least 10% brightness
        let g = Math.random() * 0.9 + 0.1;
        let b = Math.random() * 0.9 + 0.1;

        return `
            ${r} 0 0 0 0
            0 ${g} 0 0 0
            0 0 ${b} 0 0
            0 0 0 1 0
        `;
    }

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

            // Generate a random bright color matrix
            const feColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
            feColorMatrix.setAttribute("type", "matrix");
            feColorMatrix.setAttribute("values", generateRandomBrightColorMatrix());

            // Append the color matrix to the filter
            filter.appendChild(feColorMatrix);
            defs.appendChild(filter);

            // Apply the filter to the entire SVG
            svgElement.style.filter = `url(#${filterId})`;

            // Replace the image source with the updated SVG
            const serializer = new XMLSerializer();
            const updatedSVG = serializer.serializeToString(svgElement);
            img.src = `data:image/svg+xml;base64,${btoa(updatedSVG)}`;
        })
        .catch((error) => console.error("Error loading SVG:", error));
}