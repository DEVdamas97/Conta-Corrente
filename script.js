// 1. Criando classe cliente

class Cliente {
    constructor(nome, cpf, agencia, conta) {

        // Armazenando nas contas recebidas

        // "this" representa o objeto que está sendo criado

        this.nome = nome;
        this.cpf = cpf;
        this.agencia = agencia;
        this.conta = conta;
    }
}


// 2. Criando Classe Conta Corrente

class ContaCorrente {

    // 2.1 constructor recebe um cliente já criado

    constructor(cliente) {
        this.cliente = cliente; // Associa a conta a um cliente
        this.saldo = 0; // inicia o saldo com 0
        this.extrato = []; // guarda operações
    }


    // 2.2 Metodo realizar deposito

    depositar(valor) {

        if (isNaN(valor) || valor <= 0) {
            return "Valor inválido para depósito!";
        }

        // Guarda o saldo antes da operação
        let saldoAnterior = this.saldo;

        // Soma o valor depositado ao saldo atual
        this.saldo += valor;

        let operacao = {
            valor: valor,
            saldoAnterior: saldoAnterior,
            saldoAtual: this.saldo,
            tipo: "depósito",
            data: new Date().toLocaleDateString(),
        };

        this.extrato.push(operacao);

        return operacao;
    }


    // 2.3 Metodo realizar saque

    sacar(valor) {

        if (isNaN(valor) || valor <= 0) {
            return "Valor inválido para saque!";
        }

        if (valor > this.saldo) {
            return "Saldo insuficiente!";
        }

        let saldoAnterior = this.saldo;

        this.saldo -= valor;

        let operacao = {
            valor: valor,
            saldoAnterior: saldoAnterior,
            saldoAtual: this.saldo,
            tipo: "saque",
            data: new Date().toLocaleDateString(),
        };

        this.extrato.push(operacao);

        return operacao;
    }
}


// variável global (não perde a conta)
let contaCorrente = null;


// 3. Função criar conta

function criarConta() {

    let nome = document.getElementById("nome").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let agencia = document.getElementById("agencia").value.trim();
    let conta = document.getElementById("conta").value.trim();

    if (!nome || !cpf || !agencia || !conta) {
        alert("Preencha todos os campos!");
        return;
    }

    let cliente = new Cliente(nome, cpf, agencia, conta);

    contaCorrente = new ContaCorrente(cliente);

    document.getElementById("extrato").innerText = "Conta criada com sucesso!";
}


// 4. Função depositar

function depositar() {

    let valor = parseFloat(document.getElementById("valor").value);

    if (!contaCorrente) {
        alert("Crie uma conta primeiro!");
        return;
    }

    let operacao = contaCorrente.depositar(valor);

    mostrarExtrato(operacao);
}


// 5. Função sacar

function sacar() {

    let valor = parseFloat(document.getElementById("valor").value);

    if (!contaCorrente) {
        alert("Crie uma conta primeiro!");
        return;
    }

    let operacao = contaCorrente.sacar(valor);

    if (typeof operacao === "string") {
        alert(operacao);
        return;
    }

    mostrarExtrato(operacao);
}


// 6. Exibir extrato

function mostrarExtrato(operacao) {

    document.getElementById("extrato").innerText = `

════════════════════════════
       DADOS DO CLIENTE
════════════════════════════

👤 Nome: ${contaCorrente.cliente.nome}
🪪 CPF: ${contaCorrente.cliente.cpf}
🏦 Agência: ${contaCorrente.cliente.agencia}
💳 Conta: ${contaCorrente.cliente.conta}

════════════════════════════
      CONTA CORRENTE
════════════════════════════

📌 Tipo: ${operacao.tipo}
💵 Valor: R$ ${operacao.valor}
💰 Saldo Anterior: R$ ${operacao.saldoAnterior}
💳 Saldo Atual: R$ ${operacao.saldoAtual}
📅 Data: ${operacao.data}

Mensagem: Operação realizada com sucesso!

════════════════════════════
`;
}