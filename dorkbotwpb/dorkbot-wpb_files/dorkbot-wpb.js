var MINIMUM_FONT = "10";
var UNITS = "";

function elementFontSize(element)
{
    var fontSize = MINIMUM_FONT; 

    if (document.defaultView)
    {
        fontSize = document.defaultView.getComputedStyle(element, null).getPropertyValue("font-size");
    }
    else if (element.currentStyle)
    {
        fontSize = element.currentStyle.fontSize;
    }

    if ((UNITS.length == 0) && (fontSize != MINIMUM_FONT))
    {
        UNITS = fontSize.substring(fontSize.length - 2, fontSize.length)
    }

    return parseFloat(fontSize);
}

function adjustFontSizeIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var oCachedHeight;
                if (windowsInternetExplorer)
                {
                    oCachedHeight = oTextBoxInnerDiv.style.height;
                    oTextBoxInnerDiv.style.height = "100px";
                }
                
                var clientHeight = oTextBoxInnerDiv.clientHeight;
                var specifiedHeight = clientHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if ((windowsInternetExplorer) && (clientHeight == 100))
                {
                    clientHeight = specifiedHeight;
                }
                if (clientHeight > specifiedHeight)
                {
                    // compute smallest font in text box for scale purposes.
                    var smallestFontSize = 200;
                    
                    var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                    var oneLine = false;
                    for (i = 0; i < aParaChildren.length; i++)
                    {
                        var oParagraphDiv = aParaChildren[i];
                        var lineHeight = elementLineHeight(oParagraphDiv);
                        oneLine = oneLine || (lineHeight * 1.5 >= specifiedHeight);
                        if (oParagraphDiv.nodeName == "DIV")
                        {
                            var fontSize = elementFontSize(oParagraphDiv);
                            smallestFontSize = Math.min( smallestFontSize, fontSize );
                            for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                            {
                                var oSpan = oParagraphDiv.childNodes[j];
                                if (oSpan.nodeName == "SPAN")
                                {
                                    fontSize = elementFontSize(oSpan);
                                    smallestFontSize = Math.min( smallestFontSize, fontSize );
                                }
                            }
                        }
                    }
                    var minimum = parseFloat(MINIMUM_FONT);
                    
                    var count = 0
                    while ((smallestFontSize > minimum) && (clientHeight > specifiedHeight) && (count < 10))
                    {
                        ++ count;
                        if (oneLine)
                        {
                            var oldWidth = parseInt(oTextBoxOuterDiv.style.width);
                            oTextBoxInnerDiv.style.width =
                                "" + oldWidth * Math.pow(1.05, count) + "px";
                        }
                        else
                        {
                            var scale = Math.max(0.95, minimum / smallestFontSize);
                            
                            // Scale all the fonts in the text box.
                            for (i = 0; i < aParaChildren.length; i++)
                            {
                                var oParagraphDiv = aParaChildren[i];
                                if (oParagraphDiv.nodeName == "DIV")
                                {
                                    var fontSize = elementFontSize(oParagraphDiv) * scale;
                                    oParagraphDiv.style.fontSize = fontSize + UNITS;
                                    oParagraphDiv.style.lineHeight = fontSize + UNITS;
                                    smallestFontSize = Math.min( smallestFontSize, fontSize );
                                    for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                    {
                                        var oSpan = oParagraphDiv.childNodes[j];
                                        if (oSpan.nodeName == "SPAN")
                                        {
                                            fontSize = elementFontSize(oSpan) * scale;
                                            oSpan.style.fontSize = fontSize + UNITS;
                                            oSpan.style.lineHeight = fontSize + UNITS;
                                            smallestFontSize = Math.min( smallestFontSize, fontSize );
                                        }
                                    }
                                }
                            }
                        }
                        
                        clientHeight = oTextBoxInnerDiv.clientHeight;
                    }
                }
                if (windowsInternetExplorer)
                {
                    oTextBoxInnerDiv.style.height = oCachedHeight;
                }
            }
        }
    }
}


