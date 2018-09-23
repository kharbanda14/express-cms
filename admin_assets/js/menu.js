var pageLinks = [];
var menuId = '';
$(document).ready(async function () {
    const api = new FetchApi();
    $('#addNewMenu').on('submit', async function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        let resp = await api.post('/admin_ajax/add_menu', fd);
        console.log(resp);

    })
    $('#addNewLink').on('submit', async function (e) {
        e.preventDefault();
        let data = $(this).serializeArray();
        let each = {};
        data.forEach(field => {
            each[field.name] = field.value;
        });
        pageLinks.push(each);
        renderMenuItems(pageLinks);
        displayMenuLinkAdded();
        this.reset();
    })
    $('#saveMenu').on('click', async function () {
        let api = new FetchApi()
        var headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let postData = {
            id: menuId,
            links: pageLinks,
        }
        let resp = await api.post('/admin_ajax/update_menu', JSON.stringify(postData), headers)
        toggleElements('#menuSavedAlert');
    })
    $('#show_menu_links').sortable({
        update: function (event, ui) {}
    })
    $("#show_menu_links").on("sortupdate", function (event, ui) {
        updateOrder();
    });

})

window.onload = async function () {
    await processMenu();

}
window.onhashchange = async function () {
    await processMenu();

}
async function processMenu() {
    pageLinks = [];
    $('.menuSwitch').show();
    if (location.hash.length == 0) {
        return;
    }
    let objid = location.hash.substr(1);
    menuId = objid;
    let api = new FetchApi();
    let url = '/admin_ajax/get_menu?id=' + objid;
    try {
        let res = await api.get(url);
        if (res.data) {
            $('#menuTitle').text(res.data.title);
            if (res.data.links && res.data.links.length > 0) {
                pageLinks = res.data.links;
                renderMenuItems(res.data.links);
            } else {
                $('#show_menu_links').html(getAlert('Found 0 Items'));
            }
        }
    } catch (error) {
        alert(error);
    }
}

function renderLink(link, index) {
    return `<div class="list-group-item" data-index="${index}">
        <i class="fa fa-bars mr-4"></i>
        ${link.title} 
        <span class="close" onclick="removeMenuItem(${index})">
            <i class="fa fa-close"></i>
        </span>
    </div>`;
}

function renderLinkInput(link) {
    return `<div class="list-group-item">
        ${link.title} 
        <span class="close">
            <i class="fa fa-close"></i>
        </span>
    </div>`;
}

function renderMenuItems(links) {
    let links_container = $('#show_menu_links');
    var blk = '';
    links.forEach((link, index) => {
        blk += renderLink(link, index)
    });
    links_container.html(blk);
}



function getAlert(text) {
    return `<div class="alert alert-info"> ${text} </div>`;
}

function displayMenuLinkAdded() {
    toggleElements('#menuAddedText');
}

function toggleElements(selector) {
    let el = $(selector);
    el.show();
    setTimeout(() => {
        el.hide();
    }, 2000);
}

function removeMenuItem(index) {
    pageLinks.splice(index, 1);
    renderMenuItems(pageLinks);
}

function updateOrder() {
    let neworder = [];
    $('#show_menu_links .list-group-item').each((i, element) => {
        neworder.push(pageLinks[$(element).data('index')])
    });
    pageLinks = neworder;
}