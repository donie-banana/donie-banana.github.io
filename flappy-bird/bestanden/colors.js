function randomColor(img, filterId) {

    function generateRandomBrightColorMatrix() {
        let r = Math.random() * 0.9 + 0.1;
        let g = Math.random() * 0.9 + 0.1;
        let b = Math.random() * 0.9 + 0.1;

        return `
            ${r} 0 0 0 0
            0 ${g} 0 0 0
            0 0 ${b} 0 0
            0 0 0 1 0
        `;
    }

    fetch(img.src)
        .then((response) => response.text())
        .then((svgText) => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
            const svgElement = svgDoc.documentElement;

            let defs = svgElement.querySelector("defs");
            if (!defs) {
                defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                svgElement.insertBefore(defs, svgElement.firstChild);
            }

            const existingFilter = svgElement.querySelector(`#${filterId}`);
            if (existingFilter) {
                existingFilter.remove();
            }

            const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
            filter.setAttribute("id", filterId);

            const feColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
            feColorMatrix.setAttribute("type", "matrix");
            feColorMatrix.setAttribute("values", generateRandomBrightColorMatrix());

            filter.appendChild(feColorMatrix);
            defs.appendChild(filter);

            svgElement.style.filter = `url(#${filterId})`;

            const serializer = new XMLSerializer();
            const updatedSVG = serializer.serializeToString(svgElement);
            img.src = `data:image/svg+xml;base64,${btoa(updatedSVG)}`;
        })
        .catch((error) => console.error("Error loading SVG:", error));
}