function elementLineHeight(element)
{
    var lineHeight = MINIMUM_FONT; 
    
    if (document.defaultView)
    {
        lineHeight = document.defaultView.getComputedStyle(element, null).getPropertyValue("line-height");
    }
    else if (element.currentStyle)
    {
        lineHeight = element.currentStyle.lineHeight;
    }
    
    if ((UNITS.length == 0) && (lineHeight != MINIMUM_FONT))
    {
        UNITS = lineHeight.substring(lineHeight.length - 2, lineHeight.length)
    }
    
    return parseFloat(lineHeight);
}

function adjustLineHeightIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var oCachedHeight;
                if (windowsInternetExplorer)
                {
                    oCachedHeight = oTextBoxInnerDiv.style.height;
                    oTextBoxInnerDiv.style.height = "100px";
                }
                
                var clientHeight = oTextBoxInnerDiv.clientHeight;
                var specifiedHeight = clientHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if ((windowsInternetExplorer) && (clientHeight == 100))
                {
                    clientHeight = specifiedHeight;
                }
                if (clientHeight > specifiedHeight)
                {
                    var adjusted = true;
                    var count = 0;
                    while ((adjusted) && (clientHeight > specifiedHeight) && (count < 10))
                    {
                        adjusted = false;
                        ++ count;
                        
                        // Scale all the line heights in the text box.
                        var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                        for (i = 0; i < aParaChildren.length; i++)
                        {
                            var oParagraphDiv = aParaChildren[i];
                            if (oParagraphDiv.nodeName == "DIV")
                            {
                                var fontSize = elementFontSize(oParagraphDiv);
                                var lineHeight = elementLineHeight(oParagraphDiv) * 0.95;
                                if (lineHeight >= (fontSize * 1.1))
                                {
                                    oParagraphDiv.style.lineHeight = lineHeight + UNITS;
                                    adjusted = true;
                                }
                                
                                
                                
                                for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                {
                                    var oSpan = oParagraphDiv.childNodes[j];
                                    if (oSpan.nodeName == "SPAN")
                                    {
                                        var fontSize = elementFontSize(oSpan);
                                        var lineHeight = elementLineHeight(oSpan) * 0.95;
                                        if (lineHeight >= (fontSize * 1.1))
                                        {
                                            oSpan.style.lineHeight = lineHeight + UNITS;
                                            var adjusted = true;
                                        }
                                    }
                                }
                            }
                        }
                        
                        clientHeight = oTextBoxInnerDiv.clientHeight;
                    }
                }
                if (windowsInternetExplorer)
                {
                    oTextBoxInnerDiv.style.height = oCachedHeight;
                }
            }
        }
    }
}

var smallTransparentGif = "";
function fixupIEPNG(strImageID, transparentGif) 
{
    smallTransparentGif = transparentGif;
    if (windowsInternetExplorer)
    {
        var img = document.getElementById(strImageID);
        if (img)
        {
            var src = img.src;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
            img.src = transparentGif;
            img.attachEvent("onpropertychange", imgPropertyChanged);
        }
    }
}

function fixupIEPNGBG(strImageID) 
{
    if (windowsInternetExplorer)
    {
        var oBlock = document.getElementById(strImageID);
        if (oBlock)
        {
            var currentBGStyle = oBlock.style.background;
            var urlStart = currentBGStyle.indexOf("url(");
            var urlEnd = currentBGStyle.indexOf(")", urlStart);
            var imageURL = currentBGStyle.substring(urlStart + 4, urlEnd);
            var filterStyle =
                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                imageURL +
                "', sizingMethod='crop');";

            oBlock.style.filter = filterStyle;
            oBlock.style.background = "";
        }
    }
}

function getChildOfType(oParent, sNodeName, requestedIndex)
{
    var index = 0;
    for (i = 0; i < oParent.childNodes.length; i++)
    {
        if (oParent.childNodes[i].nodeName == sNodeName)
        {
            if (index == requestedIndex)
            {
                return oParent.childNodes[i];
            }
            else
            {
                index++;
            }
        }
    }
    return null;
}

function getParaDescendantsRec(oAncestor, aResultArray, index)
{
    if (index == -1)
    {
        if ((oAncestor.nodeName == "DIV") &&
            (oAncestor.className.lastIndexOf("paragraph") != -1))
        {
            aResultArray[aResultArray.length] = oAncestor;
        }
        else if ((oAncestor.nodeName == "DIV") ||
                 (oAncestor.nodeName == "LI") ||
                 (oAncestor.nodeName == "OL") ||
                 (oAncestor.nodeName == "UL"))
        {
            getParaDescendantsRec(oAncestor, aResultArray, 0);
        }
    }
    else
    {
        getParaDescendantsRec(oAncestor.childNodes[index], aResultArray, -1);
        if (index < (oAncestor.childNodes.length - 1))
        {
            getParaDescendantsRec(oAncestor, aResultArray, index + 1);
        }
    }
}

