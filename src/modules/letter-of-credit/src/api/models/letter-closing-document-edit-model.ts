/* tslint:disable */
/* eslint-disable */
export interface LetterClosingDocumentEditModel {

  /**
   * Дополнительные требования
   */
  additionalRequirements?: null | string;

  /**
   * Наименование документа
   */
  documentTitle: string;

  /**
   * Количество
   */
  documentsCount?: number;

  /**
   * Идентификатор документа
   */
  id?: null | string;

  /**
   * Оригинал/копия
   */
  originalOnly?: boolean;
}
