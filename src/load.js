export default function() {
    let url = window.location.href.split('/');
    let hash = url[url.length-1];
    if(hash[0] ==="#"){
        return hash.replace(/#/g, "");
    }else{
        return false;
    }
}
