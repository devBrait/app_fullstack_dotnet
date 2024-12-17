namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IGeralRepository
    {
        void Adicionar<T>(T entity) where T : class;
        void Atualizar<T>(T entity) where T : class;
        void Deletar<T>(T entity) where T : class;
        void DeletarVarias<T>(T[] entity) where T : class;
        Task<bool> SalvarMudancasAsync();
    }
}