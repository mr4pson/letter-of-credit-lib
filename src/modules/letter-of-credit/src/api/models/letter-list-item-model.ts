/* tslint:disable */
/* eslint-disable */
export interface LetterListItemModel {

  /**
   * Наименование контрагента
   */
  contractorName?: null | string;

  /**
   * Идентификатор заявления
   */
  id?: string;

  /**
   * Дата создания(подачи) заявления на покрытый аккредитив
   */
  letterDate?: string;

  /**
   * Статус заявления в виде целочисленного значения
   */
  status?: number;

  /**
   * Общая сумма аккредитива
   */
  total?: number;
}
