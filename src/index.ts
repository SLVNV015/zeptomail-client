/**
 * TypeScript-клиент для ZeptoMail API с использованием встроенного fetch.
 * Требует Node.js 18+.
 */

import { ZeptoMailParams, ZeptoMailResponse } from "./types";

export class ZeptoMailClient {
  private apiKey: string;
  private baseUrl = "https://api.zeptomail.com/v1.1/email";

  constructor(apiKey: string) {
    this.apiKey = apiKey.startsWith("Zoho-enczapikey")
      ? apiKey
      : `Zoho-enczapikey ${apiKey}`;
  }

  async sendEmail(params: ZeptoMailParams): Promise<ZeptoMailResponse> {
    const {
      from,
      to,
      subject,
      htmlBody,
      textBody,
      templateKey,
      mergeInfo,
      attachments,
      timeoutMs = 10000,
    } = params;

    const payload: Record<string, any> = {
      from,
      to: to.map((t) => ({ email_address: t })),
      subject,
    };

    if (htmlBody) payload.htmlbody = htmlBody;
    if (textBody) payload.textbody = textBody;
    if (templateKey) {
      payload.template_key = templateKey;
      payload.merge_info = mergeInfo || {};
    }
    if (attachments?.length) {
      payload.attachments = attachments;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let res: Response;
    try {
      res = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`ZeptoMail request timed out after ${timeoutMs}ms`);
      }
      throw new Error(`Network error: ${err.message}`);
    } finally {
      clearTimeout(timeout);
    }

    const data = await res.json();

    if (!res.ok) {
      const errorMessage = data.message || JSON.stringify(data);
      throw new Error(`ZeptoMail Error ${res.status}: ${errorMessage}`);
    }

    return data as ZeptoMailResponse;
  }
}

