import translate, { DeeplLanguages } from 'deepl'

export async function translateMessage (message: string, locale: DeeplLanguages) {
  let translatedMsg = ''
  try {
    const response = await translate({
      free_api: true,
      text: message,
      target_lang: locale,
      auth_key: 'efa6565f-2802-a36b-8ea7-6040e7633684:fx'
    })

    response.data.translations.forEach(el => {
      translatedMsg += el.text
      translatedMsg += ' '
    })
  } catch (err) {
    translatedMsg = 'Could not translate'
  }

  return translatedMsg
}
