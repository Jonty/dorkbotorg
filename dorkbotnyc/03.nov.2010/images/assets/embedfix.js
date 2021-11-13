document.write("<NOSCRIPT class=fix>")

window.onload = function() {
  elems=document.getElementsByTagName("noscript");
  for(i=elems.length-1;elem=elems[i];i--) {
    if(elem.className=="fix")
      elem.outerHTML = elem.innerHTML
  }
}