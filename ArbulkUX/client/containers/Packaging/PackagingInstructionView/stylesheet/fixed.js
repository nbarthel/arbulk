import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "fixed-table header-fixed": {
        "position": "absolute",
        "top": 0,
        "zIndex": 1020,
        "borderBottom": "2px solid #d5d5d5",
        "WebkitBorderRadius": 0,
        "MozBorderRadius": 0,
        "borderRadius": 0
    },
    "fixed-table": {
        "display": "block",
        "position": "relative"
    },
    "fixed-table th": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 18,
        "textAlign": "left"
    },
    "fixed-table table-content": {
        "display": "block",
        "position": "relative",
        "height": 500,
        "overflowY": "auto"
    },
    "fixed-table header-copy": {
        "position": "absolute",
        "top": 0,
        "left": 0
    },
    "fixed-table header-copy th": {
        "backgroundColor": "#fff"
    }
});