import { defineEmitterAsset, playerAsset, generateTouhouPlugin } from '../utils'

export default generateTouhouPlugin({
  hakurei_reimu: playerAsset,
  kirisame_marisa: playerAsset,
  reiuji_utsuho: defineEmitterAsset(96, 96, {
    static: [0, 0, 4],
    leftward: [0, 192, 3],
    rightward: [0, 96, 3],
    spell: [0, 288, 4],
  }),
})
