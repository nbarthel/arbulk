import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "body": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": 12,
        "verticalAlign": "baseline",
        "fontWeight": "300",
        "height": "100%",
        "background": "#fff",
        "color": "#000",
        "fontFamily": "Arial, Helvetica, sans-serif"
    },
    "div": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "span": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "applet": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "object": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "iframe": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "h1": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "h2": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "h3": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline",
        "fontWeight": "600"
    },
    "h4": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "h5": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "h6": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "blockquote": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "pre": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "a": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "abbr": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "acronym": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "address": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "big": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "cite": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "code": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "del": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "dfn": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "em": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "img": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "ins": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "kbd": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "q": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "s": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "samp": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "small": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "strike": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "strong": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "sub": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "sup": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "tt": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "var": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "b": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "u": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "i": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "center": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "dl": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "dt": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "dd": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "ol": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "ul": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "li": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "fieldset": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "form": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "label": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "legend": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "table": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "caption": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "tbody": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "tfoot": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "thead": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "tr": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "th": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "td": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "article": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "aside": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "canvas": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "details": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "embed": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "figure": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "figcaption": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "footer": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "header": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "hgroup": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "menu": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "nav": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "output": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "ruby": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "section": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "summary": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "time": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "mark": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "audio": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "video": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "border": 0,
        "font": "inherit",
        "fontSize": "100%",
        "verticalAlign": "baseline"
    },
    "warpper-inner": {
        "maxWidth": "8.27in",
        "maxHeight": "11.69in",
        "background": "#fff",
        "paddingTop": 30,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "content-inside": {
        "paddingBottom": 50,
        "position": "relative",
        "zIndex": 1
    },
    "logo": {
        "display": "inline-black",
        "width": "100%",
        "paddingBottom": 75
    },
    "logo img": {
        "width": "30%",
        "textAlign": "left",
        "float": "left"
    },
    "logo text": {
        "width": "70%",
        "textAlign": "right",
        "fontSize": 24,
        "textTransform": "uppercase",
        "fontWeight": "600",
        "float": "right",
        "paddingTop": 10
    },
    "packaging_details": {
        "width": "100%",
        "clear": "both"
    },
    "packaging_details packaging_data": {
        "width": "60%",
        "paddingBottom": 50
    },
    "packaging_details packaging_data table": {
        "border": "1px solid #000",
        "borderCollapse": "collapse"
    },
    "packaging_details packaging_data table td": {
        "paddingTop": 6,
        "paddingRight": 15,
        "paddingBottom": 6,
        "paddingLeft": 15,
        "fontSize": 14,
        "whiteSpace": "nowrap",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "verticalAlign": "middle",
        "border": "1px solid #000"
    },
    "bg_striped tr:nth-child(odd)": {
        "backgroundColor": "#ccc",
        "border": "1px solid #000"
    },
    "bg_striped td:nth-child(odd)": {
        "textAlign": "right",
        "borderRight": "1px solid #000"
    },
    "bg_striped td:nth-child(even)": {
        "fontWeight": "600"
    },
    "label_confirmation": {
        "borderTop": "1px solid #000",
        "width": "100%",
        "clear": "both",
        "paddingBottom": 50
    },
    "label_confirmation  p": {
        "textDecoration": "underline",
        "marginTop": 20,
        "marginLeft": 20
    },
    "label_confirmation info": {
        "border": "1px solid #000",
        "paddingTop": 7,
        "paddingRight": 7,
        "paddingBottom": 7,
        "paddingLeft": 7,
        "width": 130,
        "marginTop": 20,
        "marginLeft": 20
    },
    "label_confirmation info span": {
        "display": "block"
    },
    "inventry": {
        "borderTop": "1px solid #000",
        "width": "100%",
        "clear": "both",
        "height": 150
    },
    "inventry inventry_data": {
        "width": "100%",
        "display": "inline-black"
    },
    "inventry info": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "width": "27%",
        "float": "right",
        "border": "1px solid #000"
    },
    "inventry info span": {
        "display": "block",
        "marginBottom": 15
    },
    "inventry table": {
        "width": "71%",
        "float": "left"
    },
    "inventry table tr": {
        "lineHeight": 35
    },
    "inventry table tr tdtotal": {
        "textAlign": "right",
        "paddingRight": 92
    },
    "location": {
        "borderTop": "1px solid #000",
        "width": "100%",
        "clear": "both",
        "paddingBottom": 50
    },
    "location location_data": {
        "width": "100%",
        "display": "inline-black"
    },
    "location table": {
        "width": "100%"
    },
    "location table tr": {
        "lineHeight": 35
    },
    "location table tr td": {
        "textAlign": "center"
    },
    "location table tr td:first-child": {
        "textAlign": "left"
    },
    "location table tr td:last-child": {
        "textAlign": "right"
    },
    "qtyVerification": {
        "borderTop": "1px solid #000",
        "width": "100%",
        "clear": "both"
    },
    "qtyVerification table": {
        "width": "70%"
    },
    "qtyVerification table tr": {
        "lineHeight": 35
    },
    "qtyVerification table tr td": {
        "textAlign": "center"
    },
    "qtyVerification table tr td:first-child": {
        "textAlign": "left"
    },
    "qtyVerification table tr td:last-child": {
        "textAlign": "right"
    },
    "create_btn": {
        "float": "right",
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "width": 188,
        "marginTop": 135,
        "marginBottom": 50
    },
    "create_btn1": {
        "float": "left",
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "width": 188,
        "marginTop": 10,
        "marginBottom": 50
    },
    "logo_icon": {
        "background": "url(\"../../../public1/img/logo_inner.png\")",
        "backgroundRepeat": "no-repeat",
        "height": 30,
        "width": 150
    }
});