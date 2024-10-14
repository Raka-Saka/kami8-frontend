import { useCallback } from 'react'

const translations = {
  en: {
    send: 'Send',
    typeMessage: 'Type a message...',
    participants: 'Participants',
  },
  fr: {
    send: 'Envoyer',
    typeMessage: 'Tapez un message...',
    participants: 'Participants',
  },
  ja: {
    send: '送信',
    typeMessage: 'メッセージを入力...',
    participants: '参加者',
  },
  es: {
    send: 'Enviar',
    typeMessage: 'Escribe un mensaje...',
    participants: 'Participantes',
  },
  vi: {
    send: 'Gửi',
    typeMessage: 'Nhập tin nhắn...',
    participants: 'Người tham gia',
  },
}

export function useTranslation(language: string) {
  const t = useCallback((key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof (typeof translations)['en']] || key
  }, [language])

  return { t }
}
