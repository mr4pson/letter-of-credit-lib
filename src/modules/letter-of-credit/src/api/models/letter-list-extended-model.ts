/* tslint:disable */
/* eslint-disable */
import { LetterClosingDocumentEditModel } from './letter-closing-document-edit-model';
import { LetterContractFileModel } from './letter-contract-file-model';
export interface LetterListExtendedModel {

  /**
   * Счёт списания
   */
  account: string;

  /**
   * Создать шаблон аккредитива
   */
  addToTemplates?: boolean;

  /**
   * Я согласен с условиями открытия аккредитива
   */
  agreement?: boolean;

  /**
   * БИК контрагента
   */
  bic: string;

  /**
   * Массив закрывающих документов
   */
  closingDocuments?: null | Array<LetterClosingDocumentEditModel>;

  /**
   * ФИО ответственного
   */
  contactPerson: string;

  /**
   * Контактный телефон ответственного
   */
  contactPhone: string;

  /**
   * Дата договора
   */
  contractDate: string;

  /**
   * Массив прикрепленных файлов
   */
  contractFiles?: null | Array<LetterContractFileModel>;

  /**
   * Предмет договора (Наименование Товаров/Услуг/Работ)
   */
  contractSubject: string;

  /**
   * Название и номер договора
   */
  contractTitleAndNumber: string;

  /**
   * Расчетный код контрагента
   */
  contractorAccount: string;

  /**
   * ИНН контрагента
   */
  contractorINN: string;

  /**
   * Наименование контрагента
   */
  contractorTitle: string;

  /**
   * Возможность предоставления закрывающих документов в электронном виде
   */
  electronicSubmission?: boolean;

  /**
   * Идентификатор
   */
  id?: string;

  /**
   * Срок действия аккредитива в днях
   */
  lcDuration?: null | number;

  /**
   * Дата окончания аккредитива
   */
  lcEndDate: string;

  /**
   * Сумма НДС
   */
  ndsSum: number;

  /**
   * НДС
   */
  ndsValue: number;

  /**
   * Разрешить контрагенту частичное использование аккредитива
   */
  partialPayment?: boolean;

  /**
   * Статус заявки
   */
  state?: number;

  /**
   * Сумма аккредитива
   */
  total: number;
}
