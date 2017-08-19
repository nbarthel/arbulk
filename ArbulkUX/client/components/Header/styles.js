import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header": {
        "width": "100%",
        "height": 50,
        "background": "#ffffff"
    },
    "header contain": {
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0
    },
    "logo": {
        "backgroundImage": "url(\"../../public1/img/logo_inner.png\")",
        "backgroundRepeat": "no-repeat",
        "height": 40,
        "width": "100%"
    },
    "top_nav": {},
    "top_nav li": {
        "borderLeft": "1px solid #f8f8f8",
        "fontFamily": "Raleway-Medium",
        "fontSize": 14,
        "background": "#fff",
        "zIndex": 22
    },
    "dropdown-menu li:hover": {
        "color": "#262626",
        "textDecoration": "none",
        "backgroundColor": "#ccc"
    }
});