function getParaDescendants(oAncestor)
{
    var aResultArray = new Array();
    getParaDescendantsRec(oAncestor, aResultArray, -1);

    return aResultArray;
}

function NBmouseover(index)
{
    var normal = document.getElementById("navbar_"+index+"_normal");
    var rollover = document.getElementById("navbar_"+index+"_rollover");
    if (normal && rollover)
    {
        normal.style.visibility = "hidden";
        rollover.style.visibility = "visible";
    }
    return true;
}

function NBmouseout(index)
{
    var normal = document.getElementById("navbar_"+index+"_normal");
    var rollover = document.getElementById("navbar_"+index+"_rollover");
    if (normal && rollover)
    {
        normal.style.visibility = "visible";
        rollover.style.visibility = "hidden";
    }
    return true;
}

var windowsInternetExplorer = false;
function detectBrowser()
{
    windowsInternetExplorer = false;
    var appVersion = navigator.appVersion;
    if ((appVersion.indexOf("MSIE") != -1) &&
        (appVersion.indexOf("Macintosh") == -1))
    {
        windowsInternetExplorer = true;
    }
}

var inImgPropertyChanged = false;
function imgPropertyChanged()
{
    if ((window.event.propertyName == "src") && (! inImgPropertyChanged))
    {
        inImgPropertyChanged = true;
        var el = window.event.srcElement;
        if (el.src != smallTransparentGif)
        {
            el.filters.item(0).src = el.src;
            el.src = smallTransparentGif;
        }
        inImgPropertyChanged = false;
    }
}

function onPageLoad()
{
    detectBrowser();
    fixupIEPNGBG("id1");
    fixupIEPNGBG("id2");
    fixupIEPNGBG("id3");
    fixupIEPNGBG("id4");
    fixupIEPNGBG("id5");
    fixupIEPNGBG("navbar_0_normal");
    fixupIEPNGBG("navbar_0_rollover");
    fixupIEPNGBG("navbar_1_normal");
    fixupIEPNGBG("navbar_1_rollover");
    fixupIEPNGBG("navbar_2_normal");
    fixupIEPNGBG("navbar_2_rollover");
    fixupIEPNGBG("navbar_3_normal");
    fixupIEPNGBG("navbar_3_rollover");
    fixupIEPNG("id6", "dorkbot-wpb_files/transparent.gif");
    fixupIEPNG("id7", "dorkbot-wpb_files/transparent.gif");
    adjustLineHeightIfTooBig("id8");
    adjustFontSizeIfTooBig("id8");
    fixupIEPNG("id9", "dorkbot-wpb_files/transparent.gif");
    fixupIEPNG("id10", "dorkbot-wpb_files/transparent.gif");
    adjustLineHeightIfTooBig("id11");
    adjustFontSizeIfTooBig("id11");
    adjustLineHeightIfTooBig("id12");
    adjustFontSizeIfTooBig("id12");
    fixupIEPNG("id13", "dorkbot-wpb_files/transparent.gif");
    fixupIEPNG("id14", "dorkbot-wpb_files/transparent.gif");
    fixupIEPNG("id15", "dorkbot-wpb_files/transparent.gif");
    adjustLineHeightIfTooBig("id16");
    adjustFontSizeIfTooBig("id16");
    fixupIEPNG("id17", "dorkbot-wpb_files/transparent.gif");
    fixupIEPNGBG("id18");
    adjustLineHeightIfTooBig("id18");
    adjustFontSizeIfTooBig("id18");
    adjustLineHeightIfTooBig("id19");
    adjustFontSizeIfTooBig("id19");
    fixupIEPNG("id20", "dorkbot-wpb_files/transparent.gif");
    adjustLineHeightIfTooBig("id21");
    adjustFontSizeIfTooBig("id21");
    adjustLineHeightIfTooBig("id22");
    adjustFontSizeIfTooBig("id22");
    return true;
}

