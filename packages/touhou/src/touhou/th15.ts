import { defineEmitterAsset, playerAsset, generateTouhouPlugin } from '../utils'

export default generateTouhouPlugin({
  hakurei_reimu: playerAsset,
  kochiya_sanae: playerAsset,
  kirisame_marisa: playerAsset,
  reisen_udongein_inaba: playerAsset,
  doremy_sweet: defineEmitterAsset(64, 96, {
    static: [0, 0, 4],
    leftward: [0, 192, 6],
    rightward: [0, 96, 6],
    spell: [0, 288, 6],
  }),
})
