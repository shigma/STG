import distant from './emitters/distant'
import timing from './emitters/timing'
import viewport from './emitters/viewport'

import ortho from './emitters/ortho'
import square from './emitters/square'
import tangent from './emitters/tangent'

import flamingJade from './shapes/flaming-jade'
import largeJade from './shapes/large-jade'
import mediumJade from './shapes/medium-jade'
import smallJade from './shapes/small-jade'

export default {
  Fields: { distant, timing, viewport },
  Judges: { ortho, square, tangent },
  Templates: {
    'flaming-jade': flamingJade,
    'large-jade': largeJade,
    'medium-jade': mediumJade,
    'small-jade': smallJade,
  } as Record<string, any>,
}
