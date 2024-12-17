using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividade(Atividade atividade);
        Task<Atividade> AtualizarAtividade(Atividade atividade);
        Task<bool> DeletarAtividade(int id);
        Task<bool> ConcluirAtividade(Atividade atividade);
        Task<Atividade[]> PegarTodasAtividadesAsync();
        Task<Atividade> PegarAtividadePorIdAsync(int id);
    }
}