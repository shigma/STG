import { defineEmitterAsset, playerAsset, generateTouhouPlugin } from '../utils'

export default generateTouhouPlugin({
  hakurei_reimu: playerAsset,
  kochiya_sanae: playerAsset,
  kirisame_marisa: playerAsset,
  tatara_kogasa: {
    ...defineEmitterAsset(64, 96, {
      static: [0, 0, 4],
      leftward: [0, 0, 4],
      rightward: [0, 96, 4],
    }),
    ...defineEmitterAsset(96, 96, {
      spell: [0, 192, 2, 2, 2],
    }),
  },
})
