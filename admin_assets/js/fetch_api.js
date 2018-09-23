function FetchApi() {
    this.get = (url) => {
        return fetch(window.base_url + url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.statusText)
            }
        }) 
    }
    this.post = (url,body,headers = new Headers()) => {
        headers.append('csrf-token',window.csrfToken)
        return fetch(window.base_url + url,{
            method:'POST',
            body:body,
            headers:headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.statusText)
            }
        }) 
    }
    
}