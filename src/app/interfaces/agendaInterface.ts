
enum Situacao {
    aguardando = "AGUARDANDO",
    finalizado = "FINALIZADO",
    cancelado = "CANCELADO",
}

enum TipoAgendamento {
    atendimento = "ATENDIMENTO",
    lembrete = "LEMBRETE",
    financeiro = "FINANCEIRO",
    avaliacao = "AVALIACAO"
}


export interface agendaInterface {
    data?: string;
    horaFinal?: string;
    horaInicial?: string;
    id: number;
    observacao?: string;
    pacienteCelular?: string;
    pacienteId: 0;
    pacienteNome?: string;
    pacienteTelefone?: string;
    pacienteWhatsapp?: string;
    profissionalId: 0;
    profissionalNome?: string;
    situacaoDeAgendamento?: Situacao;
    tipoDeAgendamento?: TipoAgendamento;
}