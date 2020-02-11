function searchWikipedia(lang, title) {

    var url = `https://${lang}.wikipedia.org/api/rest_v1/page/metadata/${title}`;
    var webUrl = `https://${lang}.wikipedia.org/wiki/${title}`;

    // var params = {
    //     action: "query",
    //     prop: 'extracts',
    //     titles: "Douglas MacArthur",
    //     format: "json"
    // };

    url = url + "?redirect=false";
    // Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            let toc = response.toc.entries;

            let topUL = createUl();
            let ulStack = []
            ulStack.push(topUL);

            toc.forEach((element, index) => {

                let currentLevel = element.level;
                let prev = getPrevious(index, toc);
                let prevLevel = prev ? prev.level : 0;

                if (currentLevel == 1) {
                    // create top level list
                    let li = createLiChild(element, topUL, webUrl);
                    ulStack.push(li);

                } else {
                    let currentParent = ulStack[ulStack.length - 1] || null;

                    if (currentLevel > prevLevel) {
                        if (prevLevel != 0) {

                            if (currentParent.tagName == 'LI') {
                                // create an ul first
                                let ul = createUl(element)
                                currentParent.appendChild(ul);
                                ulStack.push(ul);
                                currentParent = ulStack[ulStack.length - 1] || null;

                            } else {
                                createLi(element);
                                let ul = createUl(element)
                                currentParent.appendChild(ul);
                                ulStack.push(ul);
                                currentParent = ulStack[ulStack.length - 1] || null;
                            }

                            createLiChild(element, currentParent, webUrl)

                        }
                    }
                    if (currentLevel == prevLevel) {
                        // sibling

                        createLiChild(element, currentParent, webUrl)
                    }
                    if (currentLevel < prevLevel) {
                        // next
                        ulStack.pop();
                        currentParent = ulStack[ulStack.length - 1] || null;
                        if (currentParent.tagName == 'LI') {
                            // create an ul first
                            let ul = createUl(element)
                            currentParent.appendChild(ul);
                            ulStack.push(ul);
                            currentParent = ulStack[ulStack.length - 1] || null;

                        }
                        createLiChild(element, currentParent, webUrl)
                        // console.log(element.number, currentParent)
                    }

                }

            })

            document.body.appendChild(topUL)

        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPrevious(index, arr) {
    return arr[index - 1] ? arr[index - 1] : null;
}

function createUl(element) {
    let ul = document.createElement('ul');
    ul.id = element && element.number || 'root';
    return ul;
}

function createLi(element) {

    var li = document.createElement('li');
    li.innerHTML = element.number + element.html
    return li;
}

function createLiChild(element, parent, url) {
    var li = document.createElement('li');
    li.id = element.number;
    let link = createHyperLink(element, url);
    li.innerHTML = `${element.number} `;
    li.appendChild (link);
    parent.appendChild(li);
    return li;
}

function createHyperLink(element, url) {
    var a = document.createElement('a');
    a.innerHTML =  element.html
    a.href = `${url}#${element.anchor}`;
    a.target = '_blank';
    return a;
}

function getData() {
    let title = document.getElementById('searchbox').value;
    title = encodeURIComponent(title.trim());
    let lang = document.getElementById('languageselect').value;
    if (lang && title) {
        console.log(lang, title);
        searchWikipedia(lang, title);
    }

}