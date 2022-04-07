import { ClosingDoc } from './closing-doc.model';

export class LetterOfCredit {
  public reciverInn = '';
  public reciverName = '';
  public reciverBankBik = '';
  public reciverBankName = '';
  public reciverAccount = '';

  public contractDate: Date = null;
  public contract = '';
  public contractInfo = '';

  public endLocDate: Date = null;

  public closingDocs: ClosingDoc[] = [];
  public perhapsDigitalDoc = true;
  public allowUsePartOfLoc = true;

  public contactPersone = '';
  public contactPhone = '';
}
