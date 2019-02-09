function to256(scale: number): number {
  scale *= 256
  return scale > 255 ? 255 : scale < 0 ? 0 : Math.floor(scale)
}

export default class Color {
  static scheme4 = ['red', 'blue', 'green', 'yellow']
  static scheme8 = ['black', 'red', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'gray']
  static scheme16 = [
    'black', 'maroon', 'red', 'purple', 'magenta', 'darkblue', 'blue', 'darkcyan',
    'cyan', 'darkgreen', 'green', 'yellowgreen', 'darkyellow', 'yellow', 'orange', 'gray',
  ]

  static fallback = {
    maroon: 'red',
    purple: 'magenta',
    darkblue: 'blue',
    darkcyan: 'cyan',
    darkgreen: 'green',
    yellowgreen: 'green',
    darkyellow: 'yellow',
    orange: 'yellow',
  } as Record<string, string>

  /** built-in CSS colors */
  static builtin: Record<string, Color> = {
    transparent: new Color(0, 0, 0, 0),
    aliceblue: Color.hex('#f0f8ff'),
    antiquewhite: Color.hex('#faebd7'),
    aqua: Color.hex('#00ffff'),
    aquamarine: Color.hex('#7fffd4'),
    azure: Color.hex('#f0ffff'),
    beige: Color.hex('#f5f5dc'),
    bisque: Color.hex('#ffe4c4'),
    black: Color.hex('#000000'),
    blanchedalmond: Color.hex('#ffebcd'),
    blue: Color.hex('#0000ff'),
    blueviolet: Color.hex('#8a2be2'),
    brown: Color.hex('#a52a2a'),
    burlywood: Color.hex('#deb887'),
    cadetblue: Color.hex('#5f9ea0'),
    chartreuse: Color.hex('#7fff00'),
    chocolate: Color.hex('#d2691e'),
    coral: Color.hex('#ff7f50'),
    cornflowerblue: Color.hex('#6495ed'),
    cornsilk: Color.hex('#fff8dc'),
    crimson: Color.hex('#dc143c'),
    cyan: Color.hex('#00ffff'),
    darkblue: Color.hex('#00008b'),
    darkcyan: Color.hex('#008b8b'),
    darkgoldenrod: Color.hex('#b8860b'),
    darkgray: Color.hex('#a9a9a9'),
    darkgreen: Color.hex('#006400'),
    darkkhaki: Color.hex('#bdb76b'),
    darkmagenta: Color.hex('#8b008b'),
    darkolivegreen: Color.hex('#556b2f'),
    darkorange: Color.hex('#ff8c00'),
    darkorchid: Color.hex('#9932cc'),
    darkred: Color.hex('#8b0000'),
    darksalmon: Color.hex('#e9967a'),
    darkseagreen: Color.hex('#8fbc8f'),
    darkslateblue: Color.hex('#483d8b'),
    darkslategray: Color.hex('#2f4f4f'),
    darkturquoise: Color.hex('#00ced1'),
    darkviolet: Color.hex('#9400d3'),
    deeppink: Color.hex('#ff1493'),
    deepskyblue: Color.hex('#00bfff'),
    dimgray: Color.hex('#696969'),
    dodgerblue: Color.hex('#1e90ff'),
    feldspar: Color.hex('#d19275'),
    firebrick: Color.hex('#b22222'),
    floralwhite: Color.hex('#fffaf0'),
    forestgreen: Color.hex('#228b22'),
    fuchsia: Color.hex('#ff00ff'),
    gainsboro: Color.hex('#dcdcdc'),
    ghostwhite: Color.hex('#f8f8ff'),
    gold: Color.hex('#ffd700'),
    goldenrod: Color.hex('#daa520'),
    gray: Color.hex('#808080'),
    green: Color.hex('#008000'),
    greenyellow: Color.hex('#adff2f'),
    honeydew: Color.hex('#f0fff0'),
    hotpink: Color.hex('#ff69b4'),
    indianred: Color.hex('#cd5c5c'),
    indigo: Color.hex('#4b0082'),
    ivory: Color.hex('#fffff0'),
    khaki: Color.hex('#f0e68c'),
    lavender: Color.hex('#e6e6fa'),
    lavenderblush: Color.hex('#fff0f5'),
    lawngreen: Color.hex('#7cfc00'),
    lemonchiffon: Color.hex('#fffacd'),
    lightblue: Color.hex('#add8e6'),
    lightcoral: Color.hex('#f08080'),
    lightcyan: Color.hex('#e0ffff'),
    lightgoldenrodyellow: Color.hex('#fafad2'),
    lightgrey: Color.hex('#d3d3d3'),
    lightgreen: Color.hex('#90ee90'),
    lightpink: Color.hex('#ffb6c1'),
    lightsalmon: Color.hex('#ffa07a'),
    lightseagreen: Color.hex('#20b2aa'),
    lightskyblue: Color.hex('#87cefa'),
    lightslateblue: Color.hex('#8470ff'),
    lightslategray: Color.hex('#778899'),
    lightsteelblue: Color.hex('#b0c4de'),
    lightyellow: Color.hex('#ffffe0'),
    lime: Color.hex('#00ff00'),
    limegreen: Color.hex('#32cd32'),
    linen: Color.hex('#faf0e6'),
    magenta: Color.hex('#ff00ff'),
    maroon: Color.hex('#800000'),
    mediumaquamarine: Color.hex('#66cdaa'),
    mediumblue: Color.hex('#0000cd'),
    mediumorchid: Color.hex('#ba55d3'),
    mediumpurple: Color.hex('#9370d8'),
    mediumseagreen: Color.hex('#3cb371'),
    mediumslateblue: Color.hex('#7b68ee'),
    mediumspringgreen: Color.hex('#00fa9a'),
    mediumturquoise: Color.hex('#48d1cc'),
    mediumvioletred: Color.hex('#c71585'),
    midnightblue: Color.hex('#191970'),
    mintcream: Color.hex('#f5fffa'),
    mistyrose: Color.hex('#ffe4e1'),
    moccasin: Color.hex('#ffe4b5'),
    navajowhite: Color.hex('#ffdead'),
    navy: Color.hex('#000080'),
    oldlace: Color.hex('#fdf5e6'),
    olive: Color.hex('#808000'),
    olivedrab: Color.hex('#6b8e23'),
    orange: Color.hex('#ffa500'),
    orangered: Color.hex('#ff4500'),
    orchid: Color.hex('#da70d6'),
    palegoldenrod: Color.hex('#eee8aa'),
    palegreen: Color.hex('#98fb98'),
    paleturquoise: Color.hex('#afeeee'),
    palevioletred: Color.hex('#d87093'),
    papayawhip: Color.hex('#ffefd5'),
    peachpuff: Color.hex('#ffdab9'),
    peru: Color.hex('#cd853f'),
    pink: Color.hex('#ffc0cb'),
    plum: Color.hex('#dda0dd'),
    powderblue: Color.hex('#b0e0e6'),
    purple: Color.hex('#800080'),
    red: Color.hex('#ff0000'),
    rosybrown: Color.hex('#bc8f8f'),
    royalblue: Color.hex('#4169e1'),
    saddlebrown: Color.hex('#8b4513'),
    salmon: Color.hex('#fa8072'),
    sandybrown: Color.hex('#f4a460'),
    seagreen: Color.hex('#2e8b57'),
    seashell: Color.hex('#fff5ee'),
    sienna: Color.hex('#a0522d'),
    silver: Color.hex('#c0c0c0'),
    skyblue: Color.hex('#87ceeb'),
    slateblue: Color.hex('#6a5acd'),
    slategray: Color.hex('#708090'),
    snow: Color.hex('#fffafa'),
    springgreen: Color.hex('#00ff7f'),
    steelblue: Color.hex('#4682b4'),
    tan: Color.hex('#d2b48c'),
    teal: Color.hex('#008080'),
    thistle: Color.hex('#d8bfd8'),
    tomato: Color.hex('#ff6347'),
    turquoise: Color.hex('#40e0d0'),
    violet: Color.hex('#ee82ee'),
    violetred: Color.hex('#d02090'),
    wheat: Color.hex('#f5deb3'),
    white: Color.hex('#ffffff'),
    whitesmoke: Color.hex('#f5f5f5'),
    yellow: Color.hex('#ffff00'),
    yellowgreen: Color.hex('#9acd32'),
  }

