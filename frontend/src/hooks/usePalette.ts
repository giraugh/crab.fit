import { useMemo } from 'react'
import { color } from 'chroma.ts'
import { createPalette } from 'hue-map'

import { useStore } from '/src/stores'
import useSettingsStore from '/src/stores/settingsStore'

export const usePalette = (steps: number) => {
  const colormap = useStore(useSettingsStore, state => state.colormap)

  return useMemo(() =>
    createPalette({
      map: (colormap === undefined || colormap === 'crabfit') ? [[0, [247, 158, 0, 0]], [1, [247, 158, 0, 255]]] : colormap,
      steps,
    })
      .format('rgba')
      .map(([r, g, b, a]) => color(r, g, b, a / 255))
      .map(c => ({
        string: c.hex('rgba'),
        highlight: c.luminance() > .5 ? c.darker().hex('rgba') : c.brighter().hex('rgba'),
      })),
  [steps, colormap])
}
