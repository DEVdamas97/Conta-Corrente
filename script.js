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

    }

    // 2.2 Metodo realizar deposito

    depositar(valor) {

        // Guarda o saldo antes da operação

        let saldoAnterior = this.saldo;

        // Soma o valor depositado ao saldo atual

        this.saldo += valor;

        return {

            valor: valor, // Valor depositado
            saldoAnterior: saldoAnterior, // Saldo antes da operação
            saldoAtual: this.saldo, // Novo saldo após o depósito
            tipo: "depósito", // Tipo da operação
            data: new Date().toLocaleDateString(), // Data atual formatada
        };
    }
}

// 3. Função principal (executada ao clicar no botão)

function criarConta() {

    let nome = document.getElementById("nome").value.trim();

    let cpf = document.getElementById("cpf").value.trim();

    let agencia = document.getElementById("agencia").value.trim();

    let conta = document.getElementById("conta").value.trim();

    // Converte o valor digitado para número

    let valor = parseFloat(document.getElementById("valor").value);

    // 4. Criar objetos (instâncias das classes)

    let cliente = new Cliente(nome, cpf, agencia, conta);

    let contaCorrente = new ContaCorrente(cliente);

    let operacao = contaCorrente.depositar(valor);

    // 5. Exibe o extrato na tela

    document.getElementById("extrato").innerText = `
════════════════════════════
       DADOS DO CLIENTE
════════════════════════════

👤 Nome: ${cliente.nome}
🪪 CPF: ${cliente.cpf}
🏦 Agência: ${cliente.agencia}
💳 Conta: ${cliente.conta}

════════════════════════════
      CONTA CORRENTE
════════════════════════════

📌 Tipo: ${operacao.tipo}
💵 Valor: R$ ${operacao.valor}
💰 Saldo Anterior: R$ ${operacao.saldoAnterior}
💳 Saldo Atual: R$ ${operacao.saldoAtual}
📅 Data: ${operacao.data}

Mensagem: Operação Realizada com Sucesso!

════════════════════════════
`;
}