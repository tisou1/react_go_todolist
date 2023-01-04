import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({

  shortcuts: [
    ['input', 'h-36px grow text-gray pa-2 rounded-1 border-2 border-indigo-500/75 outline-none placeholder:text-slate-400'],
    ['btn', 'px-4 py-1 rounded border-none inline-block bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      // prefix: 's-',//图表前缀
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block'
      }
    }),
  ],
})
