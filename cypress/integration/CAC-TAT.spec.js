// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Central de Atendimento ao Cliente TAT', function(){  
    // Variáveis de input
    const delay = 200,    
            firstName = 'Some Name', 
            lastName = 'Some LastName', 
            email = 'somemail@mail.com', 
            openTextArea = 'Inserting some text just to fill this blooding field',
            phone = '123456789';

    beforeEach(() =>{
        cy.visit('./src/index.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    it('Escrevendo nos elementos da tela e validando os novos valores', function(){         
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(lastName);
        cy.fillEmailField(email);
        cy.fillPhoneField(phone);
    });
   
    it('Escrever os dados obrigatórios com delay e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(lastName);
        cy.fillEmailField(email);
        cy.fillPhoneField(phone);
        cy.fillOpenTextAreaField(email + firstName);
        cy.clickEnviarButton();
        cy.validateSuccessMessage();
    });

    it('Escrever E-mail com formato invalido com delay e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField("email");
        cy.fillOpenTextAreaField(email + firstName);
        cy.clickEnviarButton();
        cy.validateErrorMessage();
    });

    it('Validar se o valor para telefone é vazio em caso de digitar strings', function(){
        cy.fillPhoneField("phone", "");
    });

    it('Validar se apenas a parte numerica do telefone é inserida no campo phone', function(){
        cy.fillPhoneField(phone+"asasfasfa", phone);
    });

    it('Tonar telefone obrigatório, não preencher seu valor e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField("email");
        cy.fillOpenTextAreaField(email + firstName);
        cy.checkPhoneCheckbox();
        cy.clickEnviarButton();
        cy.validateErrorMessage();
    });
    
    it('Preencher campos, depois limpar os campos e validar que todos os campos foram limpos', function(){
        cy.fillFirstNameField(firstName)
            .clear().should('have.value', '');
        cy.fillLastNameField(lastName)
            .clear().should('have.value', '');
        cy.fillEmailField(email)
            .clear().should('have.value', '');
        cy.fillPhoneField(phone)
            .clear().should('have.value', '');
        cy.fillOpenTextAreaField(openTextArea)
            .clear().should('have.value', ''); 
    });

    it('Clicar em enviar sem preencher nenhum campo', function(){
        cy.clickEnviarButton();
        cy.validateErrorMessage();
    });
    
    it('Capturar elemento usando o cy.contains', function(){
        cy.contains('button','Enviar').click();
    });

    it('Selecionar item de seleção suspensa por valor, id e nome', function(){
        cy.selectProduct('cursos', 'cursos');
        cy.selectProduct(3, 'mentoria');
        cy.selectProduct('YouTube', 'youtube');
    });

    it('Selecionar produto randomico da lista de produtos', function(){
        for(var i = 0; i < 6; i++)
            cy.selectARandomProduct();
    });

    it('Selecionar Opção Feedback no tipo de atendimento', function(){
       cy.selectSupportTypeOption('Ajuda');
    });

    it('Selecionar Opção Feedback no tipo de atendimento', function(){
       cy.selectAllSupportTypeOption();
    });

    it('Selecionar Checkbox', function(){
       cy.checkContactCheckbox('Email');
       cy.checkContactCheckbox('PHONE');
    });

    it('Deselecionar Checkbox', function(){
       cy.uncheckContactCheckbox('Email');
       cy.uncheckContactCheckbox('PHONE');
    });
    
    it('Checar todos os checkboxes e descheckar o ultimo', function(){
       cy.checkAllCheckboxesAndUncheckTheLast();
    });

    it('Checar todos os checkboxes e descheckar todos os checkboxes', function(){
        cy.checkAllCheckboxes();
        cy.uncheckContactCheckbox('EmAiL');
        cy.uncheckContactCheckbox('PhonE');
    });

    it('Escolher o arquivo da pasta fixtures', function(){
       cy.inputFileFromFixture();
    });

    it('Escolher o arquivo da pasta fixtures via drag and drop', function(){
       cy.inputFileFromDragNDrop();
    });

    it('Escolher o arquivo via fixtures ', function(){
       cy.inputFileFromAliasedFixture();
    });

    it('Acessar Politica de Privacidade ', function(){
       cy.accessPoliticaDePrivacidade();
    });

    it('Acessar Politica de Privacidade via Invoke ', function(){
       cy.accessPoliticaDePrivacidadeViaInvoke();
    });
    
    it('Validar Politica de Privacidade acessando o link diretamente', function(){
        cy.visitPrivacyLinkAndValidateLine2Text();
    });

    Cypress._.times(5, ()=>{
        it('Validar Mensagem de Erro com Cy.Clock() e Cy.Click()', function(){
            cy.clock();
            cy.clickEnviarButton();
            cy.validateErrorMessage();
            cy.tick(3000);
            cy.validateErrorMessage('not.');
        });
    }); 

    Cypress._.times(5, ()=>{
        it('Validar Mensagem de Sucesso com Cy.Clock() e Cy.Click()', function(){
            cy.clock();
            cy.fillMandatoryFieldsWithMockedValuesAndPressEnter();
            cy.validateSuccessMessage();
            cy.tick(3000);
            cy.validateSuccessMessage('not.');
        });
    });
   
    
    it('Validar Mensagem Text Area com Cypress Repeat', function(){
        cy.fillOpenTextAreaFieldWithRepeat('We will carry on, We will carry on...\n', 7);
    });

    it('Exibir conteudos escondidos,validar os valores e depois escondê-los novamente', function(){
        cy.showAndValidateHiddenContentsViaInvoke();
    });

    it('Fazer um request para cac tat e validar que o status code é 200', function(){
        cy.request({
            method: 'GET',
            url:'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) =>{
            expect(response.status).to.equal(200);
            expect(response.body).to.contains('CAC TAT');
            expect(response.statusText).to.equal('OK');
        });
    });

    
    it('Exibir o gato', function(){
        cy.showCatIcon();
    });
    
});