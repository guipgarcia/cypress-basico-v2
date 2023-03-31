/// <reference types = 'Cypress'/>

class FormElementsPage{
    firstNameMap = () => {return "input[id = 'firstName']"};
    lastNameMap = () => {return "input[id = 'lastName']"};
    emailMap = () => {return "input[id = 'email']"};
    phoneMap = () => {return "input[id = 'phone']"};
    textareaMap = () => {return "textarea[id = 'open-text-area']"};
    enviarButtonMap = () => {return "button[type = 'submit']"};
    mensagemSucessoMap = () => {return "span[class = 'success']"};
    mensagemErroMap = () => {return "span[class = 'error']"};
    phoneCheckBoxMap = () => {return "input[id = 'phone-checkbox']"};
    requiredMarkPhoneMap = () => {return "label[for = 'phone'] > span[class = 'phone-label-span required-mark']"};
    selectProductMap = () => {return "[id = product]"};
    selectProductOptionsMap = () => {return "[id = product] > option"};
    checkboxesMap = () => {return "div[id = 'check'] > input[type='checkbox']"};
    chooseFileMap = () => {return "[id = 'file-upload']"};
    politicaDePrivacidadeMap = () => {return "[href = 'privacy.html']"};
    privacyWhiteBoardMap = () => {return "[id = 'white-background']"};
    supportTypeMap = () => {return "input[type= 'radio']"};
    catIconMap = () => {return "[id = 'cat']"};
}
export default FormElementsPage;