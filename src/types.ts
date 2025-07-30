/**
 * Представляет email-адрес с опциональным отображаемым именем.
 */
export interface EmailAddress {
  /**
   * Email-адрес, например: 'user@example.com'.
   */
  address: string;

  /**
   * Имя отправителя/получателя, отображаемое рядом с адресом.
   * Например: 'Deally Team'.
   */
  name?: string;
}

/**
 * Вложение для отправки с письмом.
 */
export interface Attachment {
  /**
   * Имя файла, отображаемое у получателя.
   */
  name: string;

  /**
   * MIME-тип вложения.
   * Примеры: 'application/pdf', 'image/png', 'text/plain'.
   */
  mime_type: string;

  /**
   * Содержимое файла в base64-кодировке.
   */
  content: string;
}

/**
 * Параметры для отправки письма через ZeptoMail.
 */
export interface ZeptoMailParams {
  /**
   * Адрес отправителя.
   */
  from: EmailAddress;

  /**
   * Список получателей.
   */
  to: EmailAddress[];

  /**
   * Тема письма.
   */
  subject: string;

  /**
   * HTML-версия тела письма.
   * Можно использовать HTML-разметку, вкл. стили, изображения и т.д.
   */
  htmlBody?: string;

  /**
   * Альтернативная текстовая версия письма (для клиентов без HTML).
   */
  textBody?: string;

  /**
   * Ключ шаблона из ZeptoMail (если используется шаблон).
   */
  templateKey?: string;

  /**
   * Объект с данными для подстановки в шаблон.
   * Ключи должны соответствовать переменным в шаблоне ZeptoMail.
   */
  mergeInfo?: Record<string, any>;

  /**
   * Вложения (опционально).
   */
  attachments?: Attachment[];

  /**
   * Таймаут запроса в миллисекундах.
   * По умолчанию: 10000 (10 секунд).
   */
  timeoutMs?: number;
}

/**
 * Ответ от ZeptoMail после успешной отправки письма.
 */
export interface ZeptoMailResponse {
  /**
   * Уникальный идентификатор запроса, который можно использовать для трекинга.
   */
  request_id: string;

  /**
   * Сообщение об успешной отправке (обычно: 'Mail Sent Successfully').
   */
  message: string;
}