  /** red */
  public r: number
  /** green */
  public g: number
  /** blue */
  public b: number
  /** alpha */
  public a: number

  constructor(r: number, g: number, b: number, a?: number) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a === undefined ? 1 : a
  }

  /** blend with another color */
  blend(color: Color, prop: number = 0.5): Color {
    return new Color(
      this.r * (1 - prop) + color.r * prop,
      this.g * (1 - prop) + color.g * prop,
      this.b * (1 - prop) + color.b * prop,
      this.a * (1 - prop) + color.a * prop,
    )
  }

  /** make the color darker */
  darker(scale: number = 0.5): Color {
    return new Color(
      this.r * (1 - scale),
      this.g * (1 - scale),
      this.b * (1 - scale),
      this.a,
    )
  }

  /** make the color lighter */
  lighter(scale: number = 0.5): Color {
    return new Color(
      1 - (1 - this.r) * (1 - scale),
      1 - (1 - this.g) * (1 - scale),
      1 - (1 - this.b) * (1 - scale),
      this.a,
    )
  }

  /** inverse the color */
  inverse(): Color {
    return new Color(
      1 - this.r,
      1 - this.g,
      1 - this.b,
      this.a,
    )
  }

  /** change alpha */
  alpha(a: number): Color {
    return new Color(this.r, this.g, this.b, a)
  }

  /** make the color more opaque */
  opacify(scale: number): Color {
    return new Color(this.r, this.g, this.b, 1 - (1 - this.a) * (1 - scale))
  }

  /** make the color more transparent */
  transparentize(scale: number): Color {
    return new Color(this.r, this.g, this.b, this.a * (1 - scale))
  }

  /** to css string */
  toString(): string {
    return `rgba(${to256(this.r)},${to256(this.g)},${to256(this.b)},${this.a})`
  }

  /** rgba color */
  static rgba(r: number, g: number, b: number, a: number): Color {
    return new Color(r, g, b, a)
  }

  /** hsla color */
  static hsla(h: number, s: number = 1, l: number = 1, a?: number): Color {
    const tg = (h >= 0 ? h % 2 : h % 2 + 2) / 2
    const tr = tg + 1 / 3 > 1 ? tg - 2 / 3 : tg + 1 / 3
    const tb = tg - 1 / 3 > 0 ? tg - 1 / 3 : tg + 2 / 3
    const q = (l < 0.5) ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const convert = (t: number) => t >= 2 / 3 ? p :
      t >= 1 / 2 ? p + (q - p) * 6 * (2 / 3 - t) :
      t >= 1 / 6 ? q : p + (q - p) * 6 * t
    return new Color(convert(tr), convert(tg), convert(tb), a)
  }

  /** hsva color */
  static hsva(h: number, s: number = 1, v: number = 1, a?: number): Color {
    const k = h * 3
    const f = k - Math.floor(k)
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    switch (Math.floor(k >= 0 ? k % 6 : k % 6 + 6)) {
      case 0: return new Color(v, t, p, a)
      case 1: return new Color(q, v, p, a)
      case 2: return new Color(p, v, t, a)
      case 3: return new Color(p, q, v, a)
      case 4: return new Color(t, p, v, a)
      case 5: return new Color(v, p, q, a)
    }
  }

  /** hex code color */
  static hex(code: string): Color {
    if (code.charAt(0) === '#') code = code.slice(1)
    if (code.length === 3 || code.length === 4) {
      return new Color(
        parseInt(code.charAt(0), 16) / 16,
        parseInt(code.charAt(1), 16) / 16,
        parseInt(code.charAt(2), 16) / 16,
        parseInt(code.charAt(3), 16) / 16,
      )
    } else if (code.length === 6 || code.length === 8) {
      return new Color(
        parseInt(code.slice(0, 2), 16) / 256,
        parseInt(code.slice(2, 4), 16) / 256,
        parseInt(code.slice(4, 6), 16) / 256,
        parseInt(code.slice(6, 8), 16) / 256,
      )
    }
  }

  /** blend colors */
  static blend(color1: Color): Color
  static blend(color1: Color, prop1: number): Color
  static blend(color1: Color, prop1: number, color2: Color): Color
  static blend(color1: Color, prop1: number, color2: Color, prop2: number): Color
  static blend(color1: Color, prop1: number, color2: Color, prop2: number, color3: Color): Color
  static blend(color1: Color, prop1: number, color2: Color, prop2: number, color3: Color, prop3: number): Color
  static blend(...args: [Color, ...any[]]): Color {
    let color = new Color(0, 0, 0), rest = 1
    for (let i = 0; i < args.length; i += 2) {
      const prop = args[i + 1] || rest
      color.r += args[i].r * prop
      color.g += args[i].g * prop
      color.b += args[i].b * prop
      color.a += args[i].a * prop
      rest -= args[i + 1]
    }
    return color
  }
}
