import { defineEmitterAsset, playerAsset, generateTouhouPlugin } from '../utils'

export default generateTouhouPlugin({
  hakurei_reimu: playerAsset,
  kochiya_sanae: playerAsset,
  kirisame_marisa: playerAsset,
  nazrin: defineEmitterAsset(64, 96, {
    static: [0, 0, 4],
    leftward: [0, 0, 4],
    rightward: [0, 96, 4],
    spell: [0, 192, 4],
  }),
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
  kumoi_ichirin: defineEmitterAsset(64, 96, {
    static: [0, 0, 4],
    leftward: [0, 192, 4],
    rightward: [0, 96, 4],
  }),
  murasa_minamitsu: {
    ...defineEmitterAsset(64, 96, {
      static: [0, 0, 4],
      leftward: [0, 0, 4],
      rightward: [0, 96, 4],
      static_ghost: [256, 0, 4],
      leftward_ghost: [256, 96, 4],
      rightward_ghost: [256, 0, 4],
    }),
    ...defineEmitterAsset(96, 96, {
      spell: [0, 192, 3, 3],
      spell_ghost: [256, 192, 3, 3],
    }),
  },
  toramaru_shou: {
    ...defineEmitterAsset(64, 96, {
      static: [0, 0, 4],
      leftward: [0, 96, 4],
      rightward: [0, 0, 4],
    }),
    spell: {
      data: [
        [0, 192, 64, 288],
        [64, 192, 128, 288],
        [128, 192, 192, 288],
        [192, 192, 256, 288],
        [0, 288, 64, 384],
        [64, 288, 160, 384],
        [160, 288, 256, 384],
      ],
    },
  },
  hiziri_byakuren: defineEmitterAsset(96, 128, {
    static: [0, 0, 4],
    leftward: [0, 256, 4],
    rightward: [0, 128, 4],
    spell: [0, 384, 4],
  }),
  houjuu_nue: defineEmitterAsset(96, 112, {
    static: [0, 0, 4],
    leftward: [0, 224, 4],
    rightward: [0, 112, 4],
    spell: [0, 336, 5],
  })
})
