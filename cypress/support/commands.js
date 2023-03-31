// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import FormElementsPage from './FormPage.js';
const fieldsMaps = new FormElementsPage;

var delay = 200;
    
Cypress.Commands.add('fillMandatoryFieldsWithMockedValuesAndPressEnter', function(firstName){
   cy.fillFirstNameField('Mandatory Name');
   cy.fillLastNameField('Mandatory Lastname');
   cy.fillEmailField('mandatorymail@mail.com');
   cy.fillOpenTextAreaField('Mandatory text area');
   cy.clickEnviarButton();
});

Cypress.Commands.add('fillFirstNameField', function(firstName){
    cy.get(fieldsMaps.firstNameMap()).should('be.visible')
            .type(firstName, {"delay":delay}).should('have.value',firstName)
});

Cypress.Commands.add('validateSuccessMessage', function(operation=""){
    cy.get(fieldsMaps.mensagemSucessoMap()).should(operation+'be.visible').should('contain', 'Mensagem enviada com sucesso.');
});

Cypress.Commands.add('validateErrorMessage', (operation = "")=>{
    cy.get(fieldsMaps.mensagemErroMap()).should(operation+'be.visible').should('contain', 'Valide os campos obrigatórios!');
});

Cypress.Commands.add('fillLastNameField', function(lastName){
    cy.get(fieldsMaps.lastNameMap()).should('be.visible')
            .type(lastName, {"delay":delay}).should('have.value',lastName)
});

Cypress.Commands.add('fillEmailField', function(email){   
    cy.get(fieldsMaps.emailMap()).should('be.visible')
            .type(email, {"delay":delay}).should('have.value', email)       
});

Cypress.Commands.add('fillPhoneField', function(phone, phoneValidation = phone){
    cy.get(fieldsMaps.phoneMap()).should('be.visible')
    .type(phone, {"delay":delay}).should('have.value', phoneValidation)
});

Cypress.Commands.add('fillOpenTextAreaField', function(openTextArea){
    cy.get(fieldsMaps.textareaMap()).should('be.visible')
            .type(openTextArea, {"delay":delay}).should('have.value', openTextArea);           
});
Cypress.Commands.add('fillOpenTextAreaFieldWithRepeat', function(openTextArea, repeateTimes){
    const openTextAreaTxt = Cypress._.repeat(openTextArea, repeateTimes);
    cy.get(fieldsMaps.textareaMap()).should('be.visible')
            .invoke('val', openTextAreaTxt).should('have.value', openTextAreaTxt);           
});

Cypress.Commands.add('clickEnviarButton', function(){
    cy.get(fieldsMaps.enviarButtonMap()).
    should('be.visible').click();
});

Cypress.Commands.add('selectProduct', function(product, valueToCompare){
    cy.get(fieldsMaps.selectProductMap()).should('be.visible')
    .select(product).should('have.value', valueToCompare);
});


Cypress.Commands.add('selectARandomProduct', function(){
    cy.get(fieldsMaps.selectProductOptionsMap()).as('products')
    .its('length', { log : false}).then(n =>{
         cy.get('@products', {log:false}).then($products =>{
            var randomIndex = Cypress._.random(n-1);
            if(randomIndex == 0){
                cy.log("Replacing: "+ $products[randomIndex].innerText + " for the next valid value");
                randomIndex ++;
            }
            const randomText = $products[randomIndex].innerText;
            cy.get(fieldsMaps.selectProductMap()).select(randomText);
         })   
    })
});

Cypress.Commands.add('selectSupportTypeOption', function(option){
    var supportTypeMap = "[id= 'support-type'] > label > input[value = '"+option.toLowerCase()+"']";
    cy.get(supportTypeMap).should('be.visible').check().should('be.checked');
});

Cypress.Commands.add('selectAllSupportTypeOption', function(){
    cy.get(fieldsMaps.supportTypeMap()).each(($value)=>{    
        cy.wrap($value).check().should('be.checked');   
    });
});

Cypress.Commands.add('checkContactCheckbox', function(contact){
    cy.log(contact.toLowerCase());
    var checkboxMap = "input[id= '"+contact.toLowerCase()+"-checkbox']";
    cy.get(checkboxMap).should('be.visible')
        .check().should('be.checked');
});

Cypress.Commands.add('checkAllCheckboxesAndUncheckTheLast', function(contact){
    cy.get(fieldsMaps.checkboxesMap()).should('be.visible')
        .check().should('be.checked').last()
            .uncheck().should('not.be.checked');
});

Cypress.Commands.add('checkAllCheckboxes', function(){
    cy.get(fieldsMaps.checkboxesMap()).should('be.visible').check().should('be.checked');   
});

Cypress.Commands.add('uncheckContactCheckbox', function(contact){
    cy.log(contact.toLowerCase());
    var checkboxMap = "input[id= '"+contact.toLowerCase()+"-checkbox']";
    cy.get(checkboxMap).should('be.visible')
    .uncheck().should('not.be.checked');
   
});

Cypress.Commands.add('inputFileFromFixture', function(){
    cy.get(fieldsMaps.chooseFileMap()).should('be.visible')
        .selectFile('cypress/fixtures/example.json')
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
        });   
});

Cypress.Commands.add('inputFileFromDragNDrop', function(){
    cy.get(fieldsMaps.chooseFileMap()).should('be.visible')
        .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
        });   
});

Cypress.Commands.add('inputFileFromAliasedFixture', function(){
    cy.fixture('example.json', {encoding : null}).as('example');
    cy.get(fieldsMaps.chooseFileMap()).should('be.visible')
        .selectFile('@example')
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
        });   
});

Cypress.Commands.add('accessPoliticaDePrivacidade', function(){
    cy.get(fieldsMaps.politicaDePrivacidadeMap()).should('have.attr','target','_blank')
});

Cypress.Commands.add('showCatIcon', function(){
    cy.get(fieldsMaps.catIconMap()).should('not.be.visible').invoke('show').should('be.visible');
});

Cypress.Commands.add('accessPoliticaDePrivacidadeViaInvoke', function(){
    cy.get(fieldsMaps.politicaDePrivacidadeMap()).invoke('removeAttr','target').click();
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
});

Cypress.Commands.add('showAndValidateHiddenContentsViaInvoke', function(){
    cy.get(fieldsMaps.mensagemSucessoMap()).should('not.be.visible')
        .invoke('show').should('be.visible').should('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide').should('not.be.visible');
    cy.get(fieldsMaps.mensagemErroMap()).should('not.be.visible')
        .invoke('show').should('be.visible').should('contain', 'Valide os campos obrigatórios!')
        .invoke('hide').should('not.be.visible');
});

Cypress.Commands.add('visitPrivacyLinkAndValidateLine2Text', function(){
    cy.visit('./src/privacy.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
    cy.get(fieldsMaps.privacyWhiteBoardMap()+"> p:nth-child(2)").should('have.text', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
});

Cypress.Commands.add('checkPhoneCheckbox', ()=>{
    cy.get(fieldsMaps.phoneCheckBoxMap()).should('be.visible')
    .check().should('be.checked');
    cy.get(fieldsMaps.requiredMarkPhoneMap()).should('be.visible');
});