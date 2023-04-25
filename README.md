# Letter of credit library
Проект содержит библиотеку Letter of credit и песочницу sandbox. В песочницы представлен пример взаимодействия с библиотекой
## Действия по интеграции библиотеки в приложение PSB Business
1. Подключите модуль LetterOfCreditModule и сервис LetterOfCreditService в необходимый модуль PSB Business

```typescript
@NgModule({
    ...
    imports: [
        LetterOfCreditModule,
    ],
    providers: [
        LetterOfCreditService,
    ],
    ...
})
export class AppModule {}
```

2. Вставьте компонент **loc-letter-of-credit** на уровне **с router-outlet** в компоненте **smb-layout**
```html
    <loc-letter-of-credit></loc-letter-of-credit>
```

Добавить в ngOnInit компонента **smb-layout** для показа/скрытия letter-of-credit.
```typescript
    this.letterOfCreditService.isIssueVissible$.pipe(
        tap((isIssueVissible) => {
            if (!isIssueVissible) {
                console.log('При сокрытии letter of credit показать страницу с документом .smb-content ng-component');
            } else {
                this.isNewPaymentShown = false
            }
        }),
        takeUntilDestroyed(this)
    ).subscribe();
```

3. При клике на вкладку "История(документы)" вставить кнопку "Новый покрытый аккредитив" в компоненте smb-document-filter на уровне остальных 2-х кнопок. Также эту кнопку необходимо показывать при определенных условиях, которые будут описаны ниже.

```html
<psb-button
    [isSubmit]="true"
    (buttonClick)="handleLetterOfCreditShow()"
>
    Новый покрытый акредитив
</psb-button>
```

4. В ts файл компонента **smb-payment-form** добавить следующий код

При клике на кнопку "Новый покрытый аккредитив" добавить вызов handleOpenIssue для показа библиотеки letter-of-credit и скрыть компонент smb-layout > ng-component. Можно также реализовать подключение модуля letter-of-credit через отдельный route.

```typescript
handleLetterOfCreditShow() {
    this.letterOfCreditService.handleOpenIssue();
}
```

При клике на кнопку "Новый платеж" добавить вызов метода handleCloseIssue сервиса letterOfCreditService для скрытия библиотеки letter-of-credit
```typescript
handleNewPaymentClick() {
    this.letterOfCreditService.handleCloseIssue();
}
```

Добавить метод **checkIsLoCAllowedAndOpenPaymentDialog**, который нужен для проверки юр лица на покрытый аккредитив.

```typescript
checkIsLoCAllowedAndOpenPaymentDialog(): void {
    if (this.isLoCAllowed) {
        // smbPaymentForm.validate() Вызвать для валидации формы;

        if (!this.newPaymentForm.valid) {
            return;
        }

        // Передаю тестовые данные в стор letter of credit. Заменить на данные на значение формы smb-payment-form с той же структурой данных.
        this.letterOfCreditService.setStorePayment({
            number: 1,
            summa: 100,
            receiver: {
                inn: 'test val',
                kpp: 'test val',
                name: 'test val',
                displayName: 'test val',
                fullName: 'test val',
                id: 1,
                okpo: 'test val',
                toStringName: false,
                account: {
                    budget: false,
                    code: "",
                    depNum: null
                },
                bankInfo: {
                    account: 'test val',
                    adress: 'test val',
                    bik: 'test val',
                    fullName: 'test val',
                    name: 'test val',
                    type: 1,
                },
            },
            sender: {
                inn: 'test val',
                kpp: 'test val',
                name: 'test val',
                displayName: 'test val',
                fullName: 'test val',
                id: 1,
                okpo: 'test val',
                toStringName: false,
                account: {
                    budget: false,
                    code: "",
                    depNum: null
                },
                bankInfo: {
                    account: 'test val',
                    adress: 'test val',
                    bik: 'test val',
                    fullName: 'test val',
                    name: 'test val',
                    type: 1,
                },
            },
        });

        this.letterOfCreditService.openSafePaymentDialog();

        return;
    }
}
```

Для кнопок "Отправить"/"Подписать"/"Сохранить" добавить вызов метода **checkIsLoCAllowedAndOpenPaymentDialog**

```typescript
handleSend() {
    this.checkIsLoCAllowedAndOpenPaymentDialog();
    // Иначе выполнить дефолтное действие
}

handleSign() {
    this.checkIsLoCAllowedAndOpenPaymentDialog();
    // Иначе выполнить дефолтное действие
}

handleSave() {
    this.checkIsLoCAllowedAndOpenPaymentDialog();
    // Иначе выполнить дефолтное действие
}
```

В хук ngOnInit добавить следующий код

```typescript
ngOnInit(): void {
    // при смене роута ансетится isOrdinalPayment
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
            this.letterOfCreditService.changeIsOrdinalPayment(false);
        }),
        takeUntilDestroyed(this),
    ).subscribe();

    const receiverInn = this.newPaymentForm.get('receiver.inn');

    // receiverAutocomplete.receiverFormGroup.valueChanges 
    // В компоненте smb-payment-form подключить receiverAutocomplete на изменение valueChanges вместо примера с receiverInn
    receiverInn.valueChanges.pipe(
        map(() => receiverInn.valid),
        pairwise(),
        filter(([cur, prev]) => (
            cur !== prev
            && receiverInn.valid
        )),
        switchMap(() => {
            console.log('Показать лоадинг paymentForm');
            // smbPaymentForm.spinnerService.start(smbPaymentForm.paymentFormContext);
            return this.letterOfCreditService.getIsLoCVisible(receiverInn)
        }),
        tap((isLoCAllowed) => {
            console.log('Скрыть лоадинг paymentForm');
            // smbPaymentForm.spinnerService.stop(smbPaymentForm.paymentFormContext);
            this.isLoCAllowed = isLoCAllowed;
            // isLoCAllowed также используется для показа кнопки "Новый покрытый аккредитив в компоненте smb-layout
        }),
        takeUntilDestroyed(this)
    ).subscribe();
}
```