using ProAtividade.Data.Context;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class GeralRepository : IGeralRepository
    {
        private readonly DataContext _context;
        public GeralRepository(DataContext context)
        {
            _context = context;
        }
        public void Adicionar<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeletarVarias<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}