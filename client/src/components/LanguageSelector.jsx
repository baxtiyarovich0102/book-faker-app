import React from 'react'

const LanguageSelector = ({ selected, setSelected }) => {
  const options = [
    { code: 'uz-UZ', label: '🇺🇿 Uzbek (Uzbekistan)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'de-DE', label: '🇩🇪 German (Germany)' },
  ]

  return (
    <div className="p-4">
      <label htmlFor="language" className="block mb-2 text-lg font-semibold">Select Language & Region:</label>
      <select
        id="language"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full"
      >
        {options.map(opt => (
          <option key={opt.code} value={opt.code}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
