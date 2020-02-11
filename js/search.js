var url = "https://en.wikipedia.org/api/rest_v1/page/metadata/Douglas%20Adams";

var params = {
    action: "query",
    prop: 'extracts',
    titles: "Douglas MacArthur",
    format: "json"
};

url = url + "?redirect=false";
// Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {

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
                let li = createLiChild(element, topUL);
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

                        createLiChild(element, currentParent)

                    }
                }
                if (currentLevel == prevLevel) {
                    // sibling
                 
                    createLiChild(element, currentParent)
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
                    createLiChild(element, currentParent)
                    console.log(element.number, currentParent)
                }

            }

        })

        document.body.appendChild(topUL)

    })
    .catch(function (error) {
        console.log(error);
    });


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

function createLiChild(element, parent) {
    var li = document.createElement('li');
    li.id = element.number;
    li.innerHTML = element.number + element.html;
    parent.appendChild(li);
    return li;
}