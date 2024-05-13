// https://observablehq.com/@d3/color-schemes

export const DomainColours = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]

export const getColourByIndex = (idx: number): string => {
    return DomainColours[idx % DomainColours.length]
}

export type RGB = { r: number, g: number, b: number }

export const hexToRgb = (hex: string): RGB | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}