export default function includeHtml() {
    let fetchFile = (element) => {
        let file = 'Templates/' + element.getAttribute("include-html") + '.html';
        return fetch(file).then((res) => {
            if (res.status === 200) {
                return res.text();
            }
        }).then((data) => {
            element.innerHTML = data;
            element.removeAttribute("include-html");
        });
    }

    let allElements = document.querySelectorAll("[include-html]"),
        allPromises: Array<Promise<void>> = [];

    allElements.forEach((element) => {
        allPromises.push(fetchFile(element));
    });

    return Promise.all(allPromises);